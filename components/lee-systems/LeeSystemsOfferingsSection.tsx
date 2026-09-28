import Link from "next/link";
import { Check, Globe, Workflow } from "lucide-react";
import { leeSystemsRoutes } from "@/data/lee-systems";

const automationPoints = [
  "Answers your business calls 24/7 with an AI assistant",
  "Answers every new lead in under a minute",
  "Handles intake, booking and reminders",
  "Follows up until the customer gives an answer",
  "Requests reviews and chases invoices for you",
  "Updates your CRM automatically",
];

/**
 * The two offerings, sized to say which one leads: automation takes two of
 * three columns on desktop and carries the list and the main button; websites
 * is the narrower card beside it. On a phone they stack in the same order.
 */
export function LeeSystemsOfferingsSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">What we do</p>
          <h2 className="heading-lg text-white">Two ways we take work off your plate</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col rounded-xl border border-brass-400/40 bg-gradient-to-br from-brass-400/[0.10] via-white/[0.02] to-transparent p-6 md:p-8 lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <Workflow className="h-7 w-7 text-brass-300" aria-hidden="true" />
              <span className="text-sm font-semibold text-brass-300">
                Our main service
              </span>
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Business automation
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
            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link
                href={leeSystemsRoutes.automation}
                className="btn-ls-primary inline-flex min-h-11 items-center justify-center"
              >
                Explore automation
              </Link>
              <p className="text-sm text-neutral-400">
                Every project starts with a free consultation call.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-8">
            <Globe className="mb-5 h-7 w-7 text-neutral-300" aria-hidden="true" />
            <h3 className="mb-3 text-2xl font-bold text-white">Website builds</h3>
            <p className="mb-5 leading-relaxed text-neutral-400">
              Conversion-focused websites for small businesses: clear, fast on a
              phone, and built to turn visitors into inquiries.
            </p>
            <p className="mb-8 flex items-start gap-2 text-sm font-semibold text-neutral-200">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-300" aria-hidden="true" />
              Mobile-first, fast, with lead forms, and you own it.
            </p>
            <Link
              href={leeSystemsRoutes.websites}
              className="mt-auto inline-flex min-h-11 items-center self-start rounded font-semibold text-brass-300 underline-offset-4 hover:underline"
            >
              See website builds
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
