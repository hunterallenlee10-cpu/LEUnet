import { AutomationFlowDemo } from "@/components/lee-systems/AutomationFlowDemo";
import { leeSystemsAnchors } from "@/data/lee-systems";
import { site, telHref } from "@/data/site";

/**
 * "What we automate" on /lee-systems (#automation), where every "See what we
 * automate" and "Business automation" link lands. It was the core of
 * /lee-systems/automation until that page folded into this one (2026-09-29),
 * and that page's hero diagram, AutomationFlowDemo, now sits beside its
 * heading.
 *
 * Its seven area cards (AI call answering first, full width) came off at the
 * owner's request the same day, so the heading is that page's old headline
 * rather than one introducing a list. The two offerings above and the FAQ
 * still say what the systems do.
 *
 * The call-answering demo line moved here from the AI call answering card.
 * It shows only once `site.callAnswering.demoPhone` is set.
 */
export function LeeSystemsAutomationSection() {
  return (
    <section
      id={leeSystemsAnchors.automation}
      className="relative isolate py-20 md:py-28"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold text-brass-300">
              What we automate
            </p>
            <h2 className="heading-lg mb-6 text-white">
              Every lead answered. Every{" "}
              <span className="whitespace-nowrap">follow-up</span> sent.
              Nothing missed.
            </h2>
            <p className="text-lg leading-relaxed text-neutral-300">
              Every system is built around how your business already works, not
              forced into a template.
            </p>

            {site.callAnswering.demoPhone && (
              <p className="mt-6 text-sm font-semibold text-neutral-200">
                Call{" "}
                <a
                  href={telHref(site.callAnswering.demoPhone)}
                  className="text-brass-300 underline underline-offset-4"
                >
                  {site.callAnswering.demoPhone}
                </a>{" "}
                to hear our AI assistant answer.
              </p>
            )}
          </div>

          <AutomationFlowDemo />
        </div>
      </div>
    </section>
  );
}
