/**
 * Websites, at card scale: the route a visitor takes down a page, with a single
 * dot walking it.
 *
 * WHY THIS IS NOT `BrowserFrameVisual` SHRUNK. That component's scan rail is
 * built on absolute pixels tuned for a ~576px panel - `grid-cols-[18px_1fr]`,
 * `h-[18px]` badges, and a `BADGE_CENTER_OFFSET` of 11px that puts the rail
 * between badge centres. Those do not scale with their container, so in a
 * ~340px card the badges stay full size while everything around them halves.
 * Reusing it would have meant exporting its internals and threading a size
 * through them, which is a change to a file /lee-marketing-mastery/websites
 * renders - and `typescript.ignoreBuildErrors: true` in next.config.mjs means a
 * regression there would not fail the build.
 *
 * WHAT IS ACTUALLY SHARED is the mechanism, which is the part worth sharing.
 * The `.lmm-scan-*` classes carry no geometry at all: `lmmScanDot` animates
 * `top` from 0% to 100% *of its own parent*, and the three stops sequence
 * purely by each one delaying a third of the shared cycle. So the same three
 * classes drive the same three-stop hand-off at any size, on any row height,
 * with no constant to keep in step except the cycle length below.
 *
 * The three stops are the same three claims the websites page makes in its own
 * hero and outcome strip, compressed. They are claims about what gets built for
 * the visitor's decision, not specifications - the bar that page sets for
 * anything appearing inside this frame.
 *
 * Decorative: hidden from assistive technology. All three labels are restated
 * as real text in the door card's points list beneath it.
 */

/**
 * Must match the duration on `.lmm-scan-dot` / `.lmm-scan-badge` /
 * `.lmm-scan-label` in app/globals.css, which is shared with
 * `BrowserFrameVisual`. Each stop offsets by one third of this, which is what
 * puts them in sequence: a row's dot reaches the bottom of its own row exactly
 * as the next row's cycle begins, so the three read as one dot moving down the
 * page.
 */
const LMM_SCAN_CYCLE_SECONDS = 10.5;

/** Half the badge height, so the rail runs between badge centres, not row edges. */
const BADGE_CENTER_OFFSET = "8px";

const stops = [
  { label: "Says what you do", Block: HeadlineBlock },
  { label: "Proof they can check", Block: ProofBlock },
  { label: "One obvious next step", Block: ActionBlock },
];

export function MiniConvertVisual() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-lg border border-white/10 bg-neutral-900/80"
    >
      {/* Browser chrome, at the smallest size that still reads as a browser. */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-neutral-950/60 px-2.5 py-2">
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        </span>
        <span className="ml-1 flex-1 rounded border border-white/10 bg-neutral-900 px-1.5 py-0.5 text-[8px] text-neutral-500">
          yourbusiness.com
        </span>
      </div>

      <div className="space-y-2.5 p-2.5">
        {/* Nav, deliberately unannotated: every site has one, so a stop here
            would be spent on something outside the decision. */}
        <div className="flex items-center justify-between">
          <span className="h-2 w-10 rounded bg-amber-400/50" />
          <span className="flex gap-1">
            <span className="h-1.5 w-5 rounded bg-neutral-700" />
            <span className="h-1.5 w-5 rounded bg-neutral-700" />
            <span className="h-1.5 w-7 rounded bg-amber-400/40" />
          </span>
        </div>

        {/* A two-column grid rather than an absolutely positioned overlay: the
            rows are content-height, so anything pinned by coordinate would need
            magic numbers and would break at the first content change. Each row
            owns its own rail segment and its own dot, so no element needs to
            know where the others sit. */}
        <div className="grid grid-cols-[14px_1fr] gap-x-2">
          {stops.map(({ label, Block }, i) => (
            <Stop key={label} index={i} label={label} isLast={i === stops.length - 1}>
              <Block />
            </Stop>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StopProps {
  index: number;
  label: string;
  isLast: boolean;
  children: React.ReactNode;
}

function Stop({ index, label, isLast, children }: StopProps) {
  const delay = { animationDelay: `${index * (LMM_SCAN_CYCLE_SECONDS / 3)}s` };

  return (
    <>
      <div className="relative flex items-start justify-center">
        <span
          style={delay}
          className="lmm-scan-badge relative z-10 mt-px flex h-[14px] w-[14px] items-center justify-center rounded-full border border-amber-400/50 bg-neutral-950 font-mono text-[8px] font-semibold text-amber-400"
        >
          {index + 1}
        </span>

        {/* Runs past the bottom of the row on every stop but the last, so it
            reaches the next badge's centre. The last one stops short instead,
            landing level with the button in the block beside it - the route
            should end on the thing the visitor is meant to click. */}
        <span
          style={{
            top: BADGE_CENTER_OFFSET,
            bottom: isLast ? "14px" : `-${BADGE_CENTER_OFFSET}`,
          }}
          className="absolute left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-amber-400/30"
        >
          <span
            style={delay}
            className="lmm-scan-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.95)]"
          />
        </span>
      </div>

      <div className="pb-2.5 last:pb-0">
        <p
          style={delay}
          className="lmm-scan-label mb-1.5 text-[9px] font-medium leading-tight text-amber-200/80"
        >
          {label}
        </p>
        {children}
      </div>
    </>
  );
}

function HeadlineBlock() {
  return (
    <div className="rounded border border-white/[0.06] bg-gradient-to-br from-amber-400/[0.07] to-transparent p-2">
      <span className="mb-1.5 block h-2.5 w-3/4 rounded bg-neutral-600" />
      <span className="mb-2 block h-1.5 w-full rounded bg-neutral-800" />
      <span className="inline-block h-3.5 w-16 rounded bg-amber-400/70" />
    </div>
  );
}

function ProofBlock() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded border border-white/[0.06] bg-neutral-950/50 p-1.5">
          <span className="mb-1 block h-3 w-3 rounded border border-amber-400/25 bg-amber-400/10" />
          <span className="block h-1 w-full rounded bg-neutral-700" />
        </div>
      ))}
    </div>
  );
}

/** The point of the whole offering, which is why it is the last stop. */
function ActionBlock() {
  return (
    <div className="rounded border border-amber-400/20 bg-amber-400/[0.04] p-2">
      <div className="grid grid-cols-2 gap-1.5">
        <span className="h-2.5 rounded border border-white/10 bg-neutral-900" />
        <span className="h-2.5 rounded border border-white/10 bg-neutral-900" />
      </div>
      <span className="mt-1.5 block h-3.5 w-16 rounded bg-amber-400/70" />
    </div>
  );
}
