import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { sectionIds } from "@/data/navigation";
import { leeSystemsRoutes } from "@/data/lee-systems";
import { site } from "@/data/site";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { MissedRevenueCalculator } from "@/components/sections/MissedRevenueCalculator";

/** The two halves of the offer, three points each. */
const offer = [
  {
    title: "Websites",
    points: [
      "Loads fast and looks sharp on any screen",
      "Turns visitors into customers",
      "Built personally for your business",
    ],
  },
  {
    title: "Automations",
    points: [
      "Answers your business calls 24/7 with an AI assistant",
      "Answers every new lead in under a minute",
      "Endless possibilities: if it's done by hand, it can be automated",
    ],
  },
];

/**
 * The homepage hero. First a full-screen headline, line and button over a
 * photo of snowy mountains, at night in the dark theme and in the sun in the
 * light one (the owner's ask, 2026-10-17, which replaced the field of gold
 * dots of 2026-09-28; the dots had replaced the LEU logo and the "Hire us to
 * automate your business, or learn to build your own." headline; the
 * owner's headline "Never Miss Another Customer", 2026-09-29, replaced
 * "Elevate Your Business with AI"). "The Vault", a 3D film that played in
 * the headline's place, was taken out at the owner's ask (2026-10-17). Then
 * the Lee Systems offer: one big call to hire Lee Systems Co. for websites and automations, beside the missed-revenue calculator
 * (2026-10-06; it replaced "Split Ventures", the two halves for Lee Systems
 * Co. and Business Mastery), and the statistics ribbon along the bottom edge.
 *
 * The styling lives in app/globals.css as `.hero-split-*` and `.hero-ls-*`,
 * and `.calc-*` for the calculator; this file owns the markup and the copy.
 * Every movement in it stops under prefers-reduced-motion (the end of that
 * block).
 */
export function HeroSection() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      // The header is `fixed`, so this section starts at y=0 underneath it;
      // `.hero-split-copy` reserves the header's band in its padding.
      // Heights are floors, never locks, so content too tall for
      // the space grows the page rather than being clipped by
      // `overflow-hidden`. `isolate` keeps the grain's `overlay` blend
      // resolving against the hero alone.
      className="hero-split relative isolate flex flex-col overflow-hidden"
    >
      <div className="hero-split-top">
        {/* The photo behind the headline (the owner's ask, 2026-10-17):
            snowy mountains under the stars in the dark theme, sunny snowy
            Alps in the light one. It is a CSS background (`.hero-scene` in
            app/globals.css), so only the current theme's photo downloads. */}
        <div className="hero-scene" aria-hidden="true" />
        <div className="hero-split-copy">
          {/* The owner's headline, capitalized as they wrote it. The space
              before the accent is real text, so it reads "Another
              Customer". */}
          <h1 id="hero-title" className="hero-split-title">
            Never Miss Another{" "}
            <span className="hero-split-accent">Customer</span>
          </h1>
          {/* The owner's line, 2026-09-29, which replaced "Automate how
              your business talks, sells, and grows with AI solutions built
              to scale your brand." Each sentence is kept whole, so a narrow
              screen wraps between them and never inside "More Money". */}
          <p className="hero-split-lede">
            <span className="whitespace-nowrap">More Customers.</span>{" "}
            <span className="whitespace-nowrap">More Money.</span>{" "}
            <span className="whitespace-nowrap">Less Work.</span>
          </p>
          <div className="hero-split-cta">
            <BookCallLink variant="hero" />
          </div>
        </div>
      </div>

      {/* The Lee Systems offer (the owner's ask, 2026-10-06): one big call
          to hire Lee Systems Co. for websites and automations, beside the
          missed-revenue calculator. It replaced "Two ways to work with LEU",
          the Lee Systems Co. and Business Mastery halves; Business Mastery is
          linked from the footer only now. The checklist points are the ones
          /lee-systems already makes (LeeSystemsOfferingsSection.tsx). */}
      <div className="hero-ls" aria-labelledby="hero-ls-title" role="region">
        <div className="section-container hero-ls-grid">
          <div>
            <p className="hero-ls-eyebrow">Lee Systems Co.</p>
            <h2 id="hero-ls-title" className="hero-ls-title">
              A website that <em>brings customers in.</em> Automations that{" "}
              <em>never let one slip.</em>
            </h2>
            <p className="hero-ls-blurb">
              Get custom AI workflows and a high-performance website that run
              your work on autopilot with guaranteed results. Built personally
              for you.
            </p>
            <div className="hero-ls-lists">
              {offer.map((part) => (
                <div key={part.title} className="hero-ls-list">
                  <h3>{part.title}</h3>
                  <ul>
                    {part.points.map((point) => (
                      <li key={point}>
                        <CircleCheck aria-hidden="true" focusable="false" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="hero-ls-actions">
              <BookCallLink variant="glow" arrow />
              <Link href={leeSystemsRoutes.home} className="hero-ls-link">
                See what we build
              </Link>
            </div>
          </div>

          <MissedRevenueCalculator />
        </div>
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
