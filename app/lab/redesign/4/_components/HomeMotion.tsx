"use client";

// Motion for the Ledger Overview. One controller owns the page:
// intro   poster letters zip in from both sides while the width axis opens from condensed
//         to expanded; rule, subtitle lines, equation, and the drawn ⊛ follow.
// scroll  the thesis fills word by word (one scrub); the ledger pins and runs sideways on
//         desktop; contents rows rise in and count their minutes; each chapter's rule wipes
//         across, its number rolls up, its title lines rise.
// hover   rows fill with the signal color; the onward link does the same.
// Reading text never moves. Reduced motion leaves everything settled.

import { useEffect, useLayoutEffect } from "react";
import {
  gsap,
  markRunning,
  prefersReducedMotion,
  ScrollTrigger,
  SplitText,
  skipIntro,
} from "../../_shared/motion";
import { countUp } from "./count";
import { fillHover, fontsReady } from "./hover";
import { sidesIn } from "./poster";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function HomeMotion() {
  useIsoLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".r4-home");
    if (!root) return;
    const $ = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) =>
      Array.from(root.querySelectorAll<T>(s));
    const reduced = prefersReducedMotion();
    const skip = skipIntro();
    const ctx = gsap.context(() => {}, root);
    const teardowns: (() => void)[] = [];
    let dead = false;

    // Start values for the intro, before first paint.
    const holos = $(".r4-holos");
    const introTargets = $$("[data-intro]");
    if (!skip) {
      ctx.add(() => gsap.set(introTargets, { autoAlpha: 0 }));
      markRunning();
    }

    // Start values for scroll reveals below the fold (skipped under reduced motion).
    const chapters = $$(".r4-ch");
    if (!reduced) {
      ctx.add(() => {
        gsap.set(".r4-ch-rule", { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(".r4-ch-num > span", { yPercent: 105 });
        gsap.set([".r4-ch-meta", ".r4-card", ".r4-ch-fig"], { autoAlpha: 0, y: 24 });
        gsap.set(".r4-index > li", { autoAlpha: 0, y: 28 });
      });
    }

    fontsReady().then(() => {
      if (dead) return;
      ctx.add(() => {
        // Intro.
        if (!skip && holos) {
          const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
          tl.set(introTargets, { autoAlpha: 1 });
          tl.from(
            ".r4-poster-grid span",
            {
              scaleY: 0,
              duration: 1.4,
              ease: "expo.inOut",
              stagger: { each: 0.04, from: "start" },
            },
            0
          );
          tl.add(sidesIn(holos), 0.1);
          tl.from(
            ".r4-poster-meta > span",
            { yPercent: 120, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 },
            0.25
          );
          tl.from(
            ".r4-poster-q span",
            { y: 28, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.09 },
            0.35
          );
          tl.from(
            ".r4-poster-toc li",
            { x: 16, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.04 },
            0.5
          );
          tl.from(
            ".r4-poster-rule",
            { scaleX: 0, transformOrigin: "0% 50%", duration: 1.1, ease: "power3.inOut" },
            0.45
          );
          const sub = SplitText.create(".r4-poster-sub", {
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
            ".r4-poster-eq > span",
            { yPercent: 60, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 },
            0.9
          );
          tl.from(
            ".r4-eq-glyph > *",
            { drawSVG: "0%", duration: 0.9, ease: "power2.inOut", stagger: 0.1 },
            1.05
          );
          tl.fromTo(
            ".r4-poster-cue",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            1.3
          );
          tl.from(
            ".r4-cue-line",
            { scaleY: 0, transformOrigin: "50% 0%", duration: 0.8, ease: "power3.inOut" },
            1.45
          );
        }

        // Hover fills (instant under reduced motion).
        for (const row of $$(".r4-row, .r4-onward-link")) teardowns.push(fillHover(row));

        if (reduced) return;

        // The thesis fills in as it is read: the page's one scrubbed statement.
        const statement = $(".r4-statement p");
        if (statement) {
          const words = SplitText.create(statement, { type: "words", aria: "auto" });
          gsap.fromTo(
            words.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: {
                trigger: statement,
                start: "top 78%",
                end: "bottom 42%",
                scrub: 0.6,
              },
            }
          );
        }

        // The ledger: pinned and run sideways on wide screens; a stacked list elsewhere.
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1000px) and (min-height: 620px)", () => {
          const section = $(".r4-ledger");
          const viewport = $("[data-run]");
          const track = $(".r4-ledger-track");
          const fill = $("[data-run-fill]");
          if (!section || !viewport || !track) return;
          section.classList.add("is-run");
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const run = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => fill && gsap.set(fill, { scaleX: self.progress }),
            },
          });
          // Each tier's firmness rule draws as it comes into the run.
          for (const tier of $$(".r4-tier")) {
            gsap.from(tier.querySelector(".r4-tier-rule"), {
              scaleX: 0,
              transformOrigin: "0% 50%",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: tier,
                containerAnimation: run,
                start: "left 88%",
                toggleActions: "play none none reverse",
              },
            });
          }
          // Keyboard focus inside the run scrolls the page to that tier.
          const onFocus = (e: FocusEvent) => {
            const st = run.scrollTrigger;
            const item = (e.target as HTMLElement).closest<HTMLElement>(
              ".r4-tier, .r4-ledger-head"
            );
            const travel = distance();
            viewport.scrollLeft = 0;
            if (!st || !travel || !item || !(e.target as HTMLElement).matches(":focus-visible"))
              return;
            const left = item.offsetLeft;
            const x = gsap.utils.clamp(
              0,
              travel,
              left - (viewport.clientWidth - item.offsetWidth) / 2
            );
            st.scroll(st.start + (x / travel) * (st.end - st.start));
          };
          section.addEventListener("focusin", onFocus);
          return () => {
            section.removeEventListener("focusin", onFocus);
            section.classList.remove("is-run");
          };
        });
        mm.add("(max-width: 999px), (max-height: 619px)", () => {
          for (const tier of $$(".r4-tier")) {
            gsap.from(tier.querySelector(".r4-tier-rule"), {
              scaleX: 0,
              transformOrigin: "0% 50%",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: tier, start: "top 85%", once: true },
            });
          }
        });
        teardowns.push(() => mm.revert());

        // Contents rows rise in; their minutes count up.
        ScrollTrigger.batch(".r4-index > li", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.07,
            });
            for (const li of batch) {
              const n = li.querySelector<HTMLElement>("[data-count]");
              if (n) teardowns.push(countUp(n, { duration: 1.2 }));
            }
          },
        });
        const total = $(".r4-contents-head [data-count]");
        if (total) {
          ScrollTrigger.create({
            trigger: total,
            start: "top 90%",
            once: true,
            onEnter: () => teardowns.push(countUp(total, { duration: 1.4 })),
          });
        }

        // Chapters: rule, number, meta, title lines, then the card and the figure.
        for (const ch of chapters) {
          const h2 = ch.querySelector<HTMLElement>(".r4-ch-head h2");
          const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power4.out" },
          });
          tl.to(
            ch.querySelector(".r4-ch-rule"),
            { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
            0
          );
          tl.to(ch.querySelector(".r4-ch-num > span"), { yPercent: 0, duration: 1.1 }, 0.15);
          tl.to(
            ch.querySelector(".r4-ch-meta"),
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
            0.2
          );
          if (h2) {
            const lines = SplitText.create(h2, { type: "lines", mask: "lines", aria: "auto" });
            tl.from(
              lines.lines,
              { yPercent: 110, duration: 1, stagger: 0.09, onComplete: () => lines.revert() },
              0.25
            );
          }
          const card = ch.querySelector(".r4-card");
          tl.to(card, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.5);
          ScrollTrigger.create({
            trigger: ch,
            start: "top 82%",
            once: true,
            onEnter: () => {
              tl.play();
              for (const n of Array.from(ch.querySelectorAll<HTMLElement>(".r4-card [data-count]")))
                teardowns.push(countUp(n, { duration: 1.2, delay: 0.5 }));
            },
          });
          const fig = ch.querySelector(".r4-ch-fig");
          if (fig)
            gsap.to(fig, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: fig, start: "top 88%", once: true },
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
