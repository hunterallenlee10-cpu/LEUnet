type Offering = {
  role: string;
  title: string;
  body: string;
  points: string[];
};

/**
 * Both halves carry the same weight on purpose (the owner's call,
 * 2026-09-29): six points each. The outlined "01" and "02" over them came off
 * at the owner's request the same day, and the button under each ("Explore
 * automation", "See website builds"), which scrolled to its section, came
 * off on 2026-09-30, also at the owner's request: the spine now carries on
 * down into the two animated examples under it and opens them (ExamplesSeam).
 * The website points are the ones the FAQ already promises, so nothing here
 * says more than it does. With the examples' own text gone (2026-09-30),
 * these halves are where the page says in words what each one shows.
 */
const offerings: [Offering, Offering] = [
  {
    role: "The system",
    title: "Business automation",
    body: "Custom systems built to streamline revenue into your business.",
    points: [
      "Answers your business calls 24/7 with an AI assistant",
      "Answers every new lead in under a minute",
      "Handles intake, booking and reminders",
      "Follows up until the customer gives an answer",
      "Requests reviews and chases invoices for you",
      "Updates you & your systems automatically",
    ],
  },
  {
    role: "The storefront",
    title: "Website builds",
    body: "Conversion-focused websites for businesses, built to turn visitors into customers.",
    points: [
      "Mobile-first and fast on any phone",
      "Lead forms that turn visitors into customers",
      "Basic SEO so local customers can find you",
      "We draft the copy, you approve it",
      "You own your domain and your content",
      "Optional care plan for hosting and updates",
    ],
  },
];

/**
 * "What we do" as a two-page spread rather than two cards: the offerings sit
 * open on the section, mirrored about a brass spine (right-aligned on the left,
 * left-aligned on the right), with a packet travelling down it, the page's
 * diagram vocabulary, so this reads as part of the same network as the
 * automation diagrams rather than a new trick. On a phone the halves stack,
 * left-aligned, with the node between them.
 *
 * Under the halves the spine carries on to the bottom of the section, where
 * the two animated examples take it over: side by side, automation under the
 * left half and the website under the right, they arrive closed on the line
 * and split open from it as they scroll up (ExamplesSeam around
 * LeeSystemsExamplesSection, which the page places straight after this). Until 2026-09-30 the line ran instead into two dashed
 * routes that curved together into a node under the halves' buttons; the
 * owner asked for a different way into the examples, and the buttons and
 * that join came off.
 */
export function LeeSystemsOfferingsSection() {
  const [automation, websites] = offerings;

  return (
    <section className="relative isolate overflow-hidden pt-20 md:pt-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className="mb-3 text-sm font-semibold text-brass-300">What we do</p>
          <h2 className="heading-lg text-white">Two ways we take work off your plate</h2>
        </div>

        <div className="relative grid grid-cols-1 gap-y-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-16">
          <OfferingHalf offering={automation} side="left" />

          <div className="relative flex items-center justify-center lg:w-px" aria-hidden="true">
            {/* Phone and tablet: a short rule with the node on it. */}
            <div className="flex w-full items-center gap-4 lg:hidden">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brass-400/40" />
              <SpineNode />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brass-400/40" />
            </div>

            {/* Desktop: the spine, full height, with a packet running down it. */}
            <div className="absolute inset-y-0 left-0 hidden w-px overflow-hidden lg:block">
              <span className="absolute inset-0 bg-gradient-to-b from-transparent via-brass-400/45 to-brass-400/70" />
              <span className="ls-spine-track absolute inset-0">
                <span className="absolute bottom-0 left-1/2 h-16 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent to-brass-200 shadow-[0_0_12px_rgba(226,170,72,0.8)]" />
              </span>
            </div>
            {/* Level with the halves' first line, the uppercase role. */}
            <div className="absolute top-0 left-1/2 hidden -translate-x-1/2 lg:block">
              <SpineNode />
            </div>
          </div>

          <OfferingHalf offering={websites} side="right" />
        </div>

        {/* The spine, carried on to the section's foot, where the first
            example picks it up closed. On desktop it leaves the spread's
            spine without a break; on a phone it starts a little under the
            last list. Its height is the gap the section used to leave as
            bottom padding, and where the seam isn't drawn (reduced motion,
            no scripting) it keeps that gap but hides (`ls-seam-lead`). */}
        <span
          aria-hidden="true"
          className="ls-seam-lead mx-auto mt-10 block h-20 w-px bg-gradient-to-b from-brass-400/30 to-brass-400/70 md:h-28 lg:mt-0 lg:from-brass-400/70"
        />
      </div>
    </section>
  );
}

function OfferingHalf({
  offering,
  side,
}: {
  offering: Offering;
  side: "left" | "right";
}) {
  const mirrored = side === "left";

  return (
    <div
      className={
        mirrored
          ? "flex flex-col lg:items-end lg:text-right"
          : "flex flex-col lg:items-start lg:text-left"
      }
    >
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-brass-300 uppercase">
        {offering.role}
      </p>
      <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">{offering.title}</h3>
      <p className="mb-8 max-w-md text-lg leading-relaxed text-neutral-300">{offering.body}</p>

      <ul className="w-full max-w-md border-b border-white/10">
        {offering.points.map((point) => (
          <li
            key={point}
            className={
              mirrored
                ? "flex items-start gap-3 border-t border-white/10 py-3 text-neutral-200 lg:flex-row-reverse"
                : "flex items-start gap-3 border-t border-white/10 py-3 text-neutral-200"
            }
          >
            <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-brass-400" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpineNode() {
  return (
    <span className="relative flex h-4 w-4 items-center justify-center">
      <span className="ls-status absolute inset-0 rounded-full border border-brass-300/60" />
      <span className="h-2 w-2 rounded-full bg-brass-300 shadow-[0_0_10px_rgba(226,170,72,0.9)]" />
    </span>
  );
}
