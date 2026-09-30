"use client";

// Motion controller for the Logic page: the title rises, the axiom row deals in, and each
// section heading wipes in from the left (rule and all) as it arrives. The Logic text's own
// headings are never split: their footnote links are React's, so they move whole.

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

export default function LogicMotion() {
  useIsoLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".r3-logic");
    if (!root) return;
    const bar = document.querySelector<HTMLElement>(".r3-bar");
    let alive = true;
    const splits = new Set<SplitText>();
    const ctx = gsap.context(() => {}, root);

    if (!skipIntro()) {
      ctx.add(() => {
        const title = root.querySelector<HTMLElement>("[data-title]");
        const rise = gsap.utils.toArray<HTMLElement>("[data-rise]", root);
        const cards = gsap.utils.toArray<HTMLElement>("[data-axiom]", root);
        const index = root.querySelector<HTMLElement>("[data-index]");
        const rule = root.querySelector<HTMLElement>("[data-hero-rule]");
        gsap.set(title, { autoAlpha: 0 });
        gsap.set(rise, { autoAlpha: 0, y: 16 });
        gsap.set(cards, { autoAlpha: 0, y: 36 });
        gsap.set(index, { autoAlpha: 0 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });
        if (bar) gsap.set(bar, { autoAlpha: 0, y: -10 });
        markRunning();

        whenFonts().then(() => {
          if (!alive) return;
          ctx.add(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            let release = () => {};
            if (title) {
              const t = Split.create(title, { type: "chars", mask: "chars", aria: "auto" });
              release = tracked(splits, t);
              tl.set(title, { autoAlpha: 1 }, 0);
              tl.from(
                t.chars,
                { yPercent: 118, duration: 1.2, stagger: 0.07, ease: "expo.out" },
                0.05
              );
            }
            tl.to(rule, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.1);
            tl.to(rise, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.45);
            tl.to(cards, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07, ease: "expo.out" }, 0.6);
            tl.to(index, { autoAlpha: 1, duration: 0.8 }, 0.9);
            if (bar) tl.to(bar, { autoAlpha: 1, y: 0, duration: 0.8, clearProps: "all" }, 0.7);
            tl.eventCallback("onComplete", () => {
              release();
              gsap.set([title, ...rise, ...cards, index, rule], { clearProps: "all" });
            });
          });
        });
      });
    }

    if (!prefersReducedMotion()) {
      reveals(ctx, root, () => alive, splits);
      ctx.add(() => {
        const heads = gsap.utils.toArray<HTMLElement>(
          ".r3-logic-text > div > section > h2, .r3-logic-text > div > div[id] > h2",
          root
        );
        gsap.set(heads, { clipPath: "inset(0% 100% 0% 0%)" });
        batch(heads, (b) =>
          gsap.to(b, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(b, { clearProps: "clipPath" });
            },
          })
        );
      });
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      alive = false;
      window.removeEventListener("load", onLoad);
      splits.forEach((s) => {
        s.revert();
      });
      splits.clear();
      ctx.revert();
    };
  }, []);

  return null;
}
