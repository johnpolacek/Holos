import { FootnoteLink } from "./citation-sections";
import MathInline from "./MathInline";

export default function Core() {
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
    </div>
  );
}
