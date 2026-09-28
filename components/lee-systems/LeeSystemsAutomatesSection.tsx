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
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            What gets automated
          </p>
          <h2 className="heading-lg mb-6 text-white">
            The work that happens every day, whether anyone remembers or not
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {automatedTasks.map(({ id, title, body }) => {
            const Icon = icons[id];
            return (
              <li key={id} className="bg-neutral-950 p-6 md:p-8">
                <Icon className="mb-4 h-7 w-7 text-brass-300" aria-hidden="true" />
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
