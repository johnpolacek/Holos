// Small motion kit shared by the Atlas pages: bounded font readiness, batched reveals,
// and the line-mask heading reveal. Every builder runs inside the caller's gsap.context.

import { gsap, ScrollTrigger, SplitText } from "../../_shared/motion";

export function whenFonts(ms = 900): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return Promise.resolve();
  return Promise.race([
    document.fonts.ready.then(() => undefined),
    new Promise<void>((r) => setTimeout(r, ms)),
  ]);
}

export function batch(items: Element[], onEnter: (batch: Element[]) => void, start = "top 90%") {
  if (items.length) ScrollTrigger.batch(items, { start, once: true, onEnter });
}

// A SplitText that is reverted exactly once, whether it finishes or the page leaves first.
export function tracked(splits: Set<SplitText>, s: SplitText) {
  splits.add(s);
  return () => {
    if (!splits.delete(s)) return;
    s.revert();
  };
}

// [data-reveal] blocks rise, [data-rule] hairlines draw across, [data-lines] headings rise
// line by line behind masks. Each once, as it enters.
export function reveals(
  ctx: gsap.Context,
  root: HTMLElement,
  alive: () => boolean,
  splits: Set<SplitText>
) {
  ctx.add(() => {
    const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
    gsap.set(blocks, { opacity: 0, y: 22 });
    batch(blocks, (b) =>
      gsap.to(b, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "opacity,transform",
      })
    );

    const rules = gsap.utils.toArray<HTMLElement>("[data-rule]", root);
    gsap.set(rules, { scaleX: 0, transformOrigin: "0% 50%" });
    batch(
      rules,
      (b) => gsap.to(b, { scaleX: 1, duration: 1.4, stagger: 0.1, ease: "expo.inOut" }),
      "top 95%"
    );

    const heads = gsap.utils.toArray<HTMLElement>("[data-lines]", root);
    gsap.set(heads, { autoAlpha: 0 });
    whenFonts().then(() => {
      if (!alive()) return;
      ctx.add(() => {
        for (const h of heads) {
          const s = SplitText.create(h, { type: "lines", mask: "lines", aria: "auto" });
          const release = tracked(splits, s);
          gsap.set(s.lines, { yPercent: 108 });
          gsap.set(h, { autoAlpha: 1 });
          ScrollTrigger.create({
            trigger: h,
            start: "top 92%",
            once: true,
            onEnter: () =>
              gsap.to(s.lines, {
                yPercent: 0,
                duration: 1.15,
                stagger: 0.09,
                ease: "expo.out",
                onComplete: release,
              }),
          });
        }
        ScrollTrigger.refresh();
      });
    });
  });
}
