"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The homepage hero's first screen: the headline block, with the animation
 * (HeroVsl.tsx) in the same grid cell. Both arrive as server-rendered
 * children; this only adds the part that runs in the browser, and is the
 * hero's one client boundary.
 *
 * The player and GSAP load after the page is interactive, in their own
 * chunk, so the headline paints without waiting on them. If that chunk never
 * arrives, the regular hero simply stays.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const top = ref.current;
    if (!top) return;
    let unmount: (() => void) | undefined;
    let cancelled = false;
    import("./heroVslPlayer")
      .then(({ mountHeroVsl }) => {
        if (!cancelled) unmount = mountHeroVsl(top);
      })
      .catch(() => {
        // The regular hero is complete on its own.
      });
    return () => {
      cancelled = true;
      unmount?.();
    };
  }, []);

  return (
    <div ref={ref} className="hero-split-top">
      {children}
    </div>
  );
}
