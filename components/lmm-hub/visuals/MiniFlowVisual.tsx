import { Search, Database, Send, Target } from "lucide-react";

/**
 * Automation, at card scale: work moving through a system without anyone
 * pushing it.
 *
 * WHY THIS IS NOT `AutomationFlowVisual` SHRUNK. That component is the one of
 * the three that physically cannot be reused at card width. It ships two hard
 * layouts chosen by a *viewport* breakpoint - `md:hidden` at 340x430 and
 * `hidden md:block` at 520x300 - each with an absolutely positioned HTML card
 * overlay carrying fixed widths (`w-[168px]`, `w-[172px]`). Breakpoints are
 * viewport-scoped, not container-scoped, so on a desktop viewport a ~340px card
 * column gets the *desktop* branch and the fixed-width node cards overflow it.
 * There is no prop that fixes that; it needs container queries or a different
 * layout, and a different layout is what this file is.
 *
 * The full graph is seven nodes because the automation page spends a screen
 * explaining each. A card has one sentence, so this is the same pipeline
 * compressed to its four load-bearing moments - something arrives, it is
 * recorded, it is followed up, it becomes an opportunity. Every one of those
 * four is a node in the full diagram, so the card is an honest summary of the
 * page behind it rather than a different claim.
 *
 * Motion is `.lmm-dash` on the connectors and `.lmm-packet` riding them, the
 * same two classes the full-size graph uses and the same two the marketing
 * mini uses. Both are geometry independent, both are already disabled under
 * `prefers-reduced-motion`, and neither adds a keyframe to app/globals.css.
 *
 * Decorative: hidden from assistive technology. The door card beside it states
 * what the offering does in real text.
 */

const CHIP = 34;
const ROW_Y = 34;
const LABEL_Y = 92;

/**
 * Four evenly spaced nodes across a 300-unit viewBox. CRM and the closing
 * opportunity are emphasised for the same reason they are in the full graph:
 * one is where everything lands, the other is what the whole system is for.
 */
const nodes = [
  { id: "in", Icon: Search, label: "Lead in", x: 12 },
  { id: "crm", Icon: Database, label: "Recorded", x: 96, emphasis: true },
  { id: "followup", Icon: Send, label: "Followed up", x: 180 },
  { id: "won", Icon: Target, label: "Opportunity", x: 264, emphasis: true },
];

/**
 * Connectors bow downward between chip edges so three identical straight lines
 * do not read as a progress bar. They run edge to edge rather than centre to
 * centre, so no line passes under a chip.
 */
const connectors = nodes.slice(0, -1).map(({ x }, i) => {
  const from = x + CHIP;
  const to = nodes[i + 1].x;
  const y = ROW_Y + CHIP / 2;
  const mid = (from + to) / 2;
  return `M ${from} ${y} C ${mid} ${y + 8}, ${mid} ${y + 8}, ${to} ${y}`;
});

/**
 * A third of the 4s `lmmFlowDot` cycle, so exactly one packet is in flight at a
 * time and the three fire in order. The eye is walked left to right once per
 * cycle, which is the claim: one thing moves through, on its own.
 */
const STAGGER_SECONDS = 1.33;

export function MiniFlowVisual() {
  return (
    <svg
      viewBox="0 0 300 112"
      className="block h-auto w-full"
      role="presentation"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lmmHubFlowLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFC107" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#FFC107" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7DA3C4" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Fine technical grid, at the same 0.04 opacity the full graph uses -
          it is what makes the diagram read as a system rather than a flowchart. */}
      <g stroke="#ffffff" strokeOpacity="0.04">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="112" />
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="300" y2={i * 40} />
        ))}
      </g>

      {connectors.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="url(#lmmHubFlowLine)" strokeWidth={1.5} />
          <path
            d={d}
            fill="none"
            stroke="#FFC107"
            strokeOpacity={0.45}
            strokeWidth={1.5}
            className="lmm-dash"
          />
        </g>
      ))}

      {nodes.map(({ id, Icon, label, x, emphasis }) => (
        <g key={id}>
          <rect
            x={x}
            y={ROW_Y}
            width={CHIP}
            height={CHIP}
            rx={8}
            fill={emphasis ? "rgba(251,191,36,0.10)" : "rgba(10,10,10,0.8)"}
            stroke={emphasis ? "rgba(251,191,36,0.45)" : "rgba(255,255,255,0.12)"}
          />
          <Icon
            x={x + 9}
            y={ROW_Y + 9}
            width={16}
            height={16}
            className={emphasis ? "text-amber-300" : "text-slate-300"}
          />
          <text
            x={x + CHIP / 2}
            y={LABEL_Y}
            textAnchor="middle"
            className="fill-neutral-400 text-[9px] font-medium"
          >
            {label}
          </text>
        </g>
      ))}

      {/* No cx/cy: `offset-path` translates from the element's own origin, so a
          circle with a centre would ride parallel to the path rather than on it. */}
      {connectors.map((d, i) => (
        <circle
          key={`${d}-pkt`}
          r={2.4}
          fill="#FFC107"
          className="lmm-packet"
          style={{ offsetPath: `path("${d}")`, animationDelay: `${i * STAGGER_SECONDS}s` }}
        />
      ))}
    </svg>
  );
}
