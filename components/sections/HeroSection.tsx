import Link from "next/link";
import { sectionIds } from "@/data/navigation";
import { leeSystemsRoutes } from "@/data/lee-systems";
import { businessMasteryAction } from "@/data/business-mastery";
import { site } from "@/data/site";
import { BookCallLink } from "@/components/ui/BookCallLink";

/**
 * The homepage hero. First a full-screen headline, line and button over a
 * field of gold dots (the owner's design, 2026-09-28, which replaced the LEU
 * logo and the "Hire us to automate your business, or learn to build your
 * own." headline). Then "Split Ventures": the two ways to work with LEU as two
 * halves, hire Lee Systems Co. (first, and the brighter of the two) or learn
 * with Business Mastery, each with its own buttons, and the statistics ribbon
 * along the bottom edge.
 *
 * The styling lives in app/globals.css as `.hero-split-*` (plus the shared
 * `.leu-grain`); this file owns the markup and the copy. Every movement in it
 * stops under prefers-reduced-motion in that block.
 */
export function HeroSection() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      // The header is `fixed`, so this section starts at y=0 underneath it;
      // `.hero-split-top` reserves the header's band in its padding. Heights
      // are floors, never locks, so content too tall for the space grows the
      // page rather than being clipped by `overflow-hidden`. `isolate` keeps
      // the grain's `overlay` blend resolving against the hero alone.
      className="hero-split relative isolate flex flex-col overflow-hidden"
    >
      <div className="hero-split-top">
        {/* The owner's headline, capitalized as they wrote it. The space
            before the accent is real text, so it reads "with AI". */}
        <h1 id="hero-title" className="hero-split-title">
          Elevate Your Business with{" "}
          <span className="hero-split-accent">AI</span>
        </h1>
        <p className="hero-split-lede">
          Automate how your business talks, sells, and grows with AI solutions
          built to scale your brand.
        </p>
        <div className="hero-split-cta">
          <BookCallLink variant="hero" />
        </div>
      </div>

      <p className="hero-split-intro">
        Two ways to work with LEU. Pick the one that fits.
      </p>

      <div className="hero-split-fork">
        <article
          aria-labelledby="path-ls-title"
          className="hero-split-half hero-split-half--ls"
        >
          <div className="hero-split-inner">
            <p className="hero-split-who">Hire us: Lee Systems Co.</p>
            <h2 id="path-ls-title" className="hero-split-half-title">
              Every call answered. Every lead followed up.
            </h2>
            <p className="hero-split-blurb">
              AI automation and websites for business owners, with a flat
              upfront quote.
            </p>
            <div className="hero-split-actions">
              <BookCallLink />
              <Link href={leeSystemsRoutes.home} className="hero-split-link">
                See what we build
              </Link>
            </div>
          </div>
        </article>

        {/* Decorative: the line above already says "two ways" in words.
            Between the two halves in the markup so that, stacked, it falls
            between them as a divider; side by side it is the lit seam. */}
        <div className="hero-split-or" aria-hidden="true">
          <span>or</span>
        </div>

        <article
          aria-labelledby="path-bm-title"
          className="hero-split-half hero-split-half--bm"
        >
          <div className="hero-split-inner">
            <p className="hero-split-who">Learn with us: Business Mastery</p>
            <h2 id="path-bm-title" className="hero-split-half-title">
              Learn to start a business and actually use AI.
            </h2>
            <p className="hero-split-blurb">
              Courses, coaching, and a community of people building alongside
              you.
            </p>
            {site.businessMastery.price && (
              <p className="hero-split-note">{site.businessMastery.price}</p>
            )}
            <div className="hero-split-actions">
              <Link
                href={businessMasteryAction.href}
                className="btn-secondary inline-flex min-h-11 items-center justify-center"
              >
                {businessMasteryAction.label}
              </Link>
            </div>
          </div>
        </article>
      </div>

      {site.stats.length > 0 && (
        <div className="hero-split-ribbon">
          {site.stats.map((stat) => (
            <p key={stat.label} className="hero-split-stat">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
              {stat.definition && (
                <span className="hero-split-stat-def">{stat.definition}</span>
              )}
            </p>
          ))}
        </div>
      )}

      <div className="leu-grain" aria-hidden="true" />
    </section>
  );
}
