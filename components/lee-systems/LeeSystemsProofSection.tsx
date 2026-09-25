import { PlaceholderBox } from "@/components/lee-systems/PlaceholderBox";

/**
 * Proof. PLACEHOLDER until there is a real case study, screenshot or result
 * the owner can stand behind. Deliberately empty rather than filled with a
 * sample testimonial or an illustrative number (docs/LEE-SYSTEMS.md).
 */
export function LeeSystemsProofSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            Results
          </p>
          <h2 className="heading-lg text-white">What it looks like in practice</h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <PlaceholderBox label="Case study" className="min-h-56">
            A real client system: the problem, what was built, and a result you
            can verify (e.g. response time before and after).
          </PlaceholderBox>
          <PlaceholderBox label="Screenshot or workflow" className="min-h-56">
            A screenshot of a live automation, a daily report, or a client
            quote used with permission.
          </PlaceholderBox>
        </div>
      </div>
    </section>
  );
}
