import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { THREAD_PALETTE, threadCopy } from "@/data/thread";
import { ThreadReveal } from "@/components/thread/ThreadReveal";
import {
  ThreadHeroBackdrop,
  type ThreadHeroBackdropId,
} from "@/components/thread/ThreadHeroBackdrop";
import {
  threadPrimaryButtonClass,
  threadPrimaryButtonStyle,
  threadSecondaryButtonClass,
  threadSecondaryButtonStyle,
} from "@/components/thread/ThreadUI";

const { hero } = threadCopy;

export function ThreadHeroSection({
  backdrop = "current",
}: {
  /** Temporary, for the /thread-hero-lab comparison page. */
  backdrop?: ThreadHeroBackdropId;
}) {
  return (
    // `isolate` is load-bearing. Without a stacking context here, the -z-10
    // wash below paints *behind* this section's own background rather than on
    // top of it, because position:relative with z-index:auto does not create
    // one. The orbs were in the markup but never visible.
    <section
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: THREAD_PALETTE.ink }}
    >
      <ThreadHeroBackdrop variant={backdrop} />

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
            {backdrop === "current" ? (
              <div
                className="absolute inset-8 -z-10 rounded-full blur-3xl opacity-25"
                style={{ backgroundColor: `${THREAD_PALETTE.champagne}55` }}
              />
            ) : null}
            {/* The artwork is a thin serif outline in a near-bone grey measured
                at roughly #BCBBB7, which is only a few steps off `muted`. The
                filter opens that gap: the drop shadow separates the strokes
                from whatever the backdrop is doing behind them, and the
                brightness lift carries the hairlines in the flourish. */}
            <Image
              src="/logos/thread-logo.png"
              alt="Thread T-Shirts logo"
              fill
              priority
              className="object-contain"
              style={
                backdrop === "current"
                  ? undefined
                  : {
                      // Two tight shadows rather than one wide one. A wide
                      // blur on a wordmark this broad merges into a
                      // rectangular plate behind the mark, which is visible
                      // against any textured backdrop.
                      filter:
                        "brightness(1.16) contrast(1.06) drop-shadow(0 0 1.75rem rgba(11,11,11,0.95)) drop-shadow(0 0 0.4rem rgba(11,11,11,0.85))",
                    }
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
