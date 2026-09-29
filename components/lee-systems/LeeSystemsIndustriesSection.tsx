import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  industryInSentence,
  leeSystemsIndustries,
  moreIndustries,
  otherIndustriesLine,
} from "@/data/lee-systems";

/**
 * The names set over the pictures, where The Real World letters its campus
 * names by hand: Cormorant Garamond italic in brass, the serif the Business
 * Mastery hero already uses. Declared here so only this page fetches it, and
 * not preloaded, since the section sits well below the fold.
 */
const coverTitle = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "600",
  style: "italic",
  preload: false,
});

/** Law firms and home services first (they have pages), then the rest. */
const industries = [...leeSystemsIndustries, ...moreIndustries];

type IndustryId = (typeof industries)[number]["id"];

/**
 * The industries whose picture is in public/lee-systems/industries/, as
 * `<id>.webp`. All six were generated on 2026-09-29 and are waiting to be
 * pulled in ("Who we help pictures" in docs/TODO.md). A card whose id isn't
 * listed shows its cover's brass glow instead, the same glow every picture
 * loads over.
 */
const pictured: ReadonlySet<IndustryId> = new Set<IndustryId>([]);

/** The small uppercase links under each card, after The Real World's "Explore campus". */
const cardAction =
  "inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold tracking-[0.18em] text-brass-300 uppercase transition-colors hover:text-brass-200";

/**
 * "Who we help" on /lee-systems: example industries as picture-led cards,
 * after The Real World's campus cards (the owner's reference, 2026-09-29):
 * a picture with the industry's name set over it, its one-line summary, and
 * small uppercase links. The heading frames them as examples, not the only
 * businesses served (the owner's request, 2026-09-29); other industries get
 * one line rather than cards with nothing specific to say.
 *
 * Each industry's examples stay on its card behind "See examples", a native
 * <details> (so no client JS), and the shared `name` keeps one open at a
 * time. Cards align to the top of their row, so opening one doesn't stretch
 * the others; from two columns up every summary is held to three lines'
 * height (none is longer), so closed cards match.
 * The two industries with a page of their own link to it. Each card keeps its
 * industry's id, so /lee-systems#real-estate still lands on it.
 *
 * The pictures (public/lee-systems/industries/, 800 x 450 WebP) were
 * generated for this section: empty rooms and buildings, no people, no
 * signage, nothing that stands for a client or a result. They are decorative
 * (empty alt), since the name is set over each one as text. Under each
 * picture is a brass glow, its position stepped card to card, which is what
 * shows while a picture loads or before it is listed in `pictured`.
 */
export function LeeSystemsIndustriesSection() {
  return (
    <section id="industries" className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            Who we help
          </p>
          <h2 className="heading-lg text-white">
            For example, we help businesses like these
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const { id, name, summary, examples } = industry;
            const page = "page" in industry ? industry.page : null;
            const audience = industryInSentence(name);
            return (
              <div
                key={id}
                id={id}
                className="group/card overflow-hidden rounded-xl border border-white/10 bg-[#141414] transition-colors duration-300 hover:border-brass-400/40"
              >
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{
                    backgroundImage: `radial-gradient(60% 85% at ${22 + i * 11}% 30%, rgb(212 168 87 / 0.2), transparent 70%)`,
                  }}
                >
                  {pictured.has(id) && (
                    <Image
                      src={`/lee-systems/industries/${id}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 23rem, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/card:scale-[1.04]"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/25 to-transparent"
                  />
                  <h3
                    className={`${coverTitle.className} absolute inset-x-6 bottom-1 text-[2.5rem] leading-[1.05] text-brass-200 [text-shadow:0_2px_16px_rgb(0_0_0/0.85)]`}
                  >
                    {name}
                  </h3>
                </div>

                <div className="bg-[radial-gradient(90%_80%_at_0%_100%,rgba(212,168,87,0.08),transparent_70%)] px-6 pt-3 pb-3">
                  <p className="leading-relaxed text-neutral-300 md:min-h-[3lh]">
                    {summary}
                  </p>

                  <div className="@container relative mt-2">
                    <details name="industry-examples" className="group/examples">
                      <summary
                        className={`${cardAction} w-fit cursor-pointer list-none rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-300 [&::-webkit-details-marker]:hidden`}
                      >
                        <span className="group-open/examples:hidden">See examples</span>
                        <span className="hidden group-open/examples:inline">
                          Hide examples
                        </span>
                        <span className="sr-only"> for {audience}</span>
                        <ChevronDown
                          className="h-3.5 w-3.5 transition-transform duration-200 group-open/examples:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>

                      <ul className="mt-1 mb-3 space-y-2.5 border-t border-white/10 pt-4">
                        {examples.map((example) => (
                          <li
                            key={example}
                            className="flex items-start gap-2.5 text-sm text-neutral-400"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass-400"
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </details>

                    {/* Level with the toggle, whether or not its list is open,
                        once the card is wide enough for both (18.5rem: the
                        widest label, "Hide examples", plus this link and a
                        gap). Narrower, it takes the line below the toggle. */}
                    {page && (
                      <Link
                        href={page.href}
                        className={`${cardAction} group/link @min-[18.5rem]:absolute @min-[18.5rem]:top-0 @min-[18.5rem]:right-0`}
                      >
                        See the page
                        <span className="sr-only"> for {audience}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-neutral-300">
          {otherIndustriesLine}
        </p>
      </div>
    </section>
  );
}
