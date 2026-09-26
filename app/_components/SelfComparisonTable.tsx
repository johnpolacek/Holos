import ComparisonTable, { type ComparisonRow } from "./ComparisonTable";

const columns = ["Closed individualism", "Empty individualism"];

const rows: ComparisonRow[] = [
  {
    dimension: "What are you?",
    holos: "The one experiencer, awake at this aperture",
    others: ["One self, from birth to death", "A new self each moment"],
  },
  {
    dimension: "How many selves?",
    holos: "One, in every observer",
    others: ["One per person", "One per moment"],
  },
  {
    dimension: "Why am I this one?",
    holos: "Nothing to explain: the one subject is each of them",
    others: ["A brute fact", "A brute fact, moment by moment"],
  },
  {
    dimension: "A perfect copy is made",
    holos: "Both are you, with no remainder",
    others: ["A puzzle: one, the other, or neither", "Neither, as no later moment ever was"],
  },
  {
    dimension: "What walls perspectives apart",
    holos: "Structure: no integration bridges two apertures",
    others: ["Being different selves", "Being different selves"],
  },
  {
    dimension: "When a life ends",
    holos: "This perspective ends; the one subject stays awake elsewhere",
    others: ["The self ends", "Selves were ending all along"],
  },
];

export default function SelfComparisonTable() {
  return <ComparisonTable holosLabel="Holos (open individualism)" columns={columns} rows={rows} />;
}
