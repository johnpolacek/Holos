export interface Subsection {
  id: string;
  title: string;
}

export interface Section {
  id: string;
  title: string;
  path: string;
  subsections: Subsection[];
}

export const theorySubsections: Subsection[] = [
  { id: "introduction", title: "Introduction" },
  { id: "meaning-of-life", title: "Meaning of Life" },
  { id: "consciousness", title: "Consciousness" },
  { id: "spacetime", title: "Spacetime" },
  { id: "extrapolation", title: "A Note on Extrapolation" },
  { id: "infinity", title: "Infinity" },
  { id: "aliens", title: "Aliens" },
  { id: "the-teeming-dark", title: "The Teeming Dark" },
  { id: "omega-point", title: "Omega" },
  { id: "why", title: "Why?" },
  { id: "holos", title: "Holos" },
];

export const logicSubsections: Subsection[] = [
  { id: "minimal-core", title: "Core" },
  { id: "operational-definition", title: "Definition" },
  { id: "comparison", title: "Among Interpretations" },
  { id: "mind-comparison", title: "Among Theories of Mind" },
  { id: "primitive-definitions", title: "Primitives" },
  { id: "logic-axioms", title: "Axioms" },
  { id: "foundational-propositions", title: "Foundations" },
  { id: "ontology", title: "Ontology" },
  { id: "totality", title: "Totality" },
  { id: "relationship-to-physics", title: "Physics" },
  { id: "mathematical-formalism", title: "Notation" },
  { id: "extrapolative-proposition", title: "Companion" },
  { id: "open-problems", title: "Open Problems" },
];

export const predictionsSubsections: Subsection[] = [
  { id: "prediction-introduction", title: "Introduction" },
  { id: "commitments", title: "Commitments" },
  { id: "expectations", title: "Expectations" },
  { id: "experimentation", title: "Testability & Its Limits" },
  { id: "experiment-1", title: "Test A: Integration vs. Behavior" },
  { id: "experiment-2", title: "Check B: Observer-Relative Facts" },
  { id: "standing-bet", title: "The Standing Bet" },
  { id: "speculation", title: "Speculation" },
  { id: "technology", title: "Technology" },
];

export const sections: Section[] = [
  { id: "overview", title: "Overview", path: "/", subsections: theorySubsections },
  { id: "logic", title: "Logic", path: "/logic", subsections: logicSubsections },
  {
    id: "predictions",
    title: "Predictions",
    path: "/predictions",
    subsections: predictionsSubsections,
  },
  { id: "citations", title: "Citations", path: "/citations", subsections: [] },
  { id: "revisions", title: "Revisions", path: "/revisions", subsections: [] },
];
