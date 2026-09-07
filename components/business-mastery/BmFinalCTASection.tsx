import { ArrowRight } from "lucide-react";
import { BM_OFFER_ID, bmFinalCta } from "@/data/business-mastery";

/**
 * Section 10 — the closing conversion section. The CTA is an in-page anchor
 * back up to the founding offer and its application form, the page's one
 * action; the global scroll-smooth handles the ride.
 *
 * `bmFinalCta.supporting` used to run under the button and came off at the
 * owner's request (2026-09-07). The section ends on the action now, which is
 * what a closing section is for — nothing follows the button but the footer.
 * The string is intact in the data file with a note on what to check before
 * putting it back.
 */
export function BmFinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 50%, rgba(251, 191, 36, 0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative text-center">
        <h2 className="heading-xl mb-6 uppercase text-white">
          {bmFinalCta.heading}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
          {bmFinalCta.description}
        </p>

        <a
          href={`#${BM_OFFER_ID}`}
          className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base uppercase tracking-wide sm:text-lg"
        >
          {bmFinalCta.cta}
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
