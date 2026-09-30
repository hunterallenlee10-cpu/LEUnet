"use client";

import clsx from "clsx";
import {
  BatteryFull,
  Check,
  ChevronLeft,
  ChevronRight,
  Images,
  Lock,
  Mail,
  Menu,
  Monitor,
  Plus,
  RotateCw,
  ShieldCheck,
  Signal,
  Smartphone,
  Star,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { usePlayWhenVisible } from "@/components/lee-systems/usePlayWhenVisible";

/**
 * "Your site": a browser window showing a small business page, annotated with
 * the route a visitor takes through it, and a gold dot walking that route. It
 * was the hero of /lee-systems/websites until that page folded into
 * /lee-systems (2026-09-29), and it is self-contained so it can go anywhere:
 * placing it is the one line `<WebsiteBuildDemo />`, and `className` sizes or
 * positions it. Its timing and keyframes are all in this file, and the only
 * thing it takes from the site is the Tailwind theme's brass colours.
 *
 * What it plays, once it scrolls into view (the owner's ask, 2026-09-30, for
 * something more realistic than the grey wireframe it used to be):
 *   1. The page builds itself: every line starts as a grey skeleton bar the
 *      size of its own text and resolves into the real thing, top to bottom.
 *   2. The dot walks the three stops, and each stop acts on the page: the
 *      headline is underlined, the proof cards lift in turn, and the form
 *      fills in. The dot lands on the button as a cursor clicks it, the
 *      button reads "Sent" and a "New enquiry" alert slides in.
 *   3. The window narrows to a phone and the same page shows reflowed for
 *      it, scrolls down to the form, and widens back. Then 2 and 3 repeat.
 *
 * The page is generic on purpose ("Your Business", "What you do, and where
 * you do it."): it stands for the visitor's own site, not a site we built,
 * so it names no trade and shows no figure, rating or review count. The
 * alert claims only what every form on this site does: an enquiry reaches
 * the owner by email the moment it is sent (docs/WEBSITES.md, 3.2).
 *
 * The page inside the window is sized in container units of the window's
 * width, so it scales like a screenshot rather than reflowing at each
 * breakpoint. The annotations (badges and labels) stay in pixels so they are
 * legible at every width.
 *
 * Decorative: hidden from assistive technology. The page around it states
 * what a site includes in text ("What we do", just above it on /lee-systems,
 * and the FAQ).
 */

/* -------------------------------------------------------------- timing -- */

/**
 * One stop's turn on the route, in seconds. Within it the dot arrives at
 * ARRIVE_SECONDS, sets off for the next stop at DEPART_SECONDS and lands at
 * the next stop as the turn ends, which is when the next stop's turn begins.
 * The parked share is deliberately more than twice the travelling share: the
 * stops are the content and the dot only joins them.
 */
const STOP_SECONDS = 3.5;
const ARRIVE_SECONDS = 0.3;
const DEPART_SECONDS = 2.4;

/**
 * After the third stop: the enquiry alert, then the phone view, then the
 * window settling back to the desktop before the route starts again.
 */
const ALERT_SECONDS = 3.2;
const PHONE_SECONDS = 5.5;
const SETTLE_SECONDS = 1.5;

/** The whole loop: the three stops, the alert, the phone and the settle. */
const LOOP_SECONDS =
  3 * STOP_SECONDS + ALERT_SECONDS + PHONE_SECONDS + SETTLE_SECONDS;

/** The moments the loop is built around, in seconds from its start. */
const CLICK = 3 * STOP_SECONDS; // the dot lands on the button; the cursor clicks
const TYPE = 2 * STOP_SECONDS + 0.4; // the first field starts typing
const PHONE_IN = CLICK + ALERT_SECONDS; // the desktop page starts to go
const PHONE_OUT = PHONE_IN + PHONE_SECONDS; // the phone starts to go
const RESET = PHONE_IN + 0.6; // the form and button reset, while hidden

/** The gaps between the proof cards' lifts and between the fields' typing. */
const CARD_STAGGER = 0.6;
const FIELD_STAGGER = 0.6;

/**
 * The build, which plays once. BUILD_STEPS pieces of the page resolve from
 * skeleton to text, BUILD_STAGGER apart, each over BUILD_FADE. Every loop
 * animation waits BUILD_SECONDS, so the route starts on a finished page.
 */
const BUILD_LEAD = 0.5;
const BUILD_STAGGER = 0.16;
const BUILD_FADE = 0.45;
const BUILD_STEPS = 10;
const BUILD_SECONDS =
  BUILD_LEAD + (BUILD_STEPS - 1) * BUILD_STAGGER + BUILD_FADE;

/* ------------------------------------------------------------ geometry -- */

/**
 * How far in from each side the phone sits, as a percentage of the window's
 * width. The phone is placed with it and the window's shell narrows to it
 * (both through `--wbd-side`), so the shell always lands exactly on the
 * phone. The window is taller for its width when it is narrow, because the
 * annotations stay in pixels, so a narrow window gets a wider phone to keep
 * it phone-shaped; PHONE_SIDE_FROM is the window width the switch happens at.
 */
const PHONE_SIDE_NARROW = 17;
const PHONE_SIDE = 25;
const PHONE_SIDE_FROM = "440px";

/** The phone's corner radius, in container units of the window's width. */
const PHONE_RADIUS = "7cqw";

/**
 * The form's bottom padding and its button's height, in container units.
 * The route's last segment ends this far above the bottom of its row, which
 * is level with the middle of the button: the route should end on the thing
 * the visitor is meant to click, not trail off the bottom of the frame.
 */
const FORM_PAD_BOTTOM = 2.4;
const BUTTON_HEIGHT = 4.6;

/**
 * Half the badge height plus its top margin, so the line and the dot run
 * between badge *centers* rather than between row edges. Because every row
 * carries the same badge, the same offset is correct at both ends of a
 * segment - it lands on this row's badge at 0% and the next row's at 100%.
 */
const BADGE_CENTER_OFFSET = "11px";

/* ----------------------------------------------------------- keyframes -- */

/** A moment in the loop as a keyframe percentage. */
function pct(seconds: number) {
  return `${((seconds / LOOP_SECONDS) * 100).toFixed(3)}%`;
}

const DIM_BADGE = `border-color: rgba(212, 168, 87, 0.5); background-color: #0a0a0a; color: #d4a857; box-shadow: none;`;
const LIT_BADGE = `border-color: #e0be78; background-color: #d4a857; color: #0a0a0a; box-shadow: 0 0 10px rgba(212, 168, 87, 0.55);`;
const DIM_LABEL = `color: rgba(235, 211, 160, 0.55); text-shadow: none;`;
const LIT_LABEL = `color: #ebd3a0; text-shadow: 0 0 12px rgba(212, 168, 87, 0.5);`;

/** The phone page scrolls by moving its frame down and itself up; see Phone. */
function scrollKeyframes(name: string, to: string) {
  return `
@keyframes ${name} {
  0%, ${pct(PHONE_IN + 2)} { transform: translateY(0); }
  ${pct(PHONE_IN + 3.8)}, ${pct(PHONE_OUT + 0.1)} { transform: translateY(${to}); }
  ${pct(PHONE_OUT + 0.2)}, 100% { transform: translateY(0); }
}`;
}

/**
 * All of the motion, kept with the frame so it needs nothing from the page or
 * from app/globals.css. React hoists this <style> into <head> and, keyed by
 * `href`, writes it once however many copies of the frame a page has. The
 * class and keyframe names carry the component's initials so nothing else on
 * the site can collide with them.
 *
 * Two clocks. The build (`wbd-build`, `wbd-sheen`) plays once, each piece
 * delayed by its place in the build. Everything else runs on one loop of
 * LOOP_SECONDS, delayed by BUILD_SECONDS so it starts on the finished page,
 * and every keyframe in it is written with pct() from the constants above,
 * so the pieces cannot drift apart.
 *
 * How the route works, because it is not obvious. There is one dot PER ROW,
 * not one dot for the whole path, and each row's dot travels only its own
 * row before handing off to the next. The rows are content-height, so where
 * stop 2 sits relative to the whole diagram is not knowable in CSS, and a
 * single dot would need hardcoded percentages that drift the first time the
 * page changes. A per-row dot only ever has to know "top of my row" and
 * "bottom of my row", which a track stretched over the row's segment gives
 * for free: a translate percentage is of the track's own height, so
 * `translateY(0)` is the top of the row and `translateY(100%)` the bottom.
 * Each row runs the same keyframes, delayed by its index times STOP_SECONDS,
 * so a row's dot reaches the bottom of its row on the same frame the next
 * row's dot starts at the top of its own, and they read as one dot.
 *
 * Every element's own classes are its resting state, the finished desktop
 * page, and the keyframes only move it away from that and back. So under
 * prefers-reduced-motion, where all of it stops, what is left is the finished
 * page: the badges and labels legible alone, and the dots, cursor, alert and
 * phone gone with nothing to do.
 *
 * Nothing plays until the frame is on screen: every animation is paused
 * until usePlayWhenVisible sets `data-play="true"`, and paused
 * again while it is off screen. Without scripting it just plays.
 */
const styles = `
@keyframes wbdResolve {
  from { color: transparent; background-color: rgba(82, 82, 82, 0.55); border-color: transparent; }
}
@keyframes wbdSheen {
  from { transform: translateX(-150%) skewX(-12deg); }
  to { transform: translateX(450%) skewX(-12deg); }
}
@keyframes wbdTrack {
  0%, ${pct(ARRIVE_SECONDS)}, ${pct(DEPART_SECONDS)} { transform: translateY(0); }
  ${pct(STOP_SECONDS)}, 100% { transform: translateY(100%); }
}
@keyframes wbdDot {
  0% { opacity: 0; }
  ${pct(ARRIVE_SECONDS)}, ${pct(STOP_SECONDS)} { opacity: 1; }
  ${pct(STOP_SECONDS + 0.3)}, 100% { opacity: 0; }
}
@keyframes wbdBadge {
  0%, 100% { ${DIM_BADGE} }
  ${pct(ARRIVE_SECONDS)}, ${pct(DEPART_SECONDS)} { ${LIT_BADGE} }
  ${pct(STOP_SECONDS - 0.35)} { ${DIM_BADGE} }
}
@keyframes wbdLabel {
  0%, 100% { ${DIM_LABEL} }
  ${pct(ARRIVE_SECONDS)}, ${pct(DEPART_SECONDS)} { ${LIT_LABEL} }
  ${pct(STOP_SECONDS - 0.35)} { ${DIM_LABEL} }
}
@keyframes wbdUnderline {
  0%, ${pct(0.35)} { transform: scaleX(0); opacity: 1; }
  ${pct(1.3)}, ${pct(DEPART_SECONDS + 0.3)} { transform: scaleX(1); opacity: 1; }
  ${pct(STOP_SECONDS)} { transform: scaleX(1); opacity: 0; }
  ${pct(STOP_SECONDS + 0.05)}, 100% { transform: scaleX(0); opacity: 0; }
}
@keyframes wbdLift {
  0%, ${pct(STOP_SECONDS + 0.35)}, ${pct(STOP_SECONDS + 1.75)}, 100% {
    transform: translateY(0);
    border-color: rgba(255, 255, 255, 0.06);
    box-shadow: none;
  }
  ${pct(STOP_SECONDS + 0.6)}, ${pct(STOP_SECONDS + 1.4)} {
    transform: translateY(-5%);
    border-color: rgba(212, 168, 87, 0.5);
    box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.9), 0 0 14px -4px rgba(212, 168, 87, 0.35);
  }
}
@keyframes wbdFocus {
  0%, ${pct(TYPE - 0.1)}, ${pct(TYPE + 0.75)}, 100% {
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
  }
  ${pct(TYPE)}, ${pct(TYPE + 0.6)} {
    border-color: rgba(212, 168, 87, 0.75);
    box-shadow: 0 0 0 2px rgba(212, 168, 87, 0.18);
  }
}
@keyframes wbdPlaceholder {
  0%, ${pct(TYPE)} { opacity: 1; }
  ${pct(TYPE + 0.05)}, ${pct(RESET)} { opacity: 0; }
  ${pct(RESET + 0.05)}, 100% { opacity: 1; }
}
@keyframes wbdType {
  0%, ${pct(TYPE)} { clip-path: inset(0 100% 0 0); animation-timing-function: steps(9, end); }
  ${pct(TYPE + 0.5)}, ${pct(RESET)} { clip-path: inset(0 0 0 0); }
  ${pct(RESET + 0.05)}, 100% { clip-path: inset(0 100% 0 0); }
}
@keyframes wbdCursor {
  0%, ${pct(CLICK - 1.6)} { opacity: 0; transform: translate(320%, -150%) scale(1); }
  ${pct(CLICK - 1.3)} {
    opacity: 1;
    transform: translate(300%, -130%) scale(1);
    animation-timing-function: cubic-bezier(0.45, 0, 0.25, 1);
  }
  ${pct(CLICK - 0.05)} { opacity: 1; transform: translate(0, 0) scale(1); }
  ${pct(CLICK + 0.05)} { opacity: 1; transform: translate(0, 0) scale(0.82); }
  ${pct(CLICK + 0.2)}, ${pct(CLICK + 0.9)} { opacity: 1; transform: translate(0, 0) scale(1); }
  ${pct(CLICK + 1.2)}, 100% { opacity: 0; transform: translate(60%, 70%) scale(1); }
}
@keyframes wbdPress {
  0%, ${pct(CLICK)}, ${pct(CLICK + 0.25)}, 100% { transform: scale(1); }
  ${pct(CLICK + 0.08)} { transform: scale(0.94); }
}
@keyframes wbdSend {
  0%, ${pct(CLICK + 0.1)} { opacity: 1; }
  ${pct(CLICK + 0.3)}, ${pct(RESET)} { opacity: 0; }
  ${pct(RESET + 0.05)}, 100% { opacity: 1; }
}
@keyframes wbdSent {
  0%, ${pct(CLICK + 0.15)} { opacity: 0; }
  ${pct(CLICK + 0.35)}, ${pct(RESET)} { opacity: 1; }
  ${pct(RESET + 0.05)}, 100% { opacity: 0; }
}
@keyframes wbdAlert {
  0%, ${pct(CLICK + 0.35)} { opacity: 0; transform: translateX(28px); }
  ${pct(CLICK + 0.75)}, ${pct(PHONE_IN - 0.45)} { opacity: 1; transform: translateX(0); }
  ${pct(PHONE_IN - 0.1)}, 100% { opacity: 0; transform: translateX(12px); }
}
@keyframes wbdDesktop {
  0%, ${pct(PHONE_IN)} { opacity: 1; }
  ${pct(PHONE_IN + 0.3)}, ${pct(PHONE_OUT + 0.75)} { opacity: 0; }
  ${pct(PHONE_OUT + 1.15)}, 100% { opacity: 1; }
}
@keyframes wbdShell {
  0%, ${pct(PHONE_IN + 0.2)} { left: 0; right: 0; border-radius: 0.5rem; }
  ${pct(PHONE_IN + 1)}, ${pct(PHONE_OUT + 0.1)} {
    left: var(--wbd-side);
    right: var(--wbd-side);
    border-radius: ${PHONE_RADIUS};
  }
  ${pct(PHONE_OUT + 0.9)}, 100% { left: 0; right: 0; border-radius: 0.5rem; }
}
@keyframes wbdPhone {
  0%, ${pct(PHONE_IN + 0.85)} { opacity: 0; transform: scale(0.985); }
  ${pct(PHONE_IN + 1.2)}, ${pct(PHONE_OUT - 0.2)} { opacity: 1; transform: scale(1); }
  ${pct(PHONE_OUT + 0.1)}, 100% { opacity: 0; transform: scale(0.985); }
}
${scrollKeyframes("wbdScrollFrame", "100%")}
${scrollKeyframes("wbdScrollPage", "-100%")}
@keyframes wbdToggle {
  0%, ${pct(PHONE_IN + 0.2)} { transform: translateX(0); }
  ${pct(PHONE_IN + 0.6)}, ${pct(PHONE_OUT)} { transform: translateX(100%); }
  ${pct(PHONE_OUT + 0.4)}, 100% { transform: translateX(0); }
}
@keyframes wbdPulse {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.35); }
}

.wbd-build {
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  animation: wbdResolve ${BUILD_FADE}s ease-out backwards;
}
.wbd-sheen {
  transform: translateX(-150%) skewX(-12deg);
  animation: wbdSheen ${BUILD_LEAD + 1}s ease-in-out both;
}
.wbd-type { clip-path: inset(0 100% 0 0); }
.wbd-underline { transform: scaleX(0); }
.wbd-shell, .wbd-phone { --wbd-side: ${PHONE_SIDE_NARROW}%; }
@container (min-width: ${PHONE_SIDE_FROM}) {
  .wbd-shell, .wbd-phone { --wbd-side: ${PHONE_SIDE}%; }
}
.wbd-sent, .wbd-cursor, .wbd-alert, .wbd-phone { opacity: 0; }

.wbd-track { animation: wbdTrack ${LOOP_SECONDS}s cubic-bezier(0.55, 0, 0.45, 1) infinite backwards; }
.wbd-dot { animation: wbdDot ${LOOP_SECONDS}s cubic-bezier(0.55, 0, 0.45, 1) infinite backwards; }
.wbd-badge { animation: wbdBadge ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-label { animation: wbdLabel ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-underline { animation: wbdUnderline ${LOOP_SECONDS}s cubic-bezier(0.65, 0, 0.35, 1) infinite backwards; }
.wbd-lift { animation: wbdLift ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-focus { animation: wbdFocus ${LOOP_SECONDS}s ease-out infinite backwards; }
.wbd-placeholder { animation: wbdPlaceholder ${LOOP_SECONDS}s linear infinite backwards; }
.wbd-type { animation: wbdType ${LOOP_SECONDS}s linear infinite backwards; }
.wbd-cursor { animation: wbdCursor ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-press { animation: wbdPress ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-send { animation: wbdSend ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-sent { animation: wbdSent ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-alert { animation: wbdAlert ${LOOP_SECONDS}s cubic-bezier(0.2, 0.8, 0.2, 1) infinite backwards; }
.wbd-desktop { animation: wbdDesktop ${LOOP_SECONDS}s ease-in-out infinite backwards; }
.wbd-shell { animation: wbdShell ${LOOP_SECONDS}s cubic-bezier(0.65, 0, 0.35, 1) infinite backwards; }
.wbd-phone { animation: wbdPhone ${LOOP_SECONDS}s ease-out infinite backwards; }
.wbd-scroll-frame { animation: wbdScrollFrame ${LOOP_SECONDS}s cubic-bezier(0.45, 0, 0.25, 1) infinite backwards; }
.wbd-scroll-page { animation: wbdScrollPage ${LOOP_SECONDS}s cubic-bezier(0.45, 0, 0.25, 1) infinite backwards; }
.wbd-toggle { animation: wbdToggle ${LOOP_SECONDS}s cubic-bezier(0.65, 0, 0.35, 1) infinite backwards; }
.wbd-pulse { animation: wbdPulse 2.6s ease-in-out infinite; }

.wbd-root:not([data-play="true"]),
.wbd-root:not([data-play="true"]) * {
  animation-play-state: paused !important;
}
@media (scripting: none) {
  .wbd-root:not([data-play="true"]),
  .wbd-root:not([data-play="true"]) * {
    animation-play-state: running !important;
  }
}
@media (prefers-reduced-motion: reduce) {
  .wbd-root * {
    animation: none !important;
  }
  .wbd-track,
  .wbd-sheen,
  .wbd-cursor,
  .wbd-alert,
  .wbd-phone {
    display: none;
  }
}
`;

/** Delays a build piece by its place in the build. */
function build(step: number): CSSProperties {
  return { animationDelay: `${BUILD_LEAD + step * BUILD_STAGGER}s` };
}

/** Delays a loop piece until the build is done, plus its own offset. */
function loop(offset = 0): CSSProperties {
  return { animationDelay: `${BUILD_SECONDS + offset}s` };
}

/**
 * Ordered as the visitor moves, top to bottom. Each stop renders the page
 * block it annotates as its own child, so a label and the thing it points at
 * cannot drift apart - as siblings, reordering the page would silently leave
 * the annotations pointing at the wrong rows.
 */
const stops = [
  { label: "Says what you do, in one line", Block: HeroBlock },
  { label: "Proof they can check themselves", Block: ProofRow },
  { label: "One obvious next step", Block: NextStepBlock },
];

/** Generic on purpose: kinds of proof any business can show, no figures. */
const proof: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: Star, title: "Reviews", body: "From real customers" },
  { Icon: Images, title: "Our work", body: "Photos of finished jobs" },
  { Icon: ShieldCheck, title: "Licensed", body: "And insured" },
];

/**
 * What the visitor types. The phone number is in 555-0100 to 555-0199, the
 * range kept for fiction, so it can never be someone's real number.
 */
const fields = [
  { placeholder: "Name", value: "Alex" },
  { placeholder: "Phone", value: "(240) 555-0142" },
  { placeholder: "How can we help?", value: "Looking for a quote", wide: true },
];

export function WebsiteBuildDemo({ className }: { className?: string }) {
  // Plays while the frame is on screen and pauses while it is not, so a
  // visitor sees the build from its first frame and nothing runs unseen.
  const ref = usePlayWhenVisible<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={clsx(
        "wbd-root relative select-none rounded-xl border border-white/10 bg-white/[0.04] p-5 md:p-7",
        className
      )}
    >
      <style href="lee-systems-website-build-demo" precedence="default">
        {styles}
      </style>

      <span className="pointer-events-none absolute inset-x-[12%] top-[18%] bottom-[8%] -z-10 rounded-full bg-brass-400/[0.12] blur-3xl" />

      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-neutral-400">Your site</p>
        <span className="flex items-center gap-3">
          <DeviceToggle />
          <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <span className="wbd-pulse h-1.5 w-1.5 rounded-full bg-brass-400" />
            Live
          </span>
        </span>
      </div>

      {/* The stage. The desktop window is the only thing in flow, so it sets
          the height, and nothing that moves ever changes it: the shell, the
          phone and the alert are all positioned over it. The shell is the
          window's frame (its fill and hairline) and is a separate layer so it
          can narrow to the phone while the window's contents fade. */}
      <div className="@container relative [text-rendering:geometricPrecision]">
        <span
          style={loop()}
          className="wbd-shell absolute inset-y-0 left-0 right-0 rounded-lg border border-white/10 bg-neutral-900/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]"
        />

        <div
          style={loop()}
          className="wbd-desktop relative overflow-hidden rounded-lg border border-transparent"
        >
          <BrowserChrome />
          <DesktopPage />
        </div>

        <Phone />
        <EnquiryAlert />
      </div>
    </div>
  );
}

/**
 * Which view is showing: the brass pill sits under the monitor and slides
 * under the phone while the phone view plays.
 */
function DeviceToggle() {
  return (
    <span className="relative flex rounded-full border border-white/10 bg-white/[0.03] p-0.5">
      <span
        style={loop()}
        className="wbd-toggle absolute bottom-0.5 left-0.5 top-0.5 w-[calc(50%-2px)] rounded-full bg-brass-400/15 ring-1 ring-inset ring-brass-400/35"
      />
      <span className="relative grid h-5 w-6 place-items-center text-neutral-300">
        <Monitor className="h-3 w-3" />
      </span>
      <span className="relative grid h-5 w-6 place-items-center text-neutral-300">
        <Smartphone className="h-3 w-3" />
      </span>
    </span>
  );
}

/* ------------------------------------------------------------ desktop -- */

/** A tab strip and a toolbar, as a desktop browser draws them. */
function BrowserChrome() {
  return (
    <div className="border-b border-white/10">
      <div className="flex items-end gap-2 bg-neutral-950/70 px-3 pt-2">
        <span className="mb-2.5 flex shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="ml-1 flex min-w-0 max-w-[55%] flex-1 items-center gap-1.5 rounded-t-md border border-b-0 border-white/10 bg-neutral-900 px-2 py-1.5">
          <span className="h-2 w-2 shrink-0 rotate-45 rounded-[2px] bg-brass-400" />
          <span className="truncate text-[10px] leading-none text-neutral-300">Your Business</span>
          <X className="ml-auto h-2.5 w-2.5 shrink-0 text-neutral-500" />
        </span>
        <Plus className="mb-2 h-3 w-3 shrink-0 text-neutral-600" />
      </div>
      <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5">
        <ChevronLeft className="h-3 w-3 shrink-0 text-neutral-500" />
        <ChevronRight className="h-3 w-3 shrink-0 text-neutral-700" />
        <RotateCw className="h-2.5 w-2.5 shrink-0 text-neutral-500" />
        <span className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-white/10 bg-neutral-950 px-2.5 py-1 text-[10px] leading-none text-neutral-400">
          <Lock className="h-2.5 w-2.5 shrink-0 text-neutral-500" />
          <span className="truncate">yourbusiness.com</span>
        </span>
      </div>
    </div>
  );
}

function DesktopPage() {
  return (
    <div className="relative space-y-[3cqw] px-[3.5cqw] pb-[3.5cqw] pt-[3cqw]">
      {/* A light sweeping across the skeleton while the page builds. */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="wbd-sheen absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </span>

      {/* Nav - deliberately unannotated. Every site has one, so a stop here
          would be spent on something that is not part of the decision. */}
      <div className="flex items-center justify-between gap-[2cqw]">
        <span className="flex items-center gap-[1.4cqw]">
          <span style={build(0)} className="wbd-build h-[2.2cqw] w-[2.2cqw] rotate-45 rounded-[0.4cqw] bg-brass-400" />
          <span style={build(0)} className="wbd-build rounded-[0.3em] text-[2.3cqw] font-semibold leading-tight text-white">
            Your Business
          </span>
        </span>
        <span className="flex items-center gap-[2.4cqw] text-[1.8cqw] leading-tight text-neutral-400">
          {["Services", "About", "Reviews"].map((link) => (
            <span key={link} style={build(0)} className="wbd-build rounded-[0.3em]">
              {link}
            </span>
          ))}
          <span style={build(0)} className="wbd-build rounded-[0.8cqw] bg-brass-400 px-[1.8cqw] py-[0.9cqw] font-semibold text-neutral-950">
            Book a call
          </span>
        </span>
      </div>

      {/* The route. A two-column grid rather than an overlay positioned
          absolutely against the blocks: the rows are content-height, so
          anything pinned by coordinate would need magic numbers and would
          break at the first content change. The narrow column carries the
          route and the numbered stops; the wide one carries each label and
          the block it belongs to. Each row owns its own segment of the line
          and its own dot, so no element needs to know where the others sit
          (see `styles` above). */}
      <div className="grid grid-cols-[18px_1fr] gap-x-2.5">
        {stops.map(({ label, Block }, i) => (
          <Stop key={label} index={i} label={label} isLast={i === stops.length - 1}>
            <Block />
          </Stop>
        ))}
      </div>
    </div>
  );
}

interface StopProps {
  index: number;
  label: string;
  isLast: boolean;
  children: ReactNode;
}

/**
 * One numbered stop: the badge and this row's segment of the route in the
 * narrow column, the label and the page block it annotates in the wide one.
 * The badge is opaque and above the line so the route appears to pass behind
 * it rather than through it.
 *
 * The segment doubles as the dot's track - the dashed border and the track
 * box the dot rides in share one positioned element, so the dot cannot drift
 * off the line no matter how the row's content resizes.
 *
 * Every animated piece is delayed by its index times STOP_SECONDS, and that
 * is what puts the three stops in sequence: a row's dot finishes its travel
 * exactly as the next row's dot starts, so they hand off at the same point on
 * the line and read as one dot.
 */
function Stop({ index, label, isLast, children }: StopProps) {
  const delay = loop(index * STOP_SECONDS);

  return (
    <>
      {/* Stretches to the row height, which is what makes the segment below
          span exactly from this badge to the next one. */}
      <div className="relative flex items-start justify-center">
        <span
          style={delay}
          className="wbd-badge relative z-10 mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-brass-400/50 bg-neutral-950 font-mono text-[9px] font-semibold text-brass-400"
        >
          {index + 1}
        </span>

        {/* Runs past the bottom of the row on every stop but the last, so it
            reaches the next badge's center. On the last one it stops short
            instead, level with the middle of the form's button, which is
            where the cursor clicks as the dot lands. */}
        <span
          style={{
            top: BADGE_CENTER_OFFSET,
            bottom: isLast
              ? `${FORM_PAD_BOTTOM + BUTTON_HEIGHT / 2}cqw`
              : `-${BADGE_CENTER_OFFSET}`,
          }}
          className="absolute left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-brass-400/30"
        >
          <span style={delay} className="wbd-track absolute inset-0">
            <span
              style={delay}
              className="wbd-dot absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-400 shadow-[0_0_7px_rgba(212,168,87,0.95)]"
            />
          </span>
        </span>
      </div>

      <div className="pb-4 last:pb-0">
        <p
          style={delay}
          className="wbd-label mb-2 text-[11px] font-medium leading-tight text-brass-200/80"
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
    <div className="relative overflow-hidden rounded-[1.2cqw] border border-white/[0.06] bg-gradient-to-br from-brass-400/[0.09] via-transparent to-transparent p-[3cqw]">
      <span className="pointer-events-none absolute -right-[12%] -top-[45%] h-[130%] w-[55%] rounded-full bg-brass-400/[0.08] blur-2xl" />
      <p className="relative max-w-[82%] text-balance text-[4.4cqw] font-bold leading-[1.15] tracking-tight text-white">
        <span style={build(1)} className="wbd-build rounded-[0.2em]">
          What you do, and where you do it.
        </span>
      </p>
      <span
        style={loop()}
        className="wbd-underline relative mt-[1.1cqw] block h-[0.45cqw] w-[36%] origin-left rounded-full bg-brass-400"
      />
      <p className="relative mt-[1.4cqw] text-[2.1cqw] leading-snug text-neutral-400">
        <span style={build(2)} className="wbd-build rounded-[0.3em]">
          One line on why they should pick you.
        </span>
      </p>
      <span
        style={build(3)}
        className="wbd-build relative mt-[2.4cqw] inline-block rounded-[0.8cqw] bg-brass-400 px-[2.4cqw] py-[1.1cqw] text-[1.9cqw] font-semibold leading-tight text-neutral-950"
      >
        Book a call
      </span>
    </div>
  );
}

function ProofRow() {
  return (
    <div className="grid grid-cols-3 gap-[1.6cqw]">
      {proof.map(({ Icon, title, body }, i) => (
        <div
          key={title}
          style={loop(i * CARD_STAGGER)}
          className="wbd-lift rounded-[1cqw] border border-white/[0.06] bg-neutral-950/50 p-[1.8cqw]"
        >
          <span
            style={build(4 + i)}
            className="wbd-build mb-[1.4cqw] grid h-[3.6cqw] w-[3.6cqw] place-items-center rounded-[0.7cqw] border border-brass-400/25 bg-brass-400/10 text-brass-300"
          >
            <Icon className="h-[2.1cqw] w-[2.1cqw]" strokeWidth={2} />
          </span>
          <p className="text-[1.9cqw] font-semibold leading-tight text-neutral-100">
            <span style={build(4 + i)} className="wbd-build rounded-[0.3em]">
              {title}
            </span>
          </p>
          <p className="mt-[0.6cqw] text-[1.6cqw] leading-snug text-neutral-500">
            <span style={build(4 + i)} className="wbd-build rounded-[0.3em]">
              {body}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

/** The point of the whole page, which is why it is the last stop on the route. */
function NextStepBlock() {
  return (
    <div
      style={{ paddingBottom: `${FORM_PAD_BOTTOM}cqw` }}
      className="rounded-[1.2cqw] border border-brass-400/20 bg-brass-400/[0.04] px-[2.4cqw] pt-[2.2cqw]"
    >
      <p className="mb-[1.6cqw] text-[2.1cqw] font-semibold leading-tight text-neutral-100">
        <span style={build(7)} className="wbd-build rounded-[0.3em]">
          Tell us what you need
        </span>
      </p>
      <div className="grid grid-cols-2 gap-[1.4cqw]">
        {fields.map((field, i) => (
          <span
            key={field.placeholder}
            style={loop(i * FIELD_STAGGER)}
            className={clsx(
              "wbd-focus relative block h-[4.4cqw] rounded-[0.8cqw] border border-white/10 bg-neutral-900",
              field.wide && "col-span-2"
            )}
          >
            <span
              style={loop(i * FIELD_STAGGER)}
              className="wbd-placeholder absolute inset-y-0 left-[1.4cqw] flex items-center text-[1.7cqw] text-neutral-500"
            >
              <span style={build(8)} className="wbd-build rounded-[0.3em]">
                {field.placeholder}
              </span>
            </span>
            <span
              style={loop(i * FIELD_STAGGER)}
              className="wbd-type absolute inset-y-0 left-[1.4cqw] flex items-center whitespace-nowrap text-[1.7cqw] text-neutral-100"
            >
              {field.value}
            </span>
          </span>
        ))}
      </div>

      <div className="mt-[2cqw] flex">
        <span className="relative">
          <span
            style={{ height: `${BUTTON_HEIGHT}cqw`, ...loop() }}
            className="wbd-press relative flex items-center justify-center text-[1.9cqw] font-semibold text-neutral-950"
          >
            <span style={build(9)} className="wbd-build absolute inset-0 rounded-[0.8cqw] bg-brass-400" />
            <span style={loop()} className="wbd-send relative px-[2.6cqw]">
              <span style={build(9)} className="wbd-build rounded-[0.3em]">
                Send request
              </span>
            </span>
            <span
              style={loop()}
              className="wbd-sent absolute inset-0 flex items-center justify-center gap-[0.6cqw]"
            >
              <Check className="h-[2cqw] w-[2cqw]" strokeWidth={3} />
              Sent
            </span>
          </span>
          <Cursor />
        </span>
      </div>
    </div>
  );
}

/**
 * A pointer, placed on the button it clicks rather than on the page, so its
 * tip lands on the button's middle wherever the button is. It glides in from
 * above right, where the fields it just typed in are.
 */
function Cursor() {
  return (
    <span
      style={loop()}
      className="wbd-cursor pointer-events-none absolute left-1/2 top-1/2 z-10 w-[2.8cqw] min-w-[11px] origin-top-left drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
    >
      <svg viewBox="0 0 16 22" className="block h-auto w-full">
        <path
          d="M1.2 1.2 L1.2 17 L5.3 13.3 L8.1 20 L10.9 18.8 L8.2 12.3 L13.9 12.3 Z"
          fill="#fafafa"
          stroke="#0a0a0a"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * What the owner sees when the form is sent: an email, the moment it
 * arrives. It says only that, which is what every form on this site does.
 * Top right, where a desktop shows its notifications, so it never covers
 * the button that just read "Sent".
 */
function EnquiryAlert() {
  return (
    <div
      style={loop()}
      className="wbd-alert pointer-events-none absolute -right-2 top-2 z-20 flex w-[74%] max-w-[270px] @md:w-[62%] items-center gap-2.5 rounded-xl border border-white/10 bg-neutral-900/95 px-3 py-2.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.95)] backdrop-blur md:-right-3"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brass-400/15 text-brass-300 ring-1 ring-inset ring-brass-400/30">
        <Mail className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-[12px] font-semibold leading-tight text-white">New enquiry</span>
          <span className="text-[10px] leading-tight text-neutral-500">now</span>
        </span>
        <span className="block truncate text-[11px] leading-tight text-neutral-400">
          From your website&apos;s form
        </span>
      </span>
    </div>
  );
}

/* -------------------------------------------------------------- phone -- */

/**
 * The same page on a phone, in the box the shell narrows to. Its contents
 * are sized in container units of the screen's width.
 *
 * How it scrolls to the bottom of the page without knowing either height.
 * The page moves up by its own height (`translateY(-100%)`) while the frame
 * around it moves down by the viewport's height (`translateY(100%)`), which
 * together is exactly "page bottom on viewport bottom" at any size. The page
 * is at least as tall as the viewport, so this never scrolls it the wrong way.
 */
function Phone() {
  return (
    <div
      style={{
        left: "var(--wbd-side)",
        right: "var(--wbd-side)",
        borderRadius: PHONE_RADIUS,
        ...loop(),
      }}
      className="wbd-phone absolute inset-y-0 z-10 border border-white/15 bg-neutral-950 p-[1.3cqw] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)]"
    >
      <div className="@container relative flex h-full flex-col overflow-hidden rounded-[5.6cqw] bg-[#0c0c0c]">
        <div className="flex items-center justify-between px-[8cqw] pb-[2cqw] pt-[5cqw] text-[4.6cqw] font-semibold leading-none text-white/90">
          9:41
          <span className="flex items-center gap-[1.4cqw]">
            <Signal className="h-[4.2cqw] w-[4.2cqw]" />
            <Wifi className="h-[4.2cqw] w-[4.2cqw]" />
            <BatteryFull className="h-[4.6cqw] w-[4.6cqw]" />
          </span>
        </div>
        <div className="mx-[5cqw] mb-[2.5cqw] flex items-center justify-center gap-[1.4cqw] rounded-full bg-white/[0.07] py-[2cqw] text-[4.2cqw] leading-none text-neutral-300">
          <Lock className="h-[3.4cqw] w-[3.4cqw] text-neutral-500" />
          yourbusiness.com
        </div>

        <div className="relative flex-1 overflow-hidden border-t border-white/[0.06]">
          <div style={loop()} className="wbd-scroll-frame h-full">
            <div style={loop()} className="wbd-scroll-page min-h-full">
              <PhonePage />
            </div>
          </div>
        </div>

        <span className="absolute bottom-[1.2%] left-1/2 h-[1.4cqw] w-[34%] -translate-x-1/2 rounded-full bg-white/40" />
      </div>
    </div>
  );
}

/** The desktop page, reflowed: one column, full-width buttons, a menu icon. */
function PhonePage() {
  return (
    <div className="space-y-[6cqw] px-[6cqw] pb-[12cqw] pt-[5cqw]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[2.4cqw]">
          <span className="h-[4cqw] w-[4cqw] rotate-45 rounded-[0.8cqw] bg-brass-400" />
          <span className="text-[5.2cqw] font-semibold leading-none text-white">Your Business</span>
        </span>
        <Menu className="h-[6cqw] w-[6cqw] text-neutral-300" />
      </div>

      <div className="relative overflow-hidden rounded-[3cqw] border border-white/[0.06] bg-gradient-to-br from-brass-400/[0.1] via-transparent to-transparent p-[5cqw]">
        <p className="text-[8.6cqw] font-bold leading-[1.12] tracking-tight text-white">
          What you do, and where you do it.
        </p>
        <p className="mt-[3cqw] text-[4.6cqw] leading-snug text-neutral-400">
          One line on why they should pick you.
        </p>
        <span className="mt-[5cqw] flex h-[11cqw] items-center justify-center rounded-[2cqw] bg-brass-400 text-[4.6cqw] font-semibold text-neutral-950">
          Book a call
        </span>
      </div>

      <div className="space-y-[2.6cqw]">
        {proof.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="flex items-center gap-[3cqw] rounded-[2.4cqw] border border-white/[0.06] bg-neutral-950/60 p-[3cqw]"
          >
            <span className="grid h-[8.5cqw] w-[8.5cqw] shrink-0 place-items-center rounded-[1.8cqw] border border-brass-400/25 bg-brass-400/10 text-brass-300">
              <Icon className="h-[4.6cqw] w-[4.6cqw]" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[4.4cqw] font-semibold leading-tight text-neutral-100">{title}</span>
              <span className="block truncate text-[3.8cqw] leading-snug text-neutral-500">{body}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-[3cqw] border border-brass-400/20 bg-brass-400/[0.04] p-[5cqw]">
        <p className="mb-[3.5cqw] text-[5cqw] font-semibold leading-tight text-neutral-100">
          Tell us what you need
        </p>
        <div className="space-y-[2.6cqw]">
          {fields.map((field) => (
            <span
              key={field.placeholder}
              className="flex h-[10cqw] items-center rounded-[2cqw] border border-white/10 bg-neutral-900 px-[3cqw] text-[4cqw] text-neutral-500"
            >
              {field.placeholder}
            </span>
          ))}
        </div>
        <span className="mt-[4cqw] flex h-[11cqw] items-center justify-center rounded-[2cqw] bg-brass-400 text-[4.6cqw] font-semibold text-neutral-950">
          Send request
        </span>
      </div>

      <p className="text-center text-[3.6cqw] text-neutral-600">© Your Business</p>
    </div>
  );
}
