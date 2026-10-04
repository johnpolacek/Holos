import type { FigureSpec } from "../types";

// Open Problems, "Where one observer ends and another begins".
export const SPEC: FigureSpec = {
  scene: "add.boundaries",
  still: "logic3-boundaries.png",
  label:
    "Engraved figure: integration drawn as a landscape. An aperture sits on each high peak, since only a local maximum is an aperture. Around one peak, several candidate boundaries overlap. Then the measure changes, the landscape shifts, and the peaks move with it.",
  stages: [
    {
      title: "A local maximum",
      caption:
        "Only a local maximum of integration is an aperture. Which maximum depends on the measure, still unsettled.",
    },
    {
      title: "Overlapping candidates",
      caption:
        "There is no stated procedure yet for which candidate systems are compared, or how overlapping ones resolve. IIT has one. Holos has not adopted or replaced it.",
    },
    {
      title: "Fixed in principle",
      caption:
        "Change the measure and the peaks move. Until the measure and the procedure are fixed, the boundaries between observers are fixed only in principle.",
    },
  ],
};
