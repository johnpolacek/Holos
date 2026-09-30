"use client";

// Motion controller for the Atlas front page. Owns the cover intro (gated before paint by
// MotionBoot) and the scroll reveals below it. Reading text never moves with scroll: only
// headings, rules, rows, cards, figures, and the part numerals do.

import { useEffect, useLayoutEffect } from "react";
import {
  gsap,
  markRunning,
  prefersReducedMotion,
  ScrollTrigger,
  SplitText as Split,
  type SplitText,
  skipIntro,
} from "../../_shared/motion";
import { batch, reveals, tracked, whenFonts } from "./motionKit";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function HomeMotion() {
  useIsoLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".r3-home");
    if (!root) return;
    const bar = document.querySelector<HTMLElement>(".r3-bar");
    let alive = true;
    const isAlive = () => alive;
    const splits = new Set<SplitText>();
    const ctx = gsap.context(() => {}, root);
    const listeners: (() => void)[] = [];

    // ---------- Cover intro ----------
    if (!skipIntro()) {
      ctx.add(() => {
        const title = root.querySelector<HTMLElement>("[data-title]");
        const sub = root.querySelector<HTMLElement>("[data-sub]");
        const rise = gsap.utils.toArray<HTMLElement>("[data-rise]", root);
        const frame = gsap.utils.toArray<SVGElement>("[data-frame]", root);
        const ticks = gsap.utils.toArray<SVGElement>("[data-tick]", root);
        const furn = root.querySelectorAll("[data-furn]");
        // Start values, set before the gate lifts.
        gsap.set([title, sub], { autoAlpha: 0 });
        gsap.set(rise, { autoAlpha: 0, y: 18 });
        if (bar) gsap.set(bar, { autoAlpha: 0, y: -10 });
        gsap.set([frame, ticks], { drawSVG: "0%" });
        gsap.set(furn, { autoAlpha: 0 });
        markRunning();

        whenFonts().then(() => {
          if (!alive) return;
          ctx.add(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(frame, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" }, 0);
            tl.to(
              ticks,
              { drawSVG: "100%", duration: 0.5, stagger: 0.012, ease: "power1.out" },
              0.25
            );
            tl.to(furn, { autoAlpha: 1, duration: 0.8, stagger: 0.1 }, 1.1);
            const done: (() => void)[] = [];
            if (title) {
              const t = Split.create(title, { type: "chars", mask: "chars", aria: "auto" });
              done.push(tracked(splits, t));
              tl.set(title, { autoAlpha: 1 }, 0.2);
              tl.from(
                t.chars,
                { yPercent: 118, duration: 1.3, stagger: 0.07, ease: "expo.out" },
                0.2
              );
            }
            if (sub) {
              const s = Split.create(sub, { type: "lines", mask: "lines", aria: "auto" });
              done.push(tracked(splits, s));
              tl.set(sub, { autoAlpha: 1 }, 0.55);
              tl.from(
                s.lines,
                { yPercent: 105, duration: 1, stagger: 0.09, ease: "expo.out" },
                0.55
              );
            }
            tl.to(rise, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.85);
            if (bar) tl.to(bar, { autoAlpha: 1, y: 0, duration: 0.8, clearProps: "all" }, 1);
            tl.eventCallback("onComplete", () => {
              for (const release of done) release();
              gsap.set([title, sub, ...rise, ...frame, ...ticks], { clearProps: "all" });
            });
          });
        });
      });
    }

    // ---------- Scroll reveals ----------
    if (!prefersReducedMotion()) {
      reveals(ctx, root, isAlive, splits);

      ctx.add(() => {
        // Table rows wipe in from the left, rule and all.
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]", root);
        gsap.set(rows, { clipPath: "inset(0% 100% 0% 0%)" });
        batch(rows, (b) =>
          gsap.to(b, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(b, { clearProps: "clipPath" });
            },
          })
        );

        // Route lines draw once their card arrives; minutes count up; hover retraces.
        for (const card of gsap.utils.toArray<HTMLElement>(".r3-route", root)) {
          const path = card.querySelector("[data-route-path]");
          const stops = card.querySelectorAll("[data-route-stop]");
          const count = card.querySelector<HTMLElement>("[data-count]");
          const n = Number(count?.dataset.count ?? 0);
          gsap.set(path, { drawSVG: "0%" });
          gsap.set(stops, { scale: 0, transformOrigin: "50% 50%" });
          // A paused timeline played by a standalone trigger: a lazily initialized `once`
          // trigger can remove itself while a later trigger is refreshing the list.
          const tl = gsap.timeline({ paused: true });
          ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            once: true,
            onEnter: () => {
              tl.play();
            },
          });
          tl.to(path, { drawSVG: "100%", duration: 1.3, ease: "power2.inOut" }, 0.25);
          tl.to(stops, { scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(3)" }, 0.35);
          if (count && n) {
            const v = { n: 0 };
            tl.to(
              v,
              {
                n,
                duration: 1.3,
                ease: "power3.out",
                onUpdate: () => {
                  count.textContent = String(Math.round(v.n));
                },
              },
              0.25
            );
          }
          const retrace = () => {
            if (tl.progress() < 1) return;
            gsap.fromTo(
              path,
              { drawSVG: "0% 0%" },
              { drawSVG: "0% 100%", duration: 0.75, ease: "power2.inOut", overwrite: true }
            );
          };
          card.addEventListener("mouseenter", retrace);
          card.addEventListener("focus", retrace);
          listeners.push(() => {
            card.removeEventListener("mouseenter", retrace);
            card.removeEventListener("focus", retrace);
          });
        }

        // Part numerals drift against the scroll: the one scrubbed layer in view.
        for (const num of gsap.utils.toArray<HTMLElement>("[data-drift]", root)) {
          gsap.fromTo(
            num,
            { yPercent: 14 },
            {
              yPercent: -14,
              ease: "none",
              scrollTrigger: {
                trigger: num.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Legend rows arrive one after another.
        const legendRows = gsap.utils.toArray<HTMLElement>("[data-legend] li", root);
        gsap.set(legendRows, { opacity: 0, y: 16 });
        batch(legendRows, (b) =>
          gsap.to(b, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            clearProps: "opacity,transform",
          })
        );
      });
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      alive = false;
      window.removeEventListener("load", onLoad);
      for (const off of listeners) off();
      splits.forEach((s) => {
        s.revert();
      });
      splits.clear();
      ctx.revert();
    };
  }, []);

  return null;
}
