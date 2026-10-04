import type { FigureSpec } from "../types";

// Check C, after its status paragraph.
export const SPEC: FigureSpec = {
  scene: "add.checkC",
  still: "predictions2-check-c.png",
  label:
    "Engraved figure: a friend in a sealed lab measures a particle. Outside, Wigner aims an instrument at the whole lab. Three pillars under one beam stand for three assumptions, and the first, facts for everyone, is pulled away. Last, the friend gives way to a photon, as in today's experiments.",
  stages: [
    {
      title: "The friend",
      caption: "A friend sealed in a lab measures a particle and sees a result.",
    },
    {
      title: "Wigner",
      caption:
        "Outside, Wigner treats the whole lab, friend included, as one quantum system and runs a measurement that probes the friend's result.",
    },
    {
      title: "Three assumptions",
      caption:
        "If the friend's result counts as a fact, three assumptions cannot all hold. Experiments break the limit they set, as quantum theory predicts. Holos gives up facts for everyone.",
    },
    {
      title: "Today's friends",
      caption:
        "The friends in current experiments are photons, far below the threshold. These experiments test the logic of observed events, not registration itself.",
    },
  ],
};
