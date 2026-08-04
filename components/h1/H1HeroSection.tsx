"use client";

import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import {
  H1_PALETTE,
  H1_PHONE,
  H1_PHONE_HREF,
  h1BlockNote,
  h1ProofPoints,
} from "@/data/h1";
import { H1ProofRotator } from "@/components/h1/H1ProofRotator";

/**
 * The hero leads with evidence rather than with the wordmark.
 *
 * It used to give half its width to the H1 mark — a flat white glyph that
 * works as a label but not as a picture, and that told a visitor nothing the
 * headline had not already said — while the only hard proof the page owns sat
 * in a strip below the fold. Someone deciding whether remote coaching works
 * wants to see that it worked for somebody, so the measured results come first
 * and everything else supports them.
 *
 * The headline is still the `<h1>`. Only its rendered size changed; it is the
 * page's semantic heading regardless of how large it is drawn.
 *
 * Nothing in the background animates. All the hero's motion lives inside the
 * readout, behind its pause control, which is what makes a single control
 * enough to satisfy WCAG 2.2.2 for the whole section.
 */
export function H1HeroSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-32">
      <div className="h1c-hero-bg" aria-hidden="true" />

      <div className="section-container relative">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 md:mb-10"
          style={{
            borderColor: `${H1_PALETTE.gold}4D`,
            backgroundColor: `${H1_PALETTE.gold}14`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: H1_PALETTE.gold }}
          />
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: H1_PALETTE.gold }}
          >
            REMOTE STRENGTH &amp; CONDITIONING
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <H1ProofRotator points={h1ProofPoints} />

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white md:mt-9 md:text-4xl">
              Train Harder.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${H1_PALETTE.gold}, ${H1_PALETTE.goldDeep})`,
                }}
              >
                Perform Higher.
              </span>
            </h1>

            {/* Shortened from the original five sentences, which ran nine lines
                at 390px. Not because the old copy pushed the button off the
                first screen — measured, it did not; the CTA sat at 608px in an
                844px viewport — but because the readout above costs real height
                and this is where it is cheapest to buy it back. Net at 390px:
                CTA top 608 before, 634 after, both comfortably visible. */}
            <p
              className="mt-4 max-w-xl text-lg leading-relaxed"
              style={{ color: H1_PALETTE.muted }}
            >
              Personalized programming built around your sport, your goals, and
              the equipment you already have — with round-the-clock access to
              your coaches.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row md:mt-8">
              <button
                onClick={() =>
                  smoothScrollToElement("h1-consultation-form", { focus: true })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: H1_PALETTE.chalk,
                  color: H1_PALETTE.ink,
                }}
              >
                Book a Free Consultation
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => smoothScrollToElement("h1-pricing")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 font-semibold transition-colors duration-200"
                style={{
                  borderColor: H1_PALETTE.gold,
                  color: H1_PALETTE.gold,
                }}
              >
                See Packages
              </button>
            </div>
          </div>

          {/* The mark keeps a place here rather than being dropped with the
              column it used to fill. It is the only brand image above the fold
              and it is priority-loaded; losing it silently would be a brand
              change nobody asked for. */}
          <aside className="flex flex-col gap-8">
            <Image
              src="/logos/h1-performance-white.png"
              alt="H1 Performance logo"
              width={520}
              height={520}
              priority
              className="h-auto w-full max-w-[210px] object-contain"
            />

            {/* A program attribute, not a result, so it sits beside the
                rotating figures instead of among them. */}
            <div
              className="rounded-lg border p-4"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: `${H1_PALETTE.steel}B3`,
              }}
            >
              <div
                className="text-2xl font-bold tabular-nums tracking-tight"
                style={{ color: H1_PALETTE.gold }}
              >
                {h1BlockNote.figure}
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {h1BlockNote.label}
              </div>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {h1BlockNote.detail}
              </p>
            </div>

            <p className="text-sm" style={{ color: H1_PALETTE.muted }}>
              All ages, all sports, trained remotely. Or reach Hunter directly
              at{" "}
              <a
                href={H1_PHONE_HREF}
                className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 transition-colors hover:underline"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {H1_PHONE}
              </a>
              .
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
