import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import EngravedFigure from "../EngravedFigure";
import type { FigureSpec, InlineEntry } from "./types";

// A figure's still, for the PDF. The PDF is rendered from an HTML string with no base URL,
// so the image is inlined. Server-only: it must not pull in a client component, because the
// on-demand PDF route cannot render those.
export function PDFStill({ still, label }: { still: string; label: string }) {
  const file = path.join(process.cwd(), "public/figures", still);
  if (!existsSync(file)) return null;
  return (
    <figure style={{ margin: "2em 0 1em" }}>
      <img
        src={`data:image/png;base64,${readFileSync(file).toString("base64")}`}
        alt={label}
        style={{ width: "100%", border: "1px solid rgba(0,0,0,0.1)" }}
      />
    </figure>
  );
}

// Renders a figure spec: the live engraved figure on the site, its still in the PDF.
export default function SpecFigure({ spec, isPDF = false }: { spec: FigureSpec; isPDF?: boolean }) {
  if (isPDF) return <PDFStill still={spec.still} label={spec.label} />;
  return <EngravedFigure scene={spec.scene} stages={spec.stages} label={spec.label} />;
}

export function InlineFigure({ entry, isPDF = false }: { entry: InlineEntry; isPDF?: boolean }) {
  if (typeof entry === "function") {
    const Component = entry;
    return <Component isPDF={isPDF} />;
  }
  return <SpecFigure spec={entry} isPDF={isPDF} />;
}
