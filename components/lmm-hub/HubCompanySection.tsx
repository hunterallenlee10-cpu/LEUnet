import { LmmMarkDivider } from "@/components/lmm/LmmMark";

/**
 * The still beat after the doors, and the only place on the hub that speaks in
 * the first person.
 *
 * Deliberately short - one paragraph. Everything a visitor needs in order to
 * *choose* is above this section; this is for the one who has decided the
 * offering is right and now wants to know who they would be dealing with. That
 * question deserves a straight answer, not a screen.
 *
 * Every sentence traces to something already on the site. It is drawn from
 * `data/ventures.ts`, the venture's own description rendered on the homepage.
 * Nothing here is a result, a count, a timeframe or a price, because the site
 * substantiates none of those - see the header comment on
 * `WebsitesOutcomeStrip` for the standing rule and what it cost to establish.
 *
 * NOTE ON `ventureValuesProps.lmm` in data/services.ts. It is the obvious
 * source for a "why choose us" block here and it is not used, because one of
 * its four entries claims measurable growth "from independent startups to
 * nine-figure enterprises". That is not substantiated anywhere in this repo.
 * The fix belongs in that file rather than here; what must not happen is the
 * claim being laundered onto a new page on its way to being fixed.
 *
 * WHAT WAS CUT, AND WHY IT SHOULD STAY CUT. This section carried a three-fact
 * row (scoped / quoted / reported) and a second paragraph, and both were
 * removed because the hero footnote already says scope is agreed first and
 * quoted per project - the same idea was reaching the visitor several times
 * within one short page. The single paragraph that remains is the only thing
 * here said nowhere else on the hub: that the three offerings are run by the
 * same people, which is why they are easier to scope together than to join up
 * afterwards. Anything added back has to clear that bar.
 */
export function HubCompanySection() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-16 md:py-24">
      <div className="section-container">
        <LmmMarkDivider className="mb-12" />

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Company
          </p>
          {/* "Owners" and not "Most Owners". docs/WEBSITES.md §3.3 bans
              asserting how often anything happens, in the market or among our
              own clients, and "most owners" is a market statistic nobody here
              has measured. data/ventures.ts, which this section traces to,
              already has the right formulation: it describes the audience -
              "owners who would rather have the work done than manage it" -
              without counting it. */}
          <h2 className="heading-lg mb-6 text-white">
            One Team for the Work You Would Rather Not Manage.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Lee Marketing Mastery is the marketing, websites and automation arm
            of Lee Enterprises Unlimited. The three offerings exist separately
            because they are genuinely different work - but they are run by the
            same people, which is why they are easier to scope together than to
            join up afterwards.
          </p>
        </div>
      </div>
    </section>
  );
}
