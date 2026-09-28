import {
  Phone,
  Zap,
  ClipboardList,
  Send,
  Star,
  Receipt,
  BarChart3,
} from "lucide-react";
import { automatedTasks } from "@/data/lee-systems";

const icons = {
  calls: Phone,
  "lead-response": Zap,
  intake: ClipboardList,
  "follow-up": Send,
  reviews: Star,
  invoicing: Receipt,
  reporting: BarChart3,
} as const;

/**
 * Seven concrete examples; the automation page has the full list by area.
 * The first, AI call answering, runs the full width of the grid, which both
 * marks it as the lead service and keeps the six below it in even rows.
 */
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
          {automatedTasks.map(({ id, title, body }, i) => {
            const Icon = icons[id];
            return (
              <li
                key={id}
                className={`bg-neutral-950 p-6 md:p-8 ${
                  i === 0 ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
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
