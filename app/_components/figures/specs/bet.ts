import type { FigureSpec } from "../types";

// The standing bet and the two versions (Predictions #standing-bet).
export const SPEC: FigureSpec = {
  scene: "add.bet",
  still: "predictions2-bet.png",
  label:
    "Engraved figure: a ball drawn twice, for a system in two states at once, with a particle beside it in the measuring role and a plot of the superposition fading over time. A person takes the particle's place and the curve is the same. Threads run from the system to bits of its surroundings. A dashed, steeper curve marks the deviation that would lose the bet. Then a Φ axis with a photon, a molecule, and a circuit far below a hatched threshold, and an observer past it, not yet tested. Last, one core carrying two versions, a branching tree and a single line.",
  stages: [
    {
      title: "Same laws",
      caption:
        "A conscious observer obeys the same quantum laws as a photon. Put a particle in the measuring role, and the superposition fades.",
    },
    {
      title: "Someone home",
      caption:
        "Put an integrated system in the particle's place. Holos predicts no deviation whatsoever.",
    },
    {
      title: "Why it fades",
      caption:
        "The system becomes entangled with its surroundings. That is decoherence, never someone being home.",
    },
    {
      title: "How it loses",
      caption:
        "If a superposition ever degraded when an observer registered it, beyond what decoherence accounts for, Holos without collapse would be falsified.",
    },
    {
      title: "Untested",
      caption:
        "Photons, molecules, and circuits all sit far below the threshold. No system put in superposition so far has been an observer, so the bet is untested.",
    },
    {
      title: "Two versions",
      caption:
        "Both versions share one core. Holos without collapse, every branch, is the one defended. Holos with collapse, one history, is declared now.",
    },
  ],
};
