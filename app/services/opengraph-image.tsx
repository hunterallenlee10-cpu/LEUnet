import { ogContentType, ogSize, renderLeeSystemsOg } from "@/lib/lee-systems-og";

export const alt = "Lee Systems Co.: everything we build, in one place";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeeSystemsOg("Everything Lee Systems Co. builds, in one place.");
}
