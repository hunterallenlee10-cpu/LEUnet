/**
 * Illustrative categories, not a client list. The copy deliberately describes
 * what automation can do for each type of business rather than implying Lee
 * Marketing Mastery currently serves a named company in it.
 */
const useCases = [
  {
    industry: "Home-Service Companies",
    examples: [
      "Triggering follow-up after estimate requests",
      "Routing website leads into a CRM",
    ],
  },
  {
    industry: "HVAC and Refrigeration",
    examples: [
      "Finding qualified commercial prospects",
      "Creating recurring maintenance re-engagement workflows",
    ],
  },
  {
    industry: "Roofing and Exterior Contractors",
    examples: [
      "Organizing property information for estimates",
      "Notifying team members when action is required",
    ],
  },
  {
    industry: "Property-Service Businesses",
    examples: [
      "Researching owners and decision-makers",
      "Scheduling and confirming recurring visits",
    ],
  },
  {
    industry: "Professional-Service Firms",
    examples: [
      "Automating client intake and document collection",
      "Sending appointment confirmations",
    ],
  },
  {
    industry: "Commercial Cleaning",
    examples: [
      "Identifying qualified commercial properties",
      "Routing bid requests to the right team member",
    ],
  },
  {
    industry: "Real-Estate Professionals",
    examples: [
      "Organizing property and business information",
      "Automated lead nurturing between transactions",
    ],
  },
  {
    industry: "Medical and Cosmetic Practices",
    examples: [
      "Consultation request and intake workflows",
      "Appointment reminders and confirmations",
    ],
  },
  {
    industry: "Local Service Businesses",
    examples: [
      "Capturing and organizing inbound enquiries",
      "Follow-up reminders so quotes are not forgotten",
    ],
  },
  {
    industry: "Business-to-Business Providers",
    examples: [
      "Prospect research and contact enrichment",
      "Pipeline reporting for the sales team",
    ],
  },
];

export function LmmUseCasesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Built Around Your Business
          </p>
          <h2 className="heading-lg text-white">
            Automation Opportunities Exist in Every Industry
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map(({ industry, examples }) => (
            <div
              key={industry}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-amber-400/30"
            >
              <h3 className="mb-4 border-b border-white/10 pb-3 font-semibold text-white">
                {industry}
              </h3>
              <ul className="space-y-2.5">
                {examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-start gap-2.5 text-sm text-neutral-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400/70"
                    />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
