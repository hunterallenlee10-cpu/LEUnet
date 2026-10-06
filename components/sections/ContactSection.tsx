import { sectionIds } from "@/data/navigation";
import { site } from "@/data/site";
import { ContactFormBlock } from "@/components/contact/ContactFormBlock";
import { TalkNow } from "@/components/contact/TalkNow";

/**
 * Homepage: the contact section, for anyone not sure which path fits. It keeps
 * the id "contact" so old /#contact links still land here; the nav's Contact
 * goes to /contact, which carries the same form.
 *
 * Dressed like the Lee Systems offer at the top of the page (2026-10-06, the
 * owner's ask to make it "go with the rest of the site"): the same brass
 * eyebrow and headline, and a form card cut like the calculator's.
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
              className="mt-4 max-w-[14ch] text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance md:text-5xl"
            >
              Not sure which fits?{" "}
              <span className="text-brass-400">Tell me what you need.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-neutral-300">
              {site.replyTime
                ? `I'll point you the right way ${site.replyTime}.`
                : "I'll point you the right way."}
            </p>
            <TalkNow className="mt-10" />
          </div>

          <ContactFormBlock headingLevel="h3" />
        </div>
      </div>
    </section>
  );
}
