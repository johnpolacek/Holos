"use client";

import katex from "katex";
import type React from "react";
import { useEffect, useRef } from "react";

// Only import CSS in browser environment
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("katex/dist/katex.min.css");
}

interface MathInlineProps {
  children: React.ReactNode;
}

export default function MathInline({ children }: MathInlineProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const mathContent = typeof children === "string" ? children : String(children);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(mathContent, containerRef.current, {
        displayMode: false,
        throwOnError: false,
      });
    }
  }, [mathContent]);

  // Include math content as text for SSR/PDF generation, will be replaced by KaTeX on client
  return (
    <span ref={containerRef} className="math-inline">
      {mathContent}
    </span>
  );
}
