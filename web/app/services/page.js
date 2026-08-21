import { pageMetadata } from "@/lib/seo";
import ServicesContent from "./ServicesContent";

export const metadata = pageMetadata({
  title: "Services",
  description: "EolianVR offers ARTAK platform licensing, custom AR/VR/MR development, systems integration, immersive training, and professional government contracting services.",
  path: "/services",
});

export default function Page() {
  return <ServicesContent />;
}
