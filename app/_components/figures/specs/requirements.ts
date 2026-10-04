import type { FigureSpec } from "../types";

// Observer Requirements, after the introduction to the list.
export const SPEC: FigureSpec = {
  scene: "add.requirements",
  still: "logic3-requirements.png",
  label:
    "Engraved figure: four plinths, one per requirement. A ring of parts acting on each other both ways, beside a chain that only passes signals on. A field of toggles with many states. The same loop stacked across moments. A small model mirroring a terrain, beside switches that mirror nothing. Together the four hold an aperture open, and removing one closes it. Last, a large regular array of gates stays shut, even with a sensor at every gate.",
  stages: [
    {
      title: "Integration",
      caption:
        "The parts constrain one another in both directions, so the current state shapes the next. Signals that sweep through once integrate nothing.",
    },
    {
      title: "Differentiation",
      caption:
        "The system must distinguish among a large repertoire of possible internal states. Without that, there is no information to integrate.",
    },
    {
      title: "Temporal cohesion",
      caption:
        "Informational states must persist and integrate across time. Experience requires continuity, not isolated moments.",
    },
    {
      title: "Aboutness",
      caption:
        "The integrated states must model a world beyond the system, as a flight simulator mirrors a runway. A bank of light switches mirrors nothing.",
    },
    {
      title: "All four",
      caption:
        "Together they are enough to host a point of view. Remove any one and observation ends.",
    },
    {
      title: "Why aboutness",
      caption:
        "A large regular array of simple gates can outscore a brain on integration while modeling nothing. Aboutness rules it out, even with a sensor at every gate.",
    },
  ],
};
