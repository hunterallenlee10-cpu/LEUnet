"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * The hero logo's scroll parallax, and the only part of the hero that needs
 * the browser. The transform is written straight to the element, at most once
 * a frame, so scrolling never re-renders anything.
 *
 * The listener stays attached at every width: the logo column is hidden below
 * `lg`, and a style write to a hidden element costs next to nothing, so a
 * window resized up to desktop still tracks the scroll. Visitors who ask for
 * reduced motion get a still logo - the CSS reset cannot reach an inline
 * transform, so this checks the preference itself, and follows it if it
 * changes.
 *
 * The transform is `translateY(0px)` at rest rather than none: it gives the box
 * the stacking context the `-z-10` glow inside is layered in.
 */
export function HeroParallax({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      el.style.transform = `translateY(${window.scrollY * 0.1}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const sync = () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      frame = 0;
      if (reducedMotion.matches) {
        el.style.transform = "translateY(0px)";
        return;
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      // Placed for wherever the page already is (a reload mid-page), rather
      // than jumping there on the first scroll.
      onScroll();
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform: "translateY(0px)" }}
    >
      {children}
    </div>
  );
}
