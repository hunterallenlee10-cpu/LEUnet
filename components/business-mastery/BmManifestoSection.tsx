import { bmCoreBelief, bmTenets, bmTenetsIntro } from "@/data/business-mastery";

/**
 * Section 5 — what we believe: the manifesto, then the core tenets.
 *
 * ONE SECTION SINCE 2026-09-28, at the owner's request, when the page was
 * reordered so a visitor reads what members get (section 2) and who it is
 * for (3) before the philosophy. This was the manifesto at slot 2 and
 * BmTenetsSection at slot 4. BmTenetsSection.tsx is deleted rather than left
 * behind, the same call the 2026-09-07 merge made for the files it replaced.
 * The proof row that ended the manifesto is its own section now, at slot 4
 * (BmProofSection).
 *
 * One eyebrow, "What we believe". The tenets' "The way we operate" came off
 * with the merge, so one label heads both movements. "Our core tenets" stays
 * as the second movement's heading, an h3 under the section's h2, so the
 * tenet titles step down to h4. Its paragraph was cut to its first sentence
 * (the dropped sentence is recorded on `bmTenetsIntro`): after the merge the
 * first sentence is still the bridge from "Network." to the tenets, and the
 * second only restated it.
 *
 * Two movements, and the reader should feel where the second starts without
 * being told: the belief, then the tenets. What separates them is the
 * interval and the change from one centred column to a grid of cards. This
 * page has no dividers between or inside sections.
 *
 * Every sentence is the owner's, verbatim from data/business-mastery.ts, only
 * re-grouped. The eyebrow is the only string the build wrote, the same
 * licence the other section eyebrows take, which is why it lives here and not
 * in the data file.
 *
 * WHAT IS OFF THIS SECTION, and kept in the data file on the owner's terms
 * (taking a block off a page is not the same decision as deleting the words):
 *
 *  - The pivot, `bmTransition` (off 2026-09-13). It was the manifesto's
 *    closing movement, introduced by a gold seam rule that went out with it.
 *    It is first person and refers to the founder's story, which is not on
 *    this page now, so check that before restoring it.
 *  - The clarifier, `bmCoreBelief.clarifier` (off 2026-09-15). It was the
 *    manifesto's last paragraph, under the proof row.
 *  - The Core Philosophy block, `bmCoreBelief.philosophyTitle` and
 *    `.philosophy` (off 2026-09-07). An indented pull-quote on a gold
 *    hairline, the one element set off the centre axis. Its slot was between
 *    the clarifier and the seam rule, so with both off it belongs under
 *    "Network.", above the tenets.
 *
 * A restored seam rule cannot borrow `.bmh-rule`: that class reads `--bmh-u`
 * and `--bmh-hair`, declared only on `.bmh`, and outside it the margins drop
 * and the gradient resolves to nothing. Putting `.bmh` on an ancestor drags
 * its black `::before` veil in with it. Reproduce the gradient inline instead.
 *
 * The register is the hero's: hairline weights, wide tracking, long
 * intervals. What it deliberately does not borrow from the hero:
 *
 *  - The serif. Cormorant carries one sentence on the site; a second use
 *    dilutes the first, and it survives a dark ground only at hero sizes
 *    (argued in app/globals.css).
 *  - `.bmh-rise`. A load-time entrance, and this section is far below the
 *    fold. Motion nobody can see is dead code. Nothing here moves.
 *  - `.bmh-eyebrow`. Its size caps at `2vh`, tuned for a hero that owns the
 *    viewport, so this uses the house eyebrow the other sections use.
 *  - A plain amber text glow on "Network.". At 0.3em tracking a 20px / 0.5
 *    glow stacks across the gaps into a visible amber bar. The hero solved
 *    this once at 26px / 0.42; those numbers.
 *
 * Two things that look like fussiness and are not. Every tracked line carries
 * `indent-` equal to its own tracking, because letter-spacing hangs off the
 * last glyph and a tracked centred line otherwise sits half a space left of
 * true centre. And body copy is capped at `max-w-2xl` rather than the
 * heading's `max-w-3xl`: at `text-lg` the wider measure runs past 70
 * characters, and a 70-character centred line is what made the old section
 * hard to read on a phone.
 *
 * No glow layer. The page alternates one (2, 4 and 6 have it; 3 and 5 don't),
 * and this is a plain slot now. The manifesto's radial glow moved up to
 * section 2 with the slot it lit, and the tenets' off-axis orb went with the
 * merge. With nothing decorative left there is nothing to clip, so the
 * section has no `overflow-hidden`: the one wide object, "Network.", is sized
 * to fit a 320px viewport rather than clipped to it.
 *
 * Server component, no client boundary, nothing interactive.
 */
export function BmManifestoSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        {/* --- Movement one: the belief ----------------------------------- */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-amber-400">
            What we believe
          </p>

          {/* `heading-lg`, like every other section heading. This is the
              longest section on the page and the temptation is to size its
              heading to match; that would make it the loudest h2 on the site,
              over the offer. Length is not rank. */}
          <h2 className="heading-lg text-white text-balance">
            {bmCoreBelief.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 text-pretty sm:text-xl md:mt-8">
            {bmCoreBelief.message}
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 text-pretty md:mt-10">
            {bmCoreBelief.lead}
          </p>

          {/* The payoff word, and the loudest object in the section — it keeps
              the weight and the size jump it has always had, because the two
              sentences above it are built to hand off to exactly one word.
              It steps down a size at the phone floor for a mechanical reason:
              at 0.3em tracking a 48px "NETWORK." is one unbreakable word wider
              than a 320px viewport, and an unbreakable overflow is a page-wide
              horizontal scroll, not a clipped word. */}
          <p
            className="mt-3 text-3xl font-bold uppercase tracking-[0.3em] text-amber-400 indent-[0.3em] sm:text-4xl md:text-5xl"
            style={{ textShadow: "0 0 26px rgba(251, 191, 36, 0.42)" }}
          >
            {bmCoreBelief.force}
          </p>
        </div>

        {/* --- Movement two: the tenets ------------------------------------ */}
        <div className="mx-auto mt-16 max-w-5xl md:mt-24">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {bmTenetsIntro.heading}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-neutral-400 text-pretty">
              {bmTenetsIntro.description}
            </p>
          </div>

          {/* Three columns, not two. A two-column step strands a lone
              half-width card under a centred header at three, which reads as
              a missing fourth tenet, so the md:2 step the rest of the site
              uses (BmProgramSection) is deliberately skipped. */}
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bmTenets.map((tenet) => (
              <li
                key={tenet.id}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-amber-400/30 md:p-8"
              >
                {/* Stacked rather than beside the title: at three columns a
                    horizontal row leaves roughly 220px for the copy, which
                    wraps every description to five or six lines. */}
                <span
                  className="mb-4 block text-3xl font-bold tabular-nums text-amber-400/80"
                  aria-hidden="true"
                >
                  {String(tenet.number).padStart(2, "0")}
                </span>
                <h4 className="mb-1.5 text-lg font-bold text-white">
                  {tenet.title}
                </h4>
                <p className="leading-relaxed text-neutral-400">
                  {tenet.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
