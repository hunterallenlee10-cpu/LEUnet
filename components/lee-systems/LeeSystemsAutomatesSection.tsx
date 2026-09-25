import {
  Zap,
  ClipboardList,
  Send,
  Star,
  Receipt,
  BarChart3,
} from "lucide-react";
import { automatedTasks } from "@/data/lee-systems";

const icons = {
  "lead-response": Zap,
  intake: ClipboardList,
  "follow-up": Send,
  reviews: Star,
  invoicing: Receipt,
  reporting: BarChart3,
} as const;

/** Six concrete examples; the automation page has the full list by area. */
export function LeeSystemsAutomatesSection() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            What Gets Automated
          </p>
          <h2 className="heading-lg mb-6 text-white">
            The work that happens every day, whether anyone remembers or not
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {automatedTasks.map(({ id, title, body }) => {
            const Icon = icons[id];
            return (
              <li key={id} className="bg-neutral-950 p-7">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-brass-400/30 bg-brass-400/10">
                  <Icon className="h-5 w-5 text-brass-300" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
