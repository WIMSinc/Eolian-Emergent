import { pageMetadata } from "@/lib/seo";
import SupportContent from "./SupportContent";

export const metadata = pageMetadata({
  title: "Support",
  description: "Mission-critical support for ARTAK deployments. Submit tickets, access documentation, FAQs, and 24/7 emergency hotline.",
  path: "/support",
});

export default function Page() {
  return <SupportContent />;
}
