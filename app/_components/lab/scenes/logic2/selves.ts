// Placeholder for the logic2.selves figure. Replaced by the real scene.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import type { Built3D } from "../../tourScenes3d";

export function selves(_narrow = false): Built3D {
  const kit = makeKit();
  const scene = new THREE.Scene();
  return {
    scene,
    kit,
    labels: [],
    update: () => {},
    stops: Array.from({ length: 4 }, (_, i) => (tl: gsap.core.Timeline, t: number) => {
      tl.addLabel(`s${i}`, t + 0.5);
    }),
  };
}
