import { FootnoteLink, logicCitationMap } from "./citation-sections";
import InterpretiveComparisonTable from "./InterpretiveComparisonTable";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";
import MindComparisonTable from "./MindComparisonTable";
import SelfComparisonTable from "./SelfComparisonTable";

export default function Logic() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Minimal Core */}
      <section id="minimal-core" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">Minimal Core</h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos starts from five{" "}
            <a href="#logic-axioms" className="underline hover:no-underline">
              axioms
            </a>
            . Two of them are genuine additions to the physical picture: the integration threshold,
            and the totality. Neither is a new dynamical law, but both are new structural claims.
            Around the axioms, Holos also takes sides, sets a method, leaves questions open, and
            keeps some ideas as companions rather than core. It says which is which:
          </p>

          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Additions to physics:</strong> the threshold{" "}
              <MathInline>{"\\Phi_c"}</MathInline>, where apertures open across a narrow twilight
              (Axiom 3); and Omega, the one experiencer (Axiom 5).
            </li>
            <li className="leading-relaxed">
              <strong>Sides taken:</strong> relational structure (Axiom 1); branching quantum
              mechanics with no collapse (Axiom 2); experience and activity as two sides of one
              event, neither grounded in the other, which makes Holos a two-sided monism rather than
              physicalism or dualism (Axiom 4); Born weights as self-locating odds; lit regions as
              the causal pasts of observers, with experience lived only inside them (D7).
            </li>
            <li className="leading-relaxed">
              <strong>Two versions:</strong> the core is shared by Holos without collapse, the
              version defended here, and Holos with collapse, declared in advance as what a lost bet
              would leave.
            </li>
            <li className="leading-relaxed">
              <strong>Method:</strong> infinities signal a broken description, not a feature of
              reality, and a higher description often closes what a lower one leaves open, up to
              Omega (Proposition IV).
            </li>
            <li className="leading-relaxed">
              <strong>Observer requirements:</strong> four structural conditions, with a provisional
              maximality rule for where one observer ends.
            </li>
            <li className="leading-relaxed">
              <strong>Hypothesis:</strong> the threshold is a critical transition. If it fails, the
              core stands.
            </li>
            <li className="leading-relaxed">
              <strong>Open problems:</strong> the measure of integration, where the threshold and
              its twilight fall, and the boundaries between observers.
            </li>
            <li className="leading-relaxed">
              <strong>Companion ideas, not core:</strong> the Structural Constraint principle, the
              Integration Hypothesis, and the Teeming Dark. If they fail, the core stands.
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
            Holos distinguishes two things that are usually run together. Physics defines what is
            consistent. Observation is where a consistent world is lived from the inside.
          </p>

          <div className="my-4 py-4 px-6 bg-black/5 border-l-2 border-black/30 font-mono text-center text-lg">
            R = C ⊛ O
          </div>

          <ul className="flex flex-col gap-3 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Creation</strong> (<MathInline>{"C"}</MathInline>) is everything physics
              produces: every branch of the one quantum state. Seen from inside one branch, the
              others are its possibilities; all of them occur.
            </li>

            <li className="leading-relaxed">
              <strong>Observation</strong> (<MathInline>{"O"}</MathInline>) is internal
              registration. It occurs when a system integrates information into a single perspective
              such that there is something it is like to be that system.
            </li>

            <li className="leading-relaxed">
              <strong>Reality</strong> (<MathInline>{"R"}</MathInline>) is lived reality: lawful
              possibility where it is also registered from inside. Structure is fully real whether
              or not it is lived; <MathInline>{"R"}</MathInline> marks where it is also lived, a
              label for a difference, not a higher grade of reality. Three words keep this precise:
              lived, lit, and unlit (defined in D7).
            </li>

            <li className="leading-relaxed">
              <strong>⊛</strong> is shorthand for &quot;possibility, then registration,&quot; in
              logical rather than temporal order (see{" "}
              <a href="#mathematical-formalism" className="underline hover:no-underline">
                Notation
              </a>
              ). It marks the claim that physics describes a realized world only from outside: it
              fixes what is lived, but cannot state that it is lived.
            </li>
          </ul>

          <p className="leading-relaxed pt-2">
            Holos is an interpretive framework. The distinction between structure and lived reality
            is its starting point, not an explanation. The explanations come from what Holos adds,
            the threshold and the totality, and from the side it takes on experience and activity
            (Axiom 4).
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            When later sections use <MathInline>{"\\Phi \\ge \\Phi_c"}</MathInline>, treat that as a
            threshold claim about integration. Holos does not depend on one specific theory for
            computing <MathInline>{"\\Phi"}</MathInline>, but its tests name their gauges in
            advance, and no gauge proposed afterward can rescue a failed test (see{" "}
            <a href="/predictions#experiment-1" className="underline hover:no-underline">
              Test A
            </a>
            ).
          </p>
        </div>
      </section>
      <div id="comparison">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Holos among Quantum Interpretations
        </h2>
        <p className="leading-relaxed text-black/80 mb-4">
          Holos re-positions the strongest insights of existing quantum interpretations within a
          single ontological framework. On the physics it takes a side: no collapse, no erased
          possibilities, branching when registrations diverge. That is the Many-Worlds picture. Its
          divergence from Many-Worlds is ontological: branching alone does not say which structures
          are present as experience. The table also includes the two collapse views Holos bets
          against: objective collapse, in which superpositions collapse on their own (as in the
          Diósi-Penrose model), and consciousness collapse, in which a conscious system causes it
          (as Chalmers and McQueen propose). The table below clarifies where Holos aligns with, and
          diverges from, each.
        </p>
        <InterpretiveComparisonTable />
      </div>
      <div id="mind-comparison">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">Holos among Theories of Mind</h2>
        <p className="leading-relaxed text-black/80 mb-4">
          Most of what Holos claims is about mind, not physics, so it needs a second map. It shares
          integration with integrated information theory without IIT&apos;s identity claim or its
          experience in every integrated system, shares a single ground of experience with
          cosmopsychism without a cosmic experience of its own, and rejects both panpsychism&apos;s
          experience everywhere and illusionism&apos;s claim that experience, as we usually conceive
          it, does not exist. It is neither physicalism nor dualism but a two-sided monism with a
          threshold (see{" "}
          <a href="#kind-of-view" className="underline hover:no-underline">
            What kind of view this is
          </a>
          ). The table below shows where it sits.
        </p>
        <MindComparisonTable />
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
              Well below a certain level of integration, systems participate in physical
              interactions without any point of view. Well above it, a perspective exists, and a
              narrow twilight lies between. Observation is the name Holos gives to that transition.
            </p>
          </div>

          {/* D4 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D4: Consciousness</div>
            <p className="leading-relaxed">
              Consciousness is the capacity of a system to host an integrated perspective. In Holos,
              what is fundamental is the totality&apos;s experience; a conscious system is a local
              aperture of it. The capacity to be such an aperture is structural, while its concrete
              forms vary with that structure and scale with the degree of integration.
            </p>
            <p className="leading-relaxed">
              &quot;Fundamental&quot; means underived: Holos starts from experience rather than
              deriving it. It does not mean experience is everywhere, and it does not mean
              experience floats free of physics. Well below the threshold there is none; above it,
              the experience is fixed by the structure whose inside it is.
            </p>
            <p className="leading-relaxed">
              Consciousness is not identified with any specific material configuration. Physical
              structure determines where experience occurs and how it is shaped; the experience
              itself is the inside of that structure&apos;s activity (Axiom 4).
            </p>
          </div>

          {/* D5 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D5: Creation (C)</div>
            <p className="leading-relaxed">
              Creation is everything the laws of physics actually produce from the universe&apos;s
              state: every branch of the one quantum state, whether or not anyone lives it. It is
              not every world the laws could allow from other beginnings; those are mere
              possibilities, not structure.
            </p>
            <p className="leading-relaxed">
              Creation does not select outcomes and does not privilege any particular history. It
              fixes what happens in every branch, not what is experienced.
            </p>
          </div>

          {/* D6 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D6: Holos (⊛)</div>
            <p className="leading-relaxed">
              Holos (⊛) denotes the composition of Creation and Observation. It names the claim that
              a realized world requires both lawful possibility and internal registration. In Holos
              without collapse, the version defended here, registration also changes nothing in what
              it registers (see{" "}
              <a href="/predictions#two-versions" className="underline hover:no-underline">
                Two versions
              </a>
              ).
            </p>

            <p className="leading-relaxed">
              ⊛ is not a dynamical operator and not a substitute for physical causation. It is a
              structural relation that specifies what it means for a universe to be real rather than
              merely described. The notation is set out under{" "}
              <a href="#mathematical-formalism" className="underline hover:no-underline">
                Notation
              </a>
              .
            </p>
          </div>

          {/* D7 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-black/90">D7: Lived, lit, and unlit</div>
            <p className="leading-relaxed">
              <strong>Lived</strong> is where experience occurs: inside observers, and nowhere else.{" "}
              <strong>Lit</strong> is binary and follows the causal structure of spacetime: a region
              is lit if it lies in the causal past of at least one observer in its branch. Every
              observer is built from its causal past and draws on it through its traces, so the lit
              universe is the union of observers&apos; causal pasts: the world experience is made
              from and about. A stretch of history shared by many branches is lit wherever it lies
              in the causal past of an observer in any branch that grows from it.{" "}
              <strong>Unlit</strong> is structure outside every observer&apos;s causal past, such as
              branches that never form an observer and regions beyond every observer&apos;s horizon.{" "}
              <strong>Witnessing</strong> is graded and local: how much of the lit region an
              observer&apos;s experience is actually about, and in what detail. One observer lights
              its past; many witness it.
            </p>
            <p className="leading-relaxed">
              The relation is tenseless, but it points one way: an observer lights its past, not its
              future. In the monist reading, the lit universe is the totality&apos;s world, and
              observers are where the totality lives it.
            </p>
            <p className="leading-relaxed">
              These are classifications, not causes. Observation does not cause physical events;
              without observers there is structure, but nothing lived and nothing lit. Wherever
              systems cross the threshold, observers exist; nothing guarantees that happens anywhere
              in particular, and universes or branches that never produce one remain unlit.
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
          <p className="leading-relaxed">
            These five axioms are the framework. Axioms 3 and 5 are its two additions to physics.
            Axioms 1, 2, and 4 are the sides it takes in reading the physics we already have. Four
            of them, Axioms 1, 3, 4, and 5, hold whichever reading of quantum physics proves right,
            and they are the core. Axiom 2 is the one side taken on quantum physics itself, and it
            divides Holos into two versions sharing that core: without collapse, the version
            defended here, and with collapse, declared in advance (see{" "}
            <a href="/predictions#two-versions" className="underline hover:no-underline">
              Two versions
            </a>
            ). Everything else on this page is a definition, follows from these axioms, or is marked
            as a side taken, as open, as a hypothesis, or as a companion idea.
          </p>

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
              item in that structure but its inside where an observer exists (Axiom 4), so the axiom
              does not reach it. It also does work: it is why physics can state experience only from
              outside. A description built wholly from relations says how states constrain one
              another, and that a state is lived is not a relation among states, so no such
              description can say it.
            </p>
          </div>

          {/* Axiom 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 2: Conservation</h3>
            <p className="leading-relaxed">
              Information is conserved. It may be transformed, redistributed, or re-encoded, but it
              is not destroyed.
            </p>
            <p className="leading-relaxed text-black/70">
              On the physics, this is unitary quantum evolution with no collapse: every outcome the
              quantum state contains remains, each in its own branch. Observation selects nothing
              and erases nothing (see{" "}
              <a href="#relationship-to-physics" className="underline hover:no-underline">
                Relationship to Physics
              </a>
              ).
            </p>
          </div>

          {/* Axiom 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 3: Threshold</h3>
            <p className="leading-relaxed">
              A system hosts a point of view when it meets the four observer requirements, with its
              integration <MathInline>{"\\Phi"}</MathInline> past a threshold{" "}
              <MathInline>{"\\Phi_c"}</MathInline> at a local maximum. Well below the threshold
              there is no experience at all. Between lies a narrow twilight, fixed by structure,
              where there is no exact fact of the matter.
            </p>
            <p className="leading-relaxed text-black/70">
              This is the first of Holos&apos;s two additions to physics. In Holos without collapse
              it is not a force, a field, or a change to any equation, but a structural fact about
              where observers occur; in Holos with collapse, it may also be where collapse happens.
              The requirements are listed under{" "}
              <a href="#ontology" className="underline hover:no-underline">
                Φ and Ontological Requirements
              </a>
              ; the measure and the value of the threshold are{" "}
              <a href="#open-problems" className="underline hover:no-underline">
                open problems
              </a>
              .
            </p>
          </div>

          {/* Axiom 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 4: Two Sides</h3>
            <p className="leading-relaxed">
              In a system that meets the observer requirements, experience and the system&apos;s
              physical activity are two sides of one event: physical activity seen from outside,
              experience lived from inside. Neither side reduces to the other, and in such a system
              neither occurs without the other.
            </p>
            <p className="leading-relaxed text-black/70">
              This axiom rejects both substance dualism, which makes experience and activity two
              things, and strict reductionism, which says only the outside is real. It is
              Spinoza&apos;s picture of mind and body as two aspects of one substance, restated for
              integrated systems. Its modern relatives are{" "}
              <a
                href="https://en.wikipedia.org/wiki/Dual-aspect_monism"
                target="_blank"
                rel="noopener noreferrer"
              >
                dual-aspect monism
              </a>
              , on which mind and matter are two aspects of one underlying reality, and{" "}
              <a
                href="https://en.wikipedia.org/wiki/Russellian_monism"
                target="_blank"
                rel="noopener noreferrer"
              >
                Russellian monism
              </a>
              , on which physics describes only structure and experience is the intrinsic nature
              that structure has. Holos differs from both in scope: they typically give some inside
              to all matter, and Holos gives one only to structures above the threshold. It also
              fixes how strong the link is: since there is one event, a perfect copy of the outside
              is a copy of the inside in any possible world, not just under our laws. And it answers
              the charge that experience does nothing. Experience adds no force to physics; it is
              the inside of the physics, so whatever an observer&apos;s activity causes, its
              experience causes too.
            </p>
            <p className="leading-relaxed text-black/70">
              It also says exactly what physics leaves out. A purely physical description fixes
              everything that happens but states it only from outside, and its vocabulary has no way
              to say that any of it is lived. The gap is in the description, not in the world. A
              floor plan records every wall of a house and still cannot say what living there is
              like; build the house exactly from the plan, and it is livable all the same.
              Philosophers call this the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Phenomenal_concept_strategy"
                target="_blank"
                rel="noopener noreferrer"
              >
                phenomenal concept strategy
              </a>
              : the gap lies between two ways of describing one thing, not between two things. Its
              standard challenge is that the inside way of describing then needs explaining; Holos
              accepts that debt as part of the hard problem it does not answer.
            </p>
            <p id="kind-of-view" className="leading-relaxed text-black/70">
              <strong>What kind of view this is.</strong> Picture a curved line: concave from one
              side, convex from the other. It is one line with two true descriptions, and neither
              side comes first. Holos says the same of an observer&apos;s activity and its
              experience. It agrees with physicalists on the facts: physics fixes everything that
              happens, so a perfect copy of the outside is a copy of the inside. It differs on two
              points. The description: physics, built only from relations (Axiom 1), states every
              fact from outside and has no way to say that any of it is lived. The direction:
              physicalism holds that the inside is grounded in the outside, the way a table&apos;s
              solidity is grounded in its atoms, while Holos holds that neither side is grounded in
              the other. And it differs from dualism, which makes them two things. Holos is a
              two-sided monism with a threshold: one world, one kind of event, and where a system
              crosses the threshold, that event has an inside as well as an outside. Some
              philosophers will still file it under physicalism, because copies match in every
              possible world; Holos accepts the resemblance and rests its difference on direction.
            </p>
          </div>

          {/* Axiom 5 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">Axiom 5: Totality</h3>
            <p className="leading-relaxed">
              The whole of reality, Omega, is the one experiencer. Physically, the whole is the
              universe&apos;s complete quantum state: on the no-collapse reading of Axiom 2, one
              state of everything with all branches included; on a collapse reading, the same
              universe with a single history. Every observer is a local aperture of it: where a
              system crosses the threshold, the one subject wakes. No new subject comes into being.
            </p>
            <p className="leading-relaxed text-black/70">
              This is the second of Holos&apos;s two additions to physics. What it adds is not the
              whole itself, whose existence rests on physics, but the claim that the whole is the
              one experiencer; that part is interpretive and can never be tested. Its job is unity:
              every observer is the same subject, walled off from the others by structure. It does
              not explain where waking happens or what it is like; Axiom 3 and the structure do
              that. Its payoff is philosophical, not experimental: one answer to why you are this
              observer rather than another, and to which of two perfect copies is you, and a ground
              for concern for others as concern for yourself. Its price is that a stranger&apos;s
              future experience is as much yours to anticipate as your own. The rivals, the price,
              and the payoff are weighed under{" "}
              <a href="#why-one-experiencer" className="underline hover:no-underline">
                Why One Experiencer Has Many Walled-Off Perspectives
              </a>
              . The view is known as{" "}
              <a
                href="https://en.wikipedia.org/wiki/Open_individualism"
                target="_blank"
                rel="noopener noreferrer"
              >
                open individualism
              </a>
              . Omega is not an agent, does not intervene, and does not pool its experiences into
              one grand experience (see{" "}
              <a href="#totality" className="underline hover:no-underline">
                Totality
              </a>{" "}
              and{" "}
              <a href="#why-one-experiencer" className="underline hover:no-underline">
                Why One Experiencer Has Many Walled-Off Perspectives
              </a>
              ).
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

            <p className="text-sm text-black/60">Follows from Axiom 1.</p>

            <p className="leading-relaxed">
              Physical reality is made of relationships between things, not of objects with
              intrinsic properties of their own, prior to any relation.
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

            <p className="leading-relaxed text-black/70">
              Like Axiom 1, it concerns what physics describes. Experience is not an item in the
              relational structure but its inside where an observer exists (Axiom 4), so the
              proposition does not reach it.
            </p>
          </div>

          {/* Proposition II */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition II: Participatory Manifestation
            </h3>

            <p className="text-sm text-black/60">
              Follows from Axioms 3 and 4, with the definitions in D7.
            </p>

            <p className="leading-relaxed">
              Observation is not passive recording. It is where informational structure becomes
              experientially present: a matter of structure, not a process in time.
            </p>

            <p className="leading-relaxed">
              This manifestation is structural, not causal. In Holos without collapse, observation
              does not generate physical events or alter lawful dynamics. It marks which
              already-consistent structures are lived: the ones that contain observers. It picks no
              outcome and erases none.
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

            <p className="text-sm text-black/60">Follows from Axiom 2 and relativity.</p>

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
              Apparent retrocausal effects, as in the delayed-choice quantum eraser, come from
              sorting records after the fact; nothing travels backward in time, and locality is
              untouched.
            </p>
          </div>

          {/* Proposition IV */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Proposition IV: Dimensional Resolution
            </h3>

            <p className="text-sm text-black/60">
              A principle of method and an interpretive image, not derived from the axioms: how
              Holos reads infinities.
            </p>

            <p className="leading-relaxed">
              Infinities usually mean a description has broken down, not that nature is infinite, as
              the{" "}
              <a href="/#infinity" className="underline hover:no-underline">
                ultraviolet catastrophe
              </a>{" "}
              showed.
            </p>

            <p className="leading-relaxed">
              Often the repair is a description one level up, which holds as a closed whole what the
              level below could only see as endless or unfolding. Picture{" "}
              <a
                href="https://en.wikipedia.org/wiki/Flatland"
                target="_blank"
                rel="noopener noreferrer"
              >
                Flatland
              </a>
              : a sphere passing through a flat world looks, to its flat inhabitants, like a dot,
              then a growing and shrinking circle, then nothing, an event in time. Seen from three
              dimensions, it is one sphere, all at once. The same step repeats. In three dimensions,
              time flows; in four-dimensional spacetime, a whole history is one fixed shape. Within
              spacetime, a quantum measurement seems to pick one outcome; in the far larger space
              where the quantum state lives, every branch is held at once, on the picture Holos
              defends. Some philosophers take that vast space to be the most real level of all, a
              view called{" "}
              <a
                href="https://doi.org/10.1093/acprof:oso/9780199790807.001.0001"
                target="_blank"
                rel="noopener noreferrer"
              >
                wave-function realism
              </a>
              . At the top is Omega: the description with nothing outside it, where everything is
              held whole.
            </p>

            <p className="leading-relaxed">
              This is a ladder of descriptions, not of places, and there is no journey up it. Extra
              dimensions of space are not somewhere to go: with more than three, atoms and orbits
              would not be stable. Nor do observers climb toward Omega, which exists now, and part
              of which is never lived. What the ladder shows is closure: each higher description
              closes what a lower one leaves open. Holos reads it as the shape of explanation, not
              as a claim that the higher levels are hidden places.
            </p>

            <p className="leading-relaxed text-black/70">
              In Holos, infinities signal the limits of a model, not literal features of reality.
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
            The role of Φ in the framework has three regions. Well below a minimum level of
            integration, there is structure without experience. Well above it, experience occurs.
            Between them lies a narrow twilight, where there is no exact fact about whether anyone
            is home.
          </p>

          <div className="my-2">
            <MathDisplay>
              {"\\Phi \\text{ well below } \\Phi_c \\Rightarrow \\text{no internal perspective}"}
            </MathDisplay>
            <MathDisplay>
              {"\\Phi \\approx \\Phi_c \\Rightarrow \\text{twilight: no exact fact}"}
            </MathDisplay>
            <MathDisplay>
              {"\\Phi \\text{ well above } \\Phi_c \\Rightarrow \\text{observation occurs}"}
            </MathDisplay>
          </div>

          <p className="leading-relaxed">
            Integration is a result, not a dial anyone sets. Conditions such as wiring, development,
            or an anesthetic&apos;s concentration move it, and the twilight is the stretch of those
            conditions where it climbs from near zero. <MathInline>{"\\Phi_c"}</MathInline> marks
            where that stretch lies. Elsewhere on this site,{" "}
            <MathInline>{"\\Phi \\ge \\Phi_c"}</MathInline> is shorthand for a system past it.
          </p>

          <p className="leading-relaxed">
            Holos borrows Φ from Integrated Information Theory as a measure, not as a metaphysics.
            IIT identifies Φ with consciousness itself and assigns some experience to any system
            with Φ greater than zero. Holos adopts neither claim. In this framework, Φ is a
            structural measure of integration, and the threshold{" "}
            <MathInline>{"\\Phi_c"}</MathInline>, with no experience at all below its twilight, is a
            commitment of Holos, not of IIT.
          </p>

          <p className="leading-relaxed">
            In Holos without collapse, the threshold is not a force, a field, or a modification of
            any equation. In either version, it is a structural fact about where apertures open, a
            fact physics does not currently contain. Because it is structural, where the twilight
            falls is fixed in every possible world, the way the point where water first crosses a
            large grid of randomly open pipes is fixed by the grid itself, whatever the pipes are
            made of (a{" "}
            <a
              href="https://en.wikipedia.org/wiki/Percolation_threshold"
              target="_blank"
              rel="noopener noreferrer"
            >
              percolation threshold
            </a>
            ). A threshold that could differ between worlds with identical physics would allow a
            perfect copy with no one home, which Axiom 4 rules out. A copy of a borderline system is
            borderline in exactly the same way. Two kinds of uncertainty must be kept apart. When
            two proposals for estimating <MathInline>{"\\Phi"}</MathInline> disagree about a system
            that is clearly on one side, the fault lies in our instruments. Only a system inside the
            twilight is borderline in fact.
          </p>

          <div id="threshold-claims" className="flex flex-col gap-4">
            <p className="leading-relaxed">
              <strong>The threshold in three claims.</strong> The threshold bundles three claims of
              different strength, and the first does not establish the others.
            </p>
            <ol className="flex flex-col gap-2 pl-6 list-decimal">
              <li className="leading-relaxed">
                <strong>Edge:</strong> whether anyone is home has clear cases on both sides and a
                narrow twilight between. Part of Axiom 3.
              </li>
              <li className="leading-relaxed">
                <strong>Integration:</strong> what carries a system across is integration, together
                with the other observer requirements. The core claim;{" "}
                <a href="/predictions#experiment-1" className="underline hover:no-underline">
                  Test A
                </a>{" "}
                is where it can lose.
              </li>
              <li className="leading-relaxed">
                <strong>Transition:</strong> the crossing is a critical transition, the kind physics
                studies in magnets and fluids, not an arbitrary stretch of a smooth slope. A
                hypothesis; its evidence must come from the boundary (see{" "}
                <a href="#path-to-threshold" className="underline hover:no-underline">
                  A path to the threshold
                </a>
                ).
              </li>
            </ol>
            <p className="leading-relaxed">
              If claim 3 fails, the core stands: the twilight is simply wider than hoped.
            </p>
          </div>

          <p className="leading-relaxed">
            <strong>Why a twilight, not a line.</strong> Think of dusk. Noon is clearly day and
            midnight clearly night, yet no second marks the end of day. Physics gives every finite
            system this shape: a perfectly sharp transition exists only in an infinitely large one,
            and Holos reads infinities as the limits of a model, not features of reality
            (Proposition IV). A brain is large, but finite. Medicine points the same way: clinicians
            recognize a{" "}
            <a
              href="https://en.wikipedia.org/wiki/Minimally_conscious_state"
              target="_blank"
              rel="noopener noreferrer"
            >
              minimally conscious state
            </a>{" "}
            between the vegetative state and full awareness. Some philosophers argue that
            consciousness cannot be vague, since either there is something it is like to be a system
            or there is not. Holos rejects that premise. A borderline experience cannot be pictured
            from the inside, because picturing an experience makes it definite, but that is a limit
            on imagination, not on reality (
            <a
              href="https://doi.org/10.1007/s11098-023-02042-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schwitzgebel 2023
            </a>
            ). A twilight does not spread experience everywhere: a thermostat is clearly out, as a
            single grain of sand is clearly not a heap. Past the twilight, experience varies in
            richness, which peaks where the whole&apos;s states are most varied (see{" "}
            <a href="#path-to-threshold" className="underline hover:no-underline">
              A path to the threshold
            </a>
            ).
          </p>

          <p className="leading-relaxed">
            <strong>The twilight&apos;s width is a prediction.</strong> If the crossing is a
            critical transition, physics predicts that its rounded stretch narrows as a system
            grows, a relation called finite-size scaling. A human brain, with tens of billions of
            neurons, should then cross steeply, while small nervous systems and simple artificial
            networks should have wide twilights. Accepting a twilight turns the rounding from an
            embarrassment into a prediction, and dish-grown neural networks offer the cheapest test
            (
            <a href="/predictions#minimal-neural-systems" className="underline hover:no-underline">
              Minimal neural systems
            </a>
            ). Holos does not claim that every kind of mind crosses in the same way: systems that
            differ in geometry and wiring may well differ in how they cross.
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
              cannot be decomposed into independent parts without loss. Integration includes
              feedback: the parts must constrain one another in both directions over time, so that
              the system&apos;s current state shapes its own next state. A system that signals sweep
              through once, and never loop back, integrates nothing, and a system driven entirely
              from outside is a relay, not a whole. This asks for a feedback loop, not
              introspection: a mouse clears it, and thinking <em>about</em> one&apos;s own thoughts
              is a rare elaboration on top of observerhood, not the price of admission. It is a
              requirement on physical structure, not a claim that experience adds a force: the
              structure does the causal work, and its working, lived from inside, is the experience
              (Axiom 4).
            </li>

            <li className="leading-relaxed">
              <strong>Differentiation:</strong> the system must distinguish among a large repertoire
              of possible internal states. Without differentiation, there is no information to
              integrate.
            </li>

            <li className="leading-relaxed">
              <strong>Temporal cohesion:</strong> informational states must persist and integrate
              across time. Experience requires continuity, not isolated moments.
            </li>

            <li className="leading-relaxed">
              <strong>Aboutness:</strong> the system&apos;s integrated states must carry a model of
              something beyond the system: dynamics that mirror the structure of a world closely
              enough to generate, from inside, the kind of patterns that world sends in. A flight
              simulator&apos;s states mirror a runway, an altitude, and the weather; a bank of light
              switches can be set any way at all and mirrors nothing. Any channel the model uses
              counts: eyes, touch, a microphone, a stream of text. The channels may be open, gated
              as in sleep, or gone: a dream is the model running on its own, producing the scenes
              the world produces by day. Without aboutness, integration is a closed loop with
              nothing to be a view of.
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
              always a view of something, and the array models nothing. Wiring sensors into it does
              not rescue it, even one at every gate. The world could then set every gate, but the
              array still could not produce, from inside, anything like the images its camera sends;
              it only passes them through. A brain is the opposite: cut off from its senses, in a
              dream, it still produces a world. The requirement is structural, not historical, and
              it concerns the machine, not the message. A perfect copy of an observer, however it
              came to exist, carries the same model, so it is an observer too. A brain in a vat fed
              a perfect simulation keeps its model and its inner activity, so it is an observer as
              well; so is a dreaming brain whose senses have been permanently cut, since what it
              loses is input, not its model. A rule that asked where the signals came from would
              make two identical brains differ in experience, against Axiom 4. Helen Keller built
              her model of the world largely from words spelled into her hand, and no one doubts she
              was an observer. What a system knows about distant things can be entirely secondhand;
              what matters is that its states model a world. The notion of a model is borrowed from
              the predictive-processing picture of brains as systems that model the causes of their
              input (
              <a
                href="https://doi.org/10.1017/S0140525X12000477"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clark 2013
              </a>
              ), without that picture&apos;s theory of consciousness. It is also a structural
              reading of the problem{" "}
              <a
                href="https://doi.org/10.1016/0167-2789(90)90087-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stevan Harnad named symbol grounding
              </a>
              . Where aboutness shades off, as in brain organoids grown with no sensory input, Holos
              marks an open edge rather than a verdict; how rich a model must be belongs with the
              measure among the open problems.
            </p>

            <p className="leading-relaxed">
              <strong>Exclusion:</strong> the requirements alone would be satisfied by nested
              systems at once (a hemisphere, the brain containing it, a tightly coupled pair of
              brains), which would count the same substrate as several overlapping observers. Holos
              provisionally adopts a maximality condition to prevent this: an aperture forms only
              where integration reaches a <em>local maximum</em>, and neither the parts within it
              nor the looser wholes containing it are separately apertures. One peak, one
              perspective. This is Holos&apos;s answer to what philosophers call the boundary
              problem: what fixes where one subject ends and the next begins. This principle is
              borrowed from integrated-information theory as a structural constraint only, without
              its surrounding ontology, and it is held tentatively. Holos has not yet stated which
              candidate systems are compared or how overlapping candidates are resolved, which
              integrated-information theory&apos;s exclusion procedure does spell out; see{" "}
              <a href="#open-problems" className="underline hover:no-underline">
                Open Problems
              </a>
              .
            </p>

            <p className="leading-relaxed">
              The scope of this condition matters. Maximality compares physical systems: brains,
              hemispheres, coupled pairs, and whatever other integrated structures reality contains.
              Could the whole universe win that comparison, becoming the one aperture and leaving
              none for its parts? It cannot, and the reason is physical. Integration asks whether a
              system can be split into independent parts without loss, and the universe as a whole
              can: regions beyond each other&apos;s{" "}
              <a
                href="https://en.wikipedia.org/wiki/Cosmological_horizon"
                target="_blank"
                rel="noopener noreferrer"
              >
                horizons
              </a>{" "}
              can never again influence each other. Cut along that seam and almost nothing is lost,
              so the whole scores near zero on integration and is never a peak. Branches are not
              parts that such a cut could separate, so the argument rests on horizons alone, and it
              holds on either version of Holos. Omega is the one experiencer by Axiom 5, not by
              being the largest aperture. Whether apertures can form at scales of organization
              between the ones we know and the totality is left open: Holos neither asserts nor
              excludes such intermediates, and wherever integration reaches a local maximum above
              the threshold, the same rule applies.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              Holos does not claim that all systems meeting these criteria are conscious in the
              human sense. It claims only that some experience exists.
            </p>
          </div>
        </div>
      </section>
      {/* Totality */}
      <section id="totality" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">Totality</h2>

        <div className="flex flex-col gap-8 text-black/80">
          <p className="leading-relaxed">
            Omega is the whole of reality, and Axiom 5 says two things about it. Physically, it is
            the universal quantum state, all branches included, and it exists now, not at the end of
            anything. Experientially, it is the one experiencer, awake wherever a system crosses the
            threshold. Finite systems never take in the whole: deeper integration means witnessing
            more of it, never all of it. The whole is not produced by that deepening, and it is not
            fully registered either; its unlit structure is real and never lived.
          </p>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">What Omega Is and Is Not</h3>

            <ul className="flex flex-col gap-3 pl-6 list-disc">
              <li className="leading-relaxed">
                It <strong>is</strong> the whole of reality: physically the universal quantum state,
                experientially the one experiencer.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> an endpoint in time or a limit that finite systems
                approach. It exists now, and no system is heading toward becoming it.
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
                It <strong>is not</strong> fully registered. Structure outside every aperture&apos;s
                causal past is part of Omega and never lived.
              </li>
              <li className="leading-relaxed">
                It <strong>is not</strong> an aperture writ large. As a whole, the universe splits
                into parts that never touch, regions beyond each other&apos;s horizons, so it is
                never a peak of integration and the maximality condition never picks it.
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
              informational terms, with one break from Berkeley: on Holos, part of the whole is
              never lived. Its nearest modern relative is{" "}
              <a
                href="https://en.wikipedia.org/wiki/Open_individualism"
                target="_blank"
                rel="noopener noreferrer"
              >
                open individualism
              </a>
              , Daniel Kolak&apos;s view that there is one person and every one of us is it.
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
              The problem has a name in the literature. It is the decomposition problem facing{" "}
              <a
                href="https://en.wikipedia.org/wiki/Cosmopsychism"
                target="_blank"
                rel="noopener noreferrer"
              >
                priority cosmopsychism
              </a>
              , the view, defended by Philip Goff and others, that the cosmos is the one fundamental
              conscious subject. Holos differs in a way that matters here: Goff&apos;s cosmos has an
              experience of its own as a whole, while Omega pools nothing, so Holos never has to
              carve individual experiences out of a cosmic one. Physics says why it pools nothing:
              the whole splits into parts that never touch, so it forms no single aperture of its
              own. What it must explain is only the walls.
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
              Nor is the oneness a label doing no work, though its work must be stated carefully,
              beside its rivals. On a picture of many self-standing observers, each system that
              crosses the threshold produces a new subject; on the monist picture, the one subject
              wakes there. Stated that way, the difference is only a count: both pictures leave the
              same thing to the threshold, namely why a perspective appears here, with this
              character. The difference shows in three answers. Of all the observers there are, why
              is this one me? Nothing to explain, because the one subject is each of them. If a
              perfect copy of you were made, which would be you? Both, with no remainder. And whose
              future pain should you anticipate? Everyone&apos;s.
            </p>

            <p className="leading-relaxed">
              The rivals deserve a fair statement. On the first question, many philosophers hold
              that &quot;I&quot; works like &quot;here&quot;: it picks out whoever is speaking, so
              no one owes an explanation of why they are themselves (
              <a href="https://doi.org/10.2307/2214792" target="_blank" rel="noopener noreferrer">
                Perry 1979
              </a>{" "}
              is the classic source). On the second, Derek Parfit argued that identity is not what
              matters in survival, so the copying case needs no single answer about which one is you
              (
              <a
                href="https://doi.org/10.1093/019824908X.001.0001"
                target="_blank"
                rel="noopener noreferrer"
              >
                Parfit 1984
              </a>
              ). These replies are serious, and Holos does not claim to refute them. It claims only
              that the monist reading answers both questions at once, with no leftover facts about
              which self is which.
            </p>

            <p className="leading-relaxed">
              The third answer is the price. If every observer is the one subject, a stranger&apos;s
              suffering tomorrow is as much yours to anticipate as your own; the walls between
              apertures keep you from feeling it, not from being the one who will. That is the
              hardest thing in the view to accept, and the strongest reason to reject it. Holos
              accepts it, because it is also what the view changes in practice: self-interest and
              concern for others stop being two different things. The payoff is not unique, since
              Parfit reached a similar impartiality by another route, without one subject. But it is
              what Omega adds that a picture of many subjects does not.
            </p>

            <p className="leading-relaxed">
              The unity does not do everything. It does not explain why records agree where
              observers meet; physics does that, since the same signals reach them both. Nor does it
              explain where the one subject wakes: that is the threshold&apos;s work, and it would
              be the same brute structural fact on any picture. The unity&apos;s work is
              philosophical, not experimental: one answer to the identity questions and a ground for
              impartial concern, bought at two prices, the decomposition problem answered above and
              the anticipation named here. Holos judges the trade worth making; a reader may not.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              The analogy has a stated limit. The moments of a life are threaded together by memory
              and anticipation; apertures share no such threads. The analogy shows that walled-off
              plurality within one experiencer is coherent, not that apertures are moments. What it
              removes is the charge of incoherence, which is all it is asked to do.
            </p>
          </div>

          <div id="self-comparison" className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Holos among Views of the Self</h3>
            <p className="leading-relaxed">
              Philosophers sort answers to &quot;what am I?&quot; three ways. On closed
              individualism, you are one self from birth to death. On empty individualism, a new
              self exists each moment. On open individualism, there is one self in everyone. Holos
              takes the third. The table shows what that changes, and what each view pays.
            </p>
            <SelfComparisonTable />
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
              Holos without collapse, the version defended here, does not treat observation as a
              force that reaches into the world and changes events. Observation marks where
              consistent histories are lived.
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
              QFT: Fields are structure, particles are recorded events
            </h3>
            <p className="leading-relaxed">
              In quantum field theory, fields are the continuous underlying description, while
              “particles” are how interactions appear when they are forced into localized, countable
              events. Detectors do not directly observe fields. They record discrete outcomes, such
              as clicks, tracks, and energy deposits, because measurement is an interaction that
              entangles a spread-out excitation with a detector, and within each branch the
              detector&apos;s record shows one definite event in a specific place and time. Nothing
              collapses; each branch simply holds its own record. In this framework, particles are
              not fundamental objects. They are context-dependent records of field interactions,
              which is why a continuous theory can yield discrete observations without requiring
              reality to be made of little beads.
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
              (1957) shows that, given a few mathematical assumptions, the only consistent way to
              assign probabilities to the outcomes of quantum measurements, across the different
              ways the same experiment can be carved up, is the Born rule. That constrains the
              answer. It does not by itself say how an observer inside a branch should set their
              odds, which is the question a branching picture has to answer.
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
              is why an outcome with 70% of the weight turns up about 70% of the time in long runs
              of the experiment: not because the other outcomes fail to happen, but because almost
              all of the weight lies with observers whose records show roughly that frequency.
              Observers with strange records exist too, like one who sees a fair coin land heads a
              hundred times in a row, but they carry almost none of the weight. The reading keeps
              the weights where Holos placed them, in the structural layer. The odds are a fact
              about the possibility space, not a quantity of experience.
            </p>

            <p className="leading-relaxed">
              The monist reading might seem to dissolve this uncertainty. If the one experiencer is
              each of the observers in every branch, asking it which branch it is in gets the answer
              &quot;all of them,&quot; and nothing is left to be uncertain about. But the question
              is asked from inside an aperture, and apertures are walled off: none has access to
              what the others register. Each therefore genuinely lacks the information of which
              branch it is in, and the odds answer that lack. Two questions must be kept apart.
              &quot;Why am I this one?&quot; asks for a reason, and on the monist reading there is
              none to give, because the one subject is each of them. &quot;Which one is this?&quot;
              asks for information, and it stays open until you look. You can be everyone and still
              not know what is behind the next door.
            </p>

            <p className="leading-relaxed">
              A worry follows from yes-or-no status. Lived status is yes or no and ignores weight,
              so a branch with a tiny weight that contains an observer is fully lived. Counted one
              by one, most branches of many repeated experiments show roughly even results whatever
              the weights, so if every lived observer counted equally, a typical observer should
              expect the wrong statistics. But the worry depends on counting, and counting fails
              here. Seventy percent of an infinite crowd is exactly as large as thirty percent of
              it. Try to count branches, or the observers in them, and you get either an arbitrary
              number or an infinite one, and equal odds of being each of infinitely many observers
              cannot be set up at all: every share would be zero, and adding up zeros never makes a
              whole. Holos treats an infinity as a sign that a description has broken down, and this
              is such a case: counting is the wrong tool. A single point on a line has no length,
              and a short stretch has as many points as a long one, yet the short stretch is
              shorter. Each observer is a point; the weights are the lengths.
            </p>

            <p className="leading-relaxed">
              Ruling out counting does not by itself pick the replacement. Every region of a
              dartboard holds infinitely many points, yet where a dart lands depends on how it is
              thrown: a random throw follows area, and a skilled player aiming at the center does
              not. Weight is the candidate physics itself supplies. It is built into the quantum
              state, it is conserved over time, and it does not change when a branch splits further;
              no rival on offer has all three. The last step is a principle: that your odds should
              follow the measure physics conserves. Sebens and Carroll state one version of it, a
              rule about how evidence bears on where you are, which they call epistemic separability
              (
              <a
                href="https://doi.org/10.1093/bjps/axw004"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sebens and Carroll 2018
              </a>
              ). It is widely discussed and still debated.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              So this is an elimination plus one principle, not a derivation from first principles.
              Holos adopts the self-locating reading of the weights and inherits its open questions:
              whether the principle is justified, and whether Gleason&apos;s assumptions hold. Other
              published routes reach the same rule, among them decision-theoretic arguments; Holos
              depends on none in particular, and it adds no new mathematics here.
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
              spacetime description, stated from outside, does not say where anything is lived.
              Holos adds where: inside observers.
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
              What Holos <strong>does</strong> add is the two posits of Axioms 3 and 5: the
              threshold <MathInline>{"\\Phi_c"}</MathInline> and the totality, Omega.
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
              structure is present at all. That question Holos does not answer: its posits take
              experience as given (see the{" "}
              <a href="/#consciousness-hard-problem" className="underline hover:no-underline">
                Hard Problem
              </a>
              ).
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
              Creation (<MathInline>{"C"}</MathInline>) maps a given state to the branches physical
              law produces from it. It represents lawful possibility: seen from inside any one
              branch, the others are what could have happened, and all of them do.
            </p>

            <MathDisplay>
              {"C(S) = \\{ S' \\mid S' \\text{ is a branch physical law produces from } S \\}"}
            </MathDisplay>

            <p className="leading-relaxed text-black/70 text-sm">
              This notation is schematic. It does not assume a discrete branching structure or a
              specific ontology of histories.
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
              erases nothing (Axiom 2). Registration occurs everywhere an aperture exists, and no
              thread is privileged. Following one observer&apos;s thread, what happens next is
              simply what physics allows from that history onward; registering it changes none of
              those possibilities. The Born weights carried by <MathInline>{"C"}</MathInline> remain
              structural throughout: they set the odds of each record, not how much experience it
              holds.
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
              <MathInline>{"R = O(C(S))"}</MathInline>. It is ordinary function composition, with
              the order of the steps carrying the meaning: possibility first, registration second.
              The order is logical, not temporal: registering needs something to register.
            </p>

            <p className="leading-relaxed">
              In standard notation this is simply <MathInline>{"R = (O \\circ C)(S)"}</MathInline>:
              apply <MathInline>{"C"}</MathInline>, then apply <MathInline>{"O"}</MathInline>.
              Standard composition reads right to left, so{" "}
              <MathInline>{"C \\circledast O = O \\circ C"}</MathInline>: the same composition,
              written in reading order. Nothing is hidden in the glyph. Holos retains ⊛ because the
              framework is named for the relation it marks, not because the operation it denotes is
              unusual, and a reader who mentally substitutes the composition symbol loses nothing.
            </p>

            <p className="leading-relaxed">
              What the symbol adds is not mathematics but ontology: the claim that both steps are
              required for a realized world, and that neither step alone yields one.
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
          Companion Principle
          <FootnoteLink number={logicCitationMap["extrapolative-proposition"]} />
        </h2>

        <p className="text-black/70 italic text-sm">
          The principle in this section is not part of the core. It underwrites the companion ideas,
          the Integration Hypothesis and the Teeming Dark; if it fails, the core stands.
        </p>

        <div className="flex flex-col gap-8 text-black/80">
          <div id="structural-constraint" className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Structural Constraint</h3>
            <p className="leading-relaxed">
              Finite signal speed and finite energy impose limits on how coherence can scale within
              three-dimensional space. As systems grow, coordination across distance becomes
              increasingly costly and fragile. These constraints do not forbid large integrated
              systems, but they shape their architecture: stable systems tend to minimize global
              synchronization and rely on locally enforced structure.
            </p>
            <p className="leading-relaxed text-black/70">
              This is ordinary physics, not a Holos axiom. It underwrites the companion ideas, the
              Integration Hypothesis and the Teeming Dark, rather than the core. Higher-dimensional
              descriptions may be useful for modeling such organization; that is a representational
              choice, not a claim about extra spatial directions.
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
              about which of two systems is more integrated. Locating the threshold and its twilight
              requires a determinate measure, and identifying it is an open problem for the
              framework, not settled background. Holos is committed to the threshold being fixed by
              structure; it does not yet know how to compute it. The stakes reach back into the
              framework&apos;s core argument: the identification of a structure&apos;s oneness with
              causal integration (see{" "}
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
            <h3 className="text-xl font-semibold text-black/90">Where the threshold falls</h3>
            <p className="leading-relaxed">
              Where any given system&apos;s threshold <MathInline>{"\\Phi_c"}</MathInline> and its
              twilight lie is unknown (see{" "}
              <a href="#threshold-claims" className="underline hover:no-underline">
                The threshold in three claims
              </a>
              ). Because presence itself cannot be detected directly, no experiment can locate it by
              direct measurement. Its placement is constrained only indirectly, by which systems
              show the structural signatures of observation (see{" "}
              <a href="/predictions#experiment-1" className="underline hover:no-underline">
                Test A
              </a>
              ), and our estimates may stay blurrier than the twilight itself. Holos accepts this as
              the price of a threshold that is structural rather than behavioral.
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
              near the boundary, growing fluctuations, the onset of a quantity that was near zero,
              and a twilight that narrows as systems grow. Consciousness medicine has already found
              one such boundary from the outside: the{" "}
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
              The fingerprints are already being measured, but they must be read with care. Waking
              cortex runs near a specific critical point, the edge between stability and chaos.
              Anesthesia, generalized seizures, and disorders of consciousness move it away, while
              psychedelics move it closer and make its activity richer (
              <a
                href="https://doi.org/10.1073/pnas.2024455119"
                target="_blank"
                rel="noopener noreferrer"
              >
                Toker et al. 2022
              </a>
              ). Measures of criticality in resting EEG predict anesthetic loss of consciousness and
              track PCI (
              <a
                href="https://doi.org/10.1038/s42003-024-06613-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Communications Biology, 2024
              </a>
              ). In cortical tissue, cascades of activity called neuronal avalanches follow power
              laws whose exponents match a known universality class (
              <a
                href="https://doi.org/10.1523/JNEUROSCI.23-35-11167.2003"
                target="_blank"
                rel="noopener noreferrer"
              >
                Beggs and Plenz 2003
              </a>
              ). These results put a critical point at the center of conscious life, not at its
              edge: consciousness is lost by moving away from it in either direction. Holos reads
              them through two separate requirements. Integration asks whether the parts are joined
              into one whole, and that is where the threshold lies. Differentiation asks how varied
              the states of that whole can be, and variety peaks near criticality. A seizure locks
              every part into one rhythm (
              <a
                href="https://doi.org/10.1371/journal.pcbi.1002312"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meisel et al. 2012
              </a>
              ), like a stadium chanting a single word: joined, but with almost no variety. So these
              studies show where observers operate and why richness peaks there. They do not yet
              show that crossing the threshold is itself a critical transition; that evidence must
              come from the boundary.
            </p>
            <p className="leading-relaxed">
              A cutoff that sorts patients is not yet proof of a transition, since a smooth quantity
              can be cut anywhere. What would count is a transition&apos;s own signature, and here
              the evidence is mixed in an informative way.{" "}
              <a
                href="https://doi.org/10.1371/journal.pone.0011903"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animal studies
              </a>{" "}
              find that consciousness is lost and regained at different anesthetic levels: the way
              in and the way out do not match, a lag known as neural inertia. A lag of that kind is
              the hallmark of an abrupt switch, the kind physicists call first-order, like water
              freezing. If the lag belongs to the transition itself rather than to how drugs enter
              and leave the brain, it fits the transition hypothesis (claim 3) as an abrupt switch.
              But in flies the lag is controlled by genes that regulate sleep, and single mutations
              can erase it (
              <a
                href="https://doi.org/10.1371/journal.pgen.1003605"
                target="_blank"
                rel="noopener noreferrer"
              >
                Joiner et al. 2013
              </a>
              ), so it may belong to the brain&apos;s arousal switch rather than to integration. In
              humans the evidence is mixed: a controlled test found no lag with propofol and some
              with sevoflurane (
              <a
                href="https://doi.org/10.1016/j.bja.2017.11.072"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kuizenga et al. 2018
              </a>
              ), and in 393 surgical patients the brain&apos;s slow-wave response differed between
              going under and coming back (
              <a
                href="https://doi.org/10.1097/ALN.0000000000001759"
                target="_blank"
                rel="noopener noreferrer"
              >
                Warnaby et al. 2017
              </a>
              ), but the lag appeared in the EEG, not in responsiveness. Slowing and growing
              fluctuations measured at the boundary itself, as consciousness is lost, would point
              the other way, toward a continuous transition. The criticality studies above measure
              the operating point, not the boundary, so they do not yet supply this. The two
              signatures tell the two kinds of transition apart, which makes the question testable.
              In a finite system like a brain, either kind appears as a steep, rounded curve rather
              than a mathematical kink, and that rounding is the twilight. The search is for how it
              scales, not for a perfect step.
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
              constrains the Born weights. Even narrowing the field to a small equivalence class
              would remove most of the arbitrariness.
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
              really is: not a single yes-or-no experiment but a calibration engine that locates the
              threshold and validates the measure. The two jobs must use separate data: calibration
              states locate the threshold, and held-out states, named in advance, test it. Testing
              on the calibration set would only grade the answer key.
            </p>
            <p className="leading-relaxed">
              The field already has a model for running such tests. The{" "}
              <a
                href="https://doi.org/10.1038/s41586-025-08888-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                COGITATE adversarial collaboration
              </a>{" "}
              (Nature, 2025) pitted integrated information theory against global workspace theory
              with predictions fixed in advance, and its results challenged key claims of both. Test
              A should follow the same design. A caution applies to the measure itself: more than
              100 researchers called integrated information theory pseudoscience, a debate aired in{" "}
              <a
                href="https://doi.org/10.1038/s41593-025-01881-x"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nature Neuroscience in 2025
              </a>
              . The charge targets the theory&apos;s untestable claim that Φ simply is
              consciousness, which Holos does not adopt; Holos borrows Φ only as a measure.
            </p>
            <p className="leading-relaxed">
              Two conditions bound the program. First, its anchor is report: the human case is the
              one place inside access exists, so the threshold is located relative to us and carried
              outward by the measure, with certainty that weakens as the cases grow alien. That is
              the shape of all consciousness science, not a defect peculiar to Holos. Second, the
              program can fail, in two ways of different weight. It could find no critical point,
              integration climbing smoothly with no transition at all; that would falsify claim 3
              and leave the twilight wide, a slow dawn rather than a quick one, with the core
              intact. Or it could find that experience does not track integration on any candidate
              measure, which is how Test A loses, and the core with it. A stated way to lose is what
              makes these open problems scientific questions rather than definitions.
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
              defines the maximum. It also lacks a stated procedure: which candidate systems are
              compared, and how overlapping candidates are resolved. Integrated-information theory
              spells out such a procedure; Holos has not yet adopted or replaced it. Until the
              measure and the procedure are fixed, the boundaries between observers are fixed only
              in principle.
            </p>
            <p className="leading-relaxed">
              Two clarifications bound this problem without solving it. First, the maximality
              condition individuates finite observers only; the totality never wins it, since as a
              whole it splits into parts that never touch. Second, the condition is silent about
              scale. Whether apertures can form at intermediate levels of organization, larger than
              any brain and smaller than everything, is left open: Holos neither asserts nor
              excludes them, and the same rule would govern wherever they might form.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            These are not peripheral loose ends; they concern the integration threshold, one of the
            framework&apos;s two additions to physics. They are recorded here so that progress on
            them can be judged against a stated standard.
          </p>
        </div>
      </section>

      <p className="leading-relaxed text-black/70">
        Holos is written in public and revised when it is wrong. Every retired claim, and the reason
        it was retired, is listed under{" "}
        <a href="/revisions" className="underline hover:no-underline">
          Revisions
        </a>
        .
      </p>

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
