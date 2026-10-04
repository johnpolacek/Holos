import { createHmac, timingSafeEqual } from "node:crypto";

// After one Turnstile pass the visitor gets a signed cookie, so the captcha shows once per session.

export const COOKIE = "holos_chat";
const TTL_SECONDS = 60 * 60 * 12;
const secret = () => process.env.CHAT_SECRET ?? "dev";

const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");

export function issueSession(): string {
  const expires = String(Math.floor(Date.now() / 1000) + TTL_SECONDS);
  return `${COOKIE}=${expires}.${sign(expires)}; Path=/api/chat; Max-Age=${TTL_SECONDS}; HttpOnly; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

export function hasSession(req: Request): boolean {
  const raw = req.headers
    .get("cookie")
    ?.split(/;\s*/)
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (!raw) return false;
  const [expires, mac] = raw.split(".");
  if (!expires || !mac || Number(expires) * 1000 < Date.now()) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export async function verifyTurnstile(token: string, req: Request): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      // Cloudflare's always-pass test secret keeps local dev working without keys.
      secret: process.env.TURNSTILE_SECRET_KEY ?? "1x0000000000000000000000000000000AA",
      response: token,
      remoteip: req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "",
    }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
