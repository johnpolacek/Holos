import type { FigureSpec } from "../types";

// Why Integration, after the screen and pixels passage.
export const SPEC: FigureSpec = {
  scene: "add.integration",
  still: "logic3-integration.png",
  label:
    "Engraved figure: a screen shows one seamless picture, then pulls apart into separate pixels. A heap of sand loses a grain and nothing else moves. A joined web is pulled at one part and the rest follow. A viewer stands before the screen, and a small joined knot in the viewer's head marks where the picture's unity lives.",
  stages: [
    {
      title: "One picture, many parts",
      caption:
        "The image on a screen is seamless, and the pixels beneath it are strangers to each other. Unity in what appears does not fix the wiring behind it.",
    },
    {
      title: "A heap",
      caption: "A heap of sand is many things in a pile. Remove a grain and nothing else notices.",
    },
    {
      title: "A body",
      caption:
        "A body is one thing. Its parts constrain each other everywhere. Being one, for a structure, is its parts making a difference to one another.",
    },
    {
      title: "Where the unity lives",
      caption:
        "Nobody thinks the screen has a point of view. The picture's unity lives in the one structure here whose parts do constrain each other, the viewer's brain.",
    },
  ],
};
