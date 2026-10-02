import Logic from "@/app/_components/Logic";
import Predictions from "@/app/_components/Predictions";
import {
  getSection,
  introBoxes,
  isBlock,
  minutes,
  nodeText,
  overviewMinutes,
  sectionInfo,
  words,
} from "../_shared/content";
import SectionFigure, { FIGURE_SECTIONS } from "../_shared/figures";
import Arrow from "./_components/Arrow";
import { BASE, NUMERALS, PARTS } from "./_components/atlas";
import CoverPlate from "./_components/CoverPlate";
import DrawerButton from "./_components/DrawerButton";
import HomeMotion from "./_components/HomeMotion";
import Mark from "./_components/Mark";

const info = Object.fromEntries(sectionInfo.map((s, i) => [s.id, { ...s, numeral: NUMERALS[i] }]));
const hasFigure = (id: string) => (FIGURE_SECTIONS as readonly string[]).includes(id);
const partOf = (id: string) => PARTS.find((p) => (p.ids as readonly string[]).includes(id));

// Reading times for the other two routes, from the pages' own text.
const logicMinutes = minutes(words(nodeText(Logic())));
const predictionsMinutes = minutes(words(nodeText(Predictions())));

const ROUTES = [
  {
    key: "A",
    title: "In brief",
    covers: "The Introduction",
    minutes: info.introduction.minutes,
    href: "#introduction",
    stations: 2,
  },
  {
    key: "B",
    title: "The whole Overview",
    covers: "Plates I to VIII, in four parts",
    minutes: overviewMinutes,
    href: "#plates",
    stations: 8,
  },
  {
    key: "C",
    title: "The formal argument",
    covers: "Logic: claims, axioms, notation",
    minutes: logicMinutes,
    href: `${BASE}/logic`,
    stations: 11,
  },
  {
    key: "D",
    title: "How it could be wrong",
    covers: "Predictions: the tests and the standing bet",
    minutes: predictionsMinutes,
    href: "/predictions",
    stations: 9,
  },
];

function RouteLine({ stations }: { stations: number }) {
  const w = 300;
  const xs = Array.from({ length: stations }, (_, i) =>
    stations === 1 ? 150 : 8 + (i * (w - 16)) / (stations - 1)
  );
  return (
    <svg className="r3-route-line" viewBox={`0 0 ${w} 20`} aria-hidden="true">
      <path d={`M8 10H${w - 8}`} className="r3-route-track" />
      <path d={`M8 10H${w - 8}`} className="r3-route-path" data-route-path />
      {xs.map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={10}
          r={i === 0 || i === stations - 1 ? 3.6 : 2.2}
          className={i === stations - 1 ? "r3-route-end" : "r3-route-stop"}
          data-route-stop
        />
      ))}
    </svg>
  );
}

function Paragraphs({ id }: { id: string }) {
  const s = getSection(id);
  const skip = id === "introduction" ? [introBoxes.claims, introBoxes.terms] : [];
  return (
    <>
      {s.paragraphs.map((p, i) => {
        if (skip.includes(i)) return null;
        const key = `${id}-${i}`;
        return isBlock(p) ? <div key={key}>{p}</div> : <p key={key}>{p}</p>;
      })}
    </>
  );
}

export default function AtlasHome() {
  const intro = getSection("introduction");
  return (
    <main id="r3-main" className="r3-home">
      <HomeMotion />

      {/* Cover */}
      <section className="r3-cover" aria-labelledby="r3-title">
        <div className="r3-cover-text">
          <p className="r3-cover-etym" data-intro data-rise>
            <span className="r3-cover-etym-k">Holos</span>
            <span>
              from the Greek <em>ὅλος</em>, “whole”
            </span>
          </p>
          <h1 id="r3-title">
            <span className="r3-title" data-intro data-title>
              Holos
            </span>
            <span className="r3-sr">: </span>
            <span className="r3-subtitle" data-intro data-sub>
              A Framework for Understanding Reality
            </span>
          </h1>
          <p className="r3-cover-eq" data-intro data-rise>
            <span>R</span> = <span>C</span> <Mark className="r3-eq-glyph" />
            <span className="r3-sr">⊛</span> <span>O</span>
          </p>
          <dl className="r3-cover-meta" data-intro data-rise>
            <div>
              <dt>Plates</dt>
              <dd>{sectionInfo.length}</dd>
            </div>
            <div>
              <dt>Parts</dt>
              <dd>{PARTS.length}</dd>
            </div>
            <div>
              <dt>Reading</dt>
              <dd>{overviewMinutes} min</dd>
            </div>
          </dl>
          <div className="r3-cover-actions" data-intro data-rise>
            <a className="r3-btn r3-btn-ink" href="#introduction">
              Begin reading
              <Arrow dir="down" className="r3-btn-arrow" />
            </a>
            <a className="r3-btn" href="#routes">
              Routes
            </a>
          </div>
        </div>
        <CoverPlate />
      </section>

      {/* Routes */}
      <section id="routes" className="r3-front r3-routes" aria-labelledby="r3-routes-h">
        <div className="r3-head">
          <h2 id="r3-routes-h" data-lines>
            Routes
          </h2>
          <p className="r3-head-note" data-reveal>
            Reading times at 230 words a minute.
          </p>
          <span className="r3-rule" data-rule />
        </div>
        <ol className="r3-route-list">
          {ROUTES.map((r) => (
            <li key={r.key} data-reveal>
              <a className="r3-route" href={r.href}>
                <span className="r3-route-key">Route {r.key}</span>
                <span className="r3-route-title">{r.title}</span>
                <span className="r3-route-covers">{r.covers}</span>
                <RouteLine stations={r.stations} />
                <span className="r3-route-foot">
                  <span className="r3-route-min">
                    <b data-count={r.minutes}>{r.minutes}</b> min
                  </span>
                  <Arrow className="r3-route-arrow" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Table of plates */}
      <section id="plates" className="r3-front r3-toc" aria-labelledby="r3-toc-h">
        <div className="r3-head">
          <h2 id="r3-toc-h" data-lines>
            Table of plates
          </h2>
          <p className="r3-head-note" data-reveal>
            {sectionInfo.length} plates in {PARTS.length} parts
          </p>
          <span className="r3-rule" data-rule />
        </div>
        {PARTS.map((part) => (
          <div key={part.numeral} className="r3-toc-part">
            <p className="r3-toc-partname" data-reveal>
              <span>Part {part.numeral}</span>
              {part.title}
            </p>
            <ol className="r3-toc-rows">
              {part.ids.map((id) => {
                const s = info[id];
                return (
                  <li key={id} data-row>
                    <a href={`#${id}`} className="r3-toc-row">
                      <span className="r3-toc-fill" aria-hidden="true" />
                      <span className="r3-toc-no">{s.numeral}</span>
                      <span className="r3-toc-title">{s.title}</span>
                      <span className="r3-toc-lede">{s.lede}</span>
                      <span className="r3-toc-meta">
                        {hasFigure(id) && <span className="r3-toc-fig">Fig.</span>}
                        {s.minutes} min
                      </span>
                      <Arrow className="r3-toc-arrow" />
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </section>

      {/* Legend: the claims box */}
      <section id="legend" className="r3-front r3-legend-sec" aria-label="Legend">
        <div className="r3-head r3-head-min">
          <span className="r3-kicker" data-reveal>
            Legend
          </span>
          <span className="r3-rule" data-rule />
        </div>
        <div className="r3-legend" data-legend>
          {intro.paragraphs[introBoxes.claims]}
        </div>
      </section>

      {/* The plates themselves, part by part */}
      {PARTS.map((part) => (
        <div key={part.numeral} className="r3-partwrap">
          <section className="r3-part" aria-label={`Part ${part.numeral}: ${part.title}`}>
            <span className="r3-part-no" aria-hidden="true" data-drift>
              {part.numeral}
            </span>
            <div className="r3-part-text">
              <span className="r3-kicker" data-reveal>
                Part {part.numeral}
              </span>
              <p className="r3-part-title" data-lines>
                {part.title}
              </p>
              <ol className="r3-part-list" data-reveal>
                {part.ids.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`}>
                      <span>{info[id].numeral}</span>
                      {info[id].title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {part.ids.map((id) => {
            const s = info[id];
            const p = partOf(id);
            return (
              <section key={id} id={id} className="r3-plate" aria-labelledby={`${id}-h`}>
                <aside className="r3-plate-rail" aria-hidden="true">
                  <div className="r3-plate-sticky">
                    <span className="r3-plate-no">Plate {s.numeral}</span>
                    <span className="r3-plate-name">{s.title}</span>
                    <span className="r3-plate-min">
                      {p && `Part ${p.numeral} · `}
                      {s.minutes} min
                    </span>
                    <a href="#plates" className="r3-plate-back" tabIndex={-1}>
                      <Arrow dir="up" className="r3-plate-back-arrow" />
                      Table of plates
                    </a>
                  </div>
                </aside>
                <div className="r3-plate-body">
                  <header className="r3-plate-head">
                    <span className="r3-kicker r3-plate-kicker">Plate {s.numeral}</span>
                    <h2 id={`${id}-h`} data-lines>
                      {s.title}
                    </h2>
                    <span className="r3-rule" data-rule />
                  </header>
                  <div className="r3-prose">
                    <Paragraphs id={id} />
                    {id === "introduction" && (
                      <div className="r3-pointer">
                        <a href="#legend" className="r3-pointer-item">
                          <span className="r3-swatch-mini" aria-hidden="true" />
                          <span>
                            <b>What Holos claims, and how firmly</b>
                            <span>See the Legend</span>
                          </span>
                          <Arrow dir="up" className="r3-pointer-arrow" />
                        </a>
                        <DrawerButton tab="glossary" className="r3-pointer-item">
                          <span className="r3-pointer-aa" aria-hidden="true">
                            Aa
                          </span>
                          <span>
                            <b>Key terms in plain words</b>
                            <span>Open the Glossary</span>
                          </span>
                          <Arrow className="r3-pointer-arrow" />
                        </DrawerButton>
                      </div>
                    )}
                  </div>
                </div>
                {hasFigure(id) && (
                  <div className="r3-fig" data-reveal>
                    <div className="r3-fig-inner">
                      <p className="r3-fig-label">
                        Fig. {s.numeral}
                        <span>{s.title}</span>
                      </p>
                      <SectionFigure id={id} />
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ))}

      <footer className="r3-colophon">
        <div className="r3-tailpiece" aria-hidden="true" data-reveal>
          <span />
          <Mark className="r3-tailpiece-mark" />
          <span />
        </div>
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
            <a href="#r3-title">
              Back to the cover
              <Arrow dir="up" className="r3-colophon-arrow" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
