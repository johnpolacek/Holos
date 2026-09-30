import Logic from "@/app/_components/Logic";
import { logicSubsections, minutes, nodeText, words } from "../../_shared/content";
import Arrow from "../_components/Arrow";
import { AXIOMS, LOGIC_GROUPS } from "../_components/atlas";
import LogicIndex, { type IndexGroup } from "../_components/LogicIndex";
import LogicMotion from "../_components/LogicMotion";

const titles = Object.fromEntries(
  logicSubsections.map((s, i) => [s.id, { title: s.title, n: i + 1 }])
);
const groups: IndexGroup[] = LOGIC_GROUPS.map((g) => ({
  title: g.title,
  items: g.ids.map((id) => ({ id, ...titles[id] })),
}));
const logicMinutes = minutes(words(nodeText(Logic())));

export default function AtlasLogic() {
  return (
    <main id="r3-main" className="r3-logic">
      <LogicMotion />
      <header className="r3-logic-hero">
        <div>
          <span className="r3-kicker" data-intro data-rise>
            The apparatus
          </span>
          <h1 data-intro data-title>
            Logic
          </h1>
        </div>
        <div>
          <p className="r3-logic-sub" data-intro data-rise>
            Primitive definitions, axioms, and foundations
          </p>
          <p className="r3-logic-meta" data-intro data-rise>
            <span>
              <b>{logicSubsections.length}</b> sections
            </span>
            <span>
              <b>{AXIOMS.length}</b> axioms
            </span>
            <span>
              <b>{logicMinutes}</b> min
            </span>
          </p>
        </div>
      </header>
      <span
        className="r3-rule"
        data-intro
        data-hero-rule
        aria-hidden="true"
        style={{ marginTop: -1 }}
      />

      <section className="r3-axioms" aria-labelledby="r3-axioms-h">
        <div className="r3-axioms-head">
          <h2 id="r3-axioms-h" className="r3-kicker" data-intro data-rise>
            The five axioms
          </h2>
          <p className="r3-axioms-key" data-intro data-rise>
            <span>
              <i data-kind="side" aria-hidden="true" />A side taken
            </span>
            <span>
              <i data-kind="addition" aria-hidden="true" />
              An addition to physics
            </span>
          </p>
        </div>
        <ol className="r3-axiom-row">
          {AXIOMS.map((a) => (
            <li key={a.n} data-intro data-axiom>
              <a href={`#axiom-${a.n}`} className="r3-axiom" data-kind={a.kind}>
                <span className="r3-axiom-n">
                  <small>A</small>
                  {a.n}
                </span>
                <span className="r3-axiom-t">{a.title}</span>
                <span className="r3-axiom-k">
                  <span className="r3-axiom-sw" aria-hidden="true" />
                  {a.kind === "addition" ? "An addition to physics" : "A side taken"}
                </span>
                <Arrow dir="down" className="r3-axiom-arrow" />
              </a>
            </li>
          ))}
        </ol>
      </section>

      <div className="r3-apparatus">
        <LogicIndex groups={groups} total={logicSubsections.length} />
        <div className="r3-logic-text">
          <Logic />
        </div>
      </div>

      <footer className="r3-colophon">
        <span className="r3-rule" data-rule />
        <div className="r3-colophon-grid">
          <p className="r3-colophon-text">
            Holos is an independent research project by a{" "}
            <a href="https://johnpolacek.com">software engineer</a> exploring reality through
            systems, observation, and experience, written in public as part of an ongoing process of
            thinking, not as a finalized doctrine.
          </p>
          <div className="r3-colophon-links">
            <a href="https://github.com/johnpolacek/Holos/discussions">Discuss</a>
            <a href="https://github.com/johnpolacek/Holos">Contribute</a>
            <a href="#r3-main">
              Back to the top
              <Arrow dir="up" className="r3-colophon-arrow" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
