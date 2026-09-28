/**
 * The scan sequence's cycle length, in seconds.
 *
 * MUST MATCH the duration on `.ls-scan-track`, `.ls-scan-dot`,
 * `.ls-scan-badge` and `.ls-scan-label` in app/globals.css. The keyframes
 * there are written as percentages of this number, and every consumer offsets
 * its stops by `LS_SCAN_CYCLE_SECONDS / <number of stops>` - which is what
 * sequences them, so a row's dot reaches the bottom of its segment exactly as
 * the next row's cycle begins and the stops read as one dot moving rather
 * than three.
 *
 * Kept in its own module so the number sits in one importable place rather
 * than as a bare 10.5 in a component, where retuning the stylesheet would
 * desynchronise the diagram silently. `BrowserFrameVisual` (the websites page
 * hero) is the one consumer today.
 */
export const LS_SCAN_CYCLE_SECONDS = 10.5;
