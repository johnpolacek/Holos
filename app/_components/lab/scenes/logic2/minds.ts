// Logic figure: theories of mind as ways of lighting one landscape. On a round table sit
// loose particles, a rock, a thermostat, a small network, and a person. A small halo above
// a thing marks experience there. Panpsychism lights everything, down to each particle.
// Illusionism lights nothing. Integrated information theory lights every integrated
// system. Cosmopsychism lights the whole, as one subject under a dome. Holos keeps the dome
// faint, as a single ground, and lights only the person, past the threshold.
// Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  segments,
  V,
} from "../../tourScenes3d";
import { rng, setup, xyz } from "./decoherence-util";

const R = 4.2; // the table
const DOME = 4.6;

export function minds(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { dust: 0, rock: 0, thermo: 0, net: 0, person: 0, cosmos: 0, ground: 0 };

  // The table.
  const table = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.25, 96, 1), kit.surface(0.05));
  table.position.y = -0.125;
  scene.add(table);

  // A halo marks experience: a ring with short rays, facing the viewer.
  const halo = (r: number) => {
    const g = new THREE.Group();
    g.add(line(circlePts(r, 40), kit.ink, true));
    const rays: THREE.Vector3[] = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      rays.push(
        V(Math.cos(a) * r * 1.35, Math.sin(a) * r * 1.35, 0),
        V(Math.cos(a) * r * 1.85, Math.sin(a) * r * 1.85, 0)
      );
    }
    g.add(segments(rays, kit.ink));
    g.visible = false;
    scene.add(g);
    return g;
  };

  // Loose particles, each with its own tiny halo.
  const rand = rng(7);
  const dustAt = V(-2.7, 0, 0.9);
  const dust = Array.from({ length: 11 }, () => {
    const p = V(
      dustAt.x + (rand() - 0.5) * 1.3,
      0.12 + rand() * 0.5,
      dustAt.z + (rand() - 0.5) * 1.1
    );
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), kit.surface(0.4));
    m.position.copy(p);
    scene.add(m);
    const h = halo(0.06);
    h.position.copy(p).add(V(0, 0.2, 0));
    return h;
  });

  // A rock.
  const rockGeo = new THREE.DodecahedronGeometry(0.5, 0);
  const rock = new THREE.Mesh(rockGeo, kit.surface(0.25));
  rock.scale.set(1.2, 0.75, 1);
  rock.position.set(-1.3, 0.36, -1.3);
  scene.add(rock);
  const rockHalo = halo(0.15);
  rockHalo.position.set(-1.3, 1.25, -1.3);

  // A thermostat: a box with a dial, a sensor, and a wire looping back.
  const thermo = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.25), kit.surface(0.1));
  box.position.y = 0.35;
  thermo.add(box);
  const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.06, 28).rotateX(Math.PI / 2),
    kit.surface(0.3)
  );
  dial.position.set(0, 0.45, 0.15);
  thermo.add(dial);
  thermo.add(
    line(
      [
        V(0.25, 0.2, 0),
        V(0.6, 0.2, 0),
        V(0.6, 0.02, 0.35),
        V(-0.1, 0.02, 0.45),
        V(-0.25, 0.2, 0.1),
      ],
      kit.ink
    )
  );
  thermo.position.set(0.2, 0, 1.3);
  scene.add(thermo);
  const thermoHalo = halo(0.15);
  thermoHalo.position.set(0.2, 1.05, 1.3);

  // A small network: a few nodes, all joined.
  const net = new THREE.Group();
  const nodes = [
    V(0, 0.5, 0),
    V(0.45, 0.85, 0.1),
    V(-0.4, 0.95, -0.1),
    V(0.1, 1.3, 0.2),
    V(0.35, 0.35, -0.35),
    V(-0.3, 0.4, 0.35),
  ];
  for (const n of nodes) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 10), kit.surface(0.3));
    m.position.copy(n);
    net.add(m);
  }
  const bonds: THREE.Vector3[] = [];
  nodes.forEach((a, i) => {
    nodes.forEach((b, j) => {
      if (j > i && a.distanceTo(b) < 0.8) bonds.push(a, b);
    });
  });
  net.add(segments(bonds, kit.ink));
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), kit.surface(0.2));
  stalk.position.y = 0.17;
  net.add(stalk);
  net.position.set(1.6, 0, -1.0);
  scene.add(net);
  const netHalo = halo(0.15);
  netHalo.position.set(1.65, 1.75, -1.0);

  // A person.
  const person = makePerson(kit, 0.1);
  person.group.position.set(2.7, 0, 0.9);
  person.group.rotation.y = -0.35;
  scene.add(person.group);
  const personHalo = halo(0.2);
  personHalo.position.set(2.7, 2.2, 0.9);

  // A dome over the whole table: ink when it is one subject, soft when it is only the ground.
  const domeLines = (mat: THREE.Material) => {
    const g = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI;
      const arc = Array.from({ length: 33 }, (_, k) => {
        const u = (k / 32) * Math.PI;
        return V(
          Math.cos(u) * DOME * Math.cos(a),
          Math.sin(u) * DOME,
          Math.cos(u) * DOME * Math.sin(a)
        );
      });
      g.add(line(arc, mat));
    }
    for (const h of [0.35, 0.7, 0.92]) {
      const r = Math.cos(Math.asin(h)) * DOME;
      g.add(
        line(
          circlePts(r, 96).map((p) => V(p.x, h * DOME, p.y)),
          mat,
          true
        )
      );
    }
    g.add(
      line(
        circlePts(DOME, 96).map((p) => V(p.x, 0.01, p.y)),
        mat,
        true
      )
    );
    g.visible = false;
    scene.add(g);
    return g;
  };
  const inkDome = domeLines(kit.ink);
  const softDome = domeLines(kit.soft);
  const cosmosHalo = halo(0.3);
  cosmosHalo.position.set(0, DOME + 0.75, 0);

  const labels: Label3D[] = [
    { id: "dust", text: "PARTICLES", at: V(-3.2, 0.2, 1.4), dx: -30, dy: 50 },
    { id: "rock", text: "A ROCK", at: V(-1.6, 0.6, -1.4), dx: -50, dy: -40 },
    { id: "thermo", text: "A THERMOSTAT", at: V(0.2, 0.1, 1.6), dx: 0, dy: 50 },
    { id: "net", text: "A SMALL NETWORK", at: V(1.7, 1.3, -1.0), dx: 60, dy: -50 },
    { id: "person", text: "A PERSON", at: V(2.95, 0.9, 1.0), dx: 60, dy: 30 },
    { id: "one", text: "ONE SUBJECT", at: V(0, DOME, 0), dx: 70, dy: -20 },
    { id: "ground", text: "ONE GROUND", at: V(-DOME * 0.66, DOME * 0.74, 0), dx: -50, dy: -30 },
    { id: "past", text: "PAST THE THRESHOLD", at: V(2.95, 2.25, 0.9), dx: 70, dy: -40 },
  ];
  const things = { dust: 0, rock: 0, thermo: 0, net: 0, person: 0 };

  const k = narrow ? 1.9 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const near = V(0, 0.9, 0);
  const wide = V(0, 2.1, 0);

  const lit = (tl: gsap.core.Timeline, values: Partial<typeof st>, at: number) => {
    tl.to(st, { ...values, duration: 0.9, ease: "power2.inOut" }, at);
  };
  const all = { dust: 1, rock: 1, thermo: 1, net: 1, person: 1 };
  const off = { dust: 0, rock: 0, thermo: 0, net: 0, person: 0 };

  return {
    scene,
    kit,
    labels,
    update: () => {
      const set = (g: THREE.Object3D, v: number) => {
        g.visible = v > 0.02;
        g.scale.setScalar(Math.max(v, 0.02));
      };
      for (const d of dust) set(d, st.dust);
      set(rockHalo, st.rock);
      set(thermoHalo, st.thermo);
      set(netHalo, st.net);
      set(personHalo, st.person);
      set(cosmosHalo, st.cosmos);
      inkDome.visible = st.cosmos > 0.5;
      softDome.visible = st.ground > 0.5 && !inkDome.visible;
    },
    stops: [
      // 1 · Everywhere: the landscape engraves in, and every thing lights, down to each particle.
      (tl, t, c) => {
        tl.addLabel("everywhere", t);
        tl.fromTo(
          kit.clip,
          { constant: -R - 0.5 },
          { constant: R + 0.5, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-1, 0.6, 0)) },
          { ...xyz(near), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-3, 3.2, 8)) },
          { ...xyz(view(0.4, 3.8, 8.8)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { ...things, dust: 1, rock: 1, thermo: 1, net: 1, person: 1 }, t + 2);
        lit(tl, all, t + 3);
      },
      // 2 · Nowhere: every halo goes out.
      (tl, t, c) => {
        tl.addLabel("nowhere", t);
        lab(tl, c, things, t);
        cam(tl, c, near, view(-0.6, 4, 8.8), t, 2.4, EASE);
        lit(tl, off, t + 0.6);
      },
      // 3 · Any integration: halos return on the thermostat, the network, and the person.
      (tl, t, c) => {
        tl.addLabel("integration", t);
        cam(tl, c, near, view(0.6, 3.8, 8.8), t, 2.4, EASE);
        lit(tl, { thermo: 1, net: 1, person: 1 }, t + 0.6);
        lab(tl, c, { thermo: 1, net: 1, person: 1 }, t + 1.2);
      },
      // 4 · The cosmos: the halos go, and the whole is lit as one subject under a dome.
      (tl, t, c) => {
        tl.addLabel("cosmos", t);
        lab(tl, c, things, t);
        cam(tl, c, wide, view(0, 5.6, 13.2), t, 2.6, EASE);
        lit(tl, off, t + 0.3);
        lit(tl, { cosmos: 1 }, t + 1.2);
        lab(tl, c, { one: 1 }, t + 2.2);
      },
      // 5 · Past a threshold: the dome stays as a faint common ground, and only the person lights.
      (tl, t, c) => {
        tl.addLabel("threshold", t);
        lab(tl, c, { one: 0 }, t);
        tl.set(st, { ground: 1 }, t);
        lit(tl, { cosmos: 0 }, t + 0.2);
        cam(tl, c, V(0.8, 1.7, 0.2), view(0.6, 4.8, 12), t, 2.6, EASE);
        lab(tl, c, { ground: 1 }, t + 1.2);
        lit(tl, { person: 1 }, t + 1.6);
        lab(tl, c, { past: 1 }, t + 2.4);
      },
    ],
  };
}
