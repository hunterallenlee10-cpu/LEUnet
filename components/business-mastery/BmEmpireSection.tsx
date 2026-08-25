import { bmEmpire, bmEmpireSteps } from "@/data/business-mastery";

/**
 * Section 4 — the eight-step framework, laid out as a numbered ladder. It
 * sits between "who this is for" and "what the program is" on purpose: the
 * visitor sees themselves, then the path, then the vehicle.
 */
export function BmEmpireSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Framework
          </p>
          <h2 className="heading-lg mb-4 text-white">{bmEmpire.heading}</h2>
          <p className="text-lg text-neutral-400">{bmEmpire.description}</p>
        </div>

        <ol className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {bmEmpireSteps.map((step) => (
            <li
              key={step.id}
              className="flex items-start gap-5 rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors duration-300 hover:border-amber-400/30"
            >
              <span
                className="mt-0.5 text-3xl font-bold tabular-nums text-amber-400/80"
                aria-hidden="true"
              >
                {String(step.step).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-1.5 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
