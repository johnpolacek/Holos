// Overview figure, Omega: not one giant mind. A globe holds everything: scattered apertures,
// each a self, with nothing joining them; no single aperture opens over the whole, because
// its parts are not all joined. Then the lit regions: around each self, the part of the
// whole that could ever reach it is shaded; the rest is never experienced. Last, the space
// around the globe: there is no outside for it to act from, so no hand reaches in to steer
// its history. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  V,
} from "../../tourScenes3d";
import { setup, xyz } from "../logic2/decoherence-util";

const R = 3; // the globe
const SELVES = [V(-1.7, 0.9, 0.8), V(1.6, 1.2, -0.3), V(0.7, -1.3, 1.3), V(-0.9, -0.9, -1.7)];

export function omegaNotMind(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { ghost: 0, lit: 0, outside: 0 };

  // The whole: a globe drawn as meridians and parallels, in soft ink.
  const globe = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI;
    globe.add(
      line(
        circlePts(R, 96).map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
        kit.soft,
        true
      )
    );
  }
  for (const h of [-0.66, -0.33, 0, 0.33, 0.66]) {
    const rr = Math.cos(Math.asin(h)) * R;
    globe.add(
      line(
        circlePts(rr, 96).map((p) => V(p.x, h * R, p.y)),
        kit.soft,
        true
      )
    );
  }
  scene.add(globe);

  // Selves: an aperture each, with a small lit region around it.
  const regions: THREE.Mesh[] = [];
  for (const p of SELVES) {
    const iris = makeIris(kit, 0.26);
    iris.group.position.copy(p);
    scene.add(iris.group);
    const lit = new THREE.Mesh(new THREE.SphereGeometry(0.62, 28, 18), kit.surface(0.25));
    lit.position.copy(p);
    lit.visible = false;
    scene.add(lit);
    regions.push(lit);
  }

  // The single giant aperture that is not there: an outline that crosses out.
  const ghost = new THREE.Group();
  ghost.add(line(circlePts(0.9, 64), kit.soft, true), line(circlePts(1.6, 64), kit.soft, true));
  ghost.add(
    segments([V(-1.3, -1.3, 0), V(1.3, 1.3, 0), V(-1.3, 1.3, 0), V(1.3, -1.3, 0)], kit.ink)
  );
  ghost.position.set(0, R + 2.2, 0);
  ghost.visible = false;
  scene.add(ghost);

  // No outside: a dashed ring around the globe, and nothing beyond it.
  const nothing = new THREE.Group();
  const ring = circlePts(R + 1.1, 96);
  nothing.add(
    segments(
      ring.flatMap((p, i) => (i % 2 ? [] : [p, ring[(i + 1) % ring.length]])),
      kit.soft
    )
  );
  nothing.visible = false;
  scene.add(nothing);

  const labels: Label3D[] = [
    { id: "whole", text: "EVERYTHING IS IN IT", at: V(R * 0.7, R * 0.7, 0), dx: 60, dy: -40 },
    { id: "selves", text: "SELVES, NOT ALL JOINED", at: SELVES[1], dx: 70, dy: -40 },
    { id: "ghost", text: "NO SINGLE VIEW OF IT ALL", at: V(1.6, R + 2.2, 0), dx: 60, dy: -20 },
    {
      id: "lit",
      text: "LIT, AROUND A SELF",
      at: SELVES[0].clone().add(V(-0.6, 0.4, 0)),
      dx: -60,
      dy: -40,
    },
    { id: "unlit", text: "NEVER EXPERIENCED", at: V(R * 0.85, -R * 0.45, 0), dx: 70, dy: 40 },
    {
      id: "outside",
      text: "NO OUTSIDE TO ACT FROM",
      at: V(-(R + 1.1) * 0.7, (R + 1.1) * 0.7, 0),
      dx: -50,
      dy: -60,
    },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.5 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0.4, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      globe.rotation.y = time * 0.05;
      ghost.visible = st.ghost > 0.5;
      for (const rg of regions) rg.visible = st.lit > 0.5;
      nothing.visible = st.outside > 0.5;
    },
    stops: [
      // 1 · Not one giant mind: the globe and its walled-apart selves; no single view.
      (tl, t, c) => {
        tl.addLabel("mind", t);
        tl.fromTo(
          kit.clip,
          { constant: -R - 0.5 },
          { constant: R + 0.5, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(0, 0, 0)) },
          { ...xyz(home), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-3, 2, 8)) },
          { ...xyz(view(1.6, 2.4, 11.6)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { whole: 1 }, t + 1.8);
        lab(tl, c, { selves: 1 }, t + 2.4);
        tl.set(st, { ghost: 1 }, t + 3);
        lab(tl, c, { ghost: 1 }, t + 3.2);
      },
      // 2 · Not all lived: lit regions around each self; the rest is never experienced.
      (tl, t, c) => {
        tl.addLabel("lived", t);
        lab(tl, c, { ghost: 0, whole: 0, selves: 0 }, t);
        tl.set(st, { ghost: 0 }, t);
        cam(tl, c, V(0, 0, 0), view(-1.4, 1.6, 10.4), t, 2.4, EASE);
        tl.set(st, { lit: 1 }, t + 1);
        lab(tl, c, { lit: 1 }, t + 1.6);
        lab(tl, c, { unlit: 1 }, t + 2.2);
      },
      // 3 · Not an agent: nothing outside it to act from.
      (tl, t, c) => {
        tl.addLabel("agent", t);
        lab(tl, c, none, t);
        cam(tl, c, home, view(0, 3, 14), t, 2.6, EASE);
        tl.set(st, { outside: 1 }, t + 1);
        lab(tl, c, { outside: 1 }, t + 1.8);
      },
    ],
  };
}
