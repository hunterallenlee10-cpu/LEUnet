/**
 * The /lee-systems hero's background: a still of a laptop on a desk at night,
 * its dashboard lit in brass. It was a five-second loop until 2026-10-07, when
 * the owner asked for a still of the same laptop without the small movement on
 * the screen. The picture is the loop's steady stretch averaged into one
 * frame, which clears the video's compression noise, then sized up to 1920px.
 * Offerings' automation card shows the 1280px copy.
 *
 * It is decoration, so it has no alt text, and it loads first (high fetch
 * priority) since it is the first thing on the page.
 *
 * On a phone the picture takes a band across the top, fading to black where
 * the copy starts; from md up it fills the hero with the copy on its dark
 * left side. Both shades are `.ls-hero-shade` in app/globals.css.
 */
export function HeroStill() {
  return (
    <div className="absolute inset-x-0 top-0 h-[24rem] sm:h-[30rem] md:inset-y-0 md:h-auto">
      {/* A phone shows the picture as a 24-30rem band, so it gets the
          1280px copy (about half the bytes); md and up get the 1920px one.
          A plain <picture>, since the site serves images as they are
          (next.config.mjs), so next/image can't pick a size by screen. */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/lee-systems/hero/hero-still-1280.webp" />
        <img
          src="/lee-systems/hero/hero-still.webp"
          alt=""
          width={1920}
          height={1071}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[80%_50%] md:object-[70%_50%]"
        />
      </picture>
      <div className="ls-hero-shade absolute inset-0" aria-hidden="true" />
    </div>
  );
}
