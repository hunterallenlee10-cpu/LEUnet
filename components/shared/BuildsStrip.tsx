"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * The sideways row behind "Recent Builds", so the section stays one row tall
 * however many builds go in. Three boxes show at a time on desktop, two on
 * tablets, and on phones one with the next peeking in from the edge. Visitors
 * swipe it, scroll it sideways on a trackpad, or page through with the arrows;
 * the gold bar under it shows where they are in the row. It never moves on
 * its own.
 *
 * Like the old projects carousel and the Business Mastery journey, it is a
 * native scroll-snap container rather than hijacked page scroll, and the
 * scroll position is the only source of truth.
 */
export function BuildsStrip({
  items,
  label,
}: {
  items: ReactNode[];
  label: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef(0);
  const animRef = useRef(0);
  const [view, setView] = useState({
    scrollable: false,
    atStart: true,
    atEnd: false,
    left: 0,
    width: 1,
  });

  const measure = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      setView({
        scrollable: max > 1,
        atStart: track.scrollLeft <= 1,
        atEnd: track.scrollLeft >= max - 1,
        left: track.scrollLeft / track.scrollWidth,
        width: track.clientWidth / track.scrollWidth,
      });
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, [measure]);

  // Animated by hand with snapping off for the duration: Chromium lets an
  // intermediate snap point capture a smooth programmatic scroll, so a jump
  // of a whole page would set off and then snap back.
  const scrollToLeft = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const to = Math.min(max, Math.max(0, target));

    cancelAnimationFrame(animRef.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.scrollTo({ left: to });
      return;
    }

    const from = track.scrollLeft;
    const distance = to - from;
    if (distance === 0) return;
    const duration = 550;
    const start = performance.now();
    track.style.scrollSnapType = "none";

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeInOutCubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      track.scrollLeft = from + distance * eased;
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        track.scrollLeft = to;
        track.style.scrollSnapType = "";
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  // A page at a time: "next" brings the first box that isn't fully in view
  // to the start, "back" goes to the first box within one view-width behind.
  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const inset = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const boxes = Array.from(track.children) as HTMLElement[];
    const viewStart = track.scrollLeft + inset;

    if (direction === 1) {
      const viewEnd = track.scrollLeft + track.clientWidth - inset;
      const next = boxes.find((b) => b.offsetLeft + b.offsetWidth > viewEnd + 1);
      scrollToLeft(next ? next.offsetLeft - inset : Infinity);
    } else {
      const span = track.clientWidth - 2 * inset;
      const prev = boxes.find((b) => b.offsetLeft >= viewStart - span - 1);
      scrollToLeft(prev ? prev.offsetLeft - inset : 0);
    }
  };

  const arrowClass =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-neutral-200 transition-colors hover:border-brass-300 hover:text-brass-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      {/* Bleeds to the screen edge on phones and tablets so the peeking box
          isn't cut off at the page margin; the padding and matching
          scroll-padding keep the first box lined up with the heading. The
          vertical padding leaves room for each box's focus ring, which the
          scroll container would otherwise clip. */}
      <ul
        ref={trackRef}
        onScroll={measure}
        className="relative -mx-4 -my-3 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 py-3 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:gap-6 lg:-mx-2 lg:scroll-px-2 lg:px-2 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            {item}
          </li>
        ))}
      </ul>

      {view.scrollable && (
        <div className="mt-8 flex items-center gap-6">
          <div
            className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/10"
            aria-hidden="true"
          >
            <div
              className="absolute inset-y-0 rounded-full bg-brass-300"
              style={{
                left: `${view.left * 100}%`,
                width: `${view.width * 100}%`,
              }}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={view.atStart}
              aria-label="Previous builds"
              className={arrowClass}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={view.atEnd}
              aria-label="More builds"
              className={arrowClass}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
