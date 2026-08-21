import { pageMetadata } from "@/lib/seo";
import AwardsContent from "./AwardsContent";

export const metadata = pageMetadata({
  title: "Awards & Recognition",
  description: "EolianVR's awards and recognition in defense technology, AR/VR innovation, and immersive command & control.",
  path: "/about/awards",
});

export default function Page() {
  return <AwardsContent />;
}
