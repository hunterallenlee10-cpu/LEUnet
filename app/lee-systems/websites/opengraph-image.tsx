import { ogContentType, ogSize, renderLeeSystemsOg } from "@/lib/lee-systems-og";

export const alt = "Lee Systems Co.: website builds";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeeSystemsOg("Websites that bring in customers.");
}
