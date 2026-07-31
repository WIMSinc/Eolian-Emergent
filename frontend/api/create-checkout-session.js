/**
 * Creates a Stripe Checkout Session for a software subscription SKU.
 *
 * Software only: hardware kits run through request-kit-quote.js instead, since
 * six-figure card charges are impractical and defense buyers pay by PO/wire.
 *
 * Pricing is inline via price_data using amounts from _catalog.js, so this
 * works without any pre-created Stripe Products.
 */

const { getItem, formatUsd } = require("./_catalog");

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

  const item = getItem(sku, "software");
  if (!item) {
    return res.status(400).json({ error: "Unknown or non-purchasable SKU" });
  }

  // Clamp quantity to a sane range; never trust the client with an unbounded int.
  const qty = Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 999);

  const stripe = require("stripe")(secretKey);

  // Prefer the public site origin: *.vercel.app URLs sit behind SSO protection,
  // so a return URL pointing at one would bounce the customer into a login wall.
  const origin =
    process.env.PUBLIC_SITE_URL ||
    (req.headers.origin && /^https:\/\/(www\.)?eolianvr\.com$/.test(req.headers.origin)
      ? req.headers.origin
      : "https://eolianvr.com");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          quantity: qty,
          price_data: {
            currency: "usd",
            unit_amount: item.amount,
            recurring: { interval: item.interval, interval_count: item.intervalCount },
            product_data: {
              name: item.name,
              metadata: { sku: item.sku },
            },
          },
        },
      ],
      // Collected so licences can be tied to an organisation and for export
      // screening on the fulfilment side.
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      client_reference_id: item.sku,
      metadata: { sku: item.sku, quantity: String(qty) },
      subscription_data: { metadata: { sku: item.sku } },
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
