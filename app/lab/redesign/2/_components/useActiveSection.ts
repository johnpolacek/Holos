"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "../../_shared/motion";

// Index of the section whose box spans the reading line (45% down the viewport), or -1
// above the first one. It reports state, so it runs under reduced motion too.
export default function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const triggers = ids.flatMap((id, i) => {
      const el = document.getElementById(id);
      if (!el) return [];
      return [
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
            else if (i === 0 && self.direction < 0) setActive(-1);
          },
        }),
      ];
    });
    return () => {
      for (const t of triggers) t.kill();
    };
  }, [ids]);
  return active;
}
