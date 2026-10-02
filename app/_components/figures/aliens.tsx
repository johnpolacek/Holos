import type { FigureSpec, InlineMap } from "./types";

// Figures for the Aliens section. Keys are section ids (aliens); values map a paragraph index to
// the figures shown right after it.

const SILENCE: FigureSpec = {
  scene: "aliens.silence",
  still: "aliens-silence.png",
  label:
    "Engraved figure: a quiet spiral galaxy. In the usual picture one civilization spreads from star to star behind a growing frontier. In the Integration Hypothesis the spread draws back and the civilization closes in around its home star. A chart then shows how easy each path is to see over time. Expansion keeps rising. Integration rises, then falls.",
  stages: [
    {
      title: "Vast, old, quiet",
      caption: "The universe is vast and old, yet we see no one. This is the Fermi paradox.",
    },
    {
      title: "The usual picture",
      caption:
        "We assume advanced civilizations spread out from star to star and grow easier to see.",
    },
    {
      title: "Advancement turns inward",
      caption:
        "The Integration Hypothesis says the opposite. Civilizations stay near home and grow more efficient.",
    },
    {
      title: "Harder to see",
      caption:
        "So progress makes them harder to see. A spreading civilization keeps getting brighter. One that draws together is loud for a while, then goes quiet.",
    },
  ],
};

const GOING_QUIET: FigureSpec = {
  scene: "aliens.goingQuiet",
  still: "aliens-going-quiet.png",
  label:
    "Engraved figure: a young world sends out radio rings. On a long hatched beam of cosmic time, its loud phase is one short clean block, the window SETI searches. Below, a home star and a colony star ten light-years apart. A signal crosses and returns, the tether between them breaks, and the colony opens its own aperture. Last, two messages pass between them. One is a regular pattern. The other is perfectly compressed and looks like noise.",
  stages: [
    {
      title: "Young and loud",
      caption:
        "Young civilizations are loud. They send radio signals, reshape their worlds, and try spaceflight.",
    },
    {
      title: "A brief window",
      caption:
        "On cosmic timescales that phase is brief, and it is the window SETI searches. After it, efficiency pays.",
    },
    {
      title: "Ten light-years",
      caption:
        "The speed of light adds a limit. Word from home takes ten years to reach a colony ten light-years away, and ten more to hear back.",
    },
    {
      title: "Its own civilization",
      caption:
        "A colony that far away cannot be steered from home, so it becomes a civilization of its own. Growth turns inward.",
    },
    {
      title: "Aimed and compressed",
      caption:
        "Messages between distant civilizations are aimed and compressed. A perfectly compressed signal looks like noise. This fading is called Going Quiet.",
    },
  ],
};

const ONLY_ONE: FigureSpec = {
  scene: "aliens.onlyOne",
  still: "aliens-only-one.png",
  label:
    "Engraved figure: one civilization's frontier sweeps across a whole spiral galaxy. On a beam standing for the galaxy's age, the time to cross it is a thin sliver at one end. Then a hatched wood with a small trail camera strapped to a tree, and a flashlight lighting a small patch of ground that never reaches the camera.",
  stages: [
    {
      title: "It only takes one",
      caption:
        "The strongest objection is simple. If a million civilizations arose and one kept spreading, it could cross the galaxy.",
    },
    {
      title: "Crossing time and age",
      caption:
        "It could cross in a few million years, and the galaxy is over ten billion years old.",
    },
    {
      title: "Explored is not settled",
      caption:
        "But being explored is not being settled. A small, quiet probe is as easy to miss as a trail camera in the woods.",
    },
    {
      title: "Barely looked",
      caption:
        "And we have barely looked. The galaxy may be well explored, our own system included.",
    },
  ],
};

const EPIDEMIC: FigureSpec = {
  scene: "aliens.epidemic",
  still: "aliens-epidemic.png",
  label:
    "Engraved figure: two family trees of settlements, one generation per row. On the left each settlement founds two new ones and the tree fans out to sixteen. On the right settlements found fewer than one each on average, and the tree stops after three generations. Then the links on the right go faint and each settlement opens its own aperture.",
  stages: [
    {
      title: "Like an epidemic",
      caption:
        "What we clearly do not see is settlement. Think of settling like an epidemic, each settlement founding new ones.",
    },
    {
      title: "More than one each",
      caption: "If each settlement founds more than one new one, settling sweeps the galaxy.",
    },
    {
      title: "Fewer than one each",
      caption: "If fewer, it fizzles. The hypothesis bets on fewer.",
    },
    {
      title: "Distance breaks control",
      caption:
        "Distance breaks control. Each new settlement becomes its own civilization, facing the same pull inward.",
    },
  ],
};

const GRABBY: FigureSpec = {
  scene: "aliens.grabby",
  still: "aliens-grabby.png",
  label:
    "Engraved figure: a field of galaxies. Settler bubbles swell near light speed and hatch every galaxy they take. One bubble nears our galaxy, its light only just ahead of its wall. Then 129 nearby galaxies, and one galaxy's light drawn as a long clean bar with a thin dark sliver at its end, the cap on waste heat.",
  stages: [
    {
      title: "Grabby aliens",
      caption:
        "A rival fits the silence too. In Robin Hanson's grabby aliens model, settlers do exist and expand near light speed.",
    },
    {
      title: "We are early",
      caption:
        "They would arrive almost as soon as we saw them. They have not reached us yet, so we are early.",
    },
    {
      title: "129 nearby galaxies",
      caption:
        "The evidence cannot yet choose. A 2026 study of 129 nearby galaxies found no sign of it.",
    },
    {
      title: "Under 0.3 percent",
      caption:
        "It caps such heat at under 0.3 percent of a typical galaxy's light. That fits the hypothesis, but a universe where life is rare fits it too.",
    },
  ],
};

const MIND_SIZE: FigureSpec = {
  scene: "aliens.mindSize",
  still: "aliens-mind-size.png",
  label:
    "Engraved figure: one mind drawn as a wire globe with a network inside and a signal crossing it. The mind grows and the crossing takes longer, until it meets a dashed limit. More minds of that size then gather around the same star. Last, heat spreads out from the crowded star.",
  stages: [
    {
      title: "Cheaper work, more of it",
      caption:
        "When work gets cheaper, people do more of it. A civilization that computes efficiently should want more energy.",
    },
    {
      title: "Light delay caps size",
      caption:
        "But light-speed delay caps how large one mind can usefully grow. A signal takes longer to cross a bigger mind.",
    },
    {
      title: "Another mind nearby",
      caption: "Past that size, more energy funds another mind nearby, not a bigger one.",
    },
    {
      title: "Growth stays near home",
      caption:
        "So growth stays near home, where a civilization can harvest its star fully. The place to look is single stars with heat they should not have.",
    },
  ],
};

const HEPHAISTOS: FigureSpec = {
  scene: "aliens.hephaistos",
  still: "aliens-hephaistos.png",
  label:
    "Engraved figure: a dense field of stars. Seven are ringed as candidates. Two resolve into small background galaxies, and five stay ringed, unexplained so far. Then a plate of one star's light: its own curve, a solid warm bump, and a dashed cold bump, marked with Gaia's next release and the PRIMA telescope.",
  stages: [
    {
      title: "Five million stars",
      caption:
        "The warm half of the search is under way. Project Hephaistos combed about five million nearby stars.",
    },
    {
      title: "Seven candidates",
      caption: "It flagged seven candidates in 2024.",
    },
    {
      title: "Two explained",
      caption:
        "In 2026, Webb telescope observations traced two to background galaxies. The rest are unexplained so far. Both results are preprints.",
    },
    {
      title: "Warm or cold",
      caption:
        "A star's own light makes one curve. Heat it should not have adds a bump, warm or cold. The warm search is under way, the cold has barely begun.",
    },
    {
      title: "What comes next",
      caption:
        "Gaia's next data release, due December 2026, will extend the census. A far-infrared telescope, PRIMA, is due around 2033.",
    },
  ],
};

export const INLINE: InlineMap = {
  aliens: {
    0: [SILENCE],
    1: [GOING_QUIET],
    2: [ONLY_ONE],
    3: [EPIDEMIC],
    5: [GRABBY],
    6: [MIND_SIZE],
    7: [HEPHAISTOS],
  },
};
