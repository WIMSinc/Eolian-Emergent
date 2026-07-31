import { Link, useLocation, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

/**
 * Landing page after a Stripe Checkout redirect. Serves both /checkout/success
 * and /checkout/cancelled.
 *
 * Deliberately does not treat its own render as proof of payment — fulfilment
 * is driven by the verified `checkout.session.completed` webhook, since anyone
 * can navigate to this URL directly.
 */
export default function CheckoutResult() {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const success = pathname.includes("success");

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <SEO
        title={success ? "Order Received" : "Checkout Cancelled"}
        description="ARTAK software subscription checkout."
        path={success ? "/checkout/success" : "/checkout/cancelled"}
        noindex
      />
      <div className="max-w-lg w-full text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#FF0B1B]" />
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
            {success ? "Acquire Online // Confirmed" : "Acquire Online // Cancelled"}
          </span>
          <div className="w-8 h-px bg-[#FF0B1B]" />
        </div>

        {success ? (
          <>
            <CheckCircle size={40} className="text-[#FF0B1B] mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white mb-4">
              Order Received
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              Thank you — your subscription order has been received and a receipt is on its way to your email.
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed mb-8">
              Our team will confirm eligibility and follow up with provisioning details. If you need anything in
              the meantime, just reply to your receipt.
            </p>
            {params.get("session_id") && (
              <p className="font-mono text-[10px] tracking-wider text-zinc-700 mb-8 break-all">
                REF: {params.get("session_id")}
              </p>
            )}
          </>
        ) : (
          <>
            <XCircle size={40} className="text-zinc-600 mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white mb-4">
              Checkout Cancelled
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              No payment was taken and nothing has been charged. You can pick up where you left off, or get in
              touch if you would rather be invoiced directly.
            </p>
          </>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors"
          >
            Return Home <ArrowRight size={16} />
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-transparent border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </main>
  );
}
