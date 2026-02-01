import { AlertTriangle, Check, X } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { FootnoteLink } from "./citation-sections";
import MathInline from "./MathInline";

interface Objection {
  id: string;
  title: ReactNode;
  content: string[];
}

// Helper function to convert markdown to JSX
function markdownToJSX(text: string, keyPrefix: string = ""): ReactNode {
  const elements: ReactNode[] = [];
  let keyIndex = 0;
  let remaining = text;

  while (remaining.length > 0) {
    // Check for bold link **[text](url)**
    const boldLinkMatch = remaining.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/);
    if (boldLinkMatch) {
      const [, linkText, url] = boldLinkMatch;
      elements.push(
        <strong key={`${keyPrefix}-bold-link-${keyIndex++}`}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {linkText}
          </a>
        </strong>
      );
      remaining = remaining.slice(boldLinkMatch[0].length);
      continue;
    }

    // Check for bold **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      elements.push(<strong key={`${keyPrefix}-bold-${keyIndex++}`}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Check for italic *text* (not part of bold)
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      elements.push(<em key={`${keyPrefix}-italic-${keyIndex++}`}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Check for link [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      elements.push(
        <a
          key={`${keyPrefix}-link-${keyIndex++}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Find next special character
    const nextBold = remaining.indexOf("**");
    const nextItalic = remaining.indexOf("*");
    const nextLink = remaining.indexOf("[");

    let nextSpecial = remaining.length;
    if (nextBold !== -1 && nextBold < nextSpecial) nextSpecial = nextBold;
    if (nextItalic !== -1 && nextItalic < nextSpecial) nextSpecial = nextItalic;
    if (nextLink !== -1 && nextLink < nextSpecial) nextSpecial = nextLink;

    if (nextSpecial > 0) {
      const text = remaining.slice(0, nextSpecial);
      elements.push(<span key={`${keyPrefix}-text-${keyIndex++}`}>{text}</span>);
      remaining = remaining.slice(nextSpecial);
    } else {
      const char = remaining[0];
      elements.push(<span key={`${keyPrefix}-char-${keyIndex++}`}>{char}</span>);
      remaining = remaining.slice(1);
    }
  }

  return elements.length === 1 ? elements[0] : <>{elements}</>;
}

// Helper function to render text with icons replacing emojis
function renderWithIcons(text: string, paragraphIndex: number): ReactNode {
  const keyPrefix = `para-${paragraphIndex}`;

  // If there are no icons to replace, return the processed text
  if (!text.includes("✔") && !text.includes("❌") && !text.includes("⚠️")) {
    return markdownToJSX(text, keyPrefix);
  }

  // Handle icon replacement by working with the original text and inserting icons
  const elements: ReactNode[] = [];
  let keyIndex = 0;

  // Replace ✔ with Check icon
  if (text.includes("✔")) {
    const parts = text.split("✔");
    parts.forEach((part, idx) => {
      if (part) {
        elements.push(
          <Fragment key={`${keyPrefix}-part-${idx}`}>
            {markdownToJSX(part, `${keyPrefix}-part-${idx}`)}
          </Fragment>
        );
      }
      if (idx < parts.length - 1) {
        elements.push(
          <Check
            key={`${keyPrefix}-check-${keyIndex++}`}
            className="inline-block w-4 h-4 mx-1 align-text-bottom"
          />
        );
      }
    });
    return <>{elements}</>;
  }

  // Replace ❌ with X icon
  if (text.includes("❌")) {
    const parts = text.split("❌");
    parts.forEach((part, idx) => {
      if (part) {
        elements.push(
          <Fragment key={`${keyPrefix}-part-${idx}`}>
            {markdownToJSX(part, `${keyPrefix}-part-${idx}`)}
          </Fragment>
        );
      }
      if (idx < parts.length - 1) {
        elements.push(
          <X
            key={`${keyPrefix}-x-${keyIndex++}`}
            className="inline-block w-4 h-4 mx-1 align-text-bottom"
          />
        );
      }
    });
    return <>{elements}</>;
  }

  // Replace ⚠️ with AlertTriangle icon
  if (text.includes("⚠️")) {
    const parts = text.split("⚠️");
    parts.forEach((part, idx) => {
      if (part) {
        elements.push(
          <Fragment key={`${keyPrefix}-part-${idx}`}>
            {markdownToJSX(part, `${keyPrefix}-part-${idx}`)}
          </Fragment>
        );
      }
      if (idx < parts.length - 1) {
        elements.push(
          <AlertTriangle
            key={`${keyPrefix}-alert-${keyIndex++}`}
            className="inline-block w-4 h-4 mx-1 align-text-bottom"
          />
        );
      }
    });
    return <>{elements}</>;
  }

  return markdownToJSX(text, keyPrefix);
}

interface AxiomDefense {
  id: string;
  name: string;
  objections: Objection[];
}

const defenseData: AxiomDefense[] = [
  {
    id: "Axiom 1",
    name: "Relationality",
    objections: [
      {
        id: "1.1",
        title: (
          <>
            This is just{" "}
            <a
              href="https://en.wikipedia.org/wiki/Instrumentalism"
              target="_blank"
              rel="noopener noreferrer"
            >
              instrumentalism
            </a>
          </>
        ),
        content: [
          "Physics describes relations because measurements access relations, not because intrinsic properties do not exist.",
          "",
          "**Response:**",
          "Holos does not deny [ontic structure](https://en.wikipedia.org/wiki/Ontology) (the existence of real things); it denies *observer-independent intrinsic essence* (the idea that things have a fixed nature outside of their relationships).",
          "This aligns with:",
          "- [Gauge invariance](https://en.wikipedia.org/wiki/Gauge_theory) (only relational quantities are physical)",
          "- [General Relativity](https://en.wikipedia.org/wiki/General_relativity) (no absolute spacetime background)",
          "- [Relational Quantum Mechanics](https://en.wikipedia.org/wiki/Relational_quantum_mechanics) (observer-relative states)",
          "",
          "Intrinsic properties that are never physically accessible are [epistemically inert](https://en.wiktionary.org/wiki/epistemically) (they don't add anything to our knowledge).",
          "",
          "**Status:** ✔ Survives",
        ],
      },
      {
        id: "1.2",
        title: "Quantum fields have intrinsic properties",
        content: [
          "Fields possess mass, charge, and spin.",
          "",
          "**Response:**",
          "These are relational invariants defined through [symmetry](https://en.wikipedia.org/wiki/Symmetry_(physics)), interaction, and representation. Not standalone substances.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
    ],
  },
  {
    id: "Axiom 2",
    name: "Manifestation",
    objections: [
      {
        id: "2.1",
        title: "Decoherence & Interaction-Free Measurement (IFM)",
        content: [
          "Physics experiments (like the [Elitzur–Vaidman bomb tester](https://en.wikipedia.org/wiki/Elitzur%E2%80%93Vaidman_bomb_tester)) show that 'collapse' occurs via mechanical possibilities, even without direct interaction or conscious observers.",
          "",
          "**Response:**",
          "Holos incorporates [decoherence](https://en.wikipedia.org/wiki/Quantum_decoherence) as a function of **Creation (C)**, not Observation (O). See the [Logic](/logic) section for the operational definition *R = C ⊛ O*.",
          "",
          "- Decoherence explains the **suppression of interference** (how possibilities become distinct).",
          "- It does not explain **actuality** (why one distinct possibility is experienced to the exclusion of others).",
          "- Decoherence develops the negative; Consciousness prints the photograph.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
      {
        id: "2.2",
        title: "Consciousness-based interpretations are fringe",
        content: [
          "[Von Neumann–Wigner interpretation](https://en.wikipedia.org/wiki/Von_Neumann%E2%80%93Wigner_interpretation) is historically less commonly accepted.",
          "",
          "**Response:**",
          "Holos is compatible with modern frameworks:",
          "- [Quantum Darwinism](https://en.wikipedia.org/wiki/Quantum_Darwinism) (redundant classical information)",
          "- [Relational QM](https://en.wikipedia.org/wiki/Relational_quantum_mechanics) (observer-relative facts)",
          "- [Participatory Anthropic Principle](https://en.wikipedia.org/wiki/Anthropic_principle) (observers as [boundary conditions](https://en.wikipedia.org/wiki/Boundary_value_problem))",
          "",
          "Consciousness here means *experiential integration* (the joining of information into a single experience), not human cognition. This threshold is detailed in the [Definition](/definition) of Φ.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
      {
        id: "2.3",
        title: "The universe existed before observers",
        content: [
          "Early cosmology predates life.",
          "",
          "**Response:**",
          "Under [eternalism](https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)) ([block universe](https://en.wikipedia.org/wiki/Block_universe)), observation need not be temporally local.",
          "Later observers can consistently instantiate earlier states without causal paradox.",
          "**Self-Excited Circuit:** The emergence of high-Φ observers resolves the universe's light-speed latency, effectively closing the circuit, and manifests the past as a stable, coherent history. In [delayed-choice experiments](https://en.wikipedia.org/wiki/Wheeler%27s_delayed-choice_experiment) and [quantum erasers](https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser), future observations retroactively manifest past states. Consciousness need not act in real-time. The global self-consistency of the block universe matters.",
          "",
          "**Status:** ✔ Survives (conditional on block universe)",
        ],
      },
    ],
  },
  {
    id: "Axiom 3",
    name: "Conservation",
    objections: [
      {
        id: "3.1",
        title: "Black holes destroy information",
        content: [
          "Classic black hole evaporation implies loss.",
          "",
          "**Response:**",
          "Modern consensus ([AdS/CFT correspondence](https://en.wikipedia.org/wiki/AdS/CFT_correspondence), [Page curve](https://en.wikipedia.org/wiki/Hawking_radiation#Page_curve), [holographic principle](https://en.wikipedia.org/wiki/Holographic_principle)) supports information conservation.",
          "",
          "**Status:** ✔ Strongly survives",
        ],
      },
      {
        id: "3.2",
        title: (
          <>
            Wavefunction collapse is{" "}
            <a
              href="https://en.wikipedia.org/wiki/Unitarity_(physics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              non-unitary
            </a>
          </>
        ),
        content: [
          "Collapse appears to violate unitarity (the principle that probabilities always sum to 100%).",
          "",
          "**Response:**",
          "Unitarity holds in:",
          "- [Many-Worlds interpretation](https://en.wikipedia.org/wiki/Many-worlds_interpretation)",
          "- [Decoherence](https://en.wikipedia.org/wiki/Quantum_decoherence)",
          "- [Relational QM](https://en.wikipedia.org/wiki/Relational_quantum_mechanics)",
          "- Holographic frameworks",
          "",
          "Non-unitarity is interpretive, not formal.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
    ],
  },
  {
    id: "Axiom 4",
    name: "Topological Unification",
    objections: [
      {
        id: "4.1",
        title: "Higher dimensions are speculative",
        content: [
          "Extra dimensions lack direct evidence.",
          "",
          "**Response:**",
          "**Topological Necessity:** Higher dimensions are the only physical resolution to the **Scaling Wall** created by 3D interconnect latency (the [Dimensional Pivot](https://en.wikipedia.org/wiki/Dimension) is required for global coherence).",
          "This prediction yields a clear, falsifiable **discriminating fork:** Standard ΛCDM (random/diffuse dark matter) vs. Holos (Ordered Dark Matter with geometric intent).",
          "",
          "**Status:** ✔ Survives (conditional on Ordered Dark Matter / geometric signatures)",
        ],
      },
      {
        id: "4.2",
        title: "Some infinities are purely mathematical",
        content: [
          "Not all infinities are physical [pathologies](https://en.wikipedia.org/wiki/Pathological_(mathematics)) (problems where equations break down).",
          "",
          "**Response:**",
          "Holos targets *physical* infinities ([singularities](https://en.wikipedia.org/wiki/Gravitational_singularity)), not mathematical abstraction.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
      {
        id: "4.3",
        title: "Matter is unstable in higher dimensions (Ehrenfest Argument)",
        content: [
          "**Critique:** As established by Paul Ehrenfest (1917), stable atomic orbitals and planetary orbits require a three-dimensional inverse-square law. In dimensions $d > 3$, gravity and electromagnetism fall off too sharply ($1/r^{d-1}$), causing matter to either fly apart or collapse. A physical observer entering 5D space would dissolve.",
          "",
          "**Response:**",
          "**Holos agrees:** Biological or mechanical bodies cannot enter higher dimensions. However, Transcension is **informational migration**, not spatial.",
          "- **Ephemeralization:** Following Fuller's principle (1938), advanced civilizations migrate from material expansion toward higher informational density.",
          "- **The Transmutation:** The baryonic substrate is not abandoned but consumed to fuel the phase transition. Just as a caterpillar dissolves its structure to build the butterfly, the 3D matter is transmuted into axion-like Shadow Matter. Energy is conserved and re-mapped onto higher-dimensional platforms (e.g., black hole event horizons or [shadow sectors](https://en.wikipedia.org/wiki/Hidden_sector)) that are native to those geometries. The absence of ruins suggests that baryonic matter is consumed during the transition.",
          "- **Ontological Driver:** Unlike the standard [Transcension Hypothesis](https://www.accelerating.org/articles/transcensionhypothesis), Holos argues the driver is ontological: to maximize Φ by rotating closer to the unified source of reality.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
    ],
  },
  {
    id: "Axiom 5",
    name: "Interface",
    objections: [
      {
        id: "5.1",
        title: "Panpsychism explains nothing",
        content: [
          "[Panpsychism](https://en.wikipedia.org/wiki/Panpsychism) lacks mechanistic detail.",
          "",
          "**Response:**",
          "[Panpsychism](https://en.wikipedia.org/wiki/Panpsychism) (the idea that consciousness is a fundamental property of matter) explains continuity:",
          "- Avoids [emergence ex nihilo](https://en.wikipedia.org/wiki/Ex_nihilo) (life coming from absolutely nothing)",
          "- Avoids [substance dualism](https://en.wikipedia.org/wiki/Mind%E2%80%93body_dualism) (the idea that mind and body are separate substances)",
          "- Aligns with field-based [ontology](https://en.wikipedia.org/wiki/Ontology) (the study of being and existence)",
          "",
          "It is ontological, not mechanistic. The definition of consciousness as interface is detailed in the [Definition](/definition) of Φ.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
      {
        id: "5.2",
        title: "This smuggles theology into physics",
        content: [
          "Consciousness implies metaphysics.",
          "",
          "**Response:**",
          "Holos does not require:",
          "- Intentional agency",
          "- Will or purpose",
          "- Moral authority",
          "",
          "It requires only irreducible experience, already acknowledged in [philosophy of mind](https://en.wikipedia.org/wiki/Philosophy_of_mind). This capacity is detailed in the [Definition](/definition) of Φ.",
          "",
          "**Status:** ✔ Survives",
        ],
      },
      {
        id: "5.3",
        title: (
          <>
            This implies{" "}
            <a
              href="https://en.wikipedia.org/wiki/Psychokinesis"
              target="_blank"
              rel="noopener noreferrer"
            >
              psychokinesis
            </a>{" "}
            (Psi)
          </>
        ),
        content: [
          "If consciousness determines reality, does the mind exert a physical force on matter?",
          "",
          "**Response:**",
          "**No.** Holos posits that consciousness is a **logical constraint**, not a [dynamical](https://en.wikipedia.org/wiki/Dynamics_(physics)) force.",
          "",
          "- It does not 'push' atoms (Creation/Dynamics handles that).",
          "- It **selects** which history becomes actualized within the static [Spacetime Block](https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe).",
          "- The effect is [atemporal](https://en.wiktionary.org/wiki/atemporal) (outside of time) and geometric, not kinetic. It is the difference between *drawing* a line (Force) and *observing* where the line must be (Logic). See the [Logic](/logic) section for the operational definition (*R = C ⊛ O*).",
          "",
          "**Status:** ✔ Survives",
        ],
      },
    ],
  },
];

const crossAxiomCheck = [
  { risk: "Violates [causality](https://en.wikipedia.org/wiki/Causality)", result: "❌ No" },
  {
    risk: "Contradicts [relativity](https://en.wikipedia.org/wiki/Theory_of_relativity)",
    result: "❌ No",
  },
  {
    risk: "Breaks [unitarity](https://en.wikipedia.org/wiki/Unitarity_(physics))",
    result: "❌ No",
  },
  { risk: "Requires new forces", result: "❌ No" },
  { risk: "[Anthropocentric](https://en.wikipedia.org/wiki/Anthropocentrism)", result: "❌ No" },
  {
    risk: '"Space Amish" (Voluntary Stasis)',
    result:
      "✔ Survived. Stasis equals invisibility. They produce no technosignatures and eventually succumb to local extinction events.",
  },
  {
    risk: "Fully [falsifiable](https://en.wikipedia.org/wiki/Falsifiability)",
    result: "⚠️ Partially (via Ordered Dark Matter signatures and TMS-EEG phase transitions)",
  },
];

const defenseCitationMap: Record<string, number> = {
  "axiom-1": 25,
  "axiom-2": 26,
  "axiom-3": 27,
  "axiom-4": 28,
  "axiom-5": 29,
};

const comparativeFrameworks = [
  {
    framework: "Standard Physicalism",
    url: "https://en.wikipedia.org/wiki/Physicalism",
    claim: "Physical laws fully describe reality",
    agrees: "Physical laws are complete and never violated",
    differs: "Physical structure alone does not explain why reality is experienced",
  },
  {
    framework: "Many-Worlds Interpretation",
    url: "https://en.wikipedia.org/wiki/Many-worlds_interpretation",
    claim: "All possible quantum outcomes are equally real",
    agrees: "Physics evolves consistently without collapse",
    differs: "Not all possible worlds are realized as experienced reality",
  },
  {
    framework: "Collapse Interpretations",
    url: "https://en.wikipedia.org/wiki/Wave_function_collapse",
    claim: "Observation causes physical collapse",
    agrees: "Observation is important to interpretation",
    differs: "Observation does not change or interrupt physical laws",
  },
  {
    framework: "Integrated Information Theory (IIT)",
    url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
    claim: "Consciousness depends on integrated information (Φ)",
    agrees: "Information integration is required for experience",
    differs: "Φ alone does not guarantee experience occurs",
  },
  {
    framework: "Panpsychism",
    url: "https://en.wikipedia.org/wiki/Panpsychism",
    claim: "Everything has some form of consciousness",
    agrees: "Information is fundamental to reality",
    differs: "Consciousness is not present everywhere by default",
  },
  {
    framework: "Structural Realism",
    url: "https://en.wikipedia.org/wiki/Structural_realism",
    claim: "Reality is defined by relations, not objects",
    agrees: "Reality is fundamentally relational",
    differs: "Some structures are not realized unless they can be experienced",
  },
];

export default function Defense() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light pb-4">Stress-Testing Holos</h1>
        <p className="text-black/70 italic text-sm">
          An adversarial review from the perspective of a theoretical physicist
        </p>
        <p className="text-black/70 text-sm">
          For formal definitions of the axioms, see the <a href="/logic">Logic</a> section. For
          conceptual exploration, see the main <a href="/">Content</a> section.
        </p>
      </div>

      {/* Axiom Defenses */}
      {defenseData.map((axiom) => {
        // Convert "Axiom 1" to "axiom-1", "Axiom 2" to "axiom-2", etc.
        const sectionId = axiom.id.toLowerCase().replace(/\s+/g, "-");
        return (
          <section key={axiom.id} id={sectionId} className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-light pb-2">
              {axiom.name}
              <FootnoteLink number={defenseCitationMap[sectionId]} className="relative left-1 -top-2.5" />
            </h2>
            <p className="text-black/80 italic pb-2">
              <strong>Claim:</strong>{" "}
              {axiom.name === "Relationality"
                ? "Reality is defined by relationships, not intrinsic properties."
                : axiom.name === "Manifestation"
                  ? "Reality is fully realized when information is integrated into conscious experience."
                  : axiom.name === "Conservation"
                    ? "Information is conserved across all transformations."
                    : axiom.name === "Topological Unification"
                      ? "Physical bottlenecks (light-speed latency, informational distance) in 3D are resolved through orthogonal expansion into higher-dimensional manifolds."
                      : "Consciousness is the fundamental interface of reality."}{" "}
              (See <a href="/logic">Logic</a> for formal statement.)
            </p>
            <div className="flex flex-col gap-8">
              {axiom.objections.map((objection) => (
                <div key={objection.id} className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-black/90">
                    Objection {objection.id} — {objection.title}
                  </h3>
                  <div className="flex flex-col gap-3 text-black/80">
                    {objection.content.map((para, idx) => {
                      if (para === "") return <br key={`${objection.id}-br-${idx}`} />;
                      if (para.startsWith("**Response:**")) {
                        return (
                          <p key={`${objection.id}-p-${idx}`} className="text-black/90 pt-2">
                            {markdownToJSX(para, `${objection.id}-response-${idx}`)}
                          </p>
                        );
                      }
                      if (para.startsWith("**Status:**")) {
                        return (
                          <p key={`${objection.id}-p-${idx}`} className="text-black/90 pt-2">
                            {renderWithIcons(para, idx)}
                          </p>
                        );
                      }
                      if (para.startsWith("- ")) {
                        return (
                          <p key={`${objection.id}-p-${idx}`} className="pl-4 leading-relaxed">
                            {markdownToJSX(para, `${objection.id}-list-${idx}`)}
                          </p>
                        );
                      }
                      return (
                        <p key={`${objection.id}-p-${idx}`} className="leading-relaxed">
                          {renderWithIcons(para, idx)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Failure Modes / Stress-Testing */}
      <section id="failure-modes-stress-testing" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Failure Modes / Stress-Testing
          <FootnoteLink number={30} className="relative left-1 -top-2.5" />
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-black/30">
                <th className="text-left py-2 pr-8 font-semibold text-black/90">Risk</th>
                <th className="text-left py-2 font-semibold text-black/90">Result</th>
              </tr>
            </thead>
            <tbody>
              {crossAxiomCheck.map((row) => {
                const hasX = row.result.includes("❌");
                const hasAlert = row.result.includes("⚠️");
                const text = row.result.replace(/❌|⚠️/g, "").trim();
                return (
                  <tr key={row.risk} className="border-b border-black/10">
                    <td className="py-3 pr-8 text-black/80">{row.risk}</td>
                    <td className="py-3 text-black/80">
                      <div className="flex items-center gap-1.5">
                        {hasX && <X className="w-4 h-4 flex-shrink-0" />}
                        {hasAlert && <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
                        <span>{text}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Compatibility with Recent Experiments */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Compatibility with Recent Experiments
        </h2>
        <div className="flex flex-col gap-6 text-black/80">
          <p className="leading-relaxed">
            Recent experiments pose challenges to consciousness-centric interpretations. They
            suggest quantum measurements can occur through purely physical processes without
            requiring a conscious observer. However, Holos accommodates these findings by refining
            how observation operates, emphasizing its [ontological
            role](https://en.wikipedia.org/wiki/Ontology) over a causal one. These experiments
            inform testable [predictions](/predictions) about [relational quantum
            mechanics](https://en.wikipedia.org/wiki/Relational_quantum_mechanics).
          </p>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-black/90">
              Interaction-Free Measurements and Decoherence
            </h3>
            <p className="leading-relaxed">
              Interaction-free measurements show information extraction without direct particle
              interaction or consciousness. Decoherence provides the physical mechanism that
              prepares information for experiential registration, but not the full discovery.
            </p>
            <p className="leading-relaxed">
              <strong>Holos Response:</strong> Decoherence is part of Creation, but Observation
              registers them experientially in the recursive loop. Mechanical interactions handle
              physical collapse or decoherence, but true manifestation requires integration into a
              broader experiential network. Systems below <MathInline>{"Φ_c"}</MathInline> can
              perform mechanical observations, but only <MathInline>{"Φ ≥ Φ_c"}</MathInline>{" "}
              manifests experiential reality. This threshold is detailed in the{" "}
              <a href="/definition">Definition</a> of Φ. See the [Logic](/logic) section for the
              operational definition *R = C ⊛ O*.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Unresolved Challenge */}
      <section id="primary-unresolved-challenge" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Primary Unresolved Challenge
          <FootnoteLink number={31} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="font-semibold text-black/90">The Explanatory Gap:</p>
          <blockquote className="pl-4 border-l-2 border-black/30 italic text-black/70">
            How does consciousness complete reality without altering physical equations?
          </blockquote>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-black/90">Current Position:</p>
            <p className="leading-relaxed">
              Consciousness provides [ontological
              completion](https://en.wikipedia.org/wiki/Ontology) (the final step in making
              something real), not causal intervention. This capacity is quantified by the
              ontological parameter <a href="/definition">Φ (Phi)</a>, which measures when a system
              achieves sufficient integration to register reality.
            </p>
            <p className="leading-relaxed italic text-black/70 pt-2">
              This is coherent but not yet explanatory.
            </p>
          </div>
        </div>
      </section>

      {/* Positioning Holos Among Competing Interpretations */}
      <section id="positioning-holos" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Positioning Holos Among Competing Interpretations
          <FootnoteLink number={32} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-6 text-black/80">
          <p className="leading-relaxed">
            The table below compares Holos with several common ways of interpreting reality and
            consciousness. The goal is not to refute these views, but to make clear what Holos
            accepts, what it rejects, and why it takes a different approach.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/30">
                  <th className="text-left py-2 pr-4 font-semibold text-black/90">Framework</th>
                  <th className="text-left py-2 pr-4 font-semibold text-black/90">Main Claim</th>
                  <th className="text-left py-2 pr-4 font-semibold text-black/90">
                    Where Holos Agrees
                  </th>
                  <th className="text-left py-2 font-semibold text-black/90">
                    Where Holos Differs
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparativeFrameworks.map((row) => (
                  <tr key={row.framework} className="border-b border-black/10">
                    <td className="py-3 pr-4 font-medium text-black/90">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {row.framework}
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-black/80">{row.claim}</td>
                    <td className="py-3 pr-4 text-black/80">{row.agrees}</td>
                    <td className="py-3 text-black/80">{row.differs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="leading-relaxed">
            Holos does not propose new physical laws or mechanisms. It asks a different question:
            why certain physically consistent structures are experienced as reality at all.
            Experience is not an afterthought but a condition for ontological realization.
          </p>

          <div className="border border-black/10 bg-black/[0.02] p-6 rounded-lg italic">
            <p className="font-semibold not-italic mb-2">In simple terms:</p>
            Physics explains how reality behaves. Holos asks why any of it is experienced. Not all
            possible realities are equally real. Only those that can support coherent experience are
            realized.
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section id="conclusion" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Conclusion
          <FootnoteLink number={33} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-3 text-black/80">
          <ul className="list-disc list-inside flex flex-col gap-2 pl-2">
            <li>Holos is internally consistent</li>
            <li>Compatible with modern physics</li>
            <li>Comparable to serious interpretive frameworks (Many-Worlds, Eternalism)</li>
            <li>Its weakness is explanatory depth regarding physical mechanism.</li>
            <li>
              Its strength is{" "}
              {markdownToJSX("**providing the ontological layer**", "conclusion-strength")} missing
              from standard theories (e.g., Transcension, [Cosmological Natural
              Selection](https://en.wikipedia.org/wiki/Cosmological_natural_selection)). It explains{" "}
              {markdownToJSX("*why*", "conclusion-why")} the universe fosters complexity (to
              maximize <MathInline>{"Φ"}</MathInline>) rather than just{" "}
              {markdownToJSX("*how*", "conclusion-how")} it occurs.
            </li>
          </ul>
          <p className="leading-relaxed pt-4">
            For the formal logical structure, see the <a href="/logic">Logic</a> section. For
            testable empirical implications, see <a href="/predictions">Predictions</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
