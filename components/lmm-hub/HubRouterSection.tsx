import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hubOfferings } from "@/components/lmm-hub/hubOfferings";

/**
 * The close. The hub converts by routing, not by collecting.
 *
 * THERE IS NO FORM HERE, AND ONE MUST NOT BE ADDED. Every enquiry form on this
 * site posts to its own route under app/api and emails with a subject line
 * naming the form it came from, and that subject line is how three kinds of
 * lead are told apart in one shared inbox - docs/WEBSITES.md calls it
 * load-bearing copy rather than a formatting detail. A generic "Lee Marketing
 * Mastery" form would need a fourth route and a fourth subject line meaning
 * "one of the three, unspecified", which is strictly worse than the visitor
 * spending one more click to say which. So each button deep-links into the
 * offering's own form and the enquiry arrives already labelled.
 *
 * The buttons carry each deep page's ACTUAL primary CTA text rather than a
 * house style for all three. A visitor clicks "Get a Free Website Quote" here
 * and lands on a page whose button says "Get a Free Website Quote" - the
 * promise and the destination match word for word, which is the cheapest way to
 * stop a click feeling like a redirect.
 */
export function HubRouterSection() {
  return (
    <section id="start" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="section-container text-center">
        {/* Named here, unlike the hero mark: no adjacent text identifies the
            brand at this point in the page. */}
        <Image
          src="/lee-marketing-mastery-logo.png"
          alt="Lee Marketing Mastery"
          width={80}
          height={80}
          loading="lazy"
          className="mx-auto mb-8 h-20 w-20 rounded-full"
        />

        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          Start With the One Closest to Today&apos;s Problem.
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-neutral-300">
          Every one of the three starts the same way - a conversation about what
          you are actually trying to fix. Pick whichever is nearest and we will
          tell you honestly if it is the wrong one.
        </p>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {hubOfferings.map(({ id, name, Icon, formHref, formCta }) => (
            <li key={id}>
              <Link
                href={formHref}
                className="group flex h-full flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                  <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  {name}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400">
                  {formCta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12">
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-400 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
          >
            Return to Lee Enterprises Unlimited
          </Link>
        </p>
      </div>
    </section>
  );
}
