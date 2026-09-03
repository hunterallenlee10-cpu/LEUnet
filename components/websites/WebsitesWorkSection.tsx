import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { websitePortfolio } from "@/data/websites";

/**
 * This is the strongest asset on the page, so it has to sell the same thing the
 * rest of the page sells - and it has to describe itself accurately, because a
 * prospect can click straight through and check.
 *
 * "On This Domain" in the heading is load-bearing: every entry is a route on
 * this one deployment, two of them this very site, and an earlier heading -
 * "Four Sites You Can Open Right Now" - read as four separate websites built
 * for four separate businesses. That was a bigger claim than the truth,
 * checkable in one click, which is the worst possible combination. ("This way",
 * before that, pointed at a production method the page no longer sells -
 * docs/WEBSITES.md §3.1.)
 *
 * "On This Domain" came out for two days: H1 Performance became a separate
 * site on its own domain on 2026-09-01, which made the phrase exclude an entry
 * the list still showed, and the heading read "Every Site We Run" instead. H1
 * came off this site entirely on 2026-09-03 (docs/H1.md), the list is three
 * routes on this one deployment again, and the qualifier is back because it is
 * true again and because it is the sentence that stops "three sites" being read
 * as three separate builds for three separate businesses. Do not let the copy
 * drift back toward "three sites we built for three businesses", and if an
 * entry ever moves off this domain again, the qualifier comes out with it.
 *
 * The "our own ventures, not client projects" line in the lead paragraph is a
 * deliberate honesty decision recorded in docs/WEBSITES.md §3. It stays in the
 * first sentence, unsoftened. It is also not a weakness to apologize for - a
 * prospect can open these and use them, which a testimonial does not allow. If
 * real client sites ever replace `websitePortfolio`, that caveat comes out with
 * them and not before.
 */
export function WebsitesWorkSection() {
  return (
    <section
      id="website-work"
      className="scroll-mt-24 border-y border-white/10 bg-neutral-950/60 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Three Live Sites, All Ours
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Every Site on This Domain Was Built to Turn a Visitor Into a
            Customer.
          </h2>
          {/* Says out loud what the reader would work out anyway after two
              clicks: these are not three separate builds for three separate
              clients. All three live here, and two of them are the site being
              read right now. Conceding that costs nothing and buys the rest of
              the section, because a prospect who catches you inflating one
              claim stops believing the ones you did not inflate. */}
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            These are Lee Enterprises Unlimited&apos;s own ventures, not client
            projects. All three run on this one domain, and two of them are the
            site you are reading - the home page above, and the Lee Marketing
            Mastery hub this page belongs to. We would rather point you at
            businesses we actually run than at a screenshot of someone
            else&apos;s work.
          </p>
          {/* The instruction matters more than the list. A prospect who runs
              this test once has verified the promise themselves, which is worth
              more than any claim we could print - and it is the only kind of
              proof available to us, since there are no clients, results or
              testimonials to cite. */}
          <p className="mb-4 text-lg leading-relaxed text-neutral-400">
            Open one on your phone. See how long it takes to work out what the
            business does, and whether the next step is obvious. Then send the
            form. That is the same test your customers run on your site, except
            they only run it once.
          </p>
          {/* The page argues for a page per offer in the outcome strip, the
              Shift section and the FAQ, and this is the one place that argument
              can be demonstrated rather than asserted: Lee Marketing Mastery
              really does have its own page for websites, marketing, and
              automation, and this is one of them. It is the closest thing on
              the page to a live demo, so it gets named here instead of being
              left for the reader to notice.

              This is the most checkable sentence in the section, one click from
              being disproved, so the count has to be right. It named two pages
              for a while - back when the hub route was itself the automation
              page and carried that offering inline, which made "a page for each
              thing it sells" overshoot what the reader found. Automation now
              has its own route, so three is what they find. Keep this in step
              with the LMM entry's summary in data/websites.ts, which the reader
              sees on the same screen.

              Two of the three portfolio entries are still single long pages, so
              this points at that one entry specifically; do not widen it to the
              portfolio as a whole unless the others gain sub-pages. */}
          <p className="text-lg leading-relaxed text-neutral-400">
            And if you would rather see a page per offer than read about one,
            open Lee Marketing Mastery: a hub about the business, plus its own
            page for websites, marketing, and automation. This page is one of
            them.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {websitePortfolio.map(({ name, href, summary, highlights }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:p-8"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-amber-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>

                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {summary}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-neutral-400"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
