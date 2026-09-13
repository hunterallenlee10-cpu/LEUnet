import { Lock } from "lucide-react";
import { bmChapters, bmJourney } from "@/data/business-mastery";

/**
 * Section 8 while BM_JOURNEY_LOCKED is true: the section's presence without
 * its interaction. The owner wants the timeline visible as a thing that
 * exists — "locked until complete" — rather than absent, so this renders the
 * intro slide's identity (the "A Life in Full" eyebrow, the two-line title,
 * the description) plus a chapter-count tease, with a lock marker where the
 * timeline's "Start Timeline" affordance would be. page.tsx swaps this for
 * BmJourneyTimeline the moment the flag flips.
 *
 * The eyebrow, title treatment, glow, and ground are copied from the
 * timeline's intro slide (BmJourneyTimeline.tsx) on purpose: unlocking should
 * read as the same section opening, not one section replacing another. The
 * neutral-950 ground is load-bearing there and stays load-bearing here — it
 * is the separator between the black offer section and the black closing CTA
 * (see the join note in page.tsx), which is why locking the section never
 * touches BmFinalCTASection.
 *
 * The tease line is derived from `bmChapters` — count, first title, last
 * title — rather than written out, so it cannot drift from the data when
 * chapter titles get settled (docs/BUSINESS-MASTERY.md §7 records that the
 * names are still the owner's working list).
 *
 * The marker is deliberately a Lock badge, not a fourth BmComingSoon: coming
 * soon marks content the page is honest about not having yet, while this
 * marks a built section held closed on purpose. Different claim, different
 * badge — same quiet amber-outlined shape so it reads as intentional.
 */
export function BmJourneyLocked() {
  const first = bmChapters[0];
  const last = bmChapters[bmChapters.length - 1];

  return (
    <section className="relative overflow-hidden bg-neutral-950 py-20 md:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-10 top-1/3 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="section-container relative flex flex-col items-center text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-amber-400 sm:text-sm">
          A Life in Full
        </p>
        <h2 className="text-[52px] font-bold uppercase leading-[0.95] tracking-tight sm:text-[72px] lg:text-[clamp(76px,7vw,112px)]">
          <span className="block text-white">The</span>
          <span className="block text-amber-400">Journey</span>
        </h2>
        <p className="mt-7 text-lg uppercase tracking-[0.2em] text-neutral-300 sm:text-xl">
          {bmJourney.description}
        </p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 sm:text-sm">
          {bmChapters.length} Chapters · {first.title} → {last.title}
        </p>

        <div className="mt-10 inline-flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            {bmJourney.lockedLabel}
          </span>
          <p className="text-sm text-neutral-400">{bmJourney.lockedNote}</p>
        </div>
      </div>
    </section>
  );
}
