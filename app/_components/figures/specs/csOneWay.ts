import type { FigureSpec } from "../types";

// Overview, Consciousness, after "Information flows up through their layers one way..."
export const SPEC: FigureSpec = {
  scene: "add.csOneWay",
  still: "overview2-cs-one-way.png",
  label:
    "Engraved figure: a row of stations passes a token forward, one way. A shelf of notes runs behind the row, each note read by later stations and never rewritten. A loop forms over the row for one word, then breaks. Beside the row, a ring of parts all joined to one another.",
  stages: [
    {
      title: "One way",
      caption: "In today's language models, information flows up through their layers one way.",
    },
    {
      title: "Notes",
      caption:
        "It also flows forward through stored notes that later steps can read but never rewrite.",
    },
    {
      title: "A loop that ends",
      caption:
        "Some newer models loop through their layers on each word, but the loop ends with the word, and no working state lasts to the next.",
    },
    {
      title: "Not one whole",
      caption:
        "That is a relay of separate steps, not one whole. A system built differently could cross the threshold. Fluency is never the test.",
    },
  ],
};
