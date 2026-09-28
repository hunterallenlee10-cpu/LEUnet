import {
  bmCoreBelief,
  bmProofPoints,
  bmProofStatement,
} from "@/data/business-mastery";

/**
 * Section 2 — the page's manifesto, and the hero's second breath.
 *
 * This is the old Core Belief section (slot 2). It also carried the old "Your
 * Journey Is Just Beginning." transition (slot 9) for six days — merged in on
 * 2026-09-07 because the two were the same claim made twice at opposite ends of
 * the page, and taken back off on 2026-09-13. What is left is one argument in
 * two movements: nobody builds alone, and here is what we have actually built.
 *
 * THE PIVOT IS OUT, at the owner's request (2026-09-13), on the same terms as
 * the Core Philosophy block below: `bmTransition` is untouched in the data file
 * and renders nowhere now. Taking a block off a page is not the same decision
 * as deleting the words.
 *
 * THE CLARIFIER IS OUT, at the owner's request (2026-09-15), on the same
 * terms: `bmCoreBelief.clarifier` ("LEU Business Mastery is not about avoiding
 * hard work…") is untouched in the data file and renders nowhere now. It was
 * the section's last paragraph, so the proof row is the foot of the section
 * and the argument ends on the record rather than a caveat. It takes with it
 * the merge's one fix to how the section is set rather than spaced — the
 * clarifier was left-aligned below `sm` because it ran seven lines at 320px,
 * and nothing left in the section runs long enough to need that.
 *
 * THE GOLD SEAM RULE WENT WITH IT, and has to come back with it. It existed to
 * divide the two halves and nothing else, so left behind it would be a hairline
 * under the last paragraph dividing the section from its own bottom padding.
 * Both are one revert away and docs/BUSINESS-MASTERY.md §3 carries the record.
 *
 * IT ALSO SETTLES WHAT THE MERGE COST, which this comment used to record as the
 * reason to revisit it. `bmTransition` is written in the first person and
 * docs/BUSINESS-MASTERY.md §3 defined it as "the transition from my story to
 * your story", so at slot 2 the "me" in "Everything that came before LEU taught
 * me something" arrived six sections before the story it refers to
 * (BmJourneyTimeline, slot 8) and the column ran we → I → you under one
 * heading. It runs we → we now. If the pivot ever goes back, that problem goes
 * back with it, and the fix is still the one recorded then: the whole section
 * below the timeline, one line in page.tsx.
 *
 * Every sentence is the owner's, verbatim from data/business-mastery.ts, only
 * re-ordered and re-grouped. The eyebrow is the only string the build wrote —
 * the same licence the other section eyebrows take ("Who This Is For", "The Way
 * We Build"), which is why it lives here and not in the data file, where the
 * owner's confirmed copy lives.
 *
 * Two movements, and the reader should be able to feel where the second one
 * starts without being told: the belief, then the record. The old design ran
 * all of it as one undifferentiated centred stack, which is what made it a wall
 * on a phone. What separates them now is the proof row's two hairlines and the
 * interval around them — not headings, boxes, or numbers. It was three
 * movements while the pivot stood, and the gold rule was the third one's
 * introduction.
 *
 * THE CORE PHILOSOPHY BLOCK IS OUT, at the owner's request (2026-09-07). It was
 * the amber card in the old slot-2 section, and it survived the merge as an
 * indented pull-quote on a gold hairline — the one element set off the centre
 * axis, which is what made that axis break mean something. Taking it out
 * therefore costs more than a paragraph: the section is a single centred column
 * again, and the only remaining contrast between the movements is the proof
 * row's hairlines and the interval around them. That is deliberate and it is
 * enough at this length, but if the section ever reads flat again, this is the
 * thing that was removed, and reinstating it is the block that used to sit
 * between the clarifier and the gold seam rule — both also off the page now,
 * so its slot is under the proof row. `bmCoreBelief.philosophyTitle` and
 * `bmCoreBelief.philosophy` are untouched in the data file and now render
 * nowhere — see the note on them there.
 *
 * The register is the hero's, deliberately: hairline rules, wide tracking,
 * long intervals, and confidence that comes from the space between things
 * rather than the size of any one of them. This is the first thing under the
 * hero, so it either continues that voice or announces the page was designed by
 * two people.
 *
 * What it deliberately does NOT borrow from the hero:
 *
 *  - The serif. Cormorant is the only serif on the site and carries one
 *    sentence written to be felt; a second use dilutes the first, and the face
 *    is high-contrast enough that it survives a dark ground only at hero sizes
 *    (the type block in app/globals.css argues this at length).
 *  - `.bmh-rise`. It is a load-time entrance, and this section is below the
 *    fold behind a `min-h-[calc(100vh-80px)]` hero — the animation would always
 *    have finished before anyone saw it. Motion nobody can see is dead code,
 *    not restraint. Nothing here moves.
 *  - `.bmh-rule`, as a class. Nothing in this file draws a rule since the seam
 *    came out, so this is dormant rather than gone: it is what the seam has to
 *    do again the moment the pivot brings it back. It reads `--bmh-u` and
 *    `--bmh-hair`, declared
 *    only on `.bmh`; used outside that ancestor every `calc(var(--bmh-u) * n)`
 *    is invalid at computed-value time, so the margins drop and the gradient
 *    resolves to nothing — a transparent line with an amber shadow floating in
 *    space. Putting `.bmh` on an ancestor instead drags its black `::before`
 *    veil across a section with no constellation to protect against. So a
 *    restored seam has to reproduce that gradient inline, and as a copy rather
 *    than a reference it will not follow if `.bmh-rule` is ever retuned.
 *  - `.bmh-eyebrow`. Portable, and prettier than the house eyebrow, but its
 *    size caps at `2vh` — tuned for a hero that owns the viewport, wrong for a
 *    section that scrolls. This slot sits between the hero and BmAudienceSection
 *    and the eyebrow is what ties it to the section below, so it uses the house
 *    idiom the other five sections use.
 *  - A plain amber text glow. "Network." is tracked at 0.3em, and a 20px /
 *    0.5 alpha glow stacks across gaps that wide into a visible amber bar
 *    behind the word. The hero solved this once at 26px / 0.42; those numbers.
 *
 * Two things that look like fussiness and are not. Every tracked line carries
 * `indent-` equal to its own tracking, because letter-spacing hangs off the last
 * glyph and a tracked centred line otherwise sits half a space left of true
 * centre — which "Network." has been doing since it was written. And body copy
 * is capped at `max-w-2xl` rather than the heading's `max-w-3xl`: at `text-lg`
 * the wider measure runs past 70 characters, and a 70-character line that is
 * also centre-aligned is the specific thing that made the old section hard to
 * read on a phone.
 *
 * The background must stay neutral-950: the hero above ends in a 160px fade
 * whose terminal colour is hardcoded `to-neutral-950`, and BmAudienceSection
 * below is neutral-950 too. The glow is the full-bleed radial idiom from the
 * offer and final-CTA sections rather than slot 2's old off-axis blur circle —
 * that circle was 384px wide at `left-10`, reached 424px on a phone, and
 * widened the document past the viewport until it was clipped. An `inset-0`
 * gradient has no geometry to escape with. The wrapper still clips, so anything
 * added here inherits the fix instead of rediscovering the bug.
 *
 * Server component, no client boundary, nothing interactive.
 */
export function BmManifestoSection() {
  return (
    <section className="relative isolate py-16 md:py-24">
      <div className="absolute inset-0 z-0 overflow-hidden section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 55% at 50% 45%, rgba(251, 191, 36, 0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-[1]">
        {/* --- Movement one: the belief ----------------------------------- */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-amber-400">
            What we believe
          </p>

          {/* `heading-lg`, like every other section heading. The merge makes
              this the longest section on the page and the temptation is to
              size its heading to match; that would make slot 2 the loudest h2
              on the site, over the offer and the closing CTA. Length is not
              rank. */}
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

        {/* --- Movement two: the record ------------------------------------ */}
        {/* The proof row keeps its two neutral hairlines. They do honesty work
            as much as design work: it is the one claim on this page carrying
            figures, and the rules are what mark it as a statement of record
            rather than a flourish. Neutral rather than gold because they are
            structure, not accent - the section's amber is spent on the labels
            and on "Network.", and a gold frame around the claim would read as
            selling it.

            THE FIGURES ARE NUMBERS NOW, at the owner's request (2026-09-13):
            "50+", "1,000+" and "$150,000+" replaced "dozens", "hundreds" and
            "thousands upon thousands" - the owner's own figures both times,
            see data/business-mastery.ts. The numbers are what earn the scale
            they are set at: a number reads at a glance the way a quantity-word
            never did, which is the whole job of the one part of the section
            anyone skims. They sit at `heading-lg`'s scale and no larger -
            "Network." above is the loudest object in the section by design,
            and a stat that out-shouts it re-ranks the argument.

            THE SENTENCE STILL SHIPS, VERBATIM. `bmProofStatement` is rendered
            `sr-only` and the row is `aria-hidden`, so a screen reader gets the
            owner's line exactly as written and nobody hears the figures twice.
            The words in the row are that sentence's own - see the note on
            `bmProofPoints`, and change the two together or not at all.

            One row per figure on a phone, label left and number right against
            a hairline, because three stacked centred blocks there are taller
            than the paragraph this row replaced - which would lose the point
            of doing this. Three columns from `sm`, where the width exists. */}
        <div className="mx-auto mt-10 max-w-3xl border-y border-neutral-800 py-5 md:mt-12 md:py-7">
          <p className="sr-only">{bmProofStatement}</p>
          <dl
            aria-hidden="true"
            className="grid grid-cols-1 divide-y divide-neutral-800/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {bmProofPoints.map((point) => (
              <div
                key={point.label}
                className="flex items-baseline justify-between gap-5 py-2.5 sm:flex-col sm:items-center sm:justify-start sm:gap-1.5 sm:px-4 sm:py-0 sm:text-center"
              >
                {/* `sm:order-*` puts the number above its label on desktop
                    and to the right of it on a phone, off one DOM order - and
                    the DOM order is not free: in a `dl` the `dt` must precede
                    its `dd`, so the flip has to be visual. A `dl` pairs them
                    either way, so nothing is lost by flipping which reads
                    first.

                    `sm:justify-start` is not redundant with the base
                    `justify-between`: at `sm` the flex direction turns and
                    `justify-between` starts governing the vertical axis, which
                    pinned each figure to the bottom of a row sized by the one
                    that wraps to two lines - so two of the three sat a line
                    lower than the third for no reason a reader could see. */}
                <dt className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400/80 sm:order-2 sm:text-xs">
                  {point.label}
                </dt>
                <dd className="text-right text-xl font-bold tracking-tight text-white sm:order-1 sm:text-center sm:text-3xl md:text-4xl">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
