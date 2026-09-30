// Runs before first paint. Sets the motion override from ?motion=, then, unless motion is
// reduced, arms a recovery deadline and marks the visit pending so [data-intro] targets stay
// hidden until a page controller has set their start values. Server-rendered only as a
// script: with JavaScript off nothing is hidden.

const BOOT = `(function(){try{var d=document.documentElement,q=location.search.match(/[?&]motion=(reduced|full)/);if(q)d.dataset.motion=q[1];var r=d.dataset.motion==="reduced"||(d.dataset.motion!=="full"&&matchMedia("(prefers-reduced-motion: reduce)").matches);if(r||d.dataset.motionBoot)return;d.dataset.motionBoot="pending";setTimeout(function(){if(d.dataset.motionBoot==="pending")d.dataset.motionBoot="recovered"},3500)}catch(e){}})();`;

export default function MotionBoot() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: static boot script, no user input
  return <script dangerouslySetInnerHTML={{ __html: BOOT }} />;
}
