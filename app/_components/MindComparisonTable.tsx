import ComparisonTable, { type ComparisonRow } from "./ComparisonTable";

const columns = [
  "Integrated Information (IIT)",
  "Global Workspace (GNWT)",
  "Higher-Order Theories (HOT)",
  "Panpsychism",
  "Cosmopsychism",
  "Illusionism",
];

const rows: ComparisonRow[] = [
  {
    dimension: "What is fundamental?",
    holos:
      "The whole (Omega). Experience is not derived from anything else; it is where Holos starts",
    others: [
      "The structure of causes and effects inside an integrated system, which IIT says simply is the experience",
      "Brain processes; consciousness is a function they perform",
      "Brain processes; a state is conscious when the brain represents itself as being in it",
      "Experience, in simple forms, in the basic building blocks of matter",
      "One conscious cosmos; individual minds derive from it",
      "Physical processes; experience lacks the special inner qualities it seems to have",
    ],
  },
  {
    dimension: "Where experience occurs",
    holos:
      "Only where a system is more integrated than anything around it, past the threshold (Φc), and carries a model of a world",
    others: [
      "Any system whose parts are at least slightly integrated, as long as it is the most integrated system around",
      "Where information is broadcast brain-wide",
      "Where a mental state is itself the target of a higher-order representation, often linked to the front of the brain (prefrontal cortex)",
      "Everywhere, in simple forms",
      "In the cosmos as a whole, and in its parts",
      "Nowhere, as usually conceived; what exists is the brain's representation of it",
    ],
  },
  {
    dimension: "A threshold?",
    holos: "Yes: none well below it, a narrow in-between zone (the twilight), then experience",
    others: [
      "No: graded from zero",
      'Information either floods the brain-wide network or does not ("ignition"); the theory is about this access',
      "All or nothing for each state: either it is re-represented or it is not",
      "No",
      "No",
      "Not applicable",
    ],
  },
  {
    dimension: "How many subjects?",
    holos:
      "One, experienced separately through each observer (each aperture walled off from the others)",
    others: [
      "One per peak of integration",
      "One per workspace",
      "One per creature with the right self-monitoring machinery",
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
      "Critics call its core claim untestable; simple grids can score higher than brains; Φ cannot be computed for real brains",
      "Critics: explains which information gets reported, not why it feels like anything",
      "Critics: animals and infants may lack the machinery; a higher-order state could misrepresent a state that isn't there",
      "Combining micro-subjects into one mind",
      "Decomposing the cosmic subject into many",
      "Explaining why the illusion is so convincing; most find experience undeniable",
    ],
  },
  {
    dimension: "Current AI",
    holos: "Open: it arguably models a world; integration decides",
    others: [
      "No: conventional digital hardware has negligible Φ",
      "Possible, if the architecture has a workspace",
      "Possible, if a system monitors its own internal states in the right way",
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
      "Tested through lesion and self-monitoring (metacognition) studies; contested",
      "Largely untestable",
      "Largely untestable",
      "Through explanations of why we believe we are conscious",
    ],
  },
];

export default function MindComparisonTable() {
  return <ComparisonTable columns={columns} rows={rows} />;
}
