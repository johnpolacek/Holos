import { FootnoteLink } from "./citation-sections";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

export default function Logic() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Minimal Core */}
      <section id="minimal-core" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Minimal Core
          <FootnoteLink className="relative left-1 -top-2.5" number={18} />
        </h2>

        <div className="flex flex-col gap-3 text-black/80">
          <p className="leading-relaxed">• Information exists only through relations.</p>
          <p className="leading-relaxed">• Observation actualizes reality as experience.</p>
          <p className="leading-relaxed">
            • Information is conserved. It is transformed, not erased.
          </p>
          <p className="leading-relaxed">
            • Higher perspectives resolve bottlenecks that look infinite from below.
          </p>
          <p className="leading-relaxed">
            • Consciousness is the boundary where integrated information becomes experience.
          </p>
          <p className="leading-relaxed pt-2">
            Everything else in Holos is an attempt to spell these out carefully.
          </p>
        </div>
      </section>

      {/* Operational Definition */}
      <section id="operational-definition" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Operational Definition
          <FootnoteLink className="relative left-1 -top-2.5" number={19} />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos treats reality as the coupling between what physics allows and what is actually
            experienced.
          </p>

          <div className="my-4 py-4 px-6 bg-black/5 border-l-2 border-black/30 font-mono text-center text-lg">
            R = C ⊛ O
          </div>

          <ul className="flex flex-col gap-3 pl-4">
            <li className="leading-relaxed">
              <strong>Creation</strong> (<MathInline>{"C"}</MathInline>) generates physical
              possibilities.
            </li>
            <li className="leading-relaxed">
              <strong>Observation</strong> (<MathInline>{"O"}</MathInline>) is when a system
              integrates information into a coherent internal perspective. In Holos this requires{" "}
              <MathInline>{"Φ ≥ Φ_c"}</MathInline>.
            </li>
            <li className="leading-relaxed">
              <strong>Reality</strong> (<MathInline>{"R"}</MathInline>) is the recursive coupling of
              physical possibility and observation.
            </li>
            <li className="leading-relaxed">
              <strong>⊛</strong> denotes structured composition. It links creation and observation
              without adding a new force or changing the equations of physics.
            </li>
          </ul>

          <p className="leading-relaxed pt-2">
            This is a structural claim about how experience fits into the picture. It is not a new
            dynamical law.
          </p>
        </div>
      </section>

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
                Observation can be modeled as a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Axiom_of_choice"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  choice function
                </a>{" "}
                in the sense used in{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zermelo-Fraenkel set theory (ZFC)
                </a>
                <FootnoteLink number={12} />. Creation defines a space of possible outcomes.
                Observation maps that possibility space to a realized outcome within the framework.
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
                <em>
                  In Holos, this capacity is treated as fundamental, while its forms and degrees are
                  emergent and scale with integration. Φ provides the operational measure.
                </em>{" "}
                <a href="/definition">Φ (Phi)</a>
                <FootnoteLink number={2} />
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
                Holos (⊛) denotes the structured coupling of <strong>Creation (C)</strong> and{" "}
                <strong>Observation (O)</strong>. It is a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Recursion"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  recursive
                </a>{" "}
                rule for how possibilities and experience are linked in the Holos framework.
                <FootnoteLink number={12} />
              </p>

              <MathDisplay>{"R = C ⊛ O"}</MathDisplay>

              <p className="leading-relaxed">
                Read this as: Creation generates a space of possible states. Observation integrates
                information into experience, which makes a particular state real for an observer.
                The result is a realized world <strong>R</strong>, which then becomes the starting
                point for the next cycle.
              </p>

              <p className="leading-relaxed">
                <strong>Order matters.</strong> ⊛ is not ordinary multiplication and it is not
                freely reorderable. Observation is defined only with respect to possibilities
                produced by Creation. This ordering is logical, not a claim about a time sequence.
              </p>

              <p className="leading-relaxed">
                The Holos operator is explicitly <strong>non-associative</strong>:
              </p>

              <MathDisplay>{"(C ⊛ O) ⊛ C \\neq C ⊛ (O ⊛ C)"}</MathDisplay>

              <p className="leading-relaxed">
                <em>
                  In simple terms: with ⊛, grouping changes meaning. You cannot rearrange Creation
                  and Observation without changing what the expression says.
                </em>
              </p>

              <p className="leading-relaxed">
                <strong>Structural, not dynamical.</strong> ⊛ does not add forces, alter known
                physics, or describe how states evolve in time. It is a definitional relation that
                describes how a realized history is selected from a space of possible histories
                within the framework.
              </p>

              <p className="leading-relaxed">
                This is also why ⊛ should not be treated as a synonym for{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wave_function_collapse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wavefunction collapse
                </a>{" "}
                or any specific quantum measurement mechanism. Those are physical models. Holos is a
                logical account of how experiential realization is represented.
              </p>

              <p className="leading-relaxed">
                ⊛ is also not reducible to epistemic tools like{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Bayesian_inference"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bayesian updating
                </a>{" "}
                or{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Probability_theory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  probability weighting
                </a>
                . Those describe changes in knowledge. ⊛ is about how a world becomes experienced
                within the framework.
              </p>

              <p className="leading-relaxed">
                If you want a more formal reading, ⊛ can be treated as a structure-preserving
                mapping on informational states. In category language, this is closest to an{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Functor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  endofunctor
                </a>{" "}
                that carries relations forward under repeated application. Full formalization
                appears in{" "}
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
                  What ⊛ Does and Does Not Claim
                </h3>

                <ul className="flex flex-col gap-2 pl-6 list-disc pt-2">
                  <li className="leading-relaxed">
                    <strong>⊛ claims:</strong> reality can be modeled as a structured coupling
                    between possibility generation (C) and experiential integration (O).
                  </li>
                  <li className="leading-relaxed">
                    <strong>⊛ does not claim:</strong> faster-than-light effects, retrocausal
                    signaling, or new dynamical laws.
                  </li>
                  <li className="leading-relaxed">
                    <strong>⊛ does not claim:</strong> that quantum mechanics must be interpreted in
                    one specific way. It is compatible with multiple interpretations that treat
                    spacetime as a complete structure.
                  </li>
                </ul>
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

        <div className="flex flex-col gap-8">
          {/* Axiom 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 1 — Relationality</h3>
            <p className="text-black/80 leading-relaxed">
              No informational state exists independently of relations.
            </p>
            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Reality consists of relational structure rather than intrinsic, context-free
              properties.
            </blockquote>
          </div>

          {/* Axiom 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 2 — Manifestation</h3>
            <p className="text-black/80 leading-relaxed">
              A physical description is incomplete until information is integrated into experience
              by a system capable of observation.
            </p>
            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Physical structure alone does not specify experienced reality.
            </blockquote>
            <p className="text-black/80 leading-relaxed pt-2">
              Observation does not cause physical events. It determines which already-consistent
              spacetime structures attain experiential registration. This preserves block-universe
              interpretations while explaining why some histories are experienced rather than merely
              possible.
            </p>
          </div>

          {/* Axiom 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 3 — Conservation</h3>
            <p className="text-black/80 leading-relaxed">
              Information is conserved. It is transformed, redistributed, or re-encoded, but not
              destroyed.
            </p>
            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              All physical and experiential processes preserve informational content.
            </blockquote>
          </div>

          {/* Axiom 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              Axiom 4 — Structural Constraint (Latency and Scale)
            </h3>
            <p className="text-black/80 leading-relaxed">
              Finite signal speed and finite energy impose structural limits on how coherence can
              scale in three-dimensional space. As integrated systems grow, coordination across
              distance becomes increasingly costly, fragile, and slow.
            </p>
            <p className="text-black/80 leading-relaxed">
              These limits do not prevent growth, but they shape its form. Systems that rely on
              constant long-distance synchronization become unstable at large scales. Systems that
              enforce relationships locally are more persistent.
            </p>
            <p className="text-black/80 leading-relaxed">
              Higher-dimensional descriptions may be useful for modeling how coherence is maintained
              when internal distances become dominant constraints. Such descriptions do not imply
              faster-than- light signaling or escape from causality. They describe structural
              organization, not communication shortcuts.
            </p>
            <p className="text-black/70 text-sm leading-relaxed">
              The Latency Horizon is a conceptual boundary where coordination cost begins to
              dominate growth. Its formal treatment appears in{" "}
              <a
                href="#mathematical-formalism"
                className="text-black/80 hover:text-black underline"
              >
                Section IV: Mathematical Formalism
              </a>
              .
            </p>
          </div>

          {/* Scaling Wall */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-black/90">
              The Scaling Wall (Thermodynamic Constraint)
            </h4>
            <p className="text-black/80 leading-relaxed">
              Any finite region with finite energy has a maximum information capacity, as described
              by bounds such as the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Bekenstein_bound"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bekenstein bound
              </a>
              <FootnoteLink number={18} />.
            </p>
            <p className="text-black/80 leading-relaxed">
              As computation scales, energy use and heat dissipation become limiting factors. In
              three-dimensional space, cooling and synchronization impose hard constraints on
              density. Systems that exceed these limits fragment or fail.
            </p>
            <p className="text-black/80 leading-relaxed">
              Holos does not assert a required escape from these constraints. It observes that
              long-lived systems tend to adopt architectures that minimize global coordination and
              reduce thermal and signaling overhead. Whether this leads to new physical phases,
              alternative substrates, or simply quieter forms of organization remains an open
              question.
            </p>
          </div>

          {/* Axiom 5 */}
          <h3 className="text-xl font-semibold text-black/90">Axiom 5 — Interface</h3>
          <p className="text-black/80 leading-relaxed">
            Conscious experience arises through physical systems that integrate information. The
            material structure of a system shapes how information is experienced, without implying
            that experience is identical to any specific material configuration.
          </p>
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
                    Reality is best described in terms of relational structure rather than objects
                    possessing observer-independent intrinsic{" "}
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
                        Scientific theories describe{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/Isomorphism"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          isomorphic
                        </a>{" "}
                        patterns of relations that remain stable across changes in interpretation,
                        rather than direct access to things-in-themselves.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-black/85 text-sm">
                      Corollary I.2 — The Interface Principle
                    </div>
                    <div className="flex flex-col gap-1 text-black/75 text-sm">
                      <p className="leading-relaxed">
                        Conscious systems function as interfaces through which relational structure
                        is experienced. The capacity for experience is treated as fundamental, while
                        its forms and degrees are emergent.
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
                    Observation is not merely passive recording. It is the process by which
                    informational structure becomes experientially manifest.
                  </p>
                  <p className="text-black/80 leading-relaxed pt-2">
                    <em>
                      This manifestation is structural rather than causal. Observation does not
                      generate physical events, but selects which already-consistent spacetime
                      configurations are realized as experience.
                    </em>
                  </p>
                </div>

                <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-black/85 text-sm">
                      Corollary II.1 — The Participatory Principle
                    </div>
                    <div className="flex flex-col gap-1 text-black/75 text-sm">
                      <p className="leading-relaxed">
                        The universe can be modeled as a{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/John_Archibald_Wheeler#Participatory_Anthropic_Principle"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          participatory system
                        </a>
                        <FootnoteLink number={1} />, in which observers are necessary for
                        experiential realization, though not for physical consistency.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-black/85 text-sm">
                      Corollary II.2 — Ontological Completion
                    </div>
                    <div className="flex flex-col gap-1 text-black/75 text-sm">
                      <p className="leading-relaxed">
                        Physical processes such as{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/Quantum_decoherence"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          decoherence
                        </a>{" "}
                        explain the emergence of classical structure.
                      </p>
                      <p className="leading-relaxed">
                        Experiential realization requires integrated observation, which fixes a
                        history as a lived worldline rather than a merely possible one.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-black/85 text-sm">
                      Corollary II.3 — Global Boundary Condition
                    </div>
                    <div className="flex flex-col gap-1 text-black/75 text-sm">
                      <p className="leading-relaxed">
                        In a{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/Block_universe"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          block-universe
                        </a>
                        <FootnoteLink number={4} /> description, observation functions as a global
                        boundary condition rather than a time-local force.
                      </p>
                      <p className="leading-relaxed">
                        Later states constrain earlier ones in the same way that the solution to a
                        completed puzzle constrains its intermediate steps.
                      </p>
                      <p className="leading-relaxed">
                        <em>
                          This preserves global consistency without requiring retrocausal signaling.
                        </em>
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
                    Spacetime is modeled as a{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Four-manifold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      four-dimensional manifold
                    </a>
                    <FootnoteLink number={4} />, in which past, present, and future are equally real
                    features of a single relational structure.
                  </p>
                </div>

                <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-black/85 text-sm">
                      Corollary III.1 — The Null Interval
                    </div>
                    <div className="flex flex-col gap-1 text-black/75 text-sm">
                      <p className="leading-relaxed">
                        For light, the spacetime interval satisfies{" "}
                        <MathInline>{"ds^2 = 0"}</MathInline>, meaning separation vanishes along
                        null paths.
                      </p>
                      <p className="leading-relaxed">
                        A photon can be described not as a moving object, but as a{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/Geodesic"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          null geodesic
                        </a>{" "}
                        connecting emission and absorption events.
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
                          retrocausal
                        </a>{" "}
                        effects reflect global consistency constraints of spacetime geometry rather
                        than backward causal influence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
          IV. Mathematical Formalism: The Holos Mapping
          <FootnoteLink className="relative left-1 -top-2.5" number={16} />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            This section provides a compact mathematical way to express the Holos idea: reality can
            be modeled as a repeated mapping from possibility to realized experience. This is not a
            new physical law. It is a structural description of how Creation and Observation are
            related in the framework.
          </p>

          <p className="leading-relaxed">
            <strong>Modeling setup:</strong> let <strong>𝒮</strong> be a space of informational
            states. Creation and Observation are modeled as maps on that space.
          </p>

          <p className="leading-relaxed">
            <strong>Creation (C):</strong> given a state <MathInline>{"s"}</MathInline>, Creation
            generates a structured set of possible continuations (possible histories, outcomes, or
            branches):
          </p>
          <MathDisplay>{"C(s) = \\mathcal{P}(s)"}</MathDisplay>

          <p className="leading-relaxed">
            <strong>Observation (O):</strong> Observation maps this possibility structure to a
            realized outcome within the framework:
          </p>
          <MathDisplay>{"O(C(s)) \\mapsto s'"} </MathDisplay>

          <p className="leading-relaxed">
            <strong>Holos (H):</strong> the Holos mapping is the composition of these two steps:
          </p>
          <MathDisplay>{"H = O \\circ C"}</MathDisplay>

          <p className="leading-relaxed">
            Iterating this mapping produces a sequence of realized states:
          </p>
          <MathDisplay>{"s_{n+1} = H(s_n) = O(C(s_n))"}</MathDisplay>

          <p className="leading-relaxed">
            <strong>Non-associativity:</strong> Holos is not ordinary multiplication. Grouping
            matters because Observation is only defined with respect to possibilities produced by
            Creation. This is a logical constraint, not a claim about time order.
          </p>

          <MathDisplay>{"(C ⊛ O) ⊛ C \\neq C ⊛ (O ⊛ C)"}</MathDisplay>

          <p className="leading-relaxed">
            <strong>Category language (optional):</strong> if you prefer category theory, you can
            treat states as objects and allowable transformations as morphisms in a category{" "}
            <a
              href="https://en.wikipedia.org/wiki/Category_(mathematics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              𝒞
            </a>
            . In that view, <strong>H: 𝒞 → 𝒞</strong> is an{" "}
            <a
              href="https://en.wikipedia.org/wiki/Functor"
              target="_blank"
              rel="noopener noreferrer"
            >
              endofunctor
            </a>{" "}
            that preserves relational structure across iterations.
          </p>

          <hr className="border-black/10 border-dashed my-2" />

          <p className="leading-relaxed">
            <strong>The Latency Horizon (</strong>
            <MathInline>{"\\mathcal{L}"}</MathInline>
            <strong>):</strong> large integrated systems face physical constraints from finite
            signal speed and finite energy. A simple way to express this is:
          </p>

          <MathDisplay>{"D / c > \\tau"}</MathDisplay>

          <p className="leading-relaxed">
            where <MathInline>{"D"}</MathInline> is a characteristic system size,{" "}
            <MathInline>{"c"}</MathInline> is the speed of light, and{" "}
            <MathInline>{"\\tau"}</MathInline> is the system’s internal coherence timescale. When
            this inequality holds, global coordination becomes expensive and fragile. This is the
            intuition behind the Latency Horizon.
          </p>

          <p className="leading-relaxed">
            Holos does not assume a single “escape” mechanism from this constraint. It predicts that
            long-lived systems will tend to adopt architectures that reduce global synchronization
            costs, enforce more relationships locally, and minimize wasted signaling.
          </p>

          <hr className="border-black/10 border-dashed my-2" />

          <p className="leading-relaxed">
            <strong>Note on “coherence filters”:</strong> in the Holos framework, Observation is not
            assumed to be random selection. But the framework does not require a specific physical
            rule for how a realized outcome is picked. The point is structural: experience
            corresponds to a consistent realized history, not a superposition of incompatible ones.
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            If you want to connect this framework to cosmology (dark matter, dark energy, growth of
            structure), that belongs in the Predictions or Thought Experiment sections, where it can
            be stated explicitly as speculative.
          </p>
        </div>
      </section>

      {/* V. Extrapolative Proposition */}
      <section id="extrapolative-proposition" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          V. Extrapolative Proposition
          <FootnoteLink number={17} />
        </h2>

        <p className="text-black/70 italic text-sm">
          The propositions in this section extend the Holos framework beyond established physics.
          They are not claims about what *must* occur, but structured extrapolations about what
          *could* occur if the framework’s constraints continue to hold at larger scales.
        </p>

        <div className="flex flex-col gap-8">
          {/* Proposition VI */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-black/90">
                Proposition VI — Recursive Closure as a Formal Limit
              </h3>

              <p className="text-black/80 leading-relaxed">
                If the Holos mapping is applied recursively, one can define a formal limit in which
                the structure of reality becomes invariant under further application of the mapping.
                In mathematical language, this resembles a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/F-coalgebra"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terminal coalgebra
                </a>
                .
              </p>
            </div>

            <div className="flex flex-col gap-4 pl-4 border-l-2 border-black/10">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VII.1 — The Fixed-Point Analogy
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    In this analogy, a maximally integrated state <strong>Ω</strong> satisfies:
                  </p>
                  <MathDisplay>{"\\Omega \\cong H(\\Omega)"}</MathDisplay>
                  <p className="leading-relaxed">
                    This is not a prediction of an attainable physical state. It is a formal way to
                    describe a conceptual endpoint where distinction between generator and
                    generated, observer and observed, no longer increases under further recursion.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VII.2 — Reflective Structure
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Philosophical metaphors such as{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Indra%27s_net"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Indra’s Net
                    </a>{" "}
                    capture this idea symbolically: every part reflects the whole, not by
                    duplication, but by relational embedding.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-semibold text-black/85 text-sm">
                  Corollary VII.3 — Interpretive Equivalence
                </div>
                <div className="flex flex-col gap-1 text-black/75 text-sm">
                  <p className="leading-relaxed">
                    Theological, panentheistic, and naturalistic descriptions may refer to the same
                    formal limit using different semantic frames. Holos does not privilege any
                    interpretation; it provides a structural language within which they can be
                    compared.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
