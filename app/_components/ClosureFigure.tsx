import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import EngravedFigure, { type FigureStage } from "./EngravedFigure";

// Figure I1: closure, from Flatland to Omega.
const STAGES: FigureStage[] = [
  {
    title: "Flatland",
    caption:
      "In Edwin Abbott's Flatland, flat beings live in a plane. They know length and width, and nothing above or below.",
  },
  {
    title: "A sphere passes",
    caption:
      "To them, a sphere passing through is a dot that grows into a circle, shrinks, and vanishes. An event in time.",
  },
  {
    title: "From above",
    caption:
      "Seen from three dimensions, it is one sphere, all at once. Every circle they saw is a slice of it.",
  },
  {
    title: "One history, one shape",
    caption:
      "The same step repeats one level up. Stack the moments of a history along time, and the whole history is one fixed shape.",
  },
  {
    title: "Closure",
    caption:
      "What one level sees unfolding, the level above holds whole. Taken all the way, closure gives Omega, the whole, with nothing outside it.",
  },
];

const LABEL =
  "Engraved figure: a flat grid world with polygon inhabitants. A sphere passes through it, seen by them as a dot that becomes a growing and shrinking circle. From above, the sphere is whole, ringed by the circles they saw. Stacked along a time axis, those circles form one shape, and a large engraved sphere, Omega, encloses everything.";

export default function ClosureFigure({ isPDF = false }: { isPDF?: boolean }) {
  if (isPDF) {
    const file = path.join(process.cwd(), "public/figures/closure.png");
    if (!existsSync(file)) return null;
    // The PDF is rendered from an HTML string with no base URL, so the still is inlined.
    return (
      <figure style={{ margin: "2em 0 1em" }}>
        <img
          src={`data:image/png;base64,${readFileSync(file).toString("base64")}`}
          alt={LABEL}
          style={{ width: "100%", border: "1px solid rgba(0,0,0,0.1)" }}
        />
      </figure>
    );
  }
  return <EngravedFigure scene="closure" stages={STAGES} label={LABEL} />;
}
