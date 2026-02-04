import { FootnoteLink } from "./citation-sections";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

export default function Definition() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light pb-4">
          Definition: The Ontological Parameter (Φ)
        </h1>
        <p className="text-black/70 text-sm">
          Φ (Phi) measures a system’s capacity for ontological registration (experience of a
          definite state). For the formal operational definition <em>R = C ⊛ O</em>, see the{" "}
          <a href="/logic">Logic</a> section. For conceptual exploration, see the main{" "}
          <a href="/">Content</a> section.
        </p>
      </div>

      {/* 1. The Purpose of Φ */}
      <section id="1-the-purpose-of" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">1. The Purpose of Φ</h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            In the <a href="/">Holos framework</a>, <strong>Φ (Phi)</strong> is a fundamental{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Ontology"
                target="_blank"
                rel="noopener noreferrer"
              >
                ontological
              </a>{" "}
              parameter
            </strong>
            <FootnoteLink number={20} />.
          </p>

          <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
            <strong>Definition:</strong> Φ quantifies how strongly a system integrates information,
            giving it the capacity to <em>register</em> (experience) a distinct ontological state.
          </blockquote>

          <p className="leading-relaxed">
            Φ acts as the threshold function for <a href="/logic#axioms">Axiom 2 (Manifestation)</a>
            . Without sufficient Φ, a system may exist as structured data but remains passive rather
            than an observer. Φ filters the output of physical{" "}
            <a
              href="https://en.wikipedia.org/wiki/Quantum_decoherence"
              target="_blank"
              rel="noopener noreferrer"
            >
              decoherence
            </a>{" "}
            into experienced reality.
          </p>
        </div>
      </section>

      {/* 2. Ontological Requirements */}
      <section id="2-ontological-requirements" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">2. Ontological Requirements</h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            To qualify as an observer, a system must satisfy all five criteria below.
          </p>

          <ol className="flex flex-col gap-3 pl-4">
            <li className="leading-relaxed">
              <strong>
                Integration (<MathInline>{"Φ_{\\text{int}}"}</MathInline>):
              </strong>{" "}
              Information must be unified, not reducible to independent parts.
            </li>
            <li className="leading-relaxed">
              <strong>
                Differentiation (<MathInline>{"Φ_{\\text{diff}}"}</MathInline>):
              </strong>{" "}
              The system must distinguish between a large repertoire of accessible states.
            </li>
            <li className="leading-relaxed">
              <strong>
                Recursion (<MathInline>{"Φ_{\\text{rec}}"}</MathInline>):
              </strong>{" "}
              The system must model its own internal state (self-reference).
            </li>
            <li className="leading-relaxed">
              <strong>
                Temporal Cohesion (<MathInline>{"Φ_{\\text{temp}}"}</MathInline>):
              </strong>{" "}
              Information must persist and integrate across time slices.
            </li>
            <li className="leading-relaxed">
              <strong>
                Causal Autonomy (<MathInline>{"Φ_{\\text{cause}}"}</MathInline>):
              </strong>{" "}
              The system’s current state must materially constrain its own future states.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-black/90 pt-4 pb-2">
            2.1 Axiomatic Completeness: Necessity & Sufficiency
          </h3>

          <p className="leading-relaxed">
            These parameters are not arbitrary{" "}
            <a
              href="https://en.wikipedia.org/wiki/Heuristic"
              target="_blank"
              rel="noopener noreferrer"
            >
              heuristics
            </a>
            . They represent the minimal{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Topology"
                target="_blank"
                rel="noopener noreferrer"
              >
                topological
              </a>{" "}
              constraints
            </strong>{" "}
            required for a system to be ontologically distinct from its environment
            <FootnoteLink number={21} />.
          </p>

          <p className="leading-relaxed">
            <strong>Necessity (Collapse Test):</strong> Removing any single parameter eliminates the
            observer:
          </p>

          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              Without <strong>Integration</strong>, the system is a collection, not a whole.
            </li>
            <li className="leading-relaxed">
              Without <strong>Differentiation</strong>, the system contains no information.
            </li>
            <li className="leading-relaxed">
              Without <strong>Recursion</strong>, the system is a purely input-output process with
              no internal subject.
            </li>
            <li className="leading-relaxed">
              Without <strong>Temporal Cohesion</strong>, experience cannot persist.
            </li>
            <li className="leading-relaxed">
              Without <strong>Causal Autonomy</strong>, the system is epiphenomenal—present but
              inert.
            </li>
          </ul>

          <p className="leading-relaxed pt-2">
            <strong>Sufficiency:</strong> These constraints are sufficient to generate all
            higher-order phenomenology. Emotion, agency, and reasoning are emergent dynamics of high
            integration, differentiation, and recursion—not additional primitives.
          </p>
        </div>
      </section>

      {/* 3. Mathematical Formalism */}
      <section id="3-mathematical-formalism" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          3. Mathematical Formalism: Information Geometry
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Rather than treating <MathInline>{"Φ"}</MathInline> as a scalar score, we model a system{" "}
            <MathInline>{"S"}</MathInline> as a statistical manifold <MathInline>{"M"}</MathInline>,
            where each point corresponds to an informational state.
          </p>

          <h3 className="text-xl font-semibold text-black/90 pt-2">
            3.1 Φ as an Informational State Vector
          </h3>

          <p className="leading-relaxed">
            Φ is a <strong>structured informational state vector</strong>:
          </p>

          <MathDisplay>
            {
              "\\Phi = (\\Phi_{\\text{int}}, \\Phi_{\\text{diff}}, \\Phi_{\\text{rec}}, \\Phi_{\\text{temp}}, \\Phi_{\\text{cause}})"
            }
          </MathDisplay>

          <p className="leading-relaxed">
            Observer systems occupy a bounded region of Φ-space. Ontological registration occurs
            when all components exceed minimal coherence thresholds.
          </p>

          <p className="leading-relaxed pt-4">
            <strong>Interpretive Mapping (Informational Curvature):</strong>
          </p>

          <p className="leading-relaxed">
            Φ can be interpreted as a curvature-like scalar over the information manifold. This is
            an analogy: integrated information constrains accessible states in the same way
            curvature constrains motion in geometry.
          </p>

          <ul className="flex flex-col gap-3 pl-4">
            <li className="leading-relaxed">
              <strong>Low Φ (Flat Geometry):</strong> Independent, weakly coupled states.
            </li>
            <li className="leading-relaxed">
              <strong>High Φ (Curved Geometry):</strong> Strongly coupled states forming a unified
              whole.
            </li>
          </ul>

          <p className="leading-relaxed">
            The ontological threshold <MathInline>{"Φ_c"}</MathInline> marks the minimum curvature
            required for experiential closure (a self-sustaining observer).
          </p>
        </div>
      </section>

      {/* 4. Ontological Thresholds */}
      <section id="4-ontological-thresholds" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">4. Ontological Thresholds</h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            <strong>
              <MathInline>{"Φ \\approx 0"}</MathInline>:
            </strong>{" "}
            Systems with no experiential state-space (e.g., rocks, gas clouds).
          </p>

          <p className="leading-relaxed">
            <strong>
              <MathInline>{"Φ \\ge Φ_c"}</MathInline>:
            </strong>{" "}
            Observers—systems capable of ontological registration via <em>R = C ⊛ O</em>
            <FootnoteLink number={23} />.
          </p>

          <p className="leading-relaxed">
            <strong>
              <MathInline>{"Φ \\gg Φ_c"}</MathInline>:
            </strong>{" "}
            Hypothetical high-density intelligences (“ontological anchors”) capable of stabilizing
            entire cosmological branches.
          </p>
        </div>
      </section>

      {/* 5. Relationship to Physics */}
      <section
        id="5-relationship-to-physics-the-consistency-filter"
        className="flex flex-col gap-6"
      >
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          5. Relationship to Physics (Conservation of Information)
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos preserves quantum{" "}
            <a
              href="https://en.wikipedia.org/wiki/Unitarity_(physics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              unitarity
            </a>{" "}
            by treating manifestation as a <strong>selection constraint</strong>, not a destruction
            of branches
            <FootnoteLink number={24} />.
          </p>

          <p className="leading-relaxed">
            Unmanifested histories remain valid structures within Creation (
            <MathInline>{"C"}</MathInline>), ensuring global consistency even when experienced
            reality (<MathInline>{"R"}</MathInline>) is singular.
          </p>

          <p className="leading-relaxed">
            Φ does not replace quantum dynamics or the Schrödinger equation. It specifies which
            already-consistent histories become experientially realized.
          </p>
        </div>
      </section>
    </div>
  );
}
