import { createHash } from "node:crypto";
import type { LanguageModelUsage } from "ai";
import { getJSON, putJSON } from "./storage";

// One usage file per UTC day. Only AI replies count. Canned replies are free.
// The main limit is dollars. Each reply reserves its worst-case cost before the model runs,
// then swaps it for the real cost, so the day's spend can't pass the cap.
// Writes are conditional on the etag, so two requests at once cannot both slip past it.

const DAILY_BUDGET_USD = Number(process.env.CHAT_DAILY_BUDGET_USD ?? 1);
const DAILY_LIMIT = Number(process.env.CHAT_DAILY_LIMIT ?? 200);
const VISITOR_DAILY_LIMIT = Number(process.env.CHAT_VISITOR_DAILY_LIMIT ?? 20);

// Opus 5.5, dollars per million tokens. Cache writes use the 1-hour rate, twice the input rate.
const PRICE = { input: 4, output: 20, cacheRead: 0.2, cacheWrite: 8 };
// The cached site text, the uncached rest of a long chat, and the output cap.
const SITE_TOKENS = 66_000;
const FRESH_TOKENS = 4_000;
const MAX_OUTPUT_TOKENS = 4_000;
// The cache lives an hour from its last use. Treat it as cold a little early.
const WARM_MS = 55 * 60 * 1000;

/** The most one reply can cost, depending on whether the site text is still cached. */
function worstCaseUsd(usage: Usage): number {
  const warm = usage.lastReplyAt && Date.now() - Date.parse(usage.lastReplyAt) < WARM_MS;
  return (
    (SITE_TOKENS * (warm ? PRICE.cacheRead : PRICE.cacheWrite) +
      FRESH_TOKENS * PRICE.input +
      MAX_OUTPUT_TOKENS * PRICE.output) /
    1_000_000
  );
}

interface Usage {
  count: number;
  spentUsd: number;
  reservedUsd: number;
  inputTokens: number;
  outputTokens: number;
  lastReplyAt?: string;
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
  if (committed + worstCaseUsd(usage) > DAILY_BUDGET_USD || usage.count >= DAILY_LIMIT) {
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

export type Reservation = { state: "open"; usd: number } | { state: Exclude<LimitState, "open"> };

/** Reserves one AI reply's worst-case cost, or reports what blocked it. */
export async function reserve(visitor: string): Promise<Reservation> {
  let blocked: LimitState = "open";
  let usd = 0;
  const ok = await update((usage) => {
    blocked = stateOf(usage, visitor);
    if (blocked !== "open") return false;
    usd = worstCaseUsd(usage);
    usage.count += 1;
    usage.reservedUsd += usd;
    usage.visitors[visitor] = (usage.visitors[visitor] ?? 0) + 1;
    return true;
  });
  if (ok) return { state: "open", usd };
  // Heavy contention fails closed rather than overspending.
  return { state: blocked === "open" ? "closed" : blocked };
}

/** Swaps a reservation for the reply's real cost. */
export async function settle(reservedUsd: number, usage: LanguageModelUsage): Promise<void> {
  await update((day) => {
    day.reservedUsd = Math.max(0, day.reservedUsd - reservedUsd);
    day.lastReplyAt = new Date().toISOString();
    day.spentUsd += costUsd(usage);
    day.inputTokens += usage.inputTokens ?? 0;
    day.outputTokens += usage.outputTokens ?? 0;
    return true;
  });
}

/** Gives back a reservation when the model call fails, so outages do not eat the budget. */
export async function release(visitor: string, reservedUsd: number): Promise<void> {
  await update((day) => {
    day.reservedUsd = Math.max(0, day.reservedUsd - reservedUsd);
    day.count = Math.max(0, day.count - 1);
    day.visitors[visitor] = Math.max(0, (day.visitors[visitor] ?? 1) - 1);
    return true;
  });
}
