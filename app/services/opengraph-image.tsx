import { ogContentType, ogSize, renderLeeSystemsOg } from "@/lib/lee-systems-og";

export const alt = "Lee Enterprises Unlimited: everything we build, in one place";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeeSystemsOg("Everything we build, in one place.");
}
