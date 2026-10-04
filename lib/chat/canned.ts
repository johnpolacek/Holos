// Answers for common questions, served without calling the model.
// Matching is keyword based: a message matches when nearly all of its meaningful words
// appear in one of an entry's example questions. Long or unusual questions go to the model.

interface Canned {
  id: string;
  questions: string[];
  answer: string;
}

export const CANNED: Canned[] = [
  {
    id: "hello",
    questions: ["hi", "hello", "hey", "hey there", "good morning", "yo", "greetings"],
    answer:
      "Hi. Ask me anything about Holos, such as what the threshold is, what Omega means, or why the sky is quiet.",
  },
  {
    id: "thanks",
    questions: ["thanks", "thank you", "thx", "great thanks", "cool thanks", "appreciate it"],
    answer: "You're welcome. Ask another any time.",
  },
  {
    id: "what-is-holos",
    questions: [
      "what is holos",
      "what's holos",
      "explain holos",
      "holos summary",
      "what is this site",
      "what is this about",
      "tell me about holos",
      "holos in simple terms",
    ],
    answer:
      'Holos, from the Greek for "whole," is an interpretive framework for understanding reality. Physics describes structure. Holos says reality is that structure lived from the inside, written as $R = C ⊛ O$.\n\nIt rests on two ideas, and neither changes established physics.\n\n- **Threshold.** Experience appears only where information is joined tightly enough to form one point of view.\n- **Omega.** The whole. Every observer is an aperture of it, an opening through which the whole is lived.\n\nStart with the [Introduction](/#introduction).',
  },
  {
    id: "formula",
    questions: [
      "what does r = c o mean",
      "what is r c o",
      "what does the formula mean",
      "explain the equation",
      "what is the holos equation",
      "what does the symbol mean",
    ],
    answer:
      "$R = C ⊛ O$ reads: reality is creation joined with observation.\n\n- **Creation**, the structure physics produces.\n- **Observation**, that structure experienced from the inside.\n- **Reality**, the result.\n\nObservation does not cause the universe or change what it takes in. It makes a lawful universe a lived one. See [Notation](/logic#mathematical-formalism).",
  },
  {
    id: "threshold",
    questions: [
      "what is the threshold",
      "explain the threshold",
      "what is integration",
      "what is phi",
      "what is the twilight",
      "what makes something conscious",
      "what is an observer",
    ],
    answer:
      "The threshold is the level of integration past which a system has a point of view. Integration means its parts act as one whole rather than as separate pieces. Holos borrows Φ (phi) as the measure.\n\nIt is not a sharp line. Like iron cooling past its Curie point, there is a narrow twilight between clear cases, steepest in the largest systems. A thermostat is clearly not an observer. A waking person clearly is.\n\nIntegration is joined by three other requirements: differentiation, temporal cohesion, and aboutness. See [Consciousness](/#consciousness).",
  },
  {
    id: "omega",
    questions: [
      "what is omega",
      "explain omega",
      "what is the omega point",
      "what is the one experiencer",
      "what is an aperture",
      "what is open individualism",
    ],
    answer:
      "Omega is the whole, with nothing outside it. Physically it is the one universal quantum state, every branch included. Holos adds one claim, taken as given: the whole is also the one experiencer, and every observer is an aperture of it.\n\nWhen a system crosses the threshold, a new self begins. No new experiencer does. Omega is not one giant mind and not an agent. It does not intervene or answer prayers. See [Omega](/#omega-point).",
  },
  {
    id: "god",
    questions: [
      "is omega god",
      "is holos a religion",
      "is holos religious",
      "does holos believe in god",
      "is this spiritual",
      "is holos about god",
    ],
    answer:
      "No. Many traditions call the whole God, and Holos notes the overlap with Advaita Vedanta and with Schrödinger's view. But in Holos the word implies no intention, intervention, or design. Omega does not act, answer prayers, or direct history. There is no outside for it to act from.\n\nWhether you call the whole God, Brahman, or simply the whole changes nothing. See [Omega](/#omega-point).",
  },
  {
    id: "ai-conscious",
    questions: [
      "is ai conscious",
      "are you conscious",
      "is chatgpt conscious",
      "is claude conscious",
      "can ai be conscious",
      "are language models conscious",
      "are llms conscious",
      "can machines be conscious",
      "could a computer be conscious",
    ],
    answer:
      "Not today's language models, by Holos's standard. What matters is how a system's causes are organized, not how fluently it talks. Language models carry a model of a world and are richly varied. The gaps are integration and time. Information flows one way through their layers, and no working state lasts from one word to the next.\n\nNothing in Holos is specific to biology, so a system built differently could cross the threshold. Fluency is never the test. That includes me. See [Consciousness](/#consciousness).",
  },
  {
    id: "testable",
    questions: [
      "is holos testable",
      "can holos be tested",
      "how can you test holos",
      "is holos falsifiable",
      "what are the predictions",
      "how would holos be proven wrong",
      "what evidence is there",
    ],
    answer:
      "Partly. Presence itself cannot be detected, since Holos says observation adds no physical signal. Its structural preconditions can be tested and can fail.\n\n- **Test A.** Whether reported experience tracks integration or outward behavior when the two come apart.\n- **Test B.** Whether the twilight narrows as systems grow.\n- **Check C.** A consistency check on observer-relative facts.\n\nOmega is philosophical and not testable. See [Testability](/predictions#experimentation).",
  },
  {
    id: "aliens",
    questions: [
      "where are the aliens",
      "what is the fermi paradox",
      "why haven't we found aliens",
      "are we alone",
      "what is the integration hypothesis",
      "what is going quiet",
      "does holos believe in aliens",
    ],
    answer:
      "The Integration Hypothesis says advancement turns inward. Mature civilizations stay near home, grow efficient, and go quiet, so progress makes them harder to see. Light-speed delay breaks control of distant colonies, so settlement fizzles rather than sweeping the galaxy.\n\nIt is a companion idea, not part of the core. The place to look is single stars with heat they should not have. See [Aliens](/#aliens).",
  },
  {
    id: "teeming-dark",
    questions: ["what is the teeming dark", "explain the teeming dark", "what is a dark node"],
    answer:
      "The Teeming Dark is a thought experiment: the sky may be silent and still full of life. Mature civilizations may compute in the cold, since erasing information costs less heat at low temperature. Their waste heat would leave as a faint far-infrared glow.\n\nThe tell would be a star with heat it should not have, warm or cold, and nothing natural to explain it. See [The Teeming Dark](/#the-teeming-dark).",
  },
  {
    id: "why-here",
    questions: [
      "why are we here",
      "what is the meaning of life",
      "what is the purpose of life",
      "does life have a purpose",
      "why do we exist",
    ],
    answer:
      "Not for a purpose the universe needed. We fill a role. Without observers, a lawful universe is still complete as physics describes it, but it is structure, not reality. It is simply never lived. Life is how a universe is lived.\n\nReality requires a witness. See [Why Are We Here?](/#why).",
  },
  {
    id: "many-worlds",
    questions: [
      "does holos use many worlds",
      "what is many worlds",
      "why many worlds",
      "what is a branch",
      "what if many worlds is wrong",
    ],
    answer:
      "Holos takes the side of quantum branching without collapse, often called many-worlds. Every outcome a quantum event allows happens, each in its own branch, and each branch carries a weight that gives the odds.\n\nIt is a bet. A version of Holos with collapse is declared in advance in case experiments rule out branching. See [The Standing Bet](/predictions#standing-bet).",
  },
  {
    id: "hard-problem",
    questions: [
      "does holos solve the hard problem",
      "what about the hard problem",
      "what is the hard problem of consciousness",
      "why does anything feel like something",
    ],
    answer:
      "No. Holos takes experience as given, the one fact it starts from. It says where experience occurs, past the threshold, not why there is experience at all. Experience and physical activity are two sides of one event, so a perfect physical copy of you could not lack an inner life. See [Consciousness](/#consciousness).",
  },
  {
    id: "lived-lit",
    questions: [
      "what is lived and lit",
      "what does lit mean",
      "what does lived mean",
      "what is unlit",
    ],
    answer:
      "- **Lived**, where experience occurs, inside observers and nowhere else.\n- **Lit**, everything that could ever have sent a signal to an observer. Starlight reaching your eye puts its galaxy in your past.\n- **Unlit**, what no signal could ever carry to any observer.\n\nThe lit region is the world experience is made from. See [Spacetime](/#spacetime).",
  },
  {
    id: "author",
    questions: [
      "who made holos",
      "who wrote this",
      "who created holos",
      "who is the author",
      "who is behind holos",
      "how can i contribute",
      "where can i discuss holos",
    ],
    answer:
      "Holos is an independent research project by a [software engineer](https://johnpolacek.com), written in public as an ongoing process of thinking, not a finished doctrine. You can [discuss it](https://github.com/johnpolacek/Holos/discussions) or [contribute](https://github.com/johnpolacek/Holos) on GitHub.",
  },
  {
    id: "pdf",
    questions: ["is there a pdf", "can i download this", "download pdf", "how do i download holos"],
    answer: "Yes. Use the Download button in the sidebar, or open [holos.pdf](/holos.pdf).",
  },
];

const STOPWORDS = new Set(
  "a an the is are was were be been do does did of in on to for and or but it its this that these those i me my you your we us our holos s about what whats how why who can could would should please tell explain so really just where all there any".split(
    " "
  )
);
const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9φ\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

// Crude stemming so "branches" matches "branch" and "conscious" matches "consciousness".
const stem = (word: string) =>
  word
    .replace(/(ness|ing|ed|es|s)$/, "")
    .replace(/(ly)$/, "")
    .slice(0, 8);

const contentWords = (text: string) =>
  new Set(
    normalize(text)
      .filter((w) => !STOPWORDS.has(w))
      .map(stem)
  );

const SOCIAL = new Set(["hello", "thanks"]);

export function matchCanned(message: string): Canned | null {
  const words = normalize(message);
  if (words.length === 0) return null;

  // An exact example question always matches. Greetings and thanks match only this way.
  const flat = words.join(" ");
  for (const entry of CANNED) {
    if (entry.questions.some((q) => normalize(q).join(" ") === flat)) return entry;
  }

  const asked = contentWords(message);
  // Long questions carry nuance a canned answer would miss.
  if (asked.size === 0 || asked.size > 6) return null;

  let best: { entry: Canned; score: number } | null = null;
  for (const entry of CANNED) {
    if (SOCIAL.has(entry.id)) continue;
    for (const q of entry.questions) {
      const known = contentWords(q);
      if (known.size === 0) continue;
      let hits = 0;
      for (const w of Array.from(asked)) if (known.has(w)) hits++;
      // Every asked word must be covered, and most of the example's words must be asked.
      const score = hits === asked.size ? hits / Math.max(known.size, asked.size) : 0;
      if (score > (best?.score ?? 0)) best = { entry, score };
    }
  }
  return best && best.score >= 0.66 ? best.entry : null;
}
