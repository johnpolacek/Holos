"use client";

// Scroll choreography for a Nocturne page: titles open line by line, blocks and figures rise
// in, the one display statement fills as it is read, and each section's rail fills with the
// reader's progress through it. Reading paragraphs never move.

import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../_shared/motion";
import { linesOnScroll, revealOnScroll, scrubStatement } from "./fx";

export default function PageMotion() {
  useLayoutEffect(() => {
    const main = document.querySelector<HTMLElement>(".r2 main");
    if (!main) return;
    const ctx = gsap.context(() => {
      for (const el of Array.from(main.querySelectorAll<HTMLElement>("[data-split]"))) {
        linesOnScroll(el, { ellipse: el.dataset.split === "ellipse" });
      }
      revealOnScroll(Array.from(main.querySelectorAll<HTMLElement>("[data-reveal]")));
      for (const el of Array.from(main.querySelectorAll<HTMLElement>("[data-scrub]")))
        scrubStatement(el);

      // Logic: section titles and the axiom and proposition panels rise in.
      const lbody = main.querySelector(".n-lbody");
      if (lbody) {
        revealOnScroll(
          Array.from(
            lbody.querySelectorAll<HTMLElement>(
              ":scope > div > section > h2, :scope > div > div[id] > h2, #logic-axioms div:has(> h3:first-child), #foundational-propositions div:has(> h3:first-child)"
            )
          ),
          { y: 24 }
        );
      }

      for (const sec of Array.from(main.querySelectorAll<HTMLElement>("[data-sec]"))) {
        const fill = sec.querySelector(".n-rail-fill");
        ScrollTrigger.create({
          trigger: sec,
          start: "top 45%",
          end: "bottom 45%",
          toggleClass: { targets: sec, className: "is-active" },
        });
        if (fill)
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "50% 0%",
              scrollTrigger: { trigger: sec, start: "top 45%", end: "bottom 45%", scrub: true },
            }
          );
      }

      // Figure corner marks close in on the plate as it arrives.
      if (!prefersReducedMotion()) {
        for (const fig of Array.from(main.querySelectorAll<HTMLElement>(".n-fig"))) {
          const corners = fig.querySelectorAll(".n-corner");
          gsap.from(corners, {
            scale: 2.4,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: { trigger: fig, start: "top 80%", once: true },
          });
        }
      }
    }, main);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);
  return null;
}
