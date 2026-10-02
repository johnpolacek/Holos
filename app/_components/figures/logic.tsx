import type { FigureSpec } from "./types";

// Figure specs for the Logic page, from the Claims through the Threshold and Observer
// Requirements. Each is placed with <SpecFigure spec={LOGIC.name} isPDF={isPDF} /> right
// after the passage it illustrates.

const claims: FigureSpec = {
  scene: "logic.claims",
  still: "logic-claims.png",
  label:
    "Engraved figure: the claims of Holos as a stepped dais. The raised center holds the two additions, the threshold and Omega. Around it, lower rings hold the sides taken, the method, the hypothesis, the open problems, and the companion ideas. The hypothesis and companion rings drop away and the center still stands.",
  stages: [
    {
      title: "Two additions",
      caption:
        "Holos is built on two ideas, a threshold and Omega, the whole. They are its two additions to physics. Neither changes any equation.",
    },
    {
      title: "Sides taken",
      caption:
        "Around them, Holos takes sides in reading the physics we already have, such as branching quantum mechanics with no collapse.",
    },
    {
      title: "Method",
      caption:
        "It sets a method. Infinities signal a broken description, not a feature of reality.",
    },
    {
      title: "Open edges",
      caption:
        "A hypothesis, that crossing the threshold is a genuine transition. Open problems, the measure of integration, where the threshold falls, and the boundaries between observers.",
    },
    {
      title: "Companions",
      caption: "Companion ideas sit at the edge, not in the core. Holos says which is which.",
    },
    {
      title: "The core stands",
      caption:
        "If the hypothesis fails, the core stands. If the companion ideas fail, the core stands.",
    },
  ],
};

const axioms: FigureSpec = {
  scene: "logic.axioms",
  still: "logic-axioms.png",
  label:
    "Engraved figure: five axioms as pillars. Axioms 3 and 5, the additions, are clean. Axioms 1, 2, and 4, the sides taken, are hatched. Axioms 1, 3, 4, and 5 stand on a shared plinth, the core. Axiom 2 stands apart and forks into two versions, without collapse and with collapse. Propositions I to III hang above on links to the axioms they follow from, Proposition IV stands alone as method, and tests sit at the top.",
  stages: [
    {
      title: "Five axioms",
      caption: "These five axioms are the framework.",
    },
    {
      title: "Additions and sides",
      caption:
        "Axioms 3 and 5 are its two additions to physics. Axioms 1, 2, and 4 are the sides it takes in reading the physics we already have.",
    },
    {
      title: "The core",
      caption:
        "Four of them, Axioms 1, 3, 4, and 5, hold whichever reading of quantum physics proves right. They are the core.",
    },
    {
      title: "Two versions",
      caption:
        "Axiom 2 is the one side taken on quantum physics itself. It divides Holos into two versions sharing the core, without collapse, the version defended here, and with collapse, declared in advance.",
    },
    {
      title: "What follows",
      caption:
        "The propositions follow from the axioms. Proposition IV is a principle of method, not derived from them.",
    },
    {
      title: "Where it can lose",
      caption:
        "Tests sit at the top. Test A is where the integration claim can lose. Test B checks the twilight's width. Check C asks whether records agree.",
    },
  ],
};

export const SPECS = { claims, axioms } satisfies Record<string, FigureSpec>;
