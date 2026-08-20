/**
 * Stripe-backed product catalog.
 *
 * Stripe is the source of truth for price and name. Products opt in to the
 * website by carrying metadata:
 *
 *   website_sku      KIT.01 … SW.05   join key to local copy/images
 *   website_visible  "true"           opt-in flag
 *   website_group    kit | software   which grid it renders in
 *   website_order    10, 20, 30 …     sort order
 *
 * Opt-in is deliberate. The account also holds archived defense-contract SKUs,
 * a custom demo kit, and legacy accessories; with opt-out semantics a missing
 * flag would publish them. Here the worst failure is a product not appearing.
 *
 * Descriptions and images are NOT synced — those live in the frontend so the
 * site keeps its curated copy and its own optimised WebPs.
 */

const CACHE_TTL_MS = 5 * 60 * 1000;

// Serverless instances are reused between invocations, so this cache survives
// across requests on a warm instance. The CDN in front of /api/catalog does the
// heavy lifting; this just avoids hammering Stripe on cache-miss bursts.
let cache = { at: 0, items: null };

function formatUsd(cents) {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function toItem(product) {
  const price = product.default_price;
  // A product with no resolved default price cannot be transacted. Skip it
  // rather than rendering a card with a missing or guessed amount.
  if (!price || typeof price !== "object" || !price.active) return null;

  const md = product.metadata || {};
  return {
    sku: md.website_sku,
    group: md.website_group,
    order: parseInt(md.website_order, 10) || 999,
    name: md.website_title || product.name,
    productId: product.id,
    priceId: price.id,
    amount: price.unit_amount,
    currency: price.currency,
    // Stripe's structured promo field — drives the badge on the card, so promos
    // can be changed in Stripe with no code change or redeploy.
    features: (product.marketing_features || []).map((f) => f.name).filter(Boolean),
    recurring: price.recurring
      ? { interval: price.recurring.interval, count: price.recurring.interval_count }
      : null,
  };
}

async function loadCatalog(stripe, { force = false } = {}) {
  if (!force && cache.items && Date.now() - cache.at < CACHE_TTL_MS) {
    return cache.items;
  }

  const res = await stripe.products.search({
    query: "active:'true' AND metadata['website_visible']:'true'",
    limit: 100,
    expand: ["data.default_price"],
  });

  // Group first, then website_order, then amount. Both groups number from 10,
  // so sorting on order alone interleaves kits and software — harmless for the
  // site (which orders from its own local arrays) but confusing for anything
  // else reading the endpoint.
  const GROUP_RANK = { kit: 0, software: 1 };

  const items = res.data
    .map(toItem)
    .filter((i) => i && i.sku && i.group in GROUP_RANK)
    .sort(
      (a, b) =>
        GROUP_RANK[a.group] - GROUP_RANK[b.group] ||
        a.order - b.order ||
        a.amount - b.amount
    );

  cache = { at: Date.now(), items };
  return items;
}

async function getBySku(stripe, sku, expectedGroup) {
  if (!sku) return null;
  const items = await loadCatalog(stripe);
  const item = items.find((i) => i.sku === sku);
  if (!item) return null;
  if (expectedGroup && item.group !== expectedGroup) return null;
  return item;
}

module.exports = { loadCatalog, getBySku, formatUsd, CACHE_TTL_MS };
