import { pageMetadata } from "@/lib/seo";
import LabContent from "./LabContent";

export const metadata = pageMetadata({
  title: "The Lab",
  description: "EolianVR's innovation lab \u2014 experiments, research, and prototype testing for next-generation AR/VR defense and public safety applications.",
  path: "/lab",
});

export default function Page() {
  return <LabContent />;
}
