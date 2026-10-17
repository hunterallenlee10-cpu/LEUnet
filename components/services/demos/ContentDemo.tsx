"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CalendarDays, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import { DemoFrame } from "@/components/services/demo/DemoFrame";
import { useDemo } from "@/components/services/demo/useDemo";
import { ExampleTag, Panel, Segmented } from "@/components/services/demo/ui";
import { demoSizes, demoTitles, type DemoProps } from "@/components/services/demo/sizes";
import {
  captionWords,
  contentHooks,
  days,
  plannedCount,
  platforms,
  weekPlan,
} from "@/data/demos/content";

/**
 * Content & Social Media: from a raw clip to a week of posts.
 *
 * A phone plays a 9:16 clip. Raw / Edited switches between the same clip
 * without and with captions, tighter cuts and a hook title; the hook picker
 * cycles three example hooks. Below, a one-week calendar fills in day by
 * day across Instagram, TikTok, YouTube and Facebook. Anything AI-generated
 * is labelled "AI-generated".
 *
 * Real clips are used when public/demos/content/raw.mp4 and edited.mp4 are
 * there (muted, preload="none", with the poster, playing only while the
 * demo is on screen); until then the phone shows a styled "[SAMPLE REEL]"
 * frame. No sound plays, ever.
 */

type Mode = "raw" | "edited";

const S = { raw: 0, edited: 1, hook2: 2, hook3: 3, firstDay: 4, summary: 11 } as const;
const durations = [3000, 3000, 2400, 2400, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 3000];

const captions = [
  "The raw clip: no captions, slow start.",
  `Edited: captions, tighter cuts and a hook title, "${contentHooks[0]}".`,
  `Another hook: "${contentHooks[1]}".`,
  `Another hook: "${contentHooks[2]}".`,
  ...days.map((day) => `${day}'s posts are planned.`),
  `${plannedCount} posts planned across four platforms this week.`,
];

interface Choices {
  run: number;
  mode?: Mode;
  hook?: number;
}

export default function ContentDemo({ formPath, assets }: DemoProps) {
  const [frameRef, demo] = useDemo({ service: "content", durations });
  const [choices, setChoices] = useState<Choices>({ run: -1 });
  const mine: Partial<Choices> = choices.run === demo.run ? choices : {};

  const mode: Mode = mine.mode ?? (demo.reached(S.edited) ? "edited" : "raw");
  const hook = mine.hook ?? (demo.reached(S.hook3) ? 2 : demo.reached(S.hook2) ? 1 : 0);
  const daysShown = Math.max(0, Math.min(days.length, demo.step - S.firstDay + 1));

  const choose = (change: Omit<Choices, "run">) => {
    setChoices((current) => ({ ...(current.run === demo.run ? current : {}), ...change, run: demo.run }));
    demo.pause();
  };

  return (
    <DemoFrame
      frameRef={frameRef}
      demo={demo}
      title={demoTitles.content}
      formPath={formPath}
      stageClassName={demoSizes.content.stage}
      captions={captions}
    >
      <div className="grid h-full grid-cols-1 content-start gap-5 p-4 sm:grid-cols-[250px_1fr] sm:p-5 lg:gap-8">
        <div className="flex flex-col items-center gap-3">
          <Segmented
            label="Clip version"
            value={mode}
            onChange={(value) => choose({ mode: value })}
            options={[
              { value: "raw", label: "Raw" },
              { value: "edited", label: "Edited" },
            ]}
          />

          <Reel mode={mode} hook={contentHooks[hook]} playing={demo.active && !demo.reduced} assets={assets.reel} />

          <div
            role="group"
            aria-label="Example hooks"
            className={clsx(
              "flex w-full max-w-[250px] items-center justify-between gap-2 transition-opacity motion-reduce:transition-none",
              mode === "raw" && "opacity-50"
            )}
          >
            <button
              type="button"
              aria-label="Previous hook"
              onClick={() => choose({ mode: "edited", hook: (hook + contentHooks.length - 1) % contentHooks.length })}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white hover:border-brass-400/60"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-neutral-300" aria-live="polite">
              Hook {hook + 1} of {contentHooks.length}
            </p>
            <button
              type="button"
              aria-label="Next hook"
              onClick={() => choose({ mode: "edited", hook: (hook + 1) % contentHooks.length })}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white hover:border-brass-400/60"
            >
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Panel
          title={
            <span className="flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-brass-400" />
              This week&apos;s posts
            </span>
          }
          tag={<ExampleTag />}
          className="min-w-0 px-2.5 sm:px-4"
        >
          <table className="w-full table-fixed border-separate border-spacing-0.5 text-[10px] sm:border-spacing-1 sm:text-[11px]">
            <caption className="sr-only">One week of planned posts by platform</caption>
            <thead>
              <tr>
                <th scope="col" className="w-8 text-left font-semibold text-neutral-400 sm:w-11">
                  <span className="sr-only">Day</span>
                </th>
                {platforms.map((platform) => (
                  <th key={platform} scope="col" className="truncate pb-1 text-left font-semibold text-neutral-300">
                    {platform}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, row) => (
                <tr key={day}>
                  <th scope="row" className="text-left font-semibold text-neutral-400">
                    {day}
                  </th>
                  {weekPlan[row].map((post, column) => {
                    const shown = row < daysShown && post;
                    return (
                      <td key={column} className="h-9 align-middle">
                        {shown ? (
                          <span
                            className={clsx(
                              "svc-enter flex min-h-9 flex-col justify-center rounded-md border px-1 py-0.5 leading-tight sm:px-1.5",
                              post.ai ? "border-brass-400/50 bg-brass-400/10" : "border-white/10 bg-white/[0.04]"
                            )}
                          >
                            <span className="truncate font-semibold text-white">{post.format}</span>
                            {post.ai && (
                              <span className="flex items-center gap-0.5 text-[8px] leading-none text-brass-200 sm:truncate sm:text-[9px]">
                                <Sparkles aria-hidden="true" className="hidden h-2.5 w-2.5 shrink-0 sm:block" />
                                AI-generated
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="block h-9 rounded-md border border-dashed border-white/[0.07]">
                            <span className="sr-only">{post && row >= daysShown ? "Not planned yet" : "No post"}</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p
            className={clsx(
              "mt-3 text-[13px] transition-colors duration-500 motion-reduce:transition-none",
              demo.reached(S.summary) ? "font-semibold text-white" : "text-neutral-400"
            )}
          >
            {demo.reached(S.summary)
              ? `${plannedCount} posts planned across 4 platforms, from one week of clips.`
              : "Fills in as the week is planned."}
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">AI visuals and AI video ads are always labelled as AI.</p>
        </Panel>
      </div>
    </DemoFrame>
  );
}

/**
 * The phone. A real clip when one is in /public, otherwise a styled frame
 * marked [SAMPLE REEL]: dull and uncaptioned raw, lit and captioned edited.
 * Moves only while the demo is on screen and motion is allowed.
 */
function Reel({
  mode,
  hook,
  playing,
  assets,
}: {
  mode: Mode;
  hook: string;
  playing: boolean;
  assets: { raw?: string; edited?: string; poster?: string };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = mode === "raw" ? assets.raw : assets.edited;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) void video.play().catch(() => {});
    else video.pause();
  }, [playing, src]);

  const edited = mode === "edited";

  return (
    <div className="relative aspect-[9/16] h-[420px] overflow-hidden rounded-[1.75rem] border-[6px] border-neutral-800 bg-black shadow-2xl">
      {src ? (
        <video
          key={src}
          ref={videoRef}
          src={src}
          poster={assets.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={edited ? "Sample clip, edited" : "Sample clip, raw"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 transition-[filter] duration-500 motion-reduce:transition-none",
            edited
              ? "bg-[radial-gradient(90%_60%_at_30%_25%,rgb(var(--gold)/0.4),transparent_70%),linear-gradient(170deg,#2b2d33,#0d0e10)]"
              : "bg-[linear-gradient(170deg,#3a3b3e,#1c1d1f)] grayscale"
          )}
        >
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[11px] font-semibold tracking-[0.2em] text-white/50">
            [SAMPLE REEL]
          </span>
        </div>
      )}

      {/* The edit's overlays, drawn over the placeholder or a raw clip alike. */}
      {edited && !assets.edited && (
        <div className="svc-mp absolute inset-0" data-play={playing ? "" : undefined}>
          <p className="svc-enter absolute inset-x-3 top-8 rounded-md bg-black/70 px-2 py-1.5 text-center text-[13px] leading-tight font-extrabold text-white" key={hook}>
            {hook}
          </p>
          <span className="absolute inset-x-0 bottom-24 flex justify-center">
            <span className="relative h-7 w-40 text-center text-sm font-extrabold tracking-tight text-white uppercase">
              <span className="svc-a-word1 absolute inset-0 rounded bg-black/60 px-2 py-1">{captionWords[0]}</span>
              <span className="svc-a-word2 absolute inset-0 rounded bg-black/60 px-2 py-1">{captionWords[1]}</span>
              <span className="svc-a-word3 absolute inset-0 rounded bg-brass-400 px-2 py-1 text-neutral-950">
                {captionWords[2]}
              </span>
            </span>
          </span>
        </div>
      )}

      <div className="absolute inset-x-3 top-3 h-1 overflow-hidden rounded-full bg-white/25">
        <span
          className={clsx(
            "block h-full origin-left rounded-full bg-white",
            playing ? (edited ? "svc-reel-fast" : "svc-reel-slow") : "w-full"
          )}
        />
      </div>
      <Heart aria-hidden="true" className={clsx("absolute right-3 bottom-8 h-5 w-5 text-white", edited && "fill-white")} />
      <span className="absolute bottom-3 left-3 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
        {edited ? "0:21 · Edited" : "0:47 · Raw"}
      </span>
    </div>
  );
}
