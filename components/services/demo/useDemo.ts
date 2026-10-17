"use client";

import { useCallback, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import type { ServiceSlug } from "@/data/services";
import { useInView } from "@/lib/hooks/useInView";
import { usePageVisible, useReducedMotion } from "@/lib/hooks/useMediaState";

/**
 * The clock every demo runs on. A demo is a list of steps (frames), each
 * held for its duration in milliseconds; the demo draws whatever its current
 * `step` says, and the last step is the result frame. The hook only counts.
 *
 * - It starts on its own the first time at least a third of the demo is on
 *   screen (unless `autoplay` is off, for a demo that needs input first),
 *   and only runs while the demo is on screen and the browser tab is
 *   visible. Off screen or in a hidden tab it holds its place.
 * - Under prefers-reduced-motion it never runs by itself: it opens on the
 *   result frame, and "Step through" walks the frames one "Next" at a time.
 * - `demo_play` goes to Vercel Analytics when a visitor presses Play,
 *   Replay or Step through, not when a demo starts by itself.
 */

export type DemoStatus = "idle" | "playing" | "paused" | "done" | "stepping";

interface DemoState {
  step: number;
  status: DemoStatus;
  /** Whether a visitor started this run, so step captions are announced. */
  byVisitor: boolean;
}

/** Goes on the demo's outer element: the hook watches it to know when the
 *  demo is on screen. Kept out of `Demo` so the state object stays plain. */
export type DemoFrameRef = (node: HTMLDivElement | null) => void;

export interface Demo {
  service: ServiceSlug;
  step: number;
  last: number;
  status: DemoStatus;
  reduced: boolean;
  byVisitor: boolean;
  /** True once the demo has reached step `n`. */
  reached: (n: number) => boolean;
  play: () => void;
  pause: () => void;
  replay: () => void;
  stepThrough: () => void;
  next: () => void;
  /** Back to the start, for a demo whose input changed (a new scenario). */
  restart: (byVisitor?: boolean) => void;
}

export function useDemo({
  service,
  durations,
  autoplay = true,
}: {
  service: ServiceSlug;
  /** How long each step is held, in ms. Define it outside the component. */
  durations: readonly number[];
  autoplay?: boolean;
}): [DemoFrameRef, Demo] {
  const reduced = useReducedMotion();
  const pageVisible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const last = durations.length - 1;
  const active = inView && pageVisible;

  const [state, setState] = useState<DemoState>({
    step: 0,
    status: "idle",
    byVisitor: false,
  });

  // Reduced motion opens on the result. Adjusted during render rather than in
  // an effect, so the first painted frame is already the right one.
  if (reduced && state.status === "idle") {
    setState({ step: last, status: "done", byVisitor: false });
  }

  // The first time it is on screen, it starts by itself.
  if (autoplay && !reduced && active && state.status === "idle") {
    setState({ step: 0, status: "playing", byVisitor: false });
  }

  useEffect(() => {
    if (state.status !== "playing" || !active) return;
    const timer = window.setTimeout(() => {
      setState((current) => {
        if (current.status !== "playing") return current;
        const step = current.step + 1;
        return step >= last
          ? { ...current, step: last, status: "done" }
          : { ...current, step };
      });
    }, durations[state.step] ?? 1000);
    return () => window.clearTimeout(timer);
  }, [state.status, state.step, active, durations, last]);

  const play = useCallback(() => {
    setState((current) =>
      current.status === "paused"
        ? { ...current, status: "playing", byVisitor: true }
        : { step: 0, status: "playing", byVisitor: true },
    );
    track("demo_play", { service });
  }, [service]);

  const pause = useCallback(() => {
    setState((current) =>
      current.status === "playing" ? { ...current, status: "paused" } : current,
    );
  }, []);

  const stepThrough = useCallback(() => {
    setState({ step: 0, status: "stepping", byVisitor: true });
    track("demo_play", { service });
  }, [service]);

  const replay = useCallback(() => {
    if (reduced) {
      stepThrough();
      return;
    }
    setState({ step: 0, status: "playing", byVisitor: true });
    track("demo_play", { service });
  }, [reduced, service, stepThrough]);

  const next = useCallback(() => {
    setState((current) => {
      const step = Math.min(current.step + 1, last);
      return { ...current, step, status: step >= last ? "done" : "stepping" };
    });
  }, [last]);

  const restart = useCallback(
    (byVisitor = true) => {
      setState(
        reduced
          ? { step: last, status: "done", byVisitor }
          : { step: 0, status: "playing", byVisitor },
      );
    },
    [reduced, last],
  );

  return [
    ref,
    {
      service,
      step: state.step,
      last,
      status: state.status,
      reduced,
      byVisitor: state.byVisitor,
      reached: (n: number) => state.step >= n,
      play,
      pause,
      replay,
      stepThrough,
      next,
      restart,
    },
  ];
}
