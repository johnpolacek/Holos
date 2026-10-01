import ComparisonTable, { type ComparisonRow } from "./ComparisonTable";

const columns = [
  "Closed individualism (one self per lifetime)",
  "Reductionism (Parfit: identity is not what matters)",
  "Empty individualism (one self per moment)",
];

const rows: ComparisonRow[] = [
  {
    dimension: "What are you?",
    holos: "A self, lived by the one experiencer",
    others: [
      "One self, from birth to death",
      "A brain and body with a connected mental life; nothing further",
      "A new self each moment",
    ],
  },
  {
    dimension: "How many selves?",
    holos: "One per observer. One experiencer lives through them all",
    others: [
      "One per person",
      "One per person, but being the same person is a matter of degree",
      "One per moment",
    ],
  },
  {
    dimension: "Why am I this one?",
    holos: "Nothing to explain. The one experiencer is each of them",
    others: [
      'Often: nothing to explain, since "I" picks out whoever asks; for some, a brute fact',
      "No deep further fact to explain",
      "The same reply, applied to each moment's self",
    ],
  },
  {
    dimension: "A perfect copy is made",
    holos: "Both are you: two selves, one experiencer",
    others: [
      "A hard case: one, the other, or neither, each defended",
      "The question may have no answer, and it doesn't matter: both copies keep what matters, the psychological connection",
      "Neither; no future self was ever you, copy or not",
    ],
  },
  {
    dimension: "Whose future pain do you anticipate?",
    holos: "No claim. One experiencer does not settle what to anticipate or value",
    others: [
      "Only your own",
      "Anyone's, in proportion to how psychologically connected they are to you now",
      "Strictly, no one's, not even your own tomorrow",
    ],
  },
  {
    dimension: "What walls perspectives apart",
    holos: "Structure: no integration bridges two observers",
    others: [
      "Being different selves",
      "Separate brains and separate chains of memory",
      "Being different selves",
    ],
  },
  {
    dimension: "When a life ends",
    holos: "This self ends. The one experiencer goes on in every other self",
    others: [
      "The self ends",
      "Connections end; death matters less than it seems",
      "Selves were ending all along",
    ],
  },
  {
    dimension: "Hardest objection",
    holos: "Why the walls between selves are absolute",
    others: [
      "Copying and splitting cases with no clear answer",
      "Seems to leave no special reason to care about your own future",
      "It undercuts caring about your own future",
    ],
  },
];

export default function SelfComparisonTable() {
  return <ComparisonTable holosLabel="Holos (open individualism)" columns={columns} rows={rows} />;
}
