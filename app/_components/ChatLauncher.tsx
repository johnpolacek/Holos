"use client";
import { MessageCircle } from "lucide-react";
import { useCallback, useState } from "react";
import ChatPanel from "./ChatPanel";

// Pinned to the top right of the layout, which never scrolls, so it stays put while the
// text scrolls beneath. It sits inside the text column's right padding, so it never covers
// a line: a bare icon in the 32px gutter on small screens (mirroring the menu icon on the
// left), an outlined circle in the 64px gutter from lg up.
export default function ChatLauncher() {
  // The panel mounts on first open, so the captcha script loads only for people who chat.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
        title="Ask about Holos"
        className="chat-launcher absolute z-30 top-2 right-2 lg:top-4 lg:right-5 flex items-center justify-center lg:w-9 lg:h-9 lg:rounded-full lg:border lg:border-black/40 lg:bg-white opacity-70 hover:opacity-100 hover:lg:border-black/70 transition-all active:scale-95"
      >
        <MessageCircle className="w-5 h-5 lg:w-4 lg:h-4" aria-hidden="true" />
        <span className="sr-only">Ask about Holos</span>
      </button>
      {mounted && <ChatPanel open={open} onClose={close} />}
    </>
  );
}
