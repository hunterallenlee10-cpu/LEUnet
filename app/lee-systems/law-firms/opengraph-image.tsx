import { ogContentType, ogSize, renderLeeSystemsOg } from "@/lib/lee-systems-og";
import { leeSystemsIndustries } from "@/data/lee-systems";

export const alt = "Lee Systems Co.: automation for law firms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const industry = leeSystemsIndustries.find(({ id }) => id === "law-firms")!;
  return renderLeeSystemsOg(industry.summary);
}
