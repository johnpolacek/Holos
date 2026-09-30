// The Introduction's two boxes, taken apart so the ledger and the terms column can lay them
// out item by item. Nothing is retyped: every node comes from content-data.

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { getSection, introBoxes, nodeText } from "../../_shared/content";

type WithChildren = ReactElement<{ children?: ReactNode }>;

const kids = (node: ReactNode) =>
  isValidElement(node) ? Children.toArray((node as WithChildren).props.children) : [];

export type BoxItem = {
  // The bold lead-in of the item, e.g. "Physics, as it stands."
  label: string;
  // Everything after the lead-in, links included.
  body: ReactNode[];
};

export type Box = { heading: string; items: BoxItem[]; after: ReactNode[] };

function takeApart(index: number): Box {
  const box = getSection("introduction").paragraphs[index];
  const parts = kids(box);
  const heading = parts.find((p) => isValidElement(p) && p.type === "h3");
  const list = parts.find((p) => isValidElement(p) && p.type === "ul");
  const after = parts.filter((p) => isValidElement(p) && p.type === "p").flatMap((p) => kids(p));
  const items = kids(list)
    .filter((li) => isValidElement(li) && li.type === "li")
    .map((li) => {
      const [lead, ...rest] = kids(li);
      // Drop the space that followed the lead-in.
      if (typeof rest[0] === "string") rest[0] = rest[0].replace(/^\s+/, "");
      return { label: nodeText(lead), body: rest };
    });
  return { heading: nodeText(heading), items, after };
}

export const claims = takeApart(introBoxes.claims);
export const terms = takeApart(introBoxes.terms);

// Subsection headings inside a section's paragraphs (an h3 with an id), for the chapter card.
export function subsections(paragraphs: ReactNode[]) {
  const found: { id: string; title: string }[] = [];
  const walk = (node: ReactNode) => {
    if (!isValidElement(node)) return;
    const props = (node as ReactElement<{ id?: string; children?: ReactNode }>).props;
    if (node.type === "h3" && props.id) found.push({ id: props.id, title: nodeText(node) });
    for (const k of kids(node)) walk(k);
  };
  for (const p of paragraphs) walk(p);
  return found;
}
