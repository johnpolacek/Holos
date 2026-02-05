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
  { id: "extrapolation", title: "A Note on Extrapolation" },
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
  { id: "experiment-1", title: "Experiment 1" },
  { id: "experiment-2", title: "Experiment 2" },
  { id: "experiment-3", title: "Experiment 3" },
  { id: "experiment-4", title: "Experiment 4" },
];

export const trajectorySubsections: Subsection[] = [
  { id: "phase-0", title: "Phase 0: Pre-Visibility" },
  { id: "phase-1", title: "Phase 1: Signal Emergence" },
  { id: "phase-2", title: "Phase 2: Integration Shift" },
  { id: "phase-3", title: "Phase 3: Quiet Maturity" },
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
  {
    id: "trajectory",
    title: "Trajectory",
    path: "/trajectory",
    subsections: trajectorySubsections,
  },
  { id: "citations", title: "Citations", path: "/citations", subsections: [] },
];
