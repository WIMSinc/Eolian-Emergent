const nodemailer = require("nodemailer");
const { submitToHubSpotForm, getHutk, FORM_GUIDS } = require("../../lib/hubspot");

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return false;
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, { method: "POST" });
  const data = await res.json();
  return data.success && data.score >= 0.5;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, organization, website, recaptchaToken } = req.body || {};

  // Honeypot check
  if (website) {
    return res.status(200).json({ success: true }); // silently discard
  }

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // reCAPTCHA verification
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(403).json({ error: "reCAPTCHA verification failed" });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notifyEmail = process.env.NOTIFY_EMAIL || "mike@eolianvr.com";

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"EolianVR Website" <${smtpUser}>`,
      to: notifyEmail,
      replyTo: email,
      subject: `[EolianVR] Catalog Request: ${name}`,
      text: `New catalog download request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nOrganization: ${organization || "N/A"}`,
    });

    const hubspot = await submitToHubSpotForm({
      formGuid: FORM_GUIDS.catalog,
      values: { email, firstname: name, phone, company: organization },
      hutk: getHutk(req),
      pageUri: req.headers.referer,
      pageName: "Catalog request",
    });
    if (hubspot.ok === false) {
      console.error("HubSpot catalog submission failed:", hubspot);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err.message);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
};
