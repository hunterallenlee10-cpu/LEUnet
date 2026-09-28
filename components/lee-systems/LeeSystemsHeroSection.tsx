import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignalRoutes } from "@/components/lee-systems/SignalRoutes";
import {
  automationAudit,
  leeSystems,
  leeSystemsAnchors,
  leeSystemsRoutes,
} from "@/data/lee-systems";

/**
 * The Lee Systems Co. main page hero. Lit by the same warm-right/cool-left orb
 * pair as the homepage teaser (components/sections/LeeSystemsSection.tsx), so
 * a visitor clicking through lands on the light they just left; if one pair
 * changes, change the other with it.
 */
export function LeeSystemsHeroSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 section-fade" aria-hidden="true">
        <div className="absolute -top-16 right-[18%] h-[34rem] w-[34rem] max-w-[80vw] translate-x-1/2 rounded-full bg-brass-400/[0.16] blur-3xl" />
        <div className="absolute -bottom-16 left-[20%] h-[28rem] w-[28rem] max-w-[70vw] -translate-x-1/2 rounded-full bg-slate-400/[0.09] blur-3xl" />
        <SignalRoutes />
      </div>

      <div className="section-container relative text-center">
        <div className="mb-8">
          <p className="text-lg font-bold tracking-[0.2em] text-white">
            LEE SYSTEMS CO.
          </p>
          <p className="text-xs text-neutral-400">{leeSystems.tagline}</p>
        </div>

        <h1 className="heading-xl mx-auto mb-6 max-w-4xl text-white">
          {leeSystems.headline}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
          We build custom systems that answer new leads, handle intake, send
          follow-ups, request reviews and clear out the admin busywork, so
          nothing slips through on the busy weeks.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`${leeSystemsRoutes.automation}#${leeSystemsAnchors.auditForm}`}
            className="btn-ls-primary group inline-flex items-center justify-center gap-2"
          >
            Book a {automationAudit.price} {automationAudit.name}
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href={leeSystemsRoutes.automation}
            className="btn-ls-secondary inline-flex items-center justify-center gap-2"
          >
            See What We Automate
          </Link>
        </div>

        <p className="mt-6 text-sm text-neutral-400">
          Serving {leeSystems.serviceArea}.
        </p>
      </div>
    </section>
  );
}
