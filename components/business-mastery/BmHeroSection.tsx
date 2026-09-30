import { bmHero, businessMasteryAction } from "@/data/business-mastery";
import { site } from "@/data/site";
import { BmHeroBackground } from "@/components/business-mastery/BmHeroBackground";

/**
 * Big, minimal, manifesto-like — the plan's words for this section, and the
 * reason it shares no layout with the homepage hero. One centred column of type
 * on a dark ground, and one action.
 *
 * The register is restraint rather than scale. Nothing here shouts: the display
 * sizes are small, the weights are hairline, the tracking is wide, and the
 * confidence is meant to come from the intervals between things rather than
 * from the size of any one of them. The action is the house's filled gold
 * button (it was a hairline frame until 2026-09-28): it is the page's primary
 * action, and the site's rule is one filled gold button per section for that.
 *
 * The manifesto is the one loud line: Geist bold and tightly tracked, the
 * site's headline register, against the hairline name above it. It was a
 * light Cormorant serif until 2026-09-30, when the site came down to one
 * typeface. Its sizes are argued in app/globals.css, which owns this block's
 * typography.
 *
 * Still a server component. The CTA is a plain anchor: `html` carries
 * `scroll-smooth` and `scroll-padding-top: 80px` globally, so an in-page hash
 * link gets the smooth scroll and the header offset with no JS at all.
 * `BmHeroBackground` is this section's only client boundary, and it is a
 * sibling of the copy rather than a wrapper around it, so none of the words
 * cross it.
 *
 * Every string below the title is `bmHero`, verbatim, plus the price from
 * data/site.ts once one is set; the eyebrow and the two title tiers are the
 * company's and the program's names, set here. The uppercase on those three
 * is `text-transform`, not retyped copy, and the space between the title's
 * two words is real text, so it reads "Business Mastery" rather than
 * "BusinessMastery" to search engines and screen readers.
 */
export function BmHeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-80px)] items-center overflow-hidden">
      {/* A drifting network of nodes and links, with two craft crossing it and
          lighting what they pass. Geometry, palette and the reasoning behind
          each layer live with the component and with the styles in
          app/globals.css. The gold pool the previous hero used is still here —
          it is the first layer of `.bmc-field`. */}
      <BmHeroBackground />

      {/* Floor fade, so the first content section below never shows a hard
          seam. Outside the background component because it belongs to the
          join between two sections, not to the field. */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-neutral-950"
        aria-hidden="true"
      />

      {/* Asymmetric on purpose. MainHeader is `position: fixed`, so it
          overlays this section rather than sitting above it in flow, and a
          block centred in the section's own box is centred 40px too high --
          which puts the eyebrow behind the header once the copy is this size.
          The extra 5rem on top is the header's own height, and it is what
          returns the block to the centre of the space a visitor can actually
          see. */}
      <div className="section-container relative z-[2] w-full pb-16 pt-[calc(5rem+4rem)] text-center [@media(max-height:820px)]:pb-8 [@media(max-height:820px)]:pt-[calc(5rem+2rem)]">
        <div className="bmh mx-auto flex max-w-[880px] flex-col items-center">
          <p className="bmh-eyebrow bmh-rise text-amber-300 [animation-delay:60ms]">
            {/* Hardcoded exactly as it was before this redesign. It is the
                company name rather than page copy, so it stays out of
                data/business-mastery.ts, which is the owner's confirmed copy. */}
            <span className="font-semibold uppercase">
              Lee Enterprises Unlimited
            </span>
          </p>

          <h1 className="bmh-rise mt-[calc(var(--bmh-u)*2.4)] font-light uppercase leading-[1.1] [animation-delay:150ms]">
            <span className="bmh-title-a text-white/85">Business</span>{" "}
            <span className="bmh-title-b">Mastery</span>
          </h1>

          <p className="bmh-manifesto bmh-rise max-w-[15em] font-bold text-white text-balance [animation-delay:260ms]">
            {bmHero.manifesto}
          </p>

          <span
            className="bmh-rule bmh-rise [animation-delay:380ms]"
            aria-hidden="true"
          />

          <p className="bmh-promise bmh-rise max-w-[34em] text-amber-300 text-balance [animation-delay:460ms]">
            {bmHero.subtitle}
          </p>

          {site.businessMastery.price && (
            <p className="bmh-rise mt-3 text-base font-semibold text-white [animation-delay:500ms]">
              {site.businessMastery.price}
            </p>
          )}

          <p className="bmh-mechanism bmh-rise max-w-[34em] font-light text-neutral-200 text-pretty [animation-delay:540ms]">
            {bmHero.description}
          </p>

          <a
            href={businessMasteryAction.href}
            className="bmh-cta bmh-rise inline-flex items-center justify-center rounded-lg bg-amber-400 font-semibold text-neutral-950 transition-colors duration-[260ms] hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber-400/85 max-sm:w-full [animation-delay:640ms]"
          >
            {businessMasteryAction.label}
          </a>
        </div>
      </div>
    </section>
  );
}
