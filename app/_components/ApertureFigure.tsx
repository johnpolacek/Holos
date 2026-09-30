import { readFileSync } from "node:fs";
import path from "node:path";
import EngravedFigure, { type FigureStage } from "./EngravedFigure";

// Figure O2 (wiki/figures.md): where integration opens an aperture.
const STAGES: FigureStage[] = [
  {
    title: "No point of view",
    caption:
      "A rock, a river, a thermostat, a busy network of separate processes: none has a point of view.",
  },
  {
    title: "Four requirements",
    caption:
      "Integration, differentiation, temporal cohesion, and aboutness: parts acting as one, many possible states, holding together over time, and a model of something beyond.",
  },
  {
    title: "Twilight",
    caption: "Near the threshold lies a narrow twilight, with no exact fact of the matter.",
  },
  {
    title: "An aperture",
    caption:
      "Past it, the system is an observer: an aperture through which the whole registers itself as experience.",
  },
];

const LABEL =
  "Engraved figure: objects without a point of view, a network whose parts join into one loop, a gauge entering the twilight band at the threshold, and an iris opening where the system becomes an observer.";

export default function ApertureFigure({ isPDF = false }: { isPDF?: boolean }) {
  if (isPDF) {
    // The PDF is rendered from an HTML string with no base URL, so the still is inlined.
    const png = readFileSync(path.join(process.cwd(), "public/figures/aperture.png"));
    return (
      <figure style={{ margin: "2em 0 1em" }}>
        <img
          src={`data:image/png;base64,${png.toString("base64")}`}
          alt={LABEL}
          style={{ width: "100%", border: "1px solid rgba(0,0,0,0.1)" }}
        />
      </figure>
    );
  }
  return <EngravedFigure scene="aperture" stages={STAGES} label={LABEL} />;
}
