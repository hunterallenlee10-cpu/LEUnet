"use client";

import { useEffect, useRef, useState } from "react";
import { bmChapters, bmJourney } from "@/data/business-mastery";
import { BmComingSoon } from "@/components/business-mastery/BmComingSoon";

/**
 * Section 10 — the fourteen-chapter journey, built now so the interaction
 * gets settled while the story is still being written; the chapter bodies
 * drop into data/business-mastery.ts later as a pure content swap
 * (docs/BUSINESS-MASTERY.md §7).
 *
 * The interaction: a vertical rail, and each chapter lights up as it crosses
 * the reader's viewport — the reader's own scroll walks the timeline. Once
 * lit, a chapter stays lit; the story only moves forward. It's a color and
 * opacity change, not motion, so there is nothing here for reduced-motion to
 * disable.
 *
 * Chapters render dim (not hidden) before hydration and everything is lit
 * for anyone without IntersectionObserver, so the list is always readable.
 */
export function BmJourneyTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (typeof IntersectionObserver === "undefined") {
      // Everything lights at once — better fully readable than permanently
      // dim. Scheduled in a frame callback rather than set synchronously in
      // the effect body, which react-hooks/set-state-in-effect forbids.
      const frame = requestAnimationFrame(() => setLitCount(bmChapters.length));
      return () => cancelAnimationFrame(frame);
    }

    const items = Array.from(list.querySelectorAll("[data-chapter-index]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(
            (entry.target as HTMLElement).dataset.chapterIndex
          );
          // Lit forever once reached — functional updater so a burst of
          // entries in one callback can't regress the high-water mark.
          setLitCount((prev) => Math.max(prev, index + 1));
        }
      },
      // Lights up when the chapter clears the bottom fifth of the viewport,
      // so the "now" chapter sits comfortably in view rather than at the edge.
      { rootMargin: "0px 0px -20% 0px", threshold: 0.5 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-10 top-1/2 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            My Journey
          </p>
          <h2 className="heading-lg mb-4 uppercase text-white">
            {bmJourney.heading}
          </h2>
          <p className="text-lg text-neutral-400">{bmJourney.description}</p>
        </div>

        <ol ref={listRef} className="mx-auto max-w-2xl">
          {bmChapters.map((chapter, index) => {
            const lit = index < litCount;
            const isLast = index === bmChapters.length - 1;
            return (
              <li
                key={chapter.id}
                data-chapter-index={index}
                className="relative flex gap-6 sm:gap-8"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                      lit
                        ? "border-amber-400 bg-amber-400"
                        : "border-neutral-700 bg-neutral-950"
                    }`}
                    aria-hidden="true"
                  />
                  {!isLast && (
                    <div
                      className={`w-px flex-1 transition-colors duration-500 ${
                        lit ? "bg-amber-400/50" : "bg-neutral-800"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div
                  className={`-mt-1.5 transition-opacity duration-500 ${
                    isLast ? "" : "pb-10"
                  } ${lit ? "opacity-100" : "opacity-40"}`}
                >
                  <p
                    className={`text-sm font-semibold tabular-nums tracking-[0.25em] transition-colors duration-500 ${
                      lit ? "text-amber-400" : "text-neutral-500"
                    }`}
                  >
                    {String(chapter.number).padStart(2, "0")}
                  </p>
                  <h3
                    className={`mt-1 font-bold uppercase tracking-wide transition-colors duration-500 ${
                      isLast ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                    } ${lit ? "text-white" : "text-neutral-400"}`}
                  >
                    {chapter.title}
                  </h3>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 text-center">
          <BmComingSoon note={bmJourney.comingSoonNote} />
        </div>
      </div>
    </section>
  );
}
