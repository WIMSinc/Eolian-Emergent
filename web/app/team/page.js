import { pageMetadata } from "@/lib/seo";
import TeamContent from "./TeamContent";

export const metadata = pageMetadata({
  title: "Our Team",
  description: "Meet the EolianVR leadership team \u2014 experts in AR/VR, defense technology, and immersive command & control systems.",
  path: "/team",
});

export default function Page() {
  return <TeamContent />;
}
