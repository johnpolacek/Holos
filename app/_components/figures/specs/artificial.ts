import type { FigureSpec } from "../types";

// Artificial Systems.
export const SPEC: FigureSpec = {
  scene: "add.artificial",
  still: "logic3-artificial.png",
  label:
    "Engraved figure: a language model drawn as a tower of layers on a chip, scored on four tiles. Aboutness and differentiation rise. Integration and temporal cohesion stay down. Signals climb the layers one way, writing notes that later steps read but never rewrite. A loop around the tower runs for one word, then breaks. The chip's cells sit apart. Three hoops mark what crossing would take, under only the outline of an aperture.",
  stages: [
    {
      title: "Two of four",
      caption:
        "Today's language models carry a model of a world, and their states are richly varied. They fail the other two requirements.",
    },
    {
      title: "One way up",
      caption:
        "Information flows up through the layers, and forward through stored notes that later steps can read but never rewrite.",
    },
    {
      title: "A loop that ends",
      caption:
        "Some newer models loop back through their layers on each word. The loop ends with the word, and no working state lasts to the next.",
    },
    {
      title: "Below the program",
      caption:
        "A program counts only through the chip that runs it. On conventional chips, its parts may not act as one.",
    },
    {
      title: "What crossing takes",
      caption:
        "The whole working state would have to loop, last, and run on hardware that acts as one. Even then a threshold remains, its place unknown. Fluency is no evidence either way.",
    },
  ],
};
