import { BookCallLink } from "@/components/ui/BookCallLink";
import { site, telHref } from "@/data/site";

export function LeeSystemsFinalCTA() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 section-fade" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-400/10 blur-3xl" />
      </div>

      <div className="section-container text-center">
        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          Find out what your business could stop doing by hand.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
          It starts with a free consultation call. We look at where your time
          goes, and you get a flat quote up front for anything worth
          automating.
        </p>

        <BookCallLink />

        <p className="mt-8 text-sm text-neutral-400">
          Rather call or email?{" "}
          {site.phone && (
            <>
              <a
                href={telHref(site.phone)}
                className="font-semibold text-neutral-200 underline underline-offset-4 hover:text-brass-300"
              >
                {site.phone}
              </a>{" "}
              or{" "}
            </>
          )}
          <a
            href={`mailto:${site.email}`}
            className="break-all font-semibold text-neutral-200 underline underline-offset-4 hover:text-brass-300"
          >
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
