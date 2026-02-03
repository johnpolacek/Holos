"use client";
import { Download, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  defenseSubsections,
  definitionSubsections,
  logicSubsections,
  predictionsSubsections,
  theorySubsections,
  trajectorySubsections,
} from "../../lib/navigation";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on the theory page (home page)
  const isTheoryPage = pathname === "/" || pathname === "/theory";
  const isCorePage = pathname === "/core";
  const isLogicPage = pathname === "/logic";
  const isDefensePage = pathname === "/defense";
  const isDefinitionPage = pathname === "/definition";
  const isTrajectoryPage = pathname === "/trajectory";
  const isPredictionsPage = pathname === "/predictions";
  const isCitationsPage = pathname === "/citations";

  // If we're not on the theory page, prepend "/" to hash links to navigate to theory page first
  const getLink = (hash: string) => {
    return isTheoryPage ? hash : `/${hash}`;
  };

  // Get link for subsections based on current page
  // Since subsections are only shown when on their respective pages,
  // we can use hash-only links for proper scrolling behavior
  const getSubsectionLink = (id: string) => {
    return `#${id}`;
  };

  const handleDownload = () => {
    try {
      // PDF is generated at build time and served from public directory
      const url = "/holos.pdf";
      const a = document.createElement("a");
      a.href = url;
      a.download = "holos.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download PDF:", err);
      alert("Failed to download PDF. Please try again.");
    }
  };

  return (
    <>
      <div className="sticky w-full xl:hidden z-20">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsSidebarOpen(!isSidebarOpen);
            }
          }}
          className={`absolute top-2 left-2 cursor-pointer ease-in-out transition-all duration-300 ${isSidebarOpen ? "translate-x-[calc(100vw-3rem)]" : "translate-x-0"}`}
        >
          <MenuIcon size={20} aria-hidden="true" />
        </button>
      </div>
      <aside
        onClick={() => setIsSidebarOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsSidebarOpen(false);
          }
        }}
        className={`fixed xl:static top-0 left-0 w-full xl:w-auto h-screen overflow-auto transition-transform duration-300 bg-white z-10 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
      >
        <nav className="w-full h-screen top-0 left-0 border-r border-black/20 border-dashed overflow-auto flex flex-col">
          <a
            href={getLink("#home")}
            className="flex items-center justify-center xl:border-b xl:border-black/30 xl:border-dashed h-[160px] w-full relative top-[6.6vh] xl:top-0"
          >
            <div className="flex flex-col items-center justify-center py-8 opacity-60">
              <img
                src="/icon.svg"
                alt="Holos"
                title="Holos"
                className="w-4 h-4 relative -top-1.5"
              />
              <div>Holos</div>
            </div>
          </a>
          <ol className="flex flex-col h-full xl:h-auto gap-2 pt-12 pb-16 justify-center items-center xl:justify-start flex-grow text-sm">
            <li>
              <Link
                className={`text-lg font-medium ${isTheoryPage ? "opacity-100" : "opacity-60"}`}
                href="/"
              >
                Overview
              </Link>
            </li>
            {isTheoryPage && (
              <div className="sidebar-subsections sidebar-subsections-enter flex flex-col items-center">
                {theorySubsections.map((subsection) => (
                  <li key={subsection.id} className="sidebar-subsection-item py-1">
                    {subsection.id === "holos" ? (
                      <a
                        className="flex items-center justify-center gap-1"
                        href={getLink(`#${subsection.id}`)}
                      >
                        <img
                          src="/icon.svg"
                          alt="Asterisk in a Circle"
                          className="w-4 h-4 scale-90"
                        />
                        <span>{subsection.title}</span>
                      </a>
                    ) : (
                      <a href={getLink(`#${subsection.id}`)}>{subsection.title}</a>
                    )}
                  </li>
                ))}
              </div>
            )}
            <li className="mt-2">
              <Link
                className={`text-lg font-medium ${isCorePage ? "opacity-100" : "opacity-60"}`}
                href="/core"
              >
                Core
              </Link>
            </li>
            <li className="mt-2">
              <Link
                className={`text-lg font-medium ${isLogicPage ? "opacity-100" : "opacity-60"}`}
                href="/logic"
              >
                Logic
              </Link>
            </li>
            {isLogicPage && (
              <div className="sidebar-subsections sidebar-subsections-enter flex flex-col items-center">
                {logicSubsections.map((subsection) => (
                  <li key={subsection.id} className="sidebar-subsection-item text-xs py-1">
                    <a href={getSubsectionLink(subsection.id)}>{subsection.title}</a>
                  </li>
                ))}
              </div>
            )}
            <li className="mt-2">
              <Link
                className={`text-lg font-medium ${isDefinitionPage ? "opacity-100" : "opacity-60"}`}
                href="/definition"
              >
                Definition
              </Link>
            </li>
            {isDefinitionPage && (
              <div className="sidebar-subsections sidebar-subsections-enter flex flex-col items-center">
                {definitionSubsections.map((subsection) => (
                  <li key={subsection.id} className="sidebar-subsection-item text-xs py-1">
                    <a href={getSubsectionLink(subsection.id)}>{subsection.title}</a>
                  </li>
                ))}
              </div>
            )}
            <li className="mt-2">
              <Link
                className={`text-lg font-medium ${isDefensePage ? "opacity-100" : "opacity-60"}`}
                href="/defense"
              >
                Defense
              </Link>
            </li>
            {isDefensePage && (
              <div className="sidebar-subsections sidebar-subsections-enter flex flex-col items-center">
                {defenseSubsections.map((subsection) => (
                  <li key={subsection.id} className="sidebar-subsection-item text-xs py-1">
                    <a href={getSubsectionLink(subsection.id)}>{subsection.title}</a>
                  </li>
                ))}
              </div>
            )}
            <li className="mt-2">
              <Link
                className={`text-lg font-medium ${isPredictionsPage ? "opacity-100" : "opacity-60"}`}
                href="/predictions"
              >
                Predictions
              </Link>
            </li>
            {isPredictionsPage && (
              <div className="sidebar-subsections sidebar-subsections-enter flex flex-col items-center">
                {predictionsSubsections.map((subsection) => (
                  <li key={subsection.id} className="sidebar-subsection-item text-xs py-1">
                    <a href={getSubsectionLink(subsection.id)}>{subsection.title}</a>
                  </li>
                ))}
              </div>
            )}
            <li className="mt-2">
              <Link
                className={`text-lg font-medium ${isTrajectoryPage ? "opacity-100" : "opacity-60"}`}
                href="/trajectory"
              >
                Trajectory
              </Link>
            </li>
            {isTrajectoryPage && (
              <div className="sidebar-subsections sidebar-subsections-enter flex flex-col items-center">
                {trajectorySubsections.map((subsection) => (
                  <li key={subsection.id} className="sidebar-subsection-item text-xs py-1">
                    <a href={getSubsectionLink(subsection.id)}>{subsection.title}</a>
                  </li>
                ))}
              </div>
            )}
            <li className="mt-2">
              <Link
                className={`text-lg font-medium ${isCitationsPage ? "opacity-100" : "opacity-60"}`}
                href="/citations"
              >
                Citations
              </Link>
            </li>
          </ol>
          <div className="w-full flex justify-center pb-8 px-8 xl:px-4 mb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="text-xs border border-black/40 px-4 py-2 rounded transition-all flex items-center gap-1.5 opacity-80 hover:opacity-100 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Download size={12} aria-hidden="true" />
              Download
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
