import { LmmMarkDivider } from "@/components/lmm/LmmMark";

/**
 * The still beat after the doors, and the only place on the hub that speaks in
 * the first person.
 *
 * Deliberately short - two paragraphs and a three-item fact row. Everything a
 * visitor needs in order to *choose* is above this section; this is for the one
 * who has decided the offering is right and now wants to know who they would be
 * dealing with. That question deserves a straight answer, not a screen.
 *
 * Every sentence traces to something already on the site. The opening is
 * `data/ventures.ts`, which is the venture's own description rendered on the
 * homepage; the scope and reporting lines are its closing sentence, unchanged
 * in substance. Nothing here is a result, a count, a timeframe or a price,
 * because the site substantiates none of those - see the header comment on
 * `WebsitesOutcomeStrip` for the standing rule and what it cost to establish.
 *
 * NOTE ON `ventureValuesProps.lmm` in data/services.ts. It is the obvious
 * source for a "why choose us" block here and it is not used, because one of
 * its four entries claims measurable growth "from independent startups to
 * nine-figure enterprises". That is not substantiated anywhere in this repo.
 * The fix belongs in that file rather than here; what must not happen is the
 * claim being laundered onto a new page on its way to being fixed.
 */
const facts = [
  {
    title: "Scoped before it is built",
    detail:
      "What is included, and what is deliberately left out, is agreed in writing first.",
  },
  {
    title: "Quoted per project",
    detail:
      "Each offering is priced on its own. Nothing is packaged to make the total look smaller.",
  },
  {
    title: "Reported in plain language",
    detail:
      "What was done and what it did, written so it does not need translating.",
  },
];

export function HubCompanySection() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-16 md:py-24">
      <div className="section-container">
        <LmmMarkDivider className="mb-12" />

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Company
          </p>
          <h2 className="heading-lg mb-6 text-white">
            One Team for Work Most Owners Would Rather Not Manage.
          </h2>
          <p className="mb-5 text-lg leading-relaxed text-neutral-300">
            Lee Marketing Mastery is the marketing, websites and automation arm
            of Lee Enterprises Unlimited. The three offerings exist separately
            because they are genuinely different work - but they are run by the
            same people, which is why they are easier to scope together than to
            join up afterwards.
          </p>
          <p className="text-lg leading-relaxed text-neutral-300">
            Most owners come to us with one of the three. That is the normal way
            to start, and there is no discount for taking more than you need.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {facts.map(({ title, detail }) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <h3 className="mb-2 text-sm font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
