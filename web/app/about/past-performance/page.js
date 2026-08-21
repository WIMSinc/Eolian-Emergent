import { pageMetadata } from "@/lib/seo";
import PastPerformanceContent from "./PastPerformanceContent";

export const metadata = pageMetadata({
  title: "Past Performance",
  description: "EolianVR's past performance across USSOCOM, DoD, and public safety \u2014 government contracts, SOF exercises, and formal technology assessments.",
  path: "/about/past-performance",
});

export default function Page() {
  return <PastPerformanceContent />;
}
