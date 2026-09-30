"use client";

// The specification's index: numbered sections, each with its reading time and a signal
// rule that fills as the section is read; the section under the middle of the viewport is
// current. On narrow screens it becomes a sticky bar that keeps the current section in view.

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../_shared/motion";

type Item = { id: string; title: string };

const pad = (n: number) => String(n).padStart(2, "0");

export default function LogicIndex({ items }: { items: Item[] }) {
  const [minutes, setMinutes] = useState<Record<string, number>>({});
  const [active, setActive] = useState<string | null>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sections = items
      .map((it, i) => {
        const el = document.getElementById(it.id);
        if (el) {
          // Tell the bar's chapter indicator about each section.
          el.dataset.chapter = "";
          el.dataset.num = pad(i + 1);
          el.dataset.title = it.title;
        }
        return el;
      })
      .filter((el): el is HTMLElement => !!el);
    const m: Record<string, number> = {};
    for (const el of sections) {
      const words = (el.textContent ?? "").split(/\s+/).filter(Boolean).length;
      m[el.id] = Math.max(1, Math.round(words / 230));
    }
    setMinutes(m);

    const bars = new Map<string, (v: number) => void>();
    for (const el of sections) {
      const bar = list.current?.querySelector<HTMLElement>(`[data-bar="${el.id}"]`);
      if (bar) bars.set(el.id, gsap.quickSetter(bar, "scaleX") as (v: number) => void);
    }
    let frame = 0;
    let current: string | null = null;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let now: string | null = null;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
        bars.get(el.id)?.(p);
        if (r.top <= mid && r.bottom > mid) now = el.id;
      }
      if (now !== current) {
        current = now;
        setActive(now);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // In the horizontal bar, slide the current section into view without moving the page.
  useEffect(() => {
    const ol = list.current;
    if (!ol || !active || ol.scrollWidth <= ol.clientWidth) return;
    const a = ol.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!a) return;
    const left = a.offsetLeft - (ol.clientWidth - a.offsetWidth) / 2;
    ol.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="r4-lindex" aria-label="Logic sections">
      <ol ref={list}>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>
              <span className="r4-lindex-n">L{pad(i + 1)}</span>
              <span>{it.title}</span>
              <span className="r4-lindex-m">{minutes[it.id] ? `${minutes[it.id]} min` : ""}</span>
              <span className="r4-lindex-bar" data-bar={it.id} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
      <p className="r4-lindex-foot r4-label">
        <a href="/predictions">Predictions</a> · <a href="/citations">Citations</a>
      </p>
    </nav>
  );
}
