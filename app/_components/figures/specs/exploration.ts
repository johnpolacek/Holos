import type { FigureSpec } from "../types";

// Technology, Exploration, after "...reserved for regimes where inference alone breaks down."
export const SPEC: FigureSpec = {
  scene: "add.exploration",
  still: "predictions2-exploration.png",
  label:
    "Engraved figure: a home system maps the stars around it from afar, with sight lines to each. Two models of one target disagree. A small probe flies there, parks, and waits, sending one dense report home. Last, light bends around a star to a focus far behind it, where a small observatory sits.",
  stages: [
    {
      title: "Mapped from afar",
      caption:
        "At cosmic scales, most structure is mapped remotely and shared through long-horizon communication.",
    },
    {
      title: "Where models disagree",
      caption:
        "Physical exploration is rare and deliberate, reserved for places where inference alone breaks down.",
    },
    {
      title: "A sentinel",
      caption:
        "A compact, autonomous probe parks and watches, long dormant, sending rare, information-dense reports. Sentinels exist to watch, not to arrive.",
    },
    {
      title: "A gravitational lens",
      caption:
        "A star's gravity bends light like a giant lens. An observatory at the focus sees in extreme detail without large, glowing infrastructure. This is speculation.",
    },
  ],
};
