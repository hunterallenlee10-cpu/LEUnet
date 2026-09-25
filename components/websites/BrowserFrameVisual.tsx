import { LS_SCAN_CYCLE_SECONDS } from "@/components/lee-systems/scanCycle";

/**
 * The hero visual: a stylized browser window wrapping a wireframe of a business
 * page, annotated with the route a visitor takes through it.
 *
 * Deliberately a wireframe rather than a screenshot. A screenshot would need
 * to be a site we actually built, and the portfolio further down the page is
 * still a placeholder. An abstract frame promises nothing it cannot back up.
 *
 * It is annotated with the three things a page has to do for a visitor to
 * act on it, which is the argument the websites page makes in prose. Those
 * are claims about what gets built for the visitor's decision, not
 * specifications (see the note at the foot of this file).
 *
 * Decorative: hidden from assistive technology. The hero copy beside it and
 * the "Included in Every Site" section below state the same things in text.
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
 * read as one dot. The number itself lives in
 * `components/lee-systems/scanCycle.ts`, next to the CSS it has to match.
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
      className="rounded-xl border border-white/10 bg-white/[0.04] p-5 md:p-7"
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Your Site
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
          <span className="ls-status h-1.5 w-1.5 rounded-full bg-brass-400" />
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
            <span className="h-3 w-16 rounded bg-brass-400/50" />
            <span className="flex gap-2">
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-12 rounded bg-brass-400/40" />
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
              note above `@keyframes lsScanDot` in app/globals.css. */}
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

      {/* There used to be a row of spec chips under this frame ("Mobile-first",
          "Fast", and so on). It was removed: a decorative, aria-hidden frame is
          the wrong place for promises, because assistive technology cannot
          reach them. Those basics are now stated in real text in the
          "Included in Every Site" section. If a caption is ever wanted here,
          it should be a claim about what gets built for the visitor's
          decision, which is the test the three scan-path labels above were
          written against. */}
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
  const delay = { animationDelay: `${index * (LS_SCAN_CYCLE_SECONDS / 3)}s` };

  return (
    <>
      {/* Stretches to the row height, which is what makes the segment below
          span exactly from this badge to the next one. */}
      <div className="relative flex items-start justify-center">
        <span
          style={delay}
          className="ls-scan-badge relative z-10 mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-brass-400/50 bg-neutral-950 font-mono text-[9px] font-semibold text-brass-400"
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
          className="absolute left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-brass-400/30"
        >
          <span
            style={delay}
            className="ls-scan-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-400 shadow-[0_0_7px_rgba(212,168,87,0.95)]"
          />
        </span>
      </div>

      <div className="pb-4 last:pb-0">
        <p
          style={delay}
          className="ls-scan-label mb-2 text-[11px] font-medium leading-tight text-brass-200/80"
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
    <div className="rounded-md border border-white/[0.06] bg-gradient-to-br from-brass-400/[0.07] to-transparent p-4">
      <span className="mb-2.5 block h-4 w-3/4 rounded bg-neutral-600" />
      <span className="mb-2 block h-2 w-full rounded bg-neutral-800" />
      <span className="mb-4 block h-2 w-5/6 rounded bg-neutral-800" />
      <span className="inline-block h-6 w-28 rounded bg-brass-400/70" />
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
          <span className="mb-2 block h-5 w-5 rounded border border-brass-400/25 bg-brass-400/10" />
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
    <div className="rounded-md border border-brass-400/20 bg-brass-400/[0.04] p-3">
      <span className="mb-2.5 block h-2 w-24 rounded bg-neutral-600" />
      <div className="grid grid-cols-2 gap-2">
        <span className="h-4 rounded border border-white/10 bg-neutral-900" />
        <span className="h-4 rounded border border-white/10 bg-neutral-900" />
      </div>
      <span className="mt-2 block h-4 rounded border border-white/10 bg-neutral-900" />
      <span className="mt-2.5 block h-5 w-24 rounded bg-brass-400/70" />
    </div>
  );
}
