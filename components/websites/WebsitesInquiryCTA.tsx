import { WebsitesInquiryForm } from "@/components/websites/WebsitesInquiryForm";
import { leeSystemsAnchors } from "@/data/lee-systems";

/**
 * The website quote form, and the last section on the page. Every "Get a Free
 * Website Quote" button scrolls here by the anchor id.
 */
export function WebsitesInquiryCTA() {
  return (
    <section
      id={leeSystemsAnchors.websiteForm}
      className="relative isolate scroll-mt-24 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            Free Website Quote
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Tell us about your business
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            What you do and what work you want more of. We will come back with a
            quote, a timeline, and an honest answer about whether a new build
            is the right move. Sometimes it is a few changes to the site you
            already have.
          </p>
        </div>

        <WebsitesInquiryForm />
      </div>
    </section>
  );
}
