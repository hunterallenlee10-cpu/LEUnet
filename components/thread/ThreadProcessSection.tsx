import { THREAD_PALETTE, threadCopy, threadProcessSteps } from "@/data/thread";
import {
  ThreadHeading,
  ThreadSection,
  threadCardStyle,
} from "@/components/thread/ThreadUI";

export function ThreadProcessSection() {
  return (
    <ThreadSection>
      <ThreadHeading
        eyebrow={threadCopy.process.eyebrow}
        title={threadCopy.process.title}
        description={threadCopy.process.description}
      />

      <ol className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {threadProcessSteps.map((step) => (
          <li
            key={step.id}
            className="flex flex-col rounded-lg border p-6"
            style={threadCardStyle}
          >
            <span
              className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
              style={{
                backgroundColor: THREAD_PALETTE.bone,
                color: THREAD_PALETTE.ink,
              }}
            >
              {step.step}
            </span>
            <h3
              className="text-base font-bold"
              style={{ color: THREAD_PALETTE.bone }}
            >
              {step.title}
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: THREAD_PALETTE.muted }}
            >
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </ThreadSection>
  );
}
