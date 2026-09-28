import { ogContentType, ogSize, renderLeeSystemsOg } from "@/lib/lee-systems-og";
import { leeSystemsIndustries } from "@/data/lee-systems";

export const alt = "Lee Systems Co.: automation for home services and roofing";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const industry = leeSystemsIndustries.find(({ id }) => id === "home-services")!;
  return renderLeeSystemsOg(industry.summary);
}
