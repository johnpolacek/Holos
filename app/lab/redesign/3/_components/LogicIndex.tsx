"use client";

// The apparatus index for the Logic page: grouped and numbered, sticky on desktop with an
// ink needle on the current section, a sticky chip bar on phones. It also gives the five
// axiom headings anchors, so the axiom row above can link to each.

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../_shared/motion";

export type IndexGroup = { title: string; items: { id: string; title: string; n: number }[] };

export default function LogicIndex({ groups, total }: { groups: IndexGroup[]; total: number }) {
  const navRef = useRef<HTMLElement>(null);
  const chipsRef = useRef<HTMLOListElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(groups[0]?.items[0]?.id ?? "");
  const items = groups.flatMap((g) => g.items);
  const current = items.find((i) => i.id === active);

  // Anchors for the axioms, then honor a hash that points at one.
  useEffect(() => {
    document.querySelectorAll<HTMLHeadingElement>("#logic-axioms h3").forEach((h) => {
      const m = h.textContent?.match(/^Axiom (\d)/);
      if (m && !h.id) h.id = `axiom-${m[1]}`;
    });
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash.startsWith("axiom-")) document.getElementById(hash)?.scrollIntoView();
  }, []);

  // Which section is under the reading line. The items never change on this page.
  // biome-ignore lint/correctness/useExhaustiveDependencies: built once
  useEffect(() => {
    const triggers = items
      .map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (self) => self.isActive && setActive(id),
        });
      })
      .filter(Boolean) as ScrollTrigger[];
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      for (const tr of triggers) tr.kill();
    };
  }, []);

  // The needle glides to the current entry; the chip bar keeps it in view.
  useEffect(() => {
    const nav = navRef.current;
    const needle = needleRef.current;
    const reduced = prefersReducedMotion();
    if (nav && needle) {
      const a = nav.querySelector<HTMLElement>(`a[href="#${active}"]`);
      if (a) {
        const top = a.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop;
        gsap.to(needle, {
          y: top,
          height: a.offsetHeight,
          duration: reduced ? 0 : 0.6,
          ease: "power3.inOut",
        });
      }
    }
    const chips = chipsRef.current;
    const chip = chips?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (chips && chip && chips.offsetParent) {
      chips.scrollTo({
        left: chip.offsetLeft - 16,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  }, [active]);

  return (
    <>
      <nav ref={navRef} className="r3-index" aria-label="Logic sections" data-intro data-index>
        <span ref={needleRef} className="r3-index-needle" aria-hidden="true" />
        {groups.map((g) => (
          <div key={g.title} className="r3-index-group">
            <span className="r3-index-gt">{g.title}</span>
            <ol>
              {g.items.map((it) => (
                <li key={it.id}>
                  <a href={`#${it.id}`} aria-current={it.id === active ? "location" : undefined}>
                    <span>{String(it.n).padStart(2, "0")}</span>
                    {it.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
        <p className="r3-index-progress" aria-hidden="true">
          <span>§ {String(current?.n ?? 1).padStart(2, "0")}</span>
          <span>of {String(total).padStart(2, "0")}</span>
        </p>
      </nav>
      <nav className="r3-chips" aria-label="Logic sections">
        <ol ref={chipsRef}>
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={it.id === active ? "location" : undefined}>
                <span>{String(it.n).padStart(2, "0")}</span>
                {it.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
