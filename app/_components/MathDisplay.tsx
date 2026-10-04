import katex from "katex";
import type React from "react";

// Display math, rendered to KaTeX HTML on the server (see MathInline).
export default function MathDisplay({ children }: { children: React.ReactNode }) {
  const tex = typeof children === "string" ? children : String(children);
  const html = katex.renderToString(tex, { displayMode: true, throwOnError: false });
  return (
    <div className="my-4 py-4 px-6 bg-black/5 border-l-2 border-black/30 font-mono text-center text-lg">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX output for author-written TeX */}
      <div className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
