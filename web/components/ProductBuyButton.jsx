"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ShoppingCart, Loader2 } from "lucide-react";

/**
 * Purchase control for a product detail page.
 *
 * Mirrors the checkout contract already used by KitsSoftwareSection: POST the
 * SKU to /api/create-checkout-session and follow the returned Stripe URL. The
 * server re-resolves price from Stripe, so nothing about the amount is trusted
 * from the client.
 *
 * Higher-priced kits are marked `quote` rather than `direct` and route to the
 * contact flow instead — the same split the grid uses.
 */
export default function ProductBuyButton({ sku, checkout }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const startCheckout = useCallback(async () => {
    setPending(true);
    setError("");
    try {
      const { data } = await axios.post("/api/create-checkout-session", { sku, quantity: 1 });
      if (!data?.url) throw new Error("No checkout URL returned");
      window.location.assign(data.url);
    } catch (err) {
      setPending(false);
      setError(
        err?.response?.data?.error || "Could not start checkout. Please try again or contact us."
      );
    }
  }, [sku]);

  if (checkout !== "direct") {
    return (
      <Link
        href="/#contact"
        className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors duration-300"
      >
        Request a Quote
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={pending}
        data-testid={`buy-${sku}`}
        className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors duration-300 disabled:opacity-60"
      >
        {pending ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
        {pending ? "Starting checkout…" : "Acquire Now"}
      </button>
      {error && <p className="mt-3 font-mono text-xs text-[#FF0B1B]">{error}</p>}
    </div>
  );
}
