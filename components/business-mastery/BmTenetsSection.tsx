import { bmTenets, bmTenetsIntro } from "@/data/business-mastery";

/**
 * Section 4 — the three core tenets. It replaced the eight-step "How to Build
 * Your Own Empire" ladder at the owner's request, and the slot it inherited
 * still works: the visitor sees themselves, then sees how we operate, then
 * sees the program that operates that way. The old rationale for this
 * position was a roadmap argument ("then sees the path"); three principles
 * are not a path, so the argument is now about stance, not sequence.
 *
 * Three columns, not two. `sm:grid-cols-2` was right for eight cards and
 * strands a lone half-width card under a centered header at three, which
 * reads as a missing fourth tenet. The md:2 step the rest of the site uses
 * (BmProgramSection) has the same problem here and is deliberately skipped.
 */
export function BmTenetsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Way We Build
          </p>
          <h2 className="heading-lg mb-4 text-white">
            {bmTenetsIntro.heading}
          </h2>
          <p className="text-lg text-neutral-400">
            {bmTenetsIntro.description}
          </p>
        </div>

        <ol className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {bmTenets.map((tenet) => (
            <li
              key={tenet.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors duration-300 hover:border-amber-400/30"
            >
              {/* Stacked rather than beside the title: at three columns the
                  old horizontal row left roughly 220px for the copy, which
                  wrapped every description to five or six lines. */}
              <span
                className="mb-4 block text-3xl font-bold tabular-nums text-amber-400/80"
                aria-hidden="true"
              >
                {String(tenet.number).padStart(2, "0")}
              </span>
              <h3 className="mb-1.5 text-lg font-bold text-white">
                {tenet.title}
              </h3>
              <p className="leading-relaxed text-neutral-400">
                {tenet.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
