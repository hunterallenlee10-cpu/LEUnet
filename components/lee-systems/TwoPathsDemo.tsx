"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
  MessageSquare,
  MessageSquareText,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Play,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsAnchors } from "@/data/lee-systems";

type Mode = "ai" | "manual";
type Status = "idle" | "ringing" | "good" | "bad";

/** The three systems the example lead passes through, left to right. */
const panels: {
  id: string;
  label: string;
  icons: { idle: LucideIcon } & Partial<Record<Status, LucideIcon>>;
  chips: Partial<Record<Status, string>>;
}[] = [
  {
    id: "calls",
    label: "Calls",
    icons: {
      idle: Phone,
      ringing: PhoneIncoming,
      good: PhoneCall,
      bad: PhoneMissed,
    },
    chips: { ringing: "Incoming call", good: "Answered by AI", bad: "Voicemail" },
  },
  {
    id: "follow-up",
    label: "Follow-up",
    icons: { idle: MessageSquare, good: MessageSquareText, bad: PhoneOutgoing },
    chips: { good: "Text sent", bad: "No answer" },
  },
  {
    id: "crm",
    label: "Intake + CRM",
    icons: { idle: ClipboardList, good: ClipboardCheck, bad: ClipboardX },
    chips: { good: "Saved to CRM", bad: "Never saved" },
  },
];

interface Step {
  caption: string;
  /** Each panel's state while this line shows, left to right. */
  status: [Status, Status, Status];
  /** The panel this line is about, lit while it shows. */
  focus: number;
}

/**
 * One example lead, played two ways. Every line is something the owner has
 * confirmed the systems do (`site.callAnswering`, and the automation offering
 * and FAQ on /lee-systems); the time and the day only make it an example,
 * which is why the frame is labelled "Example". No result or client is
 * implied.
 */
const stories: Record<Mode, { steps: Step[]; ending: string }> = {
  ai: {
    steps: [
      {
        caption: "11:48 PM. A new customer calls.",
        status: ["ringing", "idle", "idle"],
        focus: 0,
      },
      {
        caption: "AI picks up, answers their questions and books them for Tuesday.",
        status: ["good", "idle", "idle"],
        focus: 0,
      },
      {
        caption: "A text confirms the booking, and a reminder is set for the day before.",
        status: ["good", "good", "idle"],
        focus: 1,
      },
      {
        caption: "The lead lands in your CRM, and you get a text with the details.",
        status: ["good", "good", "good"],
        focus: 2,
      },
    ],
    ending: "Booked before you woke up.",
  },
  manual: {
    steps: [
      {
        caption: "11:48 PM. A new customer calls.",
        status: ["ringing", "idle", "idle"],
        focus: 0,
      },
      {
        caption: "Nobody picks up. It goes to voicemail.",
        status: ["bad", "idle", "idle"],
        focus: 0,
      },
      {
        caption: "You call back the next morning. No answer.",
        status: ["bad", "bad", "idle"],
        focus: 1,
      },
      {
        caption: "The lead never makes it into your CRM.",
        status: ["bad", "bad", "bad"],
        focus: 2,
      },
    ],
    ending: "They'd already booked with someone who answered.",
  },
};

const idleStatus: Step["status"] = ["idle", "idle", "idle"];
const prompt = "What happens to your next lead?";
const seeWithAi = "Now see it with AI";

/** How long each line of the example stays up. */
const STEP_MS = 2800;

/** Brings the frame into view when a button below it starts the example. */
function revealFrame(frame: HTMLElement | null) {
  if (!frame) return;
  const header = 80;
  const { top, bottom } = frame.getBoundingClientRect();
  if (top >= header && bottom <= window.innerHeight) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: window.scrollY + top - header - 16,
    behavior: reduced ? "auto" : "smooth",
  });
}

/**
 * The frame and the fork of the "Two paths" section. The frame plays like a
 * video: the play button (and "Now see it with AI" after the other version)
 * runs the example with the systems in place, and "Do it by hand" under the
 * left path runs the same lead without them. The caption under the panels is
 * the narration and a polite live region, so a screen reader hears the story
 * the panels draw. Styles are the `.ls-paths-*` block in app/globals.css.
 */
export function TwoPathsDemo() {
  const [run, setRun] = useState<{ mode: Mode; step: number; id: number } | null>(
    null
  );
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!run || run.step >= stories[run.mode].steps.length) return;
    const timer = window.setTimeout(
      () => setRun({ ...run, step: run.step + 1 }),
      STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [run]);

  const play = (mode: Mode) =>
    setRun((prev) => ({ mode, step: 0, id: (prev?.id ?? 0) + 1 }));

  /** Plays from a button inside the frame, which leaves with the click: focus
   *  moves to the frame rather than dropping to the top of the page. */
  const playInFrame = (mode: Mode) => {
    play(mode);
    frameRef.current?.focus({ preventScroll: true });
  };

  const story = run ? stories[run.mode] : null;
  const step = run && story ? story.steps[run.step] : undefined;
  const state = !run ? "idle" : step ? "playing" : "ended";
  const statuses =
    step?.status ?? story?.steps[story.steps.length - 1].status ?? idleStatus;
  const caption = step
    ? { kind: "step", text: step.caption }
    : story
      ? { kind: "ending", text: story.ending }
      : { kind: "prompt", text: prompt };

  const showPlay = state === "idle" || (state === "ended" && run?.mode === "manual");
  const showReplay = state === "ended" && run?.mode === "ai";

  return (
    <div className="mx-auto max-w-4xl">
      <div
        ref={frameRef}
        id="ls-paths-frame"
        tabIndex={-1}
        role="group"
        aria-label="Example: a new customer calls at 11:48 PM"
        className="ls-paths-frame"
        data-state={state}
        data-mode={run?.mode}
      >
        <div className="ls-paths-panels" aria-hidden="true">
          {panels.map(({ id, label, icons, chips }, i) => {
            const status = statuses[i];
            // While the play button shows, the middle orb is its face, so
            // the button sits where the reference puts it: dead centre.
            const playFace = showPlay && i === 1;
            const Icon = icons[status] ?? icons.idle;
            const chip =
              playFace && state === "ended" ? seeWithAi : chips[status];
            return (
              <div
                key={id}
                className="ls-paths-panel"
                data-panel={id}
                data-status={status}
                data-focus={step?.focus === i ? "" : undefined}
              >
                <span className="ls-paths-label">{label}</span>
                <span className="ls-paths-stage">
                  <span
                    className="ls-paths-orb"
                    data-play={playFace ? "" : undefined}
                  >
                    {playFace ? (
                      <Play
                        className="ls-paths-icon"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ) : (
                      <Icon className="ls-paths-icon" strokeWidth={1.75} />
                    )}
                  </span>
                  <span
                    className="ls-paths-chip"
                    data-hidden={chip ? undefined : ""}
                    data-play={playFace && chip ? "" : undefined}
                  >
                    {chip ?? "\u00a0"}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <span className="ls-paths-tag" aria-hidden="true">
          Example
        </span>

        <div className="ls-paths-caption">
          <p aria-live="polite">
            <span
              key={run ? `${run.id}-${run.step}` : "prompt"}
              className="ls-paths-caption-text"
              data-kind={caption.kind}
            >
              {caption.text}
            </span>
          </p>
          {showReplay && (
            <button
              type="button"
              className="ls-paths-replay"
              onClick={() => playInFrame("ai")}
            >
              <RotateCcw aria-hidden="true" />
              Replay
            </button>
          )}
        </div>

        {run && (
          <span
            key={run.id}
            className="ls-paths-progress"
            aria-hidden="true"
            style={
              {
                "--ls-run-ms": `${STEP_MS * stories[run.mode].steps.length}ms`,
              } as CSSProperties
            }
          />
        )}

        {/* The poster: a click anywhere on the frame plays. Its face is the
            middle orb above, which is why the button itself draws nothing. */}
        {showPlay && (
          <button
            type="button"
            className="ls-paths-play"
            onClick={() => playInFrame("ai")}
          >
            <span className="sr-only">
              {state === "idle"
                ? "Play the example: a new customer calls at 11:48 PM"
                : seeWithAi}
            </span>
          </button>
        )}

      </div>

      <div className="ls-paths-fork" data-mode={run?.mode}>
        <span className="ls-paths-stem" aria-hidden="true" />
        <div className="relative grid grid-cols-2">
          <div className="ls-paths-path">
            <span className="ls-paths-branch ls-paths-branch--left" aria-hidden="true" />
            <span className="ls-paths-node ls-paths-node--left" aria-hidden="true" />
            <h3 className="mt-4 sm:mt-5">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                Lose customers
              </span>
              <span className="mt-1.5 block text-xl font-bold leading-9 text-white sm:text-3xl sm:leading-[3rem]">
                Lose money
              </span>
            </h3>
            <p className="mb-6 mt-2 max-w-xs text-balance text-[13px] leading-relaxed text-neutral-400 sm:text-sm">
              Answer when you can. Follow up when you remember. Whoever
              replies first usually gets the job.
            </p>
            <button
              type="button"
              aria-controls="ls-paths-frame"
              className="btn-ls-muted mt-auto w-full max-w-[16rem] px-3 text-[13px] sm:text-base"
              onClick={() => {
                play("manual");
                revealFrame(frameRef.current);
              }}
            >
              Do it by hand
            </button>
          </div>

          <div className="ls-paths-path">
            <span className="ls-paths-branch ls-paths-branch--right" aria-hidden="true" />
            <span className="ls-paths-node ls-paths-node--right" aria-hidden="true" />
            <h3 className="mt-4 sm:mt-5">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-brass-300 sm:text-xs">
                First call
              </span>
              <span className="ls-price mt-1.5 block text-3xl font-bold leading-9 sm:text-5xl sm:leading-[3rem]">
                $0
              </span>
            </h3>
            <p className="mb-6 mt-2 max-w-xs text-balance text-[13px] leading-relaxed text-neutral-300 sm:text-sm">
              AI answers every call and new lead in seconds, books the
              appointment and follows up for you. Day or night.
            </p>
            <BookCallLink
              variant="glow"
              href={`#${leeSystemsAnchors.form}`}
              className="mt-auto w-full max-w-[16rem] px-3 text-[13px] sm:text-base"
            />
          </div>

          <span className="ls-paths-vs" aria-hidden="true">
            VS
          </span>
        </div>
      </div>
    </div>
  );
}
