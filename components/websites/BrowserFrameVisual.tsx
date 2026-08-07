import { LMM_SCAN_CYCLE_SECONDS } from "@/components/lmm/scanCycle";

/**
 * The hero visual: a stylized browser window wrapping a wireframe of a business
 * page, annotated with the route a visitor takes through it.
 *
 * Deliberately a wireframe rather than a screenshot. A screenshot of a real site
 * would need to be a site we actually built, and the ones we have are already
 * shown - with links - in the portfolio section further down the page. An
 * abstract frame here promises nothing it cannot back up.
 *
 * Why it is annotated. The page sells a job - turning a visitor into a customer
 * - and an unlabeled wireframe illustrates the artifact instead. It was a
 * picture of a website with no visitor anywhere in it, which made it the one
 * hero visual across the three LMM pages that did not carry its page's
 * argument: `AutomationFlowVisual` shows work moving through a system and
 * `ChannelMixVisual` shows one customer being reached from every side. Worse, a
 * uniformly grey page with a vague headline block is what this page argues
 * loses, so the hero was quietly illustrating the failure mode.
 *
 * The three stops are the same three claims the copy already makes - the
 * "sells" column in `WebsitesProblemSection`, echoed by the outcome strip tiles
 * - so the diagram and the prose argue one thing rather than two adjacent
 * things. They are claims about what gets built for the visitor's decision, not
 * specifications, which is the bar the removed chip row set for anything
 * appearing in this frame (see the note at the foot of this file).
 *
 * Decorative: hidden from assistive technology. Nothing here is load-bearing -
 * all three labels are stated in real text in the outcome strip immediately
 * below, which is what a screen reader gets instead.
 */

/**
 * Ordered as the visitor moves, top to bottom. Each stop renders the wireframe
 * block it annotates as its own child, so a label and the thing it points at
 * cannot drift apart - as siblings, reordering the wireframe would silently
 * leave the annotations pointing at the wrong rows.
 */
const stops = [
  { label: "Says what you do, in one line", Block: HeroBlock },
  { label: "Proof they can check themselves", Block: ProofRow },
  { label: "One obvious next step", Block: NextStepBlock },
];

/**
 * Each stop is offset by one share of the shared cycle, which is what puts the
 * three of them in sequence: a row's dot finishes its travel exactly as the
 * next row's dot starts, so they hand off at the same point on the line and
 * read as one dot. The number itself lives in `components/lmm/scanCycle.ts`
 * because the hub's offering switch and its websites door card drive the same
 * CSS classes and have to agree with this file about it.
 */

/**
 * Half the badge height plus its top margin, so the line and the dot run
 * between badge *centers* rather than between row edges. Because every row
 * carries the same badge, the same offset is correct at both ends of a
 * segment - it lands on this row's badge at 0% and the next row's at 100%.
 */
const BADGE_CENTER_OFFSET = "11px";

export function BrowserFrameVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-7"
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Your Site
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
          <span className="lmm-status h-1.5 w-1.5 rounded-full bg-amber-400" />
          Live
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-900/80">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-950/60 px-3 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-700" />
            <span className="h-2 w-2 rounded-full bg-neutral-700" />
            <span className="h-2 w-2 rounded-full bg-neutral-700" />
          </span>
          <span className="ml-1 flex-1 rounded border border-white/10 bg-neutral-900 px-2 py-1 text-[10px] text-neutral-500">
            yourbusiness.com
          </span>
        </div>

        {/* Page wireframe */}
        <div className="space-y-4 p-4">
          {/* Nav - deliberately unannotated. Every site has one, so a stop here
              would be spent on something that is not part of the decision. */}
          <div className="flex items-center justify-between">
            <span className="h-3 w-16 rounded bg-amber-400/50" />
            <span className="flex gap-2">
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-12 rounded bg-amber-400/40" />
            </span>
          </div>

          {/* The scan path. A two-column grid rather than an overlay positioned
              absolutely against the blocks: the wireframe rows are
              content-height, so anything pinned by coordinate would need magic
              numbers and would break at the first content change. The narrow
              column carries the route and the numbered stops; the wide one
              carries each label and the block it belongs to.

              Each row owns its own segment of the line and its own dot, so no
              element needs to know where the others sit - see the sequencing
              note above `@keyframes lmmScanDot` in app/globals.css. */}
          <div className="grid grid-cols-[18px_1fr] gap-x-2.5">
            {stops.map(({ label, Block }, i) => (
              <Stop
                key={label}
                index={i}
                label={label}
                isLast={i === stops.length - 1}
              >
                <Block />
              </Stop>
            ))}
          </div>
        </div>
      </div>

      {/* A row of three chips - "Mobile ready", "Fast loading", "Built to
          convert" - used to close the frame here, and it was removed on
          purpose. Please do not add it back.

          Two of the three advertised the floor. A phone layout and a page that
          loads quickly are what any competent build starts from in 2026, so
          naming them as selling points tells a buyer our bar is low, not high.
          WebsitesOutcomeStrip made the same call and its header comment records
          it; these chips sat in the first screen, beside the H1, which made
          them the worst-placed copy on the page. Both things still get built.
          They are answered when asked - see the "Will the site work on phones?"
          answer in data/websites.ts - and they are never sold.

          The third chip was true and on-argument, but it was already said twice
          within one screen: the hero eyebrow above reads "WEBSITES BUILT TO
          CONVERT" and the outcome strip immediately below breaks that promise
          into four parts. So the row was dropped rather than rewritten, and the
          promises are carried by the strip, in real text that assistive
          technology can reach - which this frame, being decorative and
          aria-hidden, cannot. If a caption is ever wanted here, it has to be a
          claim about what gets built for the visitor's decision, not a
          specification - which is the test the three scan-path labels above
          were written against. */}
    </div>
  );
}

interface StopProps {
  index: number;
  label: string;
  isLast: boolean;
  children: React.ReactNode;
}

/**
 * One numbered stop: the badge and this row's segment of the route in the
 * narrow column, the label and the wireframe block it annotates in the wide
 * one. The badge is opaque and above the line so the route appears to pass
 * behind it rather than through it.
 *
 * The segment doubles as the dot's track - the dashed border and the dot share
 * one positioned element, so the dot cannot drift off the line no matter how
 * the row's content resizes.
 */
function Stop({ index, label, isLast, children }: StopProps) {
  const delay = { animationDelay: `${index * (LMM_SCAN_CYCLE_SECONDS / 3)}s` };

  return (
    <>
      {/* Stretches to the row height, which is what makes the segment below
          span exactly from this badge to the next one. */}
      <div className="relative flex items-start justify-center">
        <span
          style={delay}
          className="lmm-scan-badge relative z-10 mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-amber-400/50 bg-neutral-950 font-mono text-[9px] font-semibold text-amber-400"
        >
          {index + 1}
        </span>

        {/* Runs past the bottom of the row on every stop but the last, so it
            reaches the next badge's center. On the last one it stops short
            instead, landing level with the submit button in the block beside
            it - the route should end on the thing the visitor is meant to
            click, not trail off the bottom of the frame. */}
        <span
          style={{
            top: BADGE_CENTER_OFFSET,
            bottom: isLast ? "18px" : `-${BADGE_CENTER_OFFSET}`,
          }}
          className="absolute left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-amber-400/30"
        >
          <span
            style={delay}
            className="lmm-scan-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_7px_rgba(251,191,36,0.95)]"
          />
        </span>
      </div>

      <div className="pb-4 last:pb-0">
        <p
          style={delay}
          className="lmm-scan-label mb-2 text-[11px] font-medium leading-tight text-amber-200/80"
        >
          {label}
        </p>
        {children}
      </div>
    </>
  );
}

function HeroBlock() {
  return (
    <div className="rounded-md border border-white/[0.06] bg-gradient-to-br from-amber-400/[0.07] to-transparent p-4">
      <span className="mb-2.5 block h-4 w-3/4 rounded bg-neutral-600" />
      <span className="mb-2 block h-2 w-full rounded bg-neutral-800" />
      <span className="mb-4 block h-2 w-5/6 rounded bg-neutral-800" />
      <span className="inline-block h-6 w-28 rounded bg-amber-400/70" />
    </div>
  );
}

function ProofRow() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-md border border-white/[0.06] bg-neutral-950/50 p-2.5"
        >
          <span className="mb-2 block h-5 w-5 rounded border border-amber-400/25 bg-amber-400/10" />
          <span className="mb-1.5 block h-1.5 w-full rounded bg-neutral-700" />
          <span className="block h-1.5 w-2/3 rounded bg-neutral-800" />
        </div>
      ))}
    </div>
  );
}

/** The point of the whole page, which is why it is the last stop on the route. */
function NextStepBlock() {
  return (
    <div className="rounded-md border border-amber-400/20 bg-amber-400/[0.04] p-3">
      <span className="mb-2.5 block h-2 w-24 rounded bg-neutral-600" />
      <div className="grid grid-cols-2 gap-2">
        <span className="h-4 rounded border border-white/10 bg-neutral-900" />
        <span className="h-4 rounded border border-white/10 bg-neutral-900" />
      </div>
      <span className="mt-2 block h-4 rounded border border-white/10 bg-neutral-900" />
      <span className="mt-2.5 block h-5 w-24 rounded bg-amber-400/70" />
    </div>
  );
}
