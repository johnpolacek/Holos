import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type ModelMessage,
  streamText,
  type TextStreamPart,
  type ToolSet,
  toUIMessageStream,
  type UIMessageStreamWriter,
} from "ai";
import { matchCanned } from "@/lib/chat/canned";
import { checkLimit, recordTokens, release, reserve, visitorId } from "@/lib/chat/limits";
import { instructions } from "@/lib/chat/prompt";
import { gateInput, MAX_INPUT_CHARS } from "@/lib/chat/quality";
import { hasSession, issueSession, verifyTurnstile } from "@/lib/chat/session";
import { CHAT_ID, loadTranscript, saveTranscript, type Turn } from "@/lib/chat/transcript";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const runtime = "nodejs";

const MODEL = process.env.CHAT_MODEL ?? "anthropic/claude-opus-5.5";

const json = (body: unknown, status = 200) => Response.json(body, { status });

/** Lets the panel know, before anyone types, whether a captcha is needed and whether chat is open. */
export async function GET(req: Request) {
  const state = await checkLimit(visitorId(req));
  return json({ verified: hasSession(req), state });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    id?: string;
    text?: string;
    turnstileToken?: string;
  } | null;
  const text = body?.text?.trim() ?? "";
  if (!body?.id || !CHAT_ID.test(body.id) || !text || text.length > MAX_INPUT_CHARS * 2) {
    return json({ error: "bad-request" }, 400);
  }

  let setCookie: string | undefined;
  if (!hasSession(req)) {
    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken, req))) {
      return json({ error: "captcha" }, 401);
    }
    setCookie = issueSession();
  }
  const headers = setCookie ? { "Set-Cookie": setCookie } : undefined;

  const visitor = visitorId(req);
  const state = await checkLimit(visitor);
  if (state !== "open") return json({ error: state }, 429);

  const transcript = await loadTranscript(body.id, visitor);
  const priorUserTurns = transcript.turns.filter((t) => t.role === "user").length;
  const now = () => new Date().toISOString();
  const userTurn: Turn = { role: "user", text, at: now() };

  // Free replies: low-quality input or a common question.
  const gate = gateInput(text, priorUserTurns);
  const canned = gate.ok ? matchCanned(text) : null;
  if (!gate.ok || canned) {
    const reply = gate.ok ? (canned?.answer ?? "") : gate.reply;
    transcript.turns.push(userTurn, {
      role: "assistant",
      text: reply,
      source: gate.ok ? "canned" : "gate",
      at: now(),
    });
    await saveTranscript(transcript);
    return createUIMessageStreamResponse({
      headers,
      stream: createUIMessageStream({ execute: ({ writer }) => writeText(writer, reply) }),
    });
  }

  const reserved = await reserve(visitor);
  if (reserved !== "open") return json({ error: reserved }, 429);

  // Context comes from the stored transcript, minus nudges, plus the new question.
  const messages: ModelMessage[] = [
    ...transcript.turns
      .filter((t, i, all) => t.source !== "gate" && all[i + 1]?.source !== "gate")
      .map((t) => ({ role: t.role, content: t.text })),
    { role: "user", content: text },
  ];

  return createUIMessageStreamResponse({
    headers,
    stream: createUIMessageStream({
      onError: () => "Something went wrong. Please try again.",
      execute: async ({ writer }) => {
        const result = streamText({
          model: MODEL,
          instructions,
          messages,
          reasoning: "medium",
          // Thinking counts toward this cap. Answer length is set by the prompt.
          maxOutputTokens: 4000,
          experimental_transform: noEmDashes,
        });
        writer.merge(toUIMessageStream({ stream: result.stream }));
        // Keep the response open until the reply is stored.
        let reply: string;
        let usage: Awaited<typeof result.totalUsage>;
        try {
          [reply, usage] = await Promise.all([result.text, result.totalUsage]);
        } catch (err) {
          // The merged stream has already sent the client an error part.
          console.error("[chat] model call failed", err);
          await release(visitor);
          return;
        }
        transcript.turns.push(userTurn, {
          role: "assistant",
          text: reply,
          source: "ai",
          at: now(),
        });
        await Promise.all([
          saveTranscript(transcript),
          recordTokens(usage.inputTokens ?? 0, usage.outputTokens ?? 0),
        ]);
      },
    }),
  });
}

/** The model still slips in em dashes despite the prompt. Swap them for commas. */
const noEmDashes = () =>
  new TransformStream<TextStreamPart<ToolSet>, TextStreamPart<ToolSet>>({
    transform(part, controller) {
      controller.enqueue(
        part.type === "text-delta"
          ? { ...part, text: part.text.replace(/\s*[—–]\s*/g, ", ") }
          : part
      );
    },
  });

/** Streams a fixed reply in small pieces so it reads like the model's replies. */
async function writeText(writer: UIMessageStreamWriter, text: string) {
  const id = "canned";
  writer.write({ type: "start" });
  writer.write({ type: "text-start", id });
  for (const piece of text.match(/\S+\s*/g) ?? []) {
    writer.write({ type: "text-delta", id, delta: piece });
    await new Promise((r) => setTimeout(r, 12));
  }
  writer.write({ type: "text-end", id });
  writer.write({ type: "finish" });
}
