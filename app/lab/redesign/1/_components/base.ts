export const BASE = "/lab/redesign/1";

const NUMERALS: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function roman(n: number) {
  let out = "";
  let rest = n;
  for (const [v, s] of NUMERALS) {
    while (rest >= v) {
      out += s;
      rest -= v;
    }
  }
  return out;
}
