"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LeeSystemsMarkDivider } from "@/components/lee-systems/LeeSystemsMark";
import { websiteFaqs } from "@/data/lee-systems";

export function WebsitesFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        {/* Same breath the automation and marketing FAQs take: the inquiry
            section above ends on a form, and the divider keeps this heading
            from landing directly under it. */}
        <LeeSystemsMarkDivider className="mb-14" />

        {/* This is the last heading a reader meets before the form, and it used
            to read "Questions About the Build", which frames the purchase as a
            construction project - the exact framing the rest of the page moved
            away from. It also did not describe its own contents: of the answers
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

        <div className="mx-auto max-w-3xl divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          {websiteFaqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`website-faq-panel-${index}`}
                    id={`website-faq-trigger-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brass-400"
                  >
                    <span className="font-semibold text-white">{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brass-300 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`website-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`website-faq-trigger-${index}`}
                  hidden={!isOpen}
                  className="px-6 pb-5"
                >
                  <p className="leading-relaxed text-neutral-400">{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
