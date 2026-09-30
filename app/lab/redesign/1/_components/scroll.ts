import { gsap, prefersReducedMotion } from "../../_shared/motion";

// Eased travel to an anchor, then focus it so keyboard and screen reader users land there too.
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  history.pushState(null, "", `#${id}`);
  const done = () => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };
  if (prefersReducedMotion()) {
    el.scrollIntoView();
    done();
    return true;
  }
  const distance = Math.abs(el.getBoundingClientRect().top);
  gsap.to(window, {
    scrollTo: { y: el, offsetY: window.innerWidth < 1100 ? 72 : 32, autoKill: true },
    duration: gsap.utils.clamp(0.7, 1.6, 0.6 + distance / 6000),
    ease: "power3.inOut",
    onComplete: done,
  });
  return true;
}
