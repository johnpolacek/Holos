"use client";

// Scroll choreography for a Monograph page. Section heads reveal once as they arrive: the
// numeral fades in, the title rises line by line behind masks, the double rule wipes across.
// Figures, tables, and boxes rise in batches. Body paragraphs never move. Navigation links
// get the underline sweep.

import { useEffect, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText } from "../../_shared/motion";
import { type Teardown, underlineSweep } from "./hover";
import { scrollToId } from "./scroll";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function PageMotion({
  heads,
  title,
  blocks,
}: {
  // Section heads; `title` selects the element inside each head that rises (":scope" for the head).
  heads: string;
  title: string;
  blocks: string;
}) {
  useIsoLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".r1");
    if (!root) return;
    const teardowns: Teardown[] = [];
    root
      .querySelectorAll<HTMLElement>(".r1-pages a, .r1-plate-foot a, .r1-colophon-links a")
      .forEach((a) => {
        teardowns.push(underlineSweep(a));
      });

    // In-page links travel instead of jumping.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.closest(".r1-rail, .r1-sheet")) return;
      const id = decodeURIComponent((a.getAttribute("href") ?? "").slice(1));
      if (id && scrollToId(id)) e.preventDefault();
    };
    root.addEventListener("click", onClick);

    // Layout moves as math typesets and figures mount; keep trigger positions true.
    let t = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    const body = document.querySelector(".r1-body");
    if (body) ro.observe(body);

    const splits = new Set<SplitText>();
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      for (const head of gsap.utils.toArray<HTMLElement>(heads)) {
        const titleEl = title === ":scope" ? head : head.querySelector<HTMLElement>(title);
        const num = head.querySelector(".r1-head-num");
        gsap.set(head, { "--rule": 0, "--num": 0 });
        if (num) gsap.set(num, { autoAlpha: 0, y: 6 });
        if (titleEl) gsap.set(titleEl, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: head,
          start: "top 88%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            if (num) tl.to(num, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
            tl.to(head, { "--num": 1, duration: 0.7, ease: "power1.out" }, 0);
            if (titleEl) {
              const split = SplitText.create(titleEl, {
                type: "lines",
                mask: "lines",
                aria: "auto",
              });
              splits.add(split);
              split.masks.forEach((m) => {
                m.classList.add("r1-mask");
              });
              tl.set(titleEl, { autoAlpha: 1 }, 0.05).from(
                split.lines,
                { yPercent: 130, duration: 1, ease: "power4.out", stagger: 0.09 },
                0.05
              );
              tl.eventCallback("onComplete", () => {
                split.revert();
                splits.delete(split);
              });
            }
            tl.to(head, { "--rule": 1, duration: 1.2, ease: "power3.inOut" }, 0.25);
          },
        });
      }

      // After animaxxing's revealOnScroll: opacity only, so waiting items stay reachable.
      const items = gsap.utils.toArray<HTMLElement>(blocks);
      gsap.set(items, { opacity: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
            onComplete: () => {
              gsap.set(batch, { clearProps: "transform,opacity" });
            },
          }),
      });
      const onFocus = (e: FocusEvent) => {
        const item = e.currentTarget as HTMLElement;
        gsap.killTweensOf(item, "opacity,y");
        gsap.set(item, { clearProps: "transform,opacity" });
      };
      for (const item of items) item.addEventListener("focusin", onFocus);
      return () => {
        for (const item of items) item.removeEventListener("focusin", onFocus);
      };
    }, root);

    return () => {
      root.removeEventListener("click", onClick);
      window.clearTimeout(t);
      ro.disconnect();
      splits.forEach((s) => {
        s.revert();
      });
      ctx.revert();
      for (const off of teardowns) off();
    };
  }, [heads, title, blocks]);

  return null;
}
