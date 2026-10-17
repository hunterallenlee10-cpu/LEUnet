import { bmTenets, bmTenetsIntro } from "@/data/business-mastery";

/**
 * Section 5 — our core tenets: Speed, Money In, For Free.
 *
 * WHAT IS OFF THIS SECTION, and kept in the data file on the owner's terms
 * (taking a block off a page is not the same decision as deleting the words):
 *
 *  - The manifesto, `bmCoreBelief` (off 2026-09-29, at the owner's request):
 *    the "What we believe" eyebrow, "Nobody builds something great alone.",
 *    its message, the lead-in line and the glowing "NETWORK." payoff. It was
 *    this section's first movement, over the tenets, since the two merged on
 *    2026-09-28 (BmTenetsSection.tsx was deleted then; this file kept the
 *    manifesto's name). Putting it back means the tenets' heading steps back
 *    down to an h3 under the manifesto's h2, and their titles to h4.
 *  - The pivot, `bmTransition` (off 2026-09-13). First person and about the
 *    founder's story, which is not on this page; check that before restoring.
 *  - The clarifier, `bmCoreBelief.clarifier` (off 2026-09-15), and the Core
 *    Philosophy block, `bmCoreBelief.philosophyTitle` and `.philosophy` (off
 *    2026-09-07). Both sat in the manifesto, so both come back with it.
 *
 * The tenets are numbered rows rather than cards (2026-09-29): a large gold
 * numeral beside each, hairlines between, each row rising in as it scrolls
 * into view (`.bm-reveal`, scroll-driven, still under reduced motion).
 *
 * No glow layer: the page alternates one (2, 4 and 6 have it; 3 and 5
 * don't), and this is a plain slot.
 *
 * Server component, no client boundary. The only motion is CSS.
 */
export function BmManifestoSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2 className="heading-lg text-white text-balance">
              {bmTenetsIntro.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400 text-pretty">
              {bmTenetsIntro.description}
            </p>
          </div>

          <ol className="mx-auto max-w-4xl">
            {bmTenets.map((tenet) => (
              <li
                key={tenet.id}
                className="bm-reveal group grid grid-cols-[4.5rem_1fr] items-center gap-x-6 border-t border-white/10 py-8 last:border-b sm:grid-cols-[7rem_1fr] md:grid-cols-[9rem_1fr] md:gap-x-10 md:py-10"
              >
                <span
                  className="bm-tenet-num text-5xl font-bold tabular-nums leading-none sm:text-7xl md:text-8xl"
                  aria-hidden="true"
                >
                  {String(tenet.number).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {tenet.title}
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed text-neutral-400 text-pretty">
                    {tenet.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
