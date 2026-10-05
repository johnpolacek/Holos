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
    checked: "2026-10-01",
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
    checked: "2026-10-01",
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
    checked: "2026-10-01",
    items: [
      {
        date: "2026-09",
        text: "NASA selects PRIMA, a far-infrared space telescope due around 2033. It could see the cold glow of computing far from a star.",
        href: "https://www.mpia.de/news/2026-prima-phase-b",
        bearing: "coming",
      },
      {
        date: "2026-08",
        text: "A preprint argues mature civilizations may compute cold, at about 5 to 30 K, far from their star, with waste heat in the far infrared. Archived dust-disk surveys could in principle test it. Holos widened its signature in response.",
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
  "test-a": {
    checked: "2026-10-01",
    items: [
      {
        date: "2026-06",
        text: "A bedside EEG measure, taken without the magnetic pulse, predicts the pulse-echo score in brain-injured patients. A step toward measuring integration more widely. Preprint.",
        href: "https://www.biorxiv.org/content/10.64898/2026.06.04.730221v1",
        bearing: "coming",
      },
      {
        date: "2025",
        text: "An open database of 2,643 sleep awakenings with dream reports and EEG. Usable to calibrate the test, though it lacks the pulse the main gauge needs.",
        href: "https://doi.org/10.1038/s41467-025-61945-1",
        bearing: "coming",
      },
      {
        date: "2025",
        text: "The nearest test yet. 82 percent of awakenings from deep propofol sedation brought reports of experience, and two complexity measures did not differ between awakenings with and without it. Not decisive. Its measurements ended a minute before each awakening, and only five awakenings brought no report.",
        href: "https://doi.org/10.1038/s41598-025-12695-z",
        bearing: "against",
      },
      {
        date: "2022",
        text: "Complexity in ordinary sleep EEG falls with sleep depth but does not separate dreaming from dreamless awakenings. A caution for gauges without the pulse.",
        href: "https://doi.org/10.3389/fnhum.2022.987714",
        bearing: "against",
      },
      {
        date: "2018",
        text: "Most people made unresponsive by anesthetics report experiences afterward, mostly dreams. Not responding is not the same as no one home.",
        href: "https://doi.org/10.1016/j.bja.2018.03.014",
        bearing: "fits",
      },
      {
        date: "2017",
        text: "Whether a dream is reported, in REM or non-REM sleep, tracks local activity in the back of the cortex. The local gauge was adopted after this result, so it cannot count as confirmation.",
        href: "https://doi.org/10.1038/nn.4545",
        bearing: "fits",
      },
      {
        date: "2016",
        text: "Measured just before waking from non-REM sleep, the brain's echo looked more like the unconscious pattern when people then reported nothing. The local gauge was adopted after this result, so it cannot count as confirmation.",
        href: "https://doi.org/10.1038/srep30932",
        bearing: "fits",
      },
    ],
  },
  "test-b": {
    checked: "2026-10-01",
    items: [
      {
        date: "2026-02",
        text: "Forty-five human forebrain organoids show near-critical dynamics on their own, with no outside input. Size comparisons are not yet reported. Preprint.",
        href: "https://doi.org/10.21203/rs.3.rs-8640242/v1",
        bearing: "open",
      },
      {
        date: "2026-02",
        text: "Organoids keep growing in size and complexity, with programs aiming far past today's tens of millions of neurons. The size range Test B needs is opening up.",
        href: "https://undark.org/2026/02/26/brain-organoids-big-questions/",
        bearing: "coming",
      },
      {
        date: "2022",
        text: "Neurons grown on a chip learn to play Pong. Far simpler than any brain, and claims of sentience were widely criticized.",
        href: "https://pubmed.ncbi.nlm.nih.gov/36228614/",
        bearing: "open",
      },
    ],
  },
  "check-c": {
    checked: "2026-10-01",
    items: [
      {
        date: "2026-09",
        text: "Extended Wigner's friend tests run on quantum computers with agent-like friends. Every agent tested violates the Local Friendliness bound.",
        href: "https://arxiv.org/abs/2609.12527",
        bearing: "fits",
      },
      {
        date: "2020",
        text: "The first photonic test of Local Friendliness. Observed events, locality, and free choice cannot all hold. Holos gives up the first.",
        href: "https://doi.org/10.1038/s41567-020-0990-x",
        bearing: "fits",
      },
    ],
  },
  "standing-bet": {
    checked: "2026-10-01",
    items: [
      {
        date: "2021",
        text: "An underground experiment rules out the simplest gravity-driven collapse model, the one linked to quantum theories of consciousness. Modified versions survive.",
        href: "https://doi.org/10.1038/s41567-020-1008-4",
        bearing: "fits",
      },
    ],
  },
  speculation: {
    checked: "2026-10-01",
    items: [
      {
        date: "2026-12",
        text: "Gaia's fourth data release, due 2 December, extends the star-by-star census for warm, dimmed stars.",
        href: "https://www.cosmos.esa.int/web/gaia/release",
        bearing: "coming",
      },
      {
        date: "2026-07",
        text: "Webb traces two of seven warm-star candidates to background galaxies. The rest are unexplained so far.",
        href: "https://arxiv.org/abs/2607.09460",
        bearing: "open",
      },
      {
        date: "2025-10",
        text: "A study sets out what self-copying probes in our solar system would leave behind, and where to look.",
        href: "https://arxiv.org/abs/2510.00082",
        bearing: "coming",
      },
    ],
  },
};
