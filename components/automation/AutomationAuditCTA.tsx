import { AutomationAuditForm } from "@/components/automation/AutomationAuditForm";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsAnchors } from "@/data/lee-systems";
import { site } from "@/data/site";

/**
 * The automation form section, where "fill in the short form below" leads.
 * It asked for the free Automation Audit until 2026-09-28; it now sets up the
 * free consultation call, and keeps the id "audit" so older links still land
 * here. tabIndex={-1} lets the hash jump move focus here too, so the next Tab
 * lands in the form.
 */
export function AutomationAuditCTA() {
  return (
    <section
      id={leeSystemsAnchors.automationForm}
      tabIndex={-1}
      className="relative isolate py-20 outline-none md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            Free consultation
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Find out what your business could stop doing by hand
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Tell us where the time goes.{" "}
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

        <AutomationAuditForm />
      </div>
    </section>
  );
}
