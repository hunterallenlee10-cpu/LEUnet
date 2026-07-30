import { LmmConsultationForm } from "@/components/lmm/LmmConsultationForm";

export function LmmConsultationCTA() {
  return (
    <section
      id="consultation-form"
      className="scroll-mt-24 border-y border-white/10 bg-gradient-to-b from-neutral-950 via-amber-950/[0.08] to-neutral-950 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="heading-lg mb-6 text-white">
            What Could Your Business Accomplish With a Better System?
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Tell us which process is taking too much time, where opportunities
            are being lost, or what part of your business needs to operate more
            efficiently. Lee Marketing Mastery will evaluate the opportunity and
            determine whether a custom automation system is the right solution.
          </p>
        </div>

        <LmmConsultationForm />
      </div>
    </section>
  );
}
