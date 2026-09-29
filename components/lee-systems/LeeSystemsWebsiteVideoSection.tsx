import { WebsiteVideo } from "@/components/lee-systems/WebsiteVideo";

/**
 * The website video, straight under "Two paths" (the owner's ask,
 * 2026-09-29): the same visit to an outdated site and then to one built
 * right, narrated, in the same frame and style. The badge and heading follow
 * "Two paths" too; the heading is the video's closing line, as "Two paths.
 * Only one gets the customer." is that video's.
 */
export function LeeSystemsWebsiteVideoSection() {
  return (
    <section
      aria-labelledby="ls-website-video-title"
      className="relative isolate overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10 section-fade" aria-hidden="true">
        <div className="absolute left-1/2 top-[72%] h-[24rem] w-[40rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-400/[0.08] blur-3xl" />
      </div>

      <div className="section-container">
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center md:mb-10">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-4 text-xs font-semibold text-neutral-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:text-sm">
            <span className="rounded-full bg-brass-400/15 px-2.5 py-0.5 font-bold text-brass-200 ring-1 ring-inset ring-brass-400/30">
              Web
            </span>
            Built to turn visitors into customers
          </p>
          <h2 id="ls-website-video-title" className="heading-lg mt-5 text-balance text-white">
            Beautiful gets them to stay. Built right gets them to book.
          </h2>
        </div>

        <WebsiteVideo />
      </div>
    </section>
  );
}
