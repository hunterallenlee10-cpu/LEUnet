import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { THREAD_PALETTE, threadCopy } from "@/data/thread";
import { ThreadReveal } from "@/components/thread/ThreadReveal";
import {
  threadPrimaryButtonClass,
  threadPrimaryButtonStyle,
  threadSecondaryButtonClass,
  threadSecondaryButtonStyle,
} from "@/components/thread/ThreadUI";

const { hero } = threadCopy;

export function ThreadHeroSection() {
  return (
    // `isolate` is load-bearing. Without a stacking context here, the -z-10
    // wash below paints *behind* this section's own background rather than on
    // top of it, because position:relative with z-index:auto does not create
    // one. The orbs were in the markup but never visible.
    <section
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: THREAD_PALETTE.ink }}
    >
      {/* Ambient wash, matching the treatment on the other venture pages.

          Each orb is a pair: the outer element drifts on float-1/2/3, the
          inner one breathes on hero-logo-aura. Drift alone is close to
          invisible here — at blur-3xl on near-black, a 50px translation of a
          low-opacity blob changes almost no pixels. The opacity swing in the
          aura keyframe is what the eye actually reads. They are split across
          two elements because both animate `transform`, which one element
          cannot do twice.

          Every keyframe used already exists in globals.css, so nothing was
          added to a file docs/THREAD.md §2 keeps this page out of. Periods are
          mismatched and prime-ish so the three orbs never resynchronise into a
          visible pulse.

          prefers-reduced-motion is covered twice over: the explicit list at
          globals.css:204 names hero-logo-aura, and the rule at :380 collapses
          every animation-duration to 0.01ms. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -top-24 right-1/4"
          style={{
            animation: "float-1 22s ease-in-out infinite",
            willChange: "transform",
          }}
        >
          <div
            className="h-96 w-96 rounded-full blur-3xl"
            style={{
              backgroundColor: `${THREAD_PALETTE.champagne}66`,
              animation: "hero-logo-aura 9s ease-in-out infinite",
              willChange: "transform, opacity",
            }}
          />
        </div>

        <div
          className="absolute bottom-0 left-1/5"
          style={{
            animation: "float-2 29s ease-in-out infinite",
            willChange: "transform",
          }}
        >
          <div
            className="h-80 w-80 rounded-full blur-3xl"
            style={{
              backgroundColor: `${THREAD_PALETTE.bone}33`,
              animation: "hero-logo-aura 13s ease-in-out infinite",
              willChange: "transform, opacity",
            }}
          />
        </div>

        {/* Sits behind the wordmark and reads as depth rather than a distinct
            light source. */}
        <div
          className="absolute left-1/2 top-1/3"
          style={{
            animation: "float-3 36s ease-in-out infinite",
            willChange: "transform",
          }}
        >
          <div
            className="h-72 w-72 rounded-full blur-3xl"
            style={{
              backgroundColor: `${THREAD_PALETTE.champagne}44`,
              animation: "hero-logo-aura 17s ease-in-out infinite",
              willChange: "transform, opacity",
            }}
          />
        </div>
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Above the fold, so these resolve on mount rather than on scroll.
              Staggered top to bottom so the eye is led down to the CTAs. */}
          <div>
            <ThreadReveal>
              <span
                className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{
                  borderColor: THREAD_PALETTE.champagne,
                  color: THREAD_PALETTE.champagne,
                }}
              >
                {hero.badge}
              </span>
            </ThreadReveal>

            <ThreadReveal delay={80}>
              <h1
                className="heading-xl mt-6"
                style={{ color: THREAD_PALETTE.bone }}
              >
                {hero.title}
                <span
                  className="block"
                  style={{ color: THREAD_PALETTE.champagne }}
                >
                  {hero.titleAccent}
                </span>
              </h1>
            </ThreadReveal>

            <ThreadReveal delay={160}>
              <p
                className="mt-6 max-w-xl text-lg leading-relaxed"
                style={{ color: THREAD_PALETTE.muted }}
              >
                {hero.description}
              </p>
            </ThreadReveal>

            <ThreadReveal delay={240}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#catalog"
                  className={threadPrimaryButtonClass}
                  style={threadPrimaryButtonStyle}
                >
                  {hero.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#order-request"
                  className={threadSecondaryButtonClass}
                  style={threadSecondaryButtonStyle}
                >
                  {hero.secondaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </ThreadReveal>

            {/* Prices are quoted per order rather than listed, so this line
                stops the missing prices from reading as an oversight. */}
            <ThreadReveal delay={320}>
              <p
                className="mt-6 text-sm"
                style={{ color: THREAD_PALETTE.muted }}
              >
                {hero.note}
              </p>
            </ThreadReveal>
          </div>

          {/* The source PNG is square with the wordmark banded across the middle,
              so object-contain sizes it off this height until the column width
              takes over. Height is what makes the logo read larger. */}
          <div className="relative flex h-80 items-center justify-center md:h-[26rem] lg:h-[32rem]">
            <div
              className="absolute inset-8 -z-10 rounded-full blur-3xl opacity-25"
              style={{ backgroundColor: `${THREAD_PALETTE.champagne}55` }}
            />
            <Image
              src="/logos/thread-logo.png"
              alt="Thread T-Shirts logo"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
