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
  { id: "our-universe", title: "Our Universe" },
  { id: "spacetime", title: "Spacetime" },
  { id: "higher-dimensions", title: "Higher Dimensions" },
  { id: "infinity", title: "Infinity" },
  { id: "black-holes", title: "Black Holes" },
  { id: "aliens", title: "Aliens" },
  { id: "the-teeming-dark", title: "The Teeming Dark" },
  { id: "omega-point", title: "The Omega Point" },
  { id: "why", title: "Why?" },
  { id: "holos", title: "Holos" },
];

export const logicSubsections: Subsection[] = [
  { id: "minimal-core", title: "Minimal Core" },
  { id: "operational-definition", title: "Operational Definition" },
  { id: "primitive-definitions", title: "Primitives" },
  { id: "logic-axioms", title: "Axioms" },
  { id: "foundational-propositions", title: "Foundations" },
  { id: "mathematical-formalism", title: "Math" },
  { id: "extrapolative-proposition", title: "Extrapolation" },
];

export const definitionSubsections: Subsection[] = [
  { id: "1-the-purpose-of", title: "The Purpose of Φ" },
  { id: "2-ontological-requirements", title: "Ontological" },
  { id: "3-mathematical-formalism", title: "Mathematical" },
  { id: "4-ontological-thresholds", title: "Thresholds" },
  { id: "5-relationship-to-physics-the-consistency-filter", title: "Physics" },
];

export const predictionsSubsections: Subsection[] = [
  { id: "comparison", title: "Comparison" },
  { id: "primary-prediction", title: "Primary" },
  { id: "secondary-predictions", title: "Secondary" },
  { id: "tertiary-prediction", title: "Tertiary" },
  { id: "extrapolative-prediction", title: "Extrapolative" },
  { id: "testable-implications", title: "Implications" },
  { id: "experiments", title: "Experiments" },
  { id: "trajectory", title: "Trajectory" },
];

export const sections: Section[] = [
  { id: "overview", title: "Overview", path: "/", subsections: theorySubsections },
  { id: "logic", title: "Logic", path: "/logic", subsections: logicSubsections },
  {
    id: "definition",
    title: "Definition",
    path: "/definition",
    subsections: definitionSubsections,
  },
  {
    id: "predictions",
    title: "Predictions",
    path: "/predictions",
    subsections: predictionsSubsections,
  },
  { id: "citations", title: "Citations", path: "/citations", subsections: [] },
];
