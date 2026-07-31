import { Rocket, Smartphone, Search, MessageSquare } from "lucide-react";

const outcomes = [
  {
    Icon: Rocket,
    title: "Launched Sooner",
    label: "Weeks of production work compressed into days",
  },
  {
    Icon: Smartphone,
    title: "Works on Every Screen",
    label: "Designed for phones first, then scaled up",
  },
  {
    Icon: Search,
    title: "Built to Be Found",
    label: "Clean structure, real page titles, fast loads",
  },
  {
    Icon: MessageSquare,
    title: "Built to Capture Leads",
    label: "Every page has a next step for the visitor",
  },
];

export function WebsitesOutcomeStrip() {
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
