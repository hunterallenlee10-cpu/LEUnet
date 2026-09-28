import { sectionIds } from "@/data/navigation";
import { site } from "@/data/site";
import { ContactFormBlock } from "@/components/contact/ContactFormBlock";
import { TalkNow } from "@/components/contact/TalkNow";

/**
 * Homepage: the contact section, for anyone not sure which path fits. It keeps
 * the id "contact" so old /#contact links still land here; the nav's Contact
 * goes to /contact, which carries the same form.
 */
export function ContactSection() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden py-20 md:py-28"
    >
      {/* Two offset orbs, dimmer than the hero's pools: a utility section
          should not out-glow the paths above it. */}
      <div className="pointer-events-none absolute inset-0 section-fade" aria-hidden="true">
        <div className="absolute -top-24 right-[18%] h-[32rem] w-[32rem] max-w-[80vw] translate-x-1/2 rounded-full bg-amber-400/[0.08] blur-3xl" />
        <div className="absolute -bottom-24 left-[16%] h-[26rem] w-[26rem] max-w-[70vw] -translate-x-1/2 rounded-full bg-slate-400/[0.05] blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <h2 id="contact-title" className="heading-lg text-white">
              Not sure which fits? Tell me what you need.
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              {site.replyTime
                ? `I'll point you the right way ${site.replyTime}.`
                : "I'll point you the right way."}
            </p>
            <TalkNow className="mt-8" />
          </div>

          <ContactFormBlock headingLevel="h3" />
        </div>
      </div>
    </section>
  );
}
