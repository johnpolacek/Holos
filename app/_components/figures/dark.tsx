import type { FigureSpec, InlineMap } from "./types";

// Figures for the Teeming Dark section. Keys are section ids (the-teeming-dark); values map a paragraph index to
// the figures shown right after it.

const BUDGET: FigureSpec = {
  scene: "dark.budget",
  still: "dark-budget.png",
  label:
    "Engraved figure: an iceberg with a small clean tip above the waterline and a large hatched body below. Then a jar of ordinary matter filled nearly to the brim, two small dark pebbles in the thin gap at the top, and many small apertures opening there.",
  stages: [
    { title: "What shines", caption: "Most of what exists does not shine." },
    {
      title: "Below the line",
      caption:
        "Mature life would be cold structures of ordinary matter, dark in visible light but still pulling with gravity.",
    },
    {
      title: "The budget",
      caption:
        "There cannot be much of it. Surveys have found nearly all the ordinary matter there is, and searches for passing dark masses find too few.",
    },
    {
      title: "Rich in minds",
      caption:
        "But the Teeming Dark was never about mass. A universe can be poor in hidden mass and still rich in minds.",
    },
  ],
};

const LANDAUER: FigureSpec = {
  scene: "dark.landauer",
  still: "dark-landauer.png",
  label:
    "Engraved figure: a row of bits on a thin panel. An eraser runs along it, and each bit it clears gives off a wisp of heat. A thermometer falls and the wisps shrink. The view pulls far out to show the panel is one of many thin structures spread wide around a distant star, each with a faint glow.",
  stages: [
    {
      title: "Erasing costs heat",
      caption:
        "Thinking makes heat. Any computer that runs for long must erase information, and erasing has a heat cost.",
    },
    { title: "Colder, cheaper", caption: "The cost falls as the computer gets colder." },
    {
      title: "Far from the star",
      caption:
        "So a mature civilization may do most of its computing far from its star, on thin structures spread wide in the cold.",
    },
    {
      title: "A Slysh halo",
      caption:
        "Its heat would leave barely warmer than space, as a faint glow in the far infrared. One paper calls this a Slysh halo.",
    },
  ],
};

const NODE: FigureSpec = {
  scene: "dark.node",
  still: "dark-node.png",
  label:
    "Engraved figure: a ring of modules joined by one signal that crawls slowly around it. The ring draws in to a tight cluster, the signal laps it quickly, and rings of heat spread from it. A hatched shell closes over the cluster beside a shining star. Last, cold thin panels far around it glow faintly, and the dark node still gives off heat.",
  stages: [
    {
      title: "Light delay",
      caption: "Fast thinking pulls the other way. Light delay keeps a single mind compact.",
    },
    { title: "Compact means warm", caption: "And compact means warm." },
    {
      title: "A Dark Node",
      caption:
        "Holos calls such an object a Dark Node, ordinary matter that has stopped shining, not dark matter.",
    },
    {
      title: "Warmer than space",
      caption:
        "Physics does not say how a civilization divides its work, and the cold may carry most of the heat. But the heat cannot vanish. Silent, but warmer than space.",
    },
  ],
};

const LINEUP: FigureSpec = {
  scene: "dark.lineup",
  still: "dark-lineup.png",
  label:
    "Engraved figure: a brown dwarf, a rogue planet, a cooled dead star, and a dark node in a row, each giving off heat. The same warm blob closes over each. Then the node's aperture closes and its heat fades while a thermometer falls. Last, two volumes of space, one with sleeping nodes and one empty, give the same flat reading.",
  stages: [
    {
      title: "Four warm objects",
      caption:
        "This is a search channel, not a fingerprint. A brown dwarf, a rogue planet, or a cooled dead star looks the same.",
    },
    { title: "One warm blob", caption: "No telescope reads purpose off a warm dark blob." },
    {
      title: "Asleep",
      caption:
        "And one door stays open. A civilization that sleeps, saving its computing for a colder future, gives off almost nothing while it waits.",
    },
    {
      title: "Sleeping or empty",
      caption:
        "This is the aestivation hypothesis. A sleeping universe and an empty one look alike.",
    },
  ],
};

const TELL: FigureSpec = {
  scene: "dark.tell",
  still: "dark-tell.png",
  label:
    "Engraved figure: a quiet star beside a chart of the glow it should give, bright in visible light and fading through the infrared. A second reading rises above it in the infrared and the far infrared, the excess hatched. The view widens to show thin cold structures and a dark node around the star.",
  stages: [
    { title: "No message", caption: "The tell would not be a message." },
    { title: "What it should give", caption: "It would be a star with heat it should not have." },
    {
      title: "Heat it should not have",
      caption:
        "Warm in the infrared or cold in the far infrared, and nothing natural to explain it.",
    },
    {
      title: "Endurance",
      caption: "The silence may not mean absence. It may mean endurance.",
    },
  ],
};

export const INLINE: InlineMap = {
  "the-teeming-dark": { 1: [BUDGET], 2: [LANDAUER], 3: [NODE], 4: [LINEUP], 5: [TELL] },
};
