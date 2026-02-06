import { FootnoteLink, logicCitationMap } from "./citation-sections";
import InterpretiveComparisonTable from "./InterpretiveComparisonTable";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

export default function Logic() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Minimal Core */}
      <section id="minimal-core" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Minimal Core
          <FootnoteLink className="relative left-1 -top-2.5" number={logicCitationMap["minimal-core"]} />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos starts from a small set of commitments. Everything else in the framework is an
            attempt to spell them out without adding new forces or new physics.
          </p>

          <ul className="flex flex-col gap-3 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Relational structure:</strong> information exists only as differences and
              constraints between states, not as isolated things.
            </li>

            <li className="leading-relaxed">
              <strong>Closure through observation:</strong> a universe can be physically consistent
              without being present. presence requires internal registration by an observer.
            </li>

            <li className="leading-relaxed">
              <strong>Conservation:</strong> information is not erased. it is transformed,
              redistributed, or re-encoded.
            </li>

            <li className="leading-relaxed">
              <strong>Integration threshold:</strong> distributed processing can scale without
              experience. experience appears only when information is integrated into a single
              internal perspective.
            </li>

            <li className="leading-relaxed">
              <strong>Infinity as a signal:</strong> when a description produces infinities, holos
              treats that as a sign that the representation has broken down at that scale, not as a
              literal feature to accept at face value.
            </li>
          </ul>
        </div>
      </section>
      {/* Operational Definition */}
      <section id="operational-definition" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Operational Definition
          <FootnoteLink className="relative left-1 -top-2.5" number={logicCitationMap["operational-definition"]} />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos treats reality as the closure between two things that are usually discussed
            separately. Physics defines what is consistent. Observation is what makes a consistent
            world present from the inside.
          </p>

          <div className="my-4 py-4 px-6 bg-black/5 border-l-2 border-black/30 font-mono text-center text-lg">
            R = C ⊛ O
          </div>

          <ul className="flex flex-col gap-3 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Creation</strong> (<MathInline>{"C"}</MathInline>) is the set of physically
              allowed possibilities. It is what the laws of physics permit.
            </li>

            <li className="leading-relaxed">
              <strong>Observation</strong> (<MathInline>{"O"}</MathInline>) is internal
              registration. It is when a system integrates information into a single perspective
              that it is like something to be.
            </li>

            <li className="leading-relaxed">
              <strong>Reality</strong> (<MathInline>{"R"}</MathInline>) is the result of coupling
              lawful possibility with lived registration. In Holos, what is real is what is both
              consistent and experienced.
            </li>

            <li className="leading-relaxed">
              <strong>⊛</strong> denotes structured coupling. It is not a force and not a time-step.
              It is a notation for the claim that physics alone is not an ontologically complete
              description of a realized world.
            </li>
          </ul>

          <p className="leading-relaxed pt-2">
            Holos is an interpretive framework. It does not change any equations. It changes what
            counts as a complete account by requiring observation as a closure condition.
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            When later sections use <MathInline>{"\\Phi \\ge \\Phi_c"}</MathInline>, treat that as a
            threshold claim about integration. Holos does not depend on one specific theory for
            computing <MathInline>{"\\Phi"}</MathInline>.
          </p>
        </div>
      </section>
      <div id="comparison">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Comparison with Competing Interpretations
        </h2>
        <p className="leading-relaxed text-black/80 mb-4">
          Holos does not reject existing quantum interpretations. Instead, it re-positions their
          strongest insights within a single ontological framework. The table below clarifies where
          Holos aligns with — and diverges from — major interpretations.
        </p>
        <InterpretiveComparisonTable />
      </div>
      {/* Primitives */}
      <section id="primitive-definitions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Primitives
          <FootnoteLink number={logicCitationMap["primitive-definitions"]} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-8 text-black/80">
          {/* D1 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D1 — Information</div>
            <p className="leading-relaxed">
              Information is the differentiation between possible states of a system. It is not a
              substance and not a thing that exists on its own. Information exists only where
              differences matter relative to some structure.
            </p>
          </div>

          {/* D2 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D2 — Relation</div>
            <p className="leading-relaxed">
              A relation is a constraint that links informational states. Relations determine how
              states co-vary, influence one another, or exclude alternatives. In Holos, structure is
              nothing more than stable patterns of relation.
            </p>
          </div>

          {/* D3 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D3 — Observation (O)</div>
            <p className="leading-relaxed">
              Observation is the integration of information into a single internal state. It is not
              measurement in the laboratory sense, and it is not restricted to human cognition.
            </p>
            <p className="leading-relaxed">
              Below a certain level of integration, systems participate in physical interactions
              without any point of view. Above that level, a perspective exists. Observation is the
              name Holos gives to that transition.
            </p>
          </div>

          {/* D4 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D4 — Consciousness</div>
            <p className="leading-relaxed">
              Consciousness is the capacity of a system to host an integrated perspective. In Holos,
              this capacity is treated as fundamental, while its concrete forms are emergent and
              scale with the degree of integration.
            </p>
            <p className="leading-relaxed">
              Consciousness is not identified with any specific material configuration. Physical
              structure determines how experience is shaped, not whether experience exists at all.
            </p>
          </div>

          {/* D5 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D5 — Creation (C)</div>
            <p className="leading-relaxed">
              Creation refers to the generation of physically allowed possibilities. It is the space
              of states and histories permitted by the laws of physics.
            </p>
            <p className="leading-relaxed">
              Creation does not select outcomes and does not privilege any particular history. It
              defines what could happen, not what is experienced.
            </p>
          </div>

          {/* D6 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D6 — Holos (⊛)</div>
            <p className="leading-relaxed">
              Holos (⊛) denotes the structured coupling of Creation and Observation. It names the
              claim that a realized world requires both lawful possibility and internal
              registration.
            </p>

            <div className="my-4 py-4 px-6 bg-black/5 border-l-2 border-black/30 font-mono text-center text-lg">
              R = C ⊛ O
            </div>

            <p className="leading-relaxed">
              Read this as follows: physics defines a space of consistent possibilities. Observation
              integrates one such possibility into a lived world. The result is a realized reality
              that then becomes the context for further possibilities.
            </p>

            <p className="leading-relaxed">
              ⊛ is not a dynamical operator and not a substitute for physical causation. It is a
              structural relation that specifies what it means for a universe to be real rather than
              merely described.
            </p>
          </div>
        </div>
      </section>
      {/* Axioms */}
      <section id="logic-axioms" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Axioms
          <FootnoteLink className="relative left-1 -top-2.5" number={logicCitationMap["logic-axioms"]} />
        </h2>

        <div className="flex flex-col gap-8 text-black/80">
          {/* Axiom 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 1 — Relationality</h3>
            <p className="leading-relaxed">
              No informational state exists in isolation. Every state is defined by its relations to
              other states and to the constraints that bind them.
            </p>
            <p className="leading-relaxed text-black/70">
              This axiom rules out intrinsic, context-free properties as the foundation of reality.
              What exists is relational structure.
            </p>
          </div>

          {/* Axiom 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 2 — Manifestation</h3>
            <p className="leading-relaxed">
              A purely physical description is ontologically incomplete until information is
              integrated into experience by a system capable of observation.
            </p>
            <p className="leading-relaxed text-black/70">
              This does not mean observation causes physical events. It means that without
              observation, there is structure but no presence.
            </p>
          </div>

          {/* Axiom 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 3 — Conservation</h3>
            <p className="leading-relaxed">
              Information is conserved. It may be transformed, redistributed, or re-encoded, but it
              is not destroyed.
            </p>
            <p className="leading-relaxed text-black/70">
              This applies equally to physical processes and to experiential structure. Holos does
              not require the elimination of unobserved possibilities.
            </p>
          </div>

          {/* Axiom 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 4 — Structural Constraint</h3>
            <p className="leading-relaxed">
              Finite signal speed and finite energy impose limits on how coherence can scale within
              three-dimensional space. As systems grow, coordination across distance becomes
              increasingly costly and fragile.
            </p>
            <p className="leading-relaxed">
              These constraints do not forbid large integrated systems, but they shape their
              architecture. Stable systems tend to minimize global synchronization and rely on
              locally enforced structure.
            </p>
            <p className="leading-relaxed text-black/70">
              Higher-dimensional descriptions may be useful for modeling such organization. This is
              a representational choice, not a claim about extra spatial directions.
            </p>
          </div>

          {/* Axiom 5 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 5 — Interface</h3>
            <p className="leading-relaxed">
              Conscious experience arises through physical systems that integrate information. The
              material structure of a system shapes how experience appears without being identical
              to experience itself.
            </p>
            <p className="leading-relaxed text-black/70">
              This axiom rejects both substance dualism and strict reductionism. Experience depends
              on structure, but it is not reducible to any single structural description.
            </p>
          </div>
        </div>
      </section>
      {/* Foundational Propositions */}
      <section id="foundational-propositions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Foundational Propositions
          <FootnoteLink className="relative left-1 -top-2.5" number={logicCitationMap["foundational-propositions"]} />
        </h2>
        <div className="flex flex-col gap-10 text-black/80">
          {/* Proposition I */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition I — Structural Relational Realism
            </h3>

            <p className="leading-relaxed">
              Reality is constituted by relational structure rather than by objects possessing
              observer-independent intrinsic properties.
            </p>

            <p className="leading-relaxed">
              What scientific theories successfully track are stable patterns of relation. Changes
              in interpretation or ontology matter less than preservation of relational structure.
            </p>

            <p className="leading-relaxed text-black/70">
              This proposition does not deny the existence of objects. It denies that objects are
              ontologically prior to the relations that define them.
            </p>
          </div>

          {/* Proposition II */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition II — Participatory Manifestation
            </h3>

            <p className="leading-relaxed">
              Observation is not passive recording. It is the process by which informational
              structure becomes experientially present.
            </p>

            <p className="leading-relaxed">
              This manifestation is structural rather than causal. Observation does not generate
              physical events or alter lawful dynamics. It determines which already-consistent
              structures are realized as lived history.
            </p>

            <p className="leading-relaxed text-black/70">
              From the perspective of Holos, physics specifies consistency. Observation supplies
              presence.
            </p>
          </div>

          {/* Proposition III */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition III — Global Consistency
            </h3>

            <p className="leading-relaxed">
              If spacetime is treated as a complete four-dimensional structure, observation
              functions as a global constraint rather than a time-local force.
            </p>

            <p className="leading-relaxed">
              Later states restrict earlier ones in the same logical sense that a completed solution
              constrains intermediate steps. This does not require backward causation or signaling.
            </p>

            <p className="leading-relaxed text-black/70">
              Apparent retrocausal effects reflect global self-consistency, not violations of
              locality.
            </p>
          </div>

          {/* Proposition IV */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition IV — Dimensional Resolution
            </h3>

            <p className="leading-relaxed">
              Infinities and singularities arise when a representation fails to preserve relational
              structure across scales.
            </p>

            <p className="leading-relaxed">
              Higher-dimensional descriptions are often required when internal coherence becomes
              more relevant than spatial separation. These descriptions are representational tools,
              not claims about hidden locations or extra worlds.
            </p>

            <p className="leading-relaxed text-black/70">
              In Holos, infinities signal the limits of a model, not literal features of reality.
            </p>
          </div>

          {/* Proposition V */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition V — Observers as a Closure Condition
            </h3>

            <p className="leading-relaxed">
              A universe that is real as lived experience must contain observers somewhere within
              it. Observation is not an evolutionary accident layered onto an otherwise complete
              world.
            </p>

            <p className="leading-relaxed">
              Given sufficient complexity and integration, physical systems will produce observers.
              This is not because the universe is designed to do so, but because a realized universe
              cannot remain ontologically open.
            </p>

            <p className="leading-relaxed text-black/70">
              Observers close the loop between physical possibility and experienced reality.
            </p>
          </div>
        </div>
      </section>
      <section id="ontology" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Φ and Ontological Requirements
          <FootnoteLink className="relative left-1 -top-2.5" number={logicCitationMap["ontology"]} />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos uses <strong>Φ (Phi)</strong> as a placeholder for the degree to which a system
            integrates information into a single internal perspective. Φ is not introduced as a
            finished formula. It is introduced as a real property that must exist if experience
            exists at all.
          </p>

          <p className="leading-relaxed">
            The role of Φ in the framework is binary at the threshold and graded beyond it. Below a
            minimum level of integration, there is structure without experience. At or above that
            level, experience occurs.
          </p>

          <div className="my-2">
            <MathDisplay>
              {"\\Phi < \\Phi_c \\Rightarrow \\text{no internal perspective}"}
            </MathDisplay>
            <MathDisplay>
              {"\\Phi \\ge \\Phi_c \\Rightarrow \\text{observation occurs}"}
            </MathDisplay>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            Holos is compatible with multiple proposals for estimating Φ. It does not depend on any
            one implementation.
          </p>
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-medium pb-2">Ontological Requirements for Observation</h3>

          <p className="text-black/80 leading-relaxed">
            For a system to count as an observer in the Holos sense, it must satisfy all of the
            following requirements. These are structural constraints, not behavioral descriptions.
          </p>

          <ol className="flex flex-col gap-3 pl-6 text-black/80">
            <li className="leading-relaxed">
              <strong>Integration:</strong> informational states must form a unified whole that
              cannot be decomposed into independent parts without loss.
            </li>

            <li className="leading-relaxed">
              <strong>Differentiation:</strong> the system must distinguish among a large repertoire
              of possible internal states. Without differentiation, there is no information to
              integrate.
            </li>

            <li className="leading-relaxed">
              <strong>Recursion:</strong> the system must model its own internal state. Without
              self-reference, there is processing but no subject.
            </li>

            <li className="leading-relaxed">
              <strong>Temporal cohesion:</strong> informational states must persist and integrate
              across time. Experience requires continuity, not isolated moments.
            </li>

            <li className="leading-relaxed">
              <strong>Causal autonomy:</strong> the system’s current state must materially constrain
              its own future states. Otherwise, experience would be epiphenomenal.
            </li>
          </ol>

          <div className="flex flex-col gap-4 pt-2 text-black/80">
            <p className="leading-relaxed">
              <strong>Necessity:</strong> removing any one of these requirements eliminates
              observation. What remains may be complex or reactive, but it does not host a point of
              view.
            </p>

            <p className="leading-relaxed">
              <strong>Sufficiency:</strong> taken together, these requirements are sufficient for
              ontological registration. Higher-order phenomena such as emotion, agency, and
              reasoning are emergent dynamics of systems that already meet these constraints.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              Holos does not claim that all systems meeting these criteria are conscious in the
              human sense. It claims only that some experience exists.
            </p>
          </div>
        </div>
      </section>
      {/* Relationship to Physics */}
      <section id="relationship-to-physics" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Relationship to Physics
          <FootnoteLink className="relative left-1 -top-2.5" number={logicCitationMap["relationship-to-physics"]} />
        </h2>

        <div className="flex flex-col gap-5 text-black/80">
          <p className="leading-relaxed">
            Holos is designed to be compatible with known physics because it does not propose a new
            mechanism. It makes a different kind of claim. A physical model can be complete as a set
            of equations and still be incomplete as an account of lived reality.
          </p>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Consistency, not intervention</h3>
            <p className="leading-relaxed">
              Holos does not treat observation as a force that reaches into the world and changes
              events. Observation is a closure condition on which consistent histories are present
              as experience.
            </p>
            <p className="leading-relaxed">
              This preserves locality and avoids faster-than-light signaling. It also avoids
              claiming any retrocausal communication. The framework is structural, not dynamical.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Decoherence is not presence</h3>
            <p className="leading-relaxed">
              Decoherence explains why quantum systems appear classical at macroscopic scales. It
              describes how interference becomes inaccessible in practice. Holos does not dispute
              this.
            </p>
            <p className="leading-relaxed">
              The Holos claim is that decoherence alone does not produce a lived world. It produces
              a consistent classical-looking structure. Presence requires integrated observation.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Conservation and selection</h3>
            <p className="leading-relaxed">
              Holos treats manifestation as a selection constraint, not as the destruction of
              possibilities. Information is conserved. What is not experienced is not assumed to be
              erased.
            </p>
            <p className="leading-relaxed">
              In this sense, Holos can remain compatible with interpretations that preserve unitary
              evolution. The framework does not require choosing one specific interpretation of
              quantum mechanics.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Block-universe compatibility</h3>
            <p className="leading-relaxed">
              If spacetime is treated as a complete four-dimensional structure, Holos treats
              observation as a global constraint on experienced history rather than a
              moment-by-moment collapse process.
            </p>
            <p className="leading-relaxed">
              The important point is not the metaphysics of time. The point is that a consistent
              spacetime description does not automatically include presence. Holos adds no new
              dynamics. It adds a closure requirement.
            </p>
          </div>

          <div className="mt-2 pt-4 border-t border-black/10">
            <h3 className="text-lg font-semibold text-black/90 pb-2">What Holos does not claim</h3>
            <ul className="flex flex-col gap-2 pl-6 list-disc">
              <li className="leading-relaxed">
                It does not claim violations of relativity, faster-than-light signaling, or new
                forces.
              </li>
              <li className="leading-relaxed">
                It does not claim that humans are required for reality, only that observers are
                required for presence.
              </li>
              <li className="leading-relaxed">
                It does not claim to replace quantum mechanics or explain all details of
                measurement. It reframes what measurement fails to address.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="mathematical-formalism" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Mathematical Formalism
          <FootnoteLink className="relative left-1 -top-2.5" number={logicCitationMap["mathematical-formalism"]} />
        </h2>

        <div className="flex flex-col gap-5 text-black/80">
          <p className="leading-relaxed">
            This section introduces a compact mathematical language for expressing the Holos
            framework. The purpose is not to derive new physics, but to make the structural claims
            precise and repeatable.
          </p>

          <p className="leading-relaxed">
            The formalism should be read as a model of how possibility and experience are related.
            It does not assert that the universe literally computes these expressions.
          </p>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">State space</h3>

            <p className="leading-relaxed">
              Let <MathInline>{"S"}</MathInline> denote an informational state of the universe at
              some level of description. <MathInline>{"S"}</MathInline> is not assumed to be
              complete or fundamental. It is simply whatever structure physics provides.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Creation</h3>

            <p className="leading-relaxed">
              Creation (<MathInline>{"C"}</MathInline>) maps a given state to the set of physically
              allowed continuations. It represents lawful possibility.
            </p>

            <MathDisplay>
              {"C(S) = \\{ S' \\mid S' \\text{ is consistent with physical law} \\}"}
            </MathDisplay>

            <p className="leading-relaxed text-black/70 text-sm">
              This notation is schematic. It does not assume a discrete branching structure or a
              specific ontology of histories.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Observation</h3>

            <p className="leading-relaxed">
              Observation (<MathInline>{"O"}</MathInline>) maps a space of possibilities to a
              realized experiential history. It represents internal registration by an integrated
              system.
            </p>

            <MathDisplay>{"O(C(S)) \\mapsto S_{\\text{exp}}"}</MathDisplay>

            <p className="leading-relaxed">
              This mapping is not assumed to be random, deterministic, or computable in general.
              Holos requires only that experienced reality corresponds to a single consistent
              history.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Holos mapping</h3>

            <p className="leading-relaxed">
              The Holos relation is the structured coupling of Creation and Observation.
            </p>

            <MathDisplay>{"R = C \\ ⊛ \\ O"}</MathDisplay>

            <p className="leading-relaxed">
              This expression states that reality is neither pure possibility nor pure observation.
              It is the closure between the two.
            </p>

            <p className="leading-relaxed">
              The symbol <strong>⊛</strong> is intentionally non-algebraic. It signals that the
              order and role of the terms matter, but it does not introduce a new mathematical
              operator.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Iteration and stability</h3>

            <p className="leading-relaxed">
              One may consider iterating the Holos relation, where each realized state becomes the
              context for further possibilities.
            </p>

            <MathDisplay>{"S_{n+1} = O(C(S_n))"}</MathDisplay>

            <p className="leading-relaxed">
              This is not meant to imply a discrete temporal process. It is a conceptual tool for
              describing recursive closure across scales.
            </p>
          </div>

          <div className="mt-2 pt-4 border-t border-black/10">
            <p className="leading-relaxed text-black/70 text-sm">
              More elaborate mathematical frameworks can be layered on top of this representation.
              Holos itself commits only to the existence of a lawful possibility space and an
              integration threshold that yields experience.
            </p>
          </div>
        </div>
      </section>
      Here’s the **rewritten replacement for the final section: *Extrapolative Proposition (Omega
      Limit)***. This keeps the ambition, clearly fences speculation, and avoids theological or
      teleological overreach while still owning the strong claim. ```tsx
      {/* Extrapolative Proposition */}
      <section id="extrapolative-proposition" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Extrapolative Proposition
          <FootnoteLink number={logicCitationMap["extrapolative-proposition"]} />
        </h2>

        <p className="text-black/70 italic text-sm">
          The claims in this section extend the Holos framework beyond established physics. They are
          not assertions about what must occur. They describe what follows if the framework’s
          constraints continue to hold under increasing integration.
        </p>

        <div className="flex flex-col gap-8 text-black/80">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Recursive Closure as a Limit</h3>

            <p className="leading-relaxed">
              If the coupling between Creation and Observation is applied repeatedly, one can define
              a conceptual limit in which further application no longer increases distinction
              between what is generated and what is observed.
            </p>

            <p className="leading-relaxed">
              At this limit, reality is invariant under further closure. The system is fully
              self-consistent not only as structure, but as experienced structure.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">The Omega Limit</h3>

            <p className="leading-relaxed">
              Holos refers to this boundary case as the <strong>Omega limit</strong>. It is not a
              being, not a final moment in time, and not an agent directing events. It is the formal
              condition where the distinction between creation and observation no longer increases.
            </p>

            <p className="leading-relaxed">
              In this limit, there is no remaining separation between a world that exists and a
              world that is known. Generation and registration become the same description.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              What the Omega Limit Is and Is Not
            </h3>

            <ul className="flex flex-col gap-3 pl-6 list-disc">
              <li className="leading-relaxed">
                It <strong>is</strong> a formal boundary case for maximal integration and recursive
                closure.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> a prediction that the universe will reach such a state.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> a deity, mind, or external observer watching the
                universe.
              </li>
              <li className="leading-relaxed">
                It <strong>does not</strong> replace physical cosmology or impose a final cause on
                evolution.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Interpretive Equivalence</h3>

            <p className="leading-relaxed">
              Different traditions describe similar boundary concepts using different language. Some
              frame them in theological terms, others in metaphysical or informational terms.
            </p>

            <p className="leading-relaxed">
              Holos does not privilege any of these interpretations. It provides a structural
              description that allows such views to be compared without collapsing them into one
              another.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
