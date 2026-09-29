import { ChevronDown, ShieldCheck } from "lucide-react";
import { BM_OFFER_ID, bmOffer } from "@/data/business-mastery";
import { BmApplicationForm } from "@/components/business-mastery/BmApplicationForm";
import { companyInfo } from "@/data/company";
import { site } from "@/data/site";

const afterApplySteps = [
  "Send your application. No payment is taken.",
  "Hunter reviews it and follows up personally.",
  site.businessMastery.platform
    ? `You get access to the community on ${site.businessMastery.platform}.`
    : site.businessMastery.afterJoining,
];

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
          <p className="bm-eyebrow">
            {bmOffer.eyebrow}
          </p>
          <h2 className="heading-lg text-white">{bmOffer.heading}</h2>
          {/* How membership is paid for, and the price once one is set in
              data/site.ts. Stated up front so nobody applies thinking it is
              free. */}
          {(site.businessMastery.format || site.businessMastery.price) && (
            <p className="mt-4 text-lg text-neutral-300">
              {[site.businessMastery.format, site.businessMastery.price]
                .filter(Boolean)
                .join(": ")}
              .
            </p>
          )}
        </div>

        {/* Scarcity, only when the owner states it in data/site.ts. The
            "Limited Spots" box that sat here came off on 2026-09-28 at the
            owner's request, with the homepage's "4 Spots Remain" line. Any
            wording set there must be literally true, and shows exactly once,
            here. */}
        {site.businessMastery.scarcity && (
          <p className="mt-8 text-center text-base font-semibold text-white">
            {site.businessMastery.scarcity}
          </p>
        )}

        {/* 90-day guarantee. Native <details> keeps it dependency-free; the
            full legal terms are a Phase C gate — see docs/BUSINESS-MASTERY.md
            §6 — so the body carries the summary and points people to email
            for the details. */}
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
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {bmOffer.guaranteeTermsNote}{" "}
              <a
                href={`mailto:${companyInfo.contactEmail}`}
                className="font-medium text-amber-400 underline-offset-4 hover:underline"
              >
                {companyInfo.contactEmail}
              </a>
            </p>
          </div>
        </details>

        {/* What happens after you apply, while joining is by application
            (`joinMode` "apply" in data/site.ts). The third step is the owner's
            own description of joining; a named platform replaces it once
            `platform` is set. */}
        {site.businessMastery.joinMode === "apply" && (
          <div className="mx-auto mt-14 max-w-3xl">
            <h3 className="mb-10 text-center text-xl font-bold text-white">
              What happens after you apply
            </h3>
            {/* A drawn line, not boxes (the owner's request, 2026-09-29):
                numbered stops on a gold line that draws itself as the steps
                scroll into view, across from md up and down the left below
                it. */}
            <div className="relative">
              <span className="bm-steps-line bm-steps-line--x" aria-hidden="true" />
              <span className="bm-steps-line bm-steps-line--y" aria-hidden="true" />
              <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
                {afterApplySteps.map((step, i) => (
                  <li
                    key={step}
                    className="grid grid-cols-[2.5rem_1fr] items-start gap-4 md:flex md:flex-col md:items-center md:text-center"
                  >
                    <span
                      aria-hidden="true"
                      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/60 bg-neutral-950 font-mono text-sm font-bold tabular-nums text-amber-400 shadow-[0_0_0_6px_rgb(10_10_10)]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-2 leading-relaxed text-neutral-200 md:max-w-[15rem] md:pt-0">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <div className="mt-14">
          <BmApplicationForm />
        </div>
      </div>
    </section>
  );
}
