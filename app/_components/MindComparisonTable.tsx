import ComparisonTable, { type ComparisonRow } from "./ComparisonTable";

const columns = [
  "Integrated Information (IIT)",
  "Global Workspace (GNWT)",
  "Panpsychism",
  "Cosmopsychism",
  "Illusionism",
];

const rows: ComparisonRow[] = [
  {
    dimension: "What is fundamental?",
    holos: "The whole (Omega), with experience underived: the one fact Holos starts from",
    others: [
      "Integrated cause-effect structure, which simply is experience",
      "Brain processes; consciousness is a function they perform",
      "Experience, present in every bit of matter",
      "One conscious cosmos; individual minds derive from it",
      "Physical processes; experience as usually conceived does not exist",
    ],
  },
  {
    dimension: "Where experience occurs",
    holos: "Only at local peaks of integration above Φc, about a world",
    others: [
      "Any system with Φ above zero, at its maximum",
      "Where information is broadcast brain-wide",
      "Everywhere, in simple forms",
      "In the cosmos as a whole, and in its parts",
      "Nowhere as conceived; what exists is a representation of it",
    ],
  },
  {
    dimension: "A threshold?",
    holos: "Yes: none well below it, a narrow twilight, then experience",
    others: [
      "No: graded from zero",
      "Access ignites all-or-none; the theory concerns access",
      "No",
      "No",
      "Not applicable",
    ],
  },
  {
    dimension: "How many subjects?",
    holos: "One, walled off at each aperture",
    others: [
      "One per peak of integration",
      "One per workspace",
      "Countless micro-subjects",
      "One cosmic subject, with derived individuals",
      "The question is reframed as one about self-models",
    ],
  },
  {
    dimension: "Hardest problem",
    holos:
      "The measure of integration; decomposing one subject into many; anticipating strangers' experience as your own",
    others: [
      "Untestable identity claim; inert grids that score high",
      "Explains access and report, not experience itself",
      "Combining micro-subjects into one mind",
      "Decomposing the cosmic subject into many",
      "Denies the datum most find undeniable",
    ],
  },
  {
    dimension: "Current AI",
    holos: "Open: it arguably models a world; integration decides",
    others: [
      "No: conventional digital hardware has negligible Φ",
      "Possible, if the architecture has a workspace",
      "Its parts have micro-experience; the whole is unclear",
      "Unclear",
      "The same question as for us: does it model itself as conscious?",
    ],
  },
  {
    dimension: "Testability",
    holos: "Test A: experience tracks integration; Omega untestable",
    others: [
      "Tested in COGITATE; key claims challenged",
      "Tested in COGITATE; key claims challenged",
      "Largely untestable",
      "Largely untestable",
      "Through explanations of why we believe we are conscious",
    ],
  },
];

export default function MindComparisonTable() {
  return <ComparisonTable columns={columns} rows={rows} />;
}
