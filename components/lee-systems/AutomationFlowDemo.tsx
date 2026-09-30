"use client";

import clsx from "clsx";
import {
  BarChart3,
  CalendarCheck,
  Check,
  ClipboardList,
  Database,
  Inbox,
  MessageSquare,
  Send,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { usePlayWhenVisible } from "@/components/lee-systems/usePlayWhenVisible";

/**
 * "Example: a new lead": one new lead running through a Lee Systems Co.
 * automation, in a window made to look like the tool it is built in. It was
 * the hero of /lee-systems/automation until that page folded into
 * /lee-systems (2026-09-29), and it is self-contained so it can go anywhere:
 * placing it is the one line `<AutomationFlowDemo />`, and `className` sizes
 * or positions it. Its timing and keyframes are all in this file, and the
 * only thing it takes from the site is the Tailwind theme's brass colours.
 *
 * What it plays, once it scrolls into view (the owner's ask, 2026-09-30, for
 * something more realistic than every wire looping its own packet at once):
 * the lead arrives, and each step runs in order - a spinner, then a tick and
 * a line saying what it did - while the wires between them fill with gold as
 * the lead passes along. When the last step is done the badge reads
 * "Completed", everything clears together, and it runs again.
 *
 * The lead is Alex, who sends the form in the website demo further down the
 * page (WebsiteBuildDemo). Nothing in it is a figure, a duration or a client:
 * each card says only what the page already says the system does.
 *
 * It flows top to bottom, a tree of 1 / 2 / 1 / 3 cards, so one layout fits
 * every width with full-size text (the owner's choice, 2026-09-30). The
 * wires are measured from where the cards actually are, so they land on the
 * cards' ports at any width and after any change to the cards.
 *
 * Decorative: hidden from assistive technology, header included. The page
 * around it says in words what the system does ("What we do", just above it
 * on /lee-systems).
 */

type NodeId =
  | "lead"
  | "reply"
  | "intake"
  | "crm"
  | "followup"
  | "booked"
  | "report";

/**
 * The steps, in the order the lead reaches them (which the timing below
 * relies on). Each says what it is while it waits (`idle`) and what it did
 * once it has run (`done`). The two emphasised steps are where the owner's
 * attention is actually needed.
 */
const nodes: {
  id: NodeId;
  label: string;
  Icon: LucideIcon;
  idle: string;
  done: string;
  emphasis?: boolean;
}[] = [
  { id: "lead", label: "New lead", Icon: Inbox, idle: "Trigger", done: "Alex · website" },
  { id: "reply", label: "Instant reply", Icon: MessageSquare, idle: "Text message", done: "Text sent" },
  { id: "intake", label: "Intake form", Icon: ClipboardList, idle: "Form", done: "Filled in" },
  { id: "crm", label: "Your CRM", Icon: Database, idle: "Contact", done: "Contact saved", emphasis: true },
  { id: "followup", label: "Follow-up sequence", Icon: Send, idle: "Messages", done: "Started" },
  { id: "booked", label: "Booked appointment", Icon: CalendarCheck, idle: "Calendar", done: "On calendar", emphasis: true },
  { id: "report", label: "Daily report", Icon: BarChart3, idle: "Email", done: "In the report" },
];

/** The tree, top to bottom. */
const rows: NodeId[][] = [
  ["lead"],
  ["reply", "intake"],
  ["crm"],
  ["followup", "booked", "report"],
];

/** Where the lead goes from each step. */
const edges: { from: NodeId; to: NodeId }[] = [
  { from: "lead", to: "reply" },
  { from: "lead", to: "intake" },
  { from: "reply", to: "crm" },
  { from: "intake", to: "crm" },
  { from: "crm", to: "followup" },
  { from: "crm", to: "booked" },
  { from: "crm", to: "report" },
];

/* -------------------------------------------------------------- timing -- */

/** How long a step shows its spinner, and how long the lead takes along a wire. */
const RUN_SECONDS = 0.7;
const TRAVEL_SECONDS = 0.7;
/** The gap between wires leaving the same step, so a fan-out reads in order. */
const STAGGER_SECONDS = 0.25;
/** When the lead arrives, from the start of the loop. */
const FIRST_START = 0.5;
/** How long the finished run stays up, how long it takes to clear, and the rest after. */
const HOLD_SECONDS = 3.2;
const CLEAR_SECONDS = 0.5;
const IDLE_SECONDS = 1;

/**
 * When each step starts and each wire sets off, worked out from the graph
 * rather than written by hand: a wire sets off once its step has run (the
 * step's later wires STAGGER_SECONDS apart), and a step starts once the last
 * of its wires has arrived. `nodes` is in the order the lead reaches them,
 * so every step's wires in are known before the step is.
 */
const nodeStart = {} as Record<NodeId, number>;
const edgeStart: number[] = [];
for (const { id } of nodes) {
  const arrivals = edges.flatMap((e, i) => (e.to === id ? [edgeStart[i] + TRAVEL_SECONDS] : []));
  nodeStart[id] = arrivals.length ? Math.max(...arrivals) : FIRST_START;
  let k = 0;
  edges.forEach((e, i) => {
    if (e.from === id) edgeStart[i] = nodeStart[id] + RUN_SECONDS + k++ * STAGGER_SECONDS;
  });
}

/** The moments the loop is built around, in seconds from its start. */
const COMPLETE = Math.max(...Object.values(nodeStart)) + RUN_SECONDS;
const CLEAR = COMPLETE + HOLD_SECONDS;
const LOOP_SECONDS = CLEAR + CLEAR_SECONDS + IDLE_SECONDS;

/** A moment in the loop as a keyframe percentage. */
function pct(seconds: number) {
  return `${((seconds / LOOP_SECONDS) * 100).toFixed(3)}%`;
}

/* ----------------------------------------------------------- keyframes -- */

/**
 * A step's state is two numbers, `--afd-run` (its spinner) and `--afd-done`
 * (its tick), which its keyframes animate and everything inside it reads:
 * the spinner, the tick, the two subtitles, the ring and the ports. So each
 * step needs one small keyframe set, not one per piece. They are registered
 * with @property so they tween; a browser without it flips them instead.
 */
function nodeKeyframes(id: NodeId) {
  const start = nodeStart[id];
  return `
@keyframes afdNode-${id} {
  0%, ${pct(start)} { --afd-run: 0; --afd-done: 0; }
  ${pct(start + 0.15)}, ${pct(start + RUN_SECONDS - 0.1)} { --afd-run: 1; --afd-done: 0; }
  ${pct(start + RUN_SECONDS + 0.1)}, ${pct(CLEAR)} { --afd-run: 0; --afd-done: 1; }
  ${pct(CLEAR + CLEAR_SECONDS)}, 100% { --afd-run: 0; --afd-done: 0; }
}
.afd-node-${id} { animation-name: afdNode-${id}; }`;
}

/**
 * A wire's gold fill draws along it as the lead travels it (the fill path
 * has `pathLength="1"`, so a dash offset of 1 is empty and 0 is full), and
 * the packet rides the head of the fill on the same easing, so they move as
 * one. The fill stays until the run clears.
 */
function edgeKeyframes(i: number) {
  const start = edgeStart[i];
  const end = start + TRAVEL_SECONDS;
  return `
@keyframes afdFill-${i} {
  0%, ${pct(start)} { stroke-dashoffset: 1; opacity: 1; }
  ${pct(end)}, ${pct(CLEAR)} { stroke-dashoffset: 0; opacity: 1; }
  ${pct(CLEAR + CLEAR_SECONDS)} { stroke-dashoffset: 0; opacity: 0; }
  ${pct(CLEAR + CLEAR_SECONDS + 0.01)}, 100% { stroke-dashoffset: 1; opacity: 0; }
}
@keyframes afdPacket-${i} {
  0%, ${pct(start)} { offset-distance: 0%; opacity: 0; }
  ${pct(start + 0.1)}, ${pct(end - 0.1)} { opacity: 1; }
  ${pct(end)}, 100% { offset-distance: 100%; opacity: 0; }
}
.afd-fill-${i} { animation-name: afdFill-${i}; }
.afd-packet-${i} { animation-name: afdPacket-${i}; }`;
}

/**
 * All of the motion, kept with the diagram so it needs nothing from the page
 * or from app/globals.css. React hoists this <style> into <head> and, keyed
 * by `href`, writes it once however many copies of the diagram a page has.
 * The class and keyframe names carry the component's initials so nothing
 * else on the site can collide with them.
 *
 * Every element's own classes are its resting state, which is the finished
 * run: every step ticked, every wire lit, "Completed". The keyframes take it
 * back to waiting and run it forward again. So under prefers-reduced-motion,
 * where all of it stops, what is left is the whole run at a glance.
 *
 * Nothing plays until the diagram is on screen: every animation is paused
 * until usePlayWhenVisible sets `data-play="true"`, and paused again while it
 * is off screen. Without scripting it just plays.
 */
const styles = `
@property --afd-run { syntax: "<number>"; inherits: true; initial-value: 0; }
@property --afd-done { syntax: "<number>"; inherits: true; initial-value: 1; }
${nodes.map(({ id }) => nodeKeyframes(id)).join("")}
${edges.map((_, i) => edgeKeyframes(i)).join("")}
@keyframes afdRunning {
  0%, ${pct(COMPLETE)} { opacity: 1; }
  ${pct(COMPLETE + 0.3)}, ${pct(CLEAR + CLEAR_SECONDS)} { opacity: 0; }
  ${pct(CLEAR + CLEAR_SECONDS + 0.3)}, 100% { opacity: 1; }
}
@keyframes afdCompleted {
  0%, ${pct(COMPLETE)} { opacity: 0; }
  ${pct(COMPLETE + 0.3)}, ${pct(CLEAR + CLEAR_SECONDS)} { opacity: 1; }
  ${pct(CLEAR + CLEAR_SECONDS + 0.3)}, 100% { opacity: 0; }
}
@keyframes afdSpin {
  to { transform: rotate(360deg); }
}
@keyframes afdPulse {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.35); }
}

.afd-card {
  --afd-run: 0;
  --afd-done: 1;
  animation-duration: ${LOOP_SECONDS}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.afd-ring { opacity: var(--afd-run); }
.afd-spinner { opacity: var(--afd-run); }
.afd-spinner > svg { animation: afdSpin 0.8s linear infinite; }
.afd-tick { opacity: var(--afd-done); }
.afd-waiting { opacity: calc(1 - max(var(--afd-run), var(--afd-done))); }
.afd-idle { opacity: calc(1 - var(--afd-done)); }
.afd-done { opacity: var(--afd-done); }
.afd-port-in { opacity: max(var(--afd-run), var(--afd-done)); }
.afd-port-out { opacity: var(--afd-done); }

.afd-fill {
  stroke-dasharray: 1 1;
  stroke-dashoffset: 0;
  animation-duration: ${LOOP_SECONDS}s;
  animation-timing-function: cubic-bezier(0.55, 0, 0.45, 1);
  animation-iteration-count: infinite;
}
.afd-packet {
  opacity: 0;
  animation-duration: ${LOOP_SECONDS}s;
  animation-timing-function: cubic-bezier(0.55, 0, 0.45, 1);
  animation-iteration-count: infinite;
}
.afd-running { opacity: 0; animation: afdRunning ${LOOP_SECONDS}s ease-in-out infinite; }
.afd-completed { animation: afdCompleted ${LOOP_SECONDS}s ease-in-out infinite; }
.afd-pulse { animation: afdPulse 2.6s ease-in-out infinite; }

.afd-root:not([data-play="true"]),
.afd-root:not([data-play="true"]) * {
  animation-play-state: paused !important;
}
@media (scripting: none) {
  .afd-root:not([data-play="true"]),
  .afd-root:not([data-play="true"]) * {
    animation-play-state: running !important;
  }
}
@media (prefers-reduced-motion: reduce) {
  .afd-root * {
    animation: none !important;
  }
  .afd-packet,
  .afd-spinner {
    display: none;
  }
}
`;

/* -------------------------------------------------------------- wires -- */

/**
 * Where each wire runs, measured from the cards: from the bottom-centre of
 * the step it leaves to the top-centre of the step it reaches, as an S-curve
 * that leaves and arrives vertically. Measured rather than written down, so
 * the wires land on the ports at every width, whatever the cards' text
 * wraps to. The cards are never transformed, so their boxes are where they
 * are laid out. Empty until the first measurement.
 */
function useWires(canvasRef: RefObject<HTMLDivElement | null>) {
  const [wires, setWires] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const measure = () => {
      const card = (id: NodeId) =>
        canvas.querySelector<HTMLElement>(`[data-afd-node="${id}"]`);
      // A card's box in the canvas's own pixels, which are the overlay's
      // units. Dividing by the canvas's on-screen scale keeps it right even
      // if something above the diagram is scaled.
      const origin = canvas.getBoundingClientRect();
      const scale = canvas.offsetWidth / origin.width || 1;
      const box = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return {
          left: (r.left - origin.left) * scale,
          top: (r.top - origin.top) * scale,
          width: r.width * scale,
          height: r.height * scale,
        };
      };
      const round = (n: number) => Math.round(n * 100) / 100;
      const next = edges.map(({ from, to }) => {
        const a = card(from);
        const b = card(to);
        if (!a || !b) return "";
        const out = box(a);
        const into = box(b);
        const x1 = round(out.left + out.width / 2);
        const y1 = round(out.top + out.height);
        const x2 = round(into.left + into.width / 2);
        const y2 = round(into.top);
        const bend = round((y2 - y1) / 2);
        return `M ${x1} ${y1} C ${x1} ${y1 + bend}, ${x2} ${y2 - bend}, ${x2} ${y2}`;
      });
      setWires((prev) => (prev.join("|") === next.join("|") ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [canvasRef]);

  return wires;
}

/* ---------------------------------------------------------- component -- */

export function AutomationFlowDemo({ className }: { className?: string }) {
  const rootRef = usePlayWhenVisible<HTMLDivElement>();
  const canvasRef = useRef<HTMLDivElement>(null);
  const wires = useWires(canvasRef);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={clsx(
        "afd-root relative select-none rounded-xl border border-white/10 bg-white/[0.04] p-5 md:p-7",
        className
      )}
    >
      <style href="lee-systems-automation-flow-demo" precedence="default">
        {styles}
      </style>

      <span className="pointer-events-none absolute inset-x-[12%] top-[18%] bottom-[8%] -z-10 rounded-full bg-brass-400/[0.12] blur-3xl" />

      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-neutral-400">Example: a new lead</p>
        <span className="grid text-[11px]">
          <span className="afd-running col-start-1 row-start-1 flex items-center justify-end gap-1.5 text-neutral-400">
            <span className="afd-pulse h-1.5 w-1.5 rounded-full bg-brass-400" />
            Running
          </span>
          <span className="afd-completed col-start-1 row-start-1 flex items-center justify-end gap-1 font-medium text-brass-300">
            <Check className="h-3 w-3" strokeWidth={3} />
            Completed
          </span>
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-950/80 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <TitleBar />

        {/* The canvas. The cards are the only thing in flow; the wires are
            an overlay drawn from where the cards turned out to be (see
            useWires). The cards are positioned, so they paint over the
            wires, whose ends tuck under the ports. */}
        <div
          ref={canvasRef}
          className="@container relative bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px] px-2 py-5 [text-rendering:geometricPrecision] sm:px-5 sm:py-6"
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none">
            {wires.map((d, i) => d && <Wire key={i} d={d} index={i} />)}
          </svg>

          <div className="flex flex-col gap-8 sm:gap-9">
            {rows.map((row) => (
              <div
                key={row.join()}
                className={clsx("grid", row.length === 1 ? "grid-cols-4" : row.length === 2 ? "grid-cols-2" : "grid-cols-3")}
              >
                {row.map((id) => (
                  <div key={id} className={clsx("px-0.5 @min-[400px]:px-1.5", row.length === 1 && "col-span-2 col-start-2")}>
                    <Card id={id} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The tool's window bar: the workflow's name, and switched on. */
function TitleBar() {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900 px-3 py-2">
      <span className="flex shrink-0 gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
      </span>
      <span className="ml-1.5 flex min-w-0 items-center gap-1.5 text-[11px] font-medium leading-none text-neutral-300">
        <Workflow className="h-3 w-3 shrink-0 text-brass-300" />
        <span className="truncate">New lead workflow</span>
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-neutral-400">
        Active
        <span className="relative h-3.5 w-6 rounded-full bg-brass-400/85">
          <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-neutral-950" />
        </span>
      </span>
    </div>
  );
}

/**
 * One wire: a quiet base line, the gold fill that draws along it, and the
 * packet riding the fill's head. The overlay has no viewBox, so the path is
 * in pixels, which is also what the packet's `offset-path` reads.
 */
function Wire({ d, index }: { d: string; index: number }) {
  return (
    <g>
      <path d={d} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
      <path
        d={d}
        pathLength={1}
        stroke="#D4A857"
        strokeWidth="1.5"
        className={`afd-fill afd-fill-${index}`}
      />
      <circle
        r="3"
        fill="#E0BE78"
        className={`afd-packet afd-packet-${index}`}
        style={{ offsetPath: `path("${d}")`, filter: "drop-shadow(0 0 4px rgba(212,168,87,0.95))" }}
      />
    </g>
  );
}

/**
 * One step. Stacked (icon and status over the text) by default, and in one
 * row when the canvas is wide enough for every card, so a diagram never mixes
 * the two. Cards in a row stretch to one height, so their ports line up.
 */
function Card({ id }: { id: NodeId }) {
  const node = nodes.find((n) => n.id === id)!;
  const hasIn = edges.some((e) => e.to === id);
  const hasOut = edges.some((e) => e.from === id);

  return (
    <div
      data-afd-node={id}
      className={clsx(
        "afd-card relative grid h-full grid-cols-[1fr_auto] content-start items-center gap-x-2 gap-y-2 rounded-lg border p-2 @min-[400px]:p-2.5 @min-[600px]:grid-cols-[auto_1fr_auto] @min-[600px]:content-center @min-[600px]:gap-x-2.5 @min-[600px]:p-3",
        `afd-node-${id}`,
        node.emphasis ? "border-brass-400/45 bg-[#17140d]" : "border-white/10 bg-neutral-900"
      )}
    >
      {/* Lit while the step runs. */}
      <span className="afd-ring pointer-events-none absolute -inset-px rounded-lg border border-brass-400/80 shadow-[0_0_18px_-4px_rgba(212,168,87,0.65)]" />

      {hasIn && <Port side="in" />}
      {hasOut && <Port side="out" />}

      <span
        className={clsx(
          "col-start-1 row-start-1 grid h-6 w-6 place-items-center rounded-md border",
          node.emphasis
            ? "border-brass-400/30 bg-brass-400/15 text-brass-300"
            : "border-white/10 bg-white/[0.04] text-neutral-300"
        )}
      >
        <node.Icon className="h-3.5 w-3.5" />
      </span>

      <span className="col-span-2 row-start-2 min-w-0 @min-[600px]:col-span-1 @min-[600px]:col-start-2 @min-[600px]:row-start-1">
        <span className="block text-[11px] font-semibold leading-tight text-neutral-100 [overflow-wrap:anywhere] @min-[400px]:text-[11.5px]">
          {node.label}
        </span>
        {/* What the step is, then what it did: stacked in one cell, so the
            card is as wide as the longer and never changes size. */}
        <span className="mt-0.5 grid text-[10.5px] leading-tight">
          <span className="afd-idle col-start-1 row-start-1 text-neutral-500">{node.idle}</span>
          <span className="afd-done col-start-1 row-start-1 text-brass-200/90">{node.done}</span>
        </span>
      </span>

      <span className="relative col-start-2 row-start-1 grid h-4 w-4 place-items-center self-center justify-self-end @min-[600px]:col-start-3">
        <span className="afd-waiting absolute h-1.5 w-1.5 rounded-full bg-slate-400" />
        <span className="afd-spinner absolute inset-0">
          <svg viewBox="0 0 16 16" className="h-full w-full">
            <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(212,168,87,0.25)" strokeWidth="2" />
            <path d="M8 2 A6 6 0 0 1 14 8" fill="none" stroke="#E0BE78" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="afd-tick absolute inset-0 grid place-items-center rounded-full bg-brass-400 text-neutral-950">
          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
        </span>
      </span>
    </div>
  );
}

/**
 * Where a wire meets a card: top-centre for the wire in, bottom-centre for
 * the wire out, which is where useWires ends and starts them. Lit once data
 * has reached it.
 */
function Port({ side }: { side: "in" | "out" }) {
  return (
    <span
      className={clsx(
        "absolute left-1/2 z-10 h-[7px] w-[7px] -translate-x-1/2 rounded-full border border-white/25 bg-neutral-950",
        side === "in" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
      )}
    >
      <span
        className={clsx(
          "absolute -inset-px rounded-full bg-brass-400 shadow-[0_0_6px_rgba(212,168,87,0.9)]",
          side === "in" ? "afd-port-in" : "afd-port-out"
        )}
      />
    </span>
  );
}
