const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, organization } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { ciphers: "SSLv3" },
  });

  const notifyEmail = process.env.NOTIFY_EMAIL || "mike@eolianvr.com";

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: notifyEmail,
    subject: "[EolianVR] New Catalog Download Request",
    text: `New catalog download request from ${name}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nOrganization: ${organization || "N/A"}`,
  });

  return res.status(200).json({ success: true });
};
