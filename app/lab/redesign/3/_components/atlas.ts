// Atlas constants shared by its server and client files.

export const BASE = "/lab/redesign/3";

// The Overview's sections grouped into parts, in the order the Introduction itself gives:
// the opening, then the core, then the companion ideas, and last, why we are here.
export const PARTS = [
  { numeral: "I", title: "Opening", ids: ["introduction"] },
  {
    numeral: "II",
    title: "The core",
    ids: ["consciousness", "spacetime", "infinity", "omega-point"],
  },
  { numeral: "III", title: "Companion ideas", ids: ["aliens", "the-teeming-dark"] },
  { numeral: "IV", title: "Meaning", ids: ["why"] },
] as const;

export const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Logic's sections grouped for the apparatus index.
export const LOGIC_GROUPS = [
  {
    title: "Foundations",
    ids: ["minimal-core", "primitive-definitions", "logic-axioms", "foundational-propositions"],
  },
  { title: "The two additions", ids: ["ontology", "totality"] },
  {
    title: "Relations",
    ids: ["relationship-to-physics", "mathematical-formalism", "comparison", "mind-comparison"],
  },
  { title: "Open problems", ids: ["open-problems"] },
] as const;

// The five axioms by their existing titles; Axioms 3 and 5 are the two additions.
export const AXIOMS = [
  { n: 1, title: "Relationality", kind: "side" },
  { n: 2, title: "Conservation", kind: "side" },
  { n: 3, title: "Threshold", kind: "addition" },
  { n: 4, title: "Two Sides", kind: "side" },
  { n: 5, title: "Totality", kind: "addition" },
] as const;
