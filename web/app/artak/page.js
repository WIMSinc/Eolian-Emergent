import { pageMetadata, softwareApplicationSchema } from "@/lib/seo";
import { ALL_PRODUCTS } from "@/lib/products";
import OfferBanner from "@/components/OfferBanner";
import ArtakContent from "./ArtakContent";

export const metadata = pageMetadata({
  title: "ARTAK - Augmented Reality Team Awareness Kit",
  description:
    "ARTAK is a multi-domain joint planning and command & control platform. Synchronizing planning and C2 activities across echelons, domains, and warfighting functions.",
  path: "/artak",
});

// Derived from the same catalogue the product pages price against, so the
// aggregate cannot drift from the per-SKU Offers on /products/<slug>.
const amounts = ALL_PRODUCTS.map((p) => p.fallbackAmount).filter(Boolean);
const schema = softwareApplicationSchema({
  lowPrice: amounts.length ? Math.min(...amounts) : undefined,
  highPrice: amounts.length ? Math.max(...amounts) : undefined,
  offerCount: amounts.length || undefined,
});

// Matches app/page.js: OfferBanner expires itself on a date, and a fully static
// page would freeze that decision at build time.
export const revalidate = 3600;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArtakContent offerBanner={<OfferBanner />} />
    </>
  );
}
