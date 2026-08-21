import { pageMetadata } from "@/lib/seo";
import ArtakContent from "./ArtakContent";

export const metadata = pageMetadata({
  title: "ARTAK - Augmented Reality Team Awareness Kit",
  description: "ARTAK is a multi-domain joint planning and command & control platform. Synchronizing planning and C2 activities across echelons, domains, and warfighting functions.",
  path: "/artak",
});

export default function Page() {
  return <ArtakContent />;
}
