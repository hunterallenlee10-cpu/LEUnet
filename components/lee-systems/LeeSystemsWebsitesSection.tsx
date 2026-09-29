import { WebsiteBuildDemo } from "@/components/lee-systems/WebsiteBuildDemo";
import { leeSystemsAnchors } from "@/data/lee-systems";

/**
 * Websites on /lee-systems (#websites), where every "See website builds" and
 * "Website builds" link lands. It was "Included in every site" on
 * /lee-systems/websites until that page folded into this one (2026-09-29),
 * and that page's hero visual, WebsiteBuildDemo, now sits beside its heading:
 * on the left from `lg`, after the heading below that.
 *
 * Its six "included" cards and the add-ons note under them came off at the
 * owner's request the same day, so the label names the offering instead of
 * introducing a list. The offering above and the FAQ still say what a build
 * includes and what is quoted separately.
 */
export function LeeSystemsWebsitesSection() {
  return (
    <section
      id={leeSystemsAnchors.websites}
      className="relative isolate py-20 md:py-28"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="max-w-2xl lg:order-2">
            <p className="mb-3 text-sm font-semibold text-brass-300">
              Website builds
            </p>
            <h2 className="heading-lg mb-6 text-white">
              The basics, done properly, every time
            </h2>
            <p className="text-lg leading-relaxed text-neutral-300">
              New build or redesign, one page or twenty, every site is built to
              turn visitors into customers.
            </p>
          </div>

          <WebsiteBuildDemo className="lg:order-1" />
        </div>
      </div>
    </section>
  );
}
