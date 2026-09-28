import { FaqAccordion } from "@/components/lee-systems/FaqAccordion";
import { LeeSystemsMarkDivider } from "@/components/lee-systems/LeeSystemsMark";
import { websiteFaqs } from "@/data/lee-systems";

export function WebsitesFAQSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        {/* Same breath the automation FAQ takes: the divider separates the
            questions from the process section above. */}
        <LeeSystemsMarkDivider className="mb-14" />

        {/* This heading comes just before the form, with only the short bridge
            panel between them. It used to read "Questions About the Build",
            which frames the purchase as a construction project - the exact
            framing the rest of the page moved away from. It also did not describe its own contents: of the answers
            below, only one is about building. The others are about cost, how
            many pages a business needs, how the owner will know it is working,
            and what happens if the copy does not exist yet.

            The eyebrow lost "Common" for the same reason the FAQ answers lost
            their frequency claims. There is no client base to count questions
            across, so asserting which ones are asked most is not something we
            can back. */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            Questions
          </p>
          <h2 className="heading-lg text-white">
            What You Probably Want to Know First.
          </h2>
        </div>

        <FaqAccordion
          items={websiteFaqs}
          idPrefix="website-faq"
          chevronClassName="text-brass-300"
        />
      </div>
    </section>
  );
}
