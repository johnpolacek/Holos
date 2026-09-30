"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { logicSubsections, theorySubsections } from "@/lib/navigation";
import {
  gsap,
  markRunning,
  prefersReducedMotion,
  ScrollTrigger,
  skipIntro,
} from "../../_shared/motion";
import { type MenuOverlay, magnetic, menuOverlay, underlineSweep } from "./fx";
import useActiveSection from "./useActiveSection";

const BASE = "/lab/redesign/2";
const pad = (n: number) => String(n).padStart(2, "0");

export default function Header() {
  const pathname = usePathname();
  const isLogic = pathname.startsWith(`${BASE}/logic`);
  const list = isLogic ? logicSubsections : theorySubsections;
  const [ids] = useState(() => ({
    home: theorySubsections.map((s) => s.id),
    logic: logicSubsections.map((s) => s.id),
  }));
  const active = useActiveSection(isLogic ? ids.logic : ids.home);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const rollRef = useRef<HTMLSpanElement>(null);
  const overlay = useRef<MenuOverlay | null>(null);
  const [open, setOpen] = useState(false);

  const pages = [
    { href: BASE, label: "Overview", current: !isLogic },
    { href: `${BASE}/logic`, label: "Logic", current: isLogic },
    { href: "/predictions", label: "Predictions" },
    { href: "/citations", label: "Citations" },
    { href: "/revisions", label: "Revisions" },
  ];

  // Intro, progress hairline, scrolled state, hover sweeps, magnetic download.
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const teardowns: Array<() => void> = [];
    const ctx = gsap.context(() => {
      if (!skipIntro()) {
        gsap.fromTo(
          header,
          { autoAlpha: 0, yPercent: -60 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: isLogic ? 0.15 : 1.35,
            clearProps: "transform,opacity,visibility",
          }
        );
        markRunning();
      }
      gsap.fromTo(
        header.querySelector(".n-progress span"),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "0% 50%",
          scrollTrigger: { start: 0, end: "max", scrub: prefersReducedMotion() ? true : 0.3 },
        }
      );
      ScrollTrigger.create({
        start: 40,
        end: "max",
        onToggle: (self) => {
          if (self.isActive) header.dataset.scrolled = "";
          else delete header.dataset.scrolled;
        },
      });
    }, header);
    for (const a of Array.from(header.querySelectorAll<HTMLElement>(".n-nav a")))
      teardowns.push(underlineSweep(a));
    const dl = header.querySelector<HTMLElement>(".n-dl");
    if (dl) teardowns.push(magnetic(dl, 0.25, 0.4));
    return () => {
      for (const t of teardowns) t();
      ctx.revert();
    };
  }, [isLogic]);

  // The menu overlay: rebuilt per page (its section list changes), opened and closed by state.
  // biome-ignore lint/correctness/useExhaustiveDependencies: the items to stagger change with the page
  useLayoutEffect(() => {
    const panel = menuRef.current;
    if (!panel) return;
    overlay.current = menuOverlay(panel);
    return () => {
      overlay.current?.revert();
      overlay.current = null;
    };
  }, [isLogic]);

  useEffect(() => {
    const o = overlay.current;
    const page = document.querySelectorAll<HTMLElement>(".r2 main, .r2 .n-footer");
    if (!o) return;
    if (open) {
      for (const el of Array.from(page)) el.inert = true;
      document.documentElement.style.overflow = "hidden";
      o.open().eventCallback("onComplete", () => {
        menuRef.current
          ?.querySelector<HTMLElement>("[data-menu-item] a, [data-menu-item]")
          ?.focus();
      });
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    for (const el of Array.from(page)) el.inert = false;
    document.documentElement.style.overflow = "";
    if (menuRef.current?.style.visibility === "visible") {
      burgerRef.current?.focus();
      o.close();
    }
  }, [open]);

  // Close on navigation.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when the route changes
  useEffect(() => setOpen(false), [pathname]);

  // The section indicator rolls when the section changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: animate on each change of section
  useLayoutEffect(() => {
    const el = rollRef.current;
    if (!el || prefersReducedMotion()) return;
    const tw = gsap.fromTo(
      el,
      { yPercent: 70, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }
    );
    return () => {
      tw.kill();
    };
  }, [active]);

  const where = active >= 0 ? list[active] : null;

  return (
    <>
      <a className="n-skip" href="#n-content">
        Skip to content
      </a>
      <header ref={headerRef} className="n-header" data-intro>
        <div className="n-header-in">
          <Link className="n-mark" href={BASE} aria-label="Holos, Overview">
            <span className="n-mark-glyph" aria-hidden="true">
              ⊛
            </span>
            <span className="n-mark-word">Holos</span>
          </Link>
          <nav className="n-nav" aria-label="Pages">
            {pages.map((p) =>
              p.href.startsWith(BASE) ? (
                <Link key={p.label} href={p.href} aria-current={p.current ? "page" : undefined}>
                  {p.label}
                </Link>
              ) : (
                <a key={p.label} href={p.href}>
                  {p.label}
                </a>
              )
            )}
          </nav>
          <div className="n-where" aria-hidden="true">
            <span className="n-where-clip">
              <span ref={rollRef} className="n-where-roll">
                {where ? (
                  <>
                    <span className="n-where-num">{pad(active + 1)}</span>
                    <span className="n-where-of">/ {pad(list.length)}</span>
                    <span className="n-where-title">{where.title}</span>
                  </>
                ) : (
                  <span className="n-where-title">{isLogic ? "Logic" : "Overview"}</span>
                )}
              </span>
            </span>
          </div>
          <a className="n-dl" href="/holos.pdf" download="holos.pdf">
            <span data-magnetic-inner>Download</span>
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="n-burger"
            aria-expanded={open}
            aria-controls="n-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="n-burger-lines" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="n-burger-label">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
        <div className="n-progress" aria-hidden="true">
          <span />
        </div>
      </header>

      <div
        id="n-menu"
        ref={menuRef}
        className="n-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="n-menu-in">
          <ol className="n-menu-pages">
            {pages.map((p, i) => (
              <li key={p.label} data-menu-item>
                {p.href.startsWith(BASE) ? (
                  <Link
                    href={p.href}
                    aria-current={p.current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="n-menu-n">{pad(i + 1)}</span>
                    {p.label}
                  </Link>
                ) : (
                  <a href={p.href}>
                    <span className="n-menu-n">{pad(i + 1)}</span>
                    {p.label}
                  </a>
                )}
              </li>
            ))}
          </ol>
          <div className="n-menu-sections" data-menu-item>
            <p className="n-label">On this page</p>
            <ol>
              {list.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={i === active ? "true" : undefined}
                  >
                    <span>{pad(i + 1)}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <a className="n-menu-dl" href="/holos.pdf" download="holos.pdf" data-menu-item>
            Download
          </a>
        </div>
      </div>
    </>
  );
}
