import Link from "next/link";
import { FounderPhoto } from "@/components/shared/FounderPhoto";
import { leeSystems } from "@/data/lee-systems";

/**
 * A short, factual About: who runs it and whose company it is. No location or
 * service area, at the owner's request (2026-09-28).
 */
export function LeeSystemsAboutSection() {
  return (
    <section id="about" className="relative isolate py-16 md:py-20">
      <div className="section-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-start">
          <FounderPhoto
            className="aspect-square w-32 shrink-0 sm:w-36"
            sizes="144px"
          />
          <div className="text-center sm:text-left">
            <h2 className="mb-3 text-2xl font-bold text-white">
              About {leeSystems.name}
            </h2>
            <p className="leading-relaxed text-neutral-300">
              {leeSystems.name} is run by {leeSystems.owner}. We build AI
              automation and websites for business owners. {leeSystems.name} is
              a{" "}
              <Link
                href="/"
                className="font-semibold text-white underline underline-offset-4 hover:text-brass-300"
              >
                {leeSystems.parentName}
              </Link>{" "}
              company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
