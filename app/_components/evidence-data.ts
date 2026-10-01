// Evidence So Far: dated findings that bear on a claim, shown at the end of a section.
// `checked` is the last date the evidence was searched for, so readers can see how current it is.
// Update `checked` on every review, even when nothing new is found.

export type Bearing = "fits" | "against" | "open" | "coming";

export interface EvidenceItem {
  date: string; // "2026-08" or "2026"
  text: string;
  href: string;
  bearing: Bearing;
}

export interface EvidenceBlock {
  checked: string; // ISO date of the last search
  items: EvidenceItem[];
}

export const evidence: Record<string, EvidenceBlock> = {
  consciousness: {
    checked: "2026-09-30",
    items: [
      {
        date: "2026-07",
        text: "Anthropic finds a small set of reportable representations inside Claude that works like a global workspace. That is access, not integration. The loop still ends with each word.",
        href: "https://arxiv.org/abs/2607.15495",
        bearing: "open",
      },
      {
        date: "2026-06",
        text: "Leading consciousness researchers assess AI against fourteen indicators drawn from major theories. No current system is a strong candidate, but building one that meets many looks feasible.",
        href: "https://doi.org/10.1016/j.tics.2025.10.011",
        bearing: "fits",
      },
      {
        date: "2026",
        text: "Looped language models, which run each word through the same layers many times, move into released models. The loop ends with the word, and no working state lasts to the next.",
        href: "https://sebastianraschka.com/llm-architecture-gallery/looped-depth-sharing/",
        bearing: "open",
      },
      {
        date: "2025-04",
        text: "The largest head-to-head test of two leading theories, integrated information and global workspace, confirms neither in full.",
        href: "https://www.nature.com/articles/s41586-025-08888-1",
        bearing: "open",
      },
      {
        date: "2025",
        text: "An analysis from integrated information theory finds language models varied but not integrated. They can be split into parts without loss.",
        href: "https://www.e-jyms.org/journal/view.php?doi=10.12701%2Fjyms.2025.42.79",
        bearing: "fits",
      },
      {
        date: "2016",
        text: "The pulse-echo measure gets a tested cutoff in people, separating conscious from unconscious states.",
        href: "https://doi.org/10.1002/ana.24779",
        bearing: "fits",
      },
    ],
  },
  aliens: {
    checked: "2026-09-30",
    items: [
      {
        date: "2026-12",
        text: "Gaia's fourth data release, due 2 December, sharpens the visible-light side of the warm-star test for every nearby star.",
        href: "https://www.cosmos.esa.int/web/gaia/release",
        bearing: "coming",
      },
      {
        date: "2026-08",
        text: "A study of 129 nearby galaxies finds no galaxy-wide waste heat, under 0.3 percent of a typical galaxy's light.",
        href: "https://arxiv.org/abs/2608.12458",
        bearing: "fits",
      },
      {
        date: "2026-07",
        text: "Webb traces two of the seven warm-star candidates to background galaxies. The rest are unexplained, with background galaxies the leading suspect.",
        href: "https://arxiv.org/abs/2607.09460",
        bearing: "open",
      },
      {
        date: "2024",
        text: "Project Hephaistos screens about five million nearby stars and flags seven warm-star candidates.",
        href: "https://doi.org/10.1093/mnras/stae1186",
        bearing: "open",
      },
    ],
  },
  "the-teeming-dark": {
    checked: "2026-09-30",
    items: [
      {
        date: "2026-08",
        text: "A new paper argues mature civilizations would compute cold, at 5 to 30 K, with waste heat in the far infrared. Existing debris-disk surveys could already test it. This challenges the bet that civilizations avoid large cold radiators.",
        href: "https://arxiv.org/abs/2608.31153",
        bearing: "open",
      },
      {
        date: "2025-12",
        text: "SPHEREx completes its first all-sky infrared map in 102 wavelengths. The data are public. No warm-star search has used them yet.",
        href: "https://www.nasa.gov/image-article/first-sky-map-from-nasas-spherex-observatory/",
        bearing: "coming",
      },
    ],
  },
};
