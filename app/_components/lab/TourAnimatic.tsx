"use client";

// Animatic of the eight-chapter tour: the storyboard's stops and narration over rough
// plates, paced like the eraser scene. Chapters with a 3D previs scene play it in the
// engraved line render; the rest still show flat placeholder sketches.

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Plate3D, { type Plate3DHandle } from "./Plate3D";
import { SCENES3D } from "./tourScenes3d";
import { Sketch } from "./tourSketches";
import { CHAPTERS, readingTime } from "./tourStoryboard";

gsap.registerPlugin(DrawSVGPlugin);

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const RING = 2 * Math.PI * 15;
const DRAW = 2; // seconds a sketch takes to engrave
const TITLE = 2.2; // seconds the chapter title holds before the first stop
const DRAWABLE = ["line", "path", "circle:not(.an-dot)", "ellipse", "rect", "polygon", "polyline"]
  .map((t) => `.an-sketch ${t}`)
  .join(", ");

const TOTAL_SECONDS = CHAPTERS.reduce(
  (sum, ch) => sum + TITLE + ch.stops.reduce((s, st) => s + DRAW + readingTime(st.narration), 0),
  0
);
const chapterSeconds = (c: number) =>
  TITLE + CHAPTERS[c].stops.reduce((s, st) => s + DRAW + readingTime(st.narration), 0);

type Pos = { c: number; i: number };

export default function TourAnimatic() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Pos>({ c: 0, i: 0 });
  const [waiting, setWaiting] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [notes, setNotes] = useState(true);
  const playingRef = useRef(true);
  const anim = useRef<{ tl?: gsap.core.Timeline; cd?: gsap.core.Tween }>({});
  const plate3d = useRef<Plate3DHandle>(null);

  const chapter = CHAPTERS[pos.c];
  const stop = chapter.stops[pos.i];
  const status = stop.status ?? chapter.status;
  const last = pos.c === CHAPTERS.length - 1 && pos.i === chapter.stops.length - 1;
  const is3D = chapter.id in SCENES3D;

  const next = useCallback(() => {
    setPos(({ c, i }) => {
      if (i + 1 < CHAPTERS[c].stops.length) return { c, i: i + 1 };
      if (c + 1 < CHAPTERS.length) return { c: c + 1, i: 0 };
      return { c: 0, i: 0 };
    });
  }, []);
  const prev = useCallback(() => {
    setPos(({ c, i }) => {
      if (i > 0) return { c, i: i - 1 };
      if (c > 0) return { c: c - 1, i: CHAPTERS[c - 1].stops.length - 1 };
      return { c, i };
    });
  }, []);

  // Each stop: the chapter title (first stop only), the sketch engraves, then the card counts down.
  useIsoLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.removeAttribute("data-pending");
    setWaiting(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const title = wrap.querySelector(".an-title");
      const draws = wrap.querySelectorAll(DRAWABLE);
      const fades = wrap.querySelectorAll(".an-sketch text, .an-sketch .an-dot");
      const tl = gsap.timeline({
        paused: !playingRef.current,
        onComplete: () => {
          setWaiting(true);
          anim.current.cd = gsap.fromTo(
            wrap.querySelector(".cd-ring"),
            { strokeDashoffset: 0 },
            {
              strokeDashoffset: RING,
              duration: readingTime(stop.narration),
              ease: "none",
              paused: !playingRef.current,
              onComplete: next,
            }
          );
        },
      });
      if (pos.i === 0 && !reduce) {
        tl.fromTo(title, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
        tl.to(title, { autoAlpha: 0, duration: 0.4 }, `+=${TITLE - 0.9}`);
      } else {
        gsap.set(title, { autoAlpha: 0 });
      }
      if (is3D) {
        plate3d.current?.play(chapter.id, pos.i, tl, reduce);
      } else if (reduce) {
        tl.set({}, {}, 0.01);
      } else {
        tl.fromTo(
          draws,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.1, ease: "power1.inOut", stagger: { amount: DRAW - 1.1 } }
        );
        tl.fromTo(fades, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: 0.03 }, "-=0.8");
      }
      gsap.fromTo(
        wrap.querySelector(".scene3d-card-text"),
        { autoAlpha: 0, y: 4 },
        { autoAlpha: 1, y: 0, duration: 0.4 }
      );
      anim.current.tl = tl;
    }, wrap);
    return () => {
      anim.current.cd?.kill();
      anim.current = {};
      ctx.revert();
    };
  }, [pos, next, is3D, chapter.id]);

  // Pause freezes both the drawing and the countdown; so does a hidden tab.
  useEffect(() => {
    playingRef.current = playing;
    const sync = () => {
      const run = playing && !document.hidden;
      anim.current.tl?.paused(!run);
      anim.current.cd?.paused(!run);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [playing]);

  // Right, space, or Enter go forward a stop; left goes back.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (
        ["Space", "ArrowRight"].includes(e.code) ||
        (e.code === "Enter" && target?.tagName !== "BUTTON" && target?.tagName !== "A")
      ) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const statusW = status.length * 7.6 + 36;

  return (
    <div ref={wrapRef} className="animatic" data-pending="">
      <nav className="an-nav" aria-label="Chapters">
        {CHAPTERS.map((ch, c) => (
          <button
            key={ch.id}
            type="button"
            aria-current={c === pos.c ? "step" : undefined}
            onClick={() => setPos({ c, i: 0 })}
          >
            <span className="an-nav-num">{ch.numeral}</span>
            {ch.title}
            <span className="an-nav-time">{Math.round(chapterSeconds(c))}s</span>
          </button>
        ))}
      </nav>

      <div
        className="an-plate-wrap"
        role="img"
        aria-label={`Plate ${chapter.numeral}, ${chapter.name}: ${stop.shows}`}
      >
        {is3D && <Plate3D ref={plate3d} />}
        <svg className="an-plate" viewBox="0 0 1000 560" aria-hidden="true">
          {!is3D && <rect x={0} y={0} width={1000} height={560} fill="#fbfaf5" />}
          <rect x={14} y={14} width={972} height={532} className="k" />
          <rect x={20} y={20} width={960} height={520} className="l" />
          {Array.from({ length: 47 }, (_, k) => (
            <line
              key={k}
              x1={40 + k * 20}
              y1={20}
              x2={40 + k * 20}
              y2={k % 5 ? 25 : 30}
              className="l"
            />
          ))}
          <g transform="translate(950 510)">
            <circle r={8} className="l" />
            <path d="M-13 0 L13 0 M0 -13 L0 13" className="l" />
          </g>
          <text x={500} y={60} className="an-cap an-heading" textAnchor="middle">
            PLATE {chapter.numeral} · {chapter.name.toUpperCase()}
          </text>
          <rect x={500 - statusW / 2} y={72} width={statusW} height={24} className="l" />
          <text x={500} y={88} className="an-status" textAnchor="middle">
            {status}
          </text>
          {!is3D && (
            <g key={`${pos.c}-${pos.i}`} transform="translate(0 64)">
              <Sketch items={stop.sketch ?? []} />
            </g>
          )}
          <g className="an-title">
            <rect x={21} y={21} width={958} height={518} fill="#fbfaf5" />
            <text x={500} y={240} className="an-cap" fontSize={16} textAnchor="middle">
              PLATE {chapter.numeral}
            </text>
            <text x={500} y={290} className="an-big" textAnchor="middle">
              {chapter.title}
            </text>
            <text x={500} y={326} className="an-status" fontSize={18} textAnchor="middle">
              {chapter.name}
            </text>
          </g>
        </svg>
      </div>

      <nav className="an-dots" aria-label="Stops">
        {chapter.stops.map((st, i) => (
          <button
            key={st.title}
            type="button"
            aria-current={i === pos.i ? "step" : undefined}
            aria-label={`Stop ${i + 1}: ${st.title}`}
            title={st.title}
            onClick={() => setPos({ c: pos.c, i })}
          />
        ))}
      </nav>

      <div className="an-card" aria-live="polite">
        <div className="scene3d-card-head">
          <p className="scene3d-card-title">
            <span className="scene3d-card-step">
              {chapter.numeral} · {pos.i + 1}/{chapter.stops.length}
            </span>
            {stop.title}
          </p>
          <div className="scene3d-card-next" data-shown={waiting ? "" : undefined}>
            <button
              type="button"
              onClick={next}
              aria-label={last ? "Start the tour again" : "Continue"}
              title={last ? "Start again (space)" : "Continue (space)"}
            >
              <svg viewBox="0 0 36 36" aria-hidden="true">
                <circle cx={18} cy={18} r={15} className="cd-track" />
                <circle
                  cx={18}
                  cy={18}
                  r={15}
                  className="cd-ring"
                  strokeDasharray={RING}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              {last ? (
                <RotateCcw size={14} strokeWidth={1.5} />
              ) : (
                <ChevronRight size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
        <p className="scene3d-card-text">{stop.narration}</p>
        <p className="an-card-link">
          <a href={`/#${chapter.id}`} target="_blank" rel="noreferrer">
            Read this in the text ↗
          </a>
        </p>
        {notes && <p className="an-notes">Plate shows: {stop.shows}</p>}
      </div>

      <div className="plate-controls">
        <span className="an-total">Full tour about {Math.round(TOTAL_SECONDS / 60)} min</span>
        <button type="button" onClick={prev} aria-label="Previous stop">
          <ChevronLeft size={14} strokeWidth={1.5} className="inline -mt-0.5" /> Back
        </button>
        <button type="button" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
          {playing ? "Pause" : "Play"}
        </button>
        <button type="button" onClick={() => setNotes((n) => !n)}>
          {notes ? "Hide stage directions" : "Show stage directions"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            setPos({ c: 0, i: 0 });
          }}
        >
          Start over
        </button>
      </div>
      <noscript>
        <style>{".animatic[data-pending] .an-sketch{visibility:visible}"}</style>
      </noscript>
    </div>
  );
}
