import type { Metadata } from "next";
import Link from "next/link";
import "./_shared/base.css";
import "./index.css";

export const metadata: Metadata = {
  title: "Holos (⊛) – Four Redesigns",
  robots: { index: false, follow: false },
};

type Design = {
  n: number;
  name: string;
  scope: string;
  family: string;
  line: string;
  feel: string;
  changes: string;
  bestFor: string;
};

const DESIGNS: Design[] = [
  {
    n: 1,
    name: "Monograph",
    scope: "Layout + look",
    family: "Engraved",
    line: "The site as a finely printed scientific monograph, the page itself engraved to match the plates.",
    feel: "A beautifully printed book",
    changes: "Type, spacing, a ruler that doubles as contents and progress; same order",
    bestFor: "Long, careful reading",
  },
  {
    n: 2,
    name: "Nocturne",
    scope: "Layout + look",
    family: "Bold: dark",
    line: "Reading Holos at night in an observatory: warm black, starlight text, one amber accent.",
    feel: "A calm, cinematic night sky",
    changes: "Dark palette, huge display serif, figures as glowing etchings; same order",
    bestFor: "First impressions and mood",
  },
  {
    n: 3,
    name: "Atlas",
    scope: "Everything",
    family: "Engraved",
    line: "Holos as an atlas of plates: a live engraved cover, routes, a table of plates, a legend, a glossary.",
    feel: "A modern museum catalog",
    changes: "New front door, reading routes, parts, glossary drawer, Logic regrouped",
    bestFor: "Finding your way in",
  },
  {
    n: 4,
    name: "Ledger",
    scope: "Everything",
    family: "Bold: Swiss",
    line: "An honest ledger of claims, organized by how firmly each is held. Stark type, one cobalt signal.",
    feel: "A Swiss poster with a spine of honesty",
    changes: "Front door built on the claims scale, numbered chapters, Logic as a spec",
    bestFor: "Showing what is known and what is bet",
  },
];

export default function RedesignIndex() {
  return (
    <div className="rd rdx">
      <header className="rdx-head">
        <p className="rdx-kicker">Holos ⊛ Lab</p>
        <h1>Four redesigns</h1>
        <p className="rdx-intro">
          Each one is a working prototype of the Overview and the Logic page, with the site&apos;s
          text unchanged. Two change only the layout and look; two also rethink how the site is
          organized and entered. Two grow out of the engraved plates; two depart boldly.
        </p>
      </header>

      <ol className="rdx-grid">
        {DESIGNS.map((d) => (
          <li key={d.n} className="rdx-card">
            <Link
              href={`/lab/redesign/${d.n}`}
              className="rdx-thumb"
              aria-label={`${d.name}: open the Overview`}
            >
              <img src={`/lab-redesign/${d.n}-desktop.jpg`} alt="" loading="lazy" />
              <img
                className="rdx-phone"
                src={`/lab-redesign/${d.n}-phone.jpg`}
                alt=""
                loading="lazy"
              />
            </Link>
            <div className="rdx-meta">
              <span className="rdx-n">{String(d.n).padStart(2, "0")}</span>
              <h2>{d.name}</h2>
              <span className="rdx-tags">
                <span>{d.scope}</span>
                <span>{d.family}</span>
              </span>
            </div>
            <p className="rdx-line">{d.line}</p>
            <p className="rdx-links">
              <Link href={`/lab/redesign/${d.n}`}>Overview</Link>
              <Link href={`/lab/redesign/${d.n}/logic`}>Logic</Link>
            </p>
          </li>
        ))}
      </ol>

      <section className="rdx-compare">
        <h2>At a glance</h2>
        <div className="rdx-table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Design</th>
                <th scope="col">Feels like</th>
                <th scope="col">What changes</th>
                <th scope="col">Best for</th>
              </tr>
            </thead>
            <tbody>
              {DESIGNS.map((d) => (
                <tr key={d.n}>
                  <th scope="row">
                    <Link href={`/lab/redesign/${d.n}`}>
                      {d.n}. {d.name}
                    </Link>
                  </th>
                  <td>{d.feel}</td>
                  <td>{d.changes}</td>
                  <td>{d.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rdx-note">
          The old animations are left out of all four, since every one is being replaced; the two
          engraved figures (Consciousness and Spacetime) appear in each. Add{" "}
          <code>?motion=reduced</code> to any page to see it without motion.
        </p>
      </section>
    </div>
  );
}
