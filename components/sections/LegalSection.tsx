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
          className={`w-5 h-5 text-amber-400 transition-transform ${
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

export function LegalSection() {
  const [openPrivacy, setOpenPrivacy] = useState<number | null>(null);
  const [openTerms, setOpenTerms] = useState<number | null>(null);

  return (
    <>
      {/* Privacy Policy */}
      <section
        id={sectionIds.privacy}
        className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-12 text-center">
              {privacyPolicyContent.title}
            </h2>

            <div className="space-y-4">
              {privacyPolicyContent.sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  title={section.heading}
                  content={section.content}
                  isOpen={openPrivacy === index}
                  onToggle={() =>
                    setOpenPrivacy(openPrivacy === index ? null : index)
                  }
                />
              ))}
            </div>

            <GlassCard className="mt-12 p-6 bg-white/5 border-white/10">
              <p className="text-neutral-400 text-sm">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <span className="text-amber-400 font-semibold">
                  ceo@leeenterprisesunlimited.com
                </span>
                .
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Terms of Service */}
      <section
        id={sectionIds.terms}
        className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden border-t border-neutral-800"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-12 text-center">
              {termsOfServiceContent.title}
            </h2>

            <div className="space-y-4">
              {termsOfServiceContent.sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  title={section.heading}
                  content={section.content}
                  isOpen={openTerms === index}
                  onToggle={() =>
                    setOpenTerms(openTerms === index ? null : index)
                  }
                />
              ))}
            </div>

            <GlassCard className="mt-12 p-6 bg-white/5 border-white/10">
              <p className="text-neutral-400 text-sm">
                By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
