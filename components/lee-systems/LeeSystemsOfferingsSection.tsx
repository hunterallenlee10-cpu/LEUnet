import { leeSystemsAnchors } from "@/data/lee-systems";

type Offering = {
  number: string;
  role: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
};

/**
 * Both halves carry the same weight on purpose (the owner's call,
 * 2026-09-29): same numeral, same length of copy, six points each, and the
 * same button, which scrolls to that offering's section further down the
 * page. The website points are the ones the websites section and the FAQ
 * already promise, so nothing here says more than they do.
 */
const offerings: [Offering, Offering] = [
  {
    number: "01",
    role: "The system",
    title: "Business automation",
    body: "Custom systems, built mostly with n8n and AI, that run the repetitive parts of your business the same way every time.",
    points: [
      "Answers your business calls 24/7 with an AI assistant",
      "Answers every new lead in under a minute",
      "Handles intake, booking and reminders",
      "Follows up until the customer gives an answer",
      "Requests reviews and chases invoices for you",
      "Updates your CRM automatically",
    ],
    href: `#${leeSystemsAnchors.automation}`,
    cta: "Explore automation",
  },
  {
    number: "02",
    role: "The storefront",
    title: "Website builds",
    body: "Conversion-focused websites for small businesses: clear, fast on a phone, and built to turn visitors into inquiries.",
    points: [
      "Mobile-first and fast on any phone",
      "Lead forms that turn visitors into inquiries",
      "Basic SEO so local customers can find you",
      "We draft the copy, you approve it",
      "You own your domain and your content",
      "Optional care plan for hosting and updates",
    ],
    href: `#${leeSystemsAnchors.websites}`,
    cta: "See website builds",
  },
];

/**
 * "What we do" as a two-page spread rather than two cards: the offerings sit
 * open on the section, mirrored about a brass spine (right-aligned on the left,
 * left-aligned on the right), and the spine runs down into the node where the
 * two join, since a site's leads are what the automation answers. The spine
 * and the merge borrow Signal Routes' vocabulary, a drifting dash and a
 * travelling packet, so this reads as part of the hero's network rather than a
 * new trick. On a phone the halves stack, left-aligned, with the node between
 * them and the join below.
 */
export function LeeSystemsOfferingsSection() {
  const [automation, websites] = offerings;

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
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
            <div className="absolute top-2 left-1/2 hidden -translate-x-1/2 lg:block">
              <SpineNode />
            </div>
          </div>

          <OfferingHalf offering={websites} side="right" />
        </div>

        <Join />
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
      <p
        aria-hidden="true"
        className="mb-2 font-bold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(212,168,87,0.55)] text-7xl md:text-8xl"
      >
        {offering.number}
      </p>
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-brass-300 uppercase">
        {offering.role}
      </p>
      <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">{offering.title}</h3>
      <p className="mb-8 max-w-md text-lg leading-relaxed text-neutral-300">{offering.body}</p>

      <ul className="mb-10 w-full max-w-md border-b border-white/10">
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

      <a
        href={offering.href}
        className="btn-ls-secondary inline-flex h-12 w-full max-w-xs items-center justify-center px-4 text-center sm:w-56"
      >
        {offering.cta}
      </a>
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

/**
 * Where the halves meet. On desktop two routes leave the bottom of each half
 * and curve into one node under the spine. The SVG is 22rem wide so its ends
 * sit under the two buttons: each is 14rem wide against the 4rem gap either
 * side of the spine, putting its centre 11rem out. `non-scaling-stroke`
 * keeps the lines a hairline across the stretched viewBox. The "Better
 * together" line under the node came off at the owner's request (2026-09-29),
 * and with it the phone layout, where only the node was left.
 */
function Join() {
  return (
    <div className="mt-4 hidden flex-col items-center lg:flex">
      <svg
        className="h-24 w-[22rem]"
        viewBox="0 0 100 96"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {["M1 0 C1 60, 50 36, 50 96", "M99 0 C99 60, 50 36, 50 96"].map((d) => (
          <g key={d}>
            <path d={d} stroke="rgba(212,168,87,0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d={d} className="ls-dash" stroke="rgba(235,211,160,0.7)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>

      <SpineNode />
    </div>
  );
}
