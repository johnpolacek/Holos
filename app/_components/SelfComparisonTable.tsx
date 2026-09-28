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
    others: [
      'Often: nothing to explain, since "I" picks out whoever asks; for some, a brute fact',
      "The same reply, applied to each moment's self",
    ],
  },
  {
    dimension: "A perfect copy is made",
    holos: "Both are you, with no remainder",
    others: [
      "A hard case: one, the other, or neither, each defended",
      "Neither, as no later moment ever was",
    ],
  },
  {
    dimension: "Whose future pain do you anticipate?",
    holos: "Everyone's: the view's price, and its ethical point",
    others: ["Only your own", "Strictly, no one's, not even your own tomorrow"],
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
  {
    dimension: "Hardest objection",
    holos: "Anticipating strangers' experience as your own",
    others: [
      "Copying and splitting cases with no clear answer",
      "It undercuts caring about your own future",
    ],
  },
];

export default function SelfComparisonTable() {
  return <ComparisonTable holosLabel="Holos (open individualism)" columns={columns} rows={rows} />;
}
