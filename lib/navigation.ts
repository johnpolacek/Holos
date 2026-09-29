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
  { id: "consciousness", title: "Consciousness" },
  { id: "spacetime", title: "Spacetime" },
  { id: "infinity", title: "Infinity" },
  { id: "omega-point", title: "Omega" },
  { id: "aliens", title: "Aliens" },
  { id: "the-teeming-dark", title: "The Teeming Dark" },
  { id: "why", title: "Why Are We Here?" },
];

export const logicSubsections: Subsection[] = [
  { id: "minimal-core", title: "Claims" },
  { id: "primitive-definitions", title: "Primitives" },
  { id: "logic-axioms", title: "Axioms" },
  { id: "foundational-propositions", title: "Foundations" },
  { id: "ontology", title: "Threshold" },
  { id: "totality", title: "Totality" },
  { id: "relationship-to-physics", title: "Physics" },
  { id: "mathematical-formalism", title: "Notation" },
  { id: "comparison", title: "Among Interpretations" },
  { id: "mind-comparison", title: "Among Theories of Mind" },
  { id: "open-problems", title: "Open Problems" },
];

export const predictionsSubsections: Subsection[] = [
  { id: "prediction-introduction", title: "Introduction" },
  { id: "commitments", title: "Commitments" },
  { id: "experimentation", title: "Testability & Its Limits" },
  { id: "experiment-1", title: "Test A: Integration vs. Behavior" },
  { id: "minimal-neural-systems", title: "Test B: The Twilight's Width" },
  { id: "experiment-2", title: "Check C: Observer-Relative Facts" },
  { id: "standing-bet", title: "The Standing Bet & Two Versions" },
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
