import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", organization: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-zinc-800 py-3 px-0 text-sm text-white font-mono placeholder:text-zinc-600 focus:border-[#FF0B1B] focus:outline-none transition-colors duration-300";

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32"
    >
      {/* Subtle grid bg */}
      <div className="absolute inset-0 tactical-grid opacity-50" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
                Contact // Inquiries
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Interested in learning how ARTAK can enhance your organization's
              command and control, mission planning, and situational awareness
              capabilities? Reach out to our team.
            </p>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  data-testid="contact-name-input"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  data-testid="contact-email-input"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    data-testid="contact-phone-input"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    data-testid="contact-org-input"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Company / Unit"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  data-testid="contact-message-input"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className={`${inputClass} resize-none border border-zinc-800 px-4 focus:border-[#FF0B1B]`}
                />
              </div>

              <button
                type="submit"
                data-testid="contact-submit-button"
                disabled={status === "sending"}
                className="w-full bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === "sending" ? (
                  "Transmitting..."
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={16} /> Message Sent
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={16} /> Error — Try Again
                  </>
                ) : (
                  <>
                    <Send size={16} /> Submit Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
