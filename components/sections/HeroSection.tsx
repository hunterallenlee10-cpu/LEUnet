import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { companyInfo, heroFork } from "@/data/company";
import { businessMasteryPage, sectionIds, venturePages } from "@/data/navigation";

/**
 * The homepage hero - "Split Ventures". A centred brand block (mark, name,
 * strapline), then the fork the ventures pair below details compressed to one
 * screen: Business Mastery's half on the left, Lee Systems Co.'s on the
 * right, an "or" riding the seam between them, and the three statistics as a
 * ribbon along the bottom edge. Each half is one link to its venture's page.
 *
 * The styling lives in app/globals.css as `.hero-split-*` (plus the shared
 * `.leu-grain`); this file owns the markup and the copy sources. The halves'
 * hover grow, the seam's glow and every other movement stop under
 * prefers-reduced-motion in that block.
 */
export function HeroSection() {
  return (
    <section
      id={sectionIds.hero}
      // Out of the tab order but focusable, so the header's and footer's
      // scroll to #hero (lib/scrollUtils.ts) can move focus here.
      tabIndex={-1}
      // The height is a floor at every width, never a lock: the header is
      // `fixed`, so this section starts at y=0 underneath it and reserves the
      // header's 80px band as `.hero-split-top`'s padding, and a column too
      // tall for the space grows the page rather than being clipped by
      // `overflow-hidden`. `isolate` keeps the grain's `overlay` blend
      // resolving against the hero alone.
      className="hero-split relative isolate flex flex-col overflow-hidden outline-none min-h-[calc(100vh-80px)] lg:min-h-screen"
    >
      <div className="hero-split-top">
        <div className="hero-split-mark">
          <Image
            src={companyInfo.logo}
            alt={companyInfo.logoAlt}
            fill
            sizes="150px"
            className="object-contain"
            priority
          />
        </div>
        <h1 className="hero-split-title">{companyInfo.heroTitle}</h1>
        <p className="hero-split-sub">{companyInfo.heroSubtitle}</p>
        <p className="hero-split-lede">{heroFork.lede}</p>
      </div>

      <div className="hero-split-fork">
        <Link
          href={businessMasteryPage}
          className="hero-split-half hero-split-half--bm"
        >
          <div className="hero-split-inner">
            <p className="hero-split-who">{heroFork.businessMastery.label}</p>
            <h2 className="hero-split-half-title">
              {heroFork.businessMastery.title}
            </h2>
            <p className="hero-split-blurb">{heroFork.businessMastery.blurb}</p>
            <span className="hero-split-go">
              {heroFork.businessMastery.cta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </Link>

        {/* Decorative: the lede already says "two ways" in words. Between the
            two halves in the markup so that, stacked, it falls between them
            as a divider; side by side it is the lit seam. */}
        <div className="hero-split-or" aria-hidden="true">
          <span>or</span>
        </div>

        <Link
          href={venturePages.lmm}
          className="hero-split-half hero-split-half--ls"
        >
          <div className="hero-split-inner">
            <p className="hero-split-who">{heroFork.leeSystems.label}</p>
            <h2 className="hero-split-half-title">
              {heroFork.leeSystems.title}
            </h2>
            <p className="hero-split-blurb">{heroFork.leeSystems.blurb}</p>
            <span className="hero-split-go">
              {heroFork.leeSystems.cta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>

      <div className="hero-split-ribbon">
        <p className="hero-split-stat">
          <b>50+</b>
          <span>Businesses built</span>
        </p>
        <p className="hero-split-stat">
          <b>1,000+</b>
          <span>Businesses worked with</span>
        </p>
        <p className="hero-split-stat">
          <b>$150,000+</b>
          <span>Generated for our clients</span>
        </p>
      </div>

      <div className="leu-grain" aria-hidden="true" />
    </section>
  );
}
