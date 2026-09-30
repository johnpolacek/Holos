"use client";

// The frontispiece: the Introduction's 3D engraved scene, played quietly in a loop inside
// plate furniture. The tree engraves once; the loop then returns to the second stop so the
// tree stays drawn. It pauses offscreen (and releases its WebGL context after a while),
// has a pause control, and under reduced motion shows the last stop, still.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Plate3D, { type Plate3DHandle } from "@/app/_components/lab/Plate3D";
import { gsap, prefersReducedMotion } from "../../_shared/motion";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Stop titles from the storyboard (wiki/storyboard.md).
const STOPS = [
  "Every branch",
  "No one home",
  "An observer",
  "The shorthand",
  "Many observers",
  "Two additions",
];
const HOLD = [1.6, 2.2, 2.2, 3.2, 2.6, 3.4];
const TICKS = 48;

export default function CoverPlate() {
  const wrapRef = useRef<HTMLElement>(null);
  const plate = useRef<Plate3DHandle>(null);
  const anim = useRef<{ tl?: gsap.core.Timeline; hold?: gsap.core.Tween }>({});
  const run = useRef({ playing: true, visible: false });
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const [live, setLive] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [reduce, setReduce] = useState(false);

  const sync = useCallback(() => {
    const go = run.current.playing && run.current.visible && !document.hidden;
    anim.current.tl?.paused(!go);
    anim.current.hold?.paused(!go);
  }, []);

  const next = useCallback(() => setStage((i) => (i + 1 < STOPS.length ? i + 1 : 1)), []);

  // Start on first sight. Offscreen for a while, the scene is unmounted to free the GPU.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (prefersReducedMotion()) {
      setReduce(true);
      setStage(STOPS.length - 1);
      setStarted(true);
      return;
    }
    let idle: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        run.current.visible = e.isIntersecting;
        clearTimeout(idle);
        if (e.isIntersecting) {
          setStarted(true);
          setLive(true);
        } else idle = setTimeout(() => setLive(false), 6000);
        sync();
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearTimeout(idle);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [sync]);

  useIsoLayoutEffect(() => {
    if (!started || !live) return;
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (reduce) return;
        anim.current.hold = gsap.delayedCall(HOLD[stage], next);
        sync();
      },
    });
    plate.current?.play("introduction", stage, tl, reduce);
    anim.current.tl = tl;
    sync();
    return () => {
      anim.current.hold?.kill();
      tl.kill();
      anim.current = {};
    };
  }, [started, live, stage, reduce, next, sync]);

  useEffect(() => {
    run.current.playing = playing;
    sync();
  }, [playing, sync]);

  return (
    <figure ref={wrapRef} className="r3-cover-plate" data-intro>
      {/* Ruler ticks along the top and left edges, outside the frame. */}
      <svg
        className="r3-ruler r3-ruler-x"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 1000 10"
      >
        {Array.from({ length: TICKS + 1 }, (_, i) => {
          const x = (i / TICKS) * 1000;
          return <line key={x} x1={x} x2={x} y1={10} y2={i % 6 === 0 ? 0 : 5} data-tick />;
        })}
      </svg>
      <svg
        className="r3-ruler r3-ruler-y"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 10 1000"
      >
        {Array.from({ length: 31 }, (_, i) => {
          const y = (i / 30) * 1000;
          return <line key={y} y1={y} y2={y} x1={10} x2={i % 5 === 0 ? 0 : 5} data-tick />;
        })}
      </svg>
      <div className="r3-cover-frame">
        {/* Both rules of the double frame, in CSS pixels so DrawSVG measures true lengths. */}
        <svg className="r3-frame-lines" aria-hidden="true">
          <rect x="0.6" y="0.6" width="100%" height="100%" data-frame />
        </svg>
        <svg className="r3-frame-lines r3-frame-inner" aria-hidden="true">
          <rect x="0" y="0" width="100%" height="100%" data-frame />
        </svg>
        <div className="r3-cover-inner">
          <div
            className="r3-cover-stage"
            role="img"
            aria-label="Engraved frontispiece: a branching tree of Creation; an observer's iris opens partway along one branch; the shorthand R = C ⊛ O; many observers; the threshold and Omega, the whole."
          >
            {live && <Plate3D ref={plate} />}
          </div>
          <div className="r3-plate-furniture" aria-hidden="true">
            <span className="r3-pf-label" data-furn>
              Frontispiece
            </span>
            <svg className="r3-reg" viewBox="0 0 40 40" data-furn aria-hidden="true">
              <circle cx="20" cy="20" r="11" />
              <circle cx="20" cy="20" r="4.5" />
              <path d="M20 2v36M2 20h36" />
            </svg>
          </div>
          <figcaption className="r3-cover-cap">
            <span className="r3-cover-stop" data-furn>
              <span className="r3-cover-stop-n">
                {String(stage + 1).padStart(2, "0")}/{String(STOPS.length).padStart(2, "0")}
              </span>
              <span className="r3-cover-stop-t" key={stage}>
                {STOPS[stage]}
              </span>
            </span>
            {!reduce && (
              <span className="r3-cover-ctl" data-furn>
                <span className="r3-cover-dots" aria-hidden="true">
                  {STOPS.map((s, i) => (
                    <i
                      key={s}
                      data-on={i === stage || undefined}
                      data-past={i < stage || undefined}
                    />
                  ))}
                </span>
                <button type="button" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
                  {playing ? "Pause" : "Play"}
                </button>
              </span>
            )}
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
