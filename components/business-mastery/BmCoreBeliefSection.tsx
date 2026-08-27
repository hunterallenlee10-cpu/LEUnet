import { bmCoreBelief, bmProofStatement } from "@/data/business-mastery";

/**
 * Section 2 — the argument the whole page rests on: the work is mandatory,
 * and the network is what makes it pay. The copy is the owner's, verbatim,
 * including the proof line — figures confirmed accurate by the owner, see
 * data/business-mastery.ts.
 */
export function BmCoreBeliefSection() {
  return (
    <section className="relative bg-neutral-950 py-20 md:py-32">
      {/* `overflow-hidden` is load-bearing, not tidiness: the glow is 384px wide
          at `left-10`, so on a phone it reaches 424px and widens the document
          past the viewport. That gave the whole page a horizontal scroll and
          pushed every centred section — the hero above included — off centre. */}
      <div className="absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-10 top-1/3 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-lg mb-8 text-white">{bmCoreBelief.heading}</h2>

          <p className="text-lg leading-relaxed text-neutral-300 sm:text-xl">
            {bmCoreBelief.message}
          </p>

          <p className="mt-8 text-lg text-neutral-400">{bmCoreBelief.lead}</p>
          <p className="mt-4 text-4xl font-bold uppercase tracking-widest text-amber-400 sm:text-5xl">
            {bmCoreBelief.force}
          </p>

          <p className="mt-10 border-y border-neutral-800 py-8 text-lg font-medium leading-relaxed text-white sm:text-xl">
            {bmProofStatement}
          </p>

          <p className="mt-10 text-lg leading-relaxed text-neutral-300">
            {bmCoreBelief.clarifier}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-amber-400/25 bg-amber-400/5 p-8 text-center md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            {bmCoreBelief.philosophyTitle}
          </p>
          <p className="text-lg leading-relaxed text-neutral-200">
            {bmCoreBelief.philosophy}
          </p>
        </div>
      </div>
    </section>
  );
}
