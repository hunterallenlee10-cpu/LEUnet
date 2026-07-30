import {
  Search,
  Building2,
  UserSearch,
  Database,
  Send,
  Target,
  BarChart3,
} from "lucide-react";

const nodes = [
  { id: "sources", label: "Lead Sources", Icon: Search },
  { id: "research", label: "Business Research", Icon: Building2 },
  { id: "enrichment", label: "Contact Enrichment", Icon: UserSearch },
  { id: "crm", label: "CRM", Icon: Database, emphasis: true },
  { id: "followup", label: "Automated Follow-Up", Icon: Send },
  { id: "opportunity", label: "Qualified Opportunity", Icon: Target, emphasis: true },
  { id: "reporting", label: "Reporting", Icon: BarChart3 },
];

/**
 * The hero diagram: information moving through a business system.
 *
 * Two layouts rather than one scaled-down layout - a seven node graph shrunk to
 * phone width stops being readable long before it stops fitting. Small screens
 * get a vertical rail, larger screens get the connected graph.
 *
 * Decorative: hidden from assistive technology, and the surrounding copy already
 * states what the system does.
 */
export function AutomationFlowVisual() {
  return (
    <div aria-hidden="true" className="relative w-full">
      {/* Mobile: vertical rail */}
      <ol className="flex flex-col gap-3 md:hidden">
        {nodes.map(({ id, label, Icon, emphasis }, index) => (
          <li key={id} className="relative flex items-center gap-3">
            {index !== nodes.length - 1 && (
              <span className="absolute left-[22px] top-11 h-3 w-px bg-gradient-to-b from-amber-400/50 to-transparent" />
            )}
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${
                emphasis
                  ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
                  : "border-slate-500/30 bg-slate-400/5 text-slate-300"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-neutral-300">{label}</span>
          </li>
        ))}
      </ol>

      {/* Desktop: connected graph */}
      <div className="relative hidden md:block">
        <svg
          viewBox="0 0 520 300"
          className="w-full"
          role="presentation"
          focusable="false"
        >
          <defs>
            <linearGradient id="lmmLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFC107" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#FFC107" stopOpacity="0.55" />
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

          {/* Connectors, left to right through the pipeline. Coordinates track
              the card edges below: the middle column spans x 154-322, CRM
              x 204-289, and the trailing column starts at x 350. The middle
              pair sits above and below CRM rather than beside it, so those two
              connectors run vertically. */}
          {[
            "M 130 61 L 152 61",
            "M 65 79 C 65 150 92 211 152 211",
            "M 238 79 C 238 92 246 96 246 109",
            "M 238 193 C 238 180 246 176 246 145",
            "M 289 127 C 320 127 325 33 350 33",
            "M 289 127 L 350 165",
            "M 289 127 C 320 127 325 264 350 264",
          ].map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="url(#lmmLine)" strokeWidth="1.5" />
              <path
                d={d}
                fill="none"
                stroke="#FFC107"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                className="lmm-dash"
              />
              <circle r="2.5" fill="#FFC107" className="lmm-packet" style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 0.55}s` }} />
            </g>
          ))}
        </svg>

        {/* Node cards positioned over the graph */}
        <div className="absolute inset-0">
          {/* The trailing column is anchored right rather than left so the
              cards stay inside the panel, and shares one fixed width so the
              three line up as a column instead of ending raggedly.
              CRM sits clear of it: at 51% the widest right-hand label came
              within a pixel of overlapping it. */}
          {[
            { n: nodes[0], style: { left: "0%", top: "20%" } },
            { n: nodes[1], style: { left: "29.5%", top: "20%" }, width: "w-[168px]" },
            { n: nodes[2], style: { left: "29.5%", top: "64%" }, width: "w-[168px]" },
            { n: nodes[3], style: { left: "39%", top: "42%" } },
            { n: nodes[4], style: { right: "0%", top: "11%" }, width: "w-[172px]" },
            { n: nodes[5], style: { right: "0%", top: "55%" }, width: "w-[172px]" },
            { n: nodes[6], style: { right: "0%", top: "88%" }, width: "w-[172px]" },
          ].map(({ n, style, width }) => (
            <div
              key={n.id}
              style={style}
              className={`absolute flex -translate-y-1/2 items-center gap-2 rounded-lg border px-2.5 py-2 backdrop-blur-sm ${
                width ?? ""
              } ${
                n.emphasis
                  ? "border-amber-400/45 bg-amber-400/10"
                  : "border-white/10 bg-neutral-900/80"
              }`}
            >
              <n.Icon
                className={`h-4 w-4 shrink-0 ${
                  n.emphasis ? "text-amber-300" : "text-slate-300"
                }`}
              />
              <span className="whitespace-nowrap text-[11px] font-medium text-neutral-200">
                {n.label}
              </span>
              <span
                className={`lmm-status ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${
                  n.emphasis ? "bg-amber-400" : "bg-slate-400"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
