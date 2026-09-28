import { FaqAccordion } from "@/components/lee-systems/FaqAccordion";
import { automationFaqs } from "@/data/lee-systems";

export function AutomationFAQSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        {/* The FAQ opens after the process band; the hairline gives the page
            somewhere to breathe before the questions and the form below. */}
        <div
          aria-hidden="true"
          className="mx-auto mb-14 h-px max-w-md bg-gradient-to-r from-transparent via-brass-400/30 to-transparent"
        />

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">Questions</p>
          <h2 className="heading-lg text-white">Questions about automation</h2>
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
