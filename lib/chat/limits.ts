import { createHash } from "node:crypto";
import { getJSON, putJSON } from "./storage";

// One usage file per UTC day. Only AI replies count. Canned replies are free.
// Writes are conditional on the etag, so two requests at once cannot both slip past the cap.

const DAILY_LIMIT = Number(process.env.CHAT_DAILY_LIMIT ?? 200);
const VISITOR_DAILY_LIMIT = Number(process.env.CHAT_VISITOR_DAILY_LIMIT ?? 20);

interface Usage {
  count: number;
  inputTokens: number;
  outputTokens: number;
  visitors: Record<string, number>;
}

const today = () => new Date().toISOString().slice(0, 10);
const usageKey = () => `usage/${today()}.json`;
const empty = (): Usage => ({ count: 0, inputTokens: 0, outputTokens: 0, visitors: {} });

/** A salted hash of the visitor's IP. The raw IP is never stored. */
export function visitorId(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  const salt = process.env.CHAT_SECRET ?? "dev";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}

export type LimitState = "open" | "closed" | "visitor-limit";

export async function checkLimit(visitor: string): Promise<LimitState> {
  const usage = (await getJSON<Usage>(usageKey()))?.data ?? empty();
  if (usage.count >= DAILY_LIMIT) return "closed";
  if ((usage.visitors[visitor] ?? 0) >= VISITOR_DAILY_LIMIT) return "visitor-limit";
  return "open";
}

/** Reserves one AI reply. Returns the state that blocked it, or "open" when reserved. */
export async function reserve(visitor: string): Promise<LimitState> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const stored = await getJSON<Usage>(usageKey());
    const usage = stored?.data ?? empty();
    if (usage.count >= DAILY_LIMIT) return "closed";
    if ((usage.visitors[visitor] ?? 0) >= VISITOR_DAILY_LIMIT) return "visitor-limit";
    usage.count += 1;
    usage.visitors[visitor] = (usage.visitors[visitor] ?? 0) + 1;
    if (await putJSON(usageKey(), usage, stored?.etag ?? null)) return "open";
  }
  // Heavy contention. Fail closed rather than overspend.
  return "closed";
}

/** Gives back a reservation when the model call fails, so outages do not eat the quota. */
export async function release(visitor: string): Promise<void> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const stored = await getJSON<Usage>(usageKey());
    if (!stored) return;
    const usage = stored.data;
    usage.count = Math.max(0, usage.count - 1);
    usage.visitors[visitor] = Math.max(0, (usage.visitors[visitor] ?? 1) - 1);
    if (await putJSON(usageKey(), usage, stored.etag)) return;
  }
}

/** Adds token counts after a reply finishes. Best effort, for cost tracking only. */
export async function recordTokens(inputTokens: number, outputTokens: number): Promise<void> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const stored = await getJSON<Usage>(usageKey());
    const usage = stored?.data ?? empty();
    usage.inputTokens += inputTokens;
    usage.outputTokens += outputTokens;
    if (await putJSON(usageKey(), usage, stored?.etag ?? null)) return;
  }
}
