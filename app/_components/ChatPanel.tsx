"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { isValidSiteLink } from "../../lib/chat/links";

// Cloudflare's always-pass test key keeps local dev working without real keys.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";
const STORAGE_KEY = "holos-chat";
const MAX_CHARS = 600;

// Phrased to match canned answers, so trying them costs nothing.
const STARTERS = ["What is Holos?", "Is AI conscious?", "What is Omega?", "Where are the aliens?"];

type Status = { verified: boolean; state: "open" | "closed" | "visitor-limit" };

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const newChatId = () =>
  `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;

function loadSaved(): { id: string; messages: UIMessage[] } {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (saved?.id && Array.isArray(saved.messages)) return saved;
  } catch {}
  return { id: newChatId(), messages: [] };
}

const closedMessage = {
  closed: "The chat has reached its limit for today. It reopens tomorrow.",
  "visitor-limit": "You've reached today's question limit. Come back tomorrow.",
};

function errorText(error: Error): string {
  try {
    const code = JSON.parse(error.message)?.error;
    if (code === "captcha") return "The human check expired. Please try again.";
    if (code in closedMessage) return closedMessage[code as keyof typeof closedMessage];
  } catch {}
  return "Something went wrong. Please try again.";
}

// Internal links the model made up render as plain text.
function ChatLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  if (!href || !isValidSiteLink(href)) return <span>{children}</span>;
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [saved, setSaved] = useState(loadSaved);
  const [status, setStatus] = useState<Status | null>(null);
  const [input, setInput] = useState("");
  const tokenRef = useRef<string | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        // The server keeps the transcript, so only the new question is sent.
        prepareSendMessagesRequest: ({ id, messages }) => {
          const last = messages[messages.length - 1];
          const text = last.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
          const body = { id, text, turnstileToken: tokenRef.current ?? undefined };
          tokenRef.current = null;
          return { body };
        },
      }),
    []
  );

  const {
    messages,
    sendMessage,
    status: chatStatus,
    error,
    setMessages,
    clearError,
  } = useChat({
    id: saved.id,
    messages: saved.messages,
    transport,
    onFinish: () => setStatus((s) => (s ? { ...s, verified: true } : s)),
    onError: (err) => {
      if (err.message.includes('"captcha"')) setStatus((s) => (s ? { ...s, verified: false } : s));
      if (err.message.includes('"closed"')) setStatus((s) => (s ? { ...s, state: "closed" } : s));
      if (err.message.includes('"visitor-limit"'))
        setStatus((s) => (s ? { ...s, state: "visitor-limit" } : s));
    },
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: saved.id, messages }));
    } catch {}
  }, [saved.id, messages]);

  useEffect(() => {
    if (!open) return;
    fetch("/api/chat")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ verified: false, state: "open" }));
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // The captcha renders only until the visitor has a session cookie.
  const needsCaptcha = status?.state === "open" && !status.verified;
  useEffect(() => {
    if (!needsCaptcha || !widgetRef.current) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !widgetRef.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        appearance: "interaction-only",
        theme: "light",
        callback: (token: string) => {
          tokenRef.current = token;
          setHasToken(true);
        },
        "expired-callback": () => {
          tokenRef.current = null;
          setHasToken(false);
        },
      });
    };
    if (window.turnstile) render();
    else if (!document.getElementById("turnstile-script")) {
      const script = document.createElement("script");
      script.id = "turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = render;
      document.head.appendChild(script);
    } else {
      document.getElementById("turnstile-script")?.addEventListener("load", render);
    }
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
      setHasToken(false);
    };
  }, [needsCaptcha]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll whenever messages change
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const busy = chatStatus === "submitted" || chatStatus === "streaming";
  const closed = status && status.state !== "open";
  const canSend = !busy && !closed && (!needsCaptcha || hasToken);

  const send = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || !canSend) return;
      clearError();
      sendMessage({ text: t.slice(0, MAX_CHARS) });
      setInput("");
    },
    [canSend, clearError, sendMessage]
  );

  const reset = () => {
    setMessages([]);
    clearError();
    setSaved({ id: newChatId(), messages: [] });
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-white/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <section
        aria-label="Ask about Holos"
        aria-hidden={!open}
        className={`fixed top-0 right-0 z-50 h-[100dvh] w-full sm:w-[420px] bg-white border-l border-black/20 border-dashed flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between px-5 h-14 border-b border-black/20 border-dashed shrink-0">
          <h2 className="text-sm font-medium opacity-80">Ask about Holos</h2>
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={reset}
                title="New chat"
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span className="sr-only">New chat</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={18} aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </header>

        <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5 text-sm">
          {messages.length === 0 && (
            <div className="flex flex-col gap-4">
              <p className="opacity-60 leading-relaxed">
                Answers come from the text of this site. They can be wrong, so follow the links to
                check.
              </p>
              <div className="flex flex-wrap gap-2">
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    disabled={!canSend}
                    onClick={() => send(q)}
                    className="text-xs border border-black/30 border-dashed rounded px-3 py-1.5 opacity-80 hover:opacity-100 hover:border-black/60 transition-all disabled:opacity-40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) =>
            m.role === "user" ? (
              <p
                key={m.id}
                className="self-end max-w-[85%] border border-black/20 rounded px-3 py-2"
              >
                {m.parts.map((p) => (p.type === "text" ? p.text : "")).join("")}
              </p>
            ) : (
              <div key={m.id} className="chat-answer leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{ a: ChatLink }}
                >
                  {m.parts.map((p) => (p.type === "text" ? p.text : "")).join("")}
                </ReactMarkdown>
              </div>
            )
          )}
          {chatStatus === "submitted" && <p className="opacity-40 animate-pulse">Thinking…</p>}
          {error && !closed && <p className="text-xs opacity-60">{errorText(error)}</p>}
        </div>

        <div className="shrink-0 border-t border-black/20 border-dashed px-5 pt-3 pb-5">
          {closed ? (
            <p className="text-xs opacity-60 py-2">
              {closedMessage[status.state as keyof typeof closedMessage]}
            </p>
          ) : (
            <>
              {needsCaptcha && <div ref={widgetRef} className="mb-2 empty:hidden" />}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2 border border-black/40 rounded px-3 py-2 focus-within:border-black/70 transition-colors"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  maxLength={MAX_CHARS}
                  rows={1}
                  placeholder={
                    needsCaptcha && !hasToken ? "Checking you're human…" : "Ask a question"
                  }
                  onChange={(e) => {
                    setInput(e.target.value);
                    // Grow with the text, up to the max height.
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  className="flex-1 resize-none bg-transparent text-sm outline-none max-h-32"
                />
                <button
                  type="submit"
                  disabled={!canSend || !input.trim()}
                  className="shrink-0 border border-black/40 rounded p-1 opacity-80 hover:opacity-100 disabled:opacity-30 transition-opacity"
                >
                  <ArrowUp size={14} aria-hidden="true" />
                  <span className="sr-only">Send</span>
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>,
    document.body
  );
}
