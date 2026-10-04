// Overview figure, Consciousness: the threshold is not a sharp line. A large block of iron
// and a tiny grain sit beside a thermometer, both full of small magnets pointing every
// which way. As they cool past the Curie point, the block's magnets swing into line all at
// once, the grain's only gradually. Holos expects the same of experience: a thermostat is
// clearly not an observer, a waking person clearly is, and a narrow twilight lies between.
// Past it, experience is a dial turned lower or higher, not a switch.
// Stops tween only plain state.

import * as THREE from "three";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  type Label3D,
  lab,
  makeIris,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { rng, setup, xyz } from "../logic2/decoherence-util";

const BLOCK = V(-1.6, 0, 0);
const GRAIN = V(1.6, 0, 0.3);
const RZ = 4.6; // the ruler of clear cases, in front

export function csTwilight(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { temp: 1, cases: 0, dial: 0.35 };
  const r = rng(71);

  const bench = new THREE.Mesh(new THREE.BoxGeometry(7, 0.12, 3.4), kit.surface(0.04));
  bench.position.set(0, -0.06, 0.2);
  scene.add(bench);

  // Small magnets: a shaft and a head, each with its own starting direction.
  const magnet = () => {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.2, 6), kit.ink);
    shaft.rotation.z = Math.PI / 2;
    g.add(shaft);
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.1, 8), kit.ink);
    head.rotation.z = -Math.PI / 2;
    head.position.x = 0.14;
    g.add(head);
    g.userData.a = r() * Math.PI * 2;
    g.userData.b = r() * Math.PI - Math.PI / 2;
    g.userData.t = r();
    return g;
  };

  // The block: an open cage of iron with a lattice of magnets inside.
  const blockMags: THREE.Group[] = [];
  const BS = 1.6;
  const blockGeo = new THREE.BoxGeometry(BS * 2, BS, BS);
  blockGeo.translate(0, BS / 2, 0);
  const cage = new THREE.LineSegments(new THREE.EdgesGeometry(blockGeo), kit.ink);
  cage.position.copy(BLOCK);
  scene.add(cage);
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 4; j++)
      for (let k = 0; k < 4; k++) {
        const m = magnet();
        m.position.set(
          BLOCK.x - BS + 0.2 + i * 0.35,
          0.2 + j * 0.38,
          BLOCK.z - BS / 2 + 0.2 + k * 0.38
        );
        scene.add(m);
        blockMags.push(m);
      }

  // The grain: a small cage with a few magnets.
  const grainMags: THREE.Group[] = [];
  const GS = 0.7;
  const grainGeo = new THREE.BoxGeometry(GS, GS, GS);
  grainGeo.translate(0, GS / 2, 0);
  const grainCage = new THREE.LineSegments(new THREE.EdgesGeometry(grainGeo), kit.ink);
  grainCage.position.copy(GRAIN);
  scene.add(grainCage);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
      for (let k = 0; k < 2; k++) {
        const m = magnet();
        m.position.set(GRAIN.x - 0.17 + i * 0.34, 0.17 + j * 0.34, GRAIN.z - 0.17 + k * 0.34);
        scene.add(m);
        grainMags.push(m);
      }

  // A thermometer between them.
  const thermo = new THREE.Group();
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 16), kit.surface(-0.4));
  tube.position.y = 1.3;
  thermo.add(tube);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), kit.surface(0.4));
  bulb.position.y = 0.16;
  thermo.add(bulb);
  const fluid = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1, 10), kit.ink);
  thermo.add(fluid);
  const ticks: THREE.Vector3[] = [];
  for (let i = 0; i <= 8; i++) ticks.push(V(0.1, 0.3 + i * 0.25, 0), V(0.2, 0.3 + i * 0.25, 0));
  thermo.add(segments(ticks, kit.ink));
  thermo.add(segments([V(-0.3, 1.3, 0), V(0.3, 1.3, 0)], kit.ink));
  thermo.position.set(0.55, 0, -0.6);
  scene.add(thermo);

  // Clear cases: a thermostat, a ruler with a narrow twilight, and a person.
  const ruler = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.1, 0.4), kit.surface(0.06));
  bar.position.y = 0.05;
  ruler.add(bar);
  const twi = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.4), kit.surface(0.55));
  twi.position.set(0, 0.11, 0);
  ruler.add(twi);
  const thermostat = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.25), kit.surface(0.1));
  box.position.y = 0.45;
  thermostat.add(box);
  const dial0 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.05, 24).rotateX(Math.PI / 2),
    kit.surface(0.3)
  );
  dial0.position.set(0, 0.55, 0.14);
  thermostat.add(dial0);
  thermostat.position.set(-2.4, 0.1, 0);
  ruler.add(thermostat);
  const person = makePerson(kit, 0.1);
  person.group.position.set(2.4, 0.1, 0);
  person.group.scale.setScalar(0.85);
  ruler.add(person.group);
  const iris = makeIris(kit, 0.22);
  iris.group.position.set(2.4, 2.25, 0);
  ruler.add(iris.group);
  ruler.position.z = RZ;
  ruler.visible = false;
  scene.add(ruler);

  const labels: Label3D[] = [
    {
      id: "block",
      text: "A LARGE BLOCK OF IRON",
      at: V(BLOCK.x - 1, BS, BLOCK.z),
      dx: -40,
      dy: -40,
    },
    { id: "grain", text: "A TINY GRAIN", at: V(GRAIN.x, GS, GRAIN.z), dx: 40, dy: -50 },
    { id: "curie", text: "THE CURIE POINT", at: V(0.85, 1.3, -0.6), dx: 60, dy: -40 },
    { id: "steep", text: "ALL AT ONCE", at: V(BLOCK.x, 0.9, BLOCK.z + BS / 2), dx: -30, dy: 70 },
    { id: "gradual", text: "BIT BY BIT", at: V(GRAIN.x, 0.35, GRAIN.z + GS / 2), dx: 40, dy: 60 },
    { id: "not", text: "CLEARLY NOT", at: V(-2.4, 0.9, RZ), dx: -30, dy: -50 },
    { id: "is", text: "CLEARLY IS", at: V(2.4, 2.5, RZ), dx: 40, dy: -40 },
    { id: "twi", text: "A NARROW TWILIGHT", at: V(0, 0.12, RZ + 0.2), dx: 0, dy: 50 },
    { id: "dial", text: "RICHER OR POORER, NOT ON OR OFF", at: V(2.85, 2.1, RZ), dx: 70, dy: 50 },
  ];

  const k = narrow ? 1.6 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0.8, 0);

  // How aligned the magnets are at a temperature: steep for the block, gentle for the grain.
  const align = (temp: number, steep: number) => 1 / (1 + Math.exp((temp - 0.5) * steep));

  return {
    scene,
    kit,
    labels,
    update: () => {
      const level = 0.3 + st.temp * 1.9;
      fluid.scale.y = level - 0.2;
      fluid.position.y = 0.2 + (level - 0.2) / 2;
      const set = (mags: THREE.Group[], a: number) => {
        for (const m of mags) {
          const w = Math.min(1, Math.max(0, a * 1.15 - m.userData.t * 0.15));
          m.rotation.set(0, m.userData.a * (1 - w), m.userData.b * (1 - w));
        }
      };
      set(blockMags, align(st.temp, 26));
      set(grainMags, align(st.temp, 5));
      ruler.visible = st.cases > 0.5;
      iris.setOpen(st.dial);
    },
    stops: [
      // 1 · Cooling iron: the block and the grain engrave in, magnets pointing every way.
      (tl, t, c) => {
        tl.addLabel("iron", t);
        tl.fromTo(
          kit.clip,
          { constant: -3.6 },
          { constant: 3.6, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.set(st, { temp: 1 }, t);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-1, 0.6, 0)) },
          { ...xyz(home), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-2, 2.6, 6)) },
          { ...xyz(view(0.6, 3, 7.6)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { block: 1, grain: 1 }, t + 2);
        lab(tl, c, { curie: 1 }, t + 2.6);
      },
      // 2 · Steep and gradual: cooling, the block lines up at once, the grain bit by bit.
      (tl, t, c) => {
        tl.addLabel("cool", t);
        lab(tl, c, { block: 0, grain: 0 }, t);
        cam(tl, c, home, view(-0.4, 3.2, 7.4), t, 2.4, EASE);
        tl.fromTo(st, { temp: 1 }, { temp: 0, duration: 3.4, ease: "none" }, t + 0.6);
        lab(tl, c, { steep: 1 }, t + 2.4);
        lab(tl, c, { gradual: 1 }, t + 3.4);
      },
      // 3 · Clear cases: a thermostat clearly not an observer, a person clearly one.
      (tl, t, c) => {
        tl.addLabel("cases", t);
        lab(tl, c, { steep: 0, gradual: 0, curie: 0 }, t);
        // The iron gives way to the clear cases.
        tl.set([cage, grainCage, thermo, ...blockMags, ...grainMags], { visible: false }, t + 0.3);
        show(tl, ruler, t + 0.2, 0);
        tl.set(st, { cases: 1, dial: 1 }, t + 0.2);
        cam(tl, c, V(0, 1.1, RZ), view(0, 1.4, 6.8), t, 2.6, EASE);
        lab(tl, c, { not: 1, is: 1 }, t + 1.8);
        lab(tl, c, { twi: 1 }, t + 2.4);
      },
      // 4 · A dial, not a switch: past the twilight, the aperture opens wider or narrower.
      (tl, t, c) => {
        tl.addLabel("dial", t);
        lab(tl, c, { not: 0, twi: 0 }, t);
        cam(tl, c, V(1.6, 1.4, RZ), view(1.2, 1.1, 6.4), t, 2.4, EASE);
        tl.to(st, { dial: 0.3, duration: 1.2, ease: "power2.inOut" }, t + 0.8);
        tl.to(st, { dial: 0.85, duration: 1.2, ease: "power2.inOut" }, t + 2.2);
        lab(tl, c, { dial: 1, is: 0 }, t + 1.2);
      },
    ],
  };
}
