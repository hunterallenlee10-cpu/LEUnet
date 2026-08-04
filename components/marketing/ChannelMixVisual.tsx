import {
  Printer,
  Signpost,
  Truck,
  Search,
  Target,
  Share2,
  Mail,
  User,
} from "lucide-react";

/**
 * The hero visual: seven channels reaching one customer, who converts once
 * enough of them have landed.
 *
 * Abstract rather than a mock campaign, for the same reason the websites hero
 * uses a wireframe - a fake billboard photo or invented ad creative would imply
 * work we cannot point to. Nothing here is a claim: no number of touches is
 * asserted, no timeline, no result.
 *
 * Why it is not a list any more. It used to be two boxes naming the offline and
 * online channels above a "One business, one message" bar - a taxonomy, when
 * the paragraph beside it is a story about a person: "some are searching right
 * now, some scroll past you every day, and some will drive by your sign before
 * they ever type your name." One customer, reached from several directions. A
 * list of what we sell cannot show that, and it left this the only hero visual
 * of the three LMM pages that did not move.
 *
 * The offline / online split survives as left and right, so every channel name
 * is still on the page at full size. What changed is the subject: the middle of
 * the diagram is now the customer rather than the catalogue.
 *
 * Decorative: hidden from assistive technology. The copy beside it states what
 * the offering is, and every channel named here is named again in the service
 * sections further down the page.
 */

/**
 * One SVG, one coordinate space. An earlier attempt laid HTML chips over an
 * SVG wire layer and the two drifted apart the moment the panel changed width -
 * a stretched viewBox cannot promise that a line meets the box it points at.
 * The lucide icons are nested `<svg>` elements positioned in the same
 * coordinates as everything else, which keeps the repo's icon set without
 * giving up that guarantee.
 */
const CHIP_W = 132;
const CHIP_H = 40;
const LEFT_X = 8;
const RIGHT_X = 340;
const CORE_X = 240;
const CORE_Y = 136;

/** Where a wire stops short of the core, so it meets the circle and not its centre. */
const LEFT_JOIN = 174;
const RIGHT_JOIN = 306;

/**
 * Must match the 8.4s duration on the `.lmm-reach-*` classes in
 * `app/globals.css`. The ring's step percentages there are derived from these
 * delays, so changing one without the other desynchronises the tick from the
 * arrival it is meant to mark.
 */
const LMM_REACH_CYCLE_SECONDS = 8.4;
const STAGGER_SECONDS = 0.95;

const offline = [
  { Icon: Printer, label: "Print & mail", y: 48 },
  { Icon: Signpost, label: "Signs", y: 116 },
  { Icon: Truck, label: "Vehicles", y: 184 },
];

const online = [
  { Icon: Search, label: "Search", y: 30 },
  { Icon: Target, label: "Paid ads", y: 86 },
  { Icon: Share2, label: "Social", y: 142 },
  { Icon: Mail, label: "Email", y: 198 },
];

const centerY = (top: number) => top + CHIP_H / 2;

const leftWire = (top: number) => {
  const y = centerY(top);
  return `M${LEFT_X + CHIP_W},${y} C170,${y} 158,${CORE_Y} ${LEFT_JOIN},${CORE_Y}`;
};

const rightWire = (top: number) => {
  const y = centerY(top);
  return `M${RIGHT_X},${y} C308,${y} 322,${CORE_Y} ${RIGHT_JOIN},${CORE_Y}`;
};

/**
 * Alternating sides rather than one column then the other, so the pulses read
 * as arriving from every direction instead of sweeping down one list and then
 * the other. The fourth online channel has no offline partner and closes.
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

export function ChannelMixVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-7"
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Channel Mix
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
          <span className="lmm-status h-1.5 w-1.5 rounded-full bg-amber-400" />
          Running
        </span>
      </div>

      <svg viewBox="0 0 480 250" className="block h-auto w-full">
        <defs>
          <radialGradient id="lmmReachCore" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.18)" />
            <stop offset="72%" stopColor="rgba(10,10,10,0.92)" />
            <stop offset="100%" stopColor="rgba(10,10,10,0.96)" />
          </radialGradient>
        </defs>

        {/* Wires first, so every chip and the core paint over them. */}
        {wires.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(251,191,36,0.2)"
            strokeWidth={1}
          />
        ))}

        <Group label="Offline" x={LEFT_X} labelY={36} items={offline} />
        <Group label="Online" x={RIGHT_X} labelY={18} items={online} />

        <circle
          className="lmm-reach-core"
          cx={CORE_X}
          cy={CORE_Y}
          r={62}
          fill="url(#lmmReachCore)"
          stroke="rgba(251,191,36,0.35)"
        />

        {/* Rotated by attribute so the arc starts at the top: a CSS rotate here
            would take the whole SVG as its origin, not the circle's centre. */}
        <circle
          className="lmm-reach-ring"
          cx={CORE_X}
          cy={CORE_Y}
          r={70}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={2}
          strokeLinecap="round"
          transform={`rotate(-90 ${CORE_X} ${CORE_Y})`}
        />

        <User
          x={CORE_X - 11}
          y={CORE_Y - 31}
          width={22}
          height={22}
          className="text-amber-300"
        />

        <g className="lmm-reach-before">
          <text
            x={CORE_X}
            y={CORE_Y + 16}
            textAnchor="middle"
            className="fill-amber-200 text-[11px] font-semibold"
          >
            Your next
          </text>
          <text
            x={CORE_X}
            y={CORE_Y + 30}
            textAnchor="middle"
            className="fill-amber-200 text-[11px] font-semibold"
          >
            customer
          </text>
        </g>

        <g className="lmm-reach-after">
          <text
            x={CORE_X}
            y={CORE_Y + 23}
            textAnchor="middle"
            className="fill-amber-200 text-[13px] font-bold"
          >
            Calls you.
          </text>
        </g>

        {/* Packets last, so they ride on top of the wires they follow. */}
        {wires.map((d, i) => (
          <circle
            key={d + i}
            className="lmm-reach-pkt"
            r={2.8}
            fill="#fbbf24"
            style={{
              offsetPath: `path("${d}")`,
              animationDelay: `${i * STAGGER_SECONDS}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

interface GroupProps {
  label: string;
  x: number;
  labelY: number;
  items: { Icon: typeof User; label: string; y: number }[];
}

function Group({ label, x, labelY, items }: GroupProps) {
  return (
    <g>
      <text
        x={x}
        y={labelY}
        className="fill-neutral-500 text-[9px] font-semibold uppercase tracking-[0.14em]"
      >
        {label}
      </text>

      {items.map(({ Icon, label: name, y }) => (
        <g key={name}>
          <rect
            x={x}
            y={y}
            width={CHIP_W}
            height={CHIP_H}
            rx={6}
            fill="rgba(10,10,10,0.6)"
            stroke="rgba(255,255,255,0.1)"
          />
          <Icon
            x={x + 12}
            y={centerY(y) - 7}
            width={14}
            height={14}
            className="text-slate-300"
          />
          <text
            x={x + 36}
            y={centerY(y) + 4}
            className="fill-neutral-300 text-[11px] font-medium"
          >
            {name}
          </text>
        </g>
      ))}
    </g>
  );
}
