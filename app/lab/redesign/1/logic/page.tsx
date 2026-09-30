import Logic from "@/app/_components/Logic";
import { minutes, nodeText, words } from "../../_shared/content";
import Colophon from "../_components/Colophon";
import PageMotion from "../_components/PageMotion";
import TitlePlate from "../_components/TitlePlate";

const HEADS = [".r1-logic > div > section > h2", ".r1-logic > div > div[id] > h2"].join(", ");
const BLOCKS = [
  ".r1-logic #logic-axioms > div > div",
  ".r1-logic .overflow-x-auto",
  ".r1-logic > div > div:not([id]):last-child",
].join(", ");

export default function MonographLogic() {
  const readMinutes = minutes(words(nodeText(Logic())));
  return (
    <>
      <TitlePlate
        size="compact"
        kicker={<span className="r1-caps">Holos</span>}
        title="Logic"
        sub="Primitive Definitions, Axioms and Foundations"
        footLeft={<span className="r1-eq">R = C ⊛ O</span>}
        footCenter={`Logic · ${readMinutes} min`}
        footRight={<a href="#minimal-core">§ I · Claims ↓</a>}
      />
      <main className="r1-main r1-prose r1-logic">
        <Logic />
      </main>
      <Colophon next={{ href: "/predictions", label: "Predictions" }} />
      <PageMotion heads={HEADS} title=":scope" blocks={BLOCKS} />
    </>
  );
}
