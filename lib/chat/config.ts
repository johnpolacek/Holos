// Dev falls back to test keys and in-memory storage. Production must not: a missing
// captcha secret lets anyone through, a missing cookie secret makes sessions forgeable,
// and in-memory usage resets per server, so the budget would not hold.
const REQUIRED = [
  "CHAT_SECRET",
  "TURNSTILE_SECRET_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "CHAT_S3_ENDPOINT",
  "CHAT_S3_BUCKET",
  "CHAT_S3_ACCESS_KEY_ID",
  "CHAT_S3_SECRET_ACCESS_KEY",
];

export function missingConfig(): string[] {
  if (process.env.NODE_ENV !== "production") return [];
  return REQUIRED.filter((name) => !process.env[name]);
}
