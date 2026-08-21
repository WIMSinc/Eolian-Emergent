import { pageMetadata } from "@/lib/seo";
import NationalSecurityContent from "./NationalSecurityContent";

export const metadata = pageMetadata({
  title: "ARTAK - National Security & Public Safety",
  description: "ARTAK is a next-generation immersive C2 platform for disaster response, search & rescue, security, law enforcement, fire services, and space operations.",
  path: "/artak/national-security",
});

export default function Page() {
  return <NationalSecurityContent />;
}
