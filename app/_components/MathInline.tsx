import katex from "katex";
import type React from "react";

// Inline math, rendered to KaTeX HTML on the server. No client code, so it renders the same
// on the site, in the build-time PDF, and in the on-demand PDF route. KaTeX's stylesheet is
// loaded once in the root layout (and by URL in the PDF document).
export default function MathInline({ children }: { children: React.ReactNode }) {
  const tex = typeof children === "string" ? children : String(children);
  const html = katex.renderToString(tex, { displayMode: false, throwOnError: false });
  // biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX output for author-written TeX
  return <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />;
}
