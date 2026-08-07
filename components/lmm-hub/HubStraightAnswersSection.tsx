import { Ban, Layers, LineChart, ShieldCheck } from "lucide-react";

/**
 * What we will not sell you.
 *
 * This section is the reason the hub is worth visiting rather than skipping,
 * and it is the only content on the page that exists nowhere else on the site.
 * Everything above says what the three offerings are; a visitor can get that
 * from the nav. This says how the business behaves, which they cannot.
 *
 * IT IS ALSO THE CHEAPEST HONEST DIFFERENTIATOR AVAILABLE. The usual ones are
 * closed off: there are no client results, no testimonials, no ratings, no
 * years-in-business and no headcount anywhere in this repo, and inventing any
 * of them is the one thing the house rules forbid outright. What is left is
 * conduct - and every one of the four below is a position the codebase already
 * took and documented, not a promise written for this page:
 *
 *   1. Quoted separately  - the marketing page sells by channel rather than as
 *      a bundle; each deep page explains the inputs its own quote is built from.
 *   2. The floor is not a feature - see the header comment on
 *      `WebsitesOutcomeStrip`, which records why "works on every screen" and
 *      "loads fast" were removed as selling points. They still get built.
 *   3. Measurement limits stated - the same comment, and docs/WEBSITES.md §3.2:
 *      what exists is pageview analytics and an email per enquiry. There is no
 *      form-fill event tracking and no call tracking anywhere in this codebase,
 *      so neither is ever implied.
 *   4. No borrowed proof - `WebsitesWorkSection` shows five live routes and
 *      says in its first sentence that they are our own ventures, not client
 *      projects. That caveat travels with the claim wherever it goes.
 *
 * So this section is not new claims. It is four existing refusals collected in
 * one place, where a visitor deciding whether to make contact can actually read
 * them. If a fifth is ever added, it has to clear the same bar: a position the
 * site already holds and can be checked against, not a virtue.
 */
const answers = [
  {
    Icon: Layers,
    title: "We quote each thing separately.",
    detail:
      "Marketing, a website and automation are three quotes, not a package with a number on the front. Take one. If a second one makes sense later, it will still make sense later.",
  },
  {
    Icon: Ban,
    title: "We do not sell you the floor.",
    detail:
      "A site that works on a phone and loads quickly is not a feature in 2026, it is the starting point. You get both. You will not find either one listed as a reason to hire us.",
  },
  {
    Icon: LineChart,
    /**
     * The detail has to agree with the marketing page's own FAQ, which says
     * traditional channels are attributed "using trackable phone numbers,
     * dedicated landing pages, or offer codes where it makes sense". An earlier
     * version of this card said flatly "we do not run call tracking, so we will
     * not tell you which advert produced a phone call - nobody can, without
     * it". Both halves were wrong: a trackable number is call tracking and it
     * is on the menu, and offer codes falsify the "nobody can" absolute. It now
     * says the same thing the FAQ says - the measurement has to be built in
     * before the fact, and where it was not, the channel is reported as
     * unmeasurable rather than guessed at.
     */
    title: "We tell you what we cannot measure.",
    detail:
      "You get traffic figures and every enquiry emailed to you as it arrives. A phone call does not report on itself: unless a trackable number or an offer code went on the advert first, no one can tell you which one produced it - and we will say a channel is unmeasurable rather than invent a number for it.",
  },
  {
    Icon: ShieldCheck,
    /**
     * Scoped to what is true everywhere on the site. It read "There are no
     * invented case studies here and no stock testimonials", which the homepage
     * contradicts one click away: `ventureValuesProps.lmm` in data/services.ts
     * still claims measurable growth "from independent startups to nine-figure
     * enterprises", and that is rendered on the homepage LMM card. A card about
     * not borrowing proof cannot be the thing that gets caught borrowing it.
     * The claim now covers this page and the portfolio, both of which hold.
     * Widen it back out only once that services.ts entry is rewritten.
     */
    title: "We do not borrow proof.",
    detail:
      "No stock testimonials, and no case study on this page you cannot open yourself. What we point at is live work on this domain - our own ventures, not client projects - and we say which it is every time we show it.",
  },
];

export function HubStraightAnswersSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Straight Answers
          </p>
          <h2 className="heading-lg mb-6 text-white">
            What We Will Not Sell You.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Four things worth knowing before you spend twenty minutes on a call.
            They are the same four whichever of the three you came for.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {answers.map(({ Icon, title, detail }) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8"
            >
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
