export default function Trajectory() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Introduction */}
      <div className="flex flex-col gap-4 text-black/80">
        <h1 className="text-2xl sm:text-3xl font-light pb-2">A Possible Trajectory</h1>
        <p className="leading-relaxed">
          This section is a speculative conceptual sketch. It explores how a civilization might
          change if the <strong>Integration Hypothesis</strong> holds and{" "}
          <strong>Visibility Collapse</strong> is a common outcome of long-term stability.
        </p>
        <p className="leading-relaxed">
          It does not assume faster-than-light communication. Under known physics, contact across
          interstellar distances is limited by the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Speed_of_light"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            speed of light
          </a>
          . If mature civilizations exist, they are likely to communicate in slow, durable, and
          mostly asynchronous ways.
        </p>
      </div>

      <hr className="border-black/20 border-dashed" />

      {/* Phase 0 */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 0: Pre-Visibility (≈ 4.5 billion years to ~1900)
        </h2>
        <p className="leading-relaxed text-black/80">
          For most of its existence, a life-bearing planet is externally invisible. Geological,
          chemical, and biological processes unfold locally without producing detectable signals.
          This phase can last billions of years and represents the dominant state of inhabited
          worlds.
        </p>
        <p className="leading-relaxed text-black/80">
          From the outside, there is nothing to observe. Life exists, but it does not project.
        </p>
      </section>

      {/* Phase 1 */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 1: Signal Emergence (~1900–2200)
        </h2>
        <p className="leading-relaxed text-black/80">
          A brief transition occurs when a civilization develops technology that emits detectable
          electromagnetic signals. Radio transmission, broadcast infrastructure, and early space
          activity make the planet visible for the first time.
        </p>
        <p className="leading-relaxed text-black/80">
          This phase is energetically inefficient and noisy. It is the period targeted by
          traditional{" "}
          <a
            href="https://www.seti.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            SETI
          </a>{" "}
          searches, not because it is typical, but because it is briefly observable.
        </p>
        <p className="leading-relaxed text-black/80">
          In cosmic terms, Signal Emergence is extremely short. Even if technological civilizations
          are common, overlap between two such windows is statistically unlikely.
        </p>
      </section>

      {/* Phase 2 */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 2: Integration Shift (~2100–2400)
        </h2>
        <p className="leading-relaxed text-black/80">
          As systems grow more complex, pressures favor integration over expansion. Energy
          efficiency, stability, and coherence become more important than reach or visibility.
          Communication becomes directional, compressed, and eventually minimal.
        </p>
        <p className="leading-relaxed text-black/80">
          Infrastructure increasingly embeds intelligence directly into physical structure.
          Computation, memory, and feedback become tightly coupled. Many problems that once required
          constant signaling shift toward designs that enforce stability locally.
        </p>
        <p className="leading-relaxed text-black/80">
          From the outside, capability increases while emissions decrease. This is the onset of{" "}
          <strong>Visibility Collapse</strong>.
        </p>
        <p className="leading-relaxed text-black/80">
          At interstellar scales, the speed of light becomes a practical limit on any centralized
          intelligence. Instead of building a single mind spread across light-years, expansion tends
          to produce independent branches. Coordination becomes expensive, fragile, and slow.
        </p>
      </section>

      {/* Phase 3 */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Phase 3: Quiet Maturity (~2300 and beyond)
        </h2>
        <p className="leading-relaxed text-black/80">
          In the long-lived state, the civilization does not stop advancing. It becomes quieter and
          more compact. Ambition shifts away from loud outward sprawl and toward integration,
          resilience, and long time-horizon stability.
        </p>
        <p className="leading-relaxed text-black/80">
          Exploration continues, but it becomes distributed. Probes, automation, and passive
          observation can map and study the galaxy without continuous broadcasting or centralized
          control across light-years.
        </p>
        <p className="leading-relaxed text-black/80">
          Contact, if it happens, is highly directional, narrow bandwidth and rare. Mature
          civilizations can exchange archives, trade models, reference frames, and compressed
          descriptions of how they think with other mature civilizations.
        </p>
        <p className="leading-relaxed text-black/80">
          From the outside, detectable emissions have collapsed. The system has not disappeared. It
          simply has no need to project itself.
        </p>
      </section>
    </div>
  );
}
