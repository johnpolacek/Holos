// Poster type entrance, after animaxxing's `letters-sides`: letters left of center arrive
// from the left edge, letters right of center from the right (so none cross), the middle one
// rises into place, and they zip together from the center while Archivo's width axis opens
// from its most condensed cut to its most expanded and the weight settles.
// The split is reverted when the line lands, so the headline is plain text again.

import { gsap, SplitText } from "../../_shared/motion";

export function sidesIn(el: HTMLElement, { duration = 1.25 } = {}) {
  const split = SplitText.create(el, { type: "chars", aria: "auto" });
  const spread = window.innerWidth * 0.6;
  const tl = gsap.timeline({
    onComplete: () => {
      split.revert();
      gsap.set(el, { clearProps: "--wdth,--wght" });
    },
  });
  tl.fromTo(
    el,
    { "--wdth": 62, "--wght": 300 },
    { "--wdth": 125, "--wght": 800, duration: duration * 1.1, ease: "expo.inOut" },
    0
  );
  const mid = (split.chars.length - 1) / 2;
  tl.from(
    split.chars,
    {
      x: (i: number) =>
        Math.sign(i - mid) * spread * (0.55 + (0.45 * Math.abs(i - mid)) / (mid || 1)),
      yPercent: (i: number) => (i === mid ? 60 : 0),
      autoAlpha: 0,
      duration,
      ease: "power4.out",
      stagger: { each: 0.05, from: "center" },
    },
    0
  );
  return tl;
}
