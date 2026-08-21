import { pageMetadata } from "@/lib/seo";
import AboutContent from "./AboutContent";

export const metadata = pageMetadata({
  title: "About EolianVR",
  description: "Learn about EolianVR, Inc. \u2014 pioneers in AR/VR solutions for defense, government, and enterprise. Our mission, values, NAICS codes, and capabilities.",
  path: "/about",
});

export default function Page() {
  return <AboutContent />;
}
