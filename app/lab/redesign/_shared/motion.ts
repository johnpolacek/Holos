// Motion helpers shared by the redesign prototypes. Import only from client components.
//
// Boot contract (see .agents/skills/gsap-vanilla/references/initialization.md):
// <MotionBoot /> runs before first paint and sets html[data-motion-boot="pending"], which
// hides [data-intro] targets under the design root. A page controller sets its start values,
// then calls markRunning() in the same turn. If nothing does within the deadline, the boot
// script marks the visit "recovered" and the content shows, settled.

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  CustomEase,
  Flip,
  ScrambleTextPlugin,
  ScrollToPlugin
);

export {
  CustomEase,
  DrawSVGPlugin,
  Flip,
  gsap,
  ScrambleTextPlugin,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
};

// ?motion=reduced or ?motion=full in the URL overrides the system setting (handy for review
// and for screenshots of the settled state).
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  const choice = document.documentElement.dataset.motion;
  if (choice === "reduced") return true;
  if (choice === "full") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type BootState = "pending" | "running" | "recovered" | undefined;
export const bootState = () => document.documentElement.dataset.motionBoot as BootState;

// True when intros should be skipped: reduced motion, or the boot deadline already fired.
export const skipIntro = () => prefersReducedMotion() || bootState() === "recovered";

export function markRunning() {
  const d = document.documentElement;
  if (d.dataset.motionBoot === "pending") d.dataset.motionBoot = "running";
}
