import { TwoPathsDemo } from "@/components/lee-systems/TwoPathsDemo";

/**
 * "Two paths", after The Real World's "Two Paths Lie Before You" (the
 * owner's reference, 2026-09-29): a badge, the heading, a video-style frame,
 * and a line that splits under it into the path of doing nothing and the
 * free call, with a VS between them. The frame plays an example lead rather
 * than a video; see TwoPathsDemo. Straight after the hero, so the page shows
 * what the systems do before it lists them.
 */
export function LeeSystemsTwoPathsSection() {
  return (
    <section
      aria-labelledby="ls-paths-title"
      className="relative isolate overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10 section-fade" aria-hidden="true">
        <div className="absolute left-1/2 top-[64%] h-[26rem] w-[46rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-400/[0.09] blur-3xl" />
      </div>

      <div className="section-container">
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center md:mb-10">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-4 text-xs font-semibold text-neutral-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:text-sm">
            <span className="rounded-full bg-brass-400/15 px-2.5 py-0.5 font-bold text-brass-200 ring-1 ring-inset ring-brass-400/30">
              24/7
            </span>
            AI that answers every call and lead
          </p>
          <h2 id="ls-paths-title" className="heading-lg mt-5 text-white">
            Two paths. Only one gets the customer.
          </h2>
        </div>

        <TwoPathsDemo />
      </div>
    </section>
  );
}
