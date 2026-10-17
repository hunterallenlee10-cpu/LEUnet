import type { ServiceSlug } from "@/data/services";

/** What every demo component takes. */
export interface DemoProps {
  /** The page whose form the demo's call to action goes to. */
  formPath: string;
}

/**
 * Each demo's fixed sizes, shared by the demo and its loading placeholder so
 * the page never moves when a demo arrives: the stage's height and, for a
 * demo with choices above the stage, the toolbar's.
 */
export const demoSizes: Record<ServiceSlug, { stage: string; toolbar?: string }> = {
  websites: { stage: "h-[600px] sm:h-[540px]", toolbar: "min-h-[116px] sm:min-h-[69px]" },
  "get-found": { stage: "h-[760px] sm:h-[620px] lg:h-[520px]", toolbar: "min-h-[69px]" },
  "ai-calls": { stage: "h-[720px] sm:h-[560px]", toolbar: "min-h-[116px] sm:min-h-[69px]" },
  "follow-up": { stage: "h-[980px] sm:h-[860px] lg:h-[580px]", toolbar: "min-h-[124px] sm:min-h-[69px]" },
  content: { stage: "h-[1080px] sm:h-[960px] lg:h-[620px]" },
  "custom-ai": { stage: "h-[700px] sm:h-[600px] lg:h-[540px]", toolbar: "min-h-[116px] sm:min-h-[69px]" },
};
