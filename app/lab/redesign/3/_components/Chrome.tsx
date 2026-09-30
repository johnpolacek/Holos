"use client";

// The Atlas's persistent chrome: the top bar with a reading-progress hairline, the phone
// menu sheet, and the glossary drawer (Glossary and Legend tabs), reachable from any page.
// Anything can open the drawer by dispatching `r3:drawer` with { tab }.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../_shared/motion";
import Mark from "./Mark";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Tab = "glossary" | "legend";

const isPhone = () => window.matchMedia("(max-width: 760px)").matches;

export default function Chrome({
  base,
  glossary,
  legend,
}: {
  base: string;
  glossary: ReactNode;
  legend: ReactNode;
}) {
  const pathname = usePathname();
  const barRef = useRef<HTMLElement>(null);
  const progRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("glossary");
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerTl = useRef<gsap.core.Timeline | null>(null);

  const pages = [
    { href: base, label: "Overview", internal: true },
    { href: `${base}/logic`, label: "Logic", internal: true },
    { href: "/predictions", label: "Predictions" },
    { href: "/citations", label: "Citations" },
    { href: "/revisions", label: "Revisions" },
  ];

  // Reading progress and the bar's resting rule, from the document's own scroll. Rerun on
  // every route change: the new page has its own height.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger
  useEffect(() => {
    const bar = barRef.current;
    const prog = progRef.current;
    if (!bar || !prog) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      prog.style.transform = `scaleX(${p})`;
      bar.toggleAttribute("data-scrolled", window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // ---------- Drawer ----------

  const openDrawer = useCallback((which: Tab) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setTab(which);
    setMenuOpen(false);
    drawerTl.current?.kill();
    const off = isPhone() ? { yPercent: 100, xPercent: 0 } : { xPercent: 100, yPercent: 0 };
    if (!dialog.open) {
      gsap.set(dialog, { ...off, "--r3-backdrop": 0 });
      dialog.showModal();
      // Focus the reading area rather than the first tab, so no ring flashes on open.
      dialog.querySelector<HTMLElement>(".r3-drawer-body")?.focus({ preventScroll: true });
      document.documentElement.classList.add("r3-locked");
    }
    const tl = gsap.timeline();
    if (prefersReducedMotion()) tl.set(dialog, { xPercent: 0, yPercent: 0, "--r3-backdrop": 1 });
    else {
      tl.to(dialog, { xPercent: 0, yPercent: 0, duration: 0.6, ease: "expo.out" }, 0);
      tl.to(dialog, { "--r3-backdrop": 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from(
        dialog.querySelectorAll(".r3-drawer-panel[data-on] li, .r3-drawer-panel[data-on] h3"),
        { opacity: 0, y: 14, duration: 0.5, stagger: 0.035, ease: "power3.out", clearProps: "all" },
        0.12
      );
    }
    drawerTl.current = tl;
  }, []);

  const closeDrawer = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    drawerTl.current?.kill();
    const finish = () => {
      dialog.close();
      document.documentElement.classList.remove("r3-locked");
      gsap.set(dialog, { clearProps: "transform,--r3-backdrop" });
    };
    if (prefersReducedMotion()) return finish();
    const off = isPhone() ? { yPercent: 100 } : { xPercent: 100 };
    drawerTl.current = gsap
      .timeline({ onComplete: finish })
      .to(dialog, { ...off, duration: 0.38, ease: "power3.in" }, 0)
      .to(dialog, { "--r3-backdrop": 0, duration: 0.3, ease: "power1.in" }, 0.05);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => openDrawer(((e as CustomEvent).detail?.tab as Tab) ?? "glossary");
    window.addEventListener("r3:drawer", onOpen);
    const dialog = dialogRef.current;
    const onCancel = (e: Event) => {
      if (!e.cancelable) return;
      e.preventDefault();
      closeDrawer();
    };
    const onClose = () => document.documentElement.classList.remove("r3-locked");
    // A click on the dialog itself, outside the panel, is a click on the backdrop.
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) closeDrawer();
      const a = (e.target as HTMLElement).closest("a");
      if (a) closeDrawer();
    };
    dialog?.addEventListener("cancel", onCancel);
    dialog?.addEventListener("close", onClose);
    dialog?.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("r3:drawer", onOpen);
      dialog?.removeEventListener("cancel", onCancel);
      dialog?.removeEventListener("close", onClose);
      dialog?.removeEventListener("click", onClick);
      document.documentElement.classList.remove("r3-locked");
    };
  }, [openDrawer, closeDrawer]);

  // Links in the drawer that point at Overview anchors must reach the Overview from any page.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onHome = pathname === base;
    dialog.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
      const href = a.dataset.href ?? a.getAttribute("href") ?? "";
      a.dataset.href = href;
      if (href.startsWith("#")) a.setAttribute("href", onHome ? href : `${base}${href}`);
    });
  }, [base, pathname]);

  // The tab indicator slides under the current tab.
  useIsoLayoutEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const place = () => {
      const on = tabs.querySelector<HTMLElement>("[aria-selected='true']");
      const bar = tabs.querySelector<HTMLElement>(".r3-tabs-bar");
      if (!on || !bar) return;
      gsap.to(bar, {
        x: on.offsetLeft,
        width: on.offsetWidth,
        duration: prefersReducedMotion() ? 0 : 0.45,
        ease: "power3.inOut",
      });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(tabs);
    return () => ro.disconnect();
  }, [tab]);

  // ---------- Phone menu ----------

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger
  useEffect(() => setMenuOpen(false), [pathname]);

  useIsoLayoutEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (menuOpen) {
        document.documentElement.classList.add("r3-locked");
        gsap.set(sheet, { visibility: "visible" });
        if (reduced) {
          gsap.set(sheet, { clipPath: "inset(0% 0% 0% 0%)" });
          return;
        }
        gsap
          .timeline()
          .fromTo(
            sheet,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.inOut" }
          )
          .from(
            sheet.querySelectorAll("[data-sheet-item]"),
            { yPercent: 110, opacity: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" },
            0.28
          );
      } else if (sheet.style.visibility === "visible") {
        document.documentElement.classList.remove("r3-locked");
        const hide = () => {
          gsap.set(sheet, { visibility: "hidden" });
        };
        if (reduced) {
          hide();
          return;
        }
        gsap.to(sheet, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.45,
          ease: "power3.in",
          onComplete: hide,
        });
      }
    }, sheet);
    return () => ctx.revert();
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isCurrent = (href: string) => pathname === href;

  return (
    <>
      <a className="r3-skip" href="#r3-main">
        Skip to the text
      </a>
      <header ref={barRef} className="r3-bar" data-intro>
        <Link href={base} className="r3-mark" aria-label="Holos, the cover">
          <Mark className="r3-mark-glyph" />
          <span>Holos</span>
        </Link>
        <nav className="r3-nav" aria-label="Pages">
          {pages.map((p) =>
            p.internal ? (
              <Link
                key={p.href}
                href={p.href}
                aria-current={isCurrent(p.href) ? "page" : undefined}
              >
                {p.label}
              </Link>
            ) : (
              <a key={p.href} href={p.href}>
                {p.label}
              </a>
            )
          )}
        </nav>
        <div className="r3-bar-actions">
          <button type="button" className="r3-pill" onClick={() => openDrawer("glossary")}>
            <span className="r3-pill-glyph" aria-hidden="true">
              Aa
            </span>
            Glossary
          </button>
          <a className="r3-bar-pdf" href="/holos.pdf" download>
            PDF
          </a>
          <button
            type="button"
            className="r3-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="r3-sheet"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="r3-menu-lines" aria-hidden="true" data-open={menuOpen || undefined}>
              <i />
              <i />
            </span>
            <span className="r3-sr">{menuOpen ? "Close menu" : "Menu"}</span>
          </button>
        </div>
        <span className="r3-progress" aria-hidden="true">
          <span ref={progRef} />
        </span>
      </header>

      <div ref={sheetRef} id="r3-sheet" className="r3-sheet" aria-hidden={!menuOpen}>
        <nav aria-label="Pages" className="r3-sheet-nav">
          {pages.map((p, i) => (
            <div key={p.href} className="r3-sheet-row">
              <span data-sheet-item className="r3-sheet-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.internal ? (
                <Link
                  data-sheet-item
                  href={p.href}
                  aria-current={isCurrent(p.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {p.label}
                </Link>
              ) : (
                <a data-sheet-item href={p.href}>
                  {p.label}
                </a>
              )}
            </div>
          ))}
        </nav>
        <div className="r3-sheet-foot" data-sheet-item>
          <button type="button" className="r3-pill" onClick={() => openDrawer("glossary")}>
            Glossary
          </button>
          <button type="button" className="r3-pill" onClick={() => openDrawer("legend")}>
            Legend
          </button>
          <a className="r3-pill" href="/holos.pdf" download>
            Download PDF
          </a>
        </div>
      </div>

      <dialog ref={dialogRef} className="r3-drawer" aria-label="Glossary and legend">
        <div className="r3-drawer-inner">
          <div className="r3-drawer-head">
            <div ref={tabsRef} className="r3-tabs" role="tablist" aria-label="Reference">
              <button
                type="button"
                role="tab"
                id="r3-tab-glossary"
                aria-selected={tab === "glossary"}
                aria-controls="r3-panel-glossary"
                onClick={() => setTab("glossary")}
              >
                Glossary
              </button>
              <button
                type="button"
                role="tab"
                id="r3-tab-legend"
                aria-selected={tab === "legend"}
                aria-controls="r3-panel-legend"
                onClick={() => setTab("legend")}
              >
                Legend
              </button>
              <span className="r3-tabs-bar" aria-hidden="true" />
            </div>
            <button type="button" className="r3-drawer-close" onClick={closeDrawer}>
              <span className="r3-sr">Close</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 4 16 16M16 4 4 16" />
              </svg>
            </button>
          </div>
          <div className="r3-drawer-body" tabIndex={-1}>
            <div
              id="r3-panel-glossary"
              role="tabpanel"
              aria-labelledby="r3-tab-glossary"
              className="r3-drawer-panel r3-terms"
              data-on={tab === "glossary" || undefined}
              hidden={tab !== "glossary"}
            >
              {glossary}
            </div>
            <div
              id="r3-panel-legend"
              role="tabpanel"
              aria-labelledby="r3-tab-legend"
              className="r3-drawer-panel r3-legend"
              data-on={tab === "legend" || undefined}
              hidden={tab !== "legend"}
            >
              {legend}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
