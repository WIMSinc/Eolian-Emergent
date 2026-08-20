/**
 * Creates a Stripe Checkout Session for a software SKU.
 *
 * Software only — hardware kits go through request-kit-quote.js, since
 * six-figure card charges are impractical and defense buyers procure via PO
 * and wire/ACH.
 *
 * The browser sends only a SKU. The amount is never accepted from the request:
 * the SKU is resolved against Stripe and the session is built from Stripe's own
 * price ID, so the charge cannot diverge from the catalog.
 */

const { getBySku, formatUsd } = require("./_catalog");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not configured");
    return res.status(500).json({ error: "Payments are not configured" });
  }

  const { sku, quantity } = req.body || {};
  const stripe = require("stripe")(secretKey);

  let item;
  try {
    item = await getBySku(stripe, sku, "software");
  } catch (err) {
    console.error("Catalog lookup failed:", err.message);
    return res.status(502).json({ error: "Could not start checkout" });
  }

  if (!item) {
    return res.status(400).json({ error: "Unknown or non-purchasable SKU" });
  }

  // Clamp quantity; never trust the client with an unbounded integer.
  const qty = Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 999);

  // Terms are sold as one-time prepaid licences: a DoD unit paying from a
  // one-year O&M appropriation cannot commit to an auto-renewing charge in a
  // future fiscal year. Recurring is still honoured if a price is configured
  // that way in Stripe, so switching a SKU later needs no code change.
  const mode = item.recurring ? "subscription" : "payment";

  // *.vercel.app sits behind SSO protection, so a return URL pointing at one
  // would bounce the customer into a login wall.
  const origin =
    process.env.PUBLIC_SITE_URL ||
    (req.headers.origin && /^https:\/\/(www\.)?eolianvr\.com$/.test(req.headers.origin)
      ? req.headers.origin
      : "https://eolianvr.com");

  try {
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: item.priceId, quantity: qty }],
      // Collected so licences can be tied to an organisation and for export
      // screening on the fulfilment side.
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      client_reference_id: item.sku,
      metadata: { sku: item.sku, quantity: String(qty), product: item.productId },
      ...(mode === "subscription"
        ? { subscription_data: { metadata: { sku: item.sku } } }
        : { payment_intent_data: { metadata: { sku: item.sku } } }),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancelled?sku=${encodeURIComponent(item.sku)}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(
      `Checkout session failed for ${item.sku} (${formatUsd(item.amount)}):`,
      err.message
    );
    return res.status(502).json({ error: "Could not start checkout" });
  }
};
