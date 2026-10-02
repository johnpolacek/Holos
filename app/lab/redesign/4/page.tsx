import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  getSection,
  introBoxes,
  isBlock,
  nodeText,
  overviewMinutes,
  sectionInfo,
  sections,
  theorySubsections,
} from "../_shared/content";
import SectionFigure from "../_shared/figures";
import { BASE } from "./_components/base";
import { claims, subsections, terms } from "./_components/boxes";
import HomeMotion from "./_components/HomeMotion";
import Marquee from "./_components/Marquee";
import Oplus from "./_components/Oplus";

const pad = (n: number) => String(n).padStart(2, "0");
const shortTitle = (id: string) => theorySubsections.find((s) => s.id === id)?.title ?? id;

// The thesis is quoted from the Introduction, verbatim; fail the build if the text moves.
const QUESTIONS = [
  "Why are we here?",
  "Does life have a purpose?",
  "What does it mean to be real?",
];
const THESIS = [
  "Observation does not cause the universe, its laws, or its history.",
  "It makes a lawful universe a lived one.",
];
const introText = nodeText(getSection("introduction").paragraphs);
if (!introText.includes(THESIS.join(" ")) || !introText.includes(QUESTIONS.join(" "))) {
  throw new Error("Ledger quotes no longer match the Introduction");
}

// Firmness of each ledger tier, drawn as a rule: heavy and solid for physics as it stands,
// thinning and breaking up toward speculation. [thickness px, dash px, gap px]
const FIRMNESS: [number, number, number][] = [
  [12, 100, 0],
  [9, 100, 0],
  [7, 100, 0],
  [5, 100, 0],
  [4, 28, 6],
  [3, 14, 7],
  [2, 6, 6],
  [2, 2, 6],
];

function Paragraph({ node }: { node: ReactNode }) {
  return isBlock(node) ? <div className="r4-block">{node}</div> : <p>{node}</p>;
}

export default function LedgerHome() {
  const total = sections.length;
  return (
    <main className="r4-home">
      <HomeMotion />

      {/* 1. Poster */}
      <section className="r4-poster" aria-labelledby="r4-title">
        <div className="r4-poster-grid" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <p className="r4-poster-meta" data-intro>
          <span>Overview</span>
          <span>{total} chapters</span>
          <span>{overviewMinutes} min read</span>
        </p>
        <p className="r4-poster-q" data-intro>
          {QUESTIONS.map((q) => (
            <span key={q}>{q}</span>
          ))}
        </p>
        <ol className="r4-poster-toc" data-intro aria-label="Chapters">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                <span>{pad(i + 1)}</span>
                <span>{shortTitle(s.id)}</span>
              </a>
            </li>
          ))}
        </ol>
        <h1 id="r4-title" className="r4-poster-title">
          <span className="r4-holos" data-intro>
            Holos
          </span>
          <span className="r4-poster-rule" aria-hidden="true" />
          <span className="r4-sr">: </span>
          <span className="r4-poster-sub" data-intro>
            A Framework for Understanding Reality
          </span>
        </h1>
        <p className="r4-poster-eq" data-intro>
          <span className="r4-sr">R = C ⊛ O</span>
          <span aria-hidden="true">R</span>
          <span aria-hidden="true" className="r4-eq-op">
            =
          </span>
          <span aria-hidden="true">C</span>
          <Oplus className="r4-eq-glyph" />
          <span aria-hidden="true">O</span>
        </p>
        <a className="r4-poster-cue" href="#r4-thesis" data-intro>
          <span>Scroll</span>
          <span className="r4-cue-line" aria-hidden="true" />
        </a>
      </section>

      {/* 2. Thesis */}
      <section id="r4-thesis" className="r4-thesis" aria-label="Thesis">
        <p className="r4-label r4-thesis-label">
          <span className="r4-label-n">⊛</span> From the <a href="#introduction">Introduction</a>
        </p>
        <blockquote className="r4-statement" data-statement>
          <p>
            {THESIS[0]} It makes a lawful universe a <span className="r4-hl">lived</span>{" "}
            one.
          </p>
        </blockquote>
      </section>

      {/* 3. The ledger: the claims box, tier by tier, from firmest to loosest */}
      <section id="ledger" className="r4-ledger" aria-labelledby="r4-ledger-h">
        <div className="r4-ledger-pin">
          <div className="r4-ledger-viewport" data-run>
            <ol className="r4-ledger-track">
              <li className="r4-ledger-head">
                <p className="r4-label">
                  <span className="r4-label-n">A</span> The ledger
                </p>
                <h2 id="r4-ledger-h">{claims.heading}</h2>
                <p className="r4-ledger-after">{claims.after}</p>
              </li>
              {claims.items.map((c, i) => {
                const [h, dash, gap] = FIRMNESS[i] ?? [2, 2, 6];
                return (
                  <li
                    key={c.label}
                    className="r4-tier"
                    style={
                      {
                        "--h": `${h}px`,
                        "--dash": `${dash}px`,
                        "--gap": `${gap}px`,
                      } as CSSProperties
                    }
                  >
                    <span className="r4-tier-n">{pad(i + 1)}</span>
                    <span className="r4-tier-rule" aria-hidden="true" />
                    <h3>{c.label.replace(/\.$/, "")}</h3>
                    <p>{c.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="r4-axis" aria-hidden="true">
            <span>Firmest</span>
            <span className="r4-axis-line">
              <span className="r4-axis-fill" data-run-fill />
            </span>
            <span>Loosest</span>
          </div>
        </div>
      </section>

      {/* 4. Contents */}
      <section className="r4-contents" aria-labelledby="r4-contents-h">
        <Marquee items={sections.map((s) => shortTitle(s.id))} label="Chapter titles" />
        <div className="r4-contents-head">
          <h2 id="r4-contents-h" className="r4-label">
            <span className="r4-label-n">B</span> Contents
          </h2>
          <p className="r4-label">
            {total} chapters, <span data-count>{overviewMinutes}</span> min
          </p>
        </div>
        <ol className="r4-index">
          {sectionInfo.map((s, i) => (
            <li key={s.id}>
              <a className="r4-row" href={`#${s.id}`}>
                <span className="r4-row-fill" data-fill aria-hidden="true" />
                <span className="r4-row-n">{pad(i + 1)}</span>
                <span className="r4-row-t">{shortTitle(s.id)}</span>
                <span className="r4-row-l">{s.lede}</span>
                <span className="r4-row-m">
                  <span data-count>{s.minutes}</span> min
                </span>
                <span className="r4-row-a" data-arrow aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. The Overview, chapter by chapter */}
      <div className="r4-chapters">
        {sections.map((s, i) => {
          const info = sectionInfo[i];
          const next = sections[i + 1];
          const subs = subsections(s.paragraphs);
          const intro = s.id === "introduction";
          const figure = <SectionFigure id={s.id} />;
          return (
            <article
              key={s.id}
              id={s.id}
              className="r4-ch"
              data-chapter
              data-num={pad(i + 1)}
              data-title={shortTitle(s.id)}
              aria-labelledby={`${s.id}-h`}
            >
              <span className="r4-ch-rule" aria-hidden="true" />
              <div className="r4-ch-num" aria-hidden="true">
                <span>{pad(i + 1)}</span>
              </div>
              <header className="r4-ch-head">
                <p className="r4-ch-meta">
                  Chapter {pad(i + 1)} / {pad(total)}
                </p>
                <h2 id={`${s.id}-h`}>{s.title}</h2>
              </header>
              <div className="r4-ch-body">
                {s.paragraphs.map((p, j) => {
                  if (intro && j === introBoxes.terms) return null;
                  if (intro && j === introBoxes.claims)
                    return (
                      <a key="ledger" className="r4-pointer" href="#ledger">
                        <span className="r4-label">{claims.heading}</span>
                        <span className="r4-pointer-go">
                          In the ledger above <span aria-hidden="true">↑</span>
                        </span>
                      </a>
                    );
                  return <Paragraph key={`${s.id}-${j}`} node={p} />;
                })}
              </div>
              <aside className="r4-ch-aside" aria-label={`${shortTitle(s.id)}: chapter notes`}>
                <dl className="r4-card">
                  <div>
                    <dt>Reading</dt>
                    <dd>
                      <span data-count>{info.minutes}</span> min
                    </dd>
                  </div>
                  <div>
                    <dt>Words</dt>
                    <dd>
                      <span data-count>{info.words.toLocaleString("en-US")}</span>
                    </dd>
                  </div>
                  {subs.length > 0 && (
                    <div className="r4-card-wide">
                      <dt>In this chapter</dt>
                      {subs.map((x) => (
                        <dd key={x.id}>
                          <a href={`#${x.id}`}>{x.title}</a>
                        </dd>
                      ))}
                    </div>
                  )}
                  <div className="r4-card-wide">
                    <dt>Next</dt>
                    <dd>
                      {next ? (
                        <a href={`#${next.id}`} className="r4-card-next">
                          <span>{pad(i + 2)}</span> {shortTitle(next.id)}
                        </a>
                      ) : (
                        <Link href={`${BASE}/logic`} className="r4-card-next">
                          <span>L</span> Logic
                        </Link>
                      )}
                    </dd>
                  </div>
                </dl>
                {intro && (
                  <section className="r4-terms" aria-labelledby="r4-terms-h">
                    <h3 id="r4-terms-h" className="r4-label">
                      {terms.heading}
                    </h3>
                    <dl>
                      {terms.items.map((t) => (
                        <div key={t.label}>
                          <dt>{t.label.replace(/\.$/, "")}</dt>
                          <dd>{t.body}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}
              </aside>
              {s.id === "consciousness" || s.id === "spacetime" ? (
                <div className="r4-ch-fig">{figure}</div>
              ) : null}
            </article>
          );
        })}
      </div>

      {/* 6. Onward */}
      <nav className="r4-onward" aria-label="Next page">
        <Link href={`${BASE}/logic`} className="r4-onward-link">
          <span className="r4-row-fill" data-fill aria-hidden="true" />
          <span className="r4-label">Next</span>
          <span className="r4-onward-t">Logic</span>
          <span className="r4-onward-a" data-arrow aria-hidden="true">
            →
          </span>
        </Link>
      </nav>
    </main>
  );
}
