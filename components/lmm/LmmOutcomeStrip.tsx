import { SearchX, Zap, GitBranch, Clock } from "lucide-react";

const outcomes = [
  {
    Icon: SearchX,
    title: "Less Manual Research",
    label: "Information gathered and organized for you",
  },
  {
    Icon: Zap,
    title: "Faster Lead Follow-Up",
    label: "New opportunities trigger the next action",
  },
  {
    Icon: GitBranch,
    title: "A More Organized Pipeline",
    label: "Every lead lands in the right place",
  },
  {
    Icon: Clock,
    title: "More Time for Growth",
    label: "Hours returned to revenue-producing work",
  },
];

export function LmmOutcomeStrip() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-12">
      <div className="section-container">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map(({ Icon, title, label }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-neutral-400">{label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
