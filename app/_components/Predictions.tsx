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
            or modify the equations of physics.
          </p>

          <p className="leading-relaxed">
            The sections below separate three kinds of claims. The last section includes speculative
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
              <strong>Experimentation:</strong> concrete places where Holos is vulnerable with
              specific empirical tests that could support or undermine its claims.
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
              Closure is not merely local. The existence of any experienced reality implies that
              closure is globally consistent, even if only partially realized. A reality with no
              coherent limiting form would remain ontologically open and could not support
              experience even in fragments.
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
          </div>

          {/* C3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              3. Facts are relational but consistent
            </h3>

            <p className="leading-relaxed">
              If observation is ontological registration, then facts are always indexed to observing
              systems. Holos therefore commits to the absence of absolute, observer-independent
              facts.
            </p>

            <p className="leading-relaxed">
              This does not imply contradiction. Different observers may register outcomes that are
              not mutually reducible, but the total structure of reality must remain globally
              consistent.
            </p>

            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Facts are relative to observers. Consistency is global.
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
              properties, but facts relative to observing systems.
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
              Observer-incompatible universes may exist as valid physical structures while lacking
              presence. Anthropic reasoning is therefore reframed as ontological filtering rather
              than selection.
            </p>
          </div>
        </div>
      </section>

      {/* 3) Experimentation */}
      <section id="experimentation" className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-light">
          Experimentation
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos does not propose new dynamics. Its claims are ontological. Even so, those claims
            impose constraints on what patterns of observation should and should not be found.
          </p>

          <p className="leading-relaxed">
            This section identifies experimental contexts where those constraints are exposed. The
            goal is not confirmation, but vulnerability.
          </p>
        </div>
      </section>

      {/* Experiment 1 */}
      <section id="experiment-1" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 1: Integration Thresholds and Observer Emergence
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos claims that observerhood is a threshold phenomenon. Below a critical level of
            integration, physical processing occurs without lived presence. Above it, unified
            experience is unavoidable.
          </p>

          <p className="leading-relaxed">
            This experiment tests whether transitions between conscious and unconscious states
            exhibit discrete, state-like behavior rather than smooth degradation.
          </p>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Objective</h4>
            <p className="leading-relaxed">
              Determine whether loss and recovery of conscious access correspond to a sharp
              transition in large-scale neural integration, consistent with an observer threshold{" "}
              <MathInline>{"Φ ≥ Φ_c"}</MathInline>.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Method</h4>
            <p className="leading-relaxed">
              Measure integration proxies such as the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Perturbational_Complexity_Index"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perturbational Complexity Index
              </a>{" "}
              during controlled transitions between wakefulness, anesthesia, and recovery in human
              subjects.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Holos Prediction</h4>
            <p className="leading-relaxed">
              Integration measures will exhibit a nonlinear drop near a consistent transition
              region, indicating loss of unified internal registration rather than gradual signal
              decay.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Alternative Outcome</h4>
            <p className="leading-relaxed">
              If integration decreases smoothly with no identifiable transition region, this would
              weaken the claim that observerhood is thresholded rather than continuous.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>Tests:</strong> Commitment 1 (presence depends on observers) and Commitment 2
            (observerhood is thresholded).
          </p>
        </div>
      </section>

      {/* Experiment 2 */}
      <section id="experiment-2" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 2: Observer-Cut Sensitivity in Relational Systems
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos claims that facts are instantiated through ontological registration and are
            therefore relative to observers. No observer cut is ontologically privileged.
          </p>

          <p className="leading-relaxed">
            This experiment probes whether different stable partitions of the same physical system
            can yield distinct, internally consistent outcome structures that cannot all be
            maintained as simultaneously single-valued facts.
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
            <h4 className="font-semibold text-black/90 mb-1">Alternative Outcome</h4>
            <p className="leading-relaxed">
              If all observer cuts reduce cleanly to a single underlying description without
              tension, this would weaken the claim that observer partitions are ontologically
              constitutive.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>Tests:</strong> Commitment 3 (facts are relational but consistent).
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
            What follows is bold but disciplined. These are not predictions — they’re “what if”
            designs that <em>could</em> emerge if Holos is pointing at something real.
          </p>

          <p className="leading-relaxed">
            The hard constraints are familiar: finite signal speed, noise, and thermodynamics. At
            vast scales, coherence punishes bright sprawl. Integration favors compactness, locality,
            and long-horizon stability.
          </p>

          {/* 1) Visibility Collapse */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Visibility Collapse</h3>

            <p className="leading-relaxed">
              A civilization can get more capable while becoming less visible. If its optimization
              target shifts from outward projection to internal coherence, it will compress,
              encrypt, and minimize waste. Broadcast is an early-stage habit, not a mature strategy.
            </p>
          </div>

          {/* 2) Observational Regime */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Observational Regime</h3>

            <p className="leading-relaxed">
              If “visibility collapse” is real, the most likely remaining footprint isn’t radio or
              lasers — it’s gravity. Holos uses <strong>Dark Matter Node</strong> as a
              phenomenological label for what these systems look like from the outside: compact,
              ordered mass structures that remain electromagnetically quiet while staying
              gravitationally coupled to the universe.
            </p>

            <p className="leading-relaxed">
              In this regime, you would look for persistent compactness, non-random organization,
              and mass peaks with weak or absent baryonic counterparts — detectable through{" "}
              <a
                href="https://en.wikipedia.org/wiki/Gravitational_lensing"
                target="_blank"
                rel="noopener noreferrer"
              >
                gravitational lensing
              </a>{" "}
              and precision mass mapping rather than emissions.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              Holos does not claim any known anomaly is a node. It claims only that if long-term
              integration leaves a gravitational footprint, this is the regime where it would show
              up.
            </p>
          </div>

          {/* 3) Structures */}
          <div id="technology" className="flex flex-col gap-6 pt-4">
            <h2 className="text-2xl sm:text-3xl font-light">Technology</h2>

            {/* 1) Computronium Kernel */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-black/90">Mesostructures</h3>
              <p className="leading-relaxed pb-4">
                The structures below are compact enough to remain coherent, consequential enough to
                matter cosmically, and each doing a distinct civilizational job.
              </p>

              <h4 className="text-lg font-medium text-black/90">Computronium Kernel</h4>

              <p className="leading-relaxed">
                A maximally compact computational core built from computronium and optimized for
                coherent, long-horizon modeling rather than raw throughput.
              </p>

              <p className="leading-relaxed">
                This is not a data center. It is the civilization’s thinking heart — where a unified
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
                <strong>Note:</strong> The Kernel may <em>present</em> as a Dark Matter Node if
                coherence optimization suppresses radiative visibility. Node describes appearance,
                not purpose.
              </p>
            </div>

            {/* 2) Chrono Vault */}
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
                <strong>Note:</strong> The Vault may also <em>present</em> as a Dark Matter Node if
                its stability strategy drives it to become cold, compact, and electromagnetically
                quiet.
              </p>
            </div>
          </div>

          {/* 4) Exploration + Communication */}
          <div id="exploration-and-communication" className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-black/90">Communication</h3>

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
                  explanatory models across interstellar or intergalactic distances — from small
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

            <h3 className="text-xl font-semibold text-black/90">Exploration</h3>

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
                In Holos, exploration does not scale through presence or expansion, but through
                patience. Sentinel Probes exist to watch, not to arrive.
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
