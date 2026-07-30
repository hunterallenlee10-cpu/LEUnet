import {
  Clock,
  Zap,
  ShieldCheck,
  Repeat,
  TrendingUp,
  Eye,
} from "lucide-react";

/**
 * Qualitative only by design. No metrics, client names or testimonials exist in
 * this repository for Lee Marketing Mastery, and inventing them is not an
 * option. Each entry is a self-contained card, so a verified figure can be
 * added to one later without changing the section's structure.
 */
const results = [
  {
    Icon: Clock,
    title: "Save Time",
    body: "Reduce hours spent researching, copying information, updating records, and completing repetitive administrative work.",
  },
  {
    Icon: Zap,
    title: "Respond Faster",
    body: "Create systems that organize new opportunities and trigger the appropriate next action without depending entirely on memory.",
  },
  {
    Icon: ShieldCheck,
    title: "Protect More Opportunities",
    body: "Reduce the chance that qualified leads, follow-ups, or customer requests are forgotten or lost inside disconnected systems.",
  },
  {
    Icon: Repeat,
    title: "Improve Consistency",
    body: "Make important business processes more repeatable, trackable, and dependable.",
  },
  {
    Icon: TrendingUp,
    title: "Increase Capacity",
    body: "Allow a growing company to handle more activity without increasing manual workload at the same rate.",
  },
  {
    Icon: Eye,
    title: "Make Better Decisions",
    body: "Organize important information so owners and teams can see what is happening and determine where attention is needed.",
  },
];

export function LmmResultsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Automation Advantage
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Better Systems Create Better Results.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            The purpose of automation is not simply to make a business look more
            advanced. It is to remove friction, increase consistency, protect
            valuable opportunities, and give the team more time to focus on
            revenue-producing work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ Icon, title, body }) => (
            <div key={title} className="bg-neutral-950 p-7">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-400/25 bg-slate-400/10">
                <Icon className="h-5 w-5 text-slate-300" aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
