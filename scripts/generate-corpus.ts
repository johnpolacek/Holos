// Make React available globally before any imports that use JSX.
// PDFDocument → Content → content-data.tsx, and content-data exports JSX at module load time.
import React from "react";

if (typeof global !== "undefined" && !global.React) {
  global.React = React;
}

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderPDFDocument } from "../lib/generatePDF";

// Removes every element that opens with `open`, counting nested tags of the same name.
function removeBalanced(html: string, open: string, tag: string): string {
  let out = html;
  let start = out.indexOf(open);
  while (start !== -1) {
    let depth = 0;
    let i = start;
    const tagOpen = new RegExp(`<${tag}[\\s>]|</${tag}>`, "g");
    tagOpen.lastIndex = start;
    for (let m = tagOpen.exec(out); m; m = tagOpen.exec(out)) {
      depth += m[0].startsWith("</") ? -1 : 1;
      if (depth === 0) {
        i = m.index + m[0].length;
        break;
      }
    }
    out = out.slice(0, start) + out.slice(i);
    start = out.indexOf(open);
  }
  return out;
}

// Renders the same document as the PDF and flattens it to plain text.
// The chat route sends this to the model as its only knowledge of Holos.
function htmlToText(html: string): string {
  // KaTeX renders math twice. Keep the TeX source, drop the visual copy.
  const withMath = removeBalanced(html, '<span class="katex-html"', "span").replace(
    /<math[\s\S]*?<annotation encoding="application\/x-tex">([\s\S]*?)<\/annotation>[\s\S]*?<\/math>/gi,
    (_, tex: string) => `$${tex.trim()}$`
  );
  // The revision log is a changelog, not content worth answering from.
  const cut = withMath.search(/<[^>]+id="revisions"/);
  return (cut === -1 ? withMath : withMath.slice(0, cut))
    .replace(/<(style|script|svg|head)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(h[1-6])[^>]*>/gi, "\n\n## ")
    .replace(/<\/(p|div|li|h[1-6]|tr|section|blockquote)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n /g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  const html = await renderPDFDocument();
  const text = htmlToText(html);
  const out = join(process.cwd(), "lib", "chat", "corpus.txt");
  writeFileSync(out, `${text}\n`);
  console.log(`✓ Chat corpus written: ${out} (${(text.length / 1024).toFixed(1)} KB)`);
}

main();
