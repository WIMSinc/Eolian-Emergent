import { KITS, SOFTWARE, formatUsd } from "@/data/productCatalog";

/**
 * Adds per-product URLs to the catalog.
 *
 * The CRA site rendered products only as cards inside a grid, so no product
 * had a URL of its own. Google Merchant Center wants a unique, crawlable
 * landing page per item, and answer engines need somewhere to point — hence
 * /products/<slug>.
 *
 * Slugs derive from the fallback name rather than the SKU: `artak-upt-kit`
 * reads better and carries more keyword weight than `kit-01`. Stripe stays the
 * source of truth for live price and name; the local fallback is what gets
 * prerendered, and the client refreshes it from /api/catalog.
 */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[().]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function decorate(item, group) {
  return {
    ...item,
    group,
    slug: slugify(item.fallbackName),
    href: `/products/${slugify(item.fallbackName)}`,
  };
}

export const KIT_PRODUCTS = KITS.map((k) => decorate(k, "kit"));
export const SOFTWARE_PRODUCTS = SOFTWARE.map((s) => decorate(s, "software"));
export const ALL_PRODUCTS = [...KIT_PRODUCTS, ...SOFTWARE_PRODUCTS];

export const productSlugs = ALL_PRODUCTS.map((p) => p.slug);

export function getProductBySlug(slug) {
  return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
}

export { formatUsd };
