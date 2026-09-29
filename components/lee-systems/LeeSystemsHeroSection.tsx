import { SignalRoutes } from "@/components/lee-systems/SignalRoutes";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystems, leeSystemsAnchors } from "@/data/lee-systems";

/**
 * The Lee Systems Co. main page hero, lit by a warm-right/cool-left orb pair
 * with Signal Routes drawn over it. All three buttons stay on the page: the
 * free call scrolls to the form, and the other two to the automation and
 * websites sections (they went to pages of their own until those folded into
 * this one, 2026-09-29).
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
          built to turn visitors into inquiries, with every form feeding
          straight into the same system, so you never lose another lead to a
          competitor.
        </p>

        {/* Three buttons of one size: a fixed height so the borderless brass
            button matches the outlined ones, and a shared width that fits the
            longest label. Stacked at full width on a phone. */}
        <div className="mx-auto flex max-w-xs flex-col items-stretch justify-center gap-4 md:max-w-none md:flex-row md:items-center">
          <BookCallLink
            href={`#${leeSystemsAnchors.form}`}
            className="h-12 px-4 md:w-56"
          />
          <a
            href={`#${leeSystemsAnchors.automation}`}
            className="btn-ls-secondary inline-flex h-12 items-center justify-center px-4 text-center md:w-56"
          >
            See what we automate
          </a>
          <a
            href={`#${leeSystemsAnchors.websites}`}
            className="btn-ls-secondary inline-flex h-12 items-center justify-center px-4 text-center md:w-56"
          >
            See website builds
          </a>
        </div>
      </div>
    </section>
  );
}
