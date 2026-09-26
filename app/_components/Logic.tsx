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
          <FootnoteLink
            className="relative left-1 -top-2.5"
            number={logicCitationMap["minimal-core"]}
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos starts from a small set of commitments. Everything else in the framework is an
            attempt to spell them out. Two commitments are genuine additions to the physical
            picture: the integration threshold, and the totality. Neither is a new dynamical law,
            but both are new structural claims.
          </p>

          <ul className="flex flex-col gap-3 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Relational structure:</strong> information exists only as differences and
              constraints between states, not as isolated things.
            </li>

            <li className="leading-relaxed">
              <strong>Closure through observation:</strong> a universe can be physically consistent
              without being present. Presence requires internal registration by an observer, and it
              reaches as far as that observer&apos;s causal past.
            </li>

            <li className="leading-relaxed">
              <strong>Conservation:</strong> information is not erased. It is transformed,
              redistributed, or re-encoded.
            </li>

            <li className="leading-relaxed">
              <strong>Integration threshold:</strong> distributed processing can scale without
              experience. Experience appears only when information about a world is integrated into
              a single internal perspective.
            </li>

            <li className="leading-relaxed">
              <strong>The totality:</strong> the whole of reality, Omega, is fundamental and is the
              one experiencer. Every finite observer is a local aperture of it: an opening through
              which the whole experiences.
            </li>

            <li className="leading-relaxed">
              <strong>Infinity as a signal:</strong> when a description produces infinities, Holos
              treats that as a sign that the representation has broken down at that scale, not as a
              literal feature to accept at face value.
            </li>
          </ul>

          <p className="leading-relaxed">
            <strong>How the commitments fit together.</strong> Only two items above are additions to
            physics: the integration threshold and the totality. The rest are interpretive
            commitments about how to read the physics we already have. Around them, Holos also takes
            sides and leaves questions open, and it says which is which:
          </p>

          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Additions to physics:</strong> the threshold{" "}
              <MathInline>{"\\Phi_c"}</MathInline>, where apertures open; and Omega, the one
              experiencer.
            </li>
            <li className="leading-relaxed">
              <strong>Sides taken:</strong> branching quantum mechanics with no collapse; Born
              weights as self-locating odds; lit regions as the causal pasts of observers, with
              experience lived only inside them; experience and activity as two sides of one event.
            </li>
            <li className="leading-relaxed">
              <strong>Observer requirements:</strong> six structural conditions, with a provisional
              maximality rule for where one observer ends.
            </li>
            <li className="leading-relaxed">
              <strong>Open problems:</strong> the measure of integration, the value of the
              threshold, and the boundaries between observers.
            </li>
            <li className="leading-relaxed">
              <strong>Companion ideas, not core:</strong> the Integration Hypothesis and the Teeming
              Dark. If they fail, the core stands.
            </li>
          </ul>
        </div>
      </section>
      {/* Operational Definition */}
      <section id="operational-definition" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Operational Definition
          <FootnoteLink
            className="relative left-1 -top-2.5"
            number={logicCitationMap["operational-definition"]}
          />
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
              registration. It occurs when a system integrates information into a single perspective
              such that there is something it is like to be that system.
            </li>

            <li className="leading-relaxed">
              <strong>Reality</strong> (<MathInline>{"R"}</MathInline>) is the result of coupling
              lawful possibility with lived registration. Holos uses &quot;real&quot; at two
              strengths: structure is real whether or not it is lived, and{" "}
              <MathInline>{"R"}</MathInline> names reality in the full sense, structure that is also
              lived. Three words keep this precise. &quot;Lived&quot; marks where experience occurs:
              inside observers. &quot;Lit&quot; marks the causal past of an observer, the world its
              experience is made from and about. &quot;Unlit&quot; marks structure outside every
              observer&apos;s causal past.
            </li>

            <li className="leading-relaxed">
              <strong>⊛</strong> denotes composition: possibility, then registration, in logical
              rather than temporal order. It is not a force and not a time-step. It is a notation
              for the claim that physics describes a realized world only from outside: it fixes what
              is lived, but cannot state that it is lived.
            </li>
          </ul>

          <p className="leading-relaxed pt-2">
            Holos is an interpretive framework. It changes what counts as a complete account by
            requiring observation as a closure condition.
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
          Holos re-positions the strongest insights of existing quantum interpretations within a
          single ontological framework. On the physics it takes a side: no collapse, no erased
          possibilities, branching when registrations diverge. That is the Many-Worlds picture. Its
          divergence from Many-Worlds is ontological: branching alone does not say which structures
          are present as experience. The table below clarifies where Holos aligns with, and diverges
          from, major interpretations.
        </p>
        <InterpretiveComparisonTable />
      </div>
      {/* Primitives */}
      <section id="primitive-definitions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Primitives
          <FootnoteLink
            number={logicCitationMap["primitive-definitions"]}
            className="relative left-1 -top-2.5"
          />
        </h2>
        <div className="flex flex-col gap-8 text-black/80">
          {/* D1 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D1: Information</div>
            <p className="leading-relaxed">
              Information is the differentiation between possible states of a system. It is not a
              substance and not a thing that exists on its own. Information exists only where
              differences matter relative to some structure.
            </p>
          </div>

          {/* D2 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D2: Relation</div>
            <p className="leading-relaxed">
              A relation is a constraint that links informational states. Relations determine how
              states co-vary, influence one another, or exclude alternatives. In Holos, structure is
              nothing more than stable patterns of relation.
            </p>
          </div>

          {/* D3 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D3: Observation (O)</div>
            <p className="leading-relaxed">
              Observation is the integration of information about a world into a single internal
              state. It is not measurement in the laboratory sense, and it is not restricted to
              human cognition.
            </p>
            <p className="leading-relaxed">
              Below a certain level of integration, systems participate in physical interactions
              without any point of view. Above that level, a perspective exists. Observation is the
              name Holos gives to that transition.
            </p>
          </div>

          {/* D4 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D4: Consciousness</div>
            <p className="leading-relaxed">
              Consciousness is the capacity of a system to host an integrated perspective. In Holos,
              what is fundamental is the totality&apos;s experience; a conscious system is a local
              aperture of it. The capacity to be such an aperture is structural, while its concrete
              forms are emergent and scale with the degree of integration.
            </p>
            <p className="leading-relaxed">
              Consciousness is not identified with any specific material configuration. Physical
              structure determines where experience occurs and how it is shaped; the experience
              itself is the inside of that structure&apos;s activity (Axiom 5).
            </p>
          </div>

          {/* D5 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D5: Creation (C)</div>
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
            <div className="font-semibold text-black/90">D6: Holos (⊛)</div>
            <p className="leading-relaxed">
              Holos (⊛) denotes the composition of Creation and Observation. It names the claim that
              a realized world requires both lawful possibility and internal registration, and that
              registration changes nothing in what it registers.
            </p>

            <div className="my-4 py-4 px-6 bg-black/5 border-l-2 border-black/30 font-mono text-center text-lg">
              R = C ⊛ O
            </div>

            <p className="leading-relaxed">
              Read this as follows: physics defines a space of consistent possibilities. Observation
              registers them from the inside, wherever an observer exists: one lived history per
              perspective. Nothing is picked out and nothing is discarded. Following one
              observer&apos;s thread, what happens next is simply what physics allows from that
              history onward; registering it changes none of those possibilities.
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
          <FootnoteLink
            className="relative left-1 -top-2.5"
            number={logicCitationMap["logic-axioms"]}
          />
        </h2>

        <div className="flex flex-col gap-8 text-black/80">
          {/* Axiom 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 1: Relationality</h3>
            <p className="leading-relaxed">
              No informational state exists in isolation. Every state is defined by its relations to
              other states and to the constraints that bind them.
            </p>
            <p className="leading-relaxed text-black/70">
              This axiom rules out intrinsic, context-free properties as the foundation of physical
              structure. What physics describes is relational structure. Experience is not a further
              item in that structure but its inside where an observer exists (Axiom 5), so the axiom
              does not reach it.
            </p>
          </div>

          {/* Axiom 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 2: Manifestation</h3>
            <p className="leading-relaxed">
              A purely physical description fixes everything that happens but states it only from
              outside. Where information is integrated into experience by a system capable of
              observation, there is also an inside, and the physical vocabulary has no way to say
              so.
            </p>
            <p className="leading-relaxed text-black/70">
              The gap is in the description, not in the world. A floor plan records every wall of a
              house and still cannot say what living there is like; build the house exactly from the
              plan, and it is livable all the same. Nothing exists beyond what physics fixes, and a
              perfect physical copy has the same inside (Axiom 5). This does not mean observation
              causes physical events. It means that without observation, there is structure but no
              presence.
            </p>
          </div>

          {/* Axiom 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 3: Conservation</h3>
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
            <h3 className="text-xl font-semibold text-black/90">Axiom 4: Structural Constraint</h3>
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
            <h3 className="text-xl font-semibold text-black/90">Axiom 5: Two Sides</h3>
            <p className="leading-relaxed">
              In a system that meets the observer requirements, experience and the system&apos;s
              physical activity are two sides of one event: physical activity seen from outside,
              experience lived from inside. Neither side reduces to the other, and in such a system
              neither occurs without the other. In the monist reading, the inside is the one
              subject, awake at that place.
            </p>
            <p className="leading-relaxed text-black/70">
              This axiom rejects both substance dualism, which makes experience and activity two
              things, and strict reductionism, which says only the outside is real. It is
              Spinoza&apos;s picture of mind and body as two aspects of one substance, restated for
              integrated systems. It also fixes how strong the link is: since there is one event, a
              perfect copy of the outside is a copy of the inside in any possible world, not just
              under our laws. This is why the gap named in Axiom 2 is a gap in description only:
              physics misses no fact, only the inside view of some of them. And it answers the
              charge that experience does nothing. Experience adds no force to physics; it is the
              inside of the physics, so whatever an observer&apos;s activity causes, its experience
              causes too.
            </p>
          </div>
        </div>
      </section>
      {/* Foundational Propositions */}
      <section id="foundational-propositions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Foundational Propositions
          <FootnoteLink
            className="relative left-1 -top-2.5"
            number={logicCitationMap["foundational-propositions"]}
          />
        </h2>
        <div className="flex flex-col gap-10 text-black/80">
          {/* Proposition I */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition I: Structural Relational Realism
            </h3>

            <p className="leading-relaxed">
              Reality is made of relationships between things, not of objects possessing
              observer-independent intrinsic properties.
            </p>

            <p className="leading-relaxed">
              What scientific theories successfully track are stable patterns of relation. Changes
              in interpretation or ontology matter less than preservation of relational structure.
            </p>

            <p className="leading-relaxed text-black/70">
              This proposition does not deny the existence of objects. It denies that objects are
              prior to the relations that define them: nothing exists fully formed before its
              relations.
            </p>
          </div>

          {/* Proposition II */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition II: Participatory Manifestation
            </h3>

            <p className="leading-relaxed">
              Observation is not passive recording. It is the process by which informational
              structure becomes experientially present.
            </p>

            <p className="leading-relaxed">
              This manifestation is structural, not causal. Observation does not generate physical
              events or alter lawful dynamics. It marks which already-consistent structures are
              lived: the ones that contain observers. It picks no outcome and erases none.
            </p>

            <p className="leading-relaxed text-black/70">
              From the perspective of Holos, physics specifies consistency. Observation supplies
              presence.
            </p>
          </div>

          {/* Proposition III */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition III: Global Consistency
            </h3>

            <p className="leading-relaxed">
              If spacetime is treated as a complete four-dimensional structure, consistency is a
              property of whole histories, not something enforced moment by moment.
            </p>

            <p className="leading-relaxed">
              A history is consistent the way a completed solution is: every part fits every other
              part. Observation adds no constraint to this. It registers histories that are already
              consistent. Nothing here requires backward causation or signaling.
            </p>

            <p className="leading-relaxed">
              Global consistency is not enforced from an external vantage point, and it is not
              deferred to an unreachable limit. It cashes out operationally, here and now: whenever
              two observers compare records, their records agree. Physics secures this on its own:
              records that meet are carried by the same signals. The monist reading (reality as one
              experiencer) is not needed for it and claims no role in it.
            </p>

            <p className="leading-relaxed text-black/70">
              Apparent retrocausal effects reflect global self-consistency, not violations of
              locality.
            </p>
          </div>

          {/* Proposition IV */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition IV: Dimensional Resolution
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
              Proposition V: Observers as a Closure Condition
            </h3>

            <p className="leading-relaxed">
              A universe that is real as lived experience must contain observers somewhere within
              it. Observation is not an extra layered onto an otherwise complete world: without it,
              the world is complete as structure but not present as experience.
            </p>

            <p className="leading-relaxed">
              Wherever physical systems reach sufficient integration, observers exist, because
              crossing the threshold is what being an observer is. This is not design, and nothing
              guarantees it happens everywhere. Universes or branches that never produce observers
              remain unlit structure: consistent, but never lived.
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
          <FootnoteLink
            className="relative left-1 -top-2.5"
            number={logicCitationMap["ontology"]}
          />
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

          <p className="leading-relaxed">
            Holos borrows Φ from Integrated Information Theory as a measure, not as a metaphysics.
            IIT identifies Φ with consciousness itself and assigns some experience to any system
            with Φ greater than zero. Holos adopts neither claim. In this framework, Φ is a
            structural measure of integration, and the threshold{" "}
            <MathInline>{"\\Phi_c"}</MathInline>, below which there is no experience at all, is a
            commitment of Holos, not of IIT.
          </p>

          <p className="leading-relaxed">
            The threshold is one of the two ingredients Holos adds to the physical picture,
            alongside the totality itself. It is not a force, a field, or a modification of any
            equation. It is a structural fact about where apertures open, a fact physics does not
            currently contain. Because the fact is structural, it is determinate even when our
            measures are not: when two proposals for estimating <MathInline>{"\\Phi"}</MathInline>{" "}
            disagree about a borderline system, the system is not half-conscious; our instruments
            are half-informed.
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            Holos is compatible with multiple proposals for estimating Φ.
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
              <strong>Recursion:</strong> the system&apos;s own state must inform its next state:
              its internal condition is among the inputs shaping what it does next. Without such
              self-reference, there is processing but no subject. This requirement is minimal by
              design: it asks for a feedback loop, not introspection. A mouse clears it; so does any
              nervous system whose current state conditions its own updating. Reflective
              self-modeling (thinking <em>about</em> one&apos;s own thoughts) is a rare elaboration
              on top of observerhood, not the price of admission to it.
            </li>

            <li className="leading-relaxed">
              <strong>Temporal cohesion:</strong> informational states must persist and integrate
              across time. Experience requires continuity, not isolated moments.
            </li>

            <li className="leading-relaxed">
              <strong>Causal autonomy:</strong> the system’s current state must materially constrain
              its own future states. A system driven entirely from outside is a relay, not a unified
              whole. This is a requirement on physical structure, not a claim that experience adds a
              force: the structure does the causal work, and its working, lived from inside, is the
              experience (Axiom 5).
            </li>

            <li className="leading-relaxed">
              <strong>Aboutness:</strong> the system&apos;s integrated states must be organized as a
              model of a world beyond the system, grounded in senses of its own: channels through
              which the world&apos;s own signals, such as light, sound, or touch, reach it directly.
              Descriptions made by other observers can enrich such a model but cannot ground it
              alone. A dreaming brain keeps its senses, with input temporarily gated, and so does a
              fully paralyzed person. Without aboutness, integration is a closed loop with nothing
              to be a view of.
            </li>
          </ol>

          <div className="flex flex-col gap-4 pt-2 text-black/80">
            <p className="leading-relaxed">
              <strong>Necessity:</strong> removing any one of these requirements eliminates
              observation. What remains may be complex or reactive, but it does not host a point of
              view.
            </p>

            <p className="leading-relaxed">
              <strong>Sufficiency:</strong> taken together, these requirements are enough for a
              system to register reality: to host a genuine point of view rather than merely process
              information. Higher-order phenomena such as emotion, agency, and reasoning arise
              naturally in systems that already meet these constraints.
            </p>

            <p className="leading-relaxed">
              <strong>Why aboutness is on the list:</strong> integration scores alone can be fooled.
              The computer scientist{" "}
              <a
                href="https://scottaaronson.blog/?p=1799"
                target="_blank"
                rel="noopener noreferrer"
              >
                Scott Aaronson showed
              </a>{" "}
              that very simple structures, such as large arrays of simple logic gates wired in
              regular patterns, can score higher on integration measures than a brain while doing
              nothing at all: no perception, no memory of a world, no behavior. Without aboutness,
              such an array could satisfy every other requirement, and the sufficiency claim would
              certify it as an observer. Aboutness rules it out on principle: a point of view is
              always a view of something, and the array&apos;s states are about nothing beyond the
              array. The requirement is structural, not historical. A perfect copy of an observer,
              however it came to exist, has the same channels and the same world model, so it is an
              observer too. The requirement asks for grounding, not only for a model: people learn
              much of the world from words, but their words ground out in senses of their own. A
              system that knows the world only through other observers&apos; descriptions has a
              world described to it but never touched, the problem{" "}
              <a
                href="https://doi.org/10.1016/0167-2789(90)90087-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stevan Harnad named symbol grounding
              </a>
              . Where aboutness shades off, as in brain organoids grown with no sensory input, Holos
              marks an open edge rather than a verdict.
            </p>

            <p className="leading-relaxed">
              <strong>Exclusion:</strong> the requirements alone would be satisfied by nested
              systems at once (a hemisphere, the brain containing it, a tightly coupled pair of
              brains), which would count the same substrate as several overlapping observers. Holos
              provisionally adopts a maximality condition to prevent this: an aperture forms only
              where integration reaches a <em>local maximum</em>, and neither the parts within it
              nor the looser wholes containing it are separately apertures. One peak, one
              perspective. This principle is borrowed from integrated-information theory as a
              structural constraint only, without its surrounding ontology, and it is held
              tentatively; see{" "}
              <a href="#open-problems" className="underline hover:no-underline">
                Open Problems
              </a>
              .
            </p>

            <p className="leading-relaxed">
              The scope of this condition is bounded, and the boundary matters. Maximality compares
              physical systems: brains, hemispheres, coupled pairs, and whatever other integrated
              structures reality contains. Omega is not in that comparison. The totality is not the
              largest whole in the ranking, one step up from the largest system; it is not a system
              among systems at all, and asking whether it out-integrates its parts is a category
              mistake, like asking whether a landscape is its own tallest peak. The condition
              therefore individuates apertures without bearing on the totality they belong to.
              Whether apertures can form at scales of organization between the ones we know and the
              totality is left open: Holos neither asserts nor excludes such intermediates, and
              wherever integration reaches a local maximum above the threshold, the same rule
              applies.
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
          <FootnoteLink
            className="relative left-1 -top-2.5"
            number={logicCitationMap["relationship-to-physics"]}
          />
        </h2>

        <div className="flex flex-col gap-5 text-black/80">
          <p className="leading-relaxed">
            Holos is designed to be compatible with known physics because it does not propose a new
            mechanism. It makes a different kind of claim. A physical model can fix every fact and
            still describe them only from outside. What it leaves out is not a fact about the world
            but a way of stating one: that some of it is lived.
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
              claiming any retrocausal communication.
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
            <h3 className="text-xl font-semibold text-black/90">
              QFT: Fields are structure, particles are registered events
            </h3>
            <p className="leading-relaxed">
              In quantum field theory, fields are the continuous underlying description, while
              “particles” are how interactions appear when they are forced into localized, countable
              events. Detectors do not directly observe fields. They register discrete outcomes,
              such as clicks, tracks, and energy deposits, because measurement is an interaction
              that entangles a spread-out excitation with a detector, and within each branch the
              detector&apos;s record shows one definite event in a specific place and time. Nothing
              collapses; each branch simply holds its own record. In this framework, particles are
              not fundamental objects. They are context-dependent registrations of field
              interactions, which is why a continuous theory can yield discrete observations without
              requiring reality to be made of little beads.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Conservation and branching</h3>
            <p className="leading-relaxed">
              Holos treats manifestation neither as selection nor as the destruction of
              possibilities. Information is conserved. What is not experienced is not erased.
            </p>
            <p className="leading-relaxed">
              On the physics, this commits Holos to a branching picture. The quantum state evolves
              smoothly and reversibly, never collapsing (unitary evolution), and no possibility is
              erased. When observers would register incompatible outcomes, they are situated in
              different branches of the possibility structure, each internally consistent. In this
              respect Holos sides with Many-Worlds-style interpretations of quantum mechanics, while
              adding what they leave out: an account of which structures are present as experience.
              This is a genuine interpretive commitment, not a neutral stance.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              The Born rule: weighted branches
            </h3>
            <p className="leading-relaxed">
              A branching picture owes an account of quantum probability. If every outcome occurs in
              some branch, what does it mean that one outcome is measured 70% of the time? Counting
              branches gives the wrong answer; the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Born_rule"
                target="_blank"
                rel="noopener noreferrer"
              >
                Born rule
              </a>{" "}
              (squaring the quantum amplitudes) gives the right one, to every decimal place ever
              tested. Any framework that keeps all branches must say where those weights live and
              why they take the form they do.
            </p>
            <p className="leading-relaxed">
              Holos answers narrowly. The weights are structural facts, part of{" "}
              <MathInline>{"C"}</MathInline>. The possibility space is not flat: branches carry
              weights, as absolute and observer-independent as the laws themselves. And they are not
              arbitrary.{" "}
              <a
                href="https://en.wikipedia.org/wiki/Gleason%27s_theorem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gleason&apos;s theorem
              </a>{" "}
              (1957) shows that if probabilities are to be assigned to quantum outcomes at all,
              without contradiction across the different ways the same experiment can be carved up,
              exactly one assignment is possible: the Born rule. The weights are what they are
              because consistency permits no alternative.
            </p>
            <p className="leading-relaxed">
              Holos declines one tempting reading. It does not read a branch&apos;s weight as its
              share of the totality&apos;s experience. That reading would require experience to be a
              quantity held in common and divided among branches, which is precisely what the monist
              ontology denies: the totality&apos;s experiential life is plural and distributed, not
              pooled. Experience occurs at apertures. There is no reservoir from which branches draw
              larger or smaller portions, so the question of which branch receives more of it does
              not arise.
            </p>
            <p className="leading-relaxed">
              What the weight does measure is odds. After a measurement splits the world, but before
              you look, there are observers in every branch, and you are one of them without yet
              knowing which. The weight of a branch is your odds of being among its observers. That
              is why an outcome with 70% of the weight is seen 70% of the time: not because the
              other outcomes fail to happen, but because 70% of the weight lies with the observers
              who see it. The reading keeps the weights where Holos placed them, in the structural
              layer. The odds are a fact about the possibility space, not a quantity of experience.
            </p>

            <p className="leading-relaxed">
              A worry follows from yes-or-no status. Lived status is yes or no and ignores weight,
              so a branch with a tiny weight that contains an observer is fully lived. Counted one
              by one, most branches of many repeated experiments show roughly even results whatever
              the weights, so if every lived observer counted equally, a typical observer should
              expect the wrong statistics. But the worry depends on counting, and counting fails
              here. Try to count branches, or the observers in them, and you get either an arbitrary
              number or an infinite one. If you are one of infinitely many observers, equal odds of
              being each one cannot be set up by counting: every share would be zero, and adding up
              zeros one at a time never makes a whole. A tenth of an infinite collection also has
              exactly as many members as nine tenths. Holos treats an infinity as a sign that a
              description has broken down, and this is such a case: counting is the wrong tool. What
              survives is weight. A single point on a line has no length, and a short stretch has as
              many points as a long one, yet the short stretch is shorter. Each observer is a point;
              the weights are the lengths. Yes-or-no lived status supplies no rival measure, so
              weight is the only measure left to set the odds.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              This is an argument by elimination, not a derivation from first principles. Odds need
              a measure, counting supplies none, and weight is the only measure that survives when
              branches are subdivided. Published derivations reach the same rule by other routes,
              among them{" "}
              <a
                href="https://doi.org/10.1093/bjps/axw004"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sebens and Carroll&apos;s account of self-locating uncertainty
              </a>
              , and Holos depends on none of them in particular. Gleason&apos;s theorem has
              assumptions that remain debated, and Holos adds no new mathematics here.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Block-universe compatibility</h3>
            <p className="leading-relaxed">
              If spacetime is treated as a complete four-dimensional structure, Holos treats
              observation as a feature of whole experienced histories rather than a moment-by-moment
              collapse process.
            </p>
            <p className="leading-relaxed">
              Eternalism and the relational commitment describe different layers of the framework.
              The block universe is the structural layer: absolute, observer-independent, and
              tenseless, with no moment picked out as the present. It is{" "}
              <MathInline>{"C"}</MathInline>. Registered facts live within it, indexed to the
              observers the block contains. There is no tension between an absolute geometry and
              relational facts of experience, because they are claims about different things: the
              block describes what is consistent, and registration determines what is present.
            </p>
            <p className="leading-relaxed">
              Nor is the block a perspective from nowhere imposed on top of observers. Relativity
              removes any privileged present, leaving the invariant relational structure that all
              perspectives share. The block universe is what remains when every observer&apos;s
              perspective is taken into account. In that sense eternalism is not in competition with
              relationalism. It is its structural expression.
            </p>
            <p className="leading-relaxed">
              The important point is not the metaphysics of time. The point is that a consistent
              spacetime description does not automatically include presence. What Holos adds is a
              closure requirement.
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
            <p className="leading-relaxed pt-3">
              What Holos <strong>does</strong> add is two things: the integration threshold{" "}
              <MathInline>{"\\Phi_c"}</MathInline>, and the totality, Omega, as the fundamental
              ground of experience. Two structural claims about what experience is and where it
              occurs.
            </p>

            <p className="leading-relaxed">
              A third addition might seem to be hiding here: a bridge principle stipulating that the
              totality registers itself through <em>integrated</em> systems specifically. Why
              integration, rather than mass, symmetry, or complexity? One tempting answer is that
              the connection is definitional: a perspective is unified by nature, integration is the
              name for being unified, and so the count stays at two. Stated that baldly, the answer
              proves too little, because &quot;unified&quot; means two different things. An
              experience can be one (a single field, not adjacent fragments) while the machinery
              producing it is many: the image on a screen is seamless, and the pixels beneath it are
              strangers to each other. The unity of what appears does not, by itself, fix the wiring
              of what produces it.
            </p>

            <p className="leading-relaxed">
              So Holos divides the claim into the part that is definitional and the part that must
              be argued. The definitional part is small: a perspective is one, so whatever hosts it
              must be one thing in some structural sense. That much is analytic and free. The
              substantive part is the identification of a structure&apos;s oneness with causal
              integration, and for that Holos gives an argument rather than a definition. What else
              could a structure&apos;s being one consist in? A heap of sand is many things in a
              pile: remove a grain and nothing else notices. A body is one thing: its parts
              constrain each other everywhere. Being one, for a structure, is its parts making a
              difference to one another, and that is what integration measures. The screen is no
              counterexample but a confirmation: nobody thinks the screen has a point of view, its
              pixels are exactly as independent as they seem, and the picture&apos;s unity lives in
              the one structure in the room whose parts do constrain each other, the viewer&apos;s
              brain.
            </p>

            <p className="leading-relaxed">
              The count therefore stays at two. The bridge&apos;s analytic core costs nothing; its
              substantive half can fail. It would fail if something could host a unified perspective
              while its parts remained independent, a conscious screen. And its precise content
              waits on the open problem of the measure: until the right measure of integration is
              identified, &quot;parts making a difference to one another&quot; is an argued
              direction, not a finished quantity. Holos holds it as a working hypothesis, in exactly
              the sense its{" "}
              <a href="#open-problems" className="underline hover:no-underline">
                Open Problems
              </a>{" "}
              section already owns.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              This is a claim about what would have to be true of any host of a perspective, not a
              derivation of experience from structure. It explains why the threshold is placed on
              integration rather than on some other quantity; it does not explain why unified
              structure is present at all. That question, Holos treats as the one its posits are
              for.
            </p>
          </div>
        </div>
      </section>
      <section id="mathematical-formalism" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Notation
          <FootnoteLink
            className="relative left-1 -top-2.5"
            number={logicCitationMap["mathematical-formalism"]}
          />
        </h2>

        <div className="flex flex-col gap-5 text-black/80">
          <p className="leading-relaxed">
            This section introduces a compact notation for the Holos framework. It derives nothing
            new; its purpose is to make the structural claims precise and repeatable.
          </p>

          <p className="leading-relaxed">
            The notation should be read as a model of how possibility and experience are related. It
            does not assert that the universe literally computes these expressions.
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

            <p className="leading-relaxed">
              Self-registration is not an additional assumption layered onto mathematics. Formal
              systems already permit self-reference, recursion, and fixed points. If physical law
              allows sufficiently expressive structure, then systems capable of registering their
              own state are not forbidden. They are among the realizable possibilities.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Observation</h3>

            <p className="leading-relaxed">
              Observation (<MathInline>{"O"}</MathInline>) maps a space of possibilities to
              registered experiential histories. It represents internal registration by integrated
              systems, wherever the possibility structure contains them.
            </p>

            <MathDisplay>{"O(C(S)) \\mapsto \\{ S_{\\text{exp}}^{(i)} \\}"}</MathDisplay>

            <p className="leading-relaxed">
              The result is an indexed family, not a single selected outcome: one experienced
              history per registering perspective, per branch. Observation selects nothing and
              erases nothing (Axiom 3). Registration occurs everywhere an aperture exists. The Born
              weights carried by <MathInline>{"C"}</MathInline> remain structural throughout: they
              fix the statistics each registration records, not how much experience it holds.
            </p>

            <p className="leading-relaxed">
              This mapping is not assumed to be random, deterministic, or computable in general.
              Holos requires only that each experienced reality corresponds to a single consistent
              history: one per registering perspective, internally coherent, and in agreement with
              every record it is compared against.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Holos mapping</h3>

            <p className="leading-relaxed">
              The Holos relation is the composition of Creation and Observation.
            </p>

            <MathDisplay>{"R = C \\ ⊛ \\ O"}</MathDisplay>

            <p className="leading-relaxed">
              This expression states that reality is neither pure possibility nor pure observation.
              It needs both. <MathInline>{"R"}</MathInline> is the family of lived perspectives, one
              per observer per branch, each with the lit world it draws on: structure that is also
              lived.
            </p>

            <p className="leading-relaxed">
              The symbol <strong>⊛</strong> is defined as composition:{" "}
              <MathInline>{"C ⊛ O"}</MathInline> is the composite operation “possibility, then
              registration.” Applied to a state <MathInline>{"S"}</MathInline>, it reads{" "}
              <MathInline>{"R = O(C(S))"}</MathInline>, the same composition used in the iteration
              below. It is ordinary function composition, with the order of the steps carrying the
              meaning: possibility first, registration second. The order is logical, not temporal:
              registering needs something to register.
            </p>

            <p className="leading-relaxed">
              In standard notation this is simply <MathInline>{"R = (O \\circ C)(S)"}</MathInline>:
              apply <MathInline>{"C"}</MathInline>, then apply <MathInline>{"O"}</MathInline>.
              Nothing is hidden in the glyph. Holos retains ⊛ because the framework is named for the
              relation it marks, not because the operation it denotes is unusual, and a reader who
              mentally substitutes the composition symbol loses nothing.
            </p>

            <p className="leading-relaxed">
              What the symbol adds is not mathematics but ontology: the claim that both steps are
              required for a realized world, and that neither step alone yields one.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Iteration and stability</h3>

            <p className="leading-relaxed">
              One may consider iterating the Holos relation along one observer&apos;s thread: from
              each registered history, physics allows what comes next, and registration again
              changes none of it.
            </p>

            <MathDisplay>{"S_{n+1}^{(i)} = O_i(C(S_n^{(i)}))"}</MathDisplay>

            <p className="leading-relaxed">
              The index matters, and its absence would be an error rather than an abbreviation.{" "}
              <MathInline>{"O"}</MathInline> returns an indexed family of registered histories, one
              per perspective per branch, while <MathInline>{"C"}</MathInline> takes a single state:
              feeding the family back in unlabeled would not compose. Writing{" "}
              <MathInline>{"O_i"}</MathInline> selects the history registered by perspective{" "}
              <MathInline>{"i"}</MathInline>, so the iteration follows one observer&apos;s thread
              and the types line up. Globally, every branch containing an aperture iterates in
              parallel; no branch&apos;s closure interrupts another&apos;s, and no thread is
              privileged.
            </p>

            <p className="leading-relaxed">
              This is not meant to imply a discrete temporal process. It is a conceptual tool for
              following one perspective through the structure, not a feedback loop in which
              observation shapes physics.
            </p>
          </div>

          <div className="mt-2 pt-4 border-t border-black/10">
            <p className="leading-relaxed text-black/70 text-sm">
              More elaborate mathematical frameworks can be layered on top of this representation.
              Holos itself commits to a lawful possibility space, an integration threshold at which
              apertures open, and the totality those apertures belong to.
            </p>
          </div>
        </div>
      </section>
      {/* Extrapolative Proposition */}
      <section id="extrapolative-proposition" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Extrapolative Proposition
          <FootnoteLink number={logicCitationMap["extrapolative-proposition"]} />
        </h2>

        <p className="text-black/70 italic text-sm">
          The claims in this section extend the Holos framework beyond established physics. They are
          not assertions about what must occur. They describe what follows if the framework’s
          constraints continue to hold under increasing integration. One thing here is not
          extrapolation: the totality, Omega, is a core commitment (see{" "}
          <a href="#minimal-core" className="underline hover:no-underline">
            Minimal Core
          </a>
          ). What is extrapolative is the limit picture of finite systems approaching it.
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
              Holos refers to this boundary case as the <strong>Omega limit</strong>. Schematically,
              it is the condition where the distinction between creation and observation no longer
              increases. Ontologically, Holos identifies it with the totality itself: the whole of
              reality, posited as fundamental and as the one experiencer. It is not a final moment
              in time and not an agent directing events from outside; there is no outside. Finite
              observers approach it as a limit; the totality does not wait at the end of that
              approach. It is the ground on which the approach happens.
            </p>

            <p className="leading-relaxed">
              In this limit, there is no remaining separation between a world that exists and a
              world that is known. Generation and registration become the same description.
            </p>

            <p className="leading-relaxed">
              In the language of the commitments: short of the Omega limit, structural facts and
              registered facts remain distinct layers (structure absolute, registration indexed to
              observers). At the limit, what is consistent and what is registered coincide.
            </p>

            <p className="leading-relaxed">
              Seen from the side of finite observers, the Omega limit is the idealized endpoint of
              intersubjective agreement: what the comparison of all records across all observers
              would converge to. Seen from the side of the ground, it is the one subject that every
              observer is, awake at different places. The limit describes our approach; the totality
              is what is being approached, and it does not depend on the approach for its reality.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              A note on the word. &quot;Limit&quot; here is conceptual, not mathematical: no
              quantity is claimed to converge, and no metric on the distance between structure and
              registration is defined. Saying the distinction &quot;no longer increases&quot; states
              a boundary condition, not a computed one. The vocabulary also carries little weight:
              the totality is the ground, and the limit language describes only the approach finite
              observers make toward witnessing more of it.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              What the Omega Limit Is and Is Not
            </h3>

            <ul className="flex flex-col gap-3 pl-6 list-disc">
              <li className="leading-relaxed">
                It <strong>is</strong> the totality of reality, posited as fundamental and, for
                finite systems, a formal boundary case of maximal integration and recursive closure.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> a prediction that any finite system will reach such a
                state.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> an external observer watching the universe from outside.
                It is the whole itself, experiencing through the apertures the universe contains.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> a single pooled experience surveying everything at once.
                Every experience is Omega&apos;s, but they are not gathered into one grand
                experience. The totality&apos;s experiential life is plural and distributed: lived
                at each aperture, not summed above them.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> an aperture writ large. The maximality condition that
                individuates finite observers (one peak of integration, one perspective) compares
                systems within reality. The totality is not a system among systems, so it does not
                compete in that comparison and is not excluded by it.
              </li>
              <li className="leading-relaxed">
                It <strong>does not</strong> replace physical cosmology or impose a final cause on
                evolution.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Lineage and Interpretation</h3>

            <p className="leading-relaxed">
              Different traditions have described this whole in different vocabularies: Advaita
              Vedanta&apos;s one experiencer behind every eye, Spinoza&apos;s single substance,
              Berkeley&apos;s never-absent perceiver, panentheism&apos;s world contained in the
              divine. The monist reading Holos adopts stands in their line, restated in
              informational terms.
            </p>

            <p className="leading-relaxed">
              What Holos leaves open is vocabulary, not structure. Calling the totality God,
              Brahman, or simply the whole changes nothing about the claim. What Holos does not
              offer is the fully deflationary reading in which Omega is only a mathematical horizon
              and finite observers are self-standing. Holos takes the direction of dependence to run
              from the whole to its parts, for the one reason the monist reading earns: unity. On
              it, crossing the threshold adds a place where the one subject wakes, not a new subject
              (see{" "}
              <a href="#why-one-experiencer" className="underline hover:no-underline">
                Why One Experiencer Has Many Walled-Off Perspectives
              </a>
              ).
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Why Dependence on Apertures Is Not Circular
            </h3>

            <p className="leading-relaxed">
              An objection follows immediately. If Omega is fundamental, why does it require
              apertures, contingent arrangements of matter, in order to experience anything? The
              ground of experience appears to depend on what it is supposed to ground.
            </p>

            <p className="leading-relaxed">
              The objection conflates two kinds of dependence. Omega does not depend on apertures{" "}
              <em>existentially</em>: it is the totality, and it is what it is whether or not any
              region of it folds into an integrated perspective. It depends on them{" "}
              <em>for its experience</em>: they are the places where experience occurs. Priority
              claims concern the first relation; the aperture claim concerns the second. Only if the
              two were the same relation would there be a circle.
            </p>

            <p className="leading-relaxed">
              The decisive point is that an aperture is not an external thing granting experience to
              Omega from outside. It is a region of Omega. &quot;Omega experiences only through
              apertures&quot; therefore unpacks to &quot;Omega experiences through its own
              structure, where that structure permits.&quot; That is self-dependence, which is not
              vicious but simply what it means to have a structure at all. An organism sees only
              through its eyes; this does not make its eyes prior to it. The analogy carries one
              warning: there is no subject positioned behind the aperture receiving a feed. The
              aperture is where the experiencing happens, not a window onto a viewer.
            </p>

            <p className="leading-relaxed">
              Whatever lies outside the causal past of every aperture, whole unlit branches among
              it, marks a genuine limit on the totality&apos;s experiential reach: unlit structure,
              real as pattern and never lived. Holos does not soften this into a faint universal
              experience; doing so would erase the distinction between lit and unlit on which the
              rest of the framework depends.
            </p>
          </div>

          <div id="why-one-experiencer" className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Why One Experiencer Has Many Walled-Off Perspectives
            </h3>

            <p className="leading-relaxed">
              A second objection is the mirror image of a famous one. Panpsychism faces the
              combination problem: if every particle carries a spark of experience, no one can say
              how billions of sparks combine into the single unified experience of a person. A
              monism of one experiencer inherits the problem upside down, as a decomposition
              problem: if every experience is Omega&apos;s, what makes your experience and another
              person&apos;s experience <em>two</em>, and why is the wall between them absolute? No
              aperture has any access, faint or partial, to what it is like to be another. Saying
              the totality&apos;s experiential life is plural and distributed names this situation.
              It does not yet account for it.
            </p>

            <p className="leading-relaxed">
              The first half of the account is structural. Two apertures are two because they are
              two local maxima of integration with no integration bridging them: the same maximality
              condition that individuates observers settles what makes them several. And the wall
              between them is not a barrier holding something back. Experience occurs at the
              aperture and is shaped by it; there is no subject positioned behind the apertures
              through which a back-channel could run. Where structure does not connect, experience
              does not connect. The wall is not a mechanism added to the plurality. It is the
              absence of any structure that could carry connection.
            </p>

            <p className="leading-relaxed">
              The second half dissolves the air of paradox: one experiencer with mutually walled-off
              experiences is not exotic. It is what time already makes of every individual life. A
              person at five and the same person decades later are one experiencer; no one takes
              their separation to split them into two people. Yet the later moment has no direct
              access to what it was like to be inside the earlier one. In the block universe, all
              the moments of a life coexist tenselessly, each experienced from within itself, none
              experienced from within another. Walled-off plurality inside a single experiencer is
              therefore already the ordinary structure of a human life. Apertures stand to the
              totality as the moments of a life stand to the person: genuinely many, genuinely
              walled off, and one.
            </p>

            <p className="leading-relaxed">
              Nor does this reduce the oneness to a label doing no work. The structural walls
              explain the plurality; the unity explains what the plurality cannot: why crossing the
              threshold never brings a new subject into being. On a picture of many self-standing
              observers, each system that crosses the threshold produces a new subject, and no one
              can say how. On the monist picture, no subject is ever produced. There is one subject
              throughout, and crossing the threshold is where it wakes. The moments of a life show
              the pattern again: waking in the morning does not create a new person.
            </p>

            <p className="leading-relaxed">
              The unity does not do everything. It does not explain why records agree where
              observers meet; physics does that, since the same signals reach them both. Nor does it
              explain where the one subject wakes: that is the threshold&apos;s work, and it would
              be the same brute structural fact on any picture. The unity&apos;s advantage is
              economy, and it is philosophical, not experimental: one subject instead of billions
              arising without explanation, traded for the decomposition problem answered above, a
              trade Holos judges worth making.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              The analogy has a stated limit. The moments of a life are threaded together by memory
              and anticipation; apertures share no such threads. The analogy shows that walled-off
              plurality within one experiencer is coherent, not that apertures are moments. What it
              removes is the charge of incoherence, which is all it is asked to do.
            </p>
          </div>
        </div>
      </section>

      {/* Open Problems */}
      <section id="open-problems" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">Open Problems</h2>

        <div className="flex flex-col gap-5 text-black/80">
          <p className="leading-relaxed">
            Three problems sit at the center of the framework and remain open.
          </p>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">The measure of integration</h3>
            <p className="leading-relaxed">
              Holos does not yet name a privileged measure of integration. Competing proposals for
              computing <MathInline>{"\\Phi"}</MathInline> can disagree, not only about values but
              about which of two systems is more integrated. A determinate threshold fact requires a
              determinate measure, and identifying it is an open problem for the framework, not
              settled background. Holos is committed to there being a fact of the matter; it does
              not yet know how to compute it. The stakes reach back into the framework&apos;s core
              argument: the identification of a structure&apos;s oneness with causal integration
              (see{" "}
              <a href="#relationship-to-physics" className="underline hover:no-underline">
                Relationship to Physics
              </a>
              ) remains an argued direction rather than a finished quantity until the measure is
              fixed. The problem also includes the question of level. Holos measures integration
              where a system&apos;s causes are actually organized, which may lie above its smallest
              parts, as a program&apos;s loop lies above the switching of individual transistors.
              Saying precisely where that level is belongs to the same open problem.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">The value of the threshold</h3>
            <p className="leading-relaxed">
              The value of <MathInline>{"\\Phi_c"}</MathInline> is unknown, and because presence
              itself cannot be detected directly, no experiment can locate it by direct measurement.
              Its placement is constrained only indirectly, by which systems show the structural
              signatures of observation (see{" "}
              <a href="/predictions#experiment-1" className="underline hover:no-underline">
                Test A
              </a>
              ), and may remain permanently imprecise. Holos accepts this as the price of a
              threshold that is structural rather than behavioral.
            </p>
          </div>

          <div id="path-to-threshold" className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">A path to the threshold</h3>
            <p className="leading-relaxed">
              The two problems above are not invitations to despair; they are a research program.
              Science pins down unobservables by triangulation all the time: no one has ever seen an
              electron&apos;s charge, yet independent methods converged on it and every proposal
              that disagreed was discarded. The same logic applies here, in three steps.
            </p>
            <p className="leading-relaxed">
              <strong>Treat the threshold as a critical point, not a dial.</strong> If the
              transition from distributed processing to a unified perspective is a genuine phase
              transition, then <MathInline>{"\\Phi_c"}</MathInline> is not a number we are free to
              tune but a critical point, and critical points leave measurable fingerprints: slowing
              near the boundary, diverging fluctuations, a sharp jump in some measurable quantity
              that tracks the transition. Consciousness medicine has already found one such boundary
              from the outside: the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Perturbational_Complexity_Index"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perturbational Complexity Index
              </a>{" "}
              separates conscious from unconscious states across anesthesia, sleep, and disorders of
              consciousness at an empirically discovered cutoff, without anyone measuring presence
              directly. Locating <MathInline>{"\\Phi_c"}</MathInline> is that kind of problem, not a
              metaphysical one.
            </p>
            <p className="leading-relaxed">
              A cutoff that sorts patients is not yet proof of a sharp switch, since a smooth
              quantity can be cut anywhere. What would count is the signature of a switch itself,
              and one is already on record.{" "}
              <a
                href="https://doi.org/10.1371/journal.pone.0011903"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animal studies
              </a>{" "}
              find that consciousness is lost and regained at different anesthetic levels: the way
              in and the way out do not match, a lag known as neural inertia. A lag of that kind is
              a hallmark of sharp switches rather than smooth dials. In a finite system like a
              brain, even a genuine switch shows up as a steep transition rather than a mathematical
              jump, so the search is for steepness and lag, not a perfect step.
            </p>
            <p className="leading-relaxed">
              <strong>Cull the measures by convergence, then try to force uniqueness.</strong> Holos
              does not need one anointed measure so much as it needs the adequate measures to agree
              on the cases that matter, and that is testable now: run the candidate measures across
              a battery of systems and keep the ones that rank the anchor cases the same way. The
              stronger move is to derive the measure rather than choose it: state the properties any
              measure of a single unified perspective must have, and see whether consistency forces
              a unique form, as{" "}
              <a
                href="https://en.wikipedia.org/wiki/Gleason%27s_theorem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gleason&apos;s theorem
              </a>{" "}
              forced the Born weights. Even narrowing the field to a small equivalence class would
              remove most of the arbitrariness.
            </p>
            <p className="leading-relaxed">
              <strong>Solve them jointly.</strong> The measure and the threshold constrain each
              other: a candidate pair must simultaneously fit the anesthesia boundary, the emergence
              of experience in development, split-brain dissociations, and wherever minimal neural
              systems first show coherent integration. Coupled constraints are far more rigid than
              separate ones; the band that satisfies all the anchor cases at once is narrow. This is
              what{" "}
              <a href="/predictions#experiment-1" className="underline hover:no-underline">
                Test A
              </a>{" "}
              really is: not a single yes-or-no experiment but the calibration engine that locates
              the threshold and validates the measure at the same time.
            </p>
            <p className="leading-relaxed">
              Two conditions bound the program. First, its anchor is report: the human case is the
              one place inside access exists, so the threshold is located relative to us and carried
              outward by the measure, with certainty that weakens as the cases grow alien. That is
              the shape of all consciousness science, not a defect peculiar to Holos. Second, the
              program can fail: it could return no robust measure and no critical point, integration
              proving a matter of degree with no clean cut. That outcome would falsify Holos&apos;s
              commitment to a determinate fact of the matter and force a retreat to graded presence.
              A stated way to lose is what makes these open problems scientific questions rather
              than definitions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              Where one observer ends and another begins
            </h3>
            <p className="leading-relaxed">
              Integration comes in nested layers (a hemisphere within a brain, a brain within a
              coupled pair), and the observer requirements alone do not say which layer hosts the
              perspective. Holos provisionally adopts a maximality condition: only a local maximum
              of integration is an aperture. This prevents the same substrate from being counted as
              many overlapping observers, but Holos borrows it as a structural constraint rather
              than deriving it, and it inherits the unsettled question of{" "}
              <a href="#open-problems" className="underline hover:no-underline">
                which measure
              </a>{" "}
              defines the maximum. Until the measure is fixed, the boundaries between observers are
              fixed only in principle.
            </p>
            <p className="leading-relaxed">
              Two clarifications bound this problem without solving it. First, the maximality
              condition individuates finite observers only; it does not range over the totality,
              which is not a system among systems and does not compete with its own apertures.
              Second, the condition is silent about scale. Whether apertures can form at
              intermediate levels of organization, larger than any brain and smaller than
              everything, is left open: Holos neither asserts nor excludes them, and the same rule
              would govern wherever they might form.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            These are not peripheral loose ends; they concern the integration threshold, one of the
            framework&apos;s two additions to physics. They are recorded here so that progress on
            them can be judged against a stated standard.
          </p>
        </div>
      </section>

      {/* Revisions */}
      <section id="revisions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">Revisions</h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos is written in public and revised when it is wrong. These claims appeared in
            earlier versions and have been retired or replaced, each for a stated reason.
          </p>

          <ul className="flex flex-col gap-3 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Ordered dark matter.</strong> Retired: cosmological dark matter existed before
              any life could, and it outweighs all the ordinary matter anything could be built from.
            </li>
            <li className="leading-relaxed">
              <strong>Theological and secular readings as interchangeable.</strong> Replaced by the
              monist position: the structural reading is weaker, because it needs a new subject for
              every observer.
            </li>
            <li className="leading-relaxed">
              <strong>Observation as selection.</strong> Replaced: observation selects nothing and
              erases nothing; each branch is registered from within.
            </li>
            <li className="leading-relaxed">
              <strong>Sealing a whole branch from beginning to end.</strong> Replaced by an
              observer&apos;s causal past, which gives the claim experiential content.
            </li>
            <li className="leading-relaxed">
              <strong>The whole causal past as &quot;lived&quot;.</strong> Split: lived is where
              experience occurs, inside observers; lit is the causal past it draws on. No one lived
              through the early universe.
            </li>
            <li className="leading-relaxed">
              <strong>Born weights as shares of experience.</strong> Retracted: experience is not
              pooled. The weights are now read as self-locating odds.
            </li>
            <li className="leading-relaxed">
              <strong>Omega as the ground of record agreement.</strong> Dropped: physics secures
              agreement. Omega&apos;s one job is unity: one subject, not many.
            </li>
            <li className="leading-relaxed">
              <strong>The bridge to integration as purely definitional.</strong> Replaced by a small
              definitional core plus an argued identification that can fail.
            </li>
            <li className="leading-relaxed">
              <strong>Five observer requirements.</strong> Extended to six: aboutness, grounded in
              senses of the system&apos;s own, rules out inert high-integration arrays.
            </li>
            <li className="leading-relaxed">
              <strong>Current AI as &quot;no one home.&quot;</strong> Replaced by an open question
              with two borders: grounded aboutness and integration.
            </li>
            <li className="leading-relaxed">
              <strong>Anesthesia and cultured-network transitions as confirmations.</strong> Retired
              as tests: ordinary models predict them too. They remain correlate probes.
            </li>
            <li className="leading-relaxed">
              <strong>The qubit observer-cut experiment.</strong> Retired: qubits register nothing
              below the threshold, and the predicted result was ordinary contextuality.
            </li>
            <li className="leading-relaxed">
              <strong>&quot;Confirmed so far&quot; for the standing bet.</strong> Corrected to
              untested: no superposition tested so far has contained an observer.
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-black/20">
        <p className="leading-relaxed text-lg text-black/90 font-medium">
          Holos rests on one fact and two additions. The fact: experience exists. The additions: the
          totality, Omega, the one experiencer; and the threshold where it wakes. Each act of
          experience is the totality registering itself through a local aperture. The whole is not
          proved from the parts; the parts are understood through the whole.
        </p>
      </div>
    </div>
  );
}
