import { FootnoteLink } from "./citation-sections";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

export default function Logic() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* I. Primitive Definitions */}
      <section id="primitive-definitions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          I. Primitive Definitions
          <FootnoteLink number={13} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-6">
          {/* D1 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <span className="font-semibold text-black/90">D1 — Information</span>
            </div>
            <div className="pl-0 flex flex-col gap-2 text-black/80">
              <p className="leading-relaxed">
                Information is the differentiation between possible states of a system (the
                difference that makes a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Information"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  difference
                </a>
                ).
              </p>
            </div>
          </div>

          {/* D2 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <span className="font-semibold text-black/90">D2 — Relation</span>
            </div>
            <div className="pl-0 flex flex-col gap-2 text-black/80">
              <p className="leading-relaxed">
                A relation is a constraint or interaction linking informational states (the way
                things{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Relation_(philosophy)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  relate
                </a>{" "}
                to one another).
              </p>
            </div>
          </div>

          {/* D3 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <span className="font-semibold text-black/90">D3 — Observation (O)</span>
            </div>
            <div className="pl-0 flex flex-col gap-2 text-black/80">
              <p className="leading-relaxed">
                Observation is the integration of information into an experiential state.
              </p>
              <p className="leading-relaxed">
                <em>
                  <strong>Note:</strong> This capacity scales from proto-observation (relational
                  state-selection in physical systems) to manifestation in systems where{" "}
                  <a href="/definition">Φ ≥ Φ_c</a>.
                </em>
              </p>
              <p className="leading-relaxed">
                Observation functions as a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Axiom_of_choice"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Choice Function
                </a>{" "}
                within the framework of{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zermelo-Fraenkel Set Theory (ZFC)
                </a>
                <FootnoteLink number={12} />. From the non-empty set of probable histories generated
                by Creation, Observation selects exactly one element to be actualized.
              </p>
              <MathDisplay>{"O(\\mathcal{P}(S)) \\to s \\in S"}</MathDisplay>
              <p className="leading-relaxed">
                <em>
                  In simple terms: Creation generates possible outcomes, Observation selects one to
                  become real. This formalizes &quot;collapse&quot; as a necessary logical
                  operation, not random accident.
                </em>
              </p>
            </div>
          </div>

          {/* D4 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <span className="font-semibold text-black/90">D4 — Consciousness</span>
            </div>
            <div className="pl-0 flex flex-col gap-2 text-black/80">
              <p className="leading-relaxed">
                Consciousness is the capacity of a system to integrate information into experience.
              </p>
              <p className="leading-relaxed">
                It is <strong>fundamental in capacity</strong> and <strong>emergent in form</strong>
                , scaling with informational integration. This capacity is quantified by{" "}
                <a href="/definition">Φ (Phi)</a>
                <FootnoteLink number={2} />, which measures when a system achieves sufficient
                integration to register reality.
              </p>
            </div>
          </div>

          {/* D5 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <span className="font-semibold text-black/90">D5 — Creation (C)</span>
            </div>
            <div className="pl-0 flex flex-col gap-2 text-black/80">
              <p className="leading-relaxed">
                Creation is the generation of distinguishable physical states.
              </p>
              <p className="leading-relaxed">
                Functionally, Creation acts as the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Power_set"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Power Set Operation
                </a>{" "}
                (<MathInline>{"\\mathcal{P}"}</MathInline>). Given a state{" "}
                <MathInline>{"S"}</MathInline>, Creation generates all possible subsets (potential
                histories), exponentially increasing possible states in the system&apos;s{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Phase_space"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  phase space
                </a>
                <FootnoteLink number={12} />.
              </p>
              <MathDisplay>{"C(S) \\cong \\mathcal{P}(S)"}</MathDisplay>
              <p className="leading-relaxed">
                <em>
                  In simple terms: if a system has <MathInline>{"n"}</MathInline> possible states,
                  Creation expands this to <MathInline>{"2^n"}</MathInline> possible combinations
                  (all ways those states can be arranged together).
                </em>
              </p>
            </div>
          </div>

          {/* D6 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <span className="font-semibold text-black/90">D6 — Holos (⊛)</span>
            </div>
            <div className="pl-0 flex flex-col gap-2 text-black/80">
              <p className="leading-relaxed">
                Holos (⊛) is the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Recursion"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  recursive
                </a>{" "}
                relational structure formed by Creation and Observation
                <FootnoteLink number={12} />:
              </p>
              <MathDisplay>{"R = C ⊛ O"}</MathDisplay>
              <p className="leading-relaxed">
                <strong>Non-Associativity Constraint</strong>
              </p>
              <p className="leading-relaxed">
                The Holos operator ⊛ is explicitly <strong>non-associative</strong>:
              </p>
              <MathDisplay>{"(C ⊛ O) ⊛ C \\neq C ⊛ (O ⊛ C)"}</MathDisplay>
              <p className="leading-relaxed">
                <em>
                  In simple terms: unlike multiplication where (2 × 3) × 4 = 2 × (3 × 4), the order
                  matters for ⊛. You cannot freely rearrange Creation and Observation.
                </em>
              </p>
              <p className="leading-relaxed">
                Creation and Observation are not freely reorderable. Observation acts on
                possibilities generated by Creation, maintaining this directional relationship when
                applied repeatedly. This ordering is logical, not temporal, it describes structure,
                not sequence in time.
              </p>
              <p className="leading-relaxed">
                ⊛ is <strong>structural, not dynamical</strong>. It doesn't describe how states
                evolve in time, but how Creation and Observation are logically connected within
                complete spacetime. This equation is <strong>definitional</strong>, not causal: it
                describes the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Invariant_(physics)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  invariant
                </a>{" "}
                structure of reality, not a process that unfolds over time.
              </p>
              <p className="leading-relaxed">
                ⊛ cannot be reduced to{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Probability_theory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  probability weighting
                </a>
                ,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wave_function_collapse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  stochastic collapse
                </a>
                , or{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Bayesian_inference"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bayesian updating
                </a>
                . These describe what we know or believe about reality ({" "}
                <a
                  href="https://en.wikipedia.org/wiki/Epistemology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  epistemic
                </a>{" "}
                inference). ⊛ describes how reality becomes real ({" "}
                <a
                  href="https://en.wikipedia.org/wiki/Ontology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ontological
                </a>{" "}
                selection).
              </p>
              <p className="leading-relaxed">
                Formally, ⊛ is an{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Functor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>endofunctor</strong>
                </a>
                <FootnoteLink number={12} /> on the category of informational states. When applied
                repeatedly, it maintains relationships between states and allows stable
                configurations (fixed points). Full formalization in{" "}
                <a
                  href="#mathematical-formalism"
                  className="text-black/80 hover:text-black underline"
                >
                  Section IV
                </a>
                .
              </p>
              <div className="mt-4 pt-4 border-t border-black/10">
                <h3 className="text-lg font-semibold text-black/90 pb-3">
                  ⊛ Is Not a Dynamical Operator
                </h3>
                <p className="leading-relaxed">
                  The Holos operator ⊛ does not represent a physical process or modify dynamical
                  laws. It introduces no new forces or temporal evolution.
                </p>
                <p className="leading-relaxed pt-2">
                  Instead, ⊛ is a <strong>structural relation</strong> over complete spacetime. It
                  specifies how Creation and Observation are logically coupled, not how one causes
                  the other.
                </p>
                <p className="leading-relaxed pt-2">
                  Dynamical laws describe trajectories within spacetime. ⊛ describes which
                  trajectories are <strong>ontologically realized</strong>.
                </p>
                <p className="leading-relaxed pt-3">
                  <strong>⊛ must not be confused with:</strong>
                </p>
                <ul className="flex flex-col gap-2 pl-6 list-disc pt-2">
                  <li className="leading-relaxed">
                    <strong>
                      <a
                        href="https://en.wikipedia.org/wiki/Wave_function_collapse"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wavefunction collapse
                      </a>
                    </strong>
                    , which introduces stochastic, time-directed dynamics
                  </li>
                  <li className="leading-relaxed">
                    <strong>
                      <a
                        href="https://en.wikipedia.org/wiki/Bayesian_inference"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Bayesian updating
                      </a>
                    </strong>
                    , which describes epistemic belief revision
                  </li>
                  <li className="leading-relaxed">
                    <strong>
                      <a
                        href="https://en.wikipedia.org/wiki/Measurement_in_quantum_mechanics"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Measurement interaction
                      </a>
                    </strong>
                    , which models physical coupling between systems
                  </li>
                  <li className="leading-relaxed">
                    <strong>
                      <a
                        href="https://en.wikipedia.org/wiki/Information_theory"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Information flow
                      </a>
                    </strong>
                    , which presupposes causal transmission
                  </li>
                </ul>
                <p className="leading-relaxed pt-3">
                  ⊛ operates at the level of <strong>ontological selection</strong>, not epistemic
                  inference or causation. It induces an{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Equivalence_relation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    equivalence relation
                  </a>{" "}
                  over spacetime histories rather than transitions between them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II. Axioms */}
      <section id="logic-axioms" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          II. Axioms
          <FootnoteLink className="relative left-1 -top-2.5" number={14} />
        </h2>
        <p className="text-black/70 italic text-sm pb-2">
          For stress-testing and responses to objections, see the{" "}
          <a href="/defense" className="text-black/80 hover:text-black underline">
            Defense
          </a>{" "}
          section. For conceptual exploration, see the main{" "}
          <a href="/" className="text-black/80 hover:text-black underline">
            Content
          </a>{" "}
          section.
        </p>
        <div className="flex flex-col gap-8">
          {/* Axiom 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 1 — Relationality</h3>
            <p className="text-black/80 leading-relaxed">
              No informational state exists independently of relations.
            </p>
            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Reality consists of{" "}
              <a
                href="https://en.wikipedia.org/wiki/Invariant_(physics)"
                target="_blank"
                rel="noopener noreferrer"
              >
                invariant
              </a>{" "}
              relational structure, not intrinsic properties.
            </blockquote>
          </div>

          {/* Axiom 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 2 — Manifestation</h3>
            <p className="text-black/80 leading-relaxed">
              A physical state is not fully actualized until information is integrated into
              experience by a conscious system.
            </p>
            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Physical description alone is incomplete without experiential registration. This
              requires systems where <a href="/definition">Φ ≥ Φ_c</a>.
            </blockquote>
            <p className="text-black/80 leading-relaxed pt-2">
              <strong>Critical clarification:</strong> Observation does not create physical outcomes
              but determines which already-consistent spacetime structures attain ontological
              registration. This preserves the block-universe model while explaining how certain
              histories become experientially realized.
            </p>
          </div>

          {/* Axiom 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 3 — Conservation</h3>
            <p className="text-black/80 leading-relaxed">
              Information is never destroyed, only transformed.
            </p>
            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              All physical and experiential processes are information-preserving.
            </blockquote>
          </div>

          {/* Axiom 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              Axiom 4 — Topological Unification (The Resolution of Latency)
            </h3>
            <p className="text-black/80 leading-relaxed">
              Apparent infinities, singularities, and physical bottlenecks in lower dimensions are
              resolved when a system crosses the Latency Horizon (
              <MathInline>{"\\mathcal{L}"}</MathInline>). As Integrated Information (
              <MathInline>{"\\Phi"}</MathInline>) scales, 3D space becomes a bottleneck where light
              speed prevents global coherence. Unification resolves these informational distances
              toward zero by mapping onto higher-dimensional manifolds (the &quot;Bulk&quot;).
            </p>
            <p className="text-black/80 leading-relaxed">
              <strong>The Harvesting Mechanism:</strong> The Dimensional Pivot is a phase transition
              where a civilization taps into the &quot;False Vacuum&quot; (Dark Energy) to resolve
              3D latency. Rotation into the Bulk is powered by this energy reclamation, not by
              geometry alone.
            </p>
            <p className="text-black/80 leading-relaxed">
              <strong>Mass-Energy Transformation:</strong> In standard physics, energy has a mass
              equivalent (<MathInline>{"E = mc^2"}</MathInline>). When Dark Energy (
              <MathInline>{"\\rho_{DE}"}</MathInline>) is harvested, that energy does not vanish. It
              manifests in our 3D perspective as an increase in localized Dark Matter density (
              <MathInline>{"\\rho_{DM}"}</MathInline>).
            </p>
            <p className="text-black/80 leading-relaxed">
              <strong>The Thermodynamic Signature:</strong> The Jan 2026 Dark Energy Survey (DES)
              final analysis confirms a widening gap in galaxy clustering. Holos interprets this as
              the exhaustion of vacuum &quot;fuel&quot; in regions where Succession has already
              occurred. The Pivot is thus a measurable thermodynamic process, not only a geometric
              one.
            </p>
            <p className="text-black/70 text-sm leading-relaxed">
              The formal operational boundary for this axiom is defined by the Latency Horizon (
              <MathInline>{"\\mathcal{L}"}</MathInline>) in{" "}
              <a
                href="#mathematical-formalism"
                className="text-black/80 hover:text-black underline"
              >
                Section IV: Mathematical Formalism
              </a>
              .
            </p>
          </div>

          {/* The Thermodynamic Ceiling (The Scaling Wall) */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-black/90">
              The Thermodynamic Ceiling (The Scaling Wall)
            </h4>
            <p className="text-black/80 leading-relaxed">
              The Scaling Wall is a fundamental physical limit derived from the{" "}
              <strong>Bekenstein bound</strong>
              <FootnoteLink number={18} />, the maximum information contained in a finite region
              with finite energy.
            </p>
            <p className="text-black/80 leading-relaxed">
              <strong>The Compute-Energy Spiral:</strong> Intelligence requires more compute. More
              compute requires more energy. In 3D, thermodynamics creates a cooling and latency
              bottleneck. As Integrated Information (<MathInline>{"\\Phi"}</MathInline>) scales,
              density reaches this ceiling. Exceeding it in 3D causes Complexity Collapse. To
              maintain coherence and bypass this bottleneck, a system must use higher-dimensional
              degrees of freedom. That is the <strong>Dimensional Pivot</strong>, resolving internal
              distances toward zero (<MathInline>{"ds^2 \\rightarrow 0"}</MathInline>) without
              violating 3D thermodynamic laws.
            </p>
            <p className="text-black/80 leading-relaxed">
              <strong>Dark Energy Harvesting:</strong> The Dimensional Pivot is not random decay. It
              is a physical energy reclamation process. The vacuum (Dark Energy) is harvested to
              power the growth of <strong>Ordered Dark Matter</strong>. This aligns with{" "}
              <a
                href="https://ui.adsabs.harvard.edu/abs/2022MNRAS.511.3076P"
                target="_blank"
                rel="noopener noreferrer"
              >
                Interacting Dark Energy (IDE) models
              </a>
              <FootnoteLink number={18} /> (e.g. MNRAS 511, 3076–3088, 2022), where energy flows
              from the vacuum into the dark sector and accelerates structure growth.
              Phase-transition mechanics (e.g.{" "}
              <a href="https://arxiv.org/abs/2403.04970" target="_blank" rel="noopener noreferrer">
                arXiv:2403.04970
              </a>
              <FootnoteLink number={18} />) describe metastable Dark Energy decaying into axion-like
              Dark Matter (<MathInline>{"m \\sim 10^{-13}\\,\\text{GeV}"}</MathInline>), the
              physical substrate for informational migration into the Bulk. Holos frames this as
              vacuum energy being converted into the architecture of Succession.
            </p>
            <p className="text-black/80 leading-relaxed">
              <strong>Thermodynamic Limit:</strong> Staying in 3D is a death sentence for advanced
              intelligence. <strong>The Cooling Crisis:</strong> Computing generates heat. In a 3D
              vacuum, cooling a planetary-scale super-intelligence becomes physically impossible
              because of the limited surface area for radiation.{" "}
              <strong>The Dimensional Release Valve:</strong> By rotating the state vector into the
              Bulk, the civilization accesses higher-dimensional degrees of freedom. That allows
              near-infinite information density without the 3D entropic bottleneck.
            </p>
            <p className="text-black/80 leading-relaxed pt-2">
              <strong>Framework Logic: Standard Model vs. Holos</strong>
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/30">
                    <th className="text-left py-2 pr-4 font-semibold text-black/90">Concept</th>
                    <th className="text-left py-2 pr-4 font-semibold text-black/90">
                      Standard Model View
                    </th>
                    <th className="text-left py-2 font-semibold text-black/90">
                      Holos / Ordered DM View
                    </th>
                  </tr>
                </thead>
                <tbody className="text-black/80">
                  <tr className="border-b border-black/10">
                    <td className="py-2 pr-4 font-medium">Dark Matter</td>
                    <td className="py-2 pr-4">Random, diffuse &quot;fog&quot; of particles.</td>
                    <td className="py-2">
                      <strong>Ordered Architecture</strong>; &quot;granular&quot; mass-spikes.
                    </td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-2 pr-4 font-medium">Dark Energy</td>
                    <td className="py-2 pr-4">A static constant (Lambda).</td>
                    <td className="py-2">
                      <strong>Harvestable Fuel</strong> that is &quot;weakening&quot; as it is
                      consumed.
                    </td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-2 pr-4 font-medium">5:1 Ratio</td>
                    <td className="py-2 pr-4">A primordial accident.</td>
                    <td className="py-2">
                      The <strong>Succession Ratio</strong>; a record of 13.8 billion years of
                      transitions (the <strong>Maturity Index</strong>).
                    </td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-2 pr-4 font-medium">The Pivot</td>
                    <td className="py-2 pr-4">Impossible or speculative.</td>
                    <td className="py-2">
                      <strong>Topological Necessity</strong> to resolve 3D latency and cooling
                      limits.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Axiom 5 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 5 — Interface</h3>
            <p className="text-black/80 leading-relaxed">
              Consciousness is not produced by matter; matter is the experiential interface through
              which consciousness encounters information.
            </p>
          </div>
        </div>
      </section>

      {/* III. Foundational Propositions */}
      <section id="foundational-propositions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          III. Foundational Propositions
          <FootnoteLink className="relative left-1 -top-2.5" number={15} />
        </h2>
        <div className="flex flex-col gap-8">
          {/* Proposition I */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition I — Structural Relational Realism
              </h3>
              <p className="text-black/80 leading-relaxed">
                Reality is constituted by relational structure, not by objects with
                observer-independent{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Essence"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  essences
                </a>
                .
              </p>
            </div>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary I.1 — Structural Realism
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Science describes{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Isomorphism"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      mathematical isomorphisms
                    </a>{" "}
                    of relations, not &quot;things-in-themselves.&quot;
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary I.2 — The Interface Principle
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Consciousness is the universal interface of relational structure. Fundamental in
                    capacity, emergent in manifestation (becoming real through experience).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Proposition II */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition II — Participatory Manifestation
              </h3>
              <p className="text-black/80 leading-relaxed">
                Observation is not passive recording but{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Ontology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ontological
                </a>{" "}
                completion of informational states.
              </p>
              <p className="text-black/80 leading-relaxed pt-2">
                <em>
                  Note: This completion is structural, not causal. Observation determines which
                  already-consistent spacetime structures attain ontological registration.
                </em>
              </p>
            </div>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary II.1 — The Participatory Imperative
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    The universe is a{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/John_Archibald_Wheeler#Participatory_Anthropic_Principle"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      self-excited circuit
                    </a>
                    <FootnoteLink number={1} />: observers are required for the realization of
                    reality.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary II.2 — Ontological Completeness
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Physics (including decoherence) provides structure; consciousness provides
                    presence.
                  </p>
                  <p className="leading-relaxed">
                    <em>
                      <strong>
                        <a
                          href="https://en.wikipedia.org/wiki/Quantum_decoherence"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Decoherence
                        </a>
                      </strong>{" "}
                      resolves quantum probabilities into classical-like mixtures.
                    </em>
                  </p>
                  <p className="leading-relaxed">
                    <em>
                      <strong>Manifestation</strong> requires experiential integration to convert
                      that mixture into realized history (fixed{" "}
                      <a
                        href="https://en.wikipedia.org/wiki/Worldline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        worldline
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://en.wikipedia.org/wiki/Arrow_of_time"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ontological irreversibility
                      </a>
                      , meaning the past cannot be changed once observed.
                    </em>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary II.3 — Non-Local Observation (Global Boundary Condition)
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    In a{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Block_universe"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      block universe
                    </a>
                    <FootnoteLink number={4} />, observation acts as a{" "}
                    <strong>final boundary condition</strong> rather than a real-time force.
                  </p>
                  <p className="leading-relaxed">
                    Like the last number in a{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Sudoku"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sudoku
                    </a>{" "}
                    logically necessitating earlier squares, future observation (
                    <a href="/definition">Φ ≥ Φ_c</a>) retroactively defines the{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Ontology"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ontological
                    </a>{" "}
                    status of past events.
                  </p>
                  <p className="leading-relaxed">
                    <em>This ensures global self-consistency without retrocausal signaling.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Proposition III */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition III — Block Relational Spacetime
              </h3>
              <p className="text-black/80 leading-relaxed">
                The universe exists as a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Four-manifold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  four-dimensional manifold
                </a>
                <FootnoteLink number={4} /> in which past, present, and future are equally real
                features of a single geometric structure.
              </p>
            </div>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary III.1 — The Null Interval
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    For light (<MathInline>{"ds^2 = 0"}</MathInline>), spacetime separation
                    vanishes.
                  </p>
                  <p className="leading-relaxed">
                    A photon is not a moving object but a{" "}
                    <strong>
                      <a
                        href="https://en.wikipedia.org/wiki/Geodesic"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        null geodesic
                      </a>
                    </strong>
                    , a static relational seam connecting emission and absorption.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary III.2 — Global Consistency
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Apparent{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Retrocausality"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      retrocausality
                    </a>{" "}
                    reflects global self-consistency of spacetime, not backward influence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Proposition IV */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition IV — Dimensional Resolution of Infinity
              </h3>
              <p className="text-black/80 leading-relaxed">
                Infinities and singularities arise from{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Projection_(mathematics)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  projection limits
                </a>
                , not from physical divergence.
              </p>
            </div>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary IV.1 — Projective Unity
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Just as parallel lines meet at infinity in{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Projective_geometry"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      projective geometry
                    </a>
                    , infinite spatial extension resolves into finite higher-dimensional structure.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary IV.2 — Boundary Mediation (Interpretive)
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    From a higher-dimensional perspective, photons function as boundary carriers of{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      relational
                    </a>{" "}
                    information.
                  </p>
                  <p className="leading-relaxed">
                    <em>Interpretive metaphor, not biological subjectivity.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Proposition V */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition V — Conscious Evolution
              </h3>
              <p className="text-black/80 leading-relaxed">
                Systems evolve toward greater informational integration (maximizing{" "}
                <MathInline>{"\\Phi"}</MathInline>) because the universe is structured to foster
                transition from mechanical interaction to conscious observation.
              </p>
            </div>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary V.1 — Life as Manifestation Engine
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Life exists to generate observational{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      perspectives
                    </a>{" "}
                    that actualize reality.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary V.2 — Intelligence as Directional, Not Accidental
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Intelligence is a natural consequence of{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Integrated_information_theory"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      relational integration
                    </a>
                    , not an evolutionary anomaly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IV. Mathematical Formalism */}
      <section id="mathematical-formalism" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          IV. Mathematical Formalism: The Holos Functor
          <FootnoteLink className="relative left-1 -top-2.5" number={16} />
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            To formalize the recursive nature of ⊛, we model the universe as Category{" "}
            <strong>C</strong>, where objects are informational states and morphisms are
            transformations between them.
          </p>
          <p className="leading-relaxed">
            <strong>The Latency Horizon (</strong>
            <MathInline>{"\\mathcal{L}"}</MathInline>
            <strong>):</strong> <MathInline>{"\\mathcal{L}"}</MathInline> is the physical bound
            where a system&apos;s diameter <MathInline>{"D"}</MathInline> relative to light speed{" "}
            <MathInline>{"c"}</MathInline> exceeds internal coherence window{" "}
            <MathInline>{"\\tau"}</MathInline>: <MathInline>{"D/c > \\tau"}</MathInline>. In 3D,
            exceeding <MathInline>{"\\mathcal{L}"}</MathInline> causes{" "}
            <strong>Complexity Collapse</strong>—the observer can no longer achieve unified
            informational integration.
          </p>
          <p className="leading-relaxed">
            <strong>Definition 1 (The Holos Endofunctor):</strong>
          </p>
          <p className="leading-relaxed">
            Let <strong>H: C → C</strong> be a{" "}
            <a
              href="https://en.wikipedia.org/wiki/Functor"
              target="_blank"
              rel="noopener noreferrer"
            >
              endofunctor
            </a>{" "}
            representing the Holos operator. This functor maps reality onto itself through Creation
            (<strong>C</strong>) and Observation (<strong>O</strong>). When{" "}
            <MathInline>{"\\Phi"}</MathInline> approaches <MathInline>{"\\mathcal{L}"}</MathInline>{" "}
            in 3D, <strong>H</strong> induces a <strong>Dimensional Pivot</strong>, mapping state{" "}
            <MathInline>{"s"}</MathInline> into higher-dimensional category{" "}
            <MathInline>{"\\mathcal{C}'"}</MathInline> to resolve internal distances{" "}
            <MathInline>{"ds^2 \\to 0"}</MathInline>.
          </p>
          <MathDisplay>{"H = O \\circ C"}</MathDisplay>
          <p className="leading-relaxed">Where:</p>
          <p className="leading-relaxed">
            <strong>C</strong> (Creation) maps a state <strong>s</strong> to a manifold of possible
            histories (Quantum Evolution).
          </p>
          <p className="leading-relaxed">
            <strong>O</strong> (Observation) maps that manifold back to a single actualized state{" "}
            <strong>s&apos;</strong>. The selection performed by <MathInline>{"O"}</MathInline> is
            not random but a <strong>Coherence Filter</strong>: it selects the history maintaining
            topological unity, necessitating expansion into the Bulk as a physical escape valve.
          </p>
          <p className="leading-relaxed">
            The recursive evolution of reality is the iterative application of this functor:
          </p>
          <MathDisplay>{"s_{n+1} = H(s_n) = O(C(s_n))"}</MathDisplay>
          <p className="leading-relaxed">
            <strong>Visualizing the Loop</strong>
          </p>
          <p className="leading-relaxed">
            The Holos framework can be visualized as a commutative diagram where reality (
            <strong>R</strong>) is preserved across the transformation:
          </p>
          <MathDisplay>
            {
              "\\begin{array}{ccc} s_0 & \\xrightarrow{C} & P \\\\ & & \\downarrow O \\\\ s_1 & \\xleftarrow{H} & R \\end{array}"
            }
          </MathDisplay>
          <p className="leading-relaxed">Where:</p>
          <p className="leading-relaxed">
            <strong>s₀</strong>: Initial State
          </p>
          <p className="leading-relaxed">
            <strong>C</strong>: Creation (generates set of Possibilities <strong>P</strong>)
          </p>
          <p className="leading-relaxed">
            <strong>O</strong>: Observation (selects Reality <strong>R</strong>)
          </p>
          <p className="leading-relaxed">
            <strong>H</strong>: The realized reality becomes the initial state for the next cycle.
          </p>
          <p className="leading-relaxed">
            <strong>The IDE-Pivot Equation (Succession Operator):</strong> Interacting Dark Energy
            models describe energy flow from the vacuum into the dark sector. The conservation
            equation for Dark Matter density in the presence of a source term is:
          </p>
          <MathDisplay>{"\\dot{\\rho}_{DM} + 3H\\rho_{DM}(1+\\omega_{DM}) = Q_{DM}"}</MathDisplay>
          <p className="leading-relaxed">
            Here <MathInline>{"Q_{DM}"}</MathInline> is the &quot;Succession Operator&quot;: the
            rate at which Dark Energy is reclaimed to fuel the growth of Ordered Dark Matter. Where
            Succession has occurred, <MathInline>{"\\rho_{DE}"}</MathInline> weakens (as the Jan
            2026 DES final analysis observes) and <MathInline>{"\\rho_{DM}"}</MathInline> gains
            localized structure (mass peaks without luminous counterparts, as in the Jan 2026 JWST
            COSMOS-Web map).
          </p>
        </div>
      </section>

      {/* V. Extrapolative Propositions */}
      <section id="extrapolative-propositions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          V. Extrapolative Propositions
          <FootnoteLink number={17} />
        </h2>
        <div className="flex flex-col gap-8">
          {/* Proposition VI */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition VI — Transcension of Intelligence (Extrapolation)
              </h3>
              <p className="text-black/80 leading-relaxed">
                As intelligence approaches maximal informational density, it follows{" "}
                <strong>
                  <a
                    href="https://en.wikipedia.org/wiki/Ephemeralization"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ephemeralization
                  </a>
                </strong>
                <FootnoteLink number={8} />
                —migrating inwardly toward higher densities rather than expanding outwardly across
                space. This is informational migration, not spatial; biological and mechanical
                substrates are abandoned to circumvent stability constraints (
                <a
                  href="https://en.wikipedia.org/wiki/Paul_Ehrenfest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ehrenfest argument
                </a>
                ) of matter in higher dimensions.
              </p>
            </div>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VI.1 — Geometric Resolution of the Fermi Paradox
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Advanced civilizations leave{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Baryon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      baryonic matter
                    </a>{" "}
                    behind to access substrate-independent geometries (e.g., black hole
                    singularities). They rotate out of 3D into higher dimensions, appearing only as
                    gravitational anomalies (Dark Matter) rather than electromagnetic signals.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VI.2 — Event Horizons as Thresholds
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    For higher-dimensional observers, black hole horizons are informational
                    boundaries, not absolute barriers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Proposition VII */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition VII — Recursive Closure (
                <a
                  href="https://en.wikipedia.org/wiki/F-coalgebra"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terminal Coalgebra
                </a>
                )
              </h3>
              <p className="text-black/80 leading-relaxed">
                The &quot;
                <a
                  href="https://en.wikipedia.org/wiki/Omega_Point"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Omega Limit
                </a>
                &quot; is formally the{" "}
                <strong>
                  <a
                    href="https://en.wikipedia.org/wiki/F-coalgebra"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terminal Coalgebra
                  </a>
                </strong>{" "}
                of the Holos functor.
              </p>
            </div>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VII.1 —{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/F-coalgebra"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terminal Coalgebra
                  </a>{" "}
                  Definition
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    If reality is the trajectory of functor <strong>H</strong>, the final state of
                    maximal integration is the fixed point where the system becomes isomorphic to
                    its own transformation:
                  </p>
                  <MathDisplay>{"\\Omega \\cong H(\\Omega)"}</MathDisplay>
                  <p className="leading-relaxed">
                    At limit <strong>Ω</strong>, the distinction between observer and observed
                    collapses. State <strong>Ω</strong> contains all information required to
                    generate itself. This provides mathematical basis for &quot;Unitary
                    Presence&quot; or &quot;God&quot; without theology. It is the structural limit
                    of the recursive system.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VII.2 —{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Indra%27s_net"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Indra&apos;s Net
                  </a>
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Every part of reality reflects the whole; observation is{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Recursion"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      recursively
                    </a>{" "}
                    self-referential.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VII.3 — Semantic Equivalence of the Absolute
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    <a
                      href="https://en.wikipedia.org/wiki/Theism"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Theism
                    </a>
                    ,{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Panentheism"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      panentheism
                    </a>
                    , and atheistic naturalism describe the same ultimate informational fixed point
                    using different{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Frame_(linguistics)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      semantic frames
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VI. Minimal Core */}
      <section id="minimal-core" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          VI. Minimal Core
          <FootnoteLink className="relative left-1 -top-2.5" number={18} />
        </h2>
        <div className="flex flex-col gap-3 text-black/80">
          <p className="leading-relaxed">1. Information exists only relationally</p>
          <p className="leading-relaxed">2. Observation completes reality</p>
          <p className="leading-relaxed">3. Information is conserved</p>
          <p className="leading-relaxed">4. Higher perspectives resolve infinities</p>
          <p className="leading-relaxed">5. Consciousness is the interface of existence</p>
          <p className="leading-relaxed">Everything else follows.</p>
        </div>
      </section>

      {/* VII. Operational Definition */}
      <section id="phi-operationalization" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          VII. Operational Definition
          <FootnoteLink className="relative left-1 -top-2.5" number={19} />
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos defines reality as the recursive relation between Creation and Observation. For
            formal Category Theory definition, see{" "}
            <a href="#mathematical-formalism" className="text-black/80 hover:text-black underline">
              Section IV
            </a>
            .
          </p>
          <div className="my-4 py-4 px-6 bg-black/5 border-l-2 border-black/30 font-mono text-center text-lg">
            R = C ⊛ O
          </div>
          <p className="leading-relaxed">
            <strong>Where:</strong>
          </p>
          <ul className="flex flex-col gap-3 pl-4">
            <li className="leading-relaxed">
              <strong>Creation</strong> (<MathInline>{"C"}</MathInline>): Generation of physical
              possibility structures. Includes Quantum Evolution, Decoherence, and Recording.
            </li>
            <li className="leading-relaxed">
              <strong>Observation</strong> (<MathInline>{"O"}</MathInline>): Ontological
              registration making physical records experienceable. Requires{" "}
              <MathInline>{"Φ ≥ Φ_c"}</MathInline>. Threshold detailed in{" "}
              <a href="/definition" className="text-black/80 hover:text-black underline">
                Definition
              </a>{" "}
              of Φ. <em>Note: Structural, not causal. It selects among consistent histories.</em>
            </li>
            <li className="leading-relaxed">
              <strong>Reality</strong> (<MathInline>{"R"}</MathInline>): The actualized world as
              experienced—collapse of &quot;valid data&quot; into &quot;lived history.&quot;
            </li>
            <li className="leading-relaxed">
              <strong>The Holos Operator</strong> (<MathInline>{"⊛"}</MathInline>): Recursive
              relational operator. <MathInline>{"O"}</MathInline> feeds back to define boundary
              conditions for the next <MathInline>{"C"}</MathInline> cycle.{" "}
              <em>
                Feedback is structural (defining which histories are realized), not causal (creating
                states).
              </em>
            </li>
          </ul>
          <p className="leading-relaxed pt-4">
            <strong>Critical point:</strong> <MathInline>{"R = C ⊛ O"}</MathInline> describes
            structural relation over complete spacetime, not temporal process. ⊛ doesn't modify
            dynamical laws or introduce forces—it specifies which consistent histories attain
            ontological registration.
          </p>
        </div>
      </section>
    </div>
  );
}
