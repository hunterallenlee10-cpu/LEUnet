"use client";

import { DemoFrame } from "@/components/services/demo/DemoFrame";
import { useDemo } from "@/components/services/demo/useDemo";
import { demoSizes, type DemoProps } from "@/components/services/demo/sizes";
import { getService } from "@/data/services";

// Stub, replaced by the full demo in phase 4.
const durations = [1500, 1500, 1500] as const;

export default function ContentDemo({ formPath }: DemoProps) {
  const [frameRef, demo] = useDemo({ service: "content", durations });
  return (
    <DemoFrame
      frameRef={frameRef}
      demo={demo}
      title={getService("content").name}
      formPath={formPath}
      stageClassName={demoSizes["content"].stage}
    >
      <div className="flex h-full items-center justify-center text-neutral-400">
        Step {demo.step + 1} of {demo.last + 1}
      </div>
    </DemoFrame>
  );
}
