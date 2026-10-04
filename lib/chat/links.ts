import { sections } from "../navigation";

// Every internal path the chat may link to. Shared by the prompt and the panel,
// which renders any other internal link as plain text.

export const SITE_LINKS: { title: string; path: string }[] = [
  ...sections.flatMap((s) => [
    { title: s.title, path: s.path },
    ...s.subsections.map((sub) => ({
      title: `${s.title} > ${sub.title}`,
      path: `${s.path}#${sub.id}`,
    })),
  ]),
  { title: "PDF of the full text", path: "/holos.pdf" },
];

const valid = new Set(SITE_LINKS.map((l) => l.path.replace(/^\/#/, "#")));

export function isValidSiteLink(href: string): boolean {
  if (/^https?:\/\//.test(href)) return true;
  return valid.has(href.replace(/^\/#/, "#"));
}
