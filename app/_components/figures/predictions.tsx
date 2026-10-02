import type { FigureSpec } from "./types";

// Figure specs for the Predictions page. Each is placed with <SpecFigure spec={...} isPDF={isPDF} />
// right after the passage it illustrates.

const CLAIMS: FigureSpec = {
  scene: "predictions.claims",
  still: "predictions-claims.png",
  label:
    "Engraved figure: a stone foundation labeled commitments, with four columns standing on it for two tests, a check, and a bet. A clean sphere, presence, sits sealed in a case among them. Above, a spire drawn only in outline stands for speculation.",
  stages: [
    {
      title: "Commitments",
      caption: "What must be true if Holos is correct, independent of any future experiments.",
    },
    {
      title: "Testability and its limits",
      caption:
        "What can never be tested, presence, the fact that experience is lived. Then two tests Holos could fail, one consistency check, and one standing bet about physics.",
    },
    {
      title: "Speculation",
      caption:
        "Extensions that could follow under Holos on long timescales, stated with explicit alternatives rather than predictions, and labeled as such.",
    },
  ],
};

const RULES_OUT: FigureSpec = {
  scene: "predictions.rulesOut",
  still: "predictions-rules-out.png",
  label:
    "Engraved figure: a rock, a thermostat, and a person stand on one floor. Only the person is lit, with an open aperture above. Four rival views are shown and struck out in turn: sparks in the rock and thermostat, the aperture shut, a floor plan with the lived drawn on it, and a ghostly orb tethered beside the body.",
  stages: [
    {
      title: "Local",
      caption:
        "Experience occurs in no place except inside observers, systems past the threshold. It is not spread through matter.",
    },
    {
      title: "Not panpsychism",
      caption: "Ruled out. A flicker of experience in every particle, rock, or thermostat.",
    },
    {
      title: "Not illusionism",
      caption: "Ruled out. The view that experience does not exist, only the belief in it.",
    },
    {
      title: "Not strict physicalism",
      caption:
        "Ruled out. The view that physical language could state that something is lived. A floor plan records every wall and still cannot say what living in the house is like.",
    },
    {
      title: "Not dualism",
      caption:
        "Ruled out. Experience as an extra ingredient beyond physics. The gap is in the description, not in the world.",
    },
  ],
};

const TWO_LAYERS: FigureSpec = {
  scene: "predictions.twoLayers",
  still: "predictions-two-layers.png",
  label:
    "Engraved figure: a stone slab with branches lying in it, thick or thin by weight. Observers on posts rise from points on the branches, each with an aperture and a record above it. Two observers on different branches hold different records. Two on the same branch are joined by a dashed line, and their records match.",
  stages: [
    {
      title: "Structural facts",
      caption:
        "The laws of physics, the branches physics produces with their quantum weights, and whether a system meets the threshold. These are absolute and observer-independent.",
    },
    {
      title: "Registered facts",
      caption:
        "Which outcome a system registers from its own perspective. These are always indexed to observing systems. Where registrations would be incompatible, they belong to different branches.",
    },
    {
      title: "Records agree",
      caption:
        "Within a branch, whenever two observers actually compare records, their records agree. Without the structural layer, registration would have nothing stable to register.",
    },
  ],
};

const TESTABILITY: FigureSpec = {
  scene: "predictions.testability",
  still: "predictions-testability.png",
  label:
    "Engraved figure: a clean sphere, presence, sealed in a case on a pedestal, with a meter beside it reading nothing extra. Then a network with loops and a loop-free twin, both flashing the same output. Then four stone rings around the pedestal for Test A, Test B, Check C, and the standing bet.",
  stages: [
    {
      title: "Nothing extra",
      caption:
        "An instrument only ever records physical change, so presence itself cannot be detected directly. An instrument that finds nothing extra is exactly what Holos predicts.",
    },
    {
      title: "The unfolding argument",
      caption:
        "Any system with feedback loops can in principle be copied by a loop-free one that behaves identically, so no behavioral test can tell which is conscious. Holos accepts it for presence itself.",
    },
    {
      title: "Structural preconditions",
      caption:
        "What remains testable is what observation requires. Test A for the core, Test B for the transition, a consistency check, and a standing bet. These can genuinely fail.",
    },
  ],
};

export const SPECS: Record<string, FigureSpec> = {
  claims: CLAIMS,
  rulesOut: RULES_OUT,
  twoLayers: TWO_LAYERS,
  testability: TESTABILITY,
};
