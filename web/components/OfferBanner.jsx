import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Time-limited Block 3 bundle promotion.
 *
 * Deliberately a server component with no "use client": the offer has to be in
 * the raw HTML for answer engines, and it needs no interactivity to earn its
 * place (CLAUDE.md §3, AEO rules).
 *
 * It expires itself. The offer ends on a fixed date, and the failure mode for a
 * hand-removed banner is that nobody remembers — the site quietly advertises a
 * dead promotion for months. Rendering null past OFFER_ENDS means the worst
 * case is one stale hour, not one stale quarter.
 *
 * That only works because the routes rendering this set `revalidate`. A fully
 * static page evaluates this date once at build time and freezes the answer, so
 * a page adding this banner MUST also export a revalidate interval. /blog and
 * the sitemap already work this way.
 *
 * Prices match data/productCatalog.js — ARTAK User License at $3,400 and
 * ARTAK User License x 2 at $6,800 — so the banner cannot quote a number the
 * catalogue and /products/<slug> disagree with.
 */
const OFFER_ENDS = Date.parse("2026-10-01T03:59:00Z"); // 30 Sep 2026, 23:59 ET

const BUNDLES = [
  {
    label: "Kit 01 // Single Operator",
    price: "$3,400",
    term: "1 year",
    includes: [
      "1× ARTAK Meta Quest 3 license",
      "1× ARTAK PC license",
      "1× Meta Quest 3 headset — free",
    ],
  },
  {
    label: "Kit 02 // Team, 2-Seat",
    price: "$6,800",
    term: "4 licenses · 1 year",
    includes: [
      "2× ARTAK Meta Quest 3 licenses",
      "2× ARTAK PC licenses",
      "2× Meta Quest 3 headsets — free",
    ],
  },
];

export default function OfferBanner() {
  if (Date.now() > OFFER_ENDS) return null;

  return (
    <section
      data-testid="offer-banner"
      aria-label="Limited-time ARTAK Block 3 bundle offer"
      className="border-t border-b border-zinc-800 bg-[#0A0A0A]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase">
                Through 30 September 2026
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              The headset is on us
            </h2>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Order an ARTAK Block 3 license bundle by 30 September 2026 and the
              Meta Quest 3 ships with it, free. One year of ARTAK on Quest 3{" "}
              <em>and</em> PC — the same live 3D digital twin your team plans,
              briefs, and rehearses in.
            </p>
            <p className="mt-4 text-xs text-zinc-500 leading-relaxed">
              Both bundles sit under the $15,000 micro-purchase threshold, so a
              Government Purchase Card holder can buy one directly. Government
              and volume pricing available on request.
            </p>
            <Link
              href="/#contact"
              data-testid="offer-banner-cta"
              className="mt-6 inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-xs tracking-widest px-6 py-3 hover:bg-[#FF0B1B] transition-colors"
            >
              Request a quote <ArrowRight size={14} />
            </Link>
          </div>

          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
            {BUNDLES.map((b) => (
              <li key={b.label} className="bg-[#0D0D0D] p-6">
                <div className="font-mono text-[10px] tracking-[0.15em] text-[#FF0B1B] uppercase mb-3">
                  {b.label}
                </div>
                <div className="font-heading text-3xl font-bold text-white">
                  {b.price}
                </div>
                <div className="font-mono text-xs text-zinc-500 mb-5">
                  {b.term}
                </div>
                <ul className="space-y-1.5">
                  {b.includes.map((line) => (
                    <li key={line} className="text-xs text-zinc-400 leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
