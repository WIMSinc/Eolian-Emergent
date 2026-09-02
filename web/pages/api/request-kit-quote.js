/**
 * Hardware kit acquisition request.
 *
 * Kits run $21,989–$842,708, which is the wrong shape for card checkout: card
 * networks baulk at six-figure charges, ~2.9% on a Brigade kit is over $24k in
 * fees, and defense buyers procure via PO and wire/ACH. So this endpoint stages
 * a *draft* Stripe Invoice against a customer record and notifies sales. Nobody
 * is charged here, and nothing is sent to the buyer until a human finalises it
 * in the Stripe dashboard — which keeps a procurement/export-review step in the
 * loop by design.
 */

const nodemailer = require("nodemailer");
const { submitToHubSpotForm, getHutk, FORM_GUIDS } = require("../../lib/hubspot");
const { getBySku, formatUsd } = require("../../lib/catalog");

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return false;
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );
  const data = await res.json();
  return data.success && data.score >= 0.5;
}

async function notifySales({ item, qty, name, email, phone, organization, notes, invoiceUrl }) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
    tls: { rejectUnauthorized: false },
  });

  await transporter.sendMail({
    from: `"EolianVR Website" <${smtpUser}>`,
    to: process.env.NOTIFY_EMAIL || "mike@eolianvr.com",
    replyTo: email,
    subject: `[EolianVR] Kit Request: ${item.name} — ${name}`,
    text:
      `New hardware kit acquisition request\n\n` +
      `Item: ${item.name} (${item.sku})\n` +
      `Unit price: ${formatUsd(item.amount)}\n` +
      `Quantity: ${qty}\n` +
      `Total: ${formatUsd(item.amount * qty)}\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "N/A"}\n` +
      `Organization: ${organization || "N/A"}\n\n` +
      `Notes:\n${notes || "(none)"}\n\n` +
      `A DRAFT invoice has been staged in Stripe. Review, confirm export\n` +
      `eligibility, then finalise and send it from the dashboard:\n${invoiceUrl || "(dashboard > Invoices > Drafts)"}\n`,
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sku, quantity, name, email, phone, organization, notes, website, recaptchaToken } =
    req.body || {};

  // Honeypot — silently accept so bots do not learn they were caught.
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Verify before touching Stripe so bot traffic never reaches the API.
  if (!(await verifyRecaptcha(recaptchaToken))) {
    return res.status(403).json({ error: "reCAPTCHA verification failed" });
  }

  const qty = Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 99);

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not configured");
    return res.status(500).json({ error: "Quoting is not configured" });
  }
  const stripe = require("stripe")(secretKey);

  let item;
  try {
    item = await getBySku(stripe, sku, { group: "kit", checkout: "quote" });
  } catch (err) {
    console.error("Catalog lookup failed:", err.message);
    return res.status(502).json({ error: "Could not submit request" });
  }
  if (!item) {
    return res.status(400).json({ error: "Unknown kit SKU" });
  }

  try {
    // Reuse an existing customer where possible so repeat buyers do not
    // fragment into duplicate records.
    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer =
      existing.data[0] ||
      (await stripe.customers.create({
        name,
        email,
        phone: phone || undefined,
        description: organization || undefined,
        metadata: { organization: organization || "", source: "eolianvr.com" },
      }));

    // Create the invoice first and attach the line item to it explicitly.
    // Creating the item first would leave it "pending" on the customer, where
    // it could be swept onto an unrelated invoice — or sweep unrelated pending
    // items onto this one.
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: 30,
      auto_advance: false, // stay a draft — a human finalises and sends
      pending_invoice_items_behavior: "exclude",
      description: `ARTAK hardware acquisition request via eolianvr.com`,
      footer: "Payable by ACH or wire transfer. Contact sales for PO and contract-vehicle options.",
      metadata: {
        sku: item.sku,
        quantity: String(qty),
        organization: organization || "",
        notes: (notes || "").slice(0, 500),
        source: "eolianvr.com",
      },
    });

    // Bill against Stripe's own price rather than a locally held amount, so the
    // invoice can never diverge from the catalog.
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      // `pricing: { price }`, not a bare `price`. Current Stripe API versions
      // reject the flat form on invoice items with "Received unknown parameter:
      // price. Did you mean pricing?" — the shape changed and no apiVersion is
      // pinned here, so the SDK follows whatever is current. Checkout Sessions
      // still take a flat `price` inside line_items; only invoice items moved.
      pricing: { price: item.priceId },
      quantity: qty,
      description: `${item.name} (${item.sku})`,
      metadata: { sku: item.sku },
    });

    await notifySales({
      item,
      qty,
      name,
      email,
      phone,
      organization,
      notes,
      invoiceUrl: invoice.hosted_invoice_url || null,
    });

    // The highest-intent lead on the site — someone asking the price of a kit.
    // Carries the SKU and quantity so the CRM record says what was asked for,
    // not just that somebody asked.
    const hubspot = await submitToHubSpotForm({
      formGuid: FORM_GUIDS.kitQuote,
      values: {
        email,
        firstname: name,
        phone,
        company: organization,
        message: [
          `Kit quote request: ${item?.name || sku}`,
          `Quantity: ${qty}`,
          notes ? `Notes: ${notes}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      },
      hutk: getHutk(req),
      pageUri: req.headers.referer,
      pageName: "Kit quote request",
    });
    if (hubspot.ok === false) {
      console.error("HubSpot kit quote submission failed:", hubspot);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(`Kit quote failed for ${item.sku}:`, err.message);
    return res.status(502).json({ error: "Could not submit request" });
  }
};
