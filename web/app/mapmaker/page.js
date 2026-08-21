import { pageMetadata } from "@/lib/seo";
import MapMakerContent from "./MapMakerContent";

export const metadata = pageMetadata({
  title: "Map Maker — 3D Digital Twin Creation",
  description: "ARTAK Map Maker transforms raw sensor data — drone imagery, LiDAR, video, sonar, satellite — into photorealistic 3D digital twins in minutes.",
  path: "/mapmaker",
});

export default function Page() {
  return <MapMakerContent />;
}
