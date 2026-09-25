"use client";

import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { AutomationFlowVisual } from "@/components/automation/AutomationFlowVisual";
import { LeeSystemsMark } from "@/components/lee-systems/LeeSystemsMark";
import { LeeSystemsSiblingLinks } from "@/components/lee-systems/LeeSystemsSiblingLinks";
import {
  automationAudit,
  leeSystemsAnchors,
  leeSystemsRoutes,
} from "@/data/lee-systems";

/**
 * The eyebrow names the offering and the footnote names the company - the
 * same rule the websites hero follows, so each page says what it is before it
 * says whose it is.
 */
export function AutomationHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-950 to-brass-950/20 py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-brass-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-slate-400/5 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <LeeSystemsMark size="md" />
              <div className="inline-flex items-center gap-2 rounded-full border border-brass-400/30 bg-brass-400/10 px-4 py-2">
                <Workflow className="h-4 w-4 text-brass-300" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide text-brass-300">
                  BUSINESS AUTOMATION
                </span>
              </div>
            </div>

            <h1 className="heading-xl mb-6 text-white">
              Every lead answered. Every follow-up sent.{" "}
              <span className="text-brass-300">Nothing missed.</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              We build custom systems that answer new leads in seconds, handle
              intake, send follow-ups, request reviews and clear out the admin
              that eats your week. You keep running the work. The system keeps
              everything else moving.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  smoothScrollToElement(leeSystemsAnchors.auditForm, { focus: true })
                }
                className="btn-ls-primary group inline-flex items-center justify-center gap-2"
              >
                Book a {automationAudit.price} {automationAudit.name}
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => smoothScrollToElement("automation-services")}
                className="btn-ls-secondary inline-flex items-center justify-center gap-2"
              >
                See What We Automate
              </button>
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              Built mostly with n8n and AI, connected to the tools you already
              use.{" "}
              <Link
                href={leeSystemsRoutes.home}
                className="font-semibold text-neutral-300 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
              >
                Part of Lee Systems Co.
              </Link>
            </p>
          </div>

          <div>
            <LeeSystemsSiblingLinks current={leeSystemsRoutes.automation} />

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  Example: a new lead
                </p>
                <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <span className="ls-status h-1.5 w-1.5 rounded-full bg-brass-400" />
                  Running
                </span>
              </div>
              <AutomationFlowVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
