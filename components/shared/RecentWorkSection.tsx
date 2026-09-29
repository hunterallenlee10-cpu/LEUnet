import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { isExternalHref, site } from "@/data/site";
import { ComingSoonSlot } from "@/components/shared/ComingSoonSlot";

/** Fewer real projects than this and the section doesn't show them alone. */
const MIN_PROJECTS = 2;

/**
 * "Our projects", on the homepage and /lee-systems: one card per project in
 * `site.projects`, each linking to the live site or its walkthrough.
 *
 * With fewer than two projects, the open places are "coming soon" frames
 * while `site.showPlaceholders` is true (the owner's call, 2026-09-28), and
 * the whole section hides when it is false. Nothing here ever stands in a
 * made-up project.
 */
export function RecentWorkSection({ id }: { id?: string }) {
  const { projects } = site;
  const openSlots = site.showPlaceholders
    ? Math.max(0, MIN_PROJECTS - projects.length)
    : 0;

  if (projects.length < MIN_PROJECTS && openSlots === 0) return null;

  return (
    <section
      id={id}
      aria-labelledby="recent-work-title"
      className="relative isolate py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="recent-work-title" className="heading-lg text-white">
            Our projects
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Real projects, walked through start to finish.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const external = isExternalHref(project.href);
            return (
              <li
                key={project.href}
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
              >
                {project.image && (
                  <div className="relative aspect-[16/10] border-b border-white/10">
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      sizes="(min-width: 768px) 32rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white">{project.name}</h3>
                  <p className="mt-2 leading-relaxed text-neutral-400">
                    {project.summary}
                  </p>
                  <a
                    href={project.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-auto inline-flex min-h-11 items-center self-start pt-4 font-semibold text-brass-300 underline-offset-4 hover:underline"
                  >
                    See the project
                    <span className="sr-only">
                      {`: ${project.name}${external ? " (opens in a new tab)" : ""}`}
                    </span>
                  </a>
                </div>
              </li>
            );
          })}

          {Array.from({ length: openSlots }, (_, i) => (
            <li key={`open-slot-${i}`}>
              <ComingSoonSlot
                label="Project walkthrough coming soon"
                Icon={PlayCircle}
                className="aspect-[16/10] h-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
