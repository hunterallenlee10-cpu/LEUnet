"use client";

import { DemoFrame } from "@/components/services/demo/DemoFrame";
import { useDemo } from "@/components/services/demo/useDemo";
import { demoSizes, demoTitles, type DemoProps } from "@/components/services/demo/sizes";

// Stub, replaced by the full demo in phase 4.
const durations = [1500, 1500, 1500] as const;

export default function FollowUpDemo({ formPath }: DemoProps) {
  const [frameRef, demo] = useDemo({ service: "follow-up", durations });
  return (
    <DemoFrame
      frameRef={frameRef}
      demo={demo}
      title={demoTitles["follow-up"]}
      formPath={formPath}
      stageClassName={demoSizes["follow-up"].stage}
    >
      <div className="flex h-full items-center justify-center text-neutral-400">
        Step {demo.step + 1} of {demo.last + 1}
      </div>
    </DemoFrame>
  );
}
