"use client";

// The site's text links to /logic and to Overview anchors. Inside a prototype those links
// should stay in the prototype, so they are pointed at its own routes after hydration.

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LinkRewriter({ base }: { base: string }) {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector(".rd");
    if (!root) return;
    const onHome = pathname === base;
    for (const a of Array.from(root.querySelectorAll<HTMLAnchorElement>("a[href]"))) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("/logic")) a.setAttribute("href", `${base}${href}`);
      else if (href === "/") a.setAttribute("href", base);
      else if (href.startsWith("/#"))
        a.setAttribute("href", onHome ? href.slice(1) : `${base}${href.slice(1)}`);
    }
  }, [base, pathname]);
  return null;
}
