// countUp from animaxxing's counters recipe, trimmed to whole numbers with grouping: the
// element's text is its final value, width is reserved at that value, and assistive
// technology reads only the final value.

import { gsap, prefersReducedMotion } from "../../_shared/motion";

const HIDDEN =
  "position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap";

export function countUp(el: HTMLElement, { duration = 1.6, delay = 0 } = {}): () => void {
  const finalText = el.textContent ?? "";
  const value = Number(finalText.replace(/[^\d]/g, ""));
  if (!finalText || Number.isNaN(value) || prefersReducedMotion() || el.dataset.counted)
    return () => {};
  el.dataset.counted = "";
  const width = el.getBoundingClientRect().width;
  const prev = el.getAttribute("style");
  el.style.display = "inline-block";
  el.style.minWidth = `${width}px`;
  const shown = document.createElement("span");
  shown.setAttribute("aria-hidden", "true");
  const spoken = document.createElement("span");
  spoken.textContent = finalText;
  spoken.style.cssText = HIDDEN;
  el.replaceChildren(shown, spoken);
  const fmt = new Intl.NumberFormat("en-US");
  const c = { n: 0 };
  const write = () => {
    shown.textContent = fmt.format(Math.round(c.n));
  };
  write();
  const restore = () => {
    el.textContent = finalText;
    if (prev === null) el.removeAttribute("style");
    else el.setAttribute("style", prev);
  };
  const tween = gsap.to(c, {
    n: value,
    duration,
    delay,
    ease: "power3.out",
    onUpdate: write,
    onComplete: restore,
  });
  return () => {
    tween.kill();
    restore();
  };
}
