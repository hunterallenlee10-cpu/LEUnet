import { Metadata } from "next";
import { IndustryPage } from "@/components/lee-systems/IndustryPage";
import { leeSystems, leeSystemsIndustries, leeSystemsRoutes } from "@/data/lee-systems";

const { page } = leeSystemsIndustries.find(({ id }) => id === "law-firms")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: {
    canonical: leeSystemsRoutes.lawFirms,
  },
  openGraph: {
    type: "website",
    url: leeSystemsRoutes.lawFirms,
    siteName: leeSystems.name,
    title: page.title,
    description: page.description,
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
  },
};

export default function Page() {
  return <IndustryPage industryId="law-firms" />;
}
