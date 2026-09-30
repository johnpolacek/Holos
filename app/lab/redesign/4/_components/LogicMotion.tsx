"use client";

// Motion for the Ledger Logic page: the title zips in from both sides as its width axis
// opens; each specification section's top rule wipes across and its heading lines rise as it
// arrives. Reading text never moves. Reduced motion leaves everything settled.

import { useEffect, useLayoutEffect } from "react";
import {
  gsap,
  markRunning,
  prefersReducedMotion,
  ScrollTrigger,
  SplitText,
  skipIntro,
} from "../../_shared/motion";
import { fillHover, fontsReady } from "./hover";
import { sidesIn } from "./poster";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function LogicMotion() {
  useIsoLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".r4-logic-page");
    if (!root) return;
    const reduced = prefersReducedMotion();
    const skip = skipIntro();
    const ctx = gsap.context(() => {}, root);
    const teardowns: (() => void)[] = [];
    let dead = false;
    const intro = Array.from(root.querySelectorAll<HTMLElement>("[data-intro]"));
    const blocks = Array.from(root.querySelectorAll<HTMLElement>(".r4-logic > div > [id]"));
    // Blocks already above the fold on load (a deep link) stay settled.
    const below = blocks.filter((b) => b.getBoundingClientRect().top > window.innerHeight * 0.9);

    if (!skip) {
      ctx.add(() => gsap.set(intro, { autoAlpha: 0 }));
      markRunning();
    }
    if (!reduced) ctx.add(() => gsap.set(below, { "--rule-in": 0 }));

    fontsReady().then(() => {
      if (dead) return;
      ctx.add(() => {
        const title = root.querySelector<HTMLElement>(".r4-lhead-title");
        if (!skip && title) {
          const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
          tl.set(intro, { autoAlpha: 1 });
          tl.add(sidesIn(title), 0);
          tl.from(
            ".r4-lhead .r4-poster-meta > span",
            { yPercent: 120, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 },
            0.25
          );
          tl.from(
            ".r4-lhead-rule",
            { scaleX: 0, transformOrigin: "0% 50%", duration: 1.1, ease: "power3.inOut" },
            0.45
          );
          const sub = SplitText.create(".r4-lhead-sub", {
            type: "lines",
            mask: "lines",
            aria: "auto",
          });
          tl.from(
            sub.lines,
            {
              yPercent: 110,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.08,
              onComplete: () => sub.revert(),
            },
            0.75
          );
          tl.from(
            ".r4-lindex li",
            { autoAlpha: 0, x: -16, duration: 0.5, ease: "power3.out", stagger: 0.035 },
            0.9
          );
        }

        for (const row of Array.from(root.querySelectorAll<HTMLElement>(".r4-onward-link")))
          teardowns.push(fillHover(row));
        if (reduced) return;

        for (const block of below) {
          const h2 = block.querySelector<HTMLElement>(":scope > h2");
          const tl = gsap.timeline({ paused: true });
          tl.to(block, { "--rule-in": 1, duration: 1.1, ease: "power3.inOut" }, 0);
          if (h2) {
            const lines = SplitText.create(h2, { type: "lines", mask: "lines", aria: "auto" });
            tl.from(
              lines.lines,
              {
                yPercent: 110,
                duration: 1,
                ease: "power4.out",
                stagger: 0.09,
                onComplete: () => lines.revert(),
              },
              0.15
            );
          }
          ScrollTrigger.create({
            trigger: block,
            start: "top 85%",
            once: true,
            onEnter: () => tl.play(),
          });
        }
        ScrollTrigger.refresh();
      });
    });

    return () => {
      dead = true;
      for (const t of teardowns.splice(0).reverse()) {
        try {
          t();
        } catch {}
      }
      ctx.revert();
    };
  }, []);

  return null;
}
