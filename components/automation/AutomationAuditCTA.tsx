import { AutomationAuditForm } from "@/components/automation/AutomationAuditForm";
import { automationAudit, leeSystemsAnchors } from "@/data/lee-systems";

/**
 * The audit form section. Its id is what every "Book an Automation Audit"
 * link on the Lee Systems pages points at. tabIndex={-1} lets the hash jump
 * move focus here too, so the next Tab lands in the form.
 */
export function AutomationAuditCTA() {
  return (
    <section
      id={leeSystemsAnchors.auditForm}
      tabIndex={-1}
      className="relative isolate py-20 outline-none md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            {automationAudit.price} {automationAudit.name}
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Find out what your business could stop doing by hand
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Tell us where the time goes. We will reply within{" "}
            {automationAudit.responseTime}, walk through your process on a
            short call, and send a written plan within{" "}
            {automationAudit.turnaround}: what to automate first, how long it
            takes, and what it costs.
          </p>
        </div>

        <AutomationAuditForm />
      </div>
    </section>
  );
}
