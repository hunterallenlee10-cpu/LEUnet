import { AutomationFlowDemo } from "@/components/lee-systems/AutomationFlowDemo";
import { WebsiteBuildDemo } from "@/components/lee-systems/WebsiteBuildDemo";
import { leeSystemsAnchors } from "@/data/lee-systems";
import { site, telHref } from "@/data/site";

/**
 * The two animated examples on /lee-systems, side by side straight under
 * "What we do" (the owner's ask, 2026-09-30): the automation run on the left
 * and the website build on the right, the same sides as the two offerings
 * above them, so each sits under the half it shows. Below `lg` they stack,
 * automation first.
 *
 * Each used to sit beside the text of its own section, "What we automate"
 * and "Website builds", and both texts came off at the owner's request the
 * same day. The offerings above and the FAQ say in words what the systems
 * and the sites do. Each demo keeps its section's id, so #automation and
 * #websites (and the old URLs that redirect to them) land on it; side by
 * side, the two land at the same spot. `scroll-mt-8` leaves a little room
 * between it and the header.
 *
 * Swapping the two, or moving one out, is moving its column; the demos
 * themselves take nothing from here.
 *
 * The call-answering demo line moved here from the heading of What we
 * automate, under its demo. It shows only once `site.callAnswering.demoPhone`
 * is set.
 */
export function LeeSystemsExamplesSection() {
  return (
    <section className="relative isolate pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12">
          <div id={leeSystemsAnchors.automation} className="scroll-mt-8">
            <AutomationFlowDemo />

            {site.callAnswering.demoPhone && (
              <p className="mt-6 text-center text-sm font-semibold text-neutral-200">
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

          <div id={leeSystemsAnchors.websites} className="scroll-mt-8">
            <WebsiteBuildDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
