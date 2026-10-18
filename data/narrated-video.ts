/**
 * The shape of the narrated videos on /how-it-works: "Two paths" (a lead
 * handled by hand, then with AI) and the website video under it (a visit to
 * an outdated site, then to one built right). Both play in the same frame
 * (components/lee-systems/NarratedVideo.tsx): a line either side of two runs
 * of the same example, the worse way first.
 *
 * Plain types only (no enums): scripts/build-video-audio.mjs imports the
 * video files with Node's type stripping.
 */

/** "before" is the worse run, "after" the one LEU builds. */
export type VideoChapter = "intro" | "before" | "after" | "outro";

export type PanelStatus = "idle" | "ringing" | "good" | "bad";

export interface VideoLine {
  /** Names the line's clip, its time in the timing file and its sounds. */
  id: string;
  chapter: VideoChapter;
  /**
   * How the caption is set: "prompt" and "title" lines are the big italic
   * lines that open the video and each run, "step" lines narrate, and
   * "ending" lines close a run.
   */
  kind: "prompt" | "title" | "step" | "ending";
  /** The caption, exactly as shown. */
  caption: string;
  /** What the voice reads, where it differs from the caption. */
  spoken?: string;
  /** Each panel's state while the line shows, left to right. */
  status: [PanelStatus, PanelStatus, PanelStatus];
  /** The panel the line is about, lit while it shows. */
  focus?: number;
  /** Seconds of quiet after the line is read, before the next one. */
  hold: number;
}

/** What the audio build writes: the soundtrack and when each line starts. */
export interface VideoTiming {
  src: string;
  durationMs: number;
  lines: Record<string, number>;
}
