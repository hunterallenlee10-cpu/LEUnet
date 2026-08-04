"use client";

import { useState } from "react";
import {
  Globe,
  RefreshCw,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

/**
 * Every card leads with what the buyer ends up with, and lets the expandable
 * capability list carry the deliverables. The earlier version led with the thing
 * being handed over - "a complete site", "a rebuild" - which reads as a quote for
 * labor and puts us next to anyone else selling pages.
 *
 * The third card was titled "AI Features Built In", which sold the tool rather
 * than the result and dragged the page back onto the ground we deliberately left:
 * how a site gets produced. The capabilities themselves stay, because chat,
 * intake, routing and follow-up are things the finished site does for the
 * visitor's own customers - that is the outcome being purchased, and naming AI
 * inside those lines is accurate. Do not retitle it back toward the technology.
 *
 * That card's description used to narrate the 11pm question getting answered as
 * something that already happens. It does not: docs/WEBSITES.md section 7 still
 * lists chat, booking, CRM routing and automated first response as unconfirmed,
 * and no build has shipped with them. The offering stays - what is sold here is
 * the owner's call - but the description now reads as what a build can include
 * and is quoted like every other line on this page. Do not restore the scenario
 * as fact. For the same reason the last capability lost "so the pages keep
 * earning visits": what gets written and published is ours to deliver, where it
 * ranks is not.
 *
 * "Mobile and tablet layouts" and "Rebuilt to load fast and read clearly on a
 * phone" were removed from the first two lists for the reason the outcome strip
 * dropped "Works on Every Screen": a phone layout is the floor in 2026, and
 * billing the floor as a line item advertises a low bar. Both still get built.
 * What replaced them is a decision the buyer is actually making.
 *
 * The new-build description also lost "read in a few seconds". The page asserted
 * a seconds-long attention span in several places and nobody here has measured
 * one; the point survives as "understand without hunting", which describes the
 * writing rather than timing a stranger.
 *
 * Measurement is promised further up the page but appeared in none of these
 * lists, so a buyer could not tell what they were buying. It is a deliverable
 * now, worded to exactly what the code does: Vercel Analytics in app/layout.tsx
 * reports pageviews and landing pages, and the API routes email every
 * submission on submit. There is no form-fill event tracking and no call
 * tracking anywhere in this repo - neither may be implied here.
 *
 * The per-service and campaign page capabilities are not filler. A homepage
 * listing eight services is aimed at nobody, and the section above this one
 * already makes that argument - these lines are where it becomes something the
 * buyer can actually order.
 */
const offerings = [
  {
    id: "new-build",
    Icon: Globe,
    title: "New Website Builds",
    description:
      "For a business running on a social page and a phone number. You end up with a site a stranger can find, understand without hunting, and act on - organized around the work you actually want more of.",
    capabilities: [
      "A focused page for each service you sell",
      "Campaign landing pages for ads and promotions",
      "Page copy that leads with the outcome, for your review",
      "Custom layout and design direction",
      "Imagery produced for your business",
      "Contact and quote forms that reach your inbox",
      "The one next step each page asks a visitor to take, chosen with you",
      "Traffic tracking from launch - how many people arrive, and where they land",
      "Domain and launch setup",
    ],
  },
  {
    id: "redesign",
    Icon: RefreshCw,
    title: "Website Redesigns",
    description:
      "For a site that still gets visits and stops people cold - slow on a phone, dated in a way visitors notice first, or vague about what you do. You keep what earns traffic and lose what loses the visitor.",
    capabilities: [
      "Review of where the current site loses people",
      "Content kept, rewritten, or replaced",
      "A decision on what carries over from the current site and what gets retired",
      "Split into a page per service where it helps",
      "Clearer structure and one obvious next step",
      "Existing URLs preserved where possible",
      "Traffic tracking in place at relaunch, and enquiries emailed to you as they arrive",
      "Migration from the old host",
    ],
  },
  {
    // Renamed from "ai-features" so the id matches what the card sells. It is
    // only the useState key and the aria-controls target - nothing outside this
    // file references it, checked before the rename.
    id: "lead-capture",
    Icon: MessageSquare,
    title: "Never Miss a Lead",
    description:
      "A question asked at 11pm is still a customer, and an unanswered one has somewhere else to go. These are the pieces a build can include so the site keeps working the hours you cannot - each scoped and quoted with the project rather than assumed.",
    capabilities: [
      "AI chat that answers common questions at any hour",
      "Intake and quote forms that ask the right follow-up",
      "Automatic lead routing to your inbox, phone, or CRM",
      "An automated first response so nobody waits overnight",
      "Appointment and booking workflows",
      "Ongoing pages and posts written and published on a set schedule",
    ],
  },
  {
    id: "care-plan",
    Icon: ShieldCheck,
    title: "Ongoing Care Plans",
    description:
      "A site that is down, out of date, or quietly broken on a phone costs you the same customers a bad one does. Optional monthly care keeps it online and current without becoming another thing you have to manage.",
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
          {/* The old heading, "From First Website to Fully Maintained", walked
              the buyer through our service ladder. This one restates the job the
              hero opened with, so all four cards read as different routes to the
              same result rather than four things to shop for. */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            What You Get
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Built to Be Chosen. Kept That Way.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            First site or third version of one, the job does not change. A
            visitor lands, understands what you do, and has one obvious way to
            start. These are the four ways we get you there, and every project is
            scoped to what the business actually needs.
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
