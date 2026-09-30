// Underline sweep for single-line navigation links, after animaxxing's hover-effects recipe:
// an injected hairline sweeps in from the start and out toward the end, by scaleX only.
// Mouse hover and :focus-visible share one hot state; touch never sticks.

import { gsap, prefersReducedMotion } from "../../_shared/motion";

export type Teardown = () => void;

export function underlineSweep(link: HTMLElement): Teardown {
  const reduced = prefersReducedMotion();
  const line = document.createElement("span");
  line.dataset.underline = "";
  line.setAttribute("aria-hidden", "true");
  line.style.cssText =
    "position:absolute;left:0;right:0;bottom:var(--underline-offset,-3px);height:var(--underline-thickness,1px);" +
    "background:var(--underline-color,currentColor);pointer-events:none";
  const prevPosition = link.style.position;
  if (getComputedStyle(link).position === "static") link.style.position = "relative";
  link.append(line);
  gsap.set(line, { scaleX: 0, transformOrigin: "0% 50%" });

  let hovered = false;
  let focused = false;
  let hot = false;
  const sweep = (on: boolean) => {
    if (Number(gsap.getProperty(line, "scaleX")) === (on ? 0 : 1)) {
      gsap.set(line, { transformOrigin: on ? "0% 50%" : "100% 50%" });
    }
    gsap.to(line, {
      scaleX: on ? 1 : 0,
      duration: reduced ? 0 : 0.34,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  const update = () => {
    const next = hovered || focused;
    if (next === hot) return;
    hot = next;
    sweep(hot);
  };
  const enter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hovered = true;
    update();
  };
  const leave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hovered = false;
    update();
  };
  const fin = (e: FocusEvent) => {
    focused = (e.target as Element).matches(":focus-visible");
    update();
  };
  const fout = () => {
    focused = false;
    update();
  };
  link.addEventListener("pointerenter", enter);
  link.addEventListener("pointerleave", leave);
  link.addEventListener("focusin", fin);
  link.addEventListener("focusout", fout);
  return () => {
    link.removeEventListener("pointerenter", enter);
    link.removeEventListener("pointerleave", leave);
    link.removeEventListener("focusin", fin);
    link.removeEventListener("focusout", fout);
    gsap.killTweensOf(line);
    line.remove();
    link.style.position = prevPosition;
  };
}
