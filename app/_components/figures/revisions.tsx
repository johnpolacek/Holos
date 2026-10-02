import type { FigureSpec } from "./types";

// Figure specs for the Revisions page and sitewide. Export each spec by name and place it in the page with
// <SpecFigure spec={...} isPDF={isPDF} /> right after the passage it illustrates.

const TIMELINE: FigureSpec = {
  scene: "revisions.timeline",
  still: "revisions-timeline.png",
  label:
    "Engraved figure: a long beam with a marker standing on it for every revision, oldest at the left. Retired claims are hatched stubs. Replaced claims are stubs with a clean pillar built on them. Narrowed, widened, corrected, and reversed claims each have their own shape.",
  stages: [
    {
      title: "Oldest first",
      caption:
        "Holos is written in public and revised when it is wrong. Every claim below stands on one line, oldest first.",
    },
    {
      title: "One by one",
      caption:
        "Each was retired or replaced for a stated reason. Each entry names what happened to the claim.",
    },
    {
      title: "Kinds of change",
      caption:
        "Some claims were retired or dropped. Others were narrowed, widened, corrected, or reversed. Most often, a claim was replaced.",
    },
    {
      title: "Still open",
      caption:
        "The newest entries come last. The line stays open, since Holos is revised when it is wrong.",
    },
  ],
};

export const SPECS: Record<string, FigureSpec> = {
  timeline: TIMELINE,
};
