import { pageMetadata, faqSchema } from "@/lib/seo";
import { faqs } from "@/data/supportFaqs";
import SupportContent from "./SupportContent";

export const metadata = pageMetadata({
  title: "Support",
  description: "Mission-critical support for ARTAK deployments. Submit tickets, access documentation, FAQs, and 24/7 emergency hotline.",
  path: "/support",
});

// FAQPage JSON-LD built from the same entries the page renders — answer
// engines and rich results both read this, and it costs nothing to emit.
const schema = faqSchema(
  faqs.map((f) => ({ question: f.title, answer: f.content }))
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SupportContent />
    </>
  );
}
