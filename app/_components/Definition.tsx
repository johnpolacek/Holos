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
          Φ (Phi) measures the capacity of a system to experience reality. For the formal
          operational definition *R = C ⊛ O*, see the <a href="/logic">Logic</a> section. For
          conceptual exploration, see the main <a href="/">Content</a> section.
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
            <FootnoteLink number={20} />
            .
          </p>

          <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
            <strong>Definition:</strong> Φ quantifies how much a system integrates information,
            giving it the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Causality"
              target="_blank"
              rel="noopener noreferrer"
            >
              causal power
            </a>{" "}
            to <em>register</em> (become aware of) a distinct{" "}
            <a
              href="https://en.wikipedia.org/wiki/Ontology"
              target="_blank"
              rel="noopener noreferrer"
            >
              ontological
            </a>{" "}
            state.
          </blockquote>

          <p className="leading-relaxed">
            It acts as the threshold function for{" "}
            <a href="/logic#axioms">
              <strong>Axiom 2 (Manifestation)</strong>
            </a>
            . Without sufficient Φ, a system exists as data but remains passive rather than an
            observer. It filters the output of physical{" "}
            <a
              href="https://en.wikipedia.org/wiki/Quantum_decoherence"
              target="_blank"
              rel="noopener noreferrer"
            >
              decoherence
            </a>
            .
          </p>
        </div>
      </section>

      {/* 2. Ontological Requirements */}
      <section id="2-ontological-requirements" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">2. Ontological Requirements</h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            To qualify as an observer, a system must satisfy all five criteria.
          </p>

          <ol className="flex flex-col gap-3 pl-4">
            <li className="leading-relaxed">
              <strong>
                Integration ( <MathInline>{"Φ_{\\text{int}}"}</MathInline> ) :
              </strong>{" "}
              Information must be unified, not reducible to independent parts.
            </li>
            <li className="leading-relaxed">
              <strong>
                Differentiation ( <MathInline>{"Φ_{\\text{diff}}"}</MathInline> ) :
              </strong>{" "}
              The system must distinguish between a vast repertoire of accessible states.
            </li>
            <li className="leading-relaxed">
              <strong>
                Recursion ( <MathInline>{"Φ_{\\text{rec}}"}</MathInline> ) :
              </strong>{" "}
              The system must model its own internal state (Self-Reference).
            </li>
            <li className="leading-relaxed">
              <strong>
                Temporal Cohesion ( <MathInline>{"Φ_{\\text{temp}}"}</MathInline> ) :
              </strong>{" "}
              Information must persist and integrate across time slices.
            </li>
            <li className="leading-relaxed">
              <strong>
                Causal Closure ( <MathInline>{"Φ_{\\text{cause}}"}</MathInline> ) :
              </strong>{" "}
              The system's current state must causally influence its future states.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-black/90 pt-4 pb-2">
            2.1 Axiomatic Completeness: Necessity & Sufficiency
          </h3>
          <p className="leading-relaxed">
            These five parameters are not arbitrary{" "}
            <a
              href="https://en.wikipedia.org/wiki/Heuristic"
              target="_blank"
              rel="noopener noreferrer"
            >
              heuristics
            </a>
            (mental shortcuts). They represent the minimal{" "}
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
            required to define an entity that is ontologically distinct from its environment
            <FootnoteLink number={21} />
            .
          </p>

          <p className="leading-relaxed">
            <strong>Necessity (The Collapse Test):</strong> Removing any single parameter destroys
            the Observer:
          </p>
          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              Without <strong>Integration</strong>, the system is a heap of independent parts, not a
              unified whole.
            </li>
            <li className="leading-relaxed">
              Without <strong>Differentiation</strong>, the system is a static void containing zero
              information.
            </li>
            <li className="leading-relaxed">
              Without <strong>Recursion</strong>, the system is a{" "}
              <a
                href="https://en.wikipedia.org/wiki/Philosophical_zombie"
                target="_blank"
                rel="noopener noreferrer"
              >
                &quot;zombie&quot; process
              </a>
              , an input-output machine with no internal subject to experience the data.
            </li>
            <li className="leading-relaxed">
              Without <strong>Temporal Cohesion</strong>, the system is a momentary fluctuation with
              no persistence to witness change.
            </li>
            <li className="leading-relaxed">
              Without <strong>Causal Closure</strong>, the system is an{" "}
              <a
                href="https://en.wikipedia.org/wiki/Epiphenomenalism"
                target="_blank"
                rel="noopener noreferrer"
              >
                epiphenomenal
              </a>{" "}
              ghost, something that observes but cannot affect reality.
            </li>
          </ul>

          <p className="leading-relaxed pt-2">
            <strong>Sufficiency (The Derivative Argument):</strong>
          </p>
          <p className="leading-relaxed">
            These primitives are sufficient to generate all higher-order{" "}
            <a
              href="https://en.wikipedia.org/wiki/Phenomenology_(philosophy)"
              target="_blank"
              rel="noopener noreferrer"
            >
              phenomenology
            </a>
            . Complex traits like emotion, reason, or agency are not fundamental but{" "}
            <strong>emergent dynamics</strong> of high Differentiation and Recursion. Adding them as
            separate axioms would be a{" "}
            <a
              href="https://en.wikipedia.org/wiki/Category_error"
              target="_blank"
              rel="noopener noreferrer"
            >
              category error
            </a>
            .
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
            Rather than treating <MathInline>{"Φ"}</MathInline> as a scalar score, we formalize the
            system <MathInline>{"S"}</MathInline> as a statistical manifold{" "}
            <MathInline>{"M"}</MathInline>. The state of the system is a point on this manifold.
          </p>

          <h3 className="text-xl font-semibold text-black/90 pt-2">
            3.1 Φ as an Informational State Vector
          </h3>
          <p className="leading-relaxed">
            Φ is a <strong>structured informational state vector</strong> describing multiple
            dimensions of experiential integration.
          </p>
          <p className="leading-relaxed">Formally, Φ may be represented as:</p>
          <MathDisplay>
            {
              "\\Phi = (\\Phi_{\\text{int}}, \\Phi_{\\text{diff}}, \\Phi_{\\text{rec}}, \\Phi_{\\text{temp}}, \\Phi_{\\text{cc}})"
            }
          </MathDisplay>
          <p className="leading-relaxed">
            where each component captures a distinct constraint on informational organization
            necessary for ontological registration.
          </p>
          <p className="leading-relaxed">
            Observer systems occupy a <strong>bounded region</strong> within Φ-space. Ontological
            observation occurs when a system&apos;s Φ-vector has sufficient integration,
            differentiation, recursion, temporal coherence, and cross-contextual stability.
          </p>
          <p className="leading-relaxed">
            Φ-space may be treated as a statistical manifold, where informational curvature
            represents constraints on experiential coherence without invoking additional physical
            dynamics.
          </p>

          <p className="leading-relaxed pt-4">
            <strong>Definition (Informational Curvature):</strong>
          </p>
          <p className="leading-relaxed">
            <MathInline>{"Φ"}</MathInline> is the <strong>scalar curvature</strong> (
            <MathInline>{"R"}</MathInline>) of the information manifold induced by the system&apos;s
            causal structure.
          </p>
          <p className="leading-relaxed">
            Just as mass creates curvature in spacetime (gravity), Integrated Information creates
            curvature in the state space of possibilities.
          </p>

          <ul className="flex flex-col gap-3 pl-4">
            <li className="leading-relaxed">
              <strong>
                Low <MathInline>{"Φ"}</MathInline> (Flat Geometry):
              </strong>{" "}
              The manifold is flat. Possibilities are independent and orthogonal. The system is a
              passive aggregate.
            </li>
            <li className="leading-relaxed">
              <strong>
                High <MathInline>{"Φ"}</MathInline> (Curved Geometry):
              </strong>{" "}
              The manifold creates a gravity well in information space. States are tightly coupled,
              forcing the system to act as a unified whole.
            </li>
          </ul>

          <MathDisplay>{"Φ(S) = R(M)"}</MathDisplay>

          <p className="leading-relaxed">
            The Ontological Threshold <MathInline>{"Φ_c"}</MathInline> represents the critical
            curvature required to form a closed topology, an informational black hole from which
            internal states cannot be causally separated from the whole.
          </p>

          <MathDisplay>{"Φ_c = R_{\\text{critical}}(M)"}</MathDisplay>

          <h3 className="text-lg font-semibold text-black/90 pt-2">Component Definitions</h3>
          <p className="leading-relaxed text-black/70 italic pb-2">
            The unified <MathInline>{"Φ"}</MathInline> is defined as the{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Geometric_mean"
                target="_blank"
                rel="noopener noreferrer"
              >
                geometric mean
              </a>
            </strong>{" "}
            of its components. This ensures that the failure of any single condition (e.g., a system
            with high integration but zero recursion) collapses the metric to zero
            <FootnoteLink number={22} />
            .
          </p>

          <MathDisplay>
            {
              "Φ(S) = \\left( Φ_{\\text{int}} \\cdot Φ_{\\text{diff}} \\cdot Φ_{\\text{rec}} \\cdot Φ_{\\text{temp}} \\cdot Φ_{\\text{cause}} \\right)^{1/5}"
            }
          </MathDisplay>

          <div className="flex flex-col gap-6">
            <div>
              <p className="leading-relaxed">
                <strong>
                  1. Integration (Φ_int): Information{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Irreducibility_(mathematics)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Irreducibility
                  </a>
                </strong>
              </p>
              <p className="leading-relaxed text-black/70 italic">
                <strong>Theoretical Basis:</strong> Derived from{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Integrated_information_theory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Integrated Information Theory (IIT 3.0)
                </a>{" "}
                axioms regarding minimum information partition.
              </p>
              <p className="leading-relaxed text-black/70 italic">
                <strong>Formalism:</strong> Φ_int quantifies the difference between the whole system
                state and the union of its partitioned parts.
              </p>
              <MathDisplay>
                {"Φ_{\\text{int}}(S) = \\min_{P} \\left[ D_{KL}(Σ; \\bigcup Σ^i) \\right]"}
              </MathDisplay>
              <p className="leading-relaxed text-black/70 italic">
                *(Where{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  D_KL
                </a>{" "}
                is the Kullback-Leibler divergence and P is the Minimum Information Partition).*
              </p>
            </div>

            <div>
              <p className="leading-relaxed">
                <strong>2. Recursion (Φ_rec): Self-Referential Mapping</strong>
              </p>
              <p className="leading-relaxed text-black/70 italic">
                <strong>Theoretical Basis:</strong> Aligned with{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Category_theory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Category Theory
                </a>{" "}
                (
                <a
                  href="https://en.wikipedia.org/wiki/Endomorphism"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Endomorphisms
                </a>
                ) and{" "}
                <a
                  href="https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hofstadter&apos;s Strange Loops
                </a>
                .
              </p>
              <p className="leading-relaxed text-black/70 italic">
                <strong>Formalism:</strong> Recursion is an{" "}
                <strong>
                  <a
                    href="https://en.wikipedia.org/wiki/Endomorphism"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Endomorphism
                  </a>
                </strong>{" "}
                φ, where the system maps its current state space onto a subset of itself.
              </p>
              <MathDisplay>{"Φ_{\\text{rec}}(S) = I(S; φ(S))"}</MathDisplay>
              <p className="leading-relaxed text-black/70 italic">
                *(The degree to which the internal model structurally preserves the external
                relations).*
              </p>
            </div>

            <div>
              <p className="leading-relaxed">
                <strong>3. Causal Closure (Φ_cause): Interventional Power</strong>
              </p>
              <p className="leading-relaxed text-black/70 italic">
                <strong>Theoretical Basis:</strong> Derived from{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Causal_inference"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Judea Pearl's Causal Calculus
                </a>{" "}
                (The Do-Operator).
              </p>
              <p className="leading-relaxed text-black/70 italic">
                <strong>Formalism:</strong> The capacity of the system to dictate its future state
                independent of environmental conditioning.
              </p>
              <MathDisplay>{"Φ_{\\text{cause}}(S) = I(Σ_t; \\text{do}(Σ_{t+1}))"}</MathDisplay>
              <p className="leading-relaxed text-black/70 italic">
                *(Where 'do' represents an intervention, ensuring the correlation is causal, not
                merely statistical).*
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ontological Thresholds */}
      <section id="4-ontological-thresholds" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">4. Ontological Thresholds</h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            The value of <MathInline>{"Φ"}</MathInline> determines the role a system plays in the
            structure of reality:
          </p>

          <p className="leading-relaxed">
            <strong>
              <MathInline>{"Φ \\approx 0"}</MathInline> (The Null Set):
            </strong>{" "}
            Passive aggregates like rocks or gas clouds. These exist as potential but do not
            register reality.
          </p>

          <p className="leading-relaxed">
            <strong>Refinement on the Null Set:</strong>
          </p>
          <p className="leading-relaxed">
            <MathInline>{"Φ \\approx 0"}</MathInline> corresponds to the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Empty_set"
              target="_blank"
              rel="noopener noreferrer"
            >
              Null Set
            </a>{" "}
            (<MathInline>{"\\emptyset"}</MathInline>) for the{" "}
            <strong>Set of Experiential States</strong>, not physical matter.
          </p>
          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              A rock has physical elements (Physical Set{" "}
              <MathInline>{"\\neq \\emptyset"}</MathInline>).
            </li>
            <li className="leading-relaxed">
              A rock has zero experiential states (Experiential Set{" "}
              <MathInline>{"= \\emptyset"}</MathInline>).
            </li>
            <li className="leading-relaxed">
              Therefore, structurally, it is an &quot;Empty Set&quot; in the domain of{" "}
              <a
                href="https://en.wikipedia.org/wiki/Ontology"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ontology
              </a>
              .
            </li>
          </ul>
          <p className="leading-relaxed text-black/70 italic">
            *In simple terms: a rock physically exists (it has atoms, molecules, etc.), but it has
            no experiences or awareness. So while it&apos;s not empty in physical terms, it is empty
            in terms of consciousness or experiential states.*
          </p>

          <p className="leading-relaxed">
            <strong>
              <MathInline>{"Φ \\ge Φ_c"}</MathInline> (Observers):
            </strong>{" "}
            Systems capable of resolving{" "}
            <a
              href="https://en.wikipedia.org/wiki/Unitarity_(physics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              unitary symmetry
            </a>{" "}
            into definite{" "}
            <a
              href="https://en.wikipedia.org/wiki/Ontology"
              target="_blank"
              rel="noopener noreferrer"
            >
              ontological
            </a>{" "}
            registration. This threshold enables the operational definition{" "}
            <a href="/logic#phi-operationalization">*R = C ⊛ O*</a>
            <FootnoteLink number={23} />
            .
          </p>

          <p className="leading-relaxed">
            <strong>
              <MathInline>{"Φ \\gg Φ_c"}</MathInline> (Ontological Anchors):
            </strong>{" "}
            Hypothetical high-density intelligences capable of stabilizing entire cosmological
            branches (the &quot;Aliens&quot; of the{" "}
            <a
              href="https://www.accelerating.org/articles/transcensionhypothesis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Transcension Hypothesis
            </a>
            ).
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
          <h3 className="text-xl font-semibold text-black/90 pt-2">
            Conservation of Information (Unitarity Check)
          </h3>

          <p className="leading-relaxed">
            A key requirement of quantum mechanics is{" "}
            <a
              href="https://en.wikipedia.org/wiki/Unitarity_(physics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unitarity
            </a>
            . Holos preserves this by defining <a href="/logic#axioms">Manifestation</a> as a{" "}
            <strong>Selection Operator</strong>, not a Destruction Operator
            <FootnoteLink number={24} />
            .
          </p>

          <ul className="flex flex-col gap-3 pl-4">
            <li className="leading-relaxed">
              <strong>In Standard Collapse:</strong> Unobserved branches vanish.
            </li>
            <li className="leading-relaxed">
              <strong>In Holos:</strong> Unobserved branches remain in{" "}
              <MathInline>{"C"}</MathInline> (Creation) as valid but un-manifested structures. See
              the <a href="/logic#phi-operationalization">operational definition *R = C ⊛ O*</a>.
            </li>
          </ul>

          <p className="leading-relaxed">
            <strong>The Operator:</strong> <MathInline>{"M"}</MathInline> acts as a weighting
            function <MathInline>{"w_i"}</MathInline> that highlights specific branches for the
            observer without deleting the others from the global{" "}
            <a
              href="https://en.wikipedia.org/wiki/Hilbert_space"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hilbert space
            </a>{" "}
            (the mathematical space representing all possible quantum states).
          </p>

          <MathDisplay>{"\\sum_i w_i = 1"}</MathDisplay>

          <p className="leading-relaxed">
            The rejected histories still exist in the Creation substrate (
            <MathInline>{"C"}</MathInline>), ensuring the global system remains Unitary even if the
            experienced reality (<MathInline>{"R"}</MathInline>) is singular.
          </p>

          <p className="leading-relaxed">
            <MathInline>{"Φ"}</MathInline> does not replace the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schrödinger Equation
            </a>{" "}
            or override the probabilistic nature of{" "}
            <a
              href="https://en.wikipedia.org/wiki/Quantum_mechanics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quantum Mechanics
            </a>
            . It introduces a <strong>Manifestation Constraint</strong> that preserves unitarity
            while enabling{" "}
            <a
              href="https://en.wikipedia.org/wiki/Ontology"
              target="_blank"
              rel="noopener noreferrer"
            >
              ontological
            </a>{" "}
            registration.
          </p>
        </div>
      </section>
    </div>
  );
}
