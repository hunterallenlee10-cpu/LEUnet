import { WebsitesInquiryForm } from "@/components/websites/WebsitesInquiryForm";

/**
 * The heading first asked what "a better website" would be worth, which leaves
 * the buyer valuing an object - a nicer-looking site - and puts us back beside
 * everyone else selling pages. Rewriting it as "what would it be worth to turn
 * more visitors into customers" fixed the object but introduced a different
 * problem: it was the only direct-response value question on a page where every
 * other heading is a plain statement, so it read as borrowed from a different
 * kind of sales page and undercut the calm the rest of the page depends on.
 *
 * It now states what the reader gets by filling in the form, which is the one
 * thing this section can promise without a client result behind it - a quote,
 * and our own honest read on the project. Both are entirely within our control
 * to deliver. Do not put a conversion figure or a value question back here; we
 * have no client results to cite, and inventing one would undo the honesty the
 * paragraph below is built on.
 *
 * That paragraph is the most valuable copy in the section. Promising an honest
 * answer about whether a rebuild is even warranted costs us the occasional
 * project and earns the inquiry from the owner who has been pitched by three
 * agencies already. Do not trade it for a harder close.
 */
export function WebsitesInquiryCTA() {
  return (
    <section
      id="website-inquiry-form"
      className="scroll-mt-24 border-y border-white/10 bg-gradient-to-b from-neutral-950 via-amber-950/[0.08] to-neutral-950 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="heading-lg mb-6 text-white">
            Ask for a Quote. Get an Honest Answer.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Tell us what your business does and what work you want more of. We
            will come back with a quote, a realistic timeline, and an honest
            answer about whether a new build is actually the right move -
            sometimes it is a few changes to the site you already have.
          </p>
        </div>

        <WebsitesInquiryForm />
      </div>
    </section>
  );
}
