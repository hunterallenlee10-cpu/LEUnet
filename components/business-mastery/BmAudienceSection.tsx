import { bmAudienceHeading, bmAudiences } from "@/data/business-mastery";

/** Section 3 — the four kinds of people the program is built for.
 *
 * Hover treatment is plain Tailwind. It was never the H1 page's `.h1-live`
 * vocabulary: that class drew its ring from a `--h1c-gold` property only the
 * H1 page set, so here it computed to no ring at all - and the vocabulary has
 * since left with that page for the H1 Performance repo (docs/H1.md). */
export function BmAudienceSection() {
  return (
    <section className="bg-neutral-950 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Who This Is For
          </p>
          <h2 className="heading-lg text-white">{bmAudienceHeading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bmAudiences.map((audience) => (
            <div
              key={audience.id}
              className="glass-card rounded-xl p-6 transition-colors duration-300 hover:border-amber-400/30 md:p-7"
            >
              <div className="mb-5 h-1 w-10 rounded-full bg-amber-400" />
              <h3 className="mb-3 text-lg font-bold text-white">
                {audience.title}
              </h3>
              <p className="leading-relaxed text-neutral-300">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
