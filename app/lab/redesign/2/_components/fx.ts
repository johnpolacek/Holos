// Nocturne's motion builders, adapted from the animaxxing recipes (magnetic, underlineSweep,
// menuOverlay, linesMaskIn, revealOnScroll, scrubStatement, scrollProgress). Builders never
// decide when they run; the controllers in this folder call them and own teardown.

import { gsap, prefersReducedMotion, ScrollTrigger, SplitText } from "../../_shared/motion";

export type Teardown = () => void;
type Register = (fn: () => void) => void;

/** Runs setup in its own GSAP context; returns a once-only teardown that also rolls back a throw. */
export function own(setup: (dispose: Register, after: Register) => void): Teardown {
  const ctx = gsap.context(() => {});
  const disposers: Array<() => void> = [];
  const restores: Array<() => void> = [];
  let done = false;
  const teardown = () => {
    if (done) return;
    done = true;
    const attempt = (fn: () => void) => {
      try {
        fn();
      } catch {
        /* keep reaching the readable fallback */
      }
    };
    disposers.splice(0).reverse().forEach(attempt);
    attempt(() => ctx.revert());
    restores.splice(0).reverse().forEach(attempt);
  };
  let failure: { error: unknown } | undefined;
  ctx.add(() => {
    try {
      setup(
        (fn) => disposers.push(fn),
        (fn) => restores.push(fn)
      );
    } catch (error) {
      failure = { error };
    }
  });
  if (failure) {
    teardown();
    throw failure.error;
  }
  return teardown;
}

export function listen<K extends keyof HTMLElementEventMap>(
  dispose: Register,
  el: HTMLElement | Window | Document,
  type: K,
  fn: (e: HTMLElementEventMap[K]) => void,
  opts?: AddEventListenerOptions
) {
  el.addEventListener(type, fn as EventListener, opts);
  dispose(() => el.removeEventListener(type, fn as EventListener, opts));
}

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function snapshotStyles(elements: HTMLElement[], props: string[]) {
  const saved = elements.map((el) => props.map((p) => el.style.getPropertyValue(p)));
  return () =>
    elements.forEach((el, i) => {
      gsap.set(el, { clearProps: props.join(",") });
      props.forEach((p, j) => {
        const v = saved[i]?.[j];
        if (v) el.style.setProperty(p, v);
      });
    });
}

/** Hover or keyboard focus, never a lingering touch. */
function hotState(dispose: Register, control: HTMLElement, on: () => void, off: () => void) {
  let hovered = false;
  let focused = false;
  let hot = false;
  const update = () => {
    const next = hovered || focused;
    if (next === hot) return;
    hot = next;
    (hot ? on : off)();
  };
  listen(dispose, control, "pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    hovered = true;
    update();
  });
  listen(dispose, control, "pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    hovered = false;
    update();
  });
  listen(dispose, control, "focusin", (e) => {
    focused = (e.target as Element).matches(":focus-visible");
    update();
  });
  listen(dispose, control, "focusout", (e) => {
    if (control.contains(e.relatedTarget as Node | null)) return;
    focused = false;
    update();
  });
}

/** The target leans toward the mouse; an optional [data-magnetic-inner] travels further. */
export function magnetic(target: HTMLElement, strength = 0.3, inner = 0.5): Teardown {
  if (prefersReducedMotion() || !finePointer()) return () => {};
  return own((dispose, after) => {
    const label = target.querySelector<HTMLElement>("[data-magnetic-inner]");
    after(snapshotStyles(label ? [target, label] : [target], ["transform", "translate"]));
    const to = (el: HTMLElement, p: "x" | "y") =>
      gsap.quickTo(el, p, { duration: 0.45, ease: "power3.out" });
    const xTo = to(target, "x");
    const yTo = to(target, "y");
    const ix = label ? to(label, "x") : undefined;
    const iy = label ? to(label, "y") : undefined;
    let center = { x: 0, y: 0 };
    listen(dispose, target, "pointerenter", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = target.getBoundingClientRect();
      const x = Number(gsap.getProperty(target, "x"));
      const y = Number(gsap.getProperty(target, "y"));
      center = { x: r.left - x + r.width / 2, y: r.top - y + r.height / 2 };
    });
    listen(dispose, target, "pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const dx = (e.clientX - center.x) * strength;
      const dy = (e.clientY - center.y) * strength;
      xTo(dx);
      yTo(dy);
      ix?.(dx * inner);
      iy?.(dy * inner);
    });
    listen(dispose, target, "pointerleave", () => {
      xTo(0);
      yTo(0);
      ix?.(0);
      iy?.(0);
    });
  });
}

/** A hairline sweeps in from the start and out toward the end. Single-line links only. */
export function underlineSweep(link: HTMLElement): Teardown {
  const reduced = prefersReducedMotion();
  return own((dispose, after) => {
    const line = document.createElement("span");
    line.setAttribute("aria-hidden", "true");
    line.style.cssText =
      "position:absolute;left:0;right:0;bottom:var(--underline-offset,-3px);height:var(--underline-thickness,1px);" +
      "background:var(--underline-color,currentColor);pointer-events:none";
    after(snapshotStyles([link], ["position"]));
    if (getComputedStyle(link).position === "static") link.style.position = "relative";
    link.append(line);
    after(() => line.remove());
    dispose(() => gsap.killTweensOf(line));
    gsap.set(line, { scaleX: 0, transformOrigin: "0% 50%" });
    const sweep = (hot: boolean) => {
      if (Number(gsap.getProperty(line, "scaleX")) === (hot ? 0 : 1)) {
        gsap.set(line, { transformOrigin: hot ? "0% 50%" : "100% 50%" });
      }
      gsap.to(line, {
        scaleX: hot ? 1 : 0,
        duration: reduced ? 0 : 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    hotState(
      dispose,
      link,
      () => sweep(true),
      () => sweep(false)
    );
  });
}

export type MenuOverlay = {
  open(): gsap.core.Timeline;
  close(): gsap.core.Timeline;
  revert: Teardown;
};

/** A full-screen panel wipes in from the top, then its items stagger in; close retraces. */
export function menuOverlay(panel: HTMLElement, items = "[data-menu-item]"): MenuOverlay {
  let current: gsap.core.Timeline | undefined;
  const next = () => {
    current?.kill();
    current = gsap.timeline({ defaults: { overwrite: "auto" } });
    return current;
  };
  const clip = { inset: 100 };
  const paint = () => {
    panel.style.clipPath = `inset(0% 0% ${clip.inset}% 0%)`;
  };
  let els: HTMLElement[] = [];
  const revert = own((dispose, after) => {
    after(snapshotStyles([panel], ["visibility", "clip-path"]));
    dispose(() => current?.kill());
    gsap.set(panel, { visibility: "hidden" });
    paint();
    els = Array.from(panel.querySelectorAll<HTMLElement>(items));
    after(snapshotStyles(els, ["opacity", "visibility", "transform", "translate"]));
    gsap.set(els, { autoAlpha: 0, y: 18 });
  });
  return {
    open() {
      const tl = next().set(panel, { visibility: "visible" });
      if (prefersReducedMotion())
        return tl.set(clip, { inset: 0, onUpdate: paint }).set(els, { autoAlpha: 1, y: 0 });
      return tl
        .to(clip, { inset: 0, duration: 0.6, ease: "power3.inOut", onUpdate: paint })
        .to(
          els,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.045 },
          "-=0.25"
        );
    },
    close() {
      const tl = next();
      if (prefersReducedMotion())
        return tl
          .set(els, { autoAlpha: 0, y: 18 })
          .set(clip, { inset: 100, onUpdate: paint })
          .set(panel, { visibility: "hidden" });
      return tl
        .to(els, {
          autoAlpha: 0,
          y: 12,
          duration: 0.2,
          ease: "power2.in",
          stagger: { each: 0.02, from: "end" },
        })
        .to(clip, { inset: 100, duration: 0.5, ease: "power3.inOut", onUpdate: paint }, "-=0.1")
        .set(panel, { visibility: "hidden" });
    },
    revert,
  };
}

/** Lines rise behind masks when the element scrolls into view (once). */
export function linesOnScroll(el: HTMLElement, { start = "top 88%", ellipse = false } = {}) {
  if (prefersReducedMotion()) return;
  gsap.set(el, { autoAlpha: 0 });
  ScrollTrigger.create({
    trigger: el,
    start,
    once: true,
    onEnter: () =>
      fontsReady(600).then(() => {
        if (!el.isConnected) return;
        const split = SplitText.create(el, { type: "lines", mask: "lines", aria: "auto" });
        const tl = gsap.timeline({ onComplete: () => split.revert() });
        tl.set(el, { autoAlpha: 1 });
        if (ellipse) {
          tl.fromTo(
            split.masks,
            { clipPath: "ellipse(20% 0% at 50% 100%)" },
            {
              clipPath: "ellipse(100% 120% at 50% 100%)",
              duration: 1,
              ease: "power3.out",
              stagger: 0.08,
            },
            0
          );
          tl.from(split.lines, { yPercent: 45, duration: 1, ease: "power3.out", stagger: 0.08 }, 0);
        } else {
          tl.from(split.lines, { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.08 });
        }
      }),
  });
}

/** The workhorse below the fold: rise and fade, batched, once. */
export function revealOnScroll(targets: HTMLElement[], { y = 28, start = "top 88%" } = {}) {
  if (prefersReducedMotion() || !targets.length) return;
  gsap.set(targets, { autoAlpha: 0, y });
  ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        overwrite: true,
        clearProps: "transform,visibility,opacity",
      }),
  });
}

/** One display statement fills in word by word through the reading zone. */
export function scrubStatement(el: HTMLElement) {
  if (prefersReducedMotion()) return;
  const split = SplitText.create(el, { type: "words", aria: "auto" });
  gsap.fromTo(
    split.words,
    { opacity: 0.14 },
    {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
    }
  );
}

/** Bounded wait for web fonts before measuring display type. */
export function fontsReady(ms = 900): Promise<void> {
  return Promise.race([
    document.fonts?.ready.then(() => undefined) ?? Promise.resolve(),
    new Promise<void>((r) => setTimeout(r, ms)),
  ]);
}
