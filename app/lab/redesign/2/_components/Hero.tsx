"use client";

// The front of the Overview: the title revealed through an opening aperture, over a faint
// drifting starfield and a slowly turning dial. A soft glow follows the mouse: the lit region.
// Ambient motion pauses offscreen, in a hidden tab, and on request; reduced motion is still.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  gsap,
  markRunning,
  prefersReducedMotion,
  SplitText,
  skipIntro,
} from "../../_shared/motion";
import { fontsReady } from "./fx";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  a: number;
  tw: number;
  ph: number;
  warm: boolean;
};

function makeStars(w: number, h: number): Star[] {
  const n = Math.min(460, Math.round((w * h) / 4200));
  return Array.from({ length: n }, (_, i) => {
    const z = 0.25 + Math.random() * 0.75;
    return {
      x: Math.random(),
      y: Math.random(),
      z,
      r: (0.35 + Math.random() * 0.95) * z,
      a: 0.25 + Math.random() * 0.6,
      tw: 0.4 + Math.random() * 1.6,
      ph: Math.random() * Math.PI * 2,
      warm: i % 19 === 0,
    };
  });
}

const TICKS = Array.from({ length: 180 }, (_, i) => i);

export default function Hero({ minutes, count }: { minutes: number; count: number }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const dial = useRef<SVGSVGElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const state = useRef({ paused: false, visible: true, spin: null as gsap.core.Tween | null });

  // Intro: the aperture opens, the name comes into focus, the subtitle rises line by line.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    setReduced(prefersReducedMotion());
    if (skipIntro()) return;
    let cancelled = false;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      const stage = el.querySelector(".n-hero-stage");
      const word = el.querySelector<HTMLElement>(".n-h1-word");
      const sub = el.querySelector<HTMLElement>(".n-h1-sub");
      const meta = el.querySelectorAll(".n-hero-foot > *");
      gsap.set(stage, { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(dial.current, { scale: 0.55, rotation: -40, autoAlpha: 0 });
      gsap.set([word, sub], { autoAlpha: 0 });
      gsap.set(meta, { autoAlpha: 0, y: 14 });
      markRunning();

      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      tl.to(stage, {
        clipPath: "circle(75% at 50% 50%)",
        duration: 1.9,
        ease: "power3.inOut",
        clearProps: "clipPath",
      });
      tl.to(
        dial.current,
        { scale: 1, rotation: 0, autoAlpha: 1, duration: 2.1, ease: "expo.out" },
        0.15
      );

      const t0 = performance.now();
      fontsReady().then(() => {
        if (cancelled || !word || !sub) return;
        ctx.add(() => {
          // Text runs on its own timeline so a late font never makes it jump.
          const elapsed = (performance.now() - t0) / 1000;
          split = SplitText.create(word, { type: "chars", aria: "auto" });
          const lines = SplitText.create(sub, { type: "lines", mask: "lines", aria: "auto" });
          const tt = gsap.timeline({ delay: Math.max(0, 0.55 - elapsed) });
          tt.set([word, sub], { autoAlpha: 1 });
          tt.from(split.chars, {
            autoAlpha: 0,
            yPercent: 18,
            filter: "blur(18px)",
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.07,
            onComplete: () => split?.revert(),
          });
          tt.from(
            lines.lines,
            {
              yPercent: 110,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.1,
              onComplete: () => lines.revert(),
            },
            0.5
          );
          tt.to(
            meta,
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
            0.85
          );
        });
      });
    }, el);
    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  // Starfield and dial: one loop on the GSAP ticker, paused offscreen or on request.
  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const g = cv.getContext("2d");
    if (!g) return;
    const still = prefersReducedMotion();
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let t = 0;

    const draw = () => {
      g.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = still ? 1 : 0.65 + 0.35 * Math.sin(t * s.tw + s.ph);
        g.globalAlpha = s.a * tw;
        g.fillStyle = s.warm ? "#ffcf8f" : "#ece8e1";
        g.beginPath();
        g.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        g.fill();
      }
      g.globalAlpha = 1;
    };
    const size = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(w, h);
      draw();
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    if (still) return () => ro.disconnect();

    const tick = (_time: number, dt: number) => {
      const s = state.current;
      if (s.paused || !s.visible || document.hidden) return;
      t += dt / 1000;
      for (const st of stars) {
        st.y -= (dt / 1000) * 0.006 * st.z;
        st.x -= (dt / 1000) * 0.0025 * st.z;
        if (st.y < -0.01) st.y += 1.02;
        if (st.x < -0.01) st.x += 1.02;
      }
      draw();
    };
    gsap.ticker.add(tick);
    state.current.spin = gsap.to(dial.current, {
      rotation: "+=360",
      duration: 360,
      ease: "none",
      repeat: -1,
    });
    const io = new IntersectionObserver(([e]) => {
      state.current.visible = e.isIntersecting;
      state.current.spin?.paused(!e.isIntersecting || state.current.paused);
    });
    io.observe(el);
    return () => {
      gsap.ticker.remove(tick);
      state.current.spin?.kill();
      state.current.spin = null;
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    state.current.paused = paused;
    state.current.spin?.paused(paused || !state.current.visible);
  }, [paused]);

  // The lit region: a soft glow under the mouse, hero only, fine pointers only.
  useEffect(() => {
    const el = root.current;
    const gl = glow.current;
    if (!el || !gl) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const xTo = gsap.quickTo(gl, "x", { duration: 1.1, ease: "power3.out" });
    const yTo = gsap.quickTo(gl, "y", { duration: 1.1, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      gsap.to(gl, { autoAlpha: 1, duration: 0.6, overwrite: "auto" });
    };
    const onLeave = () => gsap.to(gl, { autoAlpha: 0, duration: 0.8, overwrite: "auto" });
    gsap.set(gl, { x: el.clientWidth / 2, y: el.clientHeight / 2, autoAlpha: 0 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(gl);
    };
  }, []);

  return (
    <section ref={root} className="n-hero" aria-labelledby="n-title">
      <div className="n-hero-stage" data-intro>
        <canvas ref={canvas} className="n-stars" />
        <div className="n-hero-halo" aria-hidden="true" />
        <div ref={glow} className="n-glow" aria-hidden="true" />
        <svg ref={dial} className="n-dial" viewBox="-500 -500 1000 1000" aria-hidden="true">
          <circle r={482} className="n-dial-o" />
          <circle r={436} className="n-dial-i" />
          {TICKS.map((i) => {
            const a = (i / TICKS.length) * Math.PI * 2;
            const long = i % 15 === 0;
            const r1 = long ? 448 : 456;
            const r2 = 470;
            return (
              <line
                key={i}
                x1={Math.round(Math.cos(a) * r1 * 100) / 100}
                y1={Math.round(Math.sin(a) * r1 * 100) / 100}
                x2={Math.round(Math.cos(a) * r2 * 100) / 100}
                y2={Math.round(Math.sin(a) * r2 * 100) / 100}
                className={i === 135 ? "n-dial-mark" : long ? "n-dial-long" : undefined}
              />
            );
          })}
        </svg>
        <div className="n-hero-center">
          <h1 id="n-title" className="n-h1">
            <span className="n-h1-word" data-intro>
              Holos
            </span>
            <span className="n-sr">: </span>
            <span className="n-h1-sub" data-intro>
              An Interpretive Framework for Understanding Reality, Bounded by Physics
            </span>
          </h1>
        </div>
      </div>
      <div className="n-hero-foot">
        <p className="n-hero-eq" data-intro>
          R = C <span>⊛</span> O
        </p>
        <a className="n-cue" href="#introduction" data-intro>
          <span className="n-label">Begin reading</span>
          <span className="n-cue-line" aria-hidden="true" />
        </a>
        <div className="n-hero-right" data-intro>
          <span className="n-label">
            {count} sections · {minutes} min
          </span>
          {!reduced && (
            <button
              type="button"
              className="n-pause"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? "Play motion" : "Pause motion"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
