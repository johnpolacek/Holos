import ComparisonTable, { type ComparisonRow } from "./ComparisonTable";

const columns = [
  "Many-Worlds (MWI)",
  "Relational QM (RQM)",
  "QBism",
  "Objective Collapse",
  "Consciousness Collapse",
];

const rows: ComparisonRow[] = [
  {
    dimension: "What is fundamental?",
    holos: "The totality (Ω): the universal quantum state, read as the one experiencer",
    others: [
      "Universal wavefunction",
      "Relations between systems",
      "Agent-centered beliefs",
      "Wavefunction plus a spontaneous collapse law",
      "Wavefunction plus consciousness that collapses it",
    ],
  },
  {
    dimension: "Wavefunction status",
    holos: "Real: Creation, every branch physics produces",
    others: [
      "Literally real, never collapses",
      "Observer-relative",
      "Subjective expectation",
      "Real, collapses at random, faster for larger systems",
      "Real, collapses when a conscious system registers it",
    ],
  },
  {
    dimension: "Collapse?",
    holos: "No collapse (branching); each branch registered from within",
    others: [
      "No collapse (branching)",
      "Relative collapse only",
      "Belief update",
      "Yes, physical and spontaneous",
      "Yes, triggered by consciousness",
    ],
  },
  {
    dimension: "Does consciousness change physics?",
    holos: "No, in the version defended here; Holos with collapse may put collapse at Φc",
    others: ["No", "No", "No", "No", "Yes"],
  },
  {
    dimension: "Role of observer",
    holos: "Local aperture of the totality (Φ ≥ Φc)",
    others: [
      "A physical system, with no special role",
      "Defines relational facts",
      "Central agent",
      "Nothing special",
      "Cause of definite outcomes",
    ],
  },
  {
    dimension: "Reality without observers",
    holos: "Unlit structure: real as pattern, never lived",
    others: [
      "Fully real",
      "Relations still hold; any system can observe",
      "Outside the theory's scope",
      "Fully real, one history",
      "Real, but superpositions persist unobserved",
    ],
  },
  {
    dimension: "Multiple realities?",
    holos: "Yes, branches: lived where observers exist",
    others: ["Yes, branching universes", "Yes, relative facts", "No", "No", "No"],
  },
  {
    dimension: "Observer cuts",
    holos: "Fixed by structure: a local Φ-maximum above Φc",
    others: [
      "Irrelevant",
      "Change relations",
      "Change beliefs",
      "Set by size and mass, not observers",
      "Set by consciousness",
    ],
  },
  {
    dimension: "Ontology vs epistemology",
    holos: "Explicitly ontological",
    others: ["Ontological", "Mixed / structural", "Epistemic", "Ontological", "Ontological"],
  },
  {
    dimension: "Key prediction focus",
    holos: "Integration threshold; no consciousness-linked deviation from quantum mechanics",
    others: [
      "Same as standard quantum mechanics",
      "Relational consistency",
      "Decision coherence",
      "Tiny deviations in large superpositions",
      "Superpositions degrade when a conscious system registers them",
    ],
  },
];

export default function InterpretationComparisonTable() {
  return <ComparisonTable columns={columns} rows={rows} />;
}
