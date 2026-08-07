import { Printer, Signpost, Truck, Search, Target, Share2, Mail, User } from "lucide-react";

/**
 * Marketing, at card scale: seven channels converging on one customer.
 *
 * WHY THIS IS NOT `ChannelMixVisual` WITH A PROP. The full-size visual on the
 * marketing page is 480x250 with 132x40 labelled chips whose text is set at
 * 11px. An SVG scales losslessly, so dropping it into a ~340px card column does
 * not break the geometry - it shrinks the type to roughly 8px, which is the
 * point at which a channel name stops being readable and starts being texture.
 * The alternative was a `variant` prop branching the chip geometry inside the
 * shipped file, and that file's ring timings in app/globals.css are derived from
 * its own stagger constants: an edit there is an edit to a live page, and
 * next.config.mjs sets `typescript.ignoreBuildErrors: true`, so a mistake ships
 * silently to /lee-marketing-mastery/marketing. A separate small component that
 * shares only the CSS costs one file and risks nothing.
 *
 * So the labels are dropped rather than shrunk, and the channels become icons.
 * The card's own copy names what the offering covers; this says "from every
 * direction, to one person", which is the one thing the full-size diagram says
 * that a paragraph cannot.
 *
 * Motion comes entirely from `.lmm-dash` and `.lmm-packet`, which are geometry
 * independent - one animates `stroke-dashoffset`, the other `offset-distance`
 * from 0% to 100% of whatever path it is given. Nothing here depends on a
 * radius or a viewBox, which is what makes reuse safe. Both are already
 * disabled under `prefers-reduced-motion` at the foot of app/globals.css. The
 * packets additionally carry `motion-reduce:hidden`, because the global rule
 * for `.lmm-packet` parks them at opacity 1 rather than removing them - the
 * full-size marketing visual hides its packets outright under reduced motion,
 * on the recorded grounds that parked dots on the wires read as decoration, and
 * a preview of that diagram should not disagree with it.
 *
 * Decorative: hidden from assistive technology. The door card states the
 * offering in real text directly beneath it.
 */

/**
 * Geometry. The viewBox is 300x186, matching the automation mini so the two
 * SVG cards render at the same height beside the websites card - three door
 * cards whose visuals ended at three different heights read as ragged, and the
 * copy beneath them started on three different lines.
 */
const CORE_X = 150;
const CORE_Y = 93;
const CORE_R = 30;
const CHIP = 30;

/** Left edge of the left column, and left edge of the right column. */
const LEFT_X = 6;
const RIGHT_X = 264;

const offline = [
  { Icon: Printer, y: 20 },
  { Icon: Signpost, y: 78 },
  { Icon: Truck, y: 136 },
];

const online = [
  { Icon: Search, y: 6 },
  { Icon: Target, y: 54 },
  { Icon: Share2, y: 102 },
  { Icon: Mail, y: 150 },
];

/**
 * Wires run from a chip's inner edge to the core's edge rather than its centre,
 * so the line stops at the circle instead of disappearing under it. Both
 * control points sit on the chip's own y before turning, which is what gives
 * the arrivals their flat approach into the core.
 */
const leftWire = (top: number) => {
  const y = top + CHIP / 2;
  return `M ${LEFT_X + CHIP} ${y} C 76 ${y}, 86 ${CORE_Y}, ${CORE_X - CORE_R} ${CORE_Y}`;
};

const rightWire = (top: number) => {
  const y = top + CHIP / 2;
  return `M ${RIGHT_X} ${y} C 224 ${y}, 214 ${CORE_Y}, ${CORE_X + CORE_R} ${CORE_Y}`;
};

/**
 * Alternating sides, so the packets read as arriving from every direction
 * rather than sweeping down one column and then the other. The fourth online
 * channel has no offline partner and closes the cycle - the same ordering the
 * full-size visual uses, and for the same reason.
 */
const wires = [
  leftWire(offline[0].y),
  rightWire(online[0].y),
  leftWire(offline[1].y),
  rightWire(online[1].y),
  leftWire(offline[2].y),
  rightWire(online[2].y),
  rightWire(online[3].y),
];

/**
 * Seven packets on a 4s cycle. The stagger is deliberately not 4/7 - at an even
 * division the arrivals land in a metronomic rhythm that reads as a machine
 * cycling. 0.44s leaves them slightly bunched, which reads as separate things
 * happening to one person.
 */
const STAGGER_SECONDS = 0.44;

export function MiniReachVisual() {
  return (
    <svg
      viewBox="0 0 300 186"
      className="block h-auto w-full"
      role="presentation"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lmmHubReachCore" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="rgba(251,191,36,0.20)" />
          <stop offset="72%" stopColor="rgba(10,10,10,0.92)" />
          <stop offset="100%" stopColor="rgba(10,10,10,0.96)" />
        </radialGradient>
      </defs>

      {/* Wires first, so the chips and the core paint over their endpoints. */}
      {wires.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(251,191,36,0.18)" strokeWidth={1} />
          <path
            d={d}
            fill="none"
            stroke="#FFC107"
            strokeOpacity={0.4}
            strokeWidth={1}
            className="lmm-dash"
          />
        </g>
      ))}

      <ChipColumn x={LEFT_X} items={offline} />
      <ChipColumn x={RIGHT_X} items={online} />

      <circle
        cx={CORE_X}
        cy={CORE_Y}
        r={CORE_R}
        fill="url(#lmmHubReachCore)"
        stroke="rgba(251,191,36,0.4)"
      />
      <User x={CORE_X - 10} y={CORE_Y - 10} width={20} height={20} className="text-amber-300" />

      {/* Packets last, so they ride on top of the wires they follow. No cx/cy:
          `offset-path` translates the element from its own origin, so a circle
          given a centre would be offset from the path by that centre. */}
      {wires.map((d, i) => (
        <circle
          key={`${d}-pkt`}
          r={2.4}
          fill="#FFC107"
          className="lmm-packet motion-reduce:hidden"
          style={{ offsetPath: `path("${d}")`, animationDelay: `${i * STAGGER_SECONDS}s` }}
        />
      ))}
    </svg>
  );
}

interface ChipColumnProps {
  x: number;
  items: { Icon: typeof User; y: number }[];
}

function ChipColumn({ x, items }: ChipColumnProps) {
  return (
    <g>
      {items.map(({ Icon, y }, i) => (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width={CHIP}
            height={CHIP}
            rx={7}
            fill="rgba(10,10,10,0.75)"
            stroke="rgba(255,255,255,0.12)"
          />
          <Icon
            x={x + 7}
            y={y + 7}
            width={14}
            height={14}
            className="text-slate-300"
          />
        </g>
      ))}
    </g>
  );
}
