"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { sectionIds } from "@/data/navigation";
import { privacyPolicyContent, termsOfServiceContent } from "@/data/company";
import { GlassCard } from "@/components/cards/GlassCard";

function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-amber-400/30 transition-all group"
      >
        <h3 className="font-semibold text-white text-left group-hover:text-amber-400 transition-colors">
          {title}
        </h3>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-amber-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-white/5 border border-t-0 border-white/10 rounded-b-lg text-neutral-300 text-sm leading-relaxed space-y-3">
          {content}
        </div>
      )}
    </div>
  );
}

/**
 * Privacy Policy and Terms of Service, side by side.
 *
 * These were two full sections stacked, each with its own `py-20 md:py-32`, so
 * the legal boilerplate ran to roughly two screens between the contact form and
 * the footer. One section with a two-column grid halves that: the padding is
 * paid once instead of twice, and the two columns fill width that a centred
 * `max-w-3xl` was leaving empty on either side.
 *
 * BOTH ANCHORS SURVIVE. `#privacy` and `#terms` moved from the two `<section>`
 * elements onto the two columns, because the footer's Legal links scroll to
 * them by id. Side by side they now resolve to the same scroll position, which
 * is the point rather than a regression - either link brings up the whole legal
 * block, and on desktop both are on screen at once.
 *
 * Off the homepage since 2026-09-27 at the owner's request; it now renders on
 * app/legal/page.tsx, and the footer's Legal links point at /legal#privacy
 * and /legal#terms.
 *
 * Below `lg` the columns stack, which is the old layout minus one section's
 * padding. Nothing about this is worth breaking a phone over.
 */
export function LegalSection() {
  // One open item across BOTH lists, keyed "privacy-2" / "terms-0": opening
  // any question closes whichever one was open before, including one in the
  // other column. Two separate states let a Privacy and a Terms item sit open
  // side by side.
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) =>
    setOpenKey((current) => (current === key ? null : key));

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      {/* Both sections' orbs, kept and merged - amber high right from Privacy,
          cyan low left from Terms. They are NOT on `-z-10` any more: this
          section sets no z-index, so it establishes no stacking context, and a
          negative layer inside it painted behind the section's own opaque
          background where none of it survived. Neither orb has ever actually
          been visible. The content below carries `relative` so it still paints
          over them, which is the arrangement BusinessMasterySection uses. */}
      <div className="absolute inset-0 section-fade" aria-hidden="true">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12">
          <div id={sectionIds.privacy} className="scroll-mt-24">
            <h2 className="heading-lg mb-8 text-center text-white">
              {privacyPolicyContent.title}
            </h2>

            <div className="space-y-4">
              {privacyPolicyContent.sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  title={section.heading}
                  content={section.content}
                  isOpen={openKey === `privacy-${index}`}
                  onToggle={() => toggle(`privacy-${index}`)}
                />
              ))}
            </div>

            <GlassCard hover={false} className="mt-8 p-6">
              <p className="text-neutral-400 text-sm">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <span className="text-amber-400 font-semibold">
                  ceo@leeenterprisesunlimited.com
                </span>
                .
              </p>
            </GlassCard>
          </div>

          {/* The rule replaces the `border-t` that used to separate the two
              sections: on desktop it divides the columns, and below `lg`, where
              they stack, it goes away rather than becoming a stray vertical
              line down one edge. */}
          <div
            id={sectionIds.terms}
            className="scroll-mt-24 lg:border-l lg:border-neutral-800 lg:pl-12"
          >
            <h2 className="heading-lg mb-8 text-center text-white">
              {termsOfServiceContent.title}
            </h2>

            <div className="space-y-4">
              {termsOfServiceContent.sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  title={section.heading}
                  content={section.content}
                  isOpen={openKey === `terms-${index}`}
                  onToggle={() => toggle(`terms-${index}`)}
                />
              ))}
            </div>

            <GlassCard hover={false} className="mt-8 p-6">
              <p className="text-neutral-400 text-sm">
                By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
