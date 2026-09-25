import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { leeSystemsRoutes } from "@/data/lee-systems";

/**
 * The hand-off from the secondary offer to the primary one: a site brings in
 * leads, and automation is what makes sure every one of them gets answered.
 */
export function WebsitesBridgeSection() {
  return (
    <section className="relative isolate py-16 md:py-20">
      <div className="section-container">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-xl border border-white/10 bg-white/[0.04] p-8 md:flex-row md:items-center md:p-10">
          <Workflow className="shrink-0 h-7 w-7 text-brass-300" aria-hidden="true" />
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
              Once your site brings in leads, we can automate the follow-up.
            </h2>
            <p className="text-neutral-400">
              Instant replies, reminders and follow-up sequences, so every
              enquiry the site captures gets answered.
            </p>
          </div>
          <Link
            href={leeSystemsRoutes.automation}
            className="btn-ls-secondary group inline-flex shrink-0 items-center gap-2"
          >
            See Automation
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
