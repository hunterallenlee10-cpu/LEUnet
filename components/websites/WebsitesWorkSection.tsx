import { PlaceholderBox } from "@/components/lee-systems/PlaceholderBox";

/**
 * Portfolio. PLACEHOLDER until finished client sites exist to show. The slots
 * are deliberately visible as unfinished rather than filled with stand-in
 * screenshots, so nothing here implies work that has not been done. Replace
 * each box with a card linking to a live site (docs/LEE-SYSTEMS.md).
 */
const slots = [1, 2, 3, 4];

export function WebsitesWorkSection() {
  return (
    <section
      id="website-work"
      className="scroll-mt-24 border-y border-white/10 bg-neutral-950/60 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            Recent Work
          </p>
          <h2 className="heading-lg text-white">Sites we have built</h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {slots.map((slot) => (
            <li key={slot}>
              <PlaceholderBox label={`Portfolio site ${slot}`} className="aspect-[16/10]">
                Screenshot, business name, one line on what the site does, and a
                link to the live site.
              </PlaceholderBox>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
