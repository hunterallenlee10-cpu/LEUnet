import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Workflow } from "lucide-react";
import { automationAudit, leeSystemsRoutes } from "@/data/lee-systems";

const automationPoints = [
  "Answers every new lead in under a minute",
  "Handles intake, booking and reminders",
  "Follows up until the customer gives an answer",
  "Requests reviews and chases invoices for you",
];

/**
 * The two offerings, sized to say which one leads: automation takes two of
 * three columns on desktop and carries the list and the main button; websites
 * is the narrower card beside it. On a phone they stack in the same order.
 */
export function LeeSystemsOfferingsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            What We Do
          </p>
          <h2 className="heading-lg text-white">Two ways we take work off your plate</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col rounded-2xl border border-brass-400/40 bg-gradient-to-br from-brass-400/[0.10] via-white/[0.02] to-transparent p-8 md:p-10 lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-brass-400/40 bg-brass-400/10">
                <Workflow className="h-6 w-6 text-brass-300" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-brass-400/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brass-300">
                Our main service
              </span>
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Business Automation
            </h3>
            <p className="mb-6 max-w-xl text-lg leading-relaxed text-neutral-300">
              Custom systems, built mostly with n8n and AI, that run the
              repetitive parts of your business the same way every time.
            </p>
            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {automationPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-neutral-200">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-400"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <Link
                href={leeSystemsRoutes.automation}
                className="btn-ls-primary group inline-flex items-center justify-center gap-2"
              >
                Explore Automation
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <p className="self-center text-sm text-neutral-400">
                Starts with a {automationAudit.price.toLowerCase()} {automationAudit.name}.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04]">
              <Globe className="h-5 w-5 text-neutral-300" aria-hidden="true" />
            </span>
            <h3 className="mb-3 text-2xl font-bold text-white">Website Builds</h3>
            <p className="mb-5 leading-relaxed text-neutral-400">
              Conversion-focused websites for small businesses: clear, fast on a
              phone, and built to turn visitors into enquiries.
            </p>
            <p className="mb-8 flex items-start gap-2 text-sm font-semibold text-neutral-200">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass-300" aria-hidden="true" />
              Fully built before you pay anything.
            </p>
            <Link
              href={leeSystemsRoutes.websites}
              className="group mt-auto inline-flex items-center gap-2 self-start rounded font-semibold text-brass-300 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-300"
            >
              See Website Builds
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
