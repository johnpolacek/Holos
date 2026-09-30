"use client";

// An engraved 3D figure placed in the text. It starts playing the first time it scrolls
// into view, steps through its stages with a caption card and a countdown, and loops.
// Scrolling away or a hidden tab pauses it; reduced motion shows the last stage, still.

import gsap from "gsap";
import { ChevronRight, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Plate3D, { type Plate3DHandle } from "./lab/Plate3D";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const RING = 2 * Math.PI * 15;

export type FigureStage = { title: string; caption: string };

function readingTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.min(Math.max(3 + words * 0.17, 5), 11);
}

export default function EngravedFigure({
  scene,
  stages,
  label,
}: {
  scene: string;
  stages: FigureStage[];
  label: string;
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const plate = useRef<Plate3DHandle>(null);
  const anim = useRef<{ tl?: gsap.core.Timeline; cd?: gsap.core.Tween }>({});
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [nonce, setNonce] = useState(0);
  const run = useRef({ playing: true, visible: false });

  const sync = useCallback(() => {
    const go = run.current.playing && run.current.visible && !document.hidden;
    anim.current.tl?.paused(!go);
    anim.current.cd?.paused(!go);
  }, []);

  const next = useCallback(() => setStage((i) => (i + 1) % stages.length), [stages.length]);
  const prev = useCallback(() => setStage((i) => Math.max(0, i - 1)), []);

  // Start on first sight; pause whenever the figure leaves the screen.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      setStage(stages.length - 1);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      run.current.visible = e.isIntersecting;
      if (e.isIntersecting) setStarted(true);
      sync();
    });
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [stages.length, sync]);

  useIsoLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!started || !wrap) return;
    setWaiting(false);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (reduce) return;
          setWaiting(true);
          anim.current.cd = gsap.fromTo(
            wrap.querySelector(".cd-ring"),
            { strokeDashoffset: 0 },
            {
              strokeDashoffset: RING,
              duration: readingTime(stages[stage].caption),
              ease: "none",
              onComplete: next,
            }
          );
          sync();
        },
      });
      plate.current?.play(scene, stage, tl, reduce);
      anim.current.tl = tl;
    }, wrap);
    sync();
    return () => {
      anim.current.cd?.kill();
      anim.current = {};
      ctx.revert();
    };
  }, [started, stage, nonce, scene, stages, reduce, next, sync]);

  useEffect(() => {
    run.current.playing = playing;
    sync();
  }, [playing, sync]);

  const current = stages[stage];
  const last = stage === stages.length - 1;

  return (
    <figure ref={wrapRef} className="plate-figure engraved-figure">
      <div className="engraved-figure-frame">
        <div className="engraved-figure-stage" role="img" aria-label={label}>
          <Plate3D ref={plate} />
        </div>
        {/* The caption sits in a band joined to the drawing, so it never covers it. */}
        <div className="scene3d-card" aria-live="polite">
          <div className="scene3d-card-head">
            <p className="scene3d-card-title">
              <span className="scene3d-card-step">
                {stage + 1}/{stages.length}
              </span>
              {current.title}
            </p>
            {!reduce && (
              <div className="scene3d-card-next" data-shown={waiting ? "" : undefined}>
                <button
                  type="button"
                  onClick={next}
                  aria-label={last ? "Start again" : "Continue"}
                  title={last ? "Start again" : "Continue"}
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
            )}
          </div>
          {/* Every caption shares one grid cell, so the band keeps the tallest one's height. */}
          <div className="engraved-figure-captions">
            {stages.map((s, i) => (
              <p
                key={s.title}
                className="scene3d-card-text"
                data-on={i === stage ? "" : undefined}
                aria-hidden={i !== stage}
              >
                {s.caption}
              </p>
            ))}
          </div>
        </div>
      </div>
      {!reduce && (
        <div className="plate-controls">
          <button type="button" onClick={prev} disabled={stage === 0}>
            Back
          </button>
          <button type="button" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              setStage(0);
              setNonce((n) => n + 1);
            }}
          >
            Replay from the start
          </button>
        </div>
      )}
    </figure>
  );
}
