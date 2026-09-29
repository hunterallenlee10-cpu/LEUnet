"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Captions,
  CaptionsOff,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
  MessageSquare,
  MessageSquareText,
  Pause,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Play,
  RotateCcw,
  ShieldCheck,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsAnchors, pricingPromise } from "@/data/lee-systems";
import { twoPathsLines, type PanelStatus } from "@/data/two-paths-video";
import soundtrack from "@/data/two-paths-video.timing.json";

/** The three systems the example lead passes through, left to right. */
const panels: {
  id: string;
  label: string;
  icons: { idle: LucideIcon } & Partial<Record<PanelStatus, LucideIcon>>;
  chips: Partial<Record<PanelStatus, string>>;
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

const idleStatus: PanelStatus[] = ["idle", "idle", "idle"];

/**
 * When each line starts, in ms, from the built soundtrack
 * (data/two-paths-video.timing.json). If a line has no time there, the audio
 * hasn't been rebuilt since the lines changed, so the voice would say the
 * wrong things: the video then plays silently, on estimated times.
 */
const timeline = (() => {
  const starts: Record<string, number> = soundtrack.lines;
  if (soundtrack.src && twoPathsLines.every((line) => line.id in starts)) {
    return {
      starts: twoPathsLines.map((line) => starts[line.id]),
      total: soundtrack.durationMs,
      src: soundtrack.src,
    };
  }
  const estimated: number[] = [];
  let at = 250;
  for (const line of twoPathsLines) {
    estimated.push(at);
    at += 600 + line.caption.length * 60 + line.hold * 1000;
  }
  return { starts: estimated, total: at, src: "" };
})();

/** Where the AI run starts, which splits the progress bar in two. */
const aiStart =
  timeline.starts[twoPathsLines.findIndex((line) => line.chapter === "ai")] ??
  timeline.total / 2;

/** Where "Do it by hand" starts the video: the by-hand run's first line. */
const manualStart =
  timeline.starts[twoPathsLines.findIndex((line) => line.chapter === "manual")] ?? 0;

/** The line showing at `ms`: the last one started, or -1 before the first. */
function lineAt(ms: number) {
  let index = -1;
  timeline.starts.forEach((start, i) => {
    if (start <= ms) index = i;
  });
  return index;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Fills the two chapters of the progress bar up to `ms`. */
function paintProgress(fills: (HTMLSpanElement | null)[], ms: number) {
  const [manual, ai] = fills;
  if (manual) manual.style.transform = `scaleX(${clamp01(ms / aiStart)})`;
  if (ai) {
    ai.style.transform = `scaleX(${clamp01((ms - aiStart) / (timeline.total - aiStart))})`;
  }
}

/**
 * The video's clock. While the soundtrack plays it is the soundtrack's own
 * position, so the captions can't drift from the voice. Without it (no audio
 * built, or the browser couldn't play it) a timer stands in, and `since` is
 * null while paused.
 */
type Clock = { kind: "audio" } | { kind: "timer"; at: number; since: number | null };

function readClock(clock: Clock, audio: HTMLAudioElement | null) {
  if (clock.kind === "audio") return (audio?.currentTime ?? 0) * 1000;
  return clock.at + (clock.since === null ? 0 : performance.now() - clock.since);
}

/** Brings the frame into view when a button below it starts the video. */
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

type Phase = "idle" | "playing" | "paused" | "ended";

/**
 * The frame and the fork of the "Two paths" section. The frame is one short
 * narrated video (the owner's ask, 2026-09-29): the same example lead played
 * by hand, then with AI, every line read aloud and captioned
 * (data/two-paths-video.ts). Nothing plays until it is pressed, and it
 * pauses itself once scrolled out of view.
 *
 * The corner buttons pause it, turn the sound off and turn the captions off.
 * With the sound on, a screen reader hears the voice; with it off (or no
 * audio), the captions go to a polite live region instead, so nobody hears
 * every line twice. Styles are the `.ls-paths-*` block in app/globals.css.
 */
export function TwoPathsDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [line, setLine] = useState(-1);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [audioFailed, setAudioFailed] = useState(!timeline.src);

  const frameRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const clockRef = useRef<Clock>({ kind: "audio" });

  /** Switches to the timer from where the soundtrack stopped. */
  const fallBack = useCallback(() => {
    setAudioFailed(true);
    if (clockRef.current.kind === "audio") {
      clockRef.current = {
        kind: "timer",
        at: (audioRef.current?.currentTime ?? 0) * 1000,
        since: performance.now(),
      };
    }
  }, []);

  const playAudio = useCallback(() => {
    audioRef.current?.play().catch((error: DOMException) => {
      // A play() cut short by a pause() is not a failure.
      if (error.name !== "AbortError") fallBack();
    });
  }, [fallBack]);

  const start = (from: number) => {
    const audio = audioRef.current;
    if (audio && !audioFailed) {
      clockRef.current = { kind: "audio" };
      audio.muted = muted;
      audio.currentTime = from / 1000;
      playAudio();
    } else {
      clockRef.current = { kind: "timer", at: from, since: performance.now() };
    }
    setLine(lineAt(from));
    setPhase("playing");
  };

  /** Starts from a button inside the frame that goes away once it plays:
   *  focus moves to the frame rather than dropping to the top of the page. */
  const startInFrame = (from: number) => {
    start(from);
    frameRef.current?.focus({ preventScroll: true });
  };

  const pause = useCallback(() => {
    const clock = clockRef.current;
    if (clock.kind === "timer" && clock.since !== null) {
      clockRef.current = { kind: "timer", at: clock.at + performance.now() - clock.since, since: null };
    }
    audioRef.current?.pause();
    setPhase("paused");
  }, []);

  const resume = () => {
    const clock = clockRef.current;
    if (clock.kind === "timer") clockRef.current = { ...clock, since: performance.now() };
    else playAudio();
    setPhase("playing");
  };

  const toggle = () => {
    if (phase === "playing") pause();
    else if (phase === "paused") resume();
    else startInFrame(0);
  };

  const toggleMuted = () => {
    setMuted(!muted);
    if (audioRef.current) audioRef.current.muted = !muted;
  };

  // While playing: follow the clock every frame, move the progress bar, and
  // change the line when the clock passes the next one's start.
  useEffect(() => {
    if (phase !== "playing") return;
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      const clock = clockRef.current;
      const ms = readClock(clock, audio);
      paintProgress(fillRefs.current, ms);
      setLine(lineAt(ms));
      if (ms >= timeline.total || (clock.kind === "audio" && audio?.ended)) {
        audio?.pause();
        paintProgress(fillRefs.current, timeline.total);
        setLine(twoPathsLines.length - 1);
        setPhase("ended");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // Pause once the frame has been seen and then scrolled fully out of view,
  // so the voice doesn't follow the reader down the page.
  useEffect(() => {
    const frame = frameRef.current;
    if (phase !== "playing" || !frame) return;
    let seen = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) seen = true;
      else if (seen) pause();
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [phase, pause]);

  // Stop the sound if the section unmounts mid-play.
  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  const current = line >= 0 ? twoPathsLines[line] : null;
  const statuses = current?.status ?? idleStatus;
  const chapter = current?.chapter;
  const mode =
    chapter === "manual" ? "manual" : chapter === "ai" || chapter === "outro" ? "ai" : undefined;
  const showPlay = phase === "idle";
  // Before the first line starts, the prompt stays up, as on the poster.
  const caption = current ?? twoPathsLines[0];
  const audible = !audioFailed && !muted;

  return (
    <div className="mx-auto max-w-4xl">
      <div
        ref={frameRef}
        id="ls-paths-frame"
        tabIndex={-1}
        role="group"
        aria-label="Video: a new customer calls at 11:48 PM, by hand and then with AI"
        className="ls-paths-frame"
        data-state={phase}
        data-mode={mode}
        onPointerEnter={() => {
          // Fetch the soundtrack as soon as someone reaches for the video.
          if (audioRef.current) audioRef.current.preload = "auto";
        }}
      >
        {timeline.src && (
          <audio
            ref={audioRef}
            src={timeline.src}
            preload="none"
            onError={() => {
              if (phase === "playing") fallBack();
              else setAudioFailed(true);
            }}
          />
        )}

        <div className="ls-paths-panels" aria-hidden="true">
          {panels.map(({ id, label, icons, chips }, i) => {
            const status = statuses[i];
            // Before it plays, the middle orb is the play button's face, so
            // the button sits where the reference puts it: dead centre.
            const playFace = showPlay && i === 1;
            const Icon = icons[status] ?? icons.idle;
            const chip = playFace ? undefined : chips[status];
            return (
              <div
                key={id}
                className="ls-paths-panel"
                data-panel={id}
                data-status={status}
                data-focus={current?.focus === i ? "" : undefined}
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
                  >
                    {chip ?? " "}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* The tag names the run that's playing. */}
        <span className="ls-paths-tag" data-mode={mode} aria-hidden="true">
          Example
          {mode && (
            <span className="ls-paths-tag-run">
              {mode === "manual" ? "By hand" : "With AI"}
            </span>
          )}
        </span>

        <div className="ls-paths-caption">
          {(captions || showPlay) && (
            <p aria-hidden="true">
              <span
                key={current ? current.id : "prompt"}
                className="ls-paths-caption-text"
                data-kind={caption.kind}
              >
                {caption.caption}
              </span>
            </p>
          )}
          {phase === "ended" && (
            <button type="button" className="ls-paths-replay" onClick={() => startInFrame(0)}>
              <RotateCcw aria-hidden="true" />
              Replay
            </button>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {!audible && current && phase !== "idle" ? current.caption : ""}
        </p>

        {phase !== "idle" && (
          <span className="ls-paths-progress" aria-hidden="true">
            {[aiStart, timeline.total - aiStart].map((length, i) => (
              <span
                key={i}
                className="ls-paths-progress-run"
                data-run={i === 0 ? "manual" : "ai"}
                style={{ flexGrow: length }}
              >
                <span
                  ref={(el) => {
                    fillRefs.current[i] = el;
                  }}
                  className="ls-paths-progress-fill"
                />
              </span>
            ))}
          </span>
        )}

        {phase === "paused" && (
          <span className="ls-paths-paused" aria-hidden="true">
            <Play fill="currentColor" strokeWidth={0} />
          </span>
        )}

        {/* The poster, and then the picture: a click anywhere on the frame
            plays, pauses or resumes, like a video. Before it plays, the
            button's face is the middle orb above, which is why it draws
            nothing itself; after that, the corner buttons are the ones a
            keyboard reaches. */}
        <button
          type="button"
          className="ls-paths-play"
          onClick={toggle}
          tabIndex={showPlay ? undefined : -1}
          aria-hidden={showPlay ? undefined : true}
        >
          <span className="sr-only">Play the video: a new customer calls at 11:48 PM</span>
        </button>

        <div className="ls-paths-controls">
          {!showPlay && (
            <button
              type="button"
              className="ls-paths-control"
              onClick={phase === "ended" ? () => start(0) : toggle}
              aria-label={phase === "playing" ? "Pause" : phase === "paused" ? "Play" : "Replay"}
              title={phase === "playing" ? "Pause" : phase === "paused" ? "Play" : "Replay"}
            >
              {phase === "playing" ? (
                <Pause fill="currentColor" strokeWidth={0} aria-hidden="true" />
              ) : phase === "paused" ? (
                <Play fill="currentColor" strokeWidth={0} aria-hidden="true" />
              ) : (
                <RotateCcw aria-hidden="true" />
              )}
            </button>
          )}
          {!audioFailed && (
            <button
              type="button"
              className="ls-paths-control"
              onClick={toggleMuted}
              aria-pressed={!muted}
              aria-label="Sound"
              title={muted ? "Turn sound on" : "Turn sound off"}
            >
              {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
            </button>
          )}
          <button
            type="button"
            className="ls-paths-control"
            onClick={() => setCaptions(!captions)}
            aria-pressed={captions}
            aria-label="Captions"
            title={captions ? "Turn captions off" : "Turn captions on"}
          >
            {captions ? <Captions aria-hidden="true" /> : <CaptionsOff aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* The fork, after the reference's: each path's label is what it does
          to your customers, its title what it does to your money, and its
          text the same two jobs (answering, following up) done by hand and
          by AI. The loss is in the red of money lost and the price in gold,
          as on "The choice is yours". The path the video is on lights up. */}
      <div className="ls-paths-fork" data-mode={mode}>
        <span className="ls-paths-stem" aria-hidden="true" />
        <div className="relative grid grid-cols-2">
          <div className="ls-paths-path">
            <span className="ls-paths-branch ls-paths-branch--left" aria-hidden="true" />
            <span className="ls-paths-node ls-paths-node--left" aria-hidden="true" />
            <h3 className="mt-4 sm:mt-5">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:text-xs">
                Lose customers
              </span>
              <span className="ls-loss mt-1.5 block text-xl font-bold leading-9 sm:text-4xl sm:leading-[3rem] md:text-5xl">
                Lose money
              </span>
            </h3>
            <p className="mb-6 mt-2 max-w-xs text-balance text-[13px] leading-relaxed text-neutral-400 sm:text-sm">
              Answer when you can. Follow up when you remember. Miss a call,
              and someone else gets paid for the job.
            </p>
            <button
              type="button"
              aria-controls="ls-paths-frame"
              className="btn-ls-muted mt-auto w-full max-w-[16rem] px-2 text-[13px] sm:text-base"
              onClick={() => {
                start(manualStart);
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
                Win customers
              </span>
              {/* "to start" keeps the $0 on the free call: on its own it
                  could read as the price of the AI. */}
              <span className="mt-1.5 flex items-baseline justify-center gap-1.5">
                <span className="ls-price text-3xl font-bold leading-9 sm:text-5xl sm:leading-[3rem]">
                  $0
                </span>
                <span className="text-[13px] font-semibold text-brass-200/80 sm:text-base">
                  to start
                </span>
              </span>
            </h3>
            <p className="mb-6 mt-2 max-w-xs text-balance text-[13px] leading-relaxed text-neutral-300 sm:text-sm">
              AI answers every call, day or night, and follows up until they
              reply. They book with you, not whoever answers next.
            </p>
            <BookCallLink
              variant="glow"
              href={`#${leeSystemsAnchors.form}`}
              className="mt-auto w-full max-w-[16rem] px-2 text-[13px] sm:text-base"
            />
          </div>

          <span className="ls-paths-vs" aria-hidden="true">
            VS
          </span>
        </div>

        {/* The terms under the call button, from the FAQ ("no obligation to
            hire us afterwards") and the pricing promise. A row of their own,
            under the right path only, so the two buttons stay level. */}
        <div className="grid grid-cols-2">
          <p className="col-start-2 mt-3 px-4 text-center text-[11px] leading-snug text-neutral-400 sm:px-8 sm:text-xs">
            <ShieldCheck
              className="-mt-0.5 mr-1 inline h-3.5 w-3.5 text-brass-300"
              aria-hidden="true"
            />
            <span className="whitespace-nowrap">No obligation</span>
            {" · "}
            <span className="whitespace-nowrap">{pricingPromise[0]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
