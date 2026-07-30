"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { THREAD_PALETTE, threadCopy, threadFaqs } from "@/data/thread";
import {
  ThreadHeading,
  ThreadSection,
  threadCardStyle,
} from "@/components/thread/ThreadUI";

export function ThreadFAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ThreadSection>
      <ThreadHeading
        eyebrow={threadCopy.faq.eyebrow}
        title={threadCopy.faq.title}
        description={threadCopy.faq.description}
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {threadFaqs.map((faq) => {
          const open = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="overflow-hidden rounded-lg border"
              style={threadCardStyle}
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : faq.id)}
                aria-expanded={open}
                aria-controls={`faq-panel-${faq.id}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className="font-semibold"
                  style={{ color: THREAD_PALETTE.bone }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  style={{ color: THREAD_PALETTE.champagne }}
                />
              </button>

              {open && (
                <div
                  id={`faq-panel-${faq.id}`}
                  className="border-t px-6 py-5 leading-relaxed"
                  style={{
                    borderColor: THREAD_PALETTE.border,
                    color: THREAD_PALETTE.muted,
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ThreadSection>
  );
}
