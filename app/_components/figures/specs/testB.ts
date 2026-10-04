import type { FigureSpec } from "../types";

// Test B, after "Small cultures should cross gradually, and larger cultures... more steeply."
export const SPEC: FigureSpec = {
  scene: "add.testB",
  still: "predictions2-test-b.png",
  label:
    "Engraved figure: three dishes of grown neurons, small, medium, and large, the largest wired to a simple game. A knob on each turns a condition. On a board behind, integration climbs gradually for the small culture and steeply for the large one. Then the curves fall to one steepness at every size, the way the test loses.",
  stages: [
    {
      title: "Grown networks",
      caption:
        "Networks of living neurons grown in a dish, wired to simple environments, are the cheapest place to look. The setup shows nothing about experience by itself.",
    },
    {
      title: "Turn a condition",
      caption:
        "Turn a condition such as a drug dose or connectivity, and track an integration measure fixed in advance.",
    },
    {
      title: "Steeper with size",
      caption:
        "Small cultures should cross gradually, and larger ones more steeply. The test is how the steepness scales with size, not whether a transition happens.",
    },
    {
      title: "How it loses",
      caption:
        "If the steepness does not grow with size, Holos loses claim 3, not its core. This tests the threshold's shape, not presence itself.",
    },
  ],
};
