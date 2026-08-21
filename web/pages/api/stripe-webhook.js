/**
 * Stripe webhook receiver.
 *
 * IMPORTANT — point the Stripe endpoint at the custom domain:
 *   https://eolianvr.com/api/stripe-webhook
 * This project has Vercel SSO protection enabled for "all except custom
 * domains", so a *.vercel.app webhook URL would be intercepted by the login
 * wall and every delivery would fail.
 *
 * Signature verification needs the exact bytes Stripe signed, so body parsing
 * is disabled below and the raw buffer is read with raw-body.
 */

const nodemailer = require("nodemailer");
const { formatUsd } = require("../../lib/catalog");

/**
 * Collect the unparsed request body.
 *
 * Deliberately dependency-free: raw-body v4 is ESM-only, and `require`-ing it
 * from these CommonJS functions throws ERR_REQUIRE_ESM at module load, which
 * surfaces as FUNCTION_INVOCATION_FAILED rather than anything diagnosable.
 *
 * Never touch req.body in this handler — on Vercel's Node runtime that getter
 * parses (and consumes) the stream on first access, which would leave nothing
 * to verify the signature against.
 */
function readRawBody(req) {
  if (req.readableEnded) {
    // The stream was already drained, so the exact signed bytes are gone and
    // any signature check would be meaningless. Fail loudly instead.
    return Promise.reject(new Error("Request body already consumed"));
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function email(subject, text) {
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
    subject,
    text,
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    console.error("Stripe webhook is not configured");
    return res.status(500).json({ error: "Not configured" });
  }

  const stripe = require("stripe")(secretKey);

  let event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, req.headers["stripe-signature"], webhookSecret);
  } catch (err) {
    // Unverified payload — never act on it.
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: "Invalid signature" });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object;
        await email(
          `[EolianVR] Software purchase: ${s.metadata?.sku || "unknown SKU"}`,
          `A software subscription was purchased.\n\n` +
            `SKU: ${s.metadata?.sku || "unknown"}\n` +
            `Quantity: ${s.metadata?.quantity || "1"}\n` +
            `Amount: ${formatUsd(s.amount_total || 0)}\n` +
            `Customer: ${s.customer_details?.name || "N/A"} <${s.customer_details?.email || "N/A"}>\n` +
            `Phone: ${s.customer_details?.phone || "N/A"}\n` +
            `Session: ${s.id}\n\n` +
            `Confirm export eligibility before provisioning licences.\n`
        );
        break;
      }

      case "invoice.paid": {
        const inv = event.data.object;
        await email(
          `[EolianVR] Invoice paid: ${inv.metadata?.sku || inv.number || inv.id}`,
          `An invoice was paid.\n\n` +
            `SKU: ${inv.metadata?.sku || "N/A"}\n` +
            `Invoice: ${inv.number || inv.id}\n` +
            `Amount paid: ${formatUsd(inv.amount_paid || 0)}\n` +
            `Customer: ${inv.customer_name || "N/A"} <${inv.customer_email || "N/A"}>\n` +
            `${inv.hosted_invoice_url || ""}\n`
        );
        break;
      }

      case "invoice.payment_failed": {
        const inv = event.data.object;
        await email(
          `[EolianVR] Invoice payment FAILED: ${inv.number || inv.id}`,
          `Payment failed for invoice ${inv.number || inv.id}.\n` +
            `Customer: ${inv.customer_name || "N/A"} <${inv.customer_email || "N/A"}>\n` +
            `Amount due: ${formatUsd(inv.amount_due || 0)}\n` +
            `${inv.hosted_invoice_url || ""}\n`
        );
        break;
      }

      default:
        // Unhandled event types are acknowledged so Stripe stops retrying.
        break;
    }
  } catch (err) {
    // The event was valid but our side-effect failed. Return 500 so Stripe
    // retries rather than silently dropping a real purchase notification.
    console.error(`Handler failed for ${event.type}:`, err.message);
    return res.status(500).json({ error: "Handler failed" });
  }

  return res.status(200).json({ received: true });
};

// Stripe signs the raw bytes; Vercel's default JSON parsing would destroy them.
module.exports.config = {
  api: { bodyParser: false },
};
