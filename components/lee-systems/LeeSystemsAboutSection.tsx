import Link from "next/link";
import { LeeSystemsMark } from "@/components/lee-systems/LeeSystemsMark";
import { leeSystems } from "@/data/lee-systems";

/** A short, factual About: who, where, and whose company it is. */
export function LeeSystemsAboutSection() {
  return (
    <section id="about" className="relative isolate scroll-mt-24 py-16 md:py-20">
      <div className="section-container">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:flex-row">
          <LeeSystemsMark size="md" />
          <div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              About {leeSystems.name}
            </h2>
            <p className="leading-relaxed text-neutral-300">
              {leeSystems.name} is run by {leeSystems.owner} in {leeSystems.city},{" "}
              {leeSystems.region}. We build automation and websites for service
              businesses across {leeSystems.region} and, remotely, anywhere in
              the country. {leeSystems.name} is a{" "}
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
