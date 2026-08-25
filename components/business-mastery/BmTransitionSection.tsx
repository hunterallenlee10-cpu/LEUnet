import { bmTransition } from "@/data/business-mastery";

/**
 * Section 10 — the pivot from the founder's story to the visitor's. The plan
 * is explicit that the journey section must not run straight into a sales
 * pitch; this section is the connective tissue, answering "why did we build
 * this for you?" before the final CTA asks anything.
 */
export function BmTransitionSection() {
  return (
    <section className="bg-neutral-950 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-lg mb-10 uppercase text-white">
            {bmTransition.heading}
          </h2>

          <div className="space-y-6">
            {bmTransition.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === bmTransition.paragraphs.length - 1
                    ? "text-xl font-semibold leading-relaxed text-amber-400 sm:text-2xl"
                    : "text-lg leading-relaxed text-neutral-300"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
