"use client";

import type { ReactNode } from "react";

// Opens the Atlas drawer (see Chrome) on a given tab.
export default function DrawerButton({
  tab,
  className,
  children,
}: {
  tab: "glossary" | "legend";
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("r3:drawer", { detail: { tab } }))}
    >
      {children}
    </button>
  );
}
