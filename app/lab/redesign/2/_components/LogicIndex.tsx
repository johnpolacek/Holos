"use client";

// Sticky index for the Logic page. A single amber bar slides to the section being read.

import { useLayoutEffect, useRef, useState } from "react";
import { logicSubsections } from "@/lib/navigation";
import { gsap, prefersReducedMotion } from "../../_shared/motion";
import useActiveSection from "./useActiveSection";

const pad = (n: number) => String(n).padStart(2, "0");

export default function LogicIndex() {
  const [ids] = useState(() => logicSubsections.map((s) => s.id));
  const active = useActiveSection(ids);
  const listRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    if (!list || !bar) return;
    const item = list.children[Math.max(active, 0)] as HTMLElement | undefined;
    if (!item) return;
    gsap.to(bar, {
      y: item.offsetTop,
      height: item.offsetHeight,
      autoAlpha: active >= 0 ? 1 : 0,
      duration: prefersReducedMotion() ? 0 : 0.55,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, [active]);

  return (
    <nav className="n-lindex" aria-label="Sections">
      <p className="n-label">Contents</p>
      <div className="n-lindex-list">
        <span ref={barRef} className="n-lindex-bar" aria-hidden="true" />
        <ol ref={listRef}>
          {logicSubsections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={i === active ? "true" : undefined}>
                <span className="n-lindex-n">{pad(i + 1)}</span>
                <span className="n-lindex-t">{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
