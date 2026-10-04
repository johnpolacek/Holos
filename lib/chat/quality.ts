// Cheap checks that decide whether a message is worth a model call.
// A message that fails gets a short nudge, costs nothing, and does not count toward limits.

export const MAX_INPUT_CHARS = 600;
export const MAX_TURNS = Number(process.env.CHAT_MAX_TURNS ?? 12);

// Latin and Greek letters. The tsconfig target predates regex Unicode classes.
const LETTER = "a-zA-Z\\u00C0-\\u024F\\u0370-\\u03FF";

export type Gate = { ok: true } | { ok: false; reply: string };

export function gateInput(text: string, priorUserTurns: number): Gate {
  const t = text.trim();
  if (priorUserTurns >= MAX_TURNS) {
    return {
      ok: false,
      reply:
        "This conversation has reached its length limit. Start a new chat to keep going, or read the full text in the [PDF](/holos.pdf).",
    };
  }
  if (t.length > MAX_INPUT_CHARS) {
    return { ok: false, reply: `Please keep questions under ${MAX_INPUT_CHARS} characters.` };
  }
  const letters = t.match(new RegExp(`[${LETTER}]`, "g"))?.length ?? 0;
  const words = t.split(/\s+/).filter((w) => new RegExp(`[${LETTER}]{2,}`).test(w));
  const gibberish =
    letters < 2 ||
    letters / t.length < 0.5 ||
    /(.)\1{5,}/.test(t) ||
    // Keyboard mashing has far fewer vowels than any real sentence.
    (letters >= 6 && (t.match(/[aeiouy]/gi)?.length ?? 0) / letters < 0.2);
  // Follow-ups can be short ("why?"), but an opening question needs a few words.
  const tooThin = priorUserTurns === 0 ? words.length < 2 : words.length < 1;
  if (gibberish || tooThin) {
    return {
      ok: false,
      reply:
        "I didn't quite catch that. Try a full question, like *What is the threshold?* or *Why is the sky quiet?*",
    };
  }
  return { ok: true };
}
