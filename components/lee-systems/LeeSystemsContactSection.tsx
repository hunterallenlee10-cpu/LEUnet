import { LeeSystemsInquiryForm } from "@/components/lee-systems/LeeSystemsInquiryForm";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsAnchors } from "@/data/lee-systems";
import { site } from "@/data/site";

/**
 * The one form on /lee-systems (#contact-form), and the page's last section:
 * every "Book a free call" button above it scrolls here. It replaced the
 * automation page's consultation form and the websites page's quote form when
 * both pages folded into /lee-systems (2026-09-29). Their ids, "audit" and
 * "website-quote", stay on wrappers around the form so links made for either
 * still land on it.
 *
 * tabIndex={-1} lets a hash jump to any of the three ids move focus there
 * too, so the next Tab lands in the form.
 */
export function LeeSystemsContactSection() {
  return (
    <section
      id={leeSystemsAnchors.form}
      tabIndex={-1}
      className="relative isolate py-20 outline-none md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            Free consultation
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Tell us about your business
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            {site.replyTime
              ? `We'll reply ${site.replyTime} to set up your free consultation call.`
              : "We'll get back to you to set up your free consultation call."}
          </p>
          {site.bookingUrl && (
            <div className="mt-8">
              <p className="mb-4 text-neutral-300">Rather pick a time yourself?</p>
              <BookCallLink variant="secondary" />
            </div>
          )}
        </div>

        <div id={leeSystemsAnchors.auditForm} tabIndex={-1} className="outline-none">
          <div
            id={leeSystemsAnchors.websiteQuoteForm}
            tabIndex={-1}
            className="outline-none"
          >
            <LeeSystemsInquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
