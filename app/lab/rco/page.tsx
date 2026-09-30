import type { Metadata } from "next";
import type React from "react";
import { IM_Fell_English } from "next/font/google";
import MathInline from "../../_components/MathInline";
import RcoHover from "./RcoHover";

const fell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-fell",
});

export const metadata: Metadata = {
  title: "Holos (⊛) – R, C, O treatments",
  robots: { index: false, follow: false },
};

const INK = "#1a1a1a";
const ACCENT = "#b3401e";

/* Small engraved glyphs: C a branching tree, O an iris, R the tree seen through the iris. */
function Glyph({ kind, size = 26 }: { kind: "C" | "O" | "R"; size?: number }) {
  const tree = (
    <g fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round">
      <path d="M16 27 V17 M16 17 L10 11 M16 17 L22 11 M10 11 L7 6 M10 11 L13 6 M22 11 L19 6 M22 11 L25 6" />
    </g>
  );
  const iris = (
    <g fill="none" stroke={INK} strokeWidth="1.1">
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="5" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={16 + Math.cos(a) * 5.8}
            y1={16 + Math.sin(a) * 5.8}
            x2={16 + Math.cos(a) * 11.2}
            y2={16 + Math.sin(a) * 11.2}
            strokeWidth="0.6"
          />
        );
      })}
    </g>
  );
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "-0.35em" }}
    >
      {kind === "C" && tree}
      {kind === "O" && iris}
      {kind === "R" && (
        <>
          <circle cx="16" cy="16" r="13" fill="none" stroke={INK} strokeWidth="1.1" />
          <g transform="translate(4 3) scale(0.75)">{tree}</g>
        </>
      )}
    </svg>
  );
}

function Variant({
  n,
  name,
  note,
  children,
}: {
  n: number;
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/15 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-light">
          {n}. {name}
        </h2>
        <p className="text-sm text-black/55 mt-1 max-w-2xl">{note}</p>
      </div>
      <div className="text-lg text-black/80 leading-relaxed max-w-3xl">{children}</div>
    </section>
  );
}

const Tail = () => (
  <>
    {" "}
    On the physics Holos bets on, observing changes nothing it takes in (see{" "}
    <a href="/logic#mathematical-formalism" className="underline">
      Notation
    </a>
    ).
  </>
);

const smallCaps: React.CSSProperties = {
  fontVariant: "small-caps",
  letterSpacing: "0.06em",
  fontWeight: 600,
};

const bigLetter: React.CSSProperties = {
  fontFamily: "var(--font-fell)",
  fontStyle: "italic",
  fontSize: "1.35em",
  lineHeight: 1,
};

function Entries() {
  return (
    <dl className="my-4 space-y-2">
      {[
        ["C", "Creation", "the structure physics produces."],
        ["O", "Observation", "that structure experienced from the inside."],
        ["R", "Reality", "the result."],
      ].map(([l, w, d]) => (
        <div key={l} className="flex gap-5 items-baseline">
          <dt className="w-8 text-right text-3xl italic" style={{ fontFamily: "var(--font-fell)" }}>
            {l}
          </dt>
          <dd>
            <span style={smallCaps}>{w}</span>, {d}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function NotationLine() {
  return (
    <p>
      On the physics Holos bets on, observing changes nothing it takes in (see{" "}
      <a href="/logic#mathematical-formalism" className="underline">
        Notation
      </a>
      ).
    </p>
  );
}

function FormulaPlate() {
  return (
    <div
      className="shrink-0 border border-black/30 px-5 py-4 text-center"
      style={{ fontFamily: "var(--font-fell)" }}
    >
      <div className="text-3xl italic">R = C ⊛ O</div>
      <div className="text-[0.7rem] uppercase tracking-widest text-black/55 mt-2 leading-5">
        Reality
        <br />
        Creation
        <br />
        Observation
      </div>
    </div>
  );
}

export default function RcoLab() {
  return (
    <div className="h-screen overflow-auto bg-white">
    <main className={`${fell.variable} px-8 lg:px-16 py-16 max-w-5xl mx-auto`}>
      <h1 className="text-4xl font-light">R, C, O treatments</h1>
      <p className="text-black/60 mt-3 max-w-2xl">
        Paragraph 4 of the Intro, option B, set several ways. The two combinations are first. Same words in every version.
      </p>

      <Variant
        n={11}
        name="Quoted entries (9, no letters)"
        note="Variant 9 with the margin letters removed. The three lines are indented behind a left rule, like a blockquote."
      >
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>.
        </p>
        <div className="my-4 ml-2 border-l-2 border-black/25 pl-6 space-y-1">
          <p>
            <span style={smallCaps}>Creation</span>, the structure physics produces.
          </p>
          <p>
            <span style={smallCaps}>Observation</span>, that structure experienced from the inside.
          </p>
          <p>
            <span style={smallCaps}>Reality</span>, the result.
          </p>
        </div>
        <NotationLine />
      </Variant>

      <Variant
        n={9}
        name="Entries + small caps (4 + 1)"
        note="The three entries, with each term in small caps. The letter in the margin carries the symbol, the caps carry the name."
      >
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>.
        </p>
        <Entries />
        <NotationLine />
      </Variant>

      <Variant
        n={10}
        name="Entries + small caps + margin plate (4 + 1 + 8)"
        note="The prose and entries run clean with no formula inline. The formula sits beside them as a small plate."
      >
        <div className="flex gap-10 items-start">
          <div className="flex-1">
            <p>Holos writes this as a formula.</p>
            <Entries />
            <NotationLine />
          </div>
          <FormulaPlate />
        </div>
      </Variant>

      <Variant n={0} name="Current (plain)" note="What is on the site now, for reference.">
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>. Creation (C) is the structure
          physics produces. Observation (O) is that structure experienced from the inside. Reality
          (R) is the result.
          <Tail />
        </p>
      </Variant>

      <Variant
        n={1}
        name="Small caps terms"
        note="The terms become proper names. Quiet, bookish, no new elements. The letters drop out of the prose since the caps already mark the term."
      >
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>.{" "}
          <span style={smallCaps}>Creation</span> is the structure physics produces.{" "}
          <span style={smallCaps}>Observation</span> is that structure experienced from the inside.{" "}
          <span style={smallCaps}>Reality</span> is the result.
          <Tail />
        </p>
      </Variant>

      <Variant
        n={2}
        name="Initial letter as the term"
        note="The first letter of each term is set large in engraver's italic, so the letter and the word are one mark. The formula reads as three initials."
      >
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>.{" "}
          <span style={bigLetter}>C</span>reation is the structure physics produces.{" "}
          <span style={bigLetter}>O</span>bservation is that structure experienced from the inside.{" "}
          <span style={bigLetter}>R</span>eality is the result.
          <Tail />
        </p>
      </Variant>

      <Variant
        n={3}
        name="Anatomy of the formula"
        note="The formula is set large on its own line with each term labeled beneath its letter. The prose then only needs one sentence per term, without the letters."
      >
        <div className="flex justify-center my-4">
          <div
            className="grid grid-cols-5 gap-x-6 text-center items-end"
            style={{ fontFamily: "var(--font-fell)" }}
          >
            {[
              ["R", "Reality"],
              ["=", ""],
              ["C", "Creation"],
              ["⊛", ""],
              ["O", "Observation"],
            ].map(([l, w], i) => (
              <div key={i}>
                <div className="text-5xl italic">{l}</div>
                <div className="text-xs uppercase tracking-widest text-black/55 mt-2 h-4">{w}</div>
              </div>
            ))}
          </div>
        </div>
        <p>
          Creation is the structure physics produces. Observation is that structure experienced from
          the inside. Reality is the result.
          <Tail />
        </p>
      </Variant>

      <Variant
        n={4}
        name="Three entries"
        note="Each term gets its own line, like a dictionary entry, with the letter hung in the margin. Scannable. Breaks the paragraph into a small list."
      >
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>.
        </p>
        <dl className="my-4 space-y-2">
          {[
            ["C", "Creation", "the structure physics produces."],
            ["O", "Observation", "that structure experienced from the inside."],
            ["R", "Reality", "the result."],
          ].map(([l, w, d]) => (
            <div key={l} className="flex gap-5 items-baseline">
              <dt className="w-8 text-right text-3xl italic" style={{ fontFamily: "var(--font-fell)" }}>
                {l}
              </dt>
              <dd>
                <strong className="font-semibold">{w}</strong>, {d}
              </dd>
            </div>
          ))}
        </dl>
        <p>
          On the physics Holos bets on, observing changes nothing it takes in (see{" "}
          <a href="/logic#mathematical-formalism" className="underline">
            Notation
          </a>
          ).
        </p>
      </Variant>

      <Variant
        n={5}
        name="Engraved glyphs"
        note="Each term carries a tiny line-art emblem. Creation is the branching tree from the Intro plate, Observation the iris, Reality the tree seen through the iris. The emblems can recur site-wide wherever the terms appear."
      >
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>. <Glyph kind="C" /> Creation is the
          structure physics produces. <Glyph kind="O" /> Observation is that structure experienced from
          the inside. <Glyph kind="R" /> Reality is the result.
          <Tail />
        </p>
      </Variant>

      <Variant
        n={6}
        name="Reality in the accent ink"
        note="C and O stay in ink. Only R takes the vermilion accent, in the formula and in the prose. The eye goes to the answer, and it ties back to 'Reality requires a witness.'"
      >
        <p>
          Holos writes this as{" "}
          <span style={{ fontFamily: "var(--font-fell)", fontStyle: "italic", fontSize: "1.2em" }}>
            <span style={{ color: ACCENT }}>R</span> = C ⊛ O
          </span>
          . Creation (C) is the structure physics produces. Observation (O) is that structure
          experienced from the inside. <span style={{ color: ACCENT }}>Reality (R)</span> is the
          result.
          <Tail />
        </p>
      </Variant>

      <Variant
        n={7}
        name="Linked on hover"
        note="Plain on the page. Hover a letter in the formula and its sentence underlines, hover a sentence and its letter lights. Quiet until used. Needs a fallback on touch, where it is just variant 0."
      >
        <RcoHover />
      </Variant>

      <Variant
        n={8}
        name="Sidenote formula"
        note="The prose runs clean with no letters. The formula sits in the margin as a small engraved plate beside it. Reads like a textbook with its figure."
      >
        <div className="flex gap-8 items-start">
          <p className="flex-1">
            Holos writes this as a formula. Creation is the structure physics produces. Observation is
            that structure experienced from the inside. Reality is the result.
            <Tail />
          </p>
          <div
            className="shrink-0 border border-black/30 px-5 py-4 text-center"
            style={{ fontFamily: "var(--font-fell)" }}
          >
            <div className="text-3xl italic">R = C ⊛ O</div>
            <div className="text-[0.7rem] uppercase tracking-widest text-black/55 mt-2 leading-5">
              Reality
              <br />
              Creation
              <br />
              Observation
            </div>
          </div>
        </div>
      </Variant>
    </main>
    </div>
  );
}
