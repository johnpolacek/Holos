"use client";

// The title set as an engraved plate: a double-rule frame with ruler ticks along its top and
// left edges and a registration mark, the lettering centered inside. The frame is drawn from
// the plate's measured size, so its rules stay hairline-true at any width.

import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, markRunning, SplitText, skipIntro } from "../../_shared/motion";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Size = { w: number; h: number };

function frame({ w, h }: Size) {
  const r = (n: number) => Math.round(n * 100) / 100;
  const inset = 6;
  const step = 20;
  let top = "";
  for (let x = inset + step, i = 1; x < w - inset - 40; x += step, i++) {
    top += `M${x} ${inset}V${inset + (i % 5 === 0 ? 9 : 4.5)}`;
  }
  let left = "";
  for (let y = inset + step, i = 1; y < h - inset - 20; y += step, i++) {
    left += `M${inset} ${y}H${inset + (i % 5 === 0 ? 9 : 4.5)}`;
  }
  return {
    outer: { x: 0.625, y: 0.625, width: r(w - 1.25), height: r(h - 1.25) },
    inner: { x: inset, y: inset, width: r(w - inset * 2), height: r(h - inset * 2) },
    top,
    left,
    mark: { x: r(w - inset - 30), y: inset + 30 },
  };
}

export default function TitlePlate({
  size,
  kicker,
  title,
  titleAfter,
  sub,
  footLeft,
  footCenter,
  footRight,
}: {
  size: "full" | "compact";
  kicker: ReactNode;
  title: string;
  titleAfter?: ReactNode;
  sub: ReactNode;
  footLeft?: ReactNode;
  footCenter?: ReactNode;
  footRight?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [box, setBox] = useState<Size | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      setBox((b) => (b && b.w === w && b.h === h ? b : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Intro: rules draw, ticks print along the edges, the lettering rises behind masks.
  const measured = box !== null;
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !measured) return;
    if (skipIntro()) {
      markRunning();
      return;
    }
    let cancelled = false;
    let split: SplitText | undefined;
    let subSplit: SplitText | undefined;
    const ctx = gsap.context(() => {});
    ctx.add(() => {
      const q = gsap.utils.selector(el);
      const titleEl = q(".r1-plate-title")[0] as HTMLElement;
      const subEl = q(".r1-plate-sub")[0] as HTMLElement;
      gsap.set([titleEl, subEl, q(".r1-plate-kicker"), q(".r1-plate-foot > *")], { autoAlpha: 0 });
      gsap.set(q(".r1-plate-rules"), { autoAlpha: 1 });
      gsap.set(q(".r1-f-outer, .r1-f-inner, .r1-f-ticks"), { drawSVG: "0%" });
      gsap.set(q(".r1-f-mark"), { autoAlpha: 0, rotation: -90, scale: 0.4, svgOrigin: "0 0" });
    });
    markRunning();

    const fonts = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]);
    fonts.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const q = gsap.utils.selector(el);
        const titleEl = q(".r1-plate-title")[0] as HTMLElement;
        const subEl = q(".r1-plate-sub")[0] as HTMLElement;
        split = SplitText.create(titleEl, { type: "chars", mask: "chars", aria: "auto" });
        subSplit = SplitText.create(subEl, { type: "lines", mask: "lines", aria: "auto" });
        // Room for descenders and italic overhang while the masks clip.
        for (const m of [...split.masks, ...subSplit.masks]) m.classList.add("r1-mask");
        const tl = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            split?.revert();
            subSplit?.revert();
          },
        });
        tl.to(q(".r1-f-outer"), { drawSVG: "100%", duration: 1.5, ease: "power2.inOut" }, 0)
          .to(q(".r1-f-inner"), { drawSVG: "100%", duration: 1.3, ease: "power2.inOut" }, 0.2)
          .to(q(".r1-f-ticks"), { drawSVG: "100%", duration: 1.2, ease: "power1.inOut" }, 0.55)
          .to(
            q(".r1-f-mark"),
            { autoAlpha: 1, rotation: 0, scale: 1, duration: 1.1, ease: "power3.out" },
            1.0
          )
          .set(titleEl, { autoAlpha: 1 }, 0.35)
          .from(
            split.chars,
            { yPercent: 130, duration: 1.1, ease: "power4.out", stagger: 0.07 },
            0.35
          )
          .set(subEl, { autoAlpha: 1 }, 0.85)
          .from(
            subSplit.lines,
            { yPercent: 130, duration: 0.9, ease: "power3.out", stagger: 0.1 },
            0.85
          )
          .to(q(".r1-plate-kicker"), { autoAlpha: 1, duration: 0.8, ease: "power1.out" }, 0.6)
          .fromTo(
            q(".r1-plate-foot > *"),
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08 },
            1.35
          );
      });
    });
    return () => {
      cancelled = true;
      split?.revert();
      subSplit?.revert();
      ctx.revert();
    };
  }, [measured]);

  const f = box ? frame(box) : null;

  return (
    <header ref={ref} className={`r1-plate r1-plate--${size}`} data-measured={f ? "" : undefined}>
      {/* A plain double frame until the plate is measured (and for readers without JavaScript). */}
      <span className="r1-plate-fallback" aria-hidden="true" data-intro />
      {f && (
        <svg
          className="r1-plate-rules"
          width={box?.w}
          height={box?.h}
          aria-hidden="true"
          data-intro
        >
          <rect className="r1-f-outer" {...f.outer} />
          <rect className="r1-f-inner" {...f.inner} />
          <path className="r1-f-ticks" d={f.top} />
          <path className="r1-f-ticks" d={f.left} />
          <g className="r1-f-mark" transform={`translate(${f.mark.x} ${f.mark.y})`}>
            <circle r={6} />
            <line x1={-10} y1={0} x2={10} y2={0} />
            <line x1={0} y1={-10} x2={0} y2={10} />
          </g>
        </svg>
      )}
      <div className="r1-plate-body">
        <p className="r1-plate-kicker" data-intro>
          {kicker}
        </p>
        <h1 className="r1-plate-h1">
          <span className="r1-plate-title" data-intro>
            {title}
          </span>
          {titleAfter}
          <span className="r1-plate-sub" data-intro>
            {sub}
          </span>
        </h1>
      </div>
      <div className="r1-plate-foot">
        <span data-intro>{footLeft}</span>
        <span data-intro>{footCenter}</span>
        <span data-intro>{footRight}</span>
      </div>
    </header>
  );
}
