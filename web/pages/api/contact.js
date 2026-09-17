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

  const { name, email, phone, organization, message, _hp, recaptchaToken } = req.body || {};

  // Honeypot. Still answers 200 so a bot cannot tell it was caught, but it no
  // longer does so silently: this was the only branch in the route with no
  // output, which made a discarded submission indistinguishable from a
  // delivered one in the Vercel logs. A real submission was silently dropped
  // on 2026-09-17 and it took a HubSpot query to work out which branch ran.
  //
  // The field is `_hp`, not `website`: password managers and browser autofill
  // populate anything named website/url regardless of autocomplete="off", so
  // the old name let a human trip a bot trap.
  if (_hp) {
    console.warn("Honeypot triggered — submission discarded", {
      route: "contact",
      hp: String(_hp).slice(0, 80),
      ua: req.headers["user-agent"],
    });
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
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
      subject: `[EolianVR] New Contact: ${name}`,
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nOrganization: ${organization || "N/A"}\n\nMessage:\n${message}`,
    });

    // CRM write after the email, and never in front of it: the visitor is
    // waiting on the email path, and a HubSpot failure is not a reason to tell
    // them their message did not send. Runs after reCAPTCHA so spam does not
    // reach the CRM.
    const hubspot = await submitToHubSpotForm({
      formGuid: FORM_GUIDS.contact,
      values: { email, firstname: name, phone, company: organization, message },
      hutk: getHutk(req),
      pageUri: req.headers.referer,
      pageName: "Contact form",
    });
    if (hubspot.ok === false) {
      console.error("HubSpot contact submission failed:", hubspot);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err.message);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
};
