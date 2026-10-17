"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import clsx from "clsx";
import { Play } from "lucide-react";
import { getService, type ServiceSlug } from "@/data/services";
import { useInView } from "@/lib/hooks/useInView";
import { demoSizes, type DemoProps } from "@/components/services/demo/sizes";

function Placeholder({ slug }: { slug: ServiceSlug }) {
  const sizes = demoSizes[slug];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-white/10 bg-[#111214] light:bg-[#fff]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="rounded border border-brass-400/40 px-2 py-0.5 text-[11px] font-semibold tracking-[0.16em] text-brass-300 uppercase">
            Example
          </span>
          <span className="text-sm font-semibold text-white sm:text-base">
            {getService(slug).name}
          </span>
        </div>
        <span className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-semibold text-neutral-400">
          <Play className="h-4 w-4" />
          Play
        </span>
      </div>
      {sizes.toolbar && (
        <div className={clsx("border-b border-white/10", sizes.toolbar)} />
      )}
      <div className={clsx("flex items-center justify-center", sizes.stage)}>
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-brass-400 motion-reduce:animate-none" />
      </div>
      <div className="h-[115px] border-t border-white/10 sm:h-[77px]" />
      <div className="h-9" />
    </div>
  );
}

const loaders: Record<ServiceSlug, ComponentType<DemoProps>> = {
  websites: dynamic(() => import("./WebsitesDemo"), {
    ssr: false,
    loading: () => <Placeholder slug="websites" />,
  }),
  "get-found": dynamic(() => import("./GetFoundDemo"), {
    ssr: false,
    loading: () => <Placeholder slug="get-found" />,
  }),
  "ai-calls": dynamic(() => import("./AiCallsDemo"), {
    ssr: false,
    loading: () => <Placeholder slug="ai-calls" />,
  }),
  "follow-up": dynamic(() => import("./FollowUpDemo"), {
    ssr: false,
    loading: () => <Placeholder slug="follow-up" />,
  }),
  content: dynamic(() => import("./ContentDemo"), {
    ssr: false,
    loading: () => <Placeholder slug="content" />,
  }),
  "custom-ai": dynamic(() => import("./CustomAiDemo"), {
    ssr: false,
    loading: () => <Placeholder slug="custom-ai" />,
  }),
};

/**
 * A demo, loaded only once it is within about a screen of view: until then
 * the placeholder holds its exact space. Used by the Demo Lab and by each
 * service page.
 */
export function DemoSlot({ slug, formPath }: { slug: ServiceSlug; formPath: string }) {
  const [ref, near] = useInView<HTMLDivElement>({ rootMargin: "600px 0px", once: true });
  const Demo = loaders[slug];
  return <div ref={ref}>{near ? <Demo formPath={formPath} /> : <Placeholder slug={slug} />}</div>;
}
