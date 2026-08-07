"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { H1_PALETTE, h1Testimonials } from "@/data/h1";

/**
 * Two states, one section. While `h1Testimonials` is empty the placeholder
 * below holds the space with copy that reads as deliberate; the moment a real
 * quote is added to `data/h1.ts` the carousel replaces it with no other change.
 *
 * The placeholder invents nothing — no sample quote, no fake name, no star
 * rating. It says the testimonies are coming and points current athletes at the
 * form, which is true and costs the page no credibility.
 *
 * Cards carry an optional athlete photo, masked with the same bottom fade as
 * the coach photography so the page's two photo treatments read as one. A card
 * without a photo starts at the quote glyph — no gap, no placeholder art.
 */

/**
 * The coach-card fade, with shorter stops for a shorter header — see
 * H1CoachesSection for why the fade is a mask on the photo rather than a
 * gradient painted over it (the card surface below is a tint, not ink, so an
 * ink-matched overlay would band at the seam).
 */
const PHOTO_FADE_MASK =
  "linear-gradient(to bottom, black calc(100% - 4rem), rgba(0, 0, 0, 0.25) calc(100% - 2rem), rgba(0, 0, 0, 0.08) calc(100% - 1rem), transparent calc(100% - 0.25rem))";

/**
 * Card widths, sized so a whole number of cards fills the track exactly: three
 * from `lg`, two from `md`, one below that. `gap-6` is 1.5rem, so three cards
 * share 3rem of gaps (1rem each) and two share 1.5rem (0.75rem each). Getting
 * this arithmetic right is what makes the carousel land on clean edges — a card
 * peeking in from the right would read as a broken grid rather than as "there
 * is more," which is the arrows' job.
 */
const CARD_WIDTHS =
  "w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]";

export function H1TestimonialsSection() {
  const hasTestimonials = h1Testimonials.length > 0;
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Whether the track actually overflows. It is a function of the viewport and
   * the number of testimonies, so it is measured rather than assumed: three
   * quotes on a desktop fit with nothing to page to, and arrows that scroll
   * nothing are worse than no arrows.
   *
   * It starts `true` — assume scrollable — and the measurement below only ever
   * turns it off. Starting `false` renders the centred branch for one frame,
   * and centring a track that does overflow puts its first cards behind the
   * scroll origin where nothing can reach them: on a phone the section opened
   * on the third testimony with the first two stranded to the left. The
   * opposite mistake costs a frame of left alignment on a list too short to
   * scroll, which is invisible and harmless.
   *
   * The arrows are always in the layout, transparent rather than absent, so
   * the section does not change height when the measurement lands.
   */
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () =>
      setCanScroll(track.scrollWidth - track.clientWidth > 1);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  /**
   * Page by one card. Targets are read off the cards' own `offsetLeft` rather
   * than computed from a width-plus-gap stride, so the arrows stay correct
   * across the breakpoints without knowing which one is active.
   *
   * At either end the direction wraps, because the alternative — two arrows
   * that spend most of their life disabled — gives the reader a dead control
   * on a list that is only five long. `scrollTo` past the end is clamped by
   * the browser, and `scroll-snap-type: mandatory` settles the result on a
   * card edge, so the last page is always a real snap position even when the
   * remainder is narrower than one card.
   */
  const page = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const { scrollLeft } = track;

    let left: number;
    if (direction === 1 && scrollLeft >= maxScroll - 1) {
      left = 0;
    } else if (direction === -1 && scrollLeft <= 1) {
      left = maxScroll;
    } else {
      // The card nearest the track's left edge is the one currently leading
      // the visible run; page relative to that.
      let nearest = 0;
      let smallest = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft);
        if (distance < smallest) {
          smallest = distance;
          nearest = index;
        }
      });

      const target = Math.min(
        Math.max(nearest + direction, 0),
        cards.length - 1,
      );
      left = cards[target].offsetLeft;
    }

    // Read at call time rather than in state: the site-wide reduced-motion
    // rules collapse CSS transitions, but a programmatic smooth scroll is not
    // a transition and would animate straight through them.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  return (
    <section
      id="h1-testimonials"
      className="border-y py-20 md:py-28"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="text-sm font-semibold tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            PLAYER TESTIMONIES
          </span>
          <h2 className="heading-lg mt-3 text-white">
            Athlete Results, In Their Words
          </h2>
        </div>

        {hasTestimonials ? (
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Athlete testimonies"
          >
            {/* The scroller. `snap-mandatory` keeps it landing on card edges
                whether it was moved by an arrow, a trackpad, or a thumb, so
                touch users get the same carousel without needing the arrows.

                `tabIndex` is not decoration: a scrollable region that cannot
                take focus cannot be scrolled from the keyboard at all, and the
                cards hold no focusable content of their own to get you in.

                The vertical padding is headroom for the `h1-live` hover rise —
                `overflow-x: auto` forces `overflow-y` to compute to `auto`
                too, so a card lifting 2px at the edge of a track with no
                padding would be clipped, or worse, raise a second scrollbar.

                Left-aligned while it overflows, centred when it does not: a
                short list should sit in the middle of the section the way the
                old grid did, but `justify-content: center` on a scroller that
                overflows pushes content past the scroll origin where it cannot
                be reached — see the `canScroll` note above for why that
                decides the default rather than the other way round. */}
            <div
              ref={trackRef}
              id="h1-testimonials-track"
              tabIndex={0}
              aria-label="Athlete testimonies, scrollable"
              className={`relative flex snap-x snap-mandatory gap-6 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                canScroll ? "" : "justify-center"
              }`}
            >
              {h1Testimonials.map((testimonial) => (
                <figure
                  key={testimonial.id}
                  className={`h1-live flex shrink-0 snap-start flex-col overflow-hidden rounded-xl border ${CARD_WIDTHS}`}
                  style={{
                    borderColor: H1_PALETTE.line,
                    backgroundColor: `${H1_PALETTE.chalk}05`,
                  }}
                >
                  {testimonial.photo && (
                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden"
                      style={{
                        maskImage: PHOTO_FADE_MASK,
                        WebkitMaskImage: PHOTO_FADE_MASK,
                      }}
                    >
                      <Image
                        src={testimonial.photo.src}
                        alt={testimonial.photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="h1-zoom object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={
                      testimonial.photo
                        ? "flex flex-1 flex-col p-8 pt-4"
                        : "flex flex-1 flex-col p-8"
                    }
                  >
                    <Quote
                      className="mb-4 h-7 w-7"
                      style={{ color: H1_PALETTE.gold }}
                      aria-hidden="true"
                    />
                    <blockquote
                      className="mb-6 flex-1 text-sm leading-relaxed"
                      style={{ color: H1_PALETTE.muted }}
                    >
                      {testimonial.quote}
                    </blockquote>
                    <figcaption>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: H1_PALETTE.muted }}
                      >
                        {testimonial.detail}
                      </div>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>

            {/* Below the track and centred, because the section header above is
                centred too and arrows overlaid on the cards would sit on the
                athletes' faces. Kept in the layout when there is nothing to
                page through so the section's height does not change once the
                measurement lands. */}
            <div
              className={`mt-10 flex items-center justify-center gap-4 transition-opacity ${
                canScroll ? "" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={canScroll ? undefined : true}
            >
              {(
                [
                  ["Previous testimonies", -1, ChevronLeft],
                  ["Next testimonies", 1, ChevronRight],
                ] as const
              ).map(([label, direction, Icon]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => page(direction)}
                  aria-label={label}
                  aria-controls="h1-testimonials-track"
                  tabIndex={canScroll ? undefined : -1}
                  className="h1-tap flex h-12 w-12 items-center justify-center rounded-full border"
                  style={{
                    borderColor: `${H1_PALETTE.gold}4D`,
                    color: H1_PALETTE.gold,
                    backgroundColor: `${H1_PALETTE.chalk}08`,
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border px-8 py-14 text-center md:px-14"
            style={{
              borderColor: `${H1_PALETTE.gold}33`,
              backgroundColor: `${H1_PALETTE.chalk}05`,
            }}
          >
            <div
              className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${H1_PALETTE.gold}1A` }}
              aria-hidden="true"
            />

            <div className="relative">
              <div
                className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: `${H1_PALETTE.gold}1F` }}
              >
                <Quote
                  className="h-6 w-6"
                  style={{ color: H1_PALETTE.gold }}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                The First Testimonies Are On The Way
              </h3>
              <p
                className="mx-auto mb-8 max-w-xl leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                Our athletes are working through their training blocks right
                now. As their numbers come in, their words go here — posted the
                way they send them.
              </p>

              <div
                className="mx-auto mb-8 h-px w-24"
                style={{ backgroundColor: `${H1_PALETTE.gold}4D` }}
                aria-hidden="true"
              />

              <p className="text-sm" style={{ color: H1_PALETTE.muted }}>
                Already training with H1?{" "}
                <button
                  type="button"
                  onClick={() =>
                    smoothScrollToElement("h1-consultation-form", {
                      focus: true,
                    })
                  }
                  className="font-semibold underline-offset-4 transition-colors hover:underline"
                  style={{ color: H1_PALETTE.gold }}
                >
                  Send us your results
                </button>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
