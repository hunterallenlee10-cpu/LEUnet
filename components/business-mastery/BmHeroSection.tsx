import { bmHero, BM_OFFER_ID } from "@/data/business-mastery";
import { BmHeroBackground } from "@/components/business-mastery/BmHeroBackground";

/**
 * Big, minimal, manifesto-like — the plan's words for this section, and the
 * reason it shares no layout with the homepage hero. One centred column of type
 * on a dark ground, and one action.
 *
 * The register is restraint rather than scale. Nothing here shouts: the display
 * sizes are small, the weights are hairline, the tracking is wide, and the
 * confidence is meant to come from the intervals between things rather than
 * from the size of any one of them. That is why the action is a hairline frame
 * and not the house's solid amber pill — at this scale a filled button is the
 * loudest object in the frame and undoes everything above it. It fills in on
 * hover, so the house treatment arrives as the reward.
 *
 * The manifesto is the only serif on the site. It is the one sentence here
 * written by a person to be felt rather than to inform, and it gets a voice to
 * match; everything structural stays in Geist. The weight and size that keep a
 * high-contrast serif alive over a moving constellation are argued in
 * app/globals.css, which owns this block's typography.
 *
 * Still a server component. The CTA is a plain anchor: `html` carries
 * `scroll-smooth` and `scroll-padding-top: 80px` globally, so an in-page hash
 * link gets the smooth scroll and the header offset with no JS at all.
 * `BmHeroBackground` is the page's only client boundary, and it is a sibling of
 * the copy rather than a wrapper around it, so none of the words cross it.
 *
 * Every string is `bmHero`, verbatim. The uppercase on the eyebrow and the two
 * title tiers is `text-transform`, not retyped copy.
 */
export function BmHeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-black">
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

      <div className="section-container relative z-[2] w-full py-24 text-center md:py-32">
        <div className="bmh mx-auto flex max-w-[700px] flex-col items-center">
          <p className="bmh-eyebrow bmh-rise text-amber-400/90 [animation-delay:60ms]">
            {/* Hardcoded exactly as it was before this redesign. It is the
                company name rather than page copy, so it stays out of
                data/business-mastery.ts, which is the owner's confirmed copy. */}
            <span className="font-mono-geist font-normal uppercase">
              Lee Enterprises Unlimited
            </span>
          </p>

          <h1 className="bmh-rise mt-[calc(var(--bmh-u)*2.4)] font-light uppercase leading-[1.1] [animation-delay:150ms]">
            <span className="bmh-title-a text-white/70">LEU Business</span>
            <span className="bmh-title-b text-amber-400">Mastery</span>
          </h1>

          <p className="bmh-manifesto bmh-rise max-w-[15em] font-serif font-light text-white/95 text-balance [animation-delay:260ms]">
            {bmHero.manifesto}
          </p>

          <span
            className="bmh-rule bmh-rise [animation-delay:380ms]"
            aria-hidden="true"
          />

          <p className="bmh-promise bmh-rise font-mono-geist uppercase text-amber-400 [animation-delay:460ms]">
            {bmHero.subtitle}
          </p>

          <p className="bmh-mechanism bmh-rise max-w-[34em] font-light text-neutral-300/85 text-pretty [animation-delay:540ms]">
            {bmHero.description}
          </p>

          <a
            href={`#${BM_OFFER_ID}`}
            className="bmh-cta bmh-rise inline-flex items-center justify-center border border-amber-400/55 font-mono-geist font-medium uppercase text-amber-400 transition-colors duration-[260ms] hover:border-amber-400 hover:bg-amber-400 hover:text-neutral-950 focus-visible:border-amber-400 focus-visible:bg-amber-400 focus-visible:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber-400/85 max-sm:w-full [animation-delay:640ms]"
          >
            {bmHero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
