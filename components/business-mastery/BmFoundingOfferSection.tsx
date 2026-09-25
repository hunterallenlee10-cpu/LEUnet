import { ChevronDown, ShieldCheck } from "lucide-react";
import { BM_OFFER_ID, bmOffer } from "@/data/business-mastery";
import { BmApplicationForm } from "@/components/business-mastery/BmApplicationForm";
import { BmComingSoon } from "@/components/business-mastery/BmComingSoon";

/**
 * Section 6 — the conversion section every CTA on the page points at. The
 * guarantee expandable is a native <details>, so it works with no JS and the
 * section stays a server component around the one client child (the form).
 *
 * tabIndex={-1} on the section: every CTA is an anchor to this id, and the
 * homepage's smoothScrollToElement pattern focuses its target for keyboard
 * users — a focusable landing target keeps hash navigation equivalent.
 */
export function BmFoundingOfferSection() {
  return (
    <section
      id={BM_OFFER_ID}
      tabIndex={-1}
      className="relative isolate overflow-hidden py-20 outline-none md:py-28"
    >
      <div className="absolute inset-0 section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 40%, rgba(251, 191, 36, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            {bmOffer.eyebrow}
          </p>
          <h2 className="heading-lg text-white">{bmOffer.heading}</h2>
        </div>

        {/* Limited-spots box. This carried the "5 / 20 FOUNDING MEMBERS"
            counter and its progress bar until the owner asked for the words
            alone — the same call already made on the homepage teaser (see
            docs/BUSINESS-MASTERY.md §9). No figure renders anywhere now, so
            §6.2's true-count rule no longer has a number to hold to; this box
            states scarcity without quantifying it, and stays true only while
            spots really are limited.

            Sized to its content rather than the old `max-w-md`: one short line
            in a 448px box reads as something that failed to load. */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-xl border border-amber-400/30 bg-neutral-950/80 px-7 py-4">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
            </span>
            {/* The negative margin pulls back the trailing letter-space that
                tracking adds after the final S, so the box pads evenly. */}
            <span className="-mr-[0.25em] text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Limited Spots
            </span>
          </div>
        </div>

        {/* 90-day guarantee. Native <details> keeps it dependency-free; the
            full legal terms are a Phase C gate — see docs/BUSINESS-MASTERY.md
            §6 — so the body carries the summary and the coming-soon marker. */}
        <details className="group mx-auto mt-8 max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-3">
              <ShieldCheck
                className="h-6 w-6 shrink-0 text-amber-400"
                aria-hidden="true"
              />
              <span className="text-base font-bold text-white sm:text-lg">
                {bmOffer.guaranteeHeading}
              </span>
            </span>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-neutral-800 p-5 text-left">
            <p className="leading-relaxed text-neutral-300">
              {bmOffer.guaranteeSummary}
            </p>
            <div className="mt-5">
              <BmComingSoon note={bmOffer.guaranteeTermsNote} />
            </div>
          </div>
        </details>

        <div className="mt-14">
          <BmApplicationForm />
        </div>
      </div>
    </section>
  );
}
