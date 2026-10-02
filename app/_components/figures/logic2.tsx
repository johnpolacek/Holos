import type { FigureSpec } from "./types";

// Figure specs for the second half of the Logic page (Totality onward). Place each in the
// page with <SpecFigure spec={...} isPDF={isPDF} /> right after the passage it illustrates.

// After "An organism sees only through its eyes."
const EYES: FigureSpec = {
  scene: "logic2.eyes",
  still: "logic2-eyes.png",
  label:
    "Engraved figure: a large engraved body standing for the whole, with a few apertures set into its surface. The body is there whether or not the apertures open. Experience occurs only where an aperture opens. An organism and its eyes make the same point, and behind each aperture there is no hidden viewer.",
  stages: [
    {
      title: "The whole",
      caption:
        "Omega is the whole. It is what it is whether or not any region of it folds into a perspective.",
    },
    {
      title: "Regions of it",
      caption:
        "An aperture is not an external thing granting experience from outside. It is a region of Omega.",
    },
    {
      title: "Two dependences",
      caption:
        "Omega does not depend on apertures for its existence. It depends on them for its experience. They are where experience occurs.",
    },
    {
      title: "An organism and its eyes",
      caption: "An organism sees only through its eyes. This does not make its eyes prior to it.",
    },
    {
      title: "No one behind",
      caption:
        "There is no subject behind the aperture receiving a feed. The aperture is where the experiencing happens.",
    },
  ],
};

// After the split-brain paragraph in "Why One Experiencer Has Many Walled-Off Perspectives".
const WALLS: FigureSpec = {
  scene: "logic2.walls",
  still: "logic2-walls.png",
  label:
    "Engraved figure: sparks of experience that fail to combine into one, a cosmic whole that would have to be carved into pieces, and the Holos picture of apertures with walls between them. Then one life drawn as a single line through time, each moment lit from inside and walled from the others, and a brain whose two halves hold two separate streams.",
  stages: [
    {
      title: "Combination",
      caption:
        "If every particle carries a spark of experience, no one can say how billions of sparks combine into one person's experience.",
    },
    {
      title: "Decomposition",
      caption:
        "Goff's cosmos has an experience of its own as a whole. Individual experiences must be carved from it.",
    },
    {
      title: "Only the walls",
      caption:
        "Holos claims no cosmic experience, so it never has to carve. Two apertures are two peaks of integration with nothing bridging them.",
    },
    {
      title: "Moments of a life",
      caption:
        "All the moments of a life coexist, each experienced from within itself, none from within another. One experiencer, walled off.",
    },
    {
      title: "Two streams",
      caption:
        "When the link between the brain's two halves is cut, each half can know things the other does not. One brain holds two streams.",
    },
  ],
};

// After the paragraph introducing the views of the self, before the table.
const SELVES: FigureSpec = {
  scene: "logic2.selves",
  still: "logic2-selves.png",
  label:
    "Engraved figure: three lives drawn as timelines. Closed individualism marks each timeline as one self from birth to death. Empty individualism cuts each into separate moments. Open individualism runs one subject through all of them. Holos calls each timeline a self and the one subject the experiencer.",
  stages: [
    {
      title: "Closed",
      caption: "On closed individualism, you are one self from birth to death.",
    },
    {
      title: "Empty",
      caption: "On empty individualism, a new self exists each moment.",
    },
    {
      title: "Open",
      caption: "On open individualism, there is one subject in everyone.",
    },
    {
      title: "Self and experiencer",
      caption:
        "Holos takes the third. It calls the local person a self, and the one subject the experiencer.",
    },
  ],
};

// After "Fields are structure. A detected particle is a record".
const DECOHERENCE: FigureSpec = {
  scene: "logic2.decoherence",
  still: "logic2-decoherence.png",
  label:
    "Engraved figure: an interference pattern fades as its system becomes entangled with surrounding particles, leaving a classical-looking structure with no one present. Then a field spread through space meets a row of detectors, and each branch holds one definite click.",
  stages: [
    {
      title: "Interference",
      caption: "A small system can be in several states at once. Its wave-like interference shows.",
    },
    {
      title: "Leaking out",
      caption:
        "Decoherence is what happens when the system becomes entangled with its surroundings. The interference spreads into the environment and can no longer be seen.",
    },
    {
      title: "Not presence",
      caption:
        "Decoherence produces a consistent, classical-looking structure. It does not produce a lived world. Presence requires integrated observation.",
    },
    {
      title: "A field",
      caption:
        "In quantum field theory, fields spread through all of space. Particles are their quanta, the smallest possible ripples.",
    },
    {
      title: "One click per branch",
      caption:
        "A detector becomes entangled with the spread-out excitation. Nothing collapses. Each branch holds its own record, one definite click.",
    },
  ],
};

// After the points-and-lengths paragraph in "The Born rule: weighted branches".
const BORN: FigureSpec = {
  scene: "logic2.born",
  still: "logic2-born.png",
  label:
    "Engraved figure: two branches whose weights are drawn as squares on their amplitudes. Doors stand for the branches before you look. Many repeated trials branch into a tree where most branches show even results, but most of the weight lies with records near the true frequency. Last, a line where each observer is a point and the weights are lengths.",
  stages: [
    {
      title: "Amplitude squared",
      caption:
        "Branches carry weights. Take the amplitude the quantum state assigns each outcome, and square its size.",
    },
    {
      title: "Behind the doors",
      caption:
        "After a measurement splits the world, before you look, there are observers in every branch. You are one of them without yet knowing which.",
    },
    {
      title: "Counting",
      caption:
        "Repeat the experiment many times. Counted one by one, most branches show roughly even results, whatever the weights.",
    },
    {
      title: "Weight",
      caption:
        "Almost all of the weight lies with observers whose records show the right frequency. Strange records exist too, with almost none of the weight.",
    },
    {
      title: "Points and lengths",
      caption:
        "A single point on a line has no length. Each observer is a point. The weights are the lengths.",
    },
  ],
};

// After the paragraph showing C ⊛ O = O ∘ C.
const PIPELINE: FigureSpec = {
  scene: "logic2.pipeline",
  still: "logic2-pipeline.png",
  label:
    "Engraved figure: a state S passes through Creation, which spreads it into branches, and then through Observation, which registers each branch wherever it holds an aperture. What comes out is one experienced history per observer per branch, the lived reality R(S).",
  stages: [
    {
      title: "A state",
      caption: "S is an informational state of the universe, whatever structure physics provides.",
    },
    {
      title: "Creation",
      caption: "C maps the state to every branch physical law produces from it.",
    },
    {
      title: "Observation",
      caption:
        "O registers each branch wherever it contains an integrated system. It selects nothing and erases nothing.",
    },
    {
      title: "Lived reality",
      caption: "What comes out is one experienced history per observer, per branch. That is R(S).",
    },
    {
      title: "Reading order",
      caption:
        "Possibility first, registration second. Standard composition reads right to left, so C ⊛ O is O ∘ C.",
    },
  ],
};

// After the two paragraphs introducing the quantum interpretations table.
const INTERPRETATIONS: FigureSpec = {
  scene: "logic2.interpretations",
  still: "logic2-interpretations.png",
  label:
    "Engraved figure: a small system in two states at once sits at the center as the measurement problem. Around it stand the answers. Copenhagen leaves the question unanswered. Objective and consciousness collapse keep one result. Many-Worlds keeps every branch. Bohmian mechanics keeps one world of guided particles. Holos keeps every branch and marks which are lived.",
  stages: [
    {
      title: "The measurement problem",
      caption:
        "A small system can be in several states at once. Yet we always see one definite result. What counts as a measurement?",
    },
    {
      title: "Not answered",
      caption:
        "Copenhagen, the most common working stance, treats it as a question science need not answer.",
    },
    {
      title: "Collapse",
      caption:
        "Objective collapse says large objects collapse on their own. Consciousness collapse says a conscious system causes it.",
    },
    {
      title: "No collapse",
      caption:
        "Many-Worlds keeps every outcome in its own branch. Bohmian mechanics keeps one world of particles guided by the quantum state.",
    },
    {
      title: "Holos",
      caption:
        "Holos sides with Many-Worlds on the physics. It differs about what exists, which structures are lived.",
    },
  ],
};

// After the paragraph introducing the theories of mind table.
const MINDS: FigureSpec = {
  scene: "logic2.minds",
  still: "logic2-minds.png",
  label:
    "Engraved figure: one landscape of systems of different integration, lit according to each theory of mind. Panpsychism lights everything. Illusionism lights nothing. Integrated information theory lights every integrated system. Cosmopsychism lights the whole. Holos lights only the systems past a threshold.",
  stages: [
    {
      title: "Everywhere",
      caption: "Panpsychism puts experience everywhere, down to every particle.",
    },
    {
      title: "Nowhere",
      caption: "Illusionism says experience, as we usually conceive it, does not exist.",
    },
    {
      title: "Any integration",
      caption: "Integrated information theory finds experience in every integrated system.",
    },
    {
      title: "The cosmos",
      caption: "Cosmopsychism makes the cosmos the one subject, with an experience of its own.",
    },
    {
      title: "Past a threshold",
      caption:
        "Holos shares integration and a single ground. Experience occurs only in systems past the threshold.",
    },
  ],
};

// After "The measure of integration".
const MEASURE: FigureSpec = {
  scene: "logic2.measure",
  still: "logic2-measure.png",
  label:
    "Engraved figure: two networks weighed by two proposed measures of integration that rank them in opposite orders. Then the question of level, ions grouped into a neuron and neurons into a network, and a program whose loops count only through the chip that runs it.",
  stages: [
    {
      title: "Two systems",
      caption: "Competing proposals for computing Φ can disagree, not only about values.",
    },
    {
      title: "Opposite rankings",
      caption:
        "They can disagree about which of two systems is more integrated. Locating the threshold requires a determinate measure.",
    },
    {
      title: "Level",
      caption:
        "Holos measures integration in parts grouped the way they work together. A neuron's firing lies above the motion of its ions.",
    },
    {
      title: "Program and chip",
      caption:
        "A program counts only through the chip that runs it. Loops in the code are needed, but the chip's own parts must also act as one.",
    },
  ],
};

// After "Treat the threshold as a transition, not a dial."
const FINGERPRINTS: FigureSpec = {
  scene: "logic2.fingerprints",
  still: "logic2-fingerprints.png",
  label:
    "Engraved figure: independent methods converge on one value of the electron's charge. Then the threshold as a transition, not a dial. A sudden transition shows a lag, its way in and way out at different doses. A continuous one shows fluctuations growing near the boundary. In a finite system either appears as a steep, rounded step.",
  stages: [
    {
      title: "Triangulation",
      caption:
        "No one has ever seen an electron's charge, yet independent methods converged on it.",
    },
    {
      title: "A transition, not a dial",
      caption:
        "If a unified perspective begins at a genuine transition, Φc is not a number we are free to tune. Transitions leave fingerprints.",
    },
    {
      title: "A lag",
      caption:
        "A sudden transition typically shows a lag. Consciousness is lost and regained at different anesthetic levels.",
    },
    {
      title: "Slowing",
      caption:
        "A continuous transition typically shows slowing and growing fluctuations near the boundary.",
    },
    {
      title: "The twilight",
      caption:
        "In a finite system, either kind appears as a steep, rounded curve. That rounding is the twilight.",
    },
  ],
};

// After the edge-of-chaos paragraph.
const CRITICALITY: FigureSpec = {
  scene: "logic2.criticality",
  still: "logic2-criticality.png",
  label:
    "Engraved figure: an axis from too orderly to too chaotic with a critical point between. Waking cortex sits near it. Anesthesia, seizures, and disorders of consciousness lie away from it, psychedelics closer. A log-log plot shows neuronal avalanches following a power law. A seizure locks every part into one rhythm.",
  stages: [
    {
      title: "Order and chaos",
      caption:
        "Activity can be too orderly or too chaotic. Between them is a critical point, often called the edge of chaos.",
    },
    {
      title: "Waking",
      caption: "Several lines of evidence suggest waking cortex runs near it.",
    },
    {
      title: "Away and closer",
      caption:
        "Anesthesia, generalized seizures, and disorders of consciousness move it away. Psychedelics move it closer.",
    },
    {
      title: "Avalanches",
      caption:
        "Cascades of activity come in all sizes. Large ones are rarer than small ones in a fixed proportion, a power law.",
    },
    {
      title: "One rhythm",
      caption:
        "A seizure locks every part into one rhythm, like a stadium chanting a single word. Joined, with almost no variety.",
    },
  ],
};

// After the paragraph on the two ways the program can fail.
const CALIBRATION: FigureSpec = {
  scene: "logic2.calibration",
  still: "logic2-calibration.png",
  label:
    "Engraved figure: anchor cases drawn as bands across a plane of candidate measures and thresholds. Each alone is wide, but together they overlap in one narrow region. Held-out cases then test it. Two ways to fail follow. A smooth climb with no transition leaves the core standing. Experience that does not track integration brings it down.",
  stages: [
    {
      title: "Anchor cases",
      caption:
        "A candidate measure and threshold must fit the anesthesia boundary, development, split-brain dissociations, and minimal neural systems.",
    },
    {
      title: "One narrow band",
      caption:
        "Coupled constraints are far more rigid than separate ones. The band that satisfies all the anchor cases at once is narrow.",
    },
    {
      title: "Held out",
      caption:
        "Calibration states locate the threshold. Held-out states, named in advance, test it.",
    },
    {
      title: "No transition",
      caption:
        "The program could find integration climbing smoothly, with no transition. The twilight is wide, and the core stands.",
    },
    {
      title: "No tracking",
      caption:
        "Or experience might not track integration on any candidate measure. That is how Test A loses, and the core with it.",
    },
  ],
};

export const SPECS = {
  EYES,
  WALLS,
  SELVES,
  DECOHERENCE,
  BORN,
  PIPELINE,
  INTERPRETATIONS,
  MINDS,
  MEASURE,
  FINGERPRINTS,
  CRITICALITY,
  CALIBRATION,
} satisfies Record<string, FigureSpec>;
