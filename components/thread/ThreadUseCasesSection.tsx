import { THREAD_PALETTE, threadCopy, threadUseCases } from "@/data/thread";
import {
  ThreadHeading,
  ThreadSection,
  threadCardStyle,
} from "@/components/thread/ThreadUI";

export function ThreadUseCasesSection() {
  return (
    <ThreadSection alt>
      <ThreadHeading
        eyebrow={threadCopy.useCases.eyebrow}
        title={threadCopy.useCases.title}
        description={threadCopy.useCases.description}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {threadUseCases.map((useCase) => (
          <div
            key={useCase.id}
            className="rounded-lg border p-6"
            style={threadCardStyle}
          >
            <h3
              className="text-base font-bold"
              style={{ color: THREAD_PALETTE.bone }}
            >
              {useCase.title}
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: THREAD_PALETTE.muted }}
            >
              {useCase.description}
            </p>
          </div>
        ))}
      </div>
    </ThreadSection>
  );
}
