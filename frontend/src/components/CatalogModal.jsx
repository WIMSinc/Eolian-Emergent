import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Send, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CatalogModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const { data } = await axios.post(`${API}/catalog-request`, form);
      setStatus("success");
      setTimeout(() => { window.open(data.download_url, "_blank"); }, 500);
    } catch {
      setStatus("success");
      window.open("https://hubs.ly/Q04hl6L40", "_blank");
    }
  };

  const inputCls = "w-full bg-transparent border border-zinc-800 py-2.5 px-3 text-sm text-white font-mono placeholder:text-zinc-700 focus:border-[#FF0B1B] focus:outline-none transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="catalog-modal">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="relative w-full max-w-md bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8">
            <button onClick={onClose} data-testid="catalog-modal-close" className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"><X size={18} /></button>
            {status === "success" ? (
              <div className="text-center py-8" data-testid="catalog-success">
                <CheckCircle size={32} className="text-[#FF0B1B] mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-2">Download Ready</h3>
                <p className="text-sm text-zinc-400 mb-6">Your catalog is downloading. Thank you for your interest.</p>
                <button onClick={onClose} className="font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">Close</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2"><Download size={16} className="text-[#FF0B1B]" /><span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Product Catalog // 2026</span></div>
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-2">ARTAK Product Catalog</h3>
                <p className="text-sm text-zinc-400 mb-6">Fill out the form below to download the full ARTAK product catalog.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Name *</label>
                    <input data-testid="catalog-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Email *</label>
                    <input data-testid="catalog-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Phone</label>
                      <input data-testid="catalog-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 000-0000" className={inputCls} />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Organization</label>
                      <input data-testid="catalog-org" type="text" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Company / Unit" className={inputCls} />
                    </div>
                  </div>
                  <button type="submit" data-testid="catalog-submit" disabled={status === "sending"} className="w-full bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-3.5 hover:bg-[#D90412] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                    {status === "sending" ? <><Loader2 size={14} className="animate-spin" /> Processing...</> : <><Send size={14} /> Download Catalog</>}
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
