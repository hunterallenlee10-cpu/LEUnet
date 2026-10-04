"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * The sideways strip behind "Our projects": one slide per view, swiped on
 * touch, scrolled sideways on a trackpad, or moved with the arrows, the dots
 * or the arrow keys once the strip has focus. On phones each slide is a
 * little narrower than the strip so the next one peeks in from the edge.
 *
 * Like the Business Mastery journey (BmJourneyTimeline), it is a native
 * scroll-snap container rather than hijacked page scroll, and the scroll
 * position is the only source of truth for which slide is current.
 */
export function ProjectsCarousel({
  slides,
  label,
}: {
  slides: ReactNode[];
  label: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef(0);
  const animRef = useRef(0);
  const [active, setActive] = useState(0);
  const count = slides.length;

  // Animated by hand with snapping off for the duration, for the reason the
  // journey timeline gives: Chromium lets an intermediate snap point capture
  // a smooth programmatic scroll, so a dot click to a far slide would set off
  // and then snap back.
  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const clamped = Math.min(count - 1, Math.max(0, index));
      const slide = track?.children[clamped] as HTMLElement | undefined;
      if (!track || !slide) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const target = Math.min(
        maxScroll,
        Math.max(
          0,
          slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2
        )
      );

      cancelAnimationFrame(animRef.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        track.scrollTo({ left: target });
        return;
      }

      const from = track.scrollLeft;
      const distance = target - from;
      if (distance === 0) return;
      const duration = 500;
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
          track.scrollLeft = target;
          track.style.scrollSnapType = "";
        }
      };
      animRef.current = requestAnimationFrame(step);
    },
    [count]
  );

  // The current slide is the one whose middle sits nearest the strip's
  // middle, which also holds at both ends where a centered snap can't reach.
  const handleScroll = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const track = trackRef.current;
      if (!track) return;
      const middle = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const gap = Math.abs(el.offsetLeft + el.offsetWidth / 2 - middle);
        if (gap < best) {
          best = gap;
          nearest = i;
        }
      });
      setActive(nearest);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const arrowClass =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-neutral-200 transition-colors hover:border-brass-300 hover:text-brass-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="mx-auto max-w-3xl"
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        aria-label={`${label}: use the left and right arrow keys to move between slides`}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-xl [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-300 md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="flex w-[86%] shrink-0 snap-center md:w-full"
          >
            {slide}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous project"
          className={arrowClass}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1} of ${count}`}
              aria-current={i === active ? "true" : undefined}
              className="group inline-flex h-11 w-7 items-center justify-center focus-visible:outline-2 focus-visible:outline-brass-300"
            >
              <span
                className={clsx(
                  "block h-2 rounded-full transition-all duration-300",
                  i === active
                    ? "w-6 bg-brass-300"
                    : "w-2 bg-white/25 group-hover:bg-white/50"
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === count - 1}
          aria-label="Next project"
          className={arrowClass}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
