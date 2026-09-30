"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * The /lee-systems hero's background: a muted five-second loop of a laptop
 * on a desk at night, its dashboard filling with leads (made in the owner's
 * Everygen account, 2026-09-30, the owner's pick over a feed of example
 * notifications). The first frame is the last, so the loop has no seam. It
 * has no sound track, and comes as a WebM (about 70 KB) first and an H.264
 * MP4 (about 0.3 MB) for browsers without WebM, older iPhones among them.
 *
 * It never starts under reduced motion, where the poster (the same first
 * frame) stands in, and it plays only while the hero is on screen. The
 * corner button pauses it for good. That button is the only part a screen
 * reader or keyboard meets, since the picture itself is decoration.
 *
 * On a phone the picture takes a band across the top, fading to black where
 * the copy starts; from md up it fills the hero with the copy on its dark
 * left side. Both shades are `.ls-hero-shade` in app/globals.css.
 */
export function HeroVideoLoop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const el = rootRef.current;
    const observer = el
      ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
      : null;
    if (el && observer) observer.observe(el);
    return () => {
      media.removeEventListener("change", update);
      observer?.disconnect();
    };
  }, []);

  const playing = !reduced && inView && !paused;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      // A browser that refuses even a muted autoplay (a battery saver) keeps
      // the poster, which is the same picture.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <div
      ref={rootRef}
      className="absolute inset-x-0 top-0 h-[24rem] sm:h-[30rem] md:inset-y-0 md:h-auto"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-[80%_50%] md:object-[70%_50%]"
        width={1280}
        height={714}
        poster="/lee-systems/hero/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/lee-systems/hero/hero-loop.webm" type="video/webm" />
        <source src="/lee-systems/hero/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="ls-hero-shade absolute inset-0" aria-hidden="true" />

      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play the background video" : "Pause the background video"}
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-neutral-950/50 text-neutral-300 backdrop-blur-sm transition-colors hover:border-brass-400/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300 md:bottom-6 md:right-6 md:top-auto"
        >
          {paused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
