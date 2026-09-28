import Link from "next/link";
import { Check } from "lucide-react";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LeeSystemsHowItWorksSection } from "@/components/lee-systems/LeeSystemsHowItWorksSection";
import { LeeSystemsFinalCTA } from "@/components/lee-systems/LeeSystemsFinalCTA";
import { PricingPromiseSection } from "@/components/shared/PricingPromiseSection";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsIndustries, leeSystemsRoutes } from "@/data/lee-systems";

type IndustryId = (typeof leeSystemsIndustries)[number]["id"];

/**
 * A page written for one industry, for the owner to send prospects in it:
 * /lee-systems/law-firms and /lee-systems/home-services.
 *
 * Built only from copy already on the site, so it makes no claim the other
 * pages don't: the industry's summary (as the H1) and examples from
 * data/lee-systems.ts, the automation page's opening line, the pricing
 * promise, the Audit, Build, Run steps and the closing call to action.
 */
export function IndustryPage({ industryId }: { industryId: IndustryId }) {
  const industry = leeSystemsIndustries.find(({ id }) => id === industryId);
  if (!industry) return null;
  const audience = industry.name.toLowerCase();

  return (
    <div className="min-h-screen bg-neutral-950">
      <MainHeader />

      <main className="pt-20">
        <section className="relative isolate overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10 section-fade" aria-hidden="true">
            <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-brass-400/10 blur-3xl" />
            <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-slate-400/5 blur-3xl" />
          </div>

          <div className="section-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-6 text-sm font-semibold text-brass-300">
                Lee Systems Co. for {audience}
              </p>
              <h1 className="heading-xl mb-6 text-white">{industry.summary}</h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
                We build custom AI systems that answer your calls and new leads
                in seconds, handle intake, send follow-ups, request reviews and
                clear out the admin that eats your week.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <BookCallLink />
                <Link
                  href={leeSystemsRoutes.automation}
                  className="btn-ls-secondary inline-flex min-h-11 items-center justify-center"
                >
                  See everything we automate
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="industry-examples-title"
          className="relative isolate py-20 md:py-28"
        >
          <div className="section-container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 id="industry-examples-title" className="heading-lg text-white">
                What we automate for {audience}
              </h2>
            </div>
            <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
              {industry.examples.map((example) => (
                <li
                  key={example}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-neutral-200"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brass-300" aria-hidden="true" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PricingPromiseSection />
        <LeeSystemsHowItWorksSection />
        <LeeSystemsFinalCTA />
      </main>

      <MainFooter />
    </div>
  );
}
