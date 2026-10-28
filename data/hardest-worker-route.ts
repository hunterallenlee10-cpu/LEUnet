/**
 * The few "Hardest Worker in Maryland" page values other files need: its
 * path and its footer link label. Kept apart from data/hardest-worker.ts so
 * the footer (data/navigation.ts) doesn't pull the page's copy into every
 * page's JavaScript.
 */

export const SLUG = "hardest-worker-in-maryland";
export const PAGE_PATH = `/${SLUG}`;

/** The footer link. */
export const LINK_LABEL = "Hardest Worker in Maryland";
