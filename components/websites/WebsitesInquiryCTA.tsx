import { WebsitesInquiryForm } from "@/components/websites/WebsitesInquiryForm";

export function WebsitesInquiryCTA() {
  return (
    <section
      id="website-inquiry-form"
      className="scroll-mt-24 border-y border-white/10 bg-gradient-to-b from-neutral-950 via-amber-950/[0.08] to-neutral-950 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="heading-lg mb-6 text-white">
            What Would a Better Website Be Worth to Your Business?
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Tell us what your business does and what the site needs to
            accomplish. We will come back with a quote, a realistic timeline,
            and an honest answer about whether a new build is actually the right
            move for you.
          </p>
        </div>

        <WebsitesInquiryForm />
      </div>
    </section>
  );
}
