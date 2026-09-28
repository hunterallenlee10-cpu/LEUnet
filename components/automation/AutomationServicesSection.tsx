import {
  Inbox,
  Send,
  MessageSquare,
  Star,
  Receipt,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

/**
 * What gets automated, grouped by the part of the business it serves. Each
 * card leads with the outcome and keeps the step-by-step list behind a toggle,
 * so the grid scans in one pass and the detail is there for whoever wants it.
 * The toggle is a native <details>, so the section needs no client JS; the
 * shared `name` keeps one card open at a time.
 */
const areas = [
  {
    id: "leads",
    Icon: Inbox,
    title: "Leads",
    description:
      "Every inquiry from your website, phone, ads and directories is answered right away and lands in one place.",
    capabilities: [
      "Instant text and email reply to new inquiries",
      "Missed-call text back",
      "Leads from every source collected into one list",
      "A text to you with the lead's details",
      "Duplicate leads caught and merged",
    ],
  },
  {
    id: "sales-follow-up",
    Icon: Send,
    title: "Sales follow-up",
    description:
      "Quotes, estimates and consultations get followed up on a schedule until the customer gives an answer.",
    capabilities: [
      "Estimate and quote follow-up sequences",
      "Reminders for consultations not yet booked",
      "Re-engagement for leads that went quiet",
      "Stops automatically when the customer replies",
      "Task reminders for the calls a person should make",
    ],
  },
  {
    id: "client-communication",
    Icon: MessageSquare,
    title: "Client communication",
    description:
      "Clients know what is happening without having to call and ask, and your team is not the one typing it.",
    capabilities: [
      "Intake forms that collect details before the first call",
      "Appointment booking, confirmations and reminders",
      "Status updates at each stage of a job or matter",
      "Document and photo requests that follow up on themselves",
      "Welcome messages for new clients",
    ],
  },
  {
    id: "reviews-referrals",
    Icon: Star,
    title: "Reviews and referrals",
    description:
      "Happy customers are asked for a review and a referral at the moment they are most likely to give one.",
    capabilities: [
      "Review requests when a job or matter closes",
      "A gentle second ask if there is no response",
      "Unhappy responses routed to you privately first",
      "Referral requests to past customers",
    ],
  },
  {
    id: "billing",
    Icon: Receipt,
    title: "Billing",
    description:
      "Invoices go out on time and overdue ones are chased politely, without anyone doing it by hand.",
    capabilities: [
      "Invoices created when a job is marked done",
      "Payment reminders before and after the due date",
      "Receipts and thank-you messages on payment",
      "A weekly list of what is still outstanding",
    ],
  },
  {
    id: "internal-ops",
    Icon: LayoutDashboard,
    title: "Internal operations",
    description:
      "The copying, filing and checking your team does every day, handled in the background.",
    capabilities: [
      "Daily summary of leads, bookings and open items",
      "Data copied between your tools so nobody retypes it",
      "Files and notes organized into the right folders",
      "Team notifications when something needs a person",
      "Recurring admin tasks run on a schedule",
    ],
  },
];

export function AutomationServicesSection() {
  return (
    <section
      id="automation-services"
      className="relative isolate py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            What we automate
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Six areas where the busywork lives
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Most businesses start with one or two of these. Every system is
            built around how your business already works, not forced into a
            template.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areas.map(({ id, Icon, title, description, capabilities }) => (
            <div
              key={id}
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-brass-400/40 md:p-8"
            >
              <Icon className="mb-5 h-7 w-7 text-brass-300" aria-hidden="true" />

              <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                {description}
              </p>

              <details name="automation-areas" className="group mt-auto">
                <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 rounded text-sm font-semibold text-brass-300 transition-colors hover:text-brass-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-300 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">See examples</span>
                  <span className="hidden group-open:inline">Hide examples</span>
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2 text-sm text-neutral-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass-400"
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
