import ComparisonTable, { type ComparisonRow } from "./ComparisonTable";

const columns = [
  "Copenhagen",
  "Many-Worlds (MWI)",
  "Bohmian Mechanics",
  "Relational QM (RQM)",
  "QBism",
  "Objective Collapse",
  "Consciousness Collapse",
];

const rows: ComparisonRow[] = [
  {
    dimension: "What is fundamental?",
    holos: "The totality (Omega): the universal quantum state, read as the one experiencer",
    others: [
      "Measurement outcomes, described in everyday (classical) terms",
      "Universal wavefunction",
      "Particles with definite positions, plus a wave that guides them",
      "Relations between systems",
      "Not specified; the quantum state is an agent's personal expectations",
      "Wavefunction plus a spontaneous collapse law",
      "Wavefunction plus consciousness that collapses it",
    ],
  },
  {
    dimension: "Is the wavefunction real?",
    holos: "Real: Creation, every branch physics produces",
    others: [
      "Versions differ: a tool for predicting outcomes, or something that really changes at measurement",
      "Literally real, never collapses",
      "Real, a guiding wave that never collapses",
      "A bookkeeping tool, relative to each system",
      "No: an agent's personal expectations",
      "Real, collapses at random, faster for larger systems",
      "Real, collapses when a conscious system registers it",
    ],
  },
  {
    dimension: "Collapse?",
    holos: "No collapse (branching); lived from within where observers exist",
    others: [
      "Yes, at measurement; whether physical or only an update of knowledge is left open",
      "No collapse (branching)",
      "No; the unused parts of the wave simply stop affecting the particles",
      "Relative collapse only",
      "Belief update",
      "Yes, physical and spontaneous",
      "Yes, triggered by consciousness",
    ],
  },
  {
    dimension: "Does consciousness change physics?",
    holos: "No, in the version defended here; Holos with collapse may put collapse at Φc",
    others: ["No, in Bohr's version", "No", "No", "No", "No", "No", "Yes"],
  },
  {
    dimension: "Role of observer",
    holos:
      "A system past the integration threshold (Φ ≥ Φc): one opening (aperture) through which the whole is lived",
    others: [
      "The measuring device, described classically; not a mind",
      "A physical system, with no special role",
      "Nothing special",
      "Any physical system; facts are relative to it",
      "Central: the agent using the theory",
      "Nothing special",
      "Cause of definite outcomes",
    ],
  },
  {
    dimension: "Reality without observers",
    holos: "Unlit structure: real as pattern, never lived",
    others: [
      "The theory is silent; it speaks only of measurement results",
      "Fully real",
      "Fully real, one history",
      "Relations still hold; any system can observe",
      "Real, but quantum theory is a tool for agents, not a description of it",
      "Fully real, one history",
      "Real, but superpositions persist unobserved",
    ],
  },
  {
    dimension: "Multiple realities?",
    holos: "Yes, branches: lived where observers exist",
    others: [
      "No",
      "Yes, branching universes",
      "No: one world; the other branches are empty",
      "One world; facts are relative to each system",
      "No",
      "No",
      "No",
    ],
  },
  {
    dimension: "Where the line between observer and observed falls",
    holos: "Where a system is the most integrated around, past the threshold Φc (provisional rule)",
    others: [
      "Between the quantum system and the classical apparatus, placed by the physicist",
      "Nowhere; everything is quantum",
      "Nowhere; everything follows the same laws",
      "Anywhere; any system can play observer",
      "At the agent",
      "Set by size and mass, not observers",
      "At a conscious system",
    ],
  },
  {
    dimension: "About reality, or about knowledge?",
    holos: "About reality (ontological)",
    others: [
      "Mostly about knowledge; versions differ",
      "About reality",
      "About reality",
      "Both: relations are real",
      "About knowledge",
      "About reality",
      "About reality",
    ],
  },
  {
    dimension: "Key prediction focus",
    holos: "Integration threshold; no consciousness-linked deviation from quantum mechanics",
    others: [
      "Same as standard quantum mechanics",
      "Same as standard quantum mechanics",
      "Same as standard quantum mechanics",
      "Same as standard quantum mechanics",
      "Same as standard quantum mechanics",
      "Tiny deviations in large superpositions",
      "Superpositions degrade when a conscious system registers them",
    ],
  },
];

export default function InterpretationComparisonTable() {
  return <ComparisonTable columns={columns} rows={rows} />;
}
