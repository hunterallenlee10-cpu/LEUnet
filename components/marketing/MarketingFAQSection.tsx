"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LmmMarkDivider } from "@/components/lmm/LmmMark";
import { marketingFaqs } from "@/data/marketing";

export function MarketingFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        {/* Same breath the automation and websites FAQs take: the inquiry
            section above ends on a form, and the divider keeps this heading
            from landing directly under it. */}
        <LmmMarkDivider className="mb-14" />

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Common Questions
          </p>
          <h2 className="heading-lg text-white">Questions About Marketing</h2>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          {marketingFaqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`marketing-faq-panel-${index}`}
                    id={`marketing-faq-trigger-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <span className="font-semibold text-white">{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-amber-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`marketing-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`marketing-faq-trigger-${index}`}
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
