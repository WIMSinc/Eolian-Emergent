const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, organization, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notifyEmail = process.env.NOTIFY_EMAIL || "mike@eolianvr.com";

  if (!smtpUser || !smtpPass) {
    console.error("SMTP credentials not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.office365.com",
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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err.message);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
};
