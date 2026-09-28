import { site } from "@/data/site";
import { FounderPhoto } from "@/components/shared/FounderPhoto";

/**
 * Homepage: who a visitor will actually be dealing with. The photo and the
 * bio come from data/site.ts; while either is empty it shows a "coming soon"
 * note (or nothing, once `site.showPlaceholders` is false), never a stand-in.
 * No location, at the owner's request (2026-09-28).
 */
export function WhoYoullWorkWithSection() {
  return (
    <section aria-labelledby="who-title" className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-14">
          <FounderPhoto
            className="aspect-[4/5] w-full max-w-[12rem] shrink-0 md:max-w-[15rem]"
            sizes="240px"
          />

          <div className="text-center md:text-left">
            <h2 id="who-title" className="heading-lg text-white">
              Who you&apos;ll work with
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              I&apos;m {site.founder.name}, the founder of {site.name}.
            </p>
            {site.founder.bio ? (
              <p className="mt-4 leading-relaxed text-neutral-300">{site.founder.bio}</p>
            ) : (
              site.showPlaceholders && (
                <p className="mt-4 text-sm text-neutral-400">
                  More about me coming soon.
                </p>
              )
            )}
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center font-semibold text-amber-400 underline-offset-4 hover:underline"
              >
                Follow LEU on Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
