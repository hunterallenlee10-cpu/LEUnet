import Link from "next/link";
import { AutomationFlowVisual } from "@/components/automation/AutomationFlowVisual";
import { LeeSystemsSiblingLinks } from "@/components/lee-systems/LeeSystemsSiblingLinks";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsRoutes } from "@/data/lee-systems";

/**
 * Opens straight on the headline, with the footnote naming the company. The
 * owner dropped the "Business automation" label and the "Built mostly with
 * n8n and AI" line on 2026-09-29.
 */
export function AutomationHeroSection() {
  return (
    // `main` already clears the fixed header (pt-20), so the top padding here
    // is only the breathing room above the headline, not a second header gap.
    <section className="relative isolate overflow-hidden pb-24 pt-10 md:pb-32 md:pt-14">
      <div className="absolute inset-0 -z-10 section-fade">
        <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-brass-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-slate-400/5 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <h1 className="heading-xl mb-6 text-white">
              Every lead answered. Every follow-up sent.{" "}
              <span className="text-brass-300">Nothing missed.</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              We build custom AI systems that answer your calls and new leads in
              seconds, handle intake, send follow-ups, request reviews and clear
              out the admin that eats your week. You keep running the work. The
              system keeps everything else moving.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <BookCallLink />
              <a
                href="#automation-services"
                className="btn-ls-secondary inline-flex min-h-11 items-center justify-center text-center"
              >
                See what we automate
              </a>
            </div>

            <p className="mt-6 text-sm">
              <Link
                href={leeSystemsRoutes.home}
                className="font-semibold text-neutral-300 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
              >
                Part of Lee Systems Co.
              </Link>
            </p>
          </div>

          <div>
            <LeeSystemsSiblingLinks current={leeSystemsRoutes.automation} />

            <div>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-400">
                  Example: a new lead
                </p>
                <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <span className="ls-status h-1.5 w-1.5 rounded-full bg-brass-400" />
                  Running
                </span>
              </div>
              <AutomationFlowVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
