import { Filter, Timer, LayoutGrid, Quote } from "lucide-react";

/**
 * This section replaces the old WebsitesAiSection, which explained how much of
 * the production work was automated and how much was human. That section only
 * existed to answer an objection the page itself created by advertising AI as a
 * production method - so both the claim and its defense were removed together.
 *
 * What sits here instead is the argument the rest of the page depends on: the
 * way customers find a local business changed, which is why a site that merely
 * describes the business stopped producing calls. AI appears here only as a
 * market condition the owner has already noticed - AI answers absorbing the
 * browsing - never as a description of how we work. Do not reintroduce it in
 * that second sense, and keep to one vocabulary: this page says "AI answers"
 * rather than "answer engines", which read as two different subjects.
 *
 * Three honesty constraints hold this section together:
 *
 * 1. Everything here is stated as reasoning about the market, never as a
 *    reading of this particular owner's analytics, which we have never seen.
 *    The intro asks whether he recognizes something; it does not tell him what
 *    his numbers say.
 * 2. No competitor count. An earlier draft had visitors cutting the list to
 *    "two or three" businesses - a number nobody measured. "Narrowed the list"
 *    carries the same point and is defensible.
 * 3. The "you get filtered fast" idea appears once, here, and is phrased as
 *    how people behave rather than as a measured interval. The hero and the
 *    outcome strip both used to assert it too; those were removed rather than
 *    this one, because this is the card that explains it.
 */
const shifts = [
  {
    Icon: Filter,
    title: "Fewer visitors, further along",
    detail:
      "Search results and AI answers handle the easy questions now, so much of the casual browsing never reaches you. The visit that used to start a search now comes near the end of one, after they have narrowed the list somewhere else. You are not being discovered anymore. You are being checked.",
  },
  {
    Icon: Timer,
    title: "You get filtered before you get read",
    detail:
      "A site that looks dated, loads slowly, or takes a paragraph to say what you do gets closed rather than studied. People decide whether a business looks legitimate before they read a word, and nobody comes back for a second look. It shows up as traffic all week without the phone ringing once.",
  },
  {
    Icon: LayoutGrid,
    title: "A page aimed at everyone lands on nobody",
    detail:
      "A homepage that lists eight services speaks to no one in particular. Someone who came for gutter cleaning wants a page about gutter cleaning - what it covers, the towns you serve, and a way to book it. A general page leaves them to find their own reason to stay, on a visit they were already prepared to end.",
  },
  {
    Icon: Quote,
    title: "Nothing specific, nothing to point at",
    detail:
      "People and AI answers both need something concrete to repeat. If your pages never state plainly what you do, where you do it, and what happens next, there is nothing to verify and nothing to quote back. That is a writing and structure problem, fixed on the page: clear claims in plain words, next to proof a visitor can check.",
  },
];

export function WebsitesShiftSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            What Changed
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Your Website Did Not Get Worse. The Traffic Got Harder.
          </h2>
          {/* Written as a question the owner answers for himself. The earlier
              version told him his visits were down and then insisted the cause
              was not coincidence - a diagnosis of analytics we have never
              opened, delivered with more certainty than the sentence after it
              could support. Recognition is also the stronger move with a
              skeptic: he either sees it in his own numbers or he does not, and
              either way we have not told him something false about his
              business. */}
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            Ask yourself whether any of this sounds familiar. The website still
            looks fine. The traffic is flatter than it used to be, or steady but
            quieter on the phone. Nothing broke - the site is just doing less
            than it once did.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            Four things changed about how a local business gets found and
            chosen. Each one raises what a website has to do.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {shifts.map(({ Icon, title, detail }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] md:p-8"
            >
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {detail}
              </p>
            </div>
          ))}
        </div>

        {/* The section has to land on what to do about it. Read without this
            closing note it scans as doom, which is the wrong feeling to hand a
            prospect two screens before the offer. */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-neutral-500">
          None of this calls for starting over. It calls for a site organized
          around the decision your visitor is already in the middle of making -
          which is what the rest of this page is about.
        </p>
      </div>
    </section>
  );
}
