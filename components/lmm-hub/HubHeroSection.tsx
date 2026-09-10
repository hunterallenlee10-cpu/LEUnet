import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LMM_SCAN_CYCLE_SECONDS } from "@/components/lmm/scanCycle";
import { hubOfferings } from "@/components/lmm-hub/hubOfferings";
import { HubHeroTypedWord } from "@/components/lmm-hub/HubHeroTypedWord";
import { LmmSignalRoutes } from "@/components/lmm/LmmSignalRoutes";

/**
 * The venture hub's first screen.
 *
 * A SERVER COMPONENT, unlike all three deep-page heroes. Those are `"use
 * client"` for one reason each: a CTA calling `smoothScrollToElement`. This
 * hero's in-page CTAs are plain `<a href="#...">`, and `app/globals.css`
 * already sets `scroll-behavior: smooth` on `html` with `scroll-padding-top:
 * 80px` to clear the fixed header - which is everything that JS was buying.
 * The one client bundle the hub ships is `HubHeroTypedWord`, the headline's
 * typed word: that is state on a timer, which no stylesheet can express, and
 * it is deliberately a leaf so everything else here still renders on the
 * server. Keep it that way: a scroll helper here would pull the whole hub
 * into the client for an effect the stylesheet already provides.
 *
 * The right column is the page's primary navigation as well as its opening
 * animation. A visitor arriving from the header dropdown almost always wants
 * one specific offering, and before this page existed the dropdown row handed
 * them the automation page whatever they wanted. Making them scroll past a
 * company pitch to reach a link would repeat that mistake in a politer form,
 * so all three deep links sit above the fold on desktop, and the scan
 * sequence walking them is the argument the H1 makes - three jobs, in order.
 */
export function HubHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-950 to-amber-950/10 py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-slate-400/5 blur-3xl" />
      </div>

      {/* Outside the wrapper above, deliberately. This section is `relative`
          with no z-index, so it opens no stacking context and that wrapper's
          `-z-10` puts its children behind the section's OWN background — which
          is `from-neutral-950`, opaque everywhere but the translucent amber
          corner it ends on. The orbs have always been mostly swallowed by it;
          a field of 1px routes put back there would have been invisible
          outright. Left at `z-0` the layer paints over the gradient, and the
          column below carries `z-[1]` to stay over the layer.

          Shared with the homepage teaser that links here, and still no client
          bundle: the layer is markup and a stylesheet, so the hub's only
          client leaf remains HubHeroTypedWord. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <LmmSignalRoutes />
      </div>

      <div className="section-container relative z-[1]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {/* Decorative: the eyebrow beside it names the venture, so an alt
                  would only repeat it to a screen reader. */}
              <Image
                src="/lee-marketing-mastery-logo.png"
                alt=""
                width={64}
                height={64}
                priority
                className="h-14 w-14 shrink-0 rounded-full md:h-16 md:w-16"
              />
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <span className="lmm-status h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-sm font-semibold tracking-wide text-amber-400">
                  LEE MARKETING MASTERY
                </span>
              </div>
            </div>

            {/* One verb, three typed objects: the animated word walks the same
                journey the switch beside it names - its first two stops are
                literally labelled "Get found" and "Get chosen" - so the first
                screen still states the structure of the page twice, once as a
                claim and once as navigation. The third word is "Paid" where
                the rail says "followed up with": the rail names the mechanism,
                the headline names what the mechanism is for. "Get" stays
                static and white; the word beside it carries the hero's
                gradient accent, exactly where "One Company." used to.

                Assistive technology gets all three words once, in order, from
                the sr-only line, and the visible half is aria-hidden to match
                - both halves of a contract HubHeroTypedWord documents but
                cannot enforce from inside the hidden span. */}
            <h1 className="heading-xl mb-6 text-white">
              <span className="sr-only">Get Found. Get Chosen. Get Paid.</span>
              <span aria-hidden="true">
                Get <HubHeroTypedWord />
              </span>
            </h1>

            {/* First sentence is the marketing page's own words, promoted here
                because it is the clearest statement of the venture anywhere on
                the site. The middle clause is data/ventures.ts. Nothing in this
                paragraph is new - the hub's job is to say what the three pages
                already say, in one place, once. */}
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Getting attention, converting it, and following up are three
              different jobs. Lee Marketing Mastery does all three - marketing,
              websites, and business automation - for owners who would rather
              have the work done than manage it. Take one, or take all three.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#offerings"
                className="btn-primary group inline-flex items-center justify-center gap-2"
              >
                See the Three Offerings
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#start"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Start a Conversation
              </a>
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              Scope agreed before anything is built, and quoted per project.{" "}
              <Link
                href="/"
                className="font-semibold text-neutral-300 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
              >
                Part of Lee Enterprises Unlimited
              </Link>
              .
            </p>
          </div>

          <HubOfferingSwitch />
        </div>
      </div>
    </section>
  );
}

/** Half the badge height plus its top margin: where this row's badge centre sits. */
const BADGE_CENTER_OFFSET = "11px";

/**
 * How far the rail has to overhang the bottom of its row to reach the NEXT
 * row's badge centre: this row's `py-2.5` bottom padding (10px) + the next
 * row's top padding (10px) + that badge's `mt-0.5` (2px) + half its 18px height
 * (9px) = 31px.
 *
 * `BrowserFrameVisual` and `MiniConvertVisual` get away with reusing
 * BADGE_CENTER_OFFSET here because all of their stops are cells of ONE grid
 * with no padding between rows, so a row's content box ends exactly where the
 * next one begins. These rows are separate padded `<Link>` elements - the
 * padding is what gives each one its hover target - so that invariant does not
 * hold and the rail fell 20px short, leaving three visibly disconnected
 * segments and a dot that jumped at every hand-off. If the row padding changes,
 * this number changes with it.
 */
const RAIL_OVERHANG = "-31px";

/**
 * Three rows, each a link to one offering's page, walked by the same scan
 * sequence the websites page uses on its hero wireframe.
 *
 * The rows are links rather than buttons over a diagram: they are navigation
 * first and animation second. A visitor who ignores the motion entirely still
 * sees three named destinations with a sentence each, which is what a nav
 * flyout would have given them - the sequence only adds the claim that they
 * happen in an order.
 *
 * Each row delays by a third of the shared cycle, which is what sequences them:
 * a row's dot reaches the bottom of its own segment exactly as the next row's
 * cycle starts, so the three read as one dot walking down the list and then
 * starting over. That restart is the point - the three jobs are a loop, not a
 * checklist - and the caption under the rows says so in words, because under
 * prefers-reduced-motion the dot is removed entirely rather than parked.
 */
function HubOfferingSwitch() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-7">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          What We Do
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
          <span className="lmm-status h-1.5 w-1.5 rounded-full bg-amber-400" />
          In order
        </span>
      </div>

      <div>
        {hubOfferings.map(({ id, job, name, href, Icon, switchLine }, i) => {
          const delay = {
            animationDelay: `${i * (LMM_SCAN_CYCLE_SECONDS / 3)}s`,
          };
          const isLast = i === hubOfferings.length - 1;

          return (
            <Link
              key={id}
              href={href}
              className="group grid grid-cols-[18px_1fr] gap-x-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-amber-400/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              {/* The badge is opaque and above the rail, so the route appears
                  to pass behind it rather than through it. The rail overhangs
                  the row on every stop but the last, which is how it reaches
                  the next badge's centre without either row knowing the other's
                  height. */}
              <span className="relative flex items-start justify-center">
                <span
                  style={delay}
                  className="lmm-scan-badge relative z-10 mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-amber-400/50 bg-neutral-950 font-mono text-[9px] font-semibold text-amber-400"
                >
                  {i + 1}
                </span>
                {/* The last row's rail stops at a fixed distance from the
                    bottom rather than at a percentage: it used to end at 50% of
                    a content-driven row height, which would move the moment a
                    `switchLine` wrapped to two lines. 30px lands it just under
                    the offering name, so the route ends on the thing being
                    named rather than trailing off the panel. */}
                <span
                  style={{
                    top: BADGE_CENTER_OFFSET,
                    bottom: isLast ? "30px" : RAIL_OVERHANG,
                  }}
                  className="absolute left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-amber-400/30"
                >
                  <span
                    style={delay}
                    className="lmm-scan-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_7px_rgba(251,191,36,0.95)]"
                  />
                </span>
              </span>

              <span className="block">
                <span
                  style={delay}
                  className="lmm-scan-label mb-1 block text-[11px] font-semibold uppercase tracking-widest text-amber-200/80"
                >
                  {job}
                </span>
                <span className="mb-1 flex items-center gap-2">
                  <Icon
                    className="h-4 w-4 shrink-0 text-amber-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold text-white transition-colors group-hover:text-amber-400">
                    {name}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-amber-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
                <span className="block text-xs leading-relaxed text-neutral-400">
                  {switchLine}
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* States the loop in words. The sequence above already restarts, but
          under prefers-reduced-motion the dot is removed entirely and this
          becomes three static rows - and "three jobs" without "then it happens
          again" reads as a project with an end.

          "Each is sold on its own" rather than "most owners start with one":
          docs/WEBSITES.md §3.3 bans asserting how often anything happens, "least
          of all among our own clients", and there is no client base here to
          count. How the offerings are *sold* is a fact about the business; how
          often they are bought would be a statistic nobody can produce. */}
      <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-neutral-400">
        Then it starts again with the next customer. Each is scoped and quoted
        on its own, so one is a complete place to start.
      </p>
    </div>
  );
}
