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

const CHIP = 38;

/**
 * A two-row zigzag rather than four nodes in a line.
 *
 * One row was the first attempt and it failed twice over. The four labels had
 * to share 300 units, so "Opportunity" - centred under the last chip at x=281 -
 * ran past the right edge of the viewBox and was clipped mid-word. And a wide,
 * squat diagram left the card's visual frame far shorter than the other two
 * offerings', which made the three cards read as ragged when set side by side.
 *
 * Wrapping to two rows fixes both at once: each label gets half the width, and
 * the diagram uses the vertical space the card has anyway. It is also the shape
 * `AutomationFlowVisual` already falls back to on a phone, so the card and the
 * page behind it agree about what the system looks like when it has to fit in
 * a narrow column.
 *
 * If a label is ever lengthened, check it against the column width here: at 9px
 * roughly 4.6 units per character, centred on the chip. "Followed up" (11
 * characters, about 50 units, centred at 43) is the tightest of the four.
 */
const TOP_Y = 34;
const BOTTOM_Y = 118;
const LEFT_X = 24;
const RIGHT_X = 178;

/**
 * Labels face outward - the top row's above its chips, the bottom row's below.
 * That is not a stylistic choice. The wrap connector has to get from the
 * top-right chip down to the bottom-left one, and when both rows labelled
 * downward it left with the label directly in its path and drew a dashed line
 * straight through the word "Recorded". Facing them outward clears the whole
 * band between y=72 and y=118 for the wrap, so the line never crosses type.
 */
const nodes = [
  { id: "in", Icon: Search, label: "Lead in", x: LEFT_X, y: TOP_Y, labelY: 26 },
  {
    id: "crm",
    Icon: Database,
    label: "Recorded",
    x: RIGHT_X,
    y: TOP_Y,
    labelY: 26,
    emphasis: true,
  },
  { id: "followup", Icon: Send, label: "Followed up", x: LEFT_X, y: BOTTOM_Y, labelY: 171 },
  {
    id: "won",
    Icon: Target,
    label: "Opportunity",
    x: RIGHT_X,
    y: BOTTOM_Y,
    labelY: 171,
    emphasis: true,
  },
];

/**
 * Connectors run chip edge to chip edge, so no line passes under a chip. The
 * two horizontal legs bow downward slightly - identical straight lines would
 * read as a progress bar rather than as work moving. The middle leg is the
 * wrap: it leaves the top-right chip downward and arrives at the bottom-left
 * one from above, which is what makes the two rows read as one continuous run
 * rather than two separate pairs.
 */
const connectors = [
  `M ${LEFT_X + CHIP} ${TOP_Y + CHIP / 2} C 120 ${TOP_Y + CHIP / 2 + 8}, 130 ${
    TOP_Y + CHIP / 2 + 8
  }, ${RIGHT_X} ${TOP_Y + CHIP / 2}`,
  `M ${RIGHT_X + CHIP / 2} ${TOP_Y + CHIP} C ${RIGHT_X + CHIP / 2} 96, ${
    LEFT_X + CHIP / 2
  } 94, ${LEFT_X + CHIP / 2} ${BOTTOM_Y}`,
  `M ${LEFT_X + CHIP} ${BOTTOM_Y + CHIP / 2} C 120 ${BOTTOM_Y + CHIP / 2 + 8}, 130 ${
    BOTTOM_Y + CHIP / 2 + 8
  }, ${RIGHT_X} ${BOTTOM_Y + CHIP / 2}`,
];

/**
 * A third of the 4s `lmmFlowDot` cycle, so exactly one packet is in flight at a
 * time and the three fire in order. The eye is walked left to right once per
 * cycle, which is the claim: one thing moves through, on its own.
 */
const STAGGER_SECONDS = 1.33;

export function MiniFlowVisual() {
  return (
    <svg
      viewBox="0 0 300 186"
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
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="186" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
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

      {nodes.map(({ id, Icon, label, x, y, labelY, emphasis }) => (
        <g key={id}>
          <rect
            x={x}
            y={y}
            width={CHIP}
            height={CHIP}
            rx={9}
            fill={emphasis ? "rgba(251,191,36,0.10)" : "rgba(10,10,10,0.8)"}
            stroke={emphasis ? "rgba(251,191,36,0.45)" : "rgba(255,255,255,0.12)"}
          />
          <Icon
            x={x + 10}
            y={y + 10}
            width={18}
            height={18}
            className={emphasis ? "text-amber-300" : "text-slate-300"}
          />
          <text
            x={x + CHIP / 2}
            y={labelY}
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
