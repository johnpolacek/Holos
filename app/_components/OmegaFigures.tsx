import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import EngravedFigure, { type FigureStage } from "./EngravedFigure";

// The Omega section's figures, each placed after the paragraph it illustrates.

type Spec = { scene: string; still: string; label: string; stages: FigureStage[] };

function Figure({ spec, isPDF }: { spec: Spec; isPDF: boolean }) {
  if (isPDF) {
    const file = path.join(process.cwd(), "public/figures", spec.still);
    if (!existsSync(file)) return null;
    // The PDF is rendered from an HTML string with no base URL, so the still is inlined.
    return (
      <figure style={{ margin: "2em 0 1em" }}>
        <img
          src={`data:image/png;base64,${readFileSync(file).toString("base64")}`}
          alt={spec.label}
          style={{ width: "100%", border: "1px solid rgba(0,0,0,0.1)" }}
        />
      </figure>
    );
  }
  return <EngravedFigure scene={spec.scene} stages={spec.stages} label={spec.label} />;
}

const WHOLE: Spec = {
  scene: "omegaWhole",
  still: "omega-whole.png",
  label:
    "Engraved figure: a branching tree, the universe's one quantum state, inside an engraved globe. Apertures open on a few branches. Lines reaching between them stop short. Branches outside every aperture's past darken. Outside the globe there is nothing.",
  stages: [
    {
      title: "One state",
      caption:
        "Physically, Omega is not mysterious. It is the universe's one quantum state, every branch included.",
    },
    {
      title: "Apertures",
      caption:
        "Holos adds one claim. The whole is also the one experiencer, and every observer is an aperture of it.",
    },
    {
      title: "Not one giant mind",
      caption: "Everything is in it, but its parts are not all joined.",
    },
    {
      title: "Not all lived",
      caption: "What lies outside every self's past is never experienced.",
    },
    {
      title: "Not an agent",
      caption:
        "Omega does not intervene, answer prayers, or direct history. There is no outside for it to act from.",
    },
  ],
};

const GALLERY: Spec = {
  scene: "gallery",
  still: "omega-gallery.png",
  label:
    "Engraved figure: a gallery of two rooms divided by a wall. One painting shows a figure in joy, the other a figure in grief. A single lamp above the wall sends light into both rooms.",
  stages: [
    {
      title: "A new self",
      caption:
        "When a system crosses the threshold, a new self begins, with its own body, memories, and point of view. In one room hangs a figure in joy.",
    },
    {
      title: "Another room",
      caption: "In another room, a figure in grief. Neither painting knows the other is there.",
    },
    {
      title: "The same light",
      caption: "The same light lives in both. A new self begins, but no new experiencer.",
    },
    {
      title: "Walking the gallery",
      caption:
        "The one experiencer lives through every self, walled off in each. You, walking the gallery, can see them both.",
    },
  ],
};

const COPIES: Spec = {
  scene: "copies",
  still: "omega-copies.png",
  label:
    "Engraved figure: a crowd of people, each with an aperture opening above them. Then one person walks into a copying booth and two identical people step out, both with apertures open.",
  stages: [
    { title: "Why this one?", caption: "Of billions of people, why is this one me?" },
    {
      title: "Each of them",
      caption: "Nothing chose this one. The one experiencer is each of them.",
    },
    { title: "A copier", caption: "Suppose a machine made two perfect copies of you." },
    {
      title: "Both",
      caption:
        "Which would be you? Both. Each is a self, and the one experiencer lives through each.",
    },
  ],
};

const LINEAGE: Spec = {
  scene: "lineage",
  still: "omega-lineage.png",
  label:
    "Engraved figure: a timeline beam broken between eras, with pillars for the Upanishads, Shankara, Spinoza, Berkeley, Schrödinger, Kolak, and Holos. Teilhard and Tipler appear only in outline.",
  stages: [
    {
      title: "One experiencer",
      caption:
        "The idea is old. The Upanishads, and later Advaita Vedanta, teach one experiencer, Brahman, looking out through every local self.",
    },
    {
      title: "One substance",
      caption:
        "Spinoza's single substance. Berkeley's never-absent perceiver, with one break. On Holos, part of the whole is never lived.",
    },
    {
      title: "A singular",
      caption:
        "Schrödinger wrote that consciousness is a singular of which the plural is unknown. The name Omega echoes Teilhard and Tipler, whose Omega was an endpoint. Holos means neither.",
    },
    {
      title: "Open individualism",
      caption:
        "Its nearest modern relative is Daniel Kolak's open individualism, the view that we are all the same subject.",
    },
  ],
};

// Paragraph index in the Omega section → the figure that follows it.
export const OMEGA_FIGURES: Record<number, Spec> = { 0: WHOLE, 1: GALLERY, 2: COPIES, 4: LINEAGE };

export default function OmegaFigure({ index, isPDF = false }: { index: number; isPDF?: boolean }) {
  const spec = OMEGA_FIGURES[index];
  return spec ? <Figure spec={spec} isPDF={isPDF} /> : null;
}
