"use client";

import { useState } from "react";
import { Globe, RefreshCw, Bot, ShieldCheck, ChevronDown } from "lucide-react";

const offerings = [
  {
    id: "new-build",
    Icon: Globe,
    title: "New Website Builds",
    description:
      "A complete site for a business that has never had one, or has been getting by with a social page and a phone number.",
    capabilities: [
      "Multi-page site structure",
      "Written page copy for your review",
      "Custom layout and design direction",
      "Imagery produced for your business",
      "Contact and quote forms",
      "Mobile and tablet layouts",
      "Domain and launch setup",
    ],
  },
  {
    id: "redesign",
    Icon: RefreshCw,
    title: "Website Redesigns",
    description:
      "A rebuild for a site that has aged out - slow to load, hard to read on a phone, or no longer reflecting what the business does.",
    capabilities: [
      "Review of the current site",
      "Content kept, rewritten, or replaced",
      "Modern responsive rebuild",
      "Faster page loading",
      "Clearer navigation and structure",
      "Existing URLs preserved where possible",
      "Migration from the old host",
    ],
  },
  {
    id: "ai-features",
    Icon: Bot,
    title: "AI Features Built In",
    description:
      "The website is where a lead first appears. These features decide whether that lead is captured, answered, and followed up on.",
    capabilities: [
      "Website chat that answers common questions",
      "Smart intake and quote forms",
      "Automatic lead routing to your inbox or CRM",
      "Automated first-response follow-up",
      "Appointment and booking workflows",
      "Ongoing SEO content production",
    ],
  },
  {
    id: "care-plan",
    Icon: ShieldCheck,
    title: "Ongoing Care Plans",
    description:
      "Optional monthly maintenance so the site stays online, current, and secure without becoming another thing you have to manage.",
    capabilities: [
      "Hosting and domain management",
      "Software and security updates",
      "Regular backups",
      "Uptime monitoring",
      "Small content and photo changes",
      "Performance checks",
      "A direct contact when something breaks",
    ],
  },
];

export function WebsitesServicesSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="website-services"
      className="scroll-mt-24 bg-gradient-to-b from-neutral-950 to-amber-950/[0.06] py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            What We Build
          </p>
          <h2 className="heading-lg mb-6 text-white">
            From First Website to Fully Maintained.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Start with a build, rebuild what you already have, add the features
            that turn visitors into leads, and keep it maintained afterward.
            Every project is scoped to what the business actually needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {offerings.map(({ id, Icon, title, description, capabilities }) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] md:p-8"
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
                  aria-controls={`${id}-includes`}
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                >
                  {isOpen ? "Hide what's included" : "See what's included"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <ul
                  id={`${id}-includes`}
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

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-neutral-500">
          Care plans are optional and quoted separately from the build. You are
          never required to keep one to own or keep your site.
        </p>
      </div>
    </section>
  );
}
