// Shared content access for the redesign prototypes. The text is the site's own, unchanged:
// the Overview's sections come from content-data, the Logic page is the Logic component.

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { type ContentSection, sections } from "@/app/_components/content-data";
import { logicSubsections, predictionsSubsections, theorySubsections } from "@/lib/navigation";

export { logicSubsections, predictionsSubsections, sections, theorySubsections };
export type { ContentSection };

// Plain text of a React tree: strings, numbers, and the children of elements.
export function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement(node)) {
    const props = (node as ReactElement<{ children?: ReactNode }>).props;
    return Children.toArray(props.children).map(nodeText).join("");
  }
  return "";
}

export const words = (text: string) => text.split(/\s+/).filter(Boolean).length;
export const minutes = (count: number) => Math.max(1, Math.round(count / 230));

// A paragraph that holds a block (the claims box, the key terms, a table) must not sit in a <p>.
export function isBlock(node: ReactNode): boolean {
  if (!isValidElement(node)) return false;
  if (node.type === "div" || node.type === "ul" || node.type === "table") return true;
  if (typeof node.type === "function") return true; // a component such as a comparison table
  const children = (node as ReactElement<{ children?: ReactNode }>).props.children;
  return Children.toArray(children).some(isBlock);
}

export type SectionInfo = {
  id: string;
  title: string;
  words: number;
  minutes: number;
  // The section's first sentence, verbatim, for indexes and previews.
  lede: string;
};

function firstSentence(text: string) {
  const t = text.replace(/\s+/g, " ").trim();
  const m = t.match(/^.{40,}?[.?!](?=\s+[A-Z“"(]|$)/);
  return m ? m[0] : t;
}

export const sectionInfo: SectionInfo[] = sections.map((s) => {
  const text = s.paragraphs.map(nodeText).join(" ");
  const count = words(text);
  return {
    id: s.id,
    title: s.title,
    words: count,
    minutes: minutes(count),
    lede: firstSentence(nodeText(s.paragraphs[0])),
  };
});

export const overviewMinutes = minutes(sectionInfo.reduce((n, s) => n + s.words, 0));

export function getSection(id: string) {
  const s = sections.find((x) => x.id === id);
  if (!s) throw new Error(`No section ${id}`);
  return s;
}

// Paragraph index of the two boxes inside the Introduction, so a design can place them apart.
export const introBoxes = (() => {
  const intro = getSection("introduction");
  const find = (key: string) =>
    intro.paragraphs.findIndex((p) => isValidElement(p) && p.key === key);
  return { claims: find("claims-box"), terms: find("key-terms") };
})();
