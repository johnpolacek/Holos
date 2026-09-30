"use client";

// The fixed bar: wordmark, a live chapter indicator whose number rolls on each change, the
// page links, and a signal-colored reading progress rule. On phones the links move into a
// full-screen menu.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../_shared/motion";
import { underlineSweep } from "./hover";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Chapter = { num: string; title: string };

const LIVE = [
  { href: "/predictions", label: "Predictions" },
  { href: "/citations", label: "Citations" },
  { href: "/revisions", label: "Revisions" },
];

export default function Header({ base }: { base: string }) {
  const pathname = usePathname();
  const onLogic = pathname.startsWith(`${base}/logic`);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const roll = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Which chapter crosses the middle of the viewport. Rebuilt for each page.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname marks a new page to observe
  useEffect(() => {
    setChapter(null);
    let io: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".r4 [data-chapter]"));
      setTotal(els.length);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement;
            if (e.isIntersecting) {
              setChapter({ num: el.dataset.num ?? "", title: el.dataset.title ?? "" });
            } else if (el === els[0] && e.boundingClientRect.top > 0) {
              setChapter(null); // scrolled back above the first chapter
            }
          }
        },
        { rootMargin: "-45% 0px -54% 0px" }
      );
      for (const el of els) io.observe(el);
    });
    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [pathname]);

  // Reading progress: a scaleX rule, set once per frame at most.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname resets it for a new page
  useEffect(() => {
    const bar = progress.current;
    if (!bar) return;
    const set = gsap.quickSetter(bar, "scaleX");
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
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
  }, [pathname]);

  // The indicator rolls: the incoming label rises into place from below its mask.
  useIsoLayoutEffect(() => {
    const el = roll.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      el.children,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.55, ease: "power4.out", stagger: 0.04, overwrite: "auto" }
    );
    return () => {
      tween.kill();
    };
  }, [chapter?.num]);

  // Underline sweeps on the bar's and the footer's single-line links.
  useEffect(() => {
    const links = document.querySelectorAll<HTMLElement>(".r4 .r4-nav-link, .r4 .r4-foot-links a");
    const stops = Array.from(links, underlineSweep);
    return () => {
      for (const stop of stops) stop();
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Menu: a clip-path wipe from the top, links rising behind their masks.
  useIsoLayoutEffect(() => {
    const el = menu.current;
    if (!el) return;
    const links = el.querySelectorAll(".r4-menu-link > span");
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { visibility: "visible" });
        if (reduced) {
          gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(links, { yPercent: 0 });
        } else {
          gsap
            .timeline()
            .fromTo(
              el,
              { clipPath: "inset(0% 0% 100% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.inOut" }
            )
            .fromTo(
              links,
              { yPercent: 110 },
              { yPercent: 0, duration: 0.7, ease: "power4.out", stagger: 0.05 },
              "-=0.25"
            );
        }
        el.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
      } else if (el.style.visibility === "visible") {
        const done = () => {
          gsap.set(el, { visibility: "hidden" });
        };
        if (reduced) done();
        else
          gsap.to(el, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.45,
            ease: "power3.in",
            onComplete: done,
          });
      }
    }, el);
    el.inert = !open;
    document.documentElement.classList.toggle("r4-locked", open);
    return () => ctx.kill();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu when the route changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on route change only
  useEffect(() => {
    setOpen(false);
    return () => document.documentElement.classList.remove("r4-locked");
  }, [pathname]);

  const pages = [
    { href: base, label: "Overview", current: !onLogic },
    { href: `${base}/logic`, label: "Logic", current: onLogic },
  ];

  return (
    <>
      <header className="r4-bar">
        <Link href={base} className="r4-mark" aria-label="Holos, Overview">
          Holos<span aria-hidden="true">⊛</span>
        </Link>

        <p className="r4-now" aria-live="polite">
          {chapter ? (
            <span ref={roll} className="r4-now-roll" key={chapter.num}>
              <span className="r4-now-num">
                {onLogic ? "L" : ""}
                {chapter.num}
                <span className="r4-now-total"> / {String(total).padStart(2, "0")}</span>
              </span>
              <span className="r4-now-title">{chapter.title}</span>
            </span>
          ) : (
            <span className="r4-now-idle">{onLogic ? "Logic" : "Overview"}</span>
          )}
        </p>

        <nav className="r4-nav" aria-label="Pages">
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="r4-nav-link"
              aria-current={p.current ? "page" : undefined}
            >
              {p.label}
            </Link>
          ))}
          {LIVE.map((p) => (
            <a key={p.href} href={p.href} className="r4-nav-link">
              {p.label}
            </a>
          ))}
          <a href="/holos.pdf" download="holos.pdf" className="r4-nav-link r4-nav-pdf">
            PDF
          </a>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="r4-menu-button"
          aria-expanded={open}
          aria-controls="r4-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <span className="r4-progress" aria-hidden="true">
          <span ref={progress} />
        </span>
      </header>

      <div
        id="r4-menu"
        ref={menu}
        className="r4-menu"
        style={{ visibility: "hidden" }}
        aria-hidden={!open}
      >
        <nav aria-label="Menu">
          <ol>
            {[...pages, ...LIVE.map((p) => ({ ...p, current: false }))].map((p, i) => (
              <li key={p.href}>
                {p.href.startsWith(base) ? (
                  <Link href={p.href} className="r4-menu-link" onClick={close}>
                    <span>
                      <em>{String(i + 1).padStart(2, "0")}</em>
                      {p.label}
                    </span>
                  </Link>
                ) : (
                  <a href={p.href} className="r4-menu-link">
                    <span>
                      <em>{String(i + 1).padStart(2, "0")}</em>
                      {p.label}
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ol>
          <a href="/holos.pdf" download="holos.pdf" className="r4-menu-pdf">
            Download PDF
          </a>
        </nav>
      </div>
    </>
  );
}
