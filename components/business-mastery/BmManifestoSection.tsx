import {
  bmCoreBelief,
  bmProofStatement,
  bmTransition,
} from "@/data/business-mastery";

/**
 * Section 2 — the page's manifesto, and the hero's second breath.
 *
 * This is the old Core Belief section (slot 2) and the old "Your Journey Is
 * Just Beginning." transition (slot 9) folded into one argument: nobody builds
 * alone, here is what we have actually built, here is what it cost to learn,
 * and here is why you don't have to learn it that way. The two were always the
 * same claim made twice at opposite ends of the page — both a centred column of
 * neutral-300 paragraphs on neutral-950 — and eight sections apart they read as
 * two text walls rather than as one thought. Together they read as one.
 *
 * Every sentence is the owner's, verbatim from data/business-mastery.ts, only
 * re-ordered and re-grouped. The eyebrow is the only string the build wrote —
 * the same licence the other section eyebrows take ("Who This Is For", "The Way
 * We Build"), which is why it lives here and not in the data file, where the
 * owner's confirmed copy lives.
 *
 * WHAT THE MERGE COSTS, recorded because it is the reason to revisit this.
 * `bmTransition` is written in the first person and docs/BUSINESS-MASTERY.md §3
 * defines it as "the transition from my story to your story". At slot 2 the
 * "me" in "Everything that came before LEU taught me something" arrives before
 * the story it refers to (BmJourneyTimeline, slot 8), so the column runs we →
 * I → you under one heading. Slot 2 wins anyway because the proof line is the
 * page's only credibility claim and it has to be read before the offer and the
 * application form at slot 6, not after them. Moving the whole section below the
 * timeline is one line in page.tsx if the owner would rather keep the pivot.
 *
 * Three movements, and the reader should be able to feel where each one starts
 * without being told: the belief, the record, the pivot. The old design ran all
 * of it as one undifferentiated centred stack, which is what made it a wall on
 * a phone. What separates them here is a rule and interval — not headings,
 * boxes, or numbers.
 *
 * THE CORE PHILOSOPHY BLOCK IS OUT, at the owner's request (2026-09-07). It was
 * the amber card in the old slot-2 section, and it survived the merge as an
 * indented pull-quote on a gold hairline — the one element set off the centre
 * axis, which is what made that axis break mean something. Taking it out
 * therefore costs more than a paragraph: the section is a single centred column
 * again, and the only remaining contrast between the movements is the gold seam
 * rule and the interval around it. That is deliberate and it is enough at this
 * length, but if the section ever reads flat again, this is the thing that was
 * removed, and reinstating it is the block that used to sit between the
 * clarifier and the seam. `bmCoreBelief.philosophyTitle` and
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
 *  - `.bmh-rule`, as a class. It reads `--bmh-u` and `--bmh-hair`, declared
 *    only on `.bmh`; used outside that ancestor every `calc(var(--bmh-u) * n)`
 *    is invalid at computed-value time, so the margins drop and the gradient
 *    resolves to nothing — a transparent line with an amber shadow floating in
 *    space. Putting `.bmh` on an ancestor instead drags its black `::before`
 *    veil across a section with no constellation to protect against. So the
 *    seam rule below is that gradient reproduced inline. If `.bmh-rule` is ever
 *    retuned, retune this with it; it is a copy, not a reference.
 *  - `.bmh-eyebrow`. Portable, and prettier than the house eyebrow, but its
 *    size caps at `2vh` — tuned for a hero that owns the viewport, wrong for a
 *    section that scrolls. This slot sits between the hero and BmAudienceSection
 *    and the eyebrow is what ties it to the section below, so it uses the house
 *    idiom the other five sections use.
 *  - `.text-glow-amber`. "Network." is tracked at 0.3em and the house glow
 *    (20px / 0.5 alpha) stacks across gaps that wide into a visible amber bar
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
    <section className="relative bg-neutral-950 py-20 md:py-32">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            What We Believe
          </p>

          {/* `heading-lg`, like every other section heading. The merge makes
              this the longest section on the page and the temptation is to
              size its heading to match; that would make slot 2 the loudest h2
              on the site, over the offer and the closing CTA. Length is not
              rank. */}
          <h2 className="heading-lg text-white text-balance">
            {bmCoreBelief.heading}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-300 text-pretty sm:text-xl">
            {bmCoreBelief.message}
          </p>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-neutral-400 text-pretty md:mt-12">
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
            className="mt-4 text-3xl font-bold uppercase tracking-[0.3em] text-amber-400 indent-[0.3em] sm:text-4xl md:text-5xl"
            style={{ textShadow: "0 0 26px rgba(251, 191, 36, 0.42)" }}
          >
            {bmCoreBelief.force}
          </p>
        </div>

        {/* --- Movement two: the record ------------------------------------ */}
        {/* The proof line keeps its two neutral hairlines. They do honesty work
            as much as design work: it is the one claim on this page carrying
            figures, and the rules are what mark it as a statement of record
            rather than a flourish. Neutral rather than gold, because the single
            gold rule further down divides the section's two halves and a second
            gold rule would cost it that job. The copy is owner-confirmed and
            verbatim — if the facts change, the line changes, it is never
            softened. */}
        <p className="mx-auto mt-12 max-w-3xl border-y border-neutral-800 py-8 text-center text-lg font-medium leading-relaxed text-white text-pretty sm:text-xl md:mt-16 md:py-10">
          {bmProofStatement}
        </p>

        {/* Left-aligned on a phone, centred from `sm` up. Centred text has a
            ragged left edge as well as a ragged right one, which costs nothing
            over two or three lines and a great deal over seven — and seven is
            what this paragraph becomes at 320px. From `sm` the measure is short
            enough that the centre axis is back to being free. This is the one
            readability fix in the merge that changes how the section is set
            rather than how it is spaced. */}
        <p className="mx-auto mt-12 max-w-2xl text-left text-lg leading-relaxed text-neutral-300 text-pretty sm:text-center md:mt-16">
          {bmCoreBelief.clarifier}
        </p>

        {/* --- The seam ---------------------------------------------------- */}
        {/* The only divider in the section, and the join between the two
            sections this one replaced. The hero's rule, values inlined — see
            the note above on why the class itself cannot travel — but carried
            brighter than `.bmh-rule` on purpose: that rule sits on pure black
            over a lit constellation and would glare at these alphas, while this
            one sits on flat neutral-950 with a 0.07-alpha wash behind it, where
            the hero's 0.55 gold and 0.14 white read as a smudge rather than a
            line. Verified at 320px, where the rule is at its 90px floor and has
            the least length to be seen by. */}
        <div
          aria-hidden="true"
          className="mx-auto my-16 h-px w-[clamp(90px,18vw,240px)] md:my-24"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 32%, rgba(251, 191, 36, 0.9) 50%, rgba(255, 255, 255, 0.22) 68%, rgba(255, 255, 255, 0) 100%)",
            boxShadow: "0 0 14px rgba(251, 191, 36, 0.4)",
          }}
        />

        {/* --- Movement three: the pivot ----------------------------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {/* An h3, not a second h2. One section carries one h2, and this is the
              closing movement of the argument above it rather than a new
              argument — the gold rule already says "new movement" visually, so
              the heading does not need to claim it structurally as well. The
              uppercase is `text-transform`, not retyped copy. */}
          <h3 className="text-2xl font-bold uppercase tracking-[0.14em] text-white text-balance indent-[0.14em] sm:text-3xl">
            {bmTransition.heading}
          </h3>

          {/* The colour lives in each branch of the ternary. Put the neutral on
              the base class and the amber on the last item alone and both land
              on the element, where stylesheet order — not class order — picks
              the winner. Index-driven, so the closing line is whichever one the
              owner ends on rather than a hardcoded third. */}
          <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
            {bmTransition.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === bmTransition.paragraphs.length - 1
                    ? "text-center text-xl font-semibold leading-relaxed text-amber-400 text-balance sm:text-2xl"
                    : "text-left text-lg leading-relaxed text-neutral-300 text-pretty sm:text-center sm:text-xl"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
