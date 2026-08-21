import { pageMetadata } from "@/lib/seo";
import AcquireContent from "./AcquireContent";

export const metadata = pageMetadata({
  title: "How to Acquire ARTAK",
  description: "A step-by-step guide for DoD units and contracting officers on purchasing the ARTAK Squad Kit using Simplified Acquisition Procedures under FAR Part 13.",
  path: "/acquire",
});

export default function Page() {
  return <AcquireContent />;
}
