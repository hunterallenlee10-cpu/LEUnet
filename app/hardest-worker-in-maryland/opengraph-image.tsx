import { ogContentType, ogSize, renderLeuOg } from "@/lib/og";
import { META } from "@/data/hardest-worker";

export const alt = META.imageAlt;
export const size = ogSize;
export const contentType = ogContentType;

/** The page's H1 on the LEU card, with Hunter's name beside the logo. */
export default function Image() {
  return renderLeuOg({ line: "The Hardest Worker in Maryland", label: "Hunter Lee" });
}
