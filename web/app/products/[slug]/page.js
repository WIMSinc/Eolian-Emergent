import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { pageMetadata, productSchema } from "@/lib/seo";
import { getProductBySlug, productSlugs, formatUsd } from "@/lib/products";
import ProductBuyButton from "@/components/ProductBuyButton";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.fallbackName,
    description: p.desc,
    image: p.image,
    path: p.href,
    // Next's Metadata API rejects og:type "product"; the Product/Offer JSON-LD
    // below is what Merchant Center and rich results actually consume.
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  // Product/Offer JSON-LD, server-rendered. This is what Merchant Center and
  // answer engines read; the CRA build could not emit it at all.
  const schema = productSchema({
    name: p.fallbackName,
    description: p.desc,
    image: p.image,
    sku: p.sku,
    amount: p.fallbackAmount,
    path: p.href,
  });

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-zinc-400 hover:text-white uppercase mb-10"
        >
          <ArrowLeft size={12} /> All Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative overflow-hidden border border-zinc-800 bg-[#0A0A0A]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.fallbackName}
              width="800"
              height="500"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
                {p.group === "kit" ? "Hardware Kit" : "Software"} // {p.sku}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              {p.fallbackName}
            </h1>

            <p className="mt-5 text-base text-zinc-400 leading-relaxed">{p.desc}</p>

            <p className="mt-6 font-mono text-2xl text-[#FF0B1B] font-bold">
              {formatUsd(p.fallbackAmount)}
            </p>
            {p.duration && (
              <p className="mt-1 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                {p.duration}
              </p>
            )}

            {p.specs?.length > 0 && (
              <ul className="mt-8 space-y-2 border-t border-zinc-800 pt-6">
                {p.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="text-[#FF0B1B] shrink-0 mt-1" />
                    <span className="text-sm text-zinc-400">{spec}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10">
              <ProductBuyButton sku={p.sku} checkout={p.fallbackCheckout} />
            </div>

            <p className="mt-6 font-mono text-[11px] text-zinc-600 leading-relaxed">
              Pricing shown reflects the published catalogue. Live price and
              availability are confirmed by Stripe at checkout. For contract
              vehicles and volume pricing, see{" "}
              <Link href="/acquire" className="text-zinc-400 hover:text-white underline">
                How to Acquire ARTAK
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
