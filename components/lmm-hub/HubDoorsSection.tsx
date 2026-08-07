import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { hubOfferings } from "@/components/lmm-hub/hubOfferings";

/**
 * The three offerings, as three doors. This is the section the page exists for.
 *
 * NO SECTION HEADING. The hero's H1 introduced the three jobs and the switch
 * beside it named all three destinations; a header here would push the cards
 * further down the page to repeat something said twice already in the screen
 * above. The eyebrow on each card carries the job instead, which is the only
 * part a visitor scrolling into this section has not already been told.
 *
 * WHY EACH CARD CARRIES A LIVE DIAGRAM. Three cards of title, sentence and
 * bullets would be a menu, and a menu is what the nav dropdown already is - the
 * hub would then be a slower way to reach the same three links. The diagram is
 * the part a menu cannot carry: each one shows the shape of the thing being
 * sold, moving, and it is recognisably the same diagram waiting at full size on
 * the page behind the card. It previews rather than replaces - see the header
 * comment on each visual for why these are separate components rather than the
 * shipped ones resized.
 *
 * THE WHOLE CARD IS THE LINK, matching `MarketingRelatedSection`, which is the
 * repo's established pattern for a grid of destinations. One target per card,
 * so there is no second link inside competing with it for the same click.
 */
export function HubDoorsSection() {
  return (
    <section id="offerings" className="bg-neutral-950 py-16 md:py-24">
      <div className="section-container">
        {/* Visually hidden rather than absent. The section deliberately shows no
            heading - the hero introduced the three jobs and the switch beside it
            named all three destinations - but with nothing here the first
            heading after the page's h1 was an h3, which left the three offering
            names orphaned in the outline and gave heading-navigation users no
            landmark for the section the page exists for. */}
        <h2 className="sr-only">The three offerings</h2>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {hubOfferings.map(
            ({ id, job, name, href, Icon, promise, points, cta, Visual }, i) => (
              <li key={id}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                      <Icon className="h-4.5 w-4.5 text-amber-400" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400/70">
                        {`0${i + 1} · ${job}`}
                      </span>
                      <h3 className="text-base font-bold leading-tight text-white">
                        {name}
                      </h3>
                    </span>
                  </div>

                  {/* The visual sits in its own inset frame rather than loose on
                      the card, so the diagram reads as a sample of something
                      else rather than as decoration on this card.

                      FIXED HEIGHT, and it has to be. The three visuals are three
                      different kinds of drawing - two SVGs that scale to their
                      viewBox aspect and one HTML wireframe that is as tall as its
                      content - so left to themselves they rendered at 193, 327
                      and 143 pixels. Because the cards are grid siblings and
                      stretch to a common height, that spread did not shorten any
                      card; it just started the promise paragraph on a different
                      line in each one and left ragged dead space above the links.
                      One height, contents centred, and the three cards read as a
                      set. The two SVGs share a 300x186 viewBox so they arrive at
                      nearly this height on their own; the wireframe is tuned to
                      match. If a visual is ever redrawn, re-measure all three
                      rather than adjusting this number to suit one of them. */}
                  <div className="mb-5 flex h-[236px] items-center rounded-lg border border-white/[0.07] bg-neutral-950/50 p-3">
                    <div className="w-full">
                      <Visual />
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                    {promise}
                  </p>

                  {/* Three, never four. The deep pages each carry a four-tile
                      outcome strip; a fourth point here would make the card a
                      compressed copy of that strip instead of a summary of it. */}
                  <ul className="mb-6 space-y-2">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400"
                          aria-hidden="true"
                        />
                        <span className="text-xs leading-relaxed text-neutral-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                    {cta}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
