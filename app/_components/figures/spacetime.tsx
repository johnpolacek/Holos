import EraserFigure from "../EraserFigure";
import type { FigureSpec, InlineMap } from "./types";

// Figures for the Spacetime and Infinity sections.

const CONE: FigureSpec = {
  scene: "spacetime.cone",
  still: "spacetime-cone.png",
  label:
    "Engraved figure: a flash on a flat sheet of space sends out a ring of light past two observers, one at rest and one walking. Stacked up a time axis, the spreading ring becomes a cone, and a second cone runs down into the past. Two histories pass through the flash, one upright and one tilted, both inside the same cone.",
  stages: [
    {
      title: "One speed",
      caption:
        "Light spreads from a flash. Its speed is the same for every observer, however they move. No other speed behaves this way.",
    },
    {
      title: "Space and time",
      caption:
        "Stack each moment of space up a time axis. The spreading ring of light becomes a cone.",
    },
    {
      title: "Past and future",
      caption:
        "The cone runs both ways. Above is what the flash can reach. Below is what could have reached it. The rest is elsewhere.",
    },
    {
      title: "One geometry",
      caption:
        "A moving observer's history tilts. The cone does not. That one fact links space and time into a single geometry.",
    },
  ],
};

const NO_NOW: FigureSpec = {
  scene: "spacetime.now",
  still: "spacetime-now.png",
  label:
    "Engraved figure: a block of spacetime lying on its side, time running left to right from the Big Bang. Two flashes, A and B, sit on one flat slice, one observer's now. A second observer passes him, moving, and her now is a tilted slice, on which A has already happened and B has not. A fan of other tilted slices shows there is no universal now, and the whole block holds them all.",
  stages: [
    {
      title: "The same time",
      caption:
        "Two flashes go off at the same time for one observer. His now is a flat slice through space.",
    },
    {
      title: "A different time",
      caption:
        "Another observer passes him, moving. Her now is tilted. For her, A has already happened and B has not.",
    },
    {
      title: "No universal now",
      caption: "Every observer slices at its own angle. No slice is the true one.",
    },
    {
      title: "The block",
      caption:
        "So many physicists picture the universe as a block, every moment part of one four-dimensional whole, with the Big Bang as its edge.",
    },
  ],
};

const LIVED_LIT: FigureSpec = {
  scene: "lived",
  still: "lived-lit-unlit.png",
  label:
    "Engraved figure: a block of spacetime rising from the Big Bang, with galaxy histories as lines. Observers sit near the top, and each one's past light cone reaches down to the Big Bang. Histories inside a cone are inked as lit. Those outside every cone stay faint and unlit.",
  stages: [
    {
      title: "The block",
      caption:
        "Every moment of the universe as one whole. Time runs up from the Big Bang. Each line is the history of a galaxy.",
    },
    {
      title: "Lived",
      caption:
        "Experience occurs only inside observers, a brief stretch of one history. No one lived through the early universe.",
    },
    {
      title: "Lit",
      caption:
        "Everything that could have sent a signal to the observer lies in its past. Starlight reaching its eye puts that galaxy there.",
    },
    {
      title: "The lit world",
      caption:
        "Add observers and their pasts join. Together they are the lit world, the world experience is made from.",
    },
    {
      title: "Unlit",
      caption:
        "What no signal could ever carry to any observer stays unlit. It exists as pattern but is never lived.",
    },
    {
      title: "A fact about arrangement",
      caption:
        "Nothing happens to a place when it is lit. Being lit is a fact about how the block is arranged.",
    },
  ],
};

const TRACES: FigureSpec = {
  scene: "spacetime.traces",
  still: "spacetime-traces.png",
  label:
    "Engraved figure: an observer stands on a cut slab of rock, an aperture open above. Light from a far star runs to the observer's eye. A sky dome sends the afterglow of the Big Bang in from every direction. A fossil shell in the rock below is read too. All three traces are the lit past arriving.",
  stages: [
    {
      title: "An observer",
      caption: "Every observer is built from its lit past, and draws on it through traces.",
    },
    {
      title: "Starlight",
      caption: "Starlight reaching your eye puts its galaxy in your past.",
    },
    {
      title: "The afterglow",
      caption: "The afterglow of the Big Bang arrives too, from every direction of the sky.",
    },
    {
      title: "The fossil record",
      caption: "The fossil record is a trace as well, the past kept in rock.",
    },
    {
      title: "The lit past",
      caption:
        "Each trace is the lit past, arriving now. The lit region is the world experience is made from.",
    },
  ],
};

const EDGE: FigureSpec = {
  scene: "spacetime.edge",
  still: "spacetime-edge.png",
  label:
    "Engraved figure: a gravity well plunging toward a black hole's center, one inked curve shooting down it until the engraving stops and only dashes continue. Then a railway whose parallel rails run to one point on the horizon, marked as the point at infinity. Last, an endless straight line bends into a loop, closed at the top by one added point.",
  stages: [
    {
      title: "Infinite density",
      caption: "At the center of a black hole, general relativity predicts infinite density.",
    },
    {
      title: "The edge of a description",
      caption:
        "Most physicists read that as the theory breaking down, not as something real. Infinity usually marks the edge of a description.",
    },
    {
      title: "Parallel lines",
      caption:
        "Geometry shows the other side. Parallel rails never meet, yet they run to one point.",
    },
    {
      title: "A point at infinity",
      caption: "In projective geometry, parallel lines do meet, at a point at infinity.",
    },
    {
      title: "A closed picture",
      caption:
        "Add that one point and an endless line closes into a loop. Something endless, captured in a closed picture.",
    },
  ],
};

const CLOSURE: FigureSpec = {
  scene: "closure",
  still: "closure.png",
  label:
    "Engraved figure: a flat grid world with polygon inhabitants. A sphere passes through it, seen by them as a dot that becomes a growing and shrinking circle. From above, the sphere is whole, ringed by the circles they saw. Stacked along a time axis, those circles form one shape, and a large engraved sphere, Omega, encloses everything.",
  stages: [
    {
      title: "Flatland",
      caption:
        "In Edwin Abbott's Flatland, flat beings live in a plane. They know length and width, and nothing above or below.",
    },
    {
      title: "A sphere passes",
      caption:
        "To them, a sphere passing through is a dot that grows into a circle, shrinks, and vanishes. An event in time.",
    },
    {
      title: "From above",
      caption:
        "Seen from three dimensions, it is one sphere, all at once. Every circle they saw is a slice of it.",
    },
    {
      title: "One history, one shape",
      caption:
        "The same step repeats one level up. Stack the moments of a history along time, and the whole history is one fixed shape.",
    },
    {
      title: "Closure",
      caption:
        "What one level sees unfolding, the level above holds whole. Taken all the way, closure gives Omega, the whole, with nothing outside it.",
    },
  ],
};

export const INLINE: InlineMap = {
  spacetime: { 0: [CONE], 1: [NO_NOW], 2: [LIVED_LIT, TRACES], 3: [EraserFigure] },
  infinity: { 0: [EDGE], 1: [CLOSURE] },
};
