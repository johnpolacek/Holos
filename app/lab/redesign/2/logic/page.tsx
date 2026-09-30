import type { Metadata } from "next";
import Logic from "@/app/_components/Logic";
import { logicSubsections } from "../../_shared/content";
import LogicHero from "../_components/LogicHero";
import LogicIndex from "../_components/LogicIndex";
import NextPage from "../_components/NextPage";
import PageMotion from "../_components/PageMotion";

export const metadata: Metadata = {
  title: "Holos (⊛) – Redesign 2: Nocturne – Logic",
  robots: { index: false, follow: false },
};

export default function NocturneLogic() {
  return (
    <>
      <main id="n-content" className="n-logic">
        <LogicHero sections={logicSubsections.length} />
        <div className="n-wrap n-lgrid">
          <aside className="n-lside">
            <LogicIndex />
          </aside>
          <div className="n-lbody">
            <Logic />
          </div>
        </div>
        <NextPage href="/predictions" title="Predictions" sub="How Holos could be wrong" external />
      </main>
      <PageMotion />
    </>
  );
}
