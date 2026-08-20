import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, ShoppingCart, Loader2, Tag } from "lucide-react";
import axios from "axios";
import CatalogModal from "@/components/CatalogModal";
import KitRequestModal from "@/components/KitRequestModal";
import { KITS, SOFTWARE, formatUsd, mergeCatalog } from "@/data/productCatalog";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
};

/** Promo badge driven by Stripe's marketing_features — no redeploy to change. */
function FeatureBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-[#FF0B1B]/40 bg-[#FF0B1B]/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#FF7079]">
      <Tag size={9} className="shrink-0" />
      {label}
    </span>
  );
}

export default function KitsSoftwareSection() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [activeKit, setActiveKit] = useState(null);
  const [pendingSku, setPendingSku] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [remote, setRemote] = useState(null);

  // Pull live pricing from Stripe via the edge-cached catalog endpoint. If it
  // fails, mergeCatalog falls back to the bundled amounts so the grid still
  // renders rather than collapsing.
  useEffect(() => {
    let cancelled = false;
    axios
      .get("/api/catalog")
      .then(({ data }) => {
        if (cancelled || !data?.items) return;
        const bySku = {};
        data.items.forEach((i) => {
          bySku[i.sku] = i;
        });
        setRemote(bySku);
      })
      .catch(() => {
        /* fallback prices already in place */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const kits = useMemo(() => mergeCatalog(KITS, remote || {}), [remote]);
  const software = useMemo(() => mergeCatalog(SOFTWARE, remote || {}), [remote]);

  const startCheckout = useCallback(async (sku) => {
    setPendingSku(sku);
    setCheckoutError("");
    try {
      const { data } = await axios.post("/api/create-checkout-session", { sku, quantity: 1 });
      if (!data?.url) throw new Error("No checkout URL returned");
      window.location.assign(data.url);
    } catch (err) {
      setPendingSku(null);
      setCheckoutError(
        err?.response?.data?.error || "Could not start checkout. Please try again or contact us."
      );
    }
  }, []);

  return (
    <section className="py-20 md:py-28 border-t border-zinc-800">
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <KitRequestModal kit={activeKit} onClose={() => setActiveKit(null)} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Kits header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Acquire Online // Hardware Kits</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">ARTAK Kits</h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Deployed in ruggedized cases sealed against moisture and shock. Every kit contains all necessary software, a built-in networking device, an edge-server, a charging-harness, and a rechargeable battery system.
          </p>
        </div>

        {/* Kits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {kits.map((kit, i) => (
            <motion.div
              key={kit.sku}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              data-testid={`kit-card-${i}`}
              className="bg-[#0A0A0A] group relative overflow-hidden hover:bg-[#0D0D0D] transition-colors"
            >
              <div className="relative h-52 overflow-hidden bg-zinc-900">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="w-full h-full object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#FF0B1B] border border-[#FF0B1B]/30 px-2 py-0.5">[{kit.sku}]</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wide mb-1">{kit.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{kit.desc}</p>
                <div className="space-y-1 mb-4">
                  {kit.specs.map((spec, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#FF0B1B] shrink-0" />
                      <span className="font-mono text-[10px] text-zinc-400 tracking-wider">{spec}</span>
                    </div>
                  ))}
                </div>
                {kit.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {kit.features.map((f, j) => <FeatureBadge key={j} label={f} />)}
                  </div>
                )}
                <p className="font-mono text-xl text-[#FF0B1B] font-bold mb-4">{formatUsd(kit.amount)}</p>
                <button
                  type="button"
                  onClick={() => setActiveKit({ ...kit, price: formatUsd(kit.amount), label: `[${kit.sku}]` })}
                  data-testid={`kit-acquire-${i}`}
                  aria-label={`Request a quote for the ${kit.name}`}
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-zinc-400 hover:text-[#FF0B1B] border border-zinc-800 hover:border-[#FF0B1B] px-3 py-2 transition-colors uppercase"
                >
                  <ShoppingCart size={11} /> Acquire Kit
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Software section */}
        <div className="mt-20">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Acquire Online // Software Licences</span>
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">Software Licences</h3>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl">
              Device-agnostic licences enabling ARTAK across AR, VR, tablet, phone, laptop, and PC. Purchased as prepaid terms — no auto-renewal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-zinc-800">
            {software.map((pkg, i) => (
              <motion.div
                key={pkg.sku}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-testid={`software-card-${i}`}
                className="bg-[#0A0A0A] group relative overflow-hidden hover:bg-[#0D0D0D] transition-colors flex flex-col"
              >
                <div className="relative h-36 overflow-hidden bg-zinc-900">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#FF0B1B] border border-[#FF0B1B]/30 px-1.5 py-0.5">[{pkg.sku}]</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wide mb-1">{pkg.name}</h4>
                  <p className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase mb-2">{pkg.duration}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">{pkg.desc}</p>
                  {pkg.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pkg.features.map((f, j) => <FeatureBadge key={j} label={f} />)}
                    </div>
                  )}
                  <p className="font-mono text-lg text-[#FF0B1B] font-bold mb-3 mt-auto">{formatUsd(pkg.amount)}</p>
                  <button
                    type="button"
                    onClick={() => startCheckout(pkg.sku)}
                    disabled={pendingSku !== null}
                    data-testid={`software-acquire-${i}`}
                    aria-label={`Purchase the ${pkg.name}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-zinc-400 hover:text-[#FF0B1B] border border-zinc-800 hover:border-[#FF0B1B] px-3 py-1.5 transition-colors uppercase disabled:opacity-40 disabled:hover:text-zinc-400 disabled:hover:border-zinc-800 self-start"
                  >
                    {pendingSku === pkg.sku ? (
                      <><Loader2 size={10} className="animate-spin" /> Redirecting...</>
                    ) : (
                      <><ShoppingCart size={10} /> Acquire</>
                    )}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>

        {checkoutError && (
          <p
            role="alert"
            data-testid="checkout-error"
            className="mt-6 font-mono text-[11px] tracking-wider text-[#FF0B1B]"
          >
            {checkoutError}
          </p>
        )}

        {/* CTA row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-800 pt-10">
          <p className="text-sm text-zinc-400 max-w-sm">Customized kit configurations available. Contact us for volume pricing and government procurement options.</p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors"
            >
              Contact Us to Inquire <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setCatalogOpen(true)}
              className="inline-flex items-center gap-2 bg-transparent border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors"
            >
              <Download size={16} /> Product Catalog
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
