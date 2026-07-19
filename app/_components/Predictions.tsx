import { FootnoteLink, predictionsCitationMap } from "./citation-sections";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

export default function Predictions() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Introduction */}
      <section id="prediction-introduction" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-black/80">
          <h2 className="text-2xl sm:text-3xl font-light pb-2">
            Predictions
            <FootnoteLink
              number={predictionsCitationMap["prediction-introduction"]}
              className="relative left-1 -top-2.5"
            />
          </h2>

          <p className="leading-relaxed">
            Holos does not add new{" "}
            <a
              href="https://en.wikipedia.org/wiki/Dynamics_(physics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              dynamical laws
            </a>{" "}
            or modify the equations of physics. It adds two ingredients beyond them: the
            integration threshold <MathInline>{"\\Phi_c"}</MathInline>, a structural fact about
            where observation occurs, and the totality, Omega, as the fundamental ground of
            experience, of which every observer is a local aperture. Every claim below follows
            either from established physics or from those two additions.
          </p>

          <p className="leading-relaxed">
            The sections below separate four kinds of claims. The last section includes speculative
            extensions that aim to produce observable signatures, not just philosophy.
          </p>

          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Commitments:</strong> what must be true if Holos is correct, independent of
              any future experiments.
            </li>
            <li className="leading-relaxed">
              <strong>Expectations:</strong> patterns we should already observe in neuroscience,
              quantum foundations, and cosmology if those commitments are right.
            </li>
            <li className="leading-relaxed">
              <strong>Testability and its limits:</strong> an honest account of what cannot be
              tested (presence itself), the structural predictions that can genuinely fail, and a
              standing bet that could falsify the framework outright.
            </li>
            <li className="leading-relaxed">
              <strong>Speculation:</strong> bold but disciplined extensions that <em>could</em>{" "}
              follow under Holos on long timescales, stated with explicit alternatives rather than
              predictions.
            </li>
          </ul>

          <p className="leading-relaxed text-black/70 text-sm">
            For the operational definition and the observer criteria, see{" "}
            <a href="/logic#operational-definition" className="underline hover:no-underline">
              Logic
            </a>
            .
          </p>
        </div>
      </section>

      {/* 1) Commitments */}
      <section id="commitments" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Commitments
          <FootnoteLink
            number={predictionsCitationMap["commitments"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          <p className="leading-relaxed">
            The statements in this section are fundamental to Holos. If any of these are rejected in
            principle, the framework fails as a coherent account of how reality becomes experienced.
          </p>

          {/* C1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              1. Presence depends on observers
            </h3>

            <p className="leading-relaxed">
              A physical description can be complete and still fail to explain why there is anything
              it is like to be inside the system it describes. This gap is ontological rather than
              merely epistemic.
            </p>

            <p className="leading-relaxed">
              The claim is not that observers modify physical dynamics. It is that a world becomes{" "}
              actualized reality only when information is registered from an internal perspective.
              Without registration, there is structure, but no lived fact.
            </p>

            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Consistency alone does not produce presence. Presence requires registration.
            </blockquote>

            <p className="leading-relaxed">
              Unobserved histories therefore remain valid structures within{" "}
              <MathInline>{"C"}</MathInline>, but they are not experienced realities without{" "}
              <MathInline>{"O"}</MathInline>.
            </p>

            <p className="leading-relaxed">
              Anthropic principles explain why observers find themselves in observer-compatible
              universes. They do not explain how observation itself exists or why physical structure
              is experienced from the inside. This framework addresses that gap without assigning
              observers any causal role in physical dynamics.
            </p>

            <p className="leading-relaxed">
              The existence of experience demonstrates that self-registering structures are not
              merely abstract possibilities, but realizable ones under physical constraint. Once
              such a structure is realizable even once, actualized reality exists, regardless of how
              rare or contingent its emergence may be.
            </p>

            <p className="leading-relaxed">
              Closure has two levels. <strong>Sealing</strong> is binary and branch-wide: a
              history that contains any registration, anywhere along it, is a lived history in its
              entirety; in the monist reading, it is one the totality experiences through. A branch or
              universe that never forms an aperture is structure that is never lived.{" "}
              <strong>Witnessing</strong> is graded and local: how much of a lived history is
              experienced in detail scales with the observers it contains. One observer seals a
              branch; many witness it.
            </p>
          </div>

          {/* C2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">2. Observerhood is thresholded</h3>

            <p className="leading-relaxed">
              Holos rejects the idea that experience increases smoothly with greater amounts of
              computation. Distributed processing can scale indefinitely without producing a single
              point of view.
            </p>

            <p className="leading-relaxed">
              What matters is integration. Below a critical level, there is no unified internal
              state that could count as “what is happening for the system.” Above that level,
              experience is unavoidable.
            </p>

            <div className="my-2">
              <MathDisplay>{"\\text{Observerhood requires } \\Phi \\ge \\Phi_c"}</MathDisplay>
            </div>

            <p className="leading-relaxed">
              Observerhood is neither ubiquitous nor optional. It appears when structural conditions
              for integration are met.
            </p>

            <p className="leading-relaxed">
              Whether a system crosses this threshold is a fact about its causal architecture. It
              belongs to the structural layer of reality, alongside the laws of physics, and is not
              itself indexed to any other observer. Observerhood is the eligibility condition for
              having a perspective; it is not relative to one. In the monist reading, crossing the
              threshold is where an aperture opens: the totality registers itself through the
              system.
            </p>

            <p className="leading-relaxed">
              Two consequences follow. First, there are no dark duplicates: because crossing the
              threshold is a structural fact, any system wired as an observer necessarily is one:
              a physically identical copy of an observer cannot lack experience. Second, the
              threshold is sharp while its surroundings are not. Whether there is experience at all
              is binary; how rich the experience is, is graded above the line; and locating the
              boundary by measurement is permanently imprecise. The fuzziness of real cases lives
              in richness and in our instruments, not in whether anyone is home.
            </p>
          </div>

          {/* C3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              3. Facts are relational but consistent
            </h3>

            <p className="leading-relaxed">
              Holos distinguishes two kinds of facts. <strong>Structural facts</strong> describe
              what is consistent: the laws of physics, the space of allowed histories with their
              quantum weights, and whether a system meets the integration threshold. These are
              absolute and observer-independent.{" "}
              <strong>Registered facts</strong> describe what is actualized as experience: which
              outcome a system registers from its own perspective. These are always indexed to
              observing systems.
            </p>

            <p className="leading-relaxed">
              The relational commitment applies to registered facts. There is no absolute,
              observer-independent fact about which outcome is experienced. The structural layer,
              by contrast, is not relative; without it, registration would have nothing stable to
              close against.
            </p>

            <p className="leading-relaxed">
              This does not imply contradiction, and Holos is specific about why. No possibility is
              erased (Axiom 3), so observers never collide over a single shared outcome. Where
              registrations would be incompatible, they belong to different branches of the
              possibility structure, each internally consistent. There is no rule that the first
              observer fixes the truth for everyone; relativity permits no such “first,” and none
              is needed.
            </p>

            <p className="leading-relaxed">
              Within a branch, consistency is operational rather than abstract: whenever two
              observers actually compare records, their records agree. Perspectives may differ
              while separated; communication forces agreement. This is the checkable content of
              “global consistency.” In the monist reading it is also grounded: apertures of one
              totality cannot disagree where they meet.
            </p>

            <p className="leading-relaxed">
              Branches are weighted, not merely counted. The statistics every observer records
              follow the Born rule, the unique self-consistent weighting of quantum outcomes
              (Gleason&apos;s theorem). Those weights are structural facts about the possibility
              space, not a measure of how much experience a branch carries. What the weight
              itself measures, Holos records as an open problem rather than resolving by fiat,
              and it claims no derivation of expectation from branching, a puzzle it inherits
              from every no-collapse account rather than one it creates. See{" "}
              <a href="/logic#relationship-to-physics" className="underline hover:no-underline">
                Logic
              </a>{" "}
              for the full account.
            </p>

            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Registered facts are relative to observers. Structural facts are absolute. Observers
              who compare records agree.
            </blockquote>

            <p className="leading-relaxed">
              Collapse is therefore not a new physical process. It is the registration of a
              particular outcome by an observer whose internal structure supports presence.
            </p>
          </div>

          <div className="mt-2 pt-4 border-t border-black/10">
            <p className="leading-relaxed text-black/70 text-sm">
              Everything that follows assumes these commitments. What comes next addresses what we
              should expect to observe in the world if they are correct.
            </p>
          </div>
        </div>
      </section>

      {/* 2) Expectations */}
      <section id="expectations" className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-light">
          Expectations
          <FootnoteLink
            number={predictionsCitationMap["expectations"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-8 text-black/80">
          <p className="leading-relaxed">
            These expectations do not add new laws or mechanisms. They describe what should be
            observed in existing domains if the commitments of Holos are correct. Persistent failure
            across domains would undermine the framework.
          </p>

          {/* Neuroscience */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Neuroscience: Discrete transitions in conscious access
            </h3>

            <p className="leading-relaxed">
              If observerhood requires a minimum level of integration, then transitions between
              conscious and unconscious states should not appear as smooth signal degradation. They
              should resemble state changes.
            </p>

            <p className="leading-relaxed">
              Large-scale neural integration measures should therefore exhibit nonlinear behavior
              near loss and recovery of consciousness. Below threshold, processing continues without
              unified access to experience.
            </p>

            <p className="leading-relaxed">
              If something like a Global Neuronal Workspace is involved in conscious access, these
              threshold crossings should appear as abrupt transitions into globally available neural
              states rather than as a gradual fading of reportability.
            </p>

            <p className="leading-relaxed">
              Proxy measures such as{" "}
              <a
                href="https://en.wikipedia.org/wiki/Perturbational_Complexity_Index"
                target="_blank"
                rel="noopener noreferrer"
              >
                PCI
              </a>{" "}
              are relevant not as definitions of consciousness, but as probes of whether integration
              crosses a critical boundary.
            </p>
          </div>

          {/* Quantum foundations */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Quantum foundations: Observer-relative facts without collapse
            </h3>

            <p className="leading-relaxed">
              If facts are instantiated through registration, quantum experiments should continue to
              allow descriptions in which different observers register incompatible outcomes without
              violating global consistency.
            </p>

            <p className="leading-relaxed">
              Holos therefore aligns with relational approaches in which states are not absolute
              properties, but facts relative to observing systems, and with branching approaches
              in which no possibility is erased. The operational signature is agreement: whenever
              observers within a branch compare records, the records match. A confirmed,
              irreconcilable record mismatch between communicating observers would falsify this
              commitment.
            </p>
          </div>

          {/* Cosmology */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Cosmology: Ontological filtering rather than fine-tuning
            </h3>

            <p className="leading-relaxed">
              The observed universe lies within the narrow range compatible with long-lived
              observers, not because constants were dynamically tuned, but because only such
              structures become experientially present.
            </p>

            <p className="leading-relaxed">
              Observer-incompatible universes may exist as valid physical structures while never
              being lived: with no apertures, the totality has no opening into them, and they
              remain unlit structure. The nearest examples are not exotic: under the branching
              picture, observer-free branches of our own universe are unlit structure in exactly
              the same sense. Anthropic reasoning is therefore reframed as ontological filtering
              rather than selection.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Minimal neural systems: emergence of coherent integration
            </h3>

            <p className="leading-relaxed">
              If observerhood depends on informational integration rather than biological scale,
              then small biological neural networks interacting with an environment should exhibit
              measurable transitions in system-level coherence as integration increases.
            </p>

            <p className="leading-relaxed">
              Recent experiments with cultured neural networks connected to digital environments
              suggest that biological neurons can form closed feedback loops outside of a full
              organism. Under the Holos framework, progressively increasing connectivity, feedback
              richness, and environmental coupling should eventually produce a regime where neural
              activity shifts from distributed dynamics toward unified system-level organization.
            </p>

            <p className="leading-relaxed">
              Such transitions would not demonstrate consciousness directly. However, the existence
              of a reproducible boundary between loosely coupled neural computation and coherent
              integrated dynamics would support the claim that observerhood depends on structural
              integration rather than on organismal complexity.
            </p>
          </div>
        </div>
      </section>

      {/* 3) Testability and its limits */}
      <section id="experimentation" className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-light">
          Testability and Its Limits
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos must be honest about what it cannot test. Its central claim is that observation is
            a closure condition, not a force: it changes no equation and moves nothing. But every
            experiment is a physical measurement, and an instrument only ever registers physical
            change. So <strong>presence itself cannot be detected directly</strong>. An instrument
            that finds nothing extra is exactly what Holos predicts, because there is nothing extra
            to find: presence is what the physics is like from the inside, not an additional signal
            beside it.
          </p>

          <p className="leading-relaxed">
            This is not a gap Holos has failed to close. It follows from the framework&apos;s own
            commitment that observation is dynamically inert. The sharpened form of the objection is
            the <em>unfolding argument</em>: for any conscious system one can in principle describe a
            behaviorally identical twin wired differently, and no external test could separate them.
            Holos accepts this rather than evading it. The metaphysical core (presence, and the
            totality it belongs to) is not empirically decidable, and the framework says so plainly.
          </p>

          <p className="leading-relaxed">
            What remains testable is not presence but its <strong>structural preconditions</strong>:
            claims about what observation requires, and how registered facts behave. These live in
            the physical world and can genuinely fail. Two are worth stating, each with an explicit
            way for Holos to lose. A prediction Holos shares with rival theories cannot single it
            out, but a shared prediction it could fail is still worth more than one it cannot.
            Beneath both sits a standing bet, stated after the tests, on which the framework
            stakes itself outright.
          </p>
        </div>
      </section>

      {/* Test A */}
      <section id="experiment-1" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Test A: Consciousness tracks integration, not behavior
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Everyday practice assumes a responsive system is conscious and an unresponsive one is
            not. Holos makes a sharper, riskier claim: what matters is <em>integration</em>, and
            integration can come apart from outward behavior. When the two diverge, Holos bets that
            experience follows integration.
          </p>

          <p className="leading-relaxed">
            The bet is losable because the dissociations already exist. People under{" "}
            <a
              href="https://en.wikipedia.org/wiki/Ketamine"
              target="_blank"
              rel="noopener noreferrer"
            >
              ketamine
            </a>
            , in REM dreaming, or in certain seizures are behaviorally unresponsive yet later report
            vivid experience; sleepwalkers and some automatisms are responsive yet report little or
            nothing. These are natural experiments that pull integration apart from responsiveness.
          </p>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Objective</h4>
            <p className="leading-relaxed">
              Across states where responsiveness and integration diverge, determine whether later
              reported experience tracks a measure of integration or tracks behavioral
              responsiveness and arousal.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Method</h4>
            <p className="leading-relaxed">
              Combine no-report and post-hoc-report paradigms with integration proxies such as the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Perturbational_Complexity_Index"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perturbational Complexity Index
              </a>{" "}
              across wakefulness, anesthesia, sleep stages, and dissociative states, treating
              behavioral responsiveness and integration as separately varying factors rather than
              proxies for each other.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Holos Prediction</h4>
            <p className="leading-relaxed">
              Where they diverge, reported presence follows integration:
              high-integration/low-responsiveness states are experienced; low-integration/
              high-responsiveness states are not.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">How Holos loses</h4>
            <p className="leading-relaxed">
              If reported experience tracks behavioral responsiveness or raw arousal rather than
              integration (if high-integration, unresponsive states turn out to be reliably
              experience-free), the framework&apos;s core structural claim is undermined.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">The confound, and which half survives</h4>
            <p className="leading-relaxed">
              Reports require memory, and the states this test targets are precisely those where
              memory is least reliable. A report of nothing is therefore ambiguous between{" "}
              <em>no experience occurred</em> and <em>experience occurred and was not encoded</em>.
              The evidence delivers unremembered; the prediction needs unexperienced. This confound
              is not currently controlled, and it weakens one direction of the test: absent reports
              from low-integration states cannot by themselves confirm absent experience.
            </p>
            <p className="leading-relaxed">
              The other direction is unaffected and carries the weight. Where integration is high
              and behavior is absent, subjects report rich experience: ketamine states, REM
              dreaming, complex seizures. Those are positive reports, not inferences from silence,
              and they are exactly the cases where the behavioral assumption fails and the
              integration account succeeds. Holos rests Test A on this direction, and treats the
              memory-confounded direction as suggestive pending a design that calibrates report
              failure against states with known encoding.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>What this can and cannot show:</strong> this tests a necessary structural
            condition, not presence itself. It cannot prove an integrated system <em>is</em> an
            observer, only whether integration is what experience depends on. Holos shares this
            prediction with other integration-based accounts of consciousness; it is a test Holos
            could fail, not a signature unique to Holos. It also doubles as the calibration
            engine for the framework&apos;s open problems: the same data that test the claim
            locate the threshold and cull the candidate measures (see{" "}
            <a href="/logic#path-to-threshold" className="underline hover:no-underline">
              A path to the threshold
            </a>
            ).
          </p>
        </div>
      </section>

      {/* Experiment 2 */}
      <section id="experiment-2" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Test B: Observer-relative facts
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            This test lives in quantum foundations, not in the theory of mind, and honesty
            requires stating its limit up front: the outcome it anticipates is also the outcome
            textbook quantum mechanics anticipates. That incompatible measurement contexts cannot
            in general be stitched into one observer-independent account is a theorem of the
            formalism, not a novelty of Holos. What experiments in this family probe is the family
            of interpretations Holos belongs to (branching, relational, no absolute observed
            events), not Holos alone. The framework&apos;s distinctive content, which structures
            are present as experience, is ontological rather than experimental, and no outcome
            below can single it out.
          </p>

          <p className="leading-relaxed">
            Extended{" "}
            <a
              href="https://en.wikipedia.org/wiki/Wigner%27s_friend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wigner&apos;s-friend
            </a>{" "}
            experiments already pursue exactly this question. The 2020 <em>Local Friendliness</em>{" "}
            no-go theorem and its photonic tests show that if an in-lab observation counts as a
            genuine fact, then absoluteness of observed events, locality, and freedom of choice
            cannot all hold together. Holos gives up the absoluteness of observed events: registered
            facts are observer-relative, while structural facts and consistency remain intact.
          </p>

          <p className="leading-relaxed">
            One caveat follows from Holos&apos;s own threshold: the &quot;friends&quot; in current
            photonic tests are far below <MathInline>{"\\Phi_c"}</MathInline> and register
            nothing, so these experiments constrain the logical structure of observed events, not
            registration itself. Holos predicts that repeating them with genuine observers would
            change nothing physical, a prediction formalized as the standing bet below.
          </p>

          <p className="leading-relaxed">
            The experiment below is a laboratory analog: it probes whether different stable
            partitions of the same physical system can yield distinct, internally consistent outcome
            structures that cannot all be maintained as simultaneously single-valued facts.
          </p>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Objective</h4>
            <p className="leading-relaxed">
              Test whether observer cuts function as ontologically constitutive partitions rather
              than merely epistemic descriptions of a single observer-independent state.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">System</h4>
            <p className="leading-relaxed">
              A controlled{" "}
              <a
                href="https://en.wikipedia.org/wiki/Superconducting_quantum_computing"
                target="_blank"
                rel="noopener noreferrer"
              >
                superconducting qubit
              </a>{" "}
              array (for example, 8–20 qubits) evolved under a known Hamiltonian with tunable
              decoherence and noise.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Observer Cuts</h4>
            <ul className="flex flex-col gap-2 pl-6 list-disc">
              <li className="leading-relaxed">
                <strong>Local:</strong> individual qubit readouts.
              </li>
              <li className="leading-relaxed">
                <strong>Regional:</strong> block-level collective observables.
              </li>
              <li className="leading-relaxed">
                <strong>Global:</strong> a small set of global observables.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Holos Prediction</h4>
            <ul className="flex flex-col gap-2 pl-6 list-disc">
              <li className="leading-relaxed">
                Each cut yields stable outcome statistics when repeated.
              </li>
              <li className="leading-relaxed">
                The outcome structures are not jointly maintainable as a single,
                observer-independent account without importing additional records or structure.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">How Holos loses</h4>
            <p className="leading-relaxed">
              If all observer cuts reduce cleanly to a single underlying, observer-independent
              description without tension, or if extended Wigner&apos;s-friend tests decisively
              restore the absoluteness of observed events, Commitment 3 is undermined.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>What this can and cannot show:</strong> tests Commitment 3 (facts are relational
            but consistent). This is a physical test with real failure conditions, but Holos shares
            its relational prediction with{" "}
            <a
              href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Relational Quantum Mechanics
            </a>
            ; a positive result supports the family, not Holos alone.
          </p>
        </div>

        {/* Relation to the Quantum Eraser */}
        <div className="flex flex-col gap-4 bg-black/5 p-4 rounded-md">
          <h4 className="font-semibold text-black/90">Relation to the Quantum Eraser</h4>

          <p className="leading-relaxed text-black/80">
            This experiment is conceptually related to the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Quantum_eraser_experiment"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Quantum Eraser
            </a>
            , which shows that what counts as an observable fact depends on how information is
            registered. Unitary evolution is preserved in both cases.
          </p>

          <p className="leading-relaxed text-black/80">
            The difference is scope. Quantum erasers toggle between mutually exclusive readouts.
            Here, the question is whether multiple <em>stable observer cuts</em> can each support
            internally consistent facts that cannot all be maintained as a single
            observer-independent account.
          </p>

          <p className="leading-relaxed">
            This is not about erasing the past or recovering hidden information. It tests whether
            observer partitions are merely descriptive or ontologically constitutive.
          </p>
        </div>
      </section>

      {/* The standing bet */}
      <section id="standing-bet" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          The standing bet: consciousness changes nothing
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            The commitment that observation is dynamically inert is not a retreat from
            testability. Stated as a bet, it is the most falsifiable sentence in the framework. A
            conscious observer and a photon produce identical physics: put an integrated system in
            the measuring role in place of a particle, and Holos predicts no deviation whatsoever.
            Superpositions decohere for thermodynamic reasons, never because someone was home.
          </p>

          <p className="leading-relaxed">
            <strong>How Holos loses:</strong> if any experiment ever finds a consciousness-linked
            deviation from unitary quantum mechanics (a superposition that degrades when an
            integrated observer registers it, beyond what ordinary decoherence accounts for), the
            framework is falsified outright. Observation would be a force after all, and every
            page of Holos denies that it is one.
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            Many observer-centered frameworks quietly hope consciousness does something physical.
            Holos formally bets that it does not, and stakes itself on the bet. A century of
            placing ever-larger systems into superposition has found no such deviation; Holos
            treats that record not as an embarrassment to explain away, but as its own prediction,
            confirmed so far.
          </p>
        </div>
      </section>

      {/* A note on the integration correlates */}
      <section id="experiment-3" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          A note on the integration correlates
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Earlier versions of this page proposed two further experiments as confirmations: a sharp
            integration drop under anesthesia, and cultured neural networks snapping into coherence
            as connectivity grows. Both are retired here as tests, and it is worth being explicit
            about why: the reasoning is a useful guard against self-deception.
          </p>

          <p className="leading-relaxed">
            A sharp transition at loss of consciousness is predicted by ordinary physicalist models
            too (bifurcations, ignition, up/down states), so observing one confirms nothing
            specific to Holos. And a cultured network almost <em>always</em> shows some nonlinear
            transition (synchronization, criticality, and avalanches are routine dish behavior), so an
            experiment that counts any such transition as success cannot fail, and an experiment
            that cannot fail proves nothing when it passes.
          </p>

          <p className="leading-relaxed">
            These remain useful only as <strong>correlate probes</strong> feeding Test A, and only
            under two conditions: the integration measure and the threshold value are fixed in
            advance, and there is a stated way to lose: the observed transition tracks a
            non-integration variable (arousal, metabolic rate, raw activity) rather than integration.
            Without a pre-committed measure and a real failure condition, a transition &quot;somewhere&quot;
            is not evidence; it is decoration.
          </p>
        </div>
      </section>

      {/* 4) Speculation */}
      <section id="speculation" className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-light">
          Speculation
          <FootnoteLink
            number={predictionsCitationMap["speculation"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          <p className="leading-relaxed">
            What follows are not predictions. They’re “what if” designs that <em>could</em> emerge
            if the Holos framework is correct.
          </p>

          <p className="leading-relaxed">
            We know the familiar hard constraints: finite signal speed, noise, and thermodynamics.
            At vast scales, coherence punishes bright sprawl. Integration favors compactness,
            locality, and long-horizon stability.
          </p>

          {/* Holosian Scale */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">The Holosian Scale</h3>

            <p className="leading-relaxed">
              The{" "}
              <a
                href="https://en.wikipedia.org/wiki/Kardashev_scale"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kardashev Scale
              </a>{" "}
              ranks civilizations by energy use. The Holosian scale ranks civilizations by
              integration. The stages below are a map of what “advancement” looks like if coherence,
              not throughput, is the main objective.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H0: Fragmented</h4>
                <p className="leading-relaxed">
                  High capability, low coordination. Internal conflict, waste, and short-horizon
                  incentives dominate. Visibility is high because broadcasting is cheap and
                  unmanaged.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H1: Planetary Integration</h4>
                <p className="leading-relaxed">
                  The civilization becomes coherent at the scale of a world. It can coordinate,
                  self-correct, and sustain long-term projects without collapsing into factional
                  drift.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H2: System Coherence</h4>
                <p className="leading-relaxed">
                  Coherence survives light-lag across a star system. The civilization functions as
                  one asynchronous system and shifts from constant broadcast to rare, directed
                  signaling.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H3: Post-Expansion</h4>
                <p className="leading-relaxed">
                  Physical sprawl stops being the default. Exploration becomes informational first,
                  physical only when inference fails. The outward footprint shrinks even as
                  capability grows.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H4: Deep Integration</h4>
                <p className="leading-relaxed">
                  The civilization operates like a single high-coherence system with minimal waste
                  and minimal leakage. External visibility collapses. What remains detectable is
                  gravitational and thermal: the waste heat no optimization can eliminate.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H5: Asymptotic Closure</h4>
                <p className="leading-relaxed">
                  This is not a destination or a goal. It is a limit concept: what complete,
                  contradiction-free closure would look like if integration continues to deepen
                  without breaking coherence.
                </p>
              </div>
            </div>

            <p className="leading-relaxed text-black/70 text-sm">
              This scale is intentionally “quiet.” If it is even partly right, the most advanced
              civilizations get harder to see in light, not easier, though thermodynamics
              guarantees they never become invisible in heat.
            </p>
          </div>

          {/* 1) Visibility Collapse */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Visibility Collapse</h3>

            <p className="leading-relaxed">
              A civilization can get more capable while becoming less visible. If its optimization
              target shifts from outward projection to internal coherence, it will compress,
              encrypt, and minimize waste. Broadcast is an early-stage habit, not a mature strategy.
            </p>
            <p className="leading-relaxed">
              On the Holosian Scale, this is the natural signature of H3–H4: rising capability with
              increasingly optimized and less obvious radiative signatures.
            </p>
            <p className="leading-relaxed">
              One caveat is non-negotiable: visibility collapse applies to light, not heat. A
              civilization can compress, encrypt, and minimize, but anything that computes must
              shed waste heat, and the total cannot be canceled. Mature systems become silent, not
              cold.
            </p>
          </div>

          {/* 2) Observational Regime */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Observational Regime</h3>

            <p className="leading-relaxed">
              If a civilization is H4-level integrated, the most likely remaining footprint isn't
              radio or lasers. It's gravity and heat. Holos uses <strong>Dark Node</strong> as a
              phenomenological label for what these systems look like from the outside: compact,
              ordered mass structures that minimize obvious emissions while still exporting waste
              heat, and staying gravitationally coupled to the universe.
            </p>

            <p className="leading-relaxed">
              In this regime, you would look for persistent compactness, non-random organization,
              and mass concentrations that are dark in visible light but carry a faint infrared
              excess, detectable through{" "}
              <a
                href="https://en.wikipedia.org/wiki/Gravitational_lensing"
                target="_blank"
                rel="noopener noreferrer"
              >
                gravitational lensing
              </a>
              , precision mass mapping, and waste-heat surveys rather than radio searches.
              Infrared searches for exactly this signature already exist; the honest search
              channel is warmth plus weight, not messages.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              A Dark Node is <em>not</em> dark matter in the cosmologist&apos;s sense: cosmological
              dark matter predates stars, chemistry, and any possible builder, and shows no
              internal organization in cluster collisions. Nodes are ordinary matter that has
              stopped shining. Holos does not claim any known anomaly is a node, only that if
              long-term integration leaves a footprint, it is gravitational and thermal, and this
              is where it would show up.
            </p>
          </div>

          {/* 3) Structures */}
          <div id="technology" className="flex flex-col gap-6 pt-4">
            <h2 className="text-2xl sm:text-3xl font-light">Technology</h2>

            <h3 id="mesostructures" className="text-xl font-semibold text-black/90">Mesostructures</h3>
            <p className="leading-relaxed pb-4">
              The structures below are H3–H4 design patterns: compact enough to stay coherent under
              light-lag and thermodynamics, and consequential enough to matter without bright
              sprawl. They span energy generation, active coherence and computation, and long-term
              continuity.
            </p>

            {/* 1) Holocore */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Holocore</h4>

              <p className="leading-relaxed">
                A compact, gravitationally stabilized energy mesostructure designed to supply
                massive, long-horizon power while exporting waste heat in thermodynamically disciplined ways.
              </p>

              <p className="leading-relaxed">
                Not a star-enclosing megastructure. Not bright sprawl. The Holocore concentrates
                energy density rather than surface area, converting mass into stable, controlled
                output through tightly regulated accretion, fusion, or rotational extraction.
              </p>

              <h5 className="font-semibold text-black/90">Purpose</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  Provide sustained energy for deep-time computation and preservation
                </li>
                <li className="leading-relaxed">
                  Power large-scale modeling, shielding, and entropy management systems
                </li>
                <li className="leading-relaxed">
                  Support compact civilizational infrastructure without outward expansion
                </li>
                <li className="leading-relaxed">
                  Maintain stability across millennia with minimal maintenance overhead
                </li>
              </ul>

              <h5 className="font-semibold text-black/90">Design Characteristics</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">Extreme energy density per unit volume</li>
                <li className="leading-relaxed">Controlled accretion or fusion feed systems</li>
                <li className="leading-relaxed">
                  Waste heat shaped, delayed, and diluted, but never eliminated. The total thermal
                  output is set by physics, not engineering
                </li>
                <li className="leading-relaxed">
                  Gravitationally compact and dark in visible light, with an irreducible infrared
                  signature
                </li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                The Holocore is infrastructure, not spectacle. If H4 integration suppresses bright
                sprawl, the energy backbone must be dense, quiet, and long-lived.
              </p>
            </div>

            {/* 2) Computronium Kernel */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Computronium Kernel</h4>

              <p className="leading-relaxed">
                A maximally compact computational core built from computronium and optimized for
                coherent, long-horizon modeling rather than raw throughput.
              </p>

              <p className="leading-relaxed">
                This is not a data center. It is the civilization’s thinking heart: where a unified
                world-model is maintained across centuries to millennia.
              </p>

              <h5 className="font-semibold text-black/90">Purpose</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  Maintaining a single, stable world-model across long horizons
                </li>
                <li className="leading-relaxed">
                  Long-range planning (stellar evolution, climate, existential risk)
                </li>
                <li className="leading-relaxed">
                  Decision validation and prevention of value/goal drift
                </li>
                <li className="leading-relaxed">Cross-generational model consistency</li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Note:</strong> The Kernel may <em>present</em> as a Dark Node if
                coherence optimization suppresses radiative visibility. Node describes appearance,
                not purpose.
              </p>
            </div>

            {/* 3) Chrono Vault */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Chrono Vault</h4>

              <p className="leading-relaxed">
                A time-optimized preservation structure designed to store civilizational identity,
                not merely information.
              </p>

              <p className="leading-relaxed">
                Not a library. Not a backup. A continuity anchor: “If we wake up in 100,000 years,
                how do we know who we are?”
              </p>

              <h5 className="font-semibold text-black/90">Purpose</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  Preserving value systems and canonical constraints
                </li>
                <li className="leading-relaxed">
                  Storing decision histories and their justifications
                </li>
                <li className="leading-relaxed">
                  Rebooting culture after dormancy, collapse, or fragmentation
                </li>
                <li className="leading-relaxed">
                  Anchoring identity against drift across deep time
                </li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Distinct from the Kernel:</strong> the Kernel thinks (active coherence). The
                Chrono Vault remembers (passive persistence).
              </p>

              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Note:</strong> The Vault may also <em>present</em> as a Dark Node if
                its stability strategy drives it to become cold, compact, and electromagnetically
                quiet.
              </p>
            </div>
          </div>

          {/* 4) Exploration + Communication */}
          <div id="exploration-and-communication" className="flex flex-col gap-6">
            <h3 id="communication" className="text-xl font-semibold text-black/90">Communication</h3>

            <p className="leading-relaxed">
              Under known physics, there is no scalable form of real-time interstellar dialogue.
              Communication converges toward transmitting large, self-contained informational
              payloads at light speed using extreme optical collimation.
            </p>

            <p className="leading-relaxed">
              At these distances, collaboration is necessarily asynchronous. Civilizations may
              contribute to shared problem spaces by exchanging durable models, partial solutions,
              and validated results that remain meaningful even when received centuries or millennia
              out of causal sync. Progress does not depend on shared present time.
            </p>

            <div className="flex flex-col gap-2">
              <h5 className="font-semibold text-black/90">Phase-Coherent Beam Transmission</h5>

              <p className="leading-relaxed">
                Communication occurs via long-duration, phase-coherent optical channels that
                transmit compressed, self-describing informational payloads between known or
                inferred endpoints.
              </p>

              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  <strong>Purpose:</strong> transfer interpretable physical, predictive, and
                  explanatory models across interstellar or intergalactic distances, from small
                  updates to entire civilizational knowledge bases.
                </li>
                <li className="leading-relaxed">
                  <strong>How it works:</strong> diffraction-limited optical beams, extreme
                  collimation, long integration times, and heavy forward error correction referenced
                  to invariant physical structures.
                </li>
                <li className="leading-relaxed">
                  <strong>Payload:</strong> layered encodings beginning with mathematics and
                  physical constants, followed by reference frames, compression schemes, and
                  predictive models sufficient to interpret all subsequent data.
                </li>
                <li className="leading-relaxed">
                  <strong>Why it dominates:</strong> photons provide maximum speed, minimal latency,
                  and arbitrarily large total information transfer given sufficient energy and time.
                </li>
                <li className="leading-relaxed">
                  <strong>Visibility:</strong> unless the receiver is aligned in space, time, and
                  frequency, the transmission is effectively invisible.
                </li>
              </ul>
            </div>

            <h3 id="exploration" className="text-xl font-semibold text-black/90">Exploration</h3>

            <p className="leading-relaxed">
              At cosmic scales, most structure is mapped remotely and shared through long-horizon
              communication. Physical exploration is therefore rare, deliberate, and reserved for
              regimes where inference alone breaks down.
            </p>

            <p className="leading-relaxed">
              When physical probes are deployed, they are not explorers in the human sense. They are
              precision instruments: compact, autonomous, and built to operate alone for decades or
              longer.
            </p>

            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-black/90">Sentinel Probes</h4>

              <p className="leading-relaxed">
                Highly compact, self-contained probes designed to persist in complex environments
                while gathering high-value physical measurements that cannot be resolved remotely.
              </p>

              <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-black/90">Purpose</h5>
                <ul className="flex flex-col gap-2 pl-6 list-disc">
                  <li className="leading-relaxed">
                    Resolve observational ambiguities by direct measurement where models diverge.
                  </li>
                  <li className="leading-relaxed">
                    Characterize environments with nonlinear, emergent, or rapidly changing
                    dynamics.
                  </li>
                  <li className="leading-relaxed">
                    Test and refine predictive models used at civilizational scale.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-black/90">Technological characteristics</h5>
                <ul className="flex flex-col gap-2 pl-6 list-disc">
                  <li className="leading-relaxed">
                    Fully autonomous operation, with no expectation of real-time command or
                    intervention.
                  </li>
                  <li className="leading-relaxed">
                    Onboard computation sufficient to evaluate, prioritize, and compress
                    observations in situ.
                  </li>
                  <li className="leading-relaxed">
                    Preference for passive sensing and indirect interaction over active probing.
                  </li>
                  <li className="leading-relaxed">
                    Extreme energy efficiency enabling long dwell times with minimal thermal or
                    electromagnetic signature.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-black/90">Operational behavior</h5>
                <ul className="flex flex-col gap-2 pl-6 list-disc">
                  <li className="leading-relaxed">
                    Extended periods of quiescence punctuated by brief, targeted activity.
                  </li>
                  <li className="leading-relaxed">
                    No requirement for interaction with local systems or intelligences.
                  </li>
                  <li className="leading-relaxed">
                    Communication limited to rare, high-density transmissions rather than continuous
                    telemetry.
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed text-black/70 text-sm">
                Past H3, exploration scales through patience, not presence. Sentinel probes exist to
                watch, not to arrive.
              </p>
            </div>

            {/* 3) Gravitational-Lens Observatories */}
            <div className="flex flex-col gap-2">
              <h5 className="font-semibold text-black/90">Gravitational-Lens Observatories</h5>
              <p className="leading-relaxed">
                Observation systems that exploit natural gravitational lenses to achieve extreme
                resolution without large, radiative infrastructure.
              </p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  <strong>Purpose:</strong> deep inspection of distant systems already identified as
                  anomalous, interesting, or poorly constrained by existing models.
                </li>
                <li className="leading-relaxed">
                  <strong>How it works:</strong> instruments positioned along stellar or mass focal
                  lines integrate signals over long durations, trading time for resolution.
                </li>
                <li className="leading-relaxed">
                  <strong>Implication:</strong> exploration shifts from surveying everything to
                  interrogating specific questions the shared map cannot yet answer.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
