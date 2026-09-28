import { Search, Hammer, Play } from "lucide-react";

const steps = [
  {
    Icon: Search,
    title: "Audit",
    body: "On a free consultation call, we look at how calls, leads, intake, follow-ups and admin run today, and where things slip. Then you get a flat quote up front.",
  },
  {
    Icon: Hammer,
    title: "Build",
    body: "We build and test each system around the tools you already use, and nothing customer-facing goes live until you approve it.",
  },
  {
    Icon: Play,
    title: "Run",
    body: "The system runs in the background every day. You get a short report and your team gets its time back.",
  },
];

export function LeeSystemsHowItWorksSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            How it works
          </p>
          <h2 className="heading-lg text-white">Audit. Build. Run.</h2>
        </div>

        <ol className="relative mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brass-400/30 to-transparent md:block"
          />
          {steps.map(({ Icon, title, body }, i) => (
            <li key={title} className="relative text-center">
              <span className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-brass-400/40 bg-neutral-950">
                <Icon className="h-5 w-5 text-brass-300" aria-hidden="true" />
              </span>
              <h3 className="mb-3 text-xl font-bold text-white">
                <span className="mr-2 font-mono text-sm text-brass-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
