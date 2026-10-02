import type { FigureSpec } from "./types";

// Figure specs for the Speculation part of the Predictions page. Place each in the page
// with <SpecFigure spec={...} isPDF={isPDF} /> right after the passage it illustrates.
// These are design sketches, not predictions, and the captions keep that tone.

const LIGHT_LAG: FigureSpec = {
  scene: "speculation.lightLag",
  still: "speculation-light-lag.png",
  label:
    "Engraved figure: a star and its orbits, with a message crossing a ruled path between planets. The view pulls back to neighboring stars and a message crawls the long path between them. Outposts spread across the stars blink out of step, then gather home and fall into step.",
  stages: [
    { title: "Hours", caption: "Across a star system, messages take hours." },
    { title: "Years", caption: "Across many systems, they take years." },
    {
      title: "Spread thin",
      caption: "A civilization spread thin and bright struggles to act as one.",
    },
    {
      title: "Compact",
      caption:
        "Staying coherent rewards compactness, keeping things close, and stability over long spans of time.",
    },
  ],
};

const SCALE: FigureSpec = {
  scene: "speculation.scale",
  still: "speculation-scale.png",
  label:
    "Engraved figure: three columns of rising height for the Kardashev Scale, beside a staircase from H0 to H5. On each step a small cluster of bodies draws closer and more joined as the steps rise, while the light and heat it gives off fall away. H5 is drawn only in outline.",
  stages: [
    { title: "Energy", caption: "The Kardashev Scale ranks civilizations by energy use." },
    {
      title: "Coherence",
      caption: "The Holosian Scale ranks them by how well a civilization coordinates as one whole.",
    },
    {
      title: "Quieter",
      caption:
        "At H0, visibility is high because broadcasting is cheap and unmanaged. By H4 it fades. What remains is the waste heat no optimization can eliminate.",
    },
    {
      title: "The limit",
      caption:
        "H5 is maximal coherence at minimal waste. It is a limit concept, not a stage any civilization reaches.",
    },
  ],
};

const HOLOCORE: FigureSpec = {
  scene: "speculation.holocore",
  still: "speculation-holocore.png",
  label:
    "Engraved figure: three engines on one plinth, each beside a column showing the share of mass it turns to energy. A fusion core has a sliver of a column. Matter spiraling into a black hole has a tall column. A particle splitting beside a spinning black hole has a column nearly as tall. Then heat rings spread from all three.",
  stages: [
    { title: "Fusion", caption: "Fusion releases about 0.7 percent of a mass as energy." },
    {
      title: "Accretion",
      caption:
        "Matter falling into a rapidly spinning black hole can release roughly 30 to 42 percent.",
    },
    {
      title: "Spin",
      caption:
        "The Penrose process can draw out a spinning black hole's rotational energy, up to 29 percent of its mass.",
    },
    {
      title: "Hot",
      caption:
        "Waste heat can be shaped, delayed, and diluted, but never eliminated. Compact and powerful means hot.",
    },
  ],
};

const KERNEL: FigureSpec = {
  scene: "speculation.kernel",
  still: "speculation-kernel.png",
  label:
    "Engraved figure: a computing block slides along the floor of a plot, shrinking as it goes. A signal crosses its face faster as it shrinks, and a light-delay curve falls. Smaller still, heat rings crowd around it and a heat curve climbs. The block settles where the two curves cross. Then a wide ring of small cold blocks appears far out around it.",
  stages: [
    {
      title: "Smaller is faster",
      caption:
        "Light delay rewards compactness. A signal crosses a meter in about three nanoseconds, so smaller thinks faster.",
    },
    { title: "Heat", caption: "Heat punishes it. Power packed too densely cannot be cooled." },
    {
      title: "The balance",
      caption: "The Kernel sits where the two balance, as today's chips already do.",
    },
    {
      title: "A cold halo",
      caption:
        "Erasing information costs less in the cold, so work that need not be fast may run far out, in a cold halo. The Kernel is the part that must think fast.",
    },
  ],
};

export const SPECS: Record<string, FigureSpec> = {
  lightLag: LIGHT_LAG,
  scale: SCALE,
  holocore: HOLOCORE,
  kernel: KERNEL,
};
