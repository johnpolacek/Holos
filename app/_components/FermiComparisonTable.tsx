import ComparisonTable, { type ComparisonRow } from "./ComparisonTable";

const columns = ["Rare Earth", "Great Filter", "Grabby Aliens", "Zoo", "Aestivation"];

const rows: ComparisonRow[] = [
  {
    dimension: "Why the silence?",
    holos: "Mature civilizations turn compact, efficient, and quiet in light",
    others: [
      "Complex life is rare",
      "Something stops almost every civilization before it spreads",
      "Expanding civilizations exist but have not reached us. We are early",
      "They leave young civilizations alone on purpose",
      "They sleep until the universe is colder",
    ],
  },
  {
    dimension: "Is life common?",
    holos: "It can be",
    others: [
      "No",
      "Early life perhaps; advanced life no",
      "Loud, expanding civilizations are very rare, and so are quiet ones",
      "Yes",
      "Yes",
    ],
  },
  {
    dimension: "What we should find",
    holos:
      "Some individual stars with unexplained heat, in the mid or far infrared, and perhaps small, parked probes",
    others: [
      "Nothing",
      "Nothing, or the remains of civilizations",
      "Nothing, until an expanding front arrives",
      "Nothing they do not choose to show",
      "Little activity now",
    ],
  },
  {
    dimension: "What would count against it",
    holos: "A galaxy glowing with waste heat, or a settlement wave still spreading",
    others: [
      "Complex life found around another star",
      "Old civilizations thriving nearby",
      "Evidence that we are not early",
      "Any civilization breaking the rule",
      "Large-scale computation visible today",
    ],
  },
];

export default function FermiComparisonTable() {
  return (
    <ComparisonTable
      holosLabel="Integration Hypothesis"
      mark={false}
      columns={columns}
      rows={rows}
    />
  );
}
