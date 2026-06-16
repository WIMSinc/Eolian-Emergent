import { useState } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import SEO from "@/components/SEO";
import CatalogModal from "@/components/CatalogModal";
import UseCasesSection from "@/components/UseCasesSection";
import KitsSoftwareSection from "@/components/KitsSoftwareSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";

export default function ArtakUseCases() {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <div data-testid="artak-usecases-page">
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <SEO
        title="ARTAK - National Security & Public Safety"
        description="ARTAK is a next-generation immersive C2 platform for disaster response, search & rescue, security, law enforcement, fire services, and space operations."
        path="/artak/national-security"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-4">
            <img src="/artak-logo-white.webp" alt="ARTAK" className="h-10 w-auto opacity-90" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">ARTAK // Use Cases</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-5xl">
            National Security <span className="text-[#FF0B1B]">&</span>
            <br />
            <span className="text-zinc-500">Public Safety</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            ARTAK is a next-generation immersive Command and Control (C2) platform that empowers organizations to plan, coordinate, and execute missions with unmatched spatial awareness.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs text-zinc-500">Total Clarity.</span>
            <span className="text-[#FF0B1B]">/</span>
            <span className="font-mono text-xs text-zinc-500">Unified Command.</span>
            <span className="text-[#FF0B1B]">/</span>
            <span className="font-mono text-xs text-zinc-500">Smarter Response.</span>
          </div>
          <button
            onClick={() => setCatalogOpen(true)}
            data-testid="download-catalog-btn"
            className="mt-6 inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors"
          >
            <Download size={16} /> Download Product Catalog
          </button>
        </div>
      </section>

      {/* DHS Operational View */}
      <section className="py-16 md:py-20 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <img src="/artak-logo-white.webp" alt="ARTAK" className="h-7 w-auto opacity-70" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 uppercase">DHS Operational View (OV-1) // January 2026</span>
          </div>
          <div className="border border-zinc-800 overflow-hidden group">
            <img
              src="/artak-dhs-ov1.webp"
              alt="DHS ARTAK Operational View"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <p className="mt-4 font-mono text-[10px] text-zinc-600 tracking-wider text-center">
            ARTAK Platform: Multi-Domain C2 // Real-Time 3D Visualization // Secure Tactical Mesh Networking
          </p>
        </div>
      </section>

      {/* Use Cases grid */}
      <UseCasesSection />

      {/* Kits & Software */}
      <KitsSoftwareSection />

      {/* Case Studies */}
      <CaseStudiesSection />
    </div>
  );
}
