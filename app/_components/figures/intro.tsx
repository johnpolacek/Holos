import type { FigureSpec, InlineMap } from "./types";

// Figures for the Introduction and Why Are We Here? sections. Keys are section ids (introduction, why); values map a paragraph index to
// the figures shown right after it.

const WITNESS: FigureSpec = {
  scene: "intro.witness",
  still: "intro-witness.png",
  label:
    "Engraved figure: a clockwork cosmos, an orrery with a sun, four worlds on arms, and a gear train in its base. It runs complete and hatched, with no one in it. Then a small person appears on the third world with an aperture above its head. Lines of light reach it from every body, and the whole cosmos lifts to clean paper, labeled reality.",
  stages: [
    {
      title: "Complete in every detail",
      caption:
        "Picture a universe complete in every detail physics describes. Every law holds, every event occurs.",
    },
    {
      title: "No one to witness it",
      caption: "But there is no one to witness it. It is unrealized structure.",
    },
    {
      title: "A witness",
      caption: "Now the same universe, with one observer. Observing changes nothing it takes in.",
    },
    {
      title: "Reality",
      caption: "The same structure, experienced from the inside. Reality requires a witness.",
    },
  ],
};

const FORMULA: FigureSpec = {
  scene: "intro.formula",
  still: "intro-formula.png",
  label:
    "Engraved figure: the formula R = C ⊛ O set out as objects. C is a hatched crystal lattice, O an aperture, and ⊛ the Holos mark, a ring with six spokes. Lines of light run from the lattice through the mark into the aperture. R is the same lattice in clean paper, framed by an opening.",
  stages: [
    { title: "Creation", caption: "Creation, the structure physics produces." },
    {
      title: "Observation",
      caption: "Observation, that structure experienced from the inside.",
    },
    { title: "Joined", caption: "Holos joins the two and writes them as C ⊛ O." },
    {
      title: "Reality",
      caption:
        "Reality, the result. The same structure, lived. On the physics Holos bets on, observing changes nothing it takes in.",
    },
  ],
};

const TWO_IDEAS: FigureSpec = {
  scene: "intro.twoIdeas",
  still: "intro-two-ideas.png",
  label:
    "Engraved figure in two panels. Left, a bead climbs a rising curve of integration. Below a hatched threshold line the curve is hatched. As the bead crosses it, an aperture opens above the bead. Right, one lamp stands behind a wall with five round openings, each an aperture, and its light passes out through every one.",
  stages: [
    {
      title: "Threshold",
      caption:
        "Experience appears only where information is joined tightly enough to form a single point of view.",
    },
    {
      title: "Omega",
      caption:
        "Omega, the whole. Every observer is an aperture of it, an opening through which the whole is lived.",
    },
    {
      title: "Two ideas",
      caption:
        "Neither changes established physics. Observation does not cause the universe. It makes a lawful universe a lived one.",
    },
  ],
};

const CLAIMS: FigureSpec = {
  scene: "intro.claims",
  still: "intro-claims.png",
  label:
    "Engraved figure: a staircase of eight steps descending left to right, one per claim in the box above. Physics as it stands, branching, and two sides are solid blocks with inked edges. The threshold and Omega are hatched. The hypothesis is darker. Companion ideas and speculation are dashed outlines with no body.",
  stages: [
    {
      title: "Physics, as it stands",
      caption: "Relativity and quantum mechanics, unchanged. No new forces, no new equations.",
    },
    {
      title: "Sides taken",
      caption:
        "A side taken on physics, quantum branching without collapse. A side taken on mind, experience and physical activity as two sides of one event.",
    },
    {
      title: "The threshold",
      caption:
        "Experience occurs only where information is integrated into one point of view. Testable, and it can fail.",
    },
    {
      title: "Omega, and a hypothesis",
      caption:
        "Omega is philosophical, not testable. The hypothesis says larger systems should switch on more sharply.",
    },
    {
      title: "Further out",
      caption:
        "Companion ideas, separate from the core. Then speculation. The lower the step, the looser the line.",
    },
  ],
};

const WALLS: FigureSpec = {
  scene: "intro.walls",
  still: "intro-walls.png",
  label:
    "Engraved figure: two particles far apart, their spin arrows tumbling, then both pointing up together. One wire envelope wraps them both. The view pulls back to a wide floor of many particles inside one larger envelope. Walls rise across distance and across time, dividing it into six rooms. In each room a person appears, an aperture opens above them, and the floor lifts to clean paper.",
  stages: [
    {
      title: "Far apart",
      caption: "Two entangled particles give matching results however far apart they are.",
    },
    {
      title: "One shared state",
      caption: "Physics describes them as one shared state, not two things.",
    },
    {
      title: "One whole",
      caption:
        "If nothing collapses, the whole universe is one such state. The speculation is that this oneness is more basic than the separations.",
    },
    {
      title: "Walls",
      caption: "Distance, time, and individual lives are not illusions, though.",
    },
    {
      title: "A life in each room",
      caption: "They are the walls that make each life possible.",
    },
  ],
};

const CLOSING: FigureSpec = {
  scene: "intro.closing",
  still: "intro-closing.png",
  label:
    "Engraved figure: the clockwork cosmos again, running unwitnessed and hatched. A small person appears on one world, an aperture opens above it, and light from every body reaches it. The person lifts its arms as the cosmos lifts to clean paper, and the camera draws far back.",
  stages: [
    {
      title: "Not for a purpose",
      caption:
        "So why are we here? Not for a purpose the universe needed. Without life, a lawful universe is still complete.",
    },
    {
      title: "A role",
      caption: "We fill a role.",
    },
    {
      title: "Reality requires a witness",
      caption: "Life is how a universe is lived. Reality requires a witness.",
    },
  ],
};

export const INLINE: InlineMap = {
  introduction: { 2: [WITNESS], 3: [FORMULA], 4: [TWO_IDEAS], 7: [CLAIMS] },
  why: { 1: [WALLS], 2: [CLOSING] },
};
