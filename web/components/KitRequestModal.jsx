"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Loader2, ShoppingCart } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";

/**
 * Acquisition request for hardware kits. Kits are six-figure defense hardware,
 * so this stages a draft invoice for sales to review rather than charging a
 * card — see api/request-kit-quote.js.
 */
export default function KitRequestModal({ kit, onClose }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    quantity: 1,
    notes: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Reset when a different kit is opened.
  useEffect(() => {
    if (kit) {
      setStatus("idle");
      setError("");
    }
  }, [kit]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus("sending");
      setError("");
      try {
        const token = executeRecaptcha ? await executeRecaptcha("kit_request") : "";
        await axios.post("/api/request-kit-quote", {
          ...form,
          sku: kit.sku,
          recaptchaToken: token,
        });
        setStatus("success");
      } catch (err) {
        setStatus("idle");
        setError(
          err?.response?.data?.error || "Could not submit your request. Please try again or contact us directly."
        );
      }
    },
    [executeRecaptcha, form, kit]
  );

  const inputCls =
    "w-full bg-transparent border border-zinc-800 py-2.5 px-3 text-sm text-white font-mono placeholder:text-zinc-700 focus:border-[#FF0B1B] focus:outline-none transition-colors";
  const labelCls = "font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase block mb-1.5";

  return (
    <AnimatePresence>
      {kit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid="kit-request-modal"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8"
          >
            <button
              onClick={onClose}
              data-testid="kit-request-close"
              aria-label="Close"
              className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <div className="text-center py-8" data-testid="kit-request-success">
                <CheckCircle size={32} className="text-[#FF0B1B] mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-2">Request Received</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Our team will review your request and follow up with a formal quote and procurement options.
                </p>
                <button
                  onClick={onClose}
                  className="font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingCart size={16} className="text-[#FF0B1B]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                    Acquisition Request // {kit.label}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-1">{kit.name}</h3>
                <p className="font-mono text-lg text-[#FF0B1B] font-bold mb-3">{kit.price}</p>
                <p className="text-sm text-zinc-400 mb-6">
                  Hardware kits are quoted and invoiced directly. Submit your details and our team will follow up
                  with a formal quote, payable by ACH or wire.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                    aria-hidden="true"
                  />

                  <div>
                    <label className={labelCls} htmlFor="kit-name">Name *</label>
                    <input
                      id="kit-name"
                      data-testid="kit-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="kit-email">Email *</label>
                    <input
                      id="kit-email"
                      data-testid="kit-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls} htmlFor="kit-phone">Phone</label>
                      <input
                        id="kit-phone"
                        data-testid="kit-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="kit-qty">Quantity</label>
                      <input
                        id="kit-qty"
                        data-testid="kit-quantity"
                        type="number"
                        min="1"
                        max="99"
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="kit-org">Organization / Unit</label>
                    <input
                      id="kit-org"
                      data-testid="kit-org"
                      type="text"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="Agency, unit, or company"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="kit-notes">Requirements</label>
                    <textarea
                      id="kit-notes"
                      data-testid="kit-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Configuration needs, timeline, contract vehicle..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {error && (
                    <p className="font-mono text-[11px] text-[#FF0B1B]" role="alert" data-testid="kit-request-error">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    data-testid="kit-request-submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-3.5 hover:bg-[#FF0B1B] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                    ) : (
                      <><Send size={14} /> Request Quote</>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
