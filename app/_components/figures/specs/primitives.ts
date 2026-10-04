import type { FigureSpec } from "../types";

// After D1: information exists only as differences within some structure.
export const SPEC: FigureSpec = {
  scene: "add.primitives",
  still: "logic3-primitives.png",
  label:
    "Engraved figure: a coin tossed, landing heads, then tails, a difference between two states. The view pulls back to a tray of coins, each showing a side. Small bridges join some coins, so linked coins turn over together or always show opposite sides. The coins keep turning while the pattern of bridges stays the same.",
  stages: [
    {
      title: "A difference",
      caption:
        "A coin that can land heads or tails carries a difference between two states. That difference is information.",
    },
    {
      title: "Within a structure",
      caption:
        "Information is not a substance or a thing on its own. It exists only as differences within some structure.",
    },
    {
      title: "Relations",
      caption:
        "A relation is a constraint that links informational states. Linked coins turn together, or always show opposite sides.",
    },
    {
      title: "Structure",
      caption:
        "The coins change, and the pattern of links stays. In Holos, structure is nothing more than stable patterns of relation.",
    },
  ],
};
