import Link from "next/link";
import { businessMasteryPage, sectionIds } from "@/data/navigation";
import { leeSystemsRoutes } from "@/data/lee-systems";
import { businessMasteryAction } from "@/data/business-mastery";
import { site } from "@/data/site";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { HeroStage } from "@/components/sections/HeroStage";
import { HeroVsl } from "@/components/sections/HeroVsl";

/**
 * The homepage hero. First a full-screen headline, line and button over a
 * field of gold dots (the owner's design, 2026-09-28, which replaced the LEU
 * logo and the "Hire us to automate your business, or learn to build your
 * own." headline; the owner's headline "Never Miss Another Customer",
 * 2026-09-29, replaced "Elevate Your Business with AI"). A few seconds in, the animation of what Lee Systems Co.
 * sets up plays in the headline's place, then hands back to it with a
 * "Replay animation" button (the owner's plan, 2026-09-29: HeroVsl.tsx, and
 * heroVslPlayer.ts for when it plays). Then "Split Ventures": the two ways to
 * work with LEU as two halves, hire Lee Systems Co. (first, and the brighter
 * of the two) or learn with Business Mastery, each with its own buttons, and
 * the statistics ribbon along the bottom edge.
 *
 * The styling lives in app/globals.css as `.hero-split-*` and, for the
 * animation, `.hero-vsl` (plus the shared `.leu-grain`); this file owns the
 * markup and the copy. Every movement in it stops under
 * prefers-reduced-motion (the end of that block), and the animation waits
 * for its "Play animation" button instead of starting by itself.
 */
export function HeroSection() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      // The header is `fixed`, so this section starts at y=0 underneath it;
      // `.hero-split-copy` and `.hero-vsl` reserve the header's band in their
      // padding. Heights are floors, never locks, so content too tall for
      // the space grows the page rather than being clipped by
      // `overflow-hidden`. `isolate` keeps the grain's `overlay` blend
      // resolving against the hero alone.
      className="hero-split relative isolate flex flex-col overflow-hidden"
    >
      <HeroStage>
        <div className="hero-split-copy" data-hero-copy>
          {/* The owner's headline, capitalized as they wrote it. The space
              before the accent is real text, so it reads "Another
              Customer". */}
          <h1 id="hero-title" className="hero-split-title">
            Never Miss Another{" "}
            <span className="hero-split-accent">Customer</span>
          </h1>
          <p className="hero-split-lede">
            Automate how your business talks, sells, and grows with AI
            solutions built to scale your brand.
          </p>
          <div className="hero-split-cta">
            <BookCallLink variant="hero" />
            {/* Shown by the player: "Replay animation" once the animation
                has played, or "Play animation" from the start for people
                whose device asks for less motion. Without script it stays
                hidden, since it could do nothing. */}
            <button
              type="button"
              className="hero-replay"
              data-hero-replay
              data-kind="replay"
              hidden
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className="hero-replay-play"
                  d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
                />
                <g className="hero-replay-again">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </g>
              </svg>
              <span data-hero-replay-label>Replay animation</span>
            </button>
          </div>
        </div>
        <HeroVsl />
      </HeroStage>

      {/* Kept as one paragraph so it reads as a sentence pair; the spans
          only split it into a brass eyebrow and a larger line below. The
          eyebrow's full stop is for screen readers only. */}
      <p className="hero-split-intro">
        <span className="hero-split-intro-kicker">
          Two ways to work with LEU<span className="sr-only">.</span>
        </span>{" "}
        <span className="hero-split-intro-line">Pick the one that fits.</span>
      </p>

      <div className="hero-split-fork">
        <article
          aria-labelledby="path-ls-title"
          className="hero-split-half hero-split-half--ls"
        >
          <div className="hero-split-inner">
            <p className="hero-split-who">Hire us: Lee Systems Co.</p>
            <h2 id="path-ls-title" className="hero-split-half-title">
              Never miss a customer again.
            </h2>
            <p className="hero-split-blurb">
              Get custom AI workflows and a high-performance website that run
              your work on autopilot with guaranteed results.
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
              <Link href={businessMasteryPage} className="hero-split-link">
                See what you&apos;ll learn
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
