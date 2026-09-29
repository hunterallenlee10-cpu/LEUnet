import { SignalRoutes } from "@/components/lee-systems/SignalRoutes";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystems, leeSystemsAnchors } from "@/data/lee-systems";

/**
 * The Lee Systems Co. main page hero, lit by a warm-right/cool-left orb pair
 * with Signal Routes drawn over it. One button, centred: the free call, which
 * scrolls to the form. "See what we automate" and "See website builds" came
 * off at the owner's request (2026-09-29); "What we do", straight below,
 * links to both sections.
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
          {leeSystems.headline}{" "}
          <span className="text-brass-300">{leeSystems.headlineAccent}</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
          Customers expect an answer right away, and the first business to
          reply usually wins the job. We build custom AI systems that answer
          your calls and new leads in seconds, follow up automatically, handle
          intake and clear out the admin. Pair it with a fast, modern website
          built to turn visitors into customers, with every form feeding
          straight into the same system, so you never lose another lead to a
          competitor.
        </p>

        {/* The lit gold button the page's other closing asks use, a size up:
            full width up to 20rem on a phone, its own width from 640px. */}
        <div className="flex justify-center">
          <BookCallLink
            variant="glow"
            href={`#${leeSystemsAnchors.form}`}
            arrow
            className="h-14 w-full max-w-xs px-10 text-lg sm:w-auto sm:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
