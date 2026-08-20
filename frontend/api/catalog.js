/**
 * Public product catalog — price and name straight from Stripe.
 *
 * Cached at the Vercel edge, so a price change in Stripe reaches the site
 * within the TTL with no redeploy. stale-while-revalidate means visitors never
 * wait on Stripe: they get the cached copy while it refreshes behind them.
 *
 * Deliberately exposes only what a public price list needs. No product IDs
 * beyond the price handle the checkout endpoint already validates server-side,
 * and nothing from products that have not opted in.
 */

const { loadCatalog } = require("./_catalog");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not configured");
    return res.status(500).json({ error: "Catalog unavailable" });
  }

  try {
    const stripe = require("stripe")(secretKey);
    const items = await loadCatalog(stripe);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=1800"
    );
    return res.status(200).json({
      items: items.map((i) => ({
        sku: i.sku,
        group: i.group,
        checkout: i.checkout,
        name: i.name,
        amount: i.amount,
        currency: i.currency,
        features: i.features,
      })),
    });
  } catch (err) {
    console.error("Catalog load failed:", err.message);
    // The frontend falls back to its bundled prices, so a Stripe outage
    // degrades to slightly stale numbers rather than an empty page.
    return res.status(502).json({ error: "Catalog unavailable" });
  }
};
