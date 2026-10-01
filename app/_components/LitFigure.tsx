import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import EngravedFigure, { type FigureStage } from "./EngravedFigure";

// Figure S1: lived, lit, and unlit in the block universe.
const STAGES: FigureStage[] = [
  {
    title: "The block",
    caption:
      "Every moment of the universe as one whole. Time runs up from the Big Bang. Each line is the history of a galaxy.",
  },
  {
    title: "Lived",
    caption:
      "Experience occurs only inside observers, a brief stretch of one history. No one lived through the early universe.",
  },
  {
    title: "Lit",
    caption:
      "Everything that could have sent a signal to the observer lies in its past. Starlight reaching its eye puts that galaxy there.",
  },
  {
    title: "The lit world",
    caption:
      "Add observers and their pasts join. Together they are the lit world, the world experience is made from.",
  },
  {
    title: "Unlit",
    caption:
      "What no signal could ever carry to any observer stays unlit. It exists as pattern but is never lived.",
  },
  {
    title: "A fact about arrangement",
    caption:
      "Nothing happens to a place when it is lit. Being lit is a fact about how the block is arranged.",
  },
];

const LABEL =
  "Engraved figure: a block of spacetime rising from the Big Bang, with galaxy histories as lines. Observers sit near the top, and each one's past light cone reaches down to the Big Bang. Histories inside a cone are inked as lit. Those outside every cone stay faint and unlit.";

export default function LitFigure({ isPDF = false }: { isPDF?: boolean }) {
  if (isPDF) {
    const file = path.join(process.cwd(), "public/figures/lived-lit-unlit.png");
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
  return <EngravedFigure scene="lived" stages={STAGES} label={LABEL} />;
}
