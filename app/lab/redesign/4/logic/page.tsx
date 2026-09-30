import type { Metadata } from "next";
import Logic from "@/app/_components/Logic";
import { logicSubsections } from "../../_shared/content";
import LogicIndex from "../_components/LogicIndex";
import LogicMotion from "../_components/LogicMotion";

export const metadata: Metadata = {
  title: "Holos (⊛) – Redesign 4: Ledger – Logic",
  robots: { index: false, follow: false },
};

export default function LedgerLogic() {
  return (
    <main className="r4-logic-page">
      <LogicMotion />
      <header className="r4-lhead">
        <p className="r4-poster-meta" data-intro>
          <span>Logic</span>
          <span>{logicSubsections.length} sections</span>
          <span data-read-total>Specification</span>
        </p>
        <h1 className="r4-lhead-title" data-intro>
          Logic
        </h1>
        <span className="r4-lhead-rule" data-intro aria-hidden="true" />
        <p className="r4-lhead-sub" data-intro>
          Primitive Definitions, Axioms and Foundations
        </p>
      </header>
      <div className="r4-spec">
        <LogicIndex items={logicSubsections} />
        <article className="r4-logic">
          <Logic />
        </article>
      </div>
      <nav className="r4-onward" aria-label="Next page">
        <a href="/predictions" className="r4-onward-link">
          <span className="r4-row-fill" data-fill aria-hidden="true" />
          <span className="r4-label">Next</span>
          <span className="r4-onward-t">Predictions</span>
          <span className="r4-onward-a" data-arrow aria-hidden="true">
            →
          </span>
        </a>
      </nav>
    </main>
  );
}
