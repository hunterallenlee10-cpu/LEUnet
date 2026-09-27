import { Lightbulb, Rocket, TrendingUp } from "lucide-react";
import {
  bmAudienceHeading,
  bmAudienceSubheading,
  bmAudiences,
} from "@/data/business-mastery";

// Keyed by audience id so the icon travels with the content if the order
// changes in data/business-mastery.ts.
const stageIcons: Record<string, React.ReactNode> = {
  starting: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
  early: <Rocket className="h-6 w-6" aria-hidden="true" />,
  growing: <TrendingUp className="h-6 w-6" aria-hidden="true" />,
};

/** Section 3 — who the program is for, as three stages read left to right.
 *
 * Four audience cards until 2026-09-27, when the owner asked for three (see
 * `bmAudiences`). The stages are drawn as a path: an icon badge above each
 * card, joined by a thin amber line from md up, and the last card carries a
 * warmer border so the row ends on "Ready to Grow". Below md the cards stack,
 * the badge row drops out, and the icon moves inside each card instead -
 * badges above full-width stacked cards added length without adding meaning.
 *
 * Badges and card text are centred, and the "Stage 01" labels and large
 * watermark numerals came off at the owner's request (2026-09-27).
 *
 * Hover treatment is plain Tailwind. It was never the H1 page's `.h1-live`
 * vocabulary: that class drew its ring from a `--h1c-gold` property only the
 * H1 page set, so here it computed to no ring at all - and the vocabulary has
 * since left with that page for the H1 Performance repo (docs/H1.md). */
export function BmAudienceSection() {
  const lastIndex = bmAudiences.length - 1;

  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Who This Is For
          </p>
          <h2 className="heading-lg mb-4 text-white">{bmAudienceHeading}</h2>
          <p className="text-lg text-neutral-400">{bmAudienceSubheading}</p>
        </div>

        <ol className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {bmAudiences.map((audience, index) => {
            const isLast = index === lastIndex;

            return (
              <li key={audience.id} className="flex flex-col">
                <div className="relative mb-6 hidden items-center justify-center md:flex">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-neutral-950 text-amber-400 ${
                      isLast
                        ? "border-amber-400/70 shadow-[0_0_24px_rgba(251,191,36,0.25)]"
                        : "border-amber-400/40"
                    }`}
                  >
                    {stageIcons[audience.id]}
                  </span>
                  {/* Badges sit centred in their columns, so the line runs from
                      1rem past this badge's right edge (50% + 1.75rem radius)
                      to 1rem short of the next badge's left edge: half a
                      column plus the gap-6 gutter, less that radius. */}
                  {!isLast && (
                    <span
                      className="absolute left-[calc(50%+2.75rem)] right-[calc(-50%+1.25rem)] top-1/2 hidden h-px bg-gradient-to-r from-amber-400/60 to-amber-400/15 md:block"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div
                  className={`relative flex-1 overflow-hidden rounded-xl border p-6 text-center transition-colors duration-300 md:p-8 ${
                    isLast
                      ? "border-amber-400/35 bg-amber-400/[0.05] hover:border-amber-400/60"
                      : "border-white/10 bg-white/[0.04] hover:border-amber-400/30"
                  }`}
                >
                  <div className="mb-3 flex justify-center text-amber-400 md:hidden">
                    {stageIcons[audience.id]}
                  </div>
                  <h3 className="relative mb-3 text-xl font-bold text-white">
                    {audience.title}
                  </h3>
                  <p className="relative leading-relaxed text-neutral-300">
                    {audience.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
