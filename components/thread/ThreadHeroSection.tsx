import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { THREAD_PALETTE, threadCopy } from "@/data/thread";
import {
  threadPrimaryButtonClass,
  threadPrimaryButtonStyle,
  threadSecondaryButtonClass,
  threadSecondaryButtonStyle,
} from "@/components/thread/ThreadUI";

const { hero } = threadCopy;

export function ThreadHeroSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: THREAD_PALETTE.ink }}
    >
      {/* Ambient wash, matching the treatment on the other venture pages */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -top-24 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: `${THREAD_PALETTE.champagne}44` }}
        />
        <div
          className="absolute bottom-0 left-1/5 h-80 w-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: `${THREAD_PALETTE.bone}33` }}
        />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span
              className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                borderColor: THREAD_PALETTE.champagne,
                color: THREAD_PALETTE.champagne,
              }}
            >
              {hero.badge}
            </span>

            <h1
              className="heading-xl mt-6"
              style={{ color: THREAD_PALETTE.bone }}
            >
              {hero.title}
              <span className="block" style={{ color: THREAD_PALETTE.champagne }}>
                {hero.titleAccent}
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg leading-relaxed"
              style={{ color: THREAD_PALETTE.muted }}
            >
              {hero.description}
            </p>

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

            {/* Prices are quoted per order rather than listed, so this line
                stops the missing prices from reading as an oversight. */}
            <p className="mt-6 text-sm" style={{ color: THREAD_PALETTE.muted }}>
              {hero.note}
            </p>
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
