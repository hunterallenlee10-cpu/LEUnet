import { Globe, Signpost, Handshake } from "lucide-react";

const cases = [
  {
    Icon: Globe,
    title: "Digital only",
    detail:
      "You reach people already searching for you. You miss everyone who has not thought to look yet, and you compete on a screen where every competitor is one scroll away.",
  },
  {
    Icon: Signpost,
    title: "Traditional only",
    detail:
      "You build local familiarity and stay visible where the work happens. But when someone finally goes to look you up, there is nothing to find, and the trail goes cold.",
  },
  {
    Icon: Handshake,
    title: "Both, saying the same thing",
    detail:
      "The sign in the yard makes the name familiar. The search result confirms you are real. The ad shows up again a week later. Each one makes the others work harder.",
  },
];

export function MarketingProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Why Both Sides
          </p>
          <h2 className="heading-lg mb-6 text-white">
            People Do Not Notice a Business the First Time They See It.
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            They notice it the third or fourth time, usually in a different
            place than the first. That is the whole argument for running
            traditional and digital together rather than picking one.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            It is also why we will tell you when you do not need both. A
            business with no online presence at all has a different first
            problem than one with a full website and no local visibility.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {cases.map(({ Icon, title, detail }, i) => {
            const isBoth = i === cases.length - 1;
            return (
              <li
                key={title}
                className={`rounded-xl border p-6 md:p-8 ${
                  isBoth
                    ? "border-amber-400/30 bg-gradient-to-b from-amber-400/[0.07] to-transparent"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <span
                  className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg border ${
                    isBoth
                      ? "border-amber-400/40 bg-amber-400/10"
                      : "border-neutral-700 bg-neutral-900"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isBoth ? "text-amber-400" : "text-neutral-500"
                    }`}
                    aria-hidden="true"
                  />
                </span>
                <h3
                  className={`mb-3 font-semibold ${
                    isBoth ? "text-white" : "text-neutral-300"
                  }`}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {detail}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
