/**
 * Deterministic pseudo-random generator (mulberry32).
 *
 * Animations that scatter particles/lines need randomness that is stable
 * between the server render and the client hydration pass — Math.random()
 * produces different coordinates on each and React reports a hydration
 * mismatch. Seed this with a constant per component instead.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
