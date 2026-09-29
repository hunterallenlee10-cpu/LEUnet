import { leeSystems } from "@/data/lee-systems";
import { ogContentType, ogSize, renderLeeSystemsOg } from "@/lib/lee-systems-og";

export const alt = "Lee Systems Co.: business automation and website builds";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeeSystemsOg(`${leeSystems.headline} ${leeSystems.headlineAccent}`);
}
