"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, markRunning, SplitText, skipIntro } from "../../_shared/motion";
import { fontsReady } from "./fx";

const TICKS = Array.from({ length: 120 }, (_, i) => i);

export default function LogicHero({ sections }: { sections: number }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || skipIntro()) return;
    let cancelled = false;
    const ctx = gsap.context(() => {
      const title = el.querySelector<HTMLElement>(".n-lh1");
      const rest = el.querySelectorAll(".n-lhero-kicker, .n-lsub, .n-lhero-meta, .n-lhero-rule");
      gsap.set(title, { autoAlpha: 0 });
      gsap.set(rest, { autoAlpha: 0, y: 16 });
      markRunning();
      const t0 = performance.now();
      fontsReady().then(() => {
        if (cancelled || !title) return;
        ctx.add(() => {
          const split = SplitText.create(title, { type: "chars", mask: "chars", aria: "auto" });
          for (const m of split.masks) m.classList.add("n-mask");
          const tl = gsap.timeline({ delay: Math.max(0, 0.25 - (performance.now() - t0) / 1000) });
          tl.set(title, { autoAlpha: 1 });
          tl.from(split.chars, {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.06,
            onComplete: () => split.revert(),
          });
          tl.to(
            rest,
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
            0.35
          );
          tl.from(
            el.querySelector(".n-lhero-dial"),
            { rotation: -50, scale: 0.8, autoAlpha: 0, duration: 2.2, ease: "expo.out" },
            0
          );
        });
      });
    }, el);
    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <header ref={root} className="n-lhero n-wrap">
      <p className="n-lhero-kicker n-label" data-intro>
        <span aria-hidden="true">⊛</span> Holos
      </p>
      <h1 className="n-lh1" data-intro>
        Logic
      </h1>
      <p className="n-lsub" data-intro>
        Primitive Definitions, Axioms and Foundations
      </p>
      <div className="n-lhero-meta" data-intro>
        <span className="n-label">{sections} sections</span>
        <span className="n-label">Five axioms · Two additions to physics</span>
      </div>
      <span className="n-lhero-rule" data-intro aria-hidden="true" />
      <svg className="n-lhero-dial" viewBox="-500 -500 1000 1000" aria-hidden="true">
        <circle r={482} />
        <circle r={436} className="n-lhero-dial-i" />
        {TICKS.map((i) => {
          const a = (i / TICKS.length) * Math.PI * 2;
          const r1 = i % 15 === 0 ? 448 : 458;
          return (
            <line
              key={i}
              x1={Math.round(Math.cos(a) * r1 * 100) / 100}
              y1={Math.round(Math.sin(a) * r1 * 100) / 100}
              x2={Math.round(Math.cos(a) * 470 * 100) / 100}
              y2={Math.round(Math.sin(a) * 470 * 100) / 100}
              className={i === 60 ? "n-lhero-dial-mark" : undefined}
            />
          );
        })}
      </svg>
    </header>
  );
}
