import { bmJourney } from "@/data/business-mastery";
import { BmComingSoon } from "@/components/business-mastery/BmComingSoon";

/**
 * Section 8 while BM_JOURNEY_LOCKED is true: the section's presence without
 * its interaction. The owner wants the timeline visible as a thing that
 * exists rather than absent, so this renders the intro slide's identity (the
 * "A Life in Full" eyebrow, the two-line title, the description) plus a
 * chapter-count tease, with a Coming Soon marker where the timeline's "Start
 * Timeline" affordance would be. page.tsx swaps this for BmJourneyTimeline
 * the moment the flag flips.
 *
 * The eyebrow, title treatment, glow, and ground are copied from the
 * timeline's intro slide (BmJourneyTimeline.tsx) on purpose: unlocking should
 * read as the same section opening, not one section replacing another. The
 * neutral-950 ground is load-bearing there and stays load-bearing here — it
 * is the separator between the black offer section and the black closing CTA
 * (see the join note in page.tsx), which is why locking the section never
 * touches BmFinalCTASection.
 *
 * The tease line is the owner's sentence (`bmJourney.lockedTease`, 2026-09-15).
 * It replaced a line derived from `bmChapters` (count, first title, last
 * title), so unlike that one it no longer tracks the chapter data — if the
 * chapter list changes shape, this line doesn't notice.
 *
 * The marker is the page's shared BmComingSoon, at the owner's request
 * (2026-09-13) — the badge briefly read "Locked Until Complete" behind a
 * Lock icon the same day, and that retired label survives unrendered as
 * `bmJourney.lockedLabel` so the swap back is one line here. This is not a
 * fourth BmComingSoon use: §7's three sanctioned places include the journey
 * timeline, and this placeholder IS the journey slot while it is closed —
 * same marker, different note (`lockedNote` here, `comingSoonNote` on the
 * intro slide once the timeline opens).
 */
export function BmJourneyLocked() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 section-fade" aria-hidden="true">
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
          {bmJourney.lockedTease}
        </p>

        <div className="mt-10">
          <BmComingSoon note={bmJourney.lockedNote} />
        </div>
      </div>
    </section>
  );
}
