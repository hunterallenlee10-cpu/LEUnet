/**
 * The scan sequence's cycle length, in seconds.
 *
 * MUST MATCH the duration on `.lmm-scan-dot`, `.lmm-scan-badge` and
 * `.lmm-scan-label` in app/globals.css. The keyframes there are written as
 * percentages of this number, and every consumer offsets its stops by
 * `LMM_SCAN_CYCLE_SECONDS / <number of stops>` - which is what sequences them,
 * so a row's dot reaches the bottom of its segment exactly as the next row's
 * cycle begins and the stops read as one dot moving rather than three.
 *
 * This lives in its own module because three components now drive the same CSS:
 * `BrowserFrameVisual` (the websites page hero), `MiniConvertVisual` (the hub's
 * websites door card) and `HubHeroSection` (the hub's offering switch). Each
 * declared its own copy of 10.5 for a while, which meant retuning the animation
 * required finding four places - the three copies and the stylesheet - and
 * missing one desynchronised a diagram silently, with no type error and no
 * failing build. One import, one number.
 */
export const LMM_SCAN_CYCLE_SECONDS = 10.5;
