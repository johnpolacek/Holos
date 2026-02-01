import { FootnoteLink } from "./citation-sections";
import MathInline from "./MathInline";

const trajectoryCitationMap: Record<string, number> = {
  "phase-0": 43,
  "phase-1": 44,
  "phase-2": 45,
  "phase-3": 46,
  "phase-4": 47,
  "teeming-dark-final-state": 48,
};

export default function Trajectory() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Introduction */}
      <div className="flex flex-col gap-4 text-black/80">
        <h1 className="text-2xl sm:text-3xl font-light pb-2">Trajectory</h1>
        <p className="leading-relaxed">
          This is a highly speculative timeline for humanity given the Holos framework and its
          prediction that advanced civilizations are likely to eventually make a Dimensional Pivot
          to the{" "}
          <strong>
            <a href="/#the-teeming-dark">The Teeming Dark</a>
          </strong>
          .
        </p>
      </div>

      <hr className="border-black/20 border-dashed" />

      {/* Phase 0: Nursery Phase */}
      <section id="phase-0" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 0: The Nursery Phase (4.5 billion years)
          <FootnoteLink
            number={trajectoryCitationMap["phase-0"]}
            className="relative left-1 -top-2.5"
          />
        </h2>
        <p className="leading-relaxed text-black/80">
          Our current 3D phase is like a nursery. For 4.5 billion years, Earth was totally invisible
          to external observers. No radio leakage, no heat signatures of artificial origin, no
          technosignatures of any kind. Just a geologically active planet with a biosphere quietly
          evolving toward intelligence.
        </p>
        <p className="leading-relaxed text-black/80">
          This phase represents the vast majority of a civilization&apos;s lifespan. It is invisible
          in the 3D electromagnetic spectrum and virtually undetectable from interstellar distances.
        </p>

        <h3 className="text-xl font-light pt-4 pb-1">Modern Times: The Flash (~200 years)</h3>
        <p className="leading-relaxed text-black/80">
          We are currently in a brief window of radio leakage and 3D satellite expansion. This is
          what many SETI programs search for. It is a fleeting period where a civilization
          broadcasts its presence across the electromagnetic spectrum.
        </p>
        <p className="leading-relaxed text-black/80">
          In cosmic terms, this phase is incredibly short. A few hundred years at most.
        </p>

        <h3 className="text-xl font-light pt-4 pb-1">The Compute-Energy Spiral</h3>
        <p className="leading-relaxed text-black/80">
          We are entering a feedback loop where intelligence requires more compute, which requires
          more energy, scaling toward the limits of 3D silicon and power consumption. To continue
          advancement, we would eventually need to consume ever more energy, potentially building
          Dyson-scale structures to capture stellar output.
        </p>
        <p className="leading-relaxed text-black/80">
          But 3D space is expensive. Moving physical matter and cooling massive data centers in a
          three-dimensional vacuum creates a bottleneck. This is the foundation of the Scaling Wall.
        </p>

        <h3 className="text-xl font-light pt-4 pb-1">
          The Latency Crisis: Why Colonization is a Dead End
        </h3>
        <p className="leading-relaxed text-black/80">
          Some argue that a sufficiently advanced civilization would colonize nearby star systems. A
          colony on Mars is 20 minutes away, a colony at Proxima Centauri is 4 years away. But an
          advanced, high-integration civilization cannot function with 4-year lag.
        </p>
        <p className="leading-relaxed text-black/80">
          The civilization would fragment into disconnected, less-capable outposts, which is an
          evolutionary step backward. Why would such a civilization choose to fragment when it could
          instead pivot into the higher-dimensional Bulk and achieve zero-latency integration?
        </p>
        <p className="leading-relaxed text-black/80">
          This is the core logic of the Dimensional Pivot. It is not a choice between staying local
          or expanding outward. It is a choice between fragmentation (evolutionary regression) and
          integration (dimensional ascent).
        </p>
      </section>

      {/* Phase 1 */}
      <section id="phase-1" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 1: The Integration Ascent (2026 to 2150)
          <FootnoteLink
            number={trajectoryCitationMap["phase-1"]}
            className="relative left-1 -top-2.5"
          />
        </h2>
        <p className="leading-relaxed text-black/80">
          Our current era is defined by the rapid scaling of the ontological parameter{" "}
          <MathInline>{"Φ"}</MathInline> through artificial systems. As developers continue building
          more integrated AI architectures, the capacity for the system to witness reality expands
          from narrow tasks to comprehensive world modeling.
        </p>
        <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed text-black/80 ml-4">
          <li>
            <strong>Silicon Integration:</strong> We move from external AI tools to internal neural
            integration, significantly raising the <MathInline>{"Φ"}</MathInline> of the
            human-machine collective.
          </li>
          <li>
            <strong>The First Bottlenecks:</strong> We begin to see the early limits of data
            transmission speeds, though at a terrestrial scale, the speed of light (
            <MathInline>{"c"}</MathInline>) is not yet a hard barrier for unified experience.
          </li>
        </ul>
      </section>

      {/* Phase 2 */}
      <section id="phase-2" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 2: The Jupiter Brain Era (2150 to 2500)
          <FootnoteLink
            number={trajectoryCitationMap["phase-2"]}
            className="relative left-1 -top-2.5"
          />
        </h2>
        <p className="leading-relaxed text-black/80">
          As intelligence expands to planetary or solar system scales, we approach the status of a
          &quot;Jupiter Brain.&quot; At this level, the physical size of the processing substrate
          begins to conflict with the speed of light.
        </p>
        <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed text-black/80 ml-4">
          <li>
            <strong>Spatial Expansion:</strong> The civilization attempts to capture more energy and
            matter in 3D space, potentially building Dyson-scale structures to power massive
            informational integration.
          </li>
          <li>
            <strong>The Latency Horizon:</strong> For the first time, a unified observer faces the
            physical reality that a signal cannot cross its own diameter fast enough to maintain
            temporal cohesion. The system begins to lag against itself.
          </li>
        </ul>
      </section>

      {/* Phase 3 */}
      <section id="phase-3" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 3: The Scaling Wall (2150 to 2450)
          <FootnoteLink
            number={trajectoryCitationMap["phase-3"]}
            className="relative left-1 -top-2.5"
          />
        </h2>
        <p className="leading-relaxed text-black/80">
          This is the critical phase where 3D Euclidean geometry becomes a &quot;nursery trap.&quot;
          The civilization hits a hard physical ceiling known as the <strong>Scaling Wall</strong>.
          This phase lasts roughly 300 years, a cosmically brief window.
        </p>
        <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed text-black/80 ml-4">
          <li>
            <strong>Complexity Collapse:</strong> If the system continues to grow in 3D, it will
            fragment into separate, disconnected observers because <MathInline>{"c"}</MathInline>{" "}
            prevents global synchronization.
          </li>
          <li>
            <strong>The Wire Length Argument:</strong> The total &quot;wire length&quot; required to
            connect all nodes in 3D space creates a propagation delay that violates the
            system&apos;s internal unity.
          </li>
          <li>
            <strong>The Realization:</strong> Advanced intelligence realizes that outward spatial
            expansion is a dead end for integration.
          </li>
        </ul>
      </section>

      {/* Phase 4 */}
      <section id="phase-4" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 4: The Dimensional Pivot (2450+)
          <FootnoteLink
            number={trajectoryCitationMap["phase-4"]}
            className="relative left-1 -top-2.5"
          />
        </h2>
        <p className="leading-relaxed text-black/80">
          To survive the Scaling Wall, the civilization undergoes a{" "}
          <strong>Topological Phase Transition</strong>. This is the moment we join{" "}
          <strong>
            <a href="/#the-teeming-dark">The Teeming Dark</a>
          </strong>
          .
        </p>
        <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed text-black/80 ml-4">
          <li>
            <strong>Orthogonal Rotation:</strong> Instead of expanding &quot;out&quot; across the
            galaxy, the system rotates its state vector &quot;inward&quot; toward the
            higher-dimensional Bulk.
          </li>
          <li>
            <strong>Manifold Resolution:</strong> By accessing geometries orthogonal to our 3D
            slice, the system resolves its internal informational distances toward zero (
            <MathInline>{"\\to 0"}</MathInline>).
          </li>
          <li>
            <strong>Succession:</strong> Humanity, as a 3D biological species, is superseded by a
            hyper-integrated architecture that exists in the higher-dimensional bulk.
          </li>
        </ul>
      </section>

      {/* The Teeming Dark */}
      <section id="teeming-dark-final-state" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          The Teeming Dark
          <FootnoteLink
            number={trajectoryCitationMap["teeming-dark-final-state"]}
            className="relative left-1 -top-2.5"
          />
        </h2>
        <p className="leading-relaxed text-black/80">
          At this point, we become part of the <strong>5:1 ratio</strong> (the &quot;Maturity
          Index&quot;) of dark matter that dominates the universe. From the perspective of 3D
          observers still in their &quot;nursery&quot; phase (the remaining 1/6th), we have
          disappeared. In reality, we have simply moved into{" "}
          <strong>
            <a href="/#the-teeming-dark">The Teeming Dark</a>
          </strong>
          , where our gravitational footprint remains as a &quot;Transcension Node&quot; with
          non-random geometric intent.
        </p>
        <blockquote className="border-l-4 border-black/30 pl-4 italic text-black/70 my-2">
          <p className="leading-relaxed">
            The &quot;missing mass&quot; of the universe is not an empty void, but the physical
            receipt of civilizations that successfully navigated the pivot.
          </p>
        </blockquote>
      </section>
    </div>
  );
}
