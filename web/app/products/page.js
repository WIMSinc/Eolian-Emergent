import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { KIT_PRODUCTS, SOFTWARE_PRODUCTS, ALL_PRODUCTS, formatUsd } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "ARTAK hardware kits and software licences — from the man-portable UPT Kit to Brigade HQ deployments, plus front-end and backend software subscriptions.",
  path: "/products",
});

// ItemList gives crawlers and answer engines the full catalogue from one URL,
// and gives every product page an internal link.
const listSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ARTAK Products",
  itemListElement: ALL_PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}${p.href}`,
    name: p.fallbackName,
  })),
};

function Grid({ title, eyebrow, items }) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-[#FF0B1B]" />
        <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">{eyebrow}</span>
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
        {items.map((p) => (
          <Link
            key={p.sku}
            href={p.href}
            className="bg-[#0A0A0A] group relative overflow-hidden block hover:bg-[#0D0D0D] transition-colors"
          >
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.fallbackName}
                width="600"
                height="380"
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
              <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">
                {p.sku}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-base font-semibold text-white uppercase tracking-wide mb-2">
                {p.fallbackName}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3">{p.desc}</p>
              <p className="font-mono text-lg text-[#FF0B1B] font-bold mb-3">
                {formatUsd(p.fallbackAmount)}
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-zinc-400 group-hover:text-[#FF0B1B] uppercase transition-colors">
                View Details <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="pt-32 pb-24 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
          Products
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl mb-14">
          ARTAK deploys as a complete hardware kit or as software licences for
          hardware you already own. Every kit ships with a 3-year software
          subscription, training, and support.
        </p>
        <Grid eyebrow="Acquire Online // Hardware Kits" title="ARTAK Kits" items={KIT_PRODUCTS} />
        <Grid
          eyebrow="Acquire Online // Software Packages"
          title="Software Licences"
          items={SOFTWARE_PRODUCTS}
        />
      </div>
    </main>
  );
}
