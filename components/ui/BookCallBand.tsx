import { BookCallLink } from "@/components/ui/BookCallLink";

/**
 * A short "Book a free call" band between sections, so a reader is never
 * more than a couple of sections from the next step (the owner's ask,
 * 2026-10-19). Each placement brings its own heading and line, worded for
 * the section just above it; the button is always BookCallLink, so its label
 * and destination stay the ones in data/site.ts. `href` is passed on as-is,
 * for /lee-systems, where the body's buttons scroll to the page's own form.
 */
export function BookCallBand({
  title,
  line,
  href,
}: {
  title: string;
  line: string;
  href?: string;
}) {
  return (
    <section aria-label={title} className="relative isolate py-6 md:py-8">
      <div className="section-container">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl border border-brass-400/25 bg-gradient-to-br from-brass-400/[0.08] via-white/[0.02] to-transparent px-6 py-8 text-center sm:px-10 md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-2xl font-bold tracking-tight text-white text-balance md:text-[1.75rem]">
              {title}
            </p>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-300">
              {line}
            </p>
          </div>
          <BookCallLink variant="glow" arrow href={href} className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
