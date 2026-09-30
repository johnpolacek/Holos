// Hover treatments from animaxxing's hover-effects recipe: mouse hover and :focus-visible share
// one hot state (touch and tap-focus never enter it, so nothing sticks after a tap), an
// underline that sweeps in from the start and out toward the end, and a fill that rises
// behind a row. Each returns a teardown that removes what it injected.

import { gsap, prefersReducedMotion } from "../../_shared/motion";

type Teardown = () => void;

export function hotState(el: HTMLElement, on: () => void, off: () => void): Teardown {
  let hovered = false;
  let focused = false;
  let hot = false;
  const update = () => {
    const next = hovered || focused;
    if (next === hot) return;
    hot = next;
    (hot ? on : off)();
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
  const focusIn = (e: FocusEvent) => {
    focused = (e.target as Element).matches(":focus-visible");
    update();
  };
  const focusOut = (e: FocusEvent) => {
    if (el.contains(e.relatedTarget as Node | null)) return;
    focused = false;
    update();
  };
  el.addEventListener("pointerenter", enter);
  el.addEventListener("pointerleave", leave);
  el.addEventListener("focusin", focusIn);
  el.addEventListener("focusout", focusOut);
  return () => {
    el.removeEventListener("pointerenter", enter);
    el.removeEventListener("pointerleave", leave);
    el.removeEventListener("focusin", focusIn);
    el.removeEventListener("focusout", focusOut);
  };
}

export function underlineSweep(link: HTMLElement): Teardown {
  const reduced = prefersReducedMotion();
  const line = document.createElement("span");
  line.dataset.underline = "";
  line.setAttribute("aria-hidden", "true");
  line.style.cssText =
    "position:absolute;left:0;right:0;bottom:var(--underline-offset,-3px);height:var(--underline-thickness,1px);" +
    "background:var(--underline-color,currentColor);pointer-events:none";
  const wasStatic = getComputedStyle(link).position === "static";
  if (wasStatic) link.style.position = "relative";
  link.append(line);
  gsap.set(line, { scaleX: 0, transformOrigin: "0% 50%" });
  const sweep = (hot: boolean) => {
    if (Number(gsap.getProperty(line, "scaleX")) === (hot ? 0 : 1)) {
      gsap.set(line, { transformOrigin: hot ? "0% 50%" : "100% 50%" });
    }
    gsap.to(line, {
      scaleX: hot ? 1 : 0,
      duration: reduced ? 0 : 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };
  const stop = hotState(
    link,
    () => sweep(true),
    () => sweep(false)
  );
  return () => {
    stop();
    gsap.killTweensOf(line);
    line.remove();
    if (wasStatic) link.style.removeProperty("position");
  };
}

// A panel rises behind the row and an arrow nudges forward; the row takes data-hot so CSS
// can switch its colors.
export function fillHover(row: HTMLElement): Teardown {
  const reduced = prefersReducedMotion();
  const fill = row.querySelector<HTMLElement>("[data-fill]");
  const arrow = row.querySelector<HTMLElement>("[data-arrow]");
  if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "50% 100%" });
  const go = (hot: boolean) => {
    if (hot) row.dataset.hot = "";
    else delete row.dataset.hot;
    const d = reduced ? 0 : 0.5;
    if (fill) {
      gsap.set(fill, { transformOrigin: hot ? "50% 100%" : "50% 0%" });
      gsap.to(fill, { scaleY: hot ? 1 : 0, duration: d, ease: "power4.out", overwrite: "auto" });
    }
    if (arrow)
      gsap.to(arrow, { x: hot ? 10 : 0, duration: d, ease: "power3.out", overwrite: "auto" });
  };
  const stop = hotState(
    row,
    () => go(true),
    () => go(false)
  );
  return () => {
    stop();
    delete row.dataset.hot;
    if (fill) gsap.set(fill, { clearProps: "transform" });
    if (arrow) gsap.set(arrow, { clearProps: "transform" });
  };
}

// Bounded wait for web fonts before measuring or splitting display type.
export function fontsReady(ms = 900): Promise<void> {
  return Promise.race([
    document.fonts?.ready.then(() => undefined) ?? Promise.resolve(),
    new Promise<void>((r) => setTimeout(r, ms)),
  ]);
}
