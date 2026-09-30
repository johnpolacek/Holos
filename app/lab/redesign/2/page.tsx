import { Fragment } from "react";
import { isBlock, overviewMinutes, sectionInfo, sections } from "../_shared/content";
import SectionFigure, { FIGURE_SECTIONS } from "../_shared/figures";
import Hero from "./_components/Hero";
import NextPage from "./_components/NextPage";
import PageMotion from "./_components/PageMotion";

const pad = (n: number) => String(n).padStart(2, "0");
const hasFigure = (id: string) => (FIGURE_SECTIONS as readonly string[]).includes(id);

export default function NocturneHome() {
  let fig = 0;
  return (
    <>
      <main id="n-content">
        <Hero minutes={overviewMinutes} count={sections.length} />

        <section className="n-epigraph n-wrap" aria-label="Epigraph">
          <span className="n-label n-epigraph-mark" aria-hidden="true">
            ⊛
          </span>
          <p data-scrub>
            Lived reality needs both: not equations alone, and not experience alone, but a world
            that both exists and is experienced.
          </p>
        </section>

        {sections.map((s, i) => {
          const info = sectionInfo[i];
          const figure = hasFigure(s.id) ? ++fig : 0;
          return (
            <section key={s.id} id={s.id} className="n-sec" data-sec aria-labelledby={`${s.id}-t`}>
              <div className="n-wrap n-sec-grid">
                <aside className="n-rail" aria-hidden="true">
                  <div className="n-rail-in">
                    <span className="n-rail-num">{pad(i + 1)}</span>
                    <span className="n-rail-of">/ {pad(sections.length)}</span>
                    <span className="n-rail-bar">
                      <i className="n-rail-fill" />
                    </span>
                    <span className="n-rail-min">{info.minutes} min</span>
                  </div>
                </aside>
                <div className="n-sec-main">
                  <p className="n-sec-kicker n-label" aria-hidden="true">
                    {pad(i + 1)} <span>/ {pad(sections.length)}</span>
                  </p>
                  <h2 id={`${s.id}-t`} className="n-title" data-split="ellipse">
                    {s.title}
                  </h2>
                  <div className="n-prose">
                    {s.paragraphs.map((p, k) => (
                      <Fragment key={`${s.id}-${k}`}>
                        {isBlock(p) ? (
                          <div className="n-block" data-reveal>
                            {p}
                          </div>
                        ) : (
                          <p>{p}</p>
                        )}
                      </Fragment>
                    ))}
                  </div>
                  {figure > 0 && (
                    <figure className="n-fig figure-invert" data-reveal>
                      <figcaption className="n-fig-label n-label">
                        Fig. {pad(figure)} <span>· {s.title}</span>
                      </figcaption>
                      <SectionFigure id={s.id} />
                      <span className="n-corner n-corner-tl" aria-hidden="true" />
                      <span className="n-corner n-corner-tr" aria-hidden="true" />
                      <span className="n-corner n-corner-bl" aria-hidden="true" />
                      <span className="n-corner n-corner-br" aria-hidden="true" />
                    </figure>
                  )}
                </div>
              </div>
            </section>
          );
        })}
        <NextPage
          href="/lab/redesign/2/logic"
          title="Logic"
          sub="Primitive Definitions, Axioms and Foundations"
        />
      </main>
      <PageMotion />
    </>
  );
}
