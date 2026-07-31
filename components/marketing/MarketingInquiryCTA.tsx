import { MarketingInquiryForm } from "@/components/marketing/MarketingInquiryForm";

export function MarketingInquiryCTA() {
  return (
    <section
      id="marketing-inquiry-form"
      className="scroll-mt-24 border-y border-white/10 bg-gradient-to-b from-neutral-950 via-amber-950/[0.08] to-neutral-950 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="heading-lg mb-6 text-white">
            How Are Customers Supposed to Find You?
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Tell us what you are trying to accomplish and which channels you are
            curious about. We will come back with a mix, a quote, and a straight
            answer about anything we would leave out.
          </p>
        </div>

        <MarketingInquiryForm />
      </div>
    </section>
  );
}
