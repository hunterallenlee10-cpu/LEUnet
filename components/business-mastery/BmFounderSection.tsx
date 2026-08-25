import { bmFounder } from "@/data/business-mastery";
import { BmComingSoon } from "@/components/business-mastery/BmComingSoon";

/**
 * Section 9 — the personal mission. Renders what exists today: the legacy
 * statement and its supporting idea. The full founder story integrates here
 * when the My Story document is written (docs/BUSINESS-MASTERY.md §7); until
 * then the coming-soon marker says so plainly.
 */
export function BmFounderSection() {
  return (
    <section className="bg-neutral-950 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Mission Behind It
          </p>
          <h2 className="heading-lg mb-4 uppercase text-white">
            {bmFounder.heading}
          </h2>
          <p className="text-lg text-neutral-400">{bmFounder.description}</p>

          <figure className="mt-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-400">
              {bmFounder.legacyLabel}
            </p>
            <blockquote className="text-3xl font-bold leading-snug text-white sm:text-4xl">
              &ldquo;{bmFounder.legacy}&rdquo;
            </blockquote>
          </figure>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
            {bmFounder.supporting}
          </p>

          <div className="mt-12">
            <BmComingSoon note={bmFounder.comingSoonNote} />
          </div>
        </div>
      </div>
    </section>
  );
}
