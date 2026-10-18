import { bmProofPoints, bmProofStatement } from "@/data/business-mastery";

/**
 * Section 4 — the track record, as three figures and nothing else.
 *
 * It was the foot of the manifesto (then slot 2) until 2026-09-28, when the
 * owner had the page reordered so what members get comes before the
 * philosophy, and asked for the figures as their own short section here:
 * after the visitor has seen the offer and themselves in it, before the
 * belief and the member offer. It is still read before the application form,
 * which is the reason the claim was placed early in the first place
 * (docs/BUSINESS-MASTERY.md §3).
 *
 * No heading and no eyebrow, on purpose. Anything above the figures would be
 * a line the owner never wrote, and the three labels already say what each
 * figure counts. That is also why the section is short: it is the row and its
 * padding.
 *
 * It carries a glow because the page alternates one (2, 4 and 6 have it; 3
 * and 5 don't), and this slot is a glow slot. Kept fainter and centred on the
 * row, so it lifts the band off the sections either side without reading as
 * a spotlight on the claim.
 *
 * Server component, nothing interactive.
 */
export function BmProofSection() {
  return (
    <section className="relative isolate pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="absolute inset-0 z-0 overflow-hidden section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 50%, rgb(var(--amber) / 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-[1]">
        {/* The row keeps its two neutral hairlines. They do honesty work as
            much as design work: it is the one claim on this page carrying
            figures, and the rules are what mark it as a statement of record
            rather than a flourish. Neutral rather than gold because they are
            structure, not accent, and a gold frame around the claim would
            read as selling it.

            The figures are numbers at the owner's request (2026-09-13): "50+",
            "1,000+" and "$150,000+" replaced "dozens", "hundreds" and
            "thousands upon thousands", the owner's own figures both times (see
            data/business-mastery.ts). Since 2026-09-28, at the owner's request,
            the row is `max-w-5xl` and the figures reach `text-6xl`, so the
            band fills its space rather than floating in it.

            THE SENTENCE STILL SHIPS, VERBATIM. `bmProofStatement` is rendered
            `sr-only` and the row is `aria-hidden`, so a screen reader gets the
            owner's line exactly as written and nobody hears the figures twice.
            It moved here with the row. The words in the row are that
            sentence's own (see the note on `bmProofPoints`), so change the two
            together or not at all.

            One row per figure on a phone, label left and number right against
            a hairline, because three stacked centred blocks there are taller
            than they need to be. Three columns from `sm`, where the width
            exists. */}
        <div className="mx-auto max-w-5xl border-y border-neutral-800 py-5 md:py-10">
          <p className="sr-only">{bmProofStatement}</p>
          <dl
            aria-hidden="true"
            className="grid grid-cols-1 divide-y divide-neutral-800/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {bmProofPoints.map((point) => (
              <div
                key={point.label}
                className="flex items-baseline justify-between gap-5 py-2.5 sm:flex-col sm:items-center sm:justify-start sm:gap-2 sm:px-4 sm:py-0 sm:text-center"
              >
                {/* `sm:order-*` puts the number above its label on desktop
                    and to the right of it on a phone, off one DOM order - and
                    the DOM order is not free: in a `dl` the `dt` must precede
                    its `dd`, so the flip has to be visual.

                    `sm:justify-start` is not redundant with the base
                    `justify-between`: at `sm` the flex direction turns and
                    `justify-between` starts governing the vertical axis, which
                    pinned each figure to the bottom of a row sized by the one
                    that wraps to two lines.

                    On a phone the label is what gives, never the figure. The
                    label was `shrink-0` until 2026-09-28, and at 320px
                    "Generated for our clients" plus "$150,000+" ran 42px past
                    the viewport and scrolled the page sideways. The label
                    wraps now and the figure holds its line. */}
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400/80 sm:order-2 sm:text-xs md:text-sm">
                  {point.label}
                </dt>
                <dd className="shrink-0 text-right text-2xl font-bold tracking-tight text-white sm:order-1 sm:text-center sm:text-4xl md:text-5xl lg:text-6xl">
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
