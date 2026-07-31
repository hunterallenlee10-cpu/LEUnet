import {
  Printer,
  Signpost,
  Truck,
  Search,
  Target,
  Share2,
  Mail,
  Store,
} from "lucide-react";

const offline = [
  { Icon: Printer, label: "Print & mail" },
  { Icon: Signpost, label: "Signs" },
  { Icon: Truck, label: "Vehicles" },
];

const online = [
  { Icon: Search, label: "Search" },
  { Icon: Target, label: "Paid ads" },
  { Icon: Share2, label: "Social" },
  { Icon: Mail, label: "Email" },
];

/**
 * The hero visual: the two halves of a channel mix converging on one business.
 *
 * Abstract rather than a mock campaign, for the same reason the websites hero
 * uses a wireframe - a fake billboard photo or invented ad creative would imply
 * work we cannot point to.
 *
 * Decorative: hidden from assistive technology. The copy beside it states what
 * the offering is.
 */
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

      <div className="space-y-3">
        <Group title="Offline" items={offline} />
        <Group title="Online" items={online} />
      </div>

      {/* Convergence */}
      <div className="mt-3 flex flex-col items-center">
        <span className="h-4 w-px bg-gradient-to-b from-amber-400/50 to-amber-400/20" />
        <div className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3">
          <Store className="h-4 w-4 shrink-0 text-amber-300" />
          <span className="text-sm font-semibold text-amber-200">
            One business, one message
          </span>
        </div>
      </div>
    </div>
  );
}

interface GroupProps {
  title: string;
  items: { Icon: typeof Store; label: string }[];
}

function Group({ title, items }: GroupProps) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-neutral-900/50 p-3.5">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
        {title}
      </p>
      <ul className="grid grid-cols-2 gap-2">
        {items.map(({ Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-neutral-950/60 px-2.5 py-2"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-slate-300" />
            <span className="text-[11px] font-medium text-neutral-300">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
