"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LeeSystemsMarkDivider } from "@/components/lee-systems/LeeSystemsMark";
import { automationFaqs } from "@/data/lee-systems";

export function AutomationFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <div className="mx-auto max-w-3xl divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
          {automationFaqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brass-400"
                  >
                    <span className="font-semibold text-white">{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brass-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
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
