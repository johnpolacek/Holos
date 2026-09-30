"use client";

// A running band of chapter titles (animaxxing `marquee`): clones fill the band and are
// hidden from assistive technology; it slows under the mouse, stops offscreen and on focus,
// and has a visible pause control. Reduced motion shows the static row.

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../_shared/motion";

export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const box = useRef<HTMLElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const control = useRef<{ pause: () => void; play: () => void } | null>(null);
  const [paused, setPaused] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const container = box.current;
    const list = row.current;
    const strip = band.current;
    if (!container || !list || !strip || prefersReducedMotion()) return;
    setMoving(true);
    let loop: gsap.core.Tween | undefined;
    let slow: gsap.core.Tween | undefined;
    let userPaused = false;
    let visible = true;
    let focused = false;
    const sync = () => {
      if (!loop) return;
      if (userPaused || !visible || focused) loop.pause();
      else loop.play();
    };
    const build = () => {
      loop?.kill();
      for (const c of Array.from(strip.querySelectorAll("[data-clone]"))) c.remove();
      gsap.set(strip, { x: 0 });
      const width = list.offsetWidth;
      if (!width) return;
      const copies = Math.ceil(container.clientWidth / width) + 1;
      for (let i = 0; i < copies; i++) {
        const clone = list.cloneNode(true) as HTMLElement;
        clone.dataset.clone = "";
        clone.setAttribute("aria-hidden", "true");
        clone.inert = true;
        strip.append(clone);
      }
      loop = gsap.fromTo(
        strip,
        { x: 0 },
        { x: -width, duration: width / 70, ease: "none", repeat: -1 }
      );
      sync();
    };
    build();
    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    });
    ro.observe(container);
    const io = new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? true;
      sync();
    });
    io.observe(container);
    const ease = (scale: number) => {
      slow?.kill();
      if (loop) slow = gsap.to(loop, { timeScale: scale, duration: 0.5, ease: "power2.out" });
    };
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && ease(0.2);
    const leave = () => ease(1);
    const focusIn = () => {
      focused = true;
      sync();
    };
    const focusOut = (e: FocusEvent) => {
      focused = container.contains(e.relatedTarget as Node | null);
      sync();
    };
    container.addEventListener("pointerenter", enter);
    container.addEventListener("pointerleave", leave);
    container.addEventListener("focusin", focusIn);
    container.addEventListener("focusout", focusOut);
    control.current = {
      pause: () => {
        userPaused = true;
        sync();
      },
      play: () => {
        userPaused = false;
        sync();
      },
    };
    return () => {
      control.current = null;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      slow?.kill();
      loop?.kill();
      container.removeEventListener("pointerenter", enter);
      container.removeEventListener("pointerleave", leave);
      container.removeEventListener("focusin", focusIn);
      container.removeEventListener("focusout", focusOut);
      for (const c of Array.from(strip.querySelectorAll("[data-clone]"))) c.remove();
      gsap.set(strip, { clearProps: "transform" });
    };
  }, []);

  return (
    <div className="r4-marquee" data-moving={moving ? "" : undefined}>
      <section ref={box} className="r4-marquee-box" aria-label={label}>
        <div ref={band} className="r4-marquee-strip">
          <ul ref={row} className="r4-marquee-row">
            {items.map((t) => (
              <li key={t}>
                <span>{t}</span>
                <span className="r4-marquee-dot" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {moving && (
        <button
          type="button"
          className="r4-marquee-toggle"
          aria-pressed={paused}
          aria-label="Pause the chapter titles"
          title={paused ? "Play" : "Pause"}
          onClick={() => {
            const next = !paused;
            setPaused(next);
            if (next) control.current?.pause();
            else control.current?.play();
          }}
        >
          <svg viewBox="0 0 12 12" aria-hidden="true">
            {paused ? (
              <path d="M2 1l9 5-9 5z" />
            ) : (
              <>
                <rect x="2" y="1" width="3" height="10" />
                <rect x="7" y="1" width="3" height="10" />
              </>
            )}
          </svg>
        </button>
      )}
    </div>
  );
}
