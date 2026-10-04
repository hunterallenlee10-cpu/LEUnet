import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { isExternalHref, site } from "@/data/site";
import { ComingSoonSlot } from "@/components/shared/ComingSoonSlot";
import { ProjectsCarousel } from "@/components/shared/ProjectsCarousel";

/** Fewer real projects than this and the section doesn't show them alone. */
const MIN_PROJECTS = 2;

/** The carousel always has this many slides while placeholders show. */
const CAROUSEL_SLIDES = 5;

/**
 * "Our projects", on the homepage and /lee-systems: a carousel with one
 * slide per project in `site.projects`, each linking to the live site or its
 * walkthrough.
 *
 * While `site.showPlaceholders` is true, "coming soon" frames fill the
 * carousel out to five slides (the owner asked for five, 2026-10-04), and
 * each real project takes the place of one. With placeholders off, the
 * section shows only real projects and hides with fewer than two. Nothing
 * here ever stands in a made-up project.
 */
export function RecentWorkSection({ id }: { id?: string }) {
  const { projects } = site;
  const openSlots = site.showPlaceholders
    ? Math.max(0, CAROUSEL_SLIDES - projects.length)
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
            Real projects we have handled start to finish.
          </p>
        </div>

        <ProjectsCarousel
          label="Our projects"
          slides={[
            ...projects.map((project) => {
              const external = isExternalHref(project.href);
              return (
                <div
                  key={project.href}
                  className="flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
                >
                  {project.image && (
                    <div className="relative aspect-[16/10] border-b border-white/10">
                      <Image
                        src={project.image}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes="(min-width: 768px) 48rem, 86vw"
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
                </div>
              );
            }),
            ...Array.from({ length: openSlots }, (_, i) => (
              <ComingSoonSlot
                key={`open-slot-${i}`}
                label="Project walkthrough coming soon"
                Icon={PlayCircle}
                className="aspect-[16/10] w-full"
              />
            )),
          ]}
        />
      </div>
    </section>
  );
}
