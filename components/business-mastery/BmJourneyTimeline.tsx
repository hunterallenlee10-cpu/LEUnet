"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bmChapters, bmJourney } from "@/data/business-mastery";
import { BmComingSoon } from "@/components/business-mastery/BmComingSoon";

/**
 * Section 8 — the journey as a horizontal, chapter-by-chapter experience,
 * modeled on the timeline the page plan named as its structural inspiration:
 * a full-width intro slide, one slide per chapter, edge arrows, and a
 * scrubber bar across the bottom with every stop — a dot and its title, the
 * current stop lit. The reference put a chapter number above each dot and so
 * did this until the owner asked the numbers off; the slides still carry
 * theirs. Rendered in LEU's gold-on-black rather
 * than the reference's palette. The intro eyebrow reads "A Life in Full" —
 * the owner's chosen name for the section, which is also what that reference
 * timeline was called; the two are not otherwise related.
 *
 * Navigation is a native horizontal scroll-snap container, not hijacked page
 * scroll: swipe on touch, trackpad-scroll sideways, arrow keys when the
 * region has focus, the edge arrows, or any scrubber stop. The page's
 * vertical scroll is never captured.
 *
 * Chapter bodies are still coming soon (docs/BUSINESS-MASTERY.md §7): each
 * slide carries its number and title big, plus the one-line note from
 * `bmJourney.chapterNote`. The stories drop into the data file later as a
 * pure content swap.
 */

// Slide 0 is the intro; chapter i lives at slide i + 1.
const SLIDE_COUNT = bmChapters.length + 1;

const pad = (n: number) => String(n).padStart(2, "0");

export function BmJourneyTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const animRef = useRef(0);
  const [active, setActive] = useState(0);

  // The jump is animated by hand, with snapping switched off for its
  // duration, rather than with scrollTo({behavior: "smooth"}). A smooth
  // programmatic scroll across several `snap-mandatory` stops gets captured
  // by an intermediate snap point in Chromium, so a scrubber click to a far
  // chapter would visibly set off and then snap back near the start.
  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(SLIDE_COUNT - 1, Math.max(0, index));
    const target = clamped * track.clientWidth;

    cancelAnimationFrame(animRef.current);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      track.scrollTo({ left: target });
      return;
    }

    const from = track.scrollLeft;
    const distance = target - from;
    if (distance === 0) return;
    const duration = 650;
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
        // Land exactly on the slide before snapping is re-enabled, so
        // re-enabling it has nothing to correct.
        track.scrollLeft = target;
        track.style.scrollSnapType = "";
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  // The scroll position is the source of truth for `active`, so arrows,
  // swipes, keys, and scrubber clicks all stay in sync by only ever moving
  // the scroll. rAF-throttled: scroll fires per frame anyway, but React
  // doesn't need more than one state read per paint.
  const handleScroll = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      setActive(
        Math.min(
          SLIDE_COUNT - 1,
          Math.max(0, Math.round(track.scrollLeft / track.clientWidth))
        )
      );
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Keep the active stop visible in the scrubber, which scrolls on narrow
  // viewports. Manual math rather than scrollIntoView: that can also scroll
  // the page vertically, which would yank the reader mid-story.
  useEffect(() => {
    if (active === 0) return;
    const center = (smoothOk: boolean) => {
      const strip = stripRef.current;
      if (!strip) return;
      const stop = strip.querySelector<HTMLElement>(
        `[data-stop-index="${active - 1}"]`
      );
      if (!stop) return;
      const target =
        stop.offsetLeft - strip.clientWidth / 2 + stop.clientWidth / 2;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      strip.scrollTo({
        left: target,
        behavior: smoothOk && !reduced ? "smooth" : "auto",
      });
    };

    center(true);
    // A resize reflows the strip (and phone rotation changes what fits), so
    // the active stop re-centers itself — instantly, mid-drag resizes and
    // smooth scrolling fight each other.
    const onResize = () => center(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-20">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-10 top-1/3 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="relative">
        {/* Slides */}
        <div
          role="region"
          aria-label="The Journey — interactive timeline"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="group/track relative outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex h-[min(72vh,620px)] snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Intro slide */}
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`Introduction, slide 1 of ${SLIDE_COUNT}`}
              className="flex h-full w-full shrink-0 snap-center flex-col items-center justify-center px-6 text-center"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-amber-400 sm:text-sm">
                A Life in Full
              </p>
              <h2 className="text-[52px] font-bold uppercase leading-[0.95] tracking-tight sm:text-[72px] lg:text-[clamp(76px,7vw,112px)]">
                <span className="block text-white">The</span>
                <span className="block text-amber-400">Journey</span>
              </h2>
              <p className="mt-7 text-lg uppercase tracking-[0.2em] text-neutral-300 sm:text-xl">
                {bmJourney.description}
              </p>

              <button
                type="button"
                onClick={() => goTo(1)}
                className="group mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition-colors hover:text-amber-400 sm:text-sm"
              >
                {bmJourney.startCta} — {bmJourney.hint}
                <ChevronRight
                  className="h-4 w-4 text-amber-400 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <div className="mt-10">
                <BmComingSoon note={bmJourney.comingSoonNote} />
              </div>
            </div>

            {/* Chapter slides */}
            {bmChapters.map((chapter, index) => (
              <div
                key={chapter.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Chapter ${pad(chapter.number)}: ${chapter.title}`}
                className="relative flex h-full w-full shrink-0 snap-center flex-col items-center justify-center px-6 text-center"
              >
                {/* Ghost number, the slide's backdrop. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center text-[min(46vw,26rem)] font-bold leading-none text-amber-400/[0.06]"
                >
                  {pad(chapter.number)}
                </span>

                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400 sm:text-sm">
                  Chapter {pad(chapter.number)}{" "}
                  <span className="text-neutral-500">/ {pad(bmChapters.length)}</span>
                </p>
                <h3
                  // The color lives with each branch: putting text-white on
                  // the base and text-amber-400 on the final chapter leaves
                  // both classes on the element, and stylesheet order — not
                  // class order — would pick the winner.
                  className={`mt-5 max-w-4xl font-bold uppercase leading-[1.02] tracking-tight ${
                    index === bmChapters.length - 1
                      ? "text-[56px] text-amber-400 sm:text-[80px] lg:text-[clamp(84px,7.5vw,120px)]"
                      : "text-[40px] text-white sm:text-[56px] lg:text-[clamp(56px,5vw,84px)]"
                  }`}
                >
                  {chapter.title}
                </h3>
                <p className="mt-7 text-sm uppercase tracking-[0.2em] text-neutral-500 sm:text-base">
                  {bmJourney.chapterNote}
                </p>
              </div>
            ))}
          </div>

          {/* Edge arrows */}
          {active > 0 && (
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous chapter"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-neutral-700 bg-neutral-950/70 p-2.5 text-neutral-300 backdrop-blur-sm transition-colors hover:border-amber-400/60 hover:text-amber-400 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
          {active < SLIDE_COUNT - 1 && (
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next chapter"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-neutral-700 bg-neutral-950/70 p-2.5 text-neutral-300 backdrop-blur-sm transition-colors hover:border-amber-400/60 hover:text-amber-400 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Scrubber — number row above the dots, title row below, exactly the
            reference's bar shape. Scrolls sideways where fourteen stops don't
            fit; the active stop keeps itself centered. */}
        <div className="mt-4 border-t border-neutral-800/80">
          <div
            ref={stripRef}
            className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* `justify-center` rather than `mx-auto` centers the stops on wide
                viewports: `min-w-max` leaves this row a full-width block, so it
                has no free margin for auto margins to split and the stops would
                pack left. Where the row does overflow, min-w-max makes it
                exactly its content width — free space is zero, centering is
                inert, and the strip still scrolls from the first stop rather
                than losing the left end past the scroll origin. */}
            <div className="relative flex min-w-max justify-center px-6 sm:px-10">
              {bmChapters.map((chapter, index) => {
                const slideIndex = index + 1;
                const isActive = active === slideIndex;
                const isPassed = active > slideIndex;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    data-stop-index={index}
                    onClick={() => goTo(slideIndex)}
                    aria-label={`Go to chapter ${pad(chapter.number)}: ${chapter.title}`}
                    aria-current={isActive ? "true" : undefined}
                    // 14 stops at 96px plus the strip padding is 1424px, so
                    // the whole bar fits a 1440 viewport without scrolling;
                    // narrower screens scroll the strip.
                    className="group flex w-[92px] flex-col items-center pb-5 pt-4 sm:w-[96px]"
                  >
                    {/* Each stop used to label itself `01`…`14` above the dot;
                        the owner asked the numbers off, so a stop is now the
                        dot plus its title. The number stays in `aria-label`,
                        which is not a visible-label mismatch — the accessible
                        name still contains the visible title — and it is how a
                        screen-reader user keeps their place in fourteen stops
                        that otherwise announce as titles alone.

                        Dot on the through-line. The line is drawn per-stop as
                        two half-width strips so it needs no measured overlay,
                        and the row's ends stop cleanly at the first and last
                        dots. */}
                    <span className="relative flex h-3 w-full items-center justify-center">
                      {index > 0 && (
                        <span
                          className={`absolute left-0 right-1/2 h-px ${
                            isPassed || isActive
                              ? "bg-amber-400/50"
                              : "bg-neutral-800"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      {index < bmChapters.length - 1 && (
                        <span
                          className={`absolute left-1/2 right-0 h-px ${
                            isPassed ? "bg-amber-400/50" : "bg-neutral-800"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative h-2.5 w-2.5 rounded-[2px] transition-all ${
                          isActive
                            ? "scale-125 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]"
                            : isPassed
                              ? "bg-amber-400/50"
                              : "bg-neutral-700 group-hover:bg-neutral-500"
                        }`}
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      className={`mt-3 max-w-full text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-neutral-500 group-hover:text-neutral-300"
                      }`}
                    >
                      {chapter.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
