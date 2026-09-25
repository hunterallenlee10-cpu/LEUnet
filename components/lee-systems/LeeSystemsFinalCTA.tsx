import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  automationAudit,
  leeSystems,
  leeSystemsAnchors,
  leeSystemsRoutes,
} from "@/data/lee-systems";

export function LeeSystemsFinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-20 md:py-28">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-400/10 blur-3xl" />
      </div>

      <div className="section-container text-center">
        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          Find out what your business could stop doing by hand.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
          The {automationAudit.name} is {automationAudit.price.toLowerCase()}. We
          reply within {automationAudit.responseTime} and send a written plan
          within {automationAudit.turnaround}.
        </p>

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

        <p className="mt-8 text-sm text-neutral-400">
          Prefer email?{" "}
          <a
            href={`mailto:${leeSystems.contactEmail}`}
            className="font-semibold text-neutral-200 underline underline-offset-4 hover:text-brass-300"
          >
            {leeSystems.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
