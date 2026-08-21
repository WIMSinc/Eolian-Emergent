import { pageMetadata } from "@/lib/seo";
import IPContent from "./IPContent";

export const metadata = pageMetadata({
  title: "Intellectual Property",
  description: "EolianVR's intellectual property portfolio including patents, trademarks, and proprietary technology across AR/VR and defense platforms.",
  path: "/about/intellectual-property",
});

export default function Page() {
  return <IPContent />;
}
