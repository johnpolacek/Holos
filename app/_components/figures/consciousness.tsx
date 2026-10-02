import type { FigureSpec, InlineMap } from "./types";

// Figures for the Consciousness section, each placed after the paragraph it illustrates.

const JOINED: FigureSpec = {
  scene: "consciousness.joined",
  still: "consciousness-joined.png",
  label:
    "Engraved figure: a rock and a person on one plinth. Seen through, both are clouds of the same kind of atoms. The rock's atoms jostle loose. The person's are linked into one network that pulses as one, and an aperture opens above the person.",
  stages: [
    { title: "No point of view", caption: "A rock has no point of view. A person does." },
    {
      title: "The same atoms",
      caption:
        "Both are made of the same kind of atoms. What matters is how they are organized, not what they are made of.",
    },
    {
      title: "Integration",
      caption: "The difference is integration, how fully a system's parts act as one.",
    },
    {
      title: "An aperture",
      caption:
        "Past a threshold, it opens an aperture, where the universe is experienced from the inside.",
    },
  ],
};

const FLUENCY: FigureSpec = {
  scene: "consciousness.fluency",
  still: "consciousness-fluency.png",
  label:
    "Engraved figure: a chart with output along the floor and integration up the wall. A locked-in person lies on a tall column at the quiet end, an aperture open above. A language model sits on a low column at the fluent end, words streaming in and out. A threshold plane passes between them.",
  stages: [
    {
      title: "Two measures",
      caption:
        "Set two measures side by side. How much a system puts out, and how fully its parts act as one.",
    },
    {
      title: "Locked in",
      caption: "A person with locked-in syndrome cannot move or speak but is fully aware.",
    },
    {
      title: "Fluent",
      caption:
        "Today's language models take in the world's data and speak fluently, but experience nothing.",
    },
    {
      title: "The threshold",
      caption:
        "What matters is not input or output. A locked-in brain is past the threshold. Language models are not.",
    },
  ],
};

const ECHO: FigureSpec = {
  scene: "consciousness.echo",
  still: "consciousness-echo.png",
  label:
    "Engraved figure: a magnetic coil taps an engraved brain. Awake, activity spreads across the brain and the trace beside it is rich. Not conscious, only a local blip lights and the trace is one simple wave. A ruler below marks the published cutoff of 0.31.",
  stages: [
    {
      title: "A tap",
      caption:
        "No one can yet compute integration for a whole brain. But stand-ins work. One taps the brain with a magnetic pulse and measures the echo.",
    },
    { title: "Conscious", caption: "The echo is rich and widespread when someone is conscious." },
    { title: "Not conscious", caption: "It is simple or local when they are not." },
    {
      title: "A cutoff",
      caption:
        "In people, a cutoff on that echo already separates the two. Where the threshold falls for other kinds of system is still open.",
    },
  ],
};

export const INLINE: InlineMap = {
  consciousness: { 0: [JOINED], 1: [FLUENCY], 2: [ECHO] },
};
