"use client";

import { useState } from "react";
import {
  Search,
  UserSearch,
  Database,
  Send,
  CalendarCheck,
  BarChart3,
  Workflow,
  ChevronDown,
} from "lucide-react";

const services = [
  {
    id: "lead-generation",
    Icon: Search,
    title: "Lead Generation and Prospecting",
    description:
      "Automatically identify businesses, properties, contacts, or opportunities that match your ideal customer profile and service area.",
    capabilities: [
      "Market and territory searches",
      "Business opportunity identification",
      "Prospect qualification",
      "Organized lead delivery",
      "Duplicate prevention",
    ],
  },
  {
    id: "enrichment",
    Icon: UserSearch,
    title: "Decision-Maker Research and Lead Enrichment",
    description:
      "Turn basic company information into a more useful sales opportunity by researching the people most likely to make purchasing decisions.",
    capabilities: [
      "Owner and manager research",
      "Professional contact discovery",
      "Role and title identification",
      "Source organization",
      "Confidence scoring",
      "Contact-record enrichment",
    ],
  },
  {
    id: "crm",
    Icon: Database,
    title: "CRM and Pipeline Automation",
    description:
      "Keep leads organized and automatically move information into the tools your team already uses.",
    capabilities: [
      "Lead routing",
      "Status updates",
      "Pipeline organization",
      "Task creation",
      "Duplicate control",
      "Internal notifications",
    ],
  },
  {
    id: "follow-up",
    Icon: Send,
    title: "Automated Follow-Up and Lead Nurturing",
    description:
      "Create consistent follow-up systems so qualified opportunities are not forgotten after the first message or phone call.",
    capabilities: [
      "Email sequences",
      "Follow-up reminders",
      "Lead-status triggers",
      "Re-engagement workflows",
      "Personalized outreach steps",
      "Sales-team notifications",
    ],
  },
  {
    id: "intake",
    Icon: CalendarCheck,
    title: "Client Intake and Appointment Workflows",
    description:
      "Reduce administrative work by automatically collecting information, confirming requests, and moving new customers into the correct process.",
    capabilities: [
      "Consultation requests",
      "Client intake",
      "Appointment confirmations",
      "Document collection",
      "Internal handoffs",
      "Customer notifications",
    ],
  },
  {
    id: "reporting",
    Icon: BarChart3,
    title: "Reporting and Operations Dashboards",
    description:
      "Bring important information into one organized view so business owners can understand activity, progress, and opportunities more quickly.",
    capabilities: [
      "Lead reporting",
      "Pipeline visibility",
      "Workflow activity",
      "Conversion tracking",
      "Operational summaries",
      "Custom notifications",
    ],
  },
  {
    id: "custom",
    Icon: Workflow,
    title: "Custom Business Process Automation",
    description:
      "Connect repetitive business tasks into one reliable system built specifically around the company's existing workflow.",
    capabilities: [
      "Data synchronization",
      "Internal approval workflows",
      "Document organization",
      "Team notifications",
      "Recurring task automation",
      "Cross-platform integrations",
    ],
  },
];

export function LmmServicesSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="automation-services"
      className="scroll-mt-24 bg-gradient-to-b from-neutral-950 to-amber-950/[0.06] py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Custom Automation Systems
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Systems Built to Produce Business Results
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Every system is designed around a specific operational or revenue
            problem. Lee Marketing Mastery does not force businesses into a
            generic, one-size-fits-all automation package.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, Icon, title, description, capabilities }) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04]"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                  <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
                </span>

                <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {description}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-capabilities`}
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                >
                  {isOpen ? "Hide capabilities" : "View capabilities"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <ul
                  id={`${id}-capabilities`}
                  hidden={!isOpen}
                  className="mt-4 space-y-2 border-t border-white/10 pt-4"
                >
                  {capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2 text-sm text-neutral-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
