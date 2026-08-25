import { ArrowRight } from "lucide-react";
import { BM_OFFER_ID, bmHero } from "@/data/business-mastery";

/**
 * Big, minimal, manifesto-like — the plan's words for this section, and the
 * reason it shares no layout with the homepage hero. No logo column, no stat
 * cards: one centred column of type on a dark ground, and one action.
 *
 * A server component on purpose. The CTA is a plain anchor: `html` carries
 * `scroll-smooth` and `scroll-padding-top: 80px` globally, so an in-page
 * hash link gets the smooth scroll and the header offset with no JS at all.
 */
export function BmHeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-black">
      {/* Static warmth, not the homepage's animated veil — this hero is about
          the words. A gold pool high centre, and a floor fade so the first
          content section below never shows a hard seam. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 12%, rgba(251, 191, 36, 0.14) 0%, rgba(180, 120, 20, 0.05) 45%, transparent 75%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-neutral-950" />
      </div>

      <div className="section-container relative w-full py-24 text-center md:py-32">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Lee Enterprises Unlimited
        </p>

        <h1 className="mx-auto max-w-5xl text-[44px] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[clamp(60px,6vw,92px)]">
          LEU Business{" "}
          <span className="gradient-text">Mastery</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-neutral-200 sm:text-2xl">
          {bmHero.manifesto}
        </p>

        <p className="mt-10 text-2xl font-bold text-amber-400 sm:text-3xl">
          {bmHero.subtitle}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300">
          {bmHero.description}
        </p>

        <div className="mt-12 flex justify-center">
          <a
            href={`#${BM_OFFER_ID}`}
            className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base uppercase tracking-wide sm:text-lg"
          >
            {bmHero.cta}
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
