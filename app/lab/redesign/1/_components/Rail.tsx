"use client";

// The Monograph's navigation. On desktop, a left rail whose ruler is both the table of contents
// and the progress bar: one major tick per section, and an ink needle that travels down the
// scale as you read. On phones, a slim bar with a hairline progress rule and a Contents sheet.

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { logicSubsections, theorySubsections } from "@/lib/navigation";
import { gsap, prefersReducedMotion, ScrollTrigger, skipIntro } from "../../_shared/motion";
import { roman } from "./base";
import Emblem from "./Emblem";
import { scrollToId } from "./scroll";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Item = { id: string; title: string };

export default function Rail({ base }: { base: string }) {
  const pathname = usePathname();
  const isLogic = pathname.startsWith(`${base}/logic`);
  const items: Item[] = isLogic ? logicSubsections : theorySubsections;
  const pages = [
    { href: base, label: "Overview", current: !isLogic },
    { href: `${base}/logic`, label: "Logic", current: isLogic },
    { href: "/predictions", label: "Predictions", current: false },
    { href: "/citations", label: "Citations", current: false },
    { href: "/revisions", label: "Revisions", current: false },
  ];

  const railRef = useRef<HTMLElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const nowRef = useRef<HTMLSpanElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetTl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const firstRun = useRef(true);

  // Rail intro on first load; on a page change, only the new list of sections enters.
  useIsoLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const ctx = gsap.context(() => {
      const listItems = rail.querySelectorAll(".r1-toc li");
      if (skipIntro()) {
        gsap.set(rail.querySelectorAll("[data-intro]"), { autoAlpha: 1 });
        return;
      }
      if (!firstRun.current) {
        gsap.fromTo(
          listItems,
          { autoAlpha: 0, x: -6 },
          { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.035 }
        );
        return;
      }
      const tl = gsap.timeline({ delay: 0.15, defaults: { overwrite: "auto" } });
      tl.fromTo(
        rail.querySelector(".r1-mark"),
        { autoAlpha: 0, y: -6 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          rail.querySelector(".r1-scale"),
          { autoAlpha: 1, clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut" },
          0.1
        )
        .fromTo(
          listItems,
          { autoAlpha: 0, x: -8 },
          { autoAlpha: 1, x: 0, duration: 0.55, ease: "power2.out", stagger: 0.05 },
          0.35
        )
        .fromTo(
          rail.querySelectorAll(".r1-pages [data-intro]"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, ease: "power1.out", stagger: 0.04 },
          0.9
        )
        .fromTo(
          needleRef.current,
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" },
          1.2
        )
        .set(rail.querySelector(".r1-scale"), { clearProps: "clipPath" });
    }, rail);
    firstRun.current = false;
    return () => ctx.revert();
  }, [isLogic]);

  // The needle and the active section follow the reading line, a third of the way down.
  useIsoLayoutEffect(() => {
    const ruler = rulerRef.current;
    const needle = needleRef.current;
    if (!ruler || !needle) return;
    const lis = Array.from(ruler.querySelectorAll<HTMLLIElement>(".r1-toc li"));
    const reduced = prefersReducedMotion();
    const moveY = gsap.quickTo(needle, "y", { duration: reduced ? 0 : 0.45, ease: "power3.out" });
    let last = -2;

    const update = () => {
      const sections = items.map((s) => document.getElementById(s.id));
      const line = window.scrollY + window.innerHeight * 0.32;
      const tops = sections.map((el) => (el ? el.getBoundingClientRect().top + window.scrollY : 0));
      const ticks = lis.map((li) => li.offsetTop + li.offsetHeight / 2);
      const doc = document.documentElement.scrollHeight;
      const end = ruler.clientHeight;
      let i = -1;
      tops.forEach((t, k) => {
        if (sections[k] && t <= line) i = k;
      });
      let y: number;
      if (i < 0) {
        const f = gsap.utils.clamp(0, 1, line / Math.max(1, tops[0]));
        y = f * (ticks[0] ?? 0) * 0.9;
      } else {
        const nextTop = i + 1 < tops.length ? tops[i + 1] : doc;
        const nextY = i + 1 < ticks.length ? ticks[i + 1] : end;
        const f = gsap.utils.clamp(0, 1, (line - tops[i]) / Math.max(1, nextTop - tops[i]));
        y = ticks[i] + f * (nextY - ticks[i]);
      }
      moveY(y);
      if (i !== last) {
        last = i;
        lis.forEach((li, k) => {
          li.toggleAttribute("data-active", k === i);
        });
        if (nowRef.current) {
          nowRef.current.textContent = i >= 0 ? `§ ${roman(i + 1)}  ${items[i].title}` : "";
        }
      }
      const max = doc - window.innerHeight;
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: max > 0 ? window.scrollY / max : 0 });
      }
    };

    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    update();
    return () => {
      st.kill();
      ro.disconnect();
    };
  }, [items]);

  // Contents sheet (phones): a clip-path wipe from the top, then its entries rise in.
  useIsoLayoutEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const ctx = gsap.context(() => {
      gsap.set(sheet, { visibility: "hidden", clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(sheet.querySelectorAll("[data-sheet-item]"), { autoAlpha: 0, y: 14 });
    }, sheet);
    return () => ctx.revert();
  }, []);

  const setSheet = useCallback((next: boolean, then?: () => void) => {
    const sheet = sheetRef.current;
    const main = document.getElementById("r1-main");
    if (!sheet) return;
    const entries = sheet.querySelectorAll("[data-sheet-item]");
    const reduced = prefersReducedMotion();
    sheetTl.current?.kill();
    setOpen(next);
    if (main) main.inert = next;
    if (barRef.current) barRef.current.inert = next;
    const tl = gsap.timeline();
    sheetTl.current = tl;
    if (next) {
      tl.set(sheet, { visibility: "visible" });
      if (reduced)
        tl.set(sheet, { clipPath: "inset(0% 0% 0% 0%)" }).set(entries, { autoAlpha: 1, y: 0 });
      else
        tl.to(sheet, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" }).to(
          entries,
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.035 },
          "-=0.25"
        );
      tl.call(() => sheet.querySelector<HTMLElement>("[data-sheet-focus]")?.focus());
    } else {
      toggleRef.current?.focus();
      if (reduced) tl.set(entries, { autoAlpha: 0, y: 14 });
      else
        tl.to(entries, {
          autoAlpha: 0,
          y: -8,
          duration: 0.2,
          ease: "power2.in",
          stagger: { each: 0.015, from: "end" },
        }).to(sheet, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.45, ease: "power3.inOut" });
      tl.set(sheet, { visibility: "hidden" }).call(() => then?.());
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setSheet]);

  // Close the sheet if the page changes underneath it.
  useEffect(() => {
    if (!pathname) return;
    const main = document.getElementById("r1-main");
    if (main) main.inert = false;
    if (barRef.current) barRef.current.inert = false;
  }, [pathname]);

  const jump = (id: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (open) setSheet(false, () => scrollToId(id));
    else scrollToId(id);
  };

  return (
    <>
      <aside ref={railRef} className="r1-rail">
        <a className="r1-mark" href={base} data-intro>
          <Emblem className="r1-mark-emblem" />
          <span>Holos</span>
        </a>
        <nav className="r1-ruler" aria-label="Sections on this page" ref={rulerRef}>
          <div className="r1-scale" aria-hidden="true" data-intro />
          <div className="r1-needle" ref={needleRef} aria-hidden="true" data-intro>
            <svg viewBox="0 0 40 12" width="40" height="12" aria-hidden="true">
              <line x1="0" y1="6" x2="30" y2="6" />
              <path d="M30 2 L39 6 L30 10 Z" />
            </svg>
          </div>
          <ol className="r1-toc">
            {items.map((s, i) => (
              <li key={s.id} data-intro>
                <a href={`#${s.id}`} onClick={jump(s.id)}>
                  <span className="r1-toc-num">{roman(i + 1)}</span>
                  <span className="r1-toc-title">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <nav className="r1-pages" aria-label="Pages">
          <ul>
            {pages.map((p) => (
              <li key={p.label} data-intro>
                <a href={p.href} aria-current={p.current ? "page" : undefined}>
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="r1-dl" href="/holos.pdf" download data-intro>
            Download <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </aside>

      <header ref={barRef} className="r1-bar">
        <a className="r1-mark" href={base}>
          <Emblem className="r1-mark-emblem" />
          <span>Holos</span>
        </a>
        <span className="r1-bar-now" ref={nowRef} aria-hidden="true" />
        <button
          ref={toggleRef}
          type="button"
          className="r1-bar-toggle"
          aria-expanded={open}
          aria-controls="r1-sheet"
          onClick={() => setSheet(!open)}
        >
          Contents
          <span className="r1-bar-glyph" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        <span className="r1-bar-progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div
        id="r1-sheet"
        ref={sheetRef}
        className="r1-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Contents"
      >
        <div className="r1-sheet-head" data-sheet-item>
          <span className="r1-sheet-kicker">{isLogic ? "Logic" : "Overview"}</span>
          <button
            type="button"
            className="r1-sheet-close"
            onClick={() => setSheet(false)}
            data-sheet-focus
          >
            Close
          </button>
        </div>
        <ol className="r1-sheet-toc">
          {items.map((s, i) => (
            <li key={s.id} data-sheet-item>
              <a href={`#${s.id}`} onClick={jump(s.id)}>
                <span className="r1-toc-num">{roman(i + 1)}</span>
                <span>{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
        <ul className="r1-sheet-pages">
          {pages.map((p) => (
            <li key={p.label} data-sheet-item>
              <a href={p.href} aria-current={p.current ? "page" : undefined}>
                {p.label}
              </a>
            </li>
          ))}
          <li data-sheet-item>
            <a href="/holos.pdf" download>
              Download <span aria-hidden="true">↓</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
