"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { H1_PALETTE, h1Testimonials } from "@/data/h1";

/**
 * Two states, one section. While `h1Testimonials` is empty the placeholder
 * below holds the space with copy that reads as deliberate; the moment a real
 * quote is added to `data/h1.ts` the grid replaces it with no other change.
 *
 * The placeholder invents nothing — no sample quote, no fake name, no star
 * rating. It says the testimonies are coming and points current athletes at the
 * form, which is true and costs the page no credibility.
 *
 * Grid cards carry an optional athlete photo, masked with the same bottom fade
 * as the coach photography so the page's two photo treatments read as one. A
 * card without a photo starts at the quote glyph — no gap, no placeholder art.
 */

/**
 * The coach-card fade, with shorter stops for a shorter header — see
 * H1CoachesSection for why the fade is a mask on the photo rather than a
 * gradient painted over it (the card surface below is a tint, not ink, so an
 * ink-matched overlay would band at the seam).
 */
const PHOTO_FADE_MASK =
  "linear-gradient(to bottom, black calc(100% - 4rem), rgba(0, 0, 0, 0.25) calc(100% - 2rem), rgba(0, 0, 0, 0.08) calc(100% - 1rem), transparent calc(100% - 0.25rem))";
export function H1TestimonialsSection() {
  const hasTestimonials = h1Testimonials.length > 0;

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
          /* Flex-wrap rather than a grid so a partial row centers itself.
             The list grows one athlete at a time, and a lone card pinned to
             the left of a three-column grid reads as unfinished rather than
             curated. Widths mirror the grid it replaced: full, halves from
             `md`, thirds from `lg`, minus their share of the 1.5rem gaps. */
          <div className="flex flex-wrap justify-center gap-6">
            {h1Testimonials.map((testimonial) => (
              <figure
                key={testimonial.id}
                className="h1-live flex w-full flex-col overflow-hidden rounded-xl border md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
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
