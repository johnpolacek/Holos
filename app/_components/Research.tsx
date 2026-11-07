import { RESEARCH_CHECKED, researchAreas, type Status } from "./research-data";

const STATUS_LABEL: Record<Status, string> = {
  underway: "underway",
  upcoming: "upcoming",
  recent: "recent result",
};

// Work underway that could change Holos, grouped by the claim it bears on.
export default function Research() {
  return (
    <div className="flex flex-col gap-4 text-black/80">
      <p className="leading-relaxed">
        Holos is written in public and revised when it is wrong. This page lists research now
        underway that could support it, test it, or force a change. Each area names the claim at
        stake. Each entry says what the work is and why it matters here.
      </p>
      <p className="text-sm text-black/50">
        Underway means running now. Upcoming means planned or proposed, not yet run. Recent result means
        published or posted in the last few years, with follow-up in progress. Checked{" "}
        <span className="tabular-nums">{RESEARCH_CHECKED}</span>.
      </p>

      {researchAreas.map((area) => (
        <section key={area.id} className="flex flex-col gap-3 pt-6">
          <h3 id={area.id} className="text-xl font-semibold pb-2 border-b border-black/20">
            {area.title}
          </h3>
          <p className="text-base leading-relaxed text-black/70">
            <span className="font-medium text-black/80">At stake.</span> {area.stake}{" "}
            {area.seeHref ? (
              <a href={area.seeHref} className="underline hover:no-underline whitespace-nowrap">
                (see {area.seeLabel})
              </a>
            ) : null}
          </p>
          <ul className="flex flex-col gap-4">
            {area.items.map((item) => (
              <li key={item.href} className="flex flex-col gap-1 text-base leading-relaxed">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <a href={item.href} className="font-medium underline hover:no-underline">
                    {item.title}
                  </a>
                  <span className="text-sm text-black/50">{item.who}</span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-black/45 tabular-nums">
                    {STATUS_LABEL[item.status]} · {item.date}
                  </span>
                </div>
                <p className="text-black/75">{item.what}</p>
                <p className="text-black/60 text-sm">
                  <span className="font-medium">Why it matters.</span> {item.why}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
