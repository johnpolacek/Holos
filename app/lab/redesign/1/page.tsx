import { isValidElement, type ReactNode } from "react";
import { isBlock, overviewMinutes, sectionInfo, sections } from "../_shared/content";
import SectionFigure, { FIGURE_SECTIONS } from "../_shared/figures";
import { BASE, roman } from "./_components/base";
import Colophon from "./_components/Colophon";
import PageMotion from "./_components/PageMotion";
import TitlePlate from "./_components/TitlePlate";

// Blocks inside the text get a treatment by their key: the claims and the key terms become
// ruled tables, the Fermi comparison breaks out to the wide measure.
function Block({ node }: { node: ReactNode }) {
  const key = isValidElement(node) ? node.key : null;
  if (key === "claims-box")
    return (
      <div className="r1-table r1-reveal" data-label="Table I">
        {node}
      </div>
    );
  if (key === "key-terms")
    return (
      <div className="r1-table r1-reveal" data-label="Table II">
        {node}
      </div>
    );
  if (key === "fermi-table") return <div className="r1-wide r1-reveal">{node}</div>;
  return <div>{node}</div>;
}

export default function MonographOverview() {
  let fig = 0;
  return (
    <>
      <TitlePlate
        size="full"
        kicker={
          <>
            <span className="r1-greek" lang="grc">
              ὅλος
            </span>
            <span className="r1-caps">“whole”</span>
          </>
        }
        title="Holos"
        titleAfter={<span className="r1-sr">: </span>}
        sub={
          <>
            A Framework for Understanding Reality
          </>
        }
        footLeft={<span className="r1-eq">R = C ⊛ O</span>}
        footCenter={`Overview · ${overviewMinutes} min`}
        footRight={<a href="#introduction">§ I · Introduction ↓</a>}
      />
      <main className="r1-main r1-prose">
        {sections.map((s, i) => {
          const hasFigure = (FIGURE_SECTIONS as readonly string[]).includes(s.id);
          if (hasFigure) fig += 1;
          return (
            <section key={s.id} id={s.id} className="r1-sec" aria-labelledby={`${s.id}-h`}>
              <header className="r1-head">
                <p className="r1-head-num" aria-hidden="true">
                  § {roman(i + 1)}
                </p>
                <h2 className="r1-head-title" id={`${s.id}-h`}>
                  {s.title}
                </h2>
                <div className="r1-head-rule">
                  <span className="r1-head-meta">{sectionInfo[i].minutes} min</span>
                </div>
              </header>
              <div className="r1-text">
                {s.paragraphs.map((p, k) =>
                  isBlock(p) ? (
                    <Block key={`${s.id}-${k}`} node={p} />
                  ) : (
                    <p key={`${s.id}-${k}`}>{p}</p>
                  )
                )}
              </div>
              {hasFigure && (
                <figure className="r1-fig r1-reveal">
                  <figcaption className="r1-fig-label">
                    <span>
                      <b>Fig. {fig}</b>
                    </span>
                    <span>
                      § {roman(i + 1)} · {s.title}
                    </span>
                  </figcaption>
                  <SectionFigure id={s.id} />
                </figure>
              )}
            </section>
          );
        })}
      </main>
      <Colophon next={{ href: `${BASE}/logic`, label: "Logic" }} />
      <PageMotion heads=".r1-head" title=".r1-head-title" blocks=".r1-reveal" />
    </>
  );
}
