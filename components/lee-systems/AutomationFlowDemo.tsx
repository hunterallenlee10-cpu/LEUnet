import { useId } from "react";
import {
  Inbox,
  MessageSquare,
  ClipboardList,
  Database,
  Send,
  CalendarCheck,
  BarChart3,
} from "lucide-react";

/**
 * One new lead, start to finish. Labels stay short (under ~20 characters) so
 * they fit on one line in the desktop layout; the two emphasised stops are
 * where the owner's attention is actually needed.
 */
const nodes = [
  { id: "lead", label: "New lead", Icon: Inbox },
  { id: "reply", label: "Instant reply", Icon: MessageSquare },
  { id: "intake", label: "Intake form", Icon: ClipboardList },
  { id: "crm", label: "Your CRM", Icon: Database, emphasis: true },
  { id: "followup", label: "Follow-up sequence", Icon: Send },
  { id: "booked", label: "Booked appointment", Icon: CalendarCheck, emphasis: true },
  { id: "report", label: "Daily report", Icon: BarChart3 },
];

/**
 * The mobile graph's geometry. Card anchors and connector endpoints are the
 * same seven points expressed twice - the cards as percentages of the panel,
 * the connectors in viewBox units (340 x 430) - so the lines land under the
 * cards at any panel width. Connectors run centre to centre and the cards
 * paint over them, which is what lets the card heights vary (a label may
 * wrap on a narrow phone) without any endpoint drifting into view. That only
 * works if the cards are opaque, so these ones are: a translucent card let
 * the line behind it run through its label.
 */
const mobileAnchors = [
  { n: nodes[0], x: 28, y: 7 },
  { n: nodes[1], x: 72, y: 21 },
  { n: nodes[2], x: 28, y: 35 },
  { n: nodes[3], x: 50, y: 50 },
  { n: nodes[4], x: 72, y: 64.5 },
  { n: nodes[5], x: 28, y: 78.5 },
  { n: nodes[6], x: 50, y: 92 },
];

const mobilePaths = mobileAnchors.slice(0, -1).map(({ x, y }, i) => {
  const from = { x: (x / 100) * 340, y: (y / 100) * 430 };
  const next = mobileAnchors[i + 1];
  const to = { x: (next.x / 100) * 340, y: (next.y / 100) * 430 };
  // A vertical-leaning S: leave the card downward, arrive downward.
  return `M ${from.x} ${from.y} C ${from.x} ${from.y + 32}, ${to.x} ${
    to.y - 32
  }, ${to.x} ${to.y}`;
});

/**
 * The desktop graph's connectors, left to right through the pipeline, in
 * viewBox units (520 x 300). Coordinates track the card edges below: the
 * middle column spans x 154-322, CRM x 204-289, and the trailing column
 * starts at x 350. The middle pair sits above and below CRM rather than
 * beside it, so those two connectors run vertically.
 */
const desktopPaths = [
  "M 130 61 L 152 61",
  "M 65 79 C 65 150 92 211 152 211",
  "M 238 79 C 238 92 246 96 246 109",
  "M 238 193 C 238 180 246 176 246 145",
  "M 289 127 C 320 127 325 33 350 33",
  "M 289 127 L 350 165",
  "M 289 127 C 320 127 325 264 350 264",
];

/**
 * The desktop cards. The trailing column is anchored right rather than left
 * so the cards stay inside the panel, and shares one fixed width so the three
 * line up as a column instead of ending raggedly. CRM sits clear of it: at
 * 51% the widest right-hand label came within a pixel of overlapping it.
 */
const desktopCards = [
  { n: nodes[0], style: { left: "0%", top: "20%" } },
  { n: nodes[1], style: { left: "29.5%", top: "20%" }, width: "w-[168px]" },
  { n: nodes[2], style: { left: "29.5%", top: "64%" }, width: "w-[168px]" },
  { n: nodes[3], style: { left: "39%", top: "42%" } },
  { n: nodes[4], style: { right: "0%", top: "11%" }, width: "w-[172px]" },
  { n: nodes[5], style: { right: "0%", top: "55%" }, width: "w-[172px]" },
  { n: nodes[6], style: { right: "0%", top: "88%" }, width: "w-[172px]" },
];

/**
 * All of the motion, kept with the diagram so it needs nothing from the page
 * or from app/globals.css. React hoists this <style> into <head> and, keyed
 * by `href`, writes it once however many copies of the diagram a page has.
 * The class and keyframe names carry the component's name so nothing else
 * on the site can collide with them.
 *
 * A packet is a dot that runs its connector end to end, fading in and out;
 * a dash is the connector's dotted overlay drifting along it; a pulse is a
 * status dot breathing. Under prefers-reduced-motion all of it stops and the
 * diagram stays fully legible, with each packet resting, visible, at the
 * start of its connector.
 */
const styles = `
@keyframes automationFlowDemoPacket {
  0% { offset-distance: 0%; opacity: 0; }
  10%, 90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
@keyframes automationFlowDemoDash {
  to { stroke-dashoffset: -24; }
}
@keyframes automationFlowDemoPulse {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.35); }
}
.automation-flow-demo-dash {
  stroke-dasharray: 4 8;
  animation: automationFlowDemoDash 1.6s linear infinite;
}
.automation-flow-demo-packet {
  animation: automationFlowDemoPacket 4s cubic-bezier(0.55, 0, 0.45, 1) infinite;
}
.automation-flow-demo-pulse {
  animation: automationFlowDemoPulse 2.6s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .automation-flow-demo-dash,
  .automation-flow-demo-packet,
  .automation-flow-demo-pulse {
    animation: none;
  }
  .automation-flow-demo-packet {
    opacity: 1;
  }
}
`;

/** Each packet sets off a little after the one before it. */
const PACKET_STAGGER_SECONDS = 0.55;

/**
 * "Example: a new lead": one new lead moving through a Lee Systems Co.
 * automation, under a header with a gold "Running" badge. It was the hero of
 * /lee-systems/automation until that page folded into /lee-systems
 * (2026-09-29), and it is self-contained so it can go anywhere: placing it is
 * the one line `<AutomationFlowDemo />`, and `className` sizes or positions
 * it. Its geometry, timing and keyframes are all in this file, it needs no
 * client-side JS, and the only thing it takes from the site is the Tailwind
 * theme's brass colours.
 *
 * Two layouts rather than one scaled-down layout - the seven node landscape
 * graph shrunk to phone width stops being readable long before it stops
 * fitting. Below the `md` breakpoint the same living diagram is rebuilt for
 * portrait: a zigzag of the same cards over the same grid, with the same
 * packets moving through the same connectors. The motion is what says
 * "system" rather than "feature list", so phones keep it too.
 *
 * The SVG gradient ids come from `useId`, so two copies on one page don't
 * paint each other's lines.
 *
 * Decorative: hidden from assistive technology, header included. Whatever
 * section it sits in says in words what the system does.
 */
export function AutomationFlowDemo({ className }: { className?: string }) {
  const uid = useId().replace(/[^\w-]/g, "");
  const lineH = `automation-flow-demo-line-h-${uid}`;
  const lineV = `automation-flow-demo-line-v-${uid}`;

  return (
    <div aria-hidden="true" className={className}>
      <style href="lee-systems-automation-flow-demo" precedence="default">
        {styles}
      </style>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold text-neutral-400">
          Example: a new lead
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
          <span className="automation-flow-demo-pulse h-1.5 w-1.5 rounded-full bg-brass-400" />
          Running
        </span>
      </div>

      <div className="relative w-full">
        {/* Mobile: the connected graph, portrait */}
        <div className="relative md:hidden">
          <svg
            viewBox="0 0 340 430"
            className="w-full"
            role="presentation"
            focusable="false"
          >
            <defs>
              {/* A vertical run: the desktop gradient sweeps left to right,
                  which is sideways to this layout's flow. */}
              <linearGradient id={lineV} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A857" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#D4A857" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7DA3C4" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Fine technical grid */}
            <g stroke="#ffffff" strokeOpacity="0.04">
              {Array.from({ length: 8 }, (_, i) => (
                <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="430" />
              ))}
              {Array.from({ length: 9 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 48} x2="340" y2={i * 48} />
              ))}
            </g>

            {mobilePaths.map((d, i) => (
              <Connector key={i} d={d} gradientId={lineV} index={i} />
            ))}
          </svg>

          {/* Node cards positioned over the graph. Side cards pin to their
              panel edge at a shared width so each column lines up; the two
              centred cards size to their own short labels. */}
          <div className="absolute inset-0">
            {mobileAnchors.map(({ n, x, y }) => (
              <div
                key={n.id}
                style={{ top: `${y}%` }}
                className={`absolute flex -translate-y-1/2 items-center gap-2 rounded-lg border px-2.5 py-2  ${
                  x === 50
                    ? "left-1/2 -translate-x-1/2"
                    : x < 50
                      ? "left-0 w-[56%]"
                      : "right-0 w-[56%]"
                } ${
                  n.emphasis
                    ? "border-brass-400/45 bg-neutral-950 bg-gradient-to-b from-brass-400/10 to-brass-400/10"
                    : "border-white/10 bg-neutral-900"
                }`}
              >
                <n.Icon
                  className={`h-4 w-4 shrink-0 ${
                    n.emphasis ? "text-brass-300" : "text-slate-300"
                  }`}
                />
                <span className="text-[11px] font-medium leading-tight text-neutral-200">
                  {n.label}
                </span>
                <StatusDot emphasis={n.emphasis} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: connected graph */}
        <div className="relative hidden md:block">
          <svg
            viewBox="0 0 520 300"
            className="w-full"
            role="presentation"
            focusable="false"
          >
            <defs>
              <linearGradient id={lineH} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#D4A857" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#D4A857" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7DA3C4" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Fine technical grid */}
            <g stroke="#ffffff" strokeOpacity="0.04">
              {Array.from({ length: 12 }, (_, i) => (
                <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="300" />
              ))}
              {Array.from({ length: 7 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 48} x2="520" y2={i * 48} />
              ))}
            </g>

            {desktopPaths.map((d, i) => (
              <Connector key={i} d={d} gradientId={lineH} index={i} />
            ))}
          </svg>

          {/* Node cards positioned over the graph */}
          <div className="absolute inset-0">
            {desktopCards.map(({ n, style, width }) => (
              <div
                key={n.id}
                style={style}
                className={`absolute flex -translate-y-1/2 items-center gap-2 rounded-lg border px-2.5 py-2  ${
                  width ?? ""
                } ${
                  n.emphasis
                    ? "border-brass-400/45 bg-brass-400/10"
                    : "border-white/10 bg-neutral-900/80"
                }`}
              >
                <n.Icon
                  className={`h-4 w-4 shrink-0 ${
                    n.emphasis ? "text-brass-300" : "text-slate-300"
                  }`}
                />
                <span className="whitespace-nowrap text-[11px] font-medium text-neutral-200">
                  {n.label}
                </span>
                <StatusDot emphasis={n.emphasis} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One connector: the gradient line, the dotted overlay drifting along it, and
 * the packet that runs it. `index` staggers the packets so they set off one
 * after another rather than all at once.
 */
function Connector({
  d,
  gradientId,
  index,
}: {
  d: string;
  gradientId: string;
  index: number;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.5" />
      <path
        d={d}
        fill="none"
        stroke="#D4A857"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        className="automation-flow-demo-dash"
      />
      <circle
        r="2.5"
        fill="#D4A857"
        className="automation-flow-demo-packet"
        style={{
          offsetPath: `path("${d}")`,
          animationDelay: `${index * PACKET_STAGGER_SECONDS}s`,
        }}
      />
    </g>
  );
}

/** A card's status dot: brass on the two stops that need the owner, slate on the rest. */
function StatusDot({ emphasis }: { emphasis?: boolean }) {
  return (
    <span
      className={`automation-flow-demo-pulse ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${
        emphasis ? "bg-brass-400" : "bg-slate-400"
      }`}
    />
  );
}
