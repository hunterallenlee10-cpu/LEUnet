import { sectionIds } from "@/data/navigation";
import { site } from "@/data/site";
import { ContactFormBlock } from "@/components/contact/ContactFormBlock";
import { TalkNow } from "@/components/contact/TalkNow";

/**
 * Homepage: the contact section, the page's last ask. It keeps
 * the id "contact" so old /#contact links still land here; the nav's Contact
 * goes to /contact, which carries the same form.
 *
 * Dressed like the LEU offer at the top of the page (2026-10-06, the
 * owner's ask to make it "go with the rest of the site"): the same brass
 * eyebrow and headline, and a form card cut like the calculator's. The
 * headline is the owner's, "Every missed lead is lost money.", picking up
 * the calculator's missed revenue, and the line under it carries the offer
 * terms (2026-10-06, replacing "Not sure which fits? Tell me what you
 * need.").
 */
export function ContactSection() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden py-20 md:py-28"
    >
      {/* One brass pool behind the form, dimmer than the offer's: a utility
          section should not out-glow the sections above it. */}
      <div className="pointer-events-none absolute inset-0 section-fade" aria-hidden="true">
        <div className="absolute right-[22%] top-1/2 h-[34rem] w-[34rem] max-w-[90vw] -translate-y-1/2 translate-x-1/2 rounded-full bg-brass-400/[0.07] blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:pt-4">
            <p className="flex items-center gap-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-brass-300">
              Contact
              <span
                className="h-px w-12 bg-gradient-to-r from-brass-400/70 to-transparent"
                aria-hidden="true"
              />
            </p>
            <h2
              id="contact-title"
              className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance md:text-5xl"
            >
              Every missed lead is{" "}
              {/* The owner's line (2026-10-06), with the weight on "lost
                  money": its own line, a size up, in the accent over a
                  highlighter stripe (platinum in dark; a gold stripe under
                  navy in light). */}
              <span className="mt-1 block">
                <span className="-ml-1 whitespace-nowrap bg-[linear-gradient(transparent_60%,rgb(231_229_228/0.16)_60%,rgb(231_229_228/0.16)_88%,transparent_88%)] light:bg-[linear-gradient(transparent_60%,rgb(212_168_87/0.22)_60%,rgb(212_168_87/0.22)_88%,transparent_88%)] px-1 text-[1.4em] leading-none text-brass-400">
                  lost money.
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-300">
              Tell us where leads slip through: missed calls, slow
              follow-up, or a website that doesn&apos;t bring them in.
              You&apos;ll get a flat upfront quote with no hidden fees, built
              personally for you.
            </p>
            {site.replyTime && (
              <p className="mt-3 text-sm font-medium text-brass-300">
                We reply {site.replyTime}.
              </p>
            )}
            <TalkNow className="mt-10" />
          </div>

          <ContactFormBlock headingLevel="h3" />
        </div>
      </div>
    </section>
  );
}
