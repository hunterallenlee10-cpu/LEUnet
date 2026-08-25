import { bmEvolution, bmPhases } from "@/data/business-mastery";

/**
 * Section 7 — the three-phase model. The phases are a story about when you
 * enter, told in order, so they stack vertically with a connecting line
 * rather than sitting in equal columns: Phase I is the offer on this page,
 * II and III are what joining early spares you from.
 */
export function BmEvolutionSection() {
  return (
    <section className="bg-neutral-950 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            How the Network Evolves
          </p>
          <h2 className="heading-lg mb-4 text-white">{bmEvolution.heading}</h2>
          <p className="text-lg text-neutral-400">{bmEvolution.description}</p>
        </div>

        <div className="mx-auto max-w-3xl">
          {bmPhases.map((phase, index) => {
            const isLast = index === bmPhases.length - 1;
            return (
              <div key={phase.id} className="relative flex gap-6 sm:gap-8">
                {/* Rail: the phase numeral in a ring, and the line to the
                    next phase. */}
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-amber-400/60 bg-neutral-950 text-xl font-bold text-amber-400">
                    {phase.numeral}
                  </div>
                  {!isLast && (
                    <div
                      className="w-px flex-1 bg-gradient-to-b from-amber-400/50 to-amber-400/10"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className={isLast ? "" : "pb-12"}>
                  <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
                    Phase {phase.numeral} — {phase.name}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {phase.headline}
                  </h3>

                  <div className="mt-4 space-y-4">
                    {phase.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="leading-relaxed text-neutral-300"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {phase.includes && (
                    <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                      {phase.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-2.5 text-neutral-300"
                        >
                          <span
                            className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full bg-amber-400"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {phase.promise && (
                    <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/5 p-6">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-400">
                        {phase.promise.title}
                      </p>
                      <p className="text-lg font-medium leading-relaxed text-white">
                        {phase.promise.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center text-xl font-semibold text-white">
          {bmEvolution.closer}
        </p>
      </div>
    </section>
  );
}
