import type { BmRun } from "@/data/business-mastery";

/**
 * A paragraph's runs, with the `strong` ones set bright against the grey
 * around them: the way every section on this page highlights its key phrase.
 */
export function BmRuns({ runs }: { runs: readonly BmRun[] }) {
  return (
    <>
      {runs.map((run, i) =>
        run.strong ? (
          <strong key={i} className="font-semibold text-white">
            {run.text}
          </strong>
        ) : (
          <span key={i}>{run.text}</span>
        )
      )}
    </>
  );
}
