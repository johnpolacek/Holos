import { createHash } from "node:crypto";
import type { LanguageModelUsage } from "ai";
import { getJSON, putJSON } from "./storage";

// One usage file per UTC day. Only AI replies count. Canned replies are free.
// The main limit is dollars. Each reply reserves a worst-case estimate before the model runs,
// then swaps it for the real cost, so the day's spend can't pass the cap.
// Writes are conditional on the etag, so two requests at once cannot both slip past it.

const DAILY_BUDGET_USD = Number(process.env.CHAT_DAILY_BUDGET_USD ?? 1);
// A reply that rebuilds the cached site text costs about $0.35, so this covers the worst case.
const REPLY_ESTIMATE_USD = Number(process.env.CHAT_REPLY_ESTIMATE_USD ?? 0.4);
const DAILY_LIMIT = Number(process.env.CHAT_DAILY_LIMIT ?? 200);
const VISITOR_DAILY_LIMIT = Number(process.env.CHAT_VISITOR_DAILY_LIMIT ?? 20);

// Opus 5.5, dollars per million tokens. Cache writes use the 5-minute rate.
const PRICE = { input: 4, output: 20, cacheRead: 0.2, cacheWrite: 5 };

interface Usage {
  count: number;
  spentUsd: number;
  reservedUsd: number;
  inputTokens: number;
  outputTokens: number;
  visitors: Record<string, number>;
}

const today = () => new Date().toISOString().slice(0, 10);
const usageKey = () => `usage/${today()}.json`;
const empty = (): Usage => ({
  count: 0,
  spentUsd: 0,
  reservedUsd: 0,
  inputTokens: 0,
  outputTokens: 0,
  visitors: {},
});

/** A salted hash of the visitor's IP. The raw IP is never stored. */
export function visitorId(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  const salt = process.env.CHAT_SECRET ?? "dev";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}

export function costUsd(usage: LanguageModelUsage): number {
  const d = usage.inputTokenDetails;
  const fresh = d?.noCacheTokens ?? usage.inputTokens ?? 0;
  return (
    (fresh * PRICE.input +
      (d?.cacheReadTokens ?? 0) * PRICE.cacheRead +
      (d?.cacheWriteTokens ?? 0) * PRICE.cacheWrite +
      (usage.outputTokens ?? 0) * PRICE.output) /
    1_000_000
  );
}

export type LimitState = "open" | "closed" | "visitor-limit";

function stateOf(usage: Usage, visitor: string): LimitState {
  const committed = (usage.spentUsd ?? 0) + (usage.reservedUsd ?? 0);
  if (committed + REPLY_ESTIMATE_USD > DAILY_BUDGET_USD || usage.count >= DAILY_LIMIT) {
    return "closed";
  }
  if ((usage.visitors[visitor] ?? 0) >= VISITOR_DAILY_LIMIT) return "visitor-limit";
  return "open";
}

export async function checkLimit(visitor: string): Promise<LimitState> {
  const usage = { ...empty(), ...(await getJSON<Usage>(usageKey()))?.data };
  return stateOf(usage, visitor);
}

/** Applies a change to today's usage file, retrying if another request wrote first.
 * The change returns false to abort without writing. */
async function update(change: (usage: Usage) => boolean): Promise<boolean> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const stored = await getJSON<Usage>(usageKey());
    const usage = { ...empty(), ...stored?.data };
    if (!change(usage)) return false;
    if (await putJSON(usageKey(), usage, stored?.etag ?? null)) return true;
  }
  return false;
}

/** Reserves one AI reply. Returns the state that blocked it, or "open" when reserved. */
export async function reserve(visitor: string): Promise<LimitState> {
  let blocked: LimitState = "open";
  const ok = await update((usage) => {
    blocked = stateOf(usage, visitor);
    if (blocked !== "open") return false;
    usage.count += 1;
    usage.reservedUsd += REPLY_ESTIMATE_USD;
    usage.visitors[visitor] = (usage.visitors[visitor] ?? 0) + 1;
    return true;
  });
  // Heavy contention fails closed rather than overspending.
  return ok ? "open" : blocked === "open" ? "closed" : blocked;
}

/** Swaps a reservation for the reply's real cost. */
export async function settle(usage: LanguageModelUsage): Promise<void> {
  await update((day) => {
    day.reservedUsd = Math.max(0, day.reservedUsd - REPLY_ESTIMATE_USD);
    day.spentUsd += costUsd(usage);
    day.inputTokens += usage.inputTokens ?? 0;
    day.outputTokens += usage.outputTokens ?? 0;
    return true;
  });
}

/** Gives back a reservation when the model call fails, so outages do not eat the budget. */
export async function release(visitor: string): Promise<void> {
  await update((day) => {
    day.reservedUsd = Math.max(0, day.reservedUsd - REPLY_ESTIMATE_USD);
    day.count = Math.max(0, day.count - 1);
    day.visitors[visitor] = Math.max(0, (day.visitors[visitor] ?? 1) - 1);
    return true;
  });
}
