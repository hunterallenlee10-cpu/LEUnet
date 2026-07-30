import { Settings2, Target, MessageSquare, TrendingUp } from "lucide-react";

const differentiators = [
  {
    Icon: Settings2,
    title: "Custom-Built Systems",
    body: "The automation is designed around your specific workflow instead of forcing the business into a generic template.",
  },
  {
    Icon: Target,
    title: "Revenue-Focused Strategy",
    body: "Every system should solve a meaningful business problem connected to time, capacity, consistency, opportunity, or revenue.",
  },
  {
    Icon: MessageSquare,
    title: "Clear and Practical Implementation",
    body: "Complex automation explained in direct business language, without unnecessary technical terminology.",
  },
  {
    Icon: TrendingUp,
    title: "Long-Term Scalability",
    body: "Systems built to support the business as its activity, customer base, and operational needs increase.",
  },
];

export function LmmWhyChooseSection() {
  return (
    <section className="bg-gradient-to-b from-amber-950/[0.06] to-neutral-950 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Why Lee Marketing Mastery
          </p>
          <h2 className="heading-lg text-white">
            Built for the Way Growing Businesses Actually Operate
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {differentiators.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </span>
              <div>
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-amber-400/25 bg-amber-400/[0.05] p-8 text-center">
          <p className="text-lg font-semibold leading-relaxed text-white">
            The goal is not to automate everything. The goal is to automate the
            right processes so your business can operate more effectively.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Our tested systems have delivered measurable growth across businesses
            of every size, from independent startups to nine-figure enterprises.
          </p>
        </div>
      </div>
    </section>
  );
}
