import { FaqAccordion } from "@/components/lee-systems/FaqAccordion";
import { LeeSystemsMarkDivider } from "@/components/lee-systems/LeeSystemsMark";
import { automationFaqs } from "@/data/lee-systems";

export function AutomationFAQSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        {/* The FAQ opens after the audit-process band; the divider gives the page
            somewhere to breathe before the questions and the form below them,
            and carries the mark while it does it. */}
        <LeeSystemsMarkDivider className="mb-14" />

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-400">
            Common Questions
          </p>
          <h2 className="heading-lg text-white">Questions About Automation</h2>
        </div>

        <FaqAccordion
          items={automationFaqs}
          idPrefix="faq"
          chevronClassName="text-brass-400"
        />
      </div>
    </section>
  );
}
