# Ask Chat

## Summary

The Ask button, pinned to the top right of every page, opens a slide-over chat that answers questions about Holos from the site's own text. Common questions get free canned answers. Everything else goes to Claude Sonnet 5.5 through the Vercel AI Gateway, under a $1 daily spending cap.

## Pieces

- [`../app/_components/ChatLauncher.tsx`](../app/_components/ChatLauncher.tsx) - the button. It sits in the text column's right margin so it never covers text. Bare icon below `lg`, outlined "Ask" button from `lg` up. Hidden while the mobile menu is open.
- [`../app/_components/ChatPanel.tsx`](../app/_components/ChatPanel.tsx) - the panel: five starter questions, Turnstile captcha until the visitor has a session cookie, Markdown and KaTeX answers, made-up internal links rendered as plain text. Chat history lives in `sessionStorage`.
- [`../app/api/chat/route.ts`](../app/api/chat/route.ts) - GET reports captcha and open/closed state. POST runs: captcha or session cookie, daily limit, input check, canned match, budget reservation, model call.
- [`../lib/chat/`](../lib/chat/) - `canned.ts` (keyword-matched answers; every starter has one), `quality.ts` (gibberish, length, and 12-question limits), `limits.ts` (budget and per-visitor caps), `prompt.ts` (rules plus the site text), `links.ts` (the only valid link paths), `transcript.ts` and `storage.ts` (JSON files on R2), `session.ts` (Turnstile and the signed cookie).

## Site text

`scripts/generate-corpus.ts` renders the same document as the PDF, minus Revisions, to `lib/chat/corpus.txt` (about 65k tokens). It runs in `pnpm build` and is committed so dev works. Regenerate it after content edits with `pnpm build:corpus`.

## Cost controls

- Each AI answer reserves its worst-case cost before the model runs, then settles to the real cost from token usage. The chat closes for the UTC day when the next answer could pass `CHAT_DAILY_BUDGET_USD` (default 1). Failed calls give their reservation back.
- The site text is cached at Anthropic for one hour, the longest TTL offered. A cold answer costs about $0.26, a warm one about $0.02. Each answer refreshes the hour.
- Prices live in `PRICE` in `limits.ts` and must change with the model in `route.ts`.
- Other caps: 200 AI answers a day, 20 per visitor, 600 characters per question.

## Storage

R2 bucket `holos-chat`, S3 API. `chats/<id>.json` holds one transcript per chat, written only by the server, so the model never sees client-supplied assistant turns. `usage/<YYYY-MM-DD>.json` holds the day's spend, reservations, token totals, and per-visitor counts keyed by salted IP hash. Usage writes are conditional on the etag, so concurrent requests cannot overspend. Without bucket env vars, storage falls back to memory.

## Environment

`AI_GATEWAY_API_KEY`, `CHAT_SECRET`, `CHAT_S3_ENDPOINT`, `CHAT_S3_BUCKET`, `CHAT_S3_ACCESS_KEY_ID`, `CHAT_S3_SECRET_ACCESS_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`. Optional: `CHAT_MODEL`, `CHAT_DAILY_BUDGET_USD`, `CHAT_DAILY_LIMIT`, `CHAT_VISITOR_DAILY_LIMIT`, `CHAT_MAX_TURNS`. The Turnstile widget's hostnames must include every domain the chat runs on.

## Model choice

On 2026-10-04 a blind test of eight tricky questions compared Opus 5.5, Sonnet 5.5, GPT-6 Sol, Gemini 3.1 Pro, and Gemini 3.8 Flash, all reading the same text. All were accurate. Sonnet matched Opus and kept the length and link rules at half the cost. GPT was thin. Both Gemini models ignored the length and link rules. Haiku 4.5, tried earlier, reversed a claim about integration scores.
