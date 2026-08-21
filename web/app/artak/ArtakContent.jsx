"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Crosshair, Globe, Radio, ArrowRight, Download } from "lucide-react";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import ArtakFeaturesSection from "@/components/ArtakFeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import KitsSoftwareSection from "@/components/KitsSoftwareSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import UseCasesSection from "@/components/UseCasesSection";
import CatalogModal from "@/components/CatalogModal";
import { useState } from "react";

const subPages = [
  { to: "/artak/national-security", icon: Shield, label: "[SYS.01]", title: "National Security & Public Safety", desc: "Use cases for disaster response, search & rescue, security, law enforcement, fire services, and space operations." },
  { to: "/artak/disaster-response", icon: Crosshair, label: "[UC.01]", title: "Disaster Response & Emergency Management", desc: "Transform fragmented operations into a unified mission picture with real-time drone feeds and geospatial overlays." },
  { to: "/artak/search-rescue", icon: Globe, label: "[UC.02]", title: "Search & Rescue / First Responders", desc: "Integrate UAV data, terrain models, and team tracking into a shared 3D environment." },
  { to: "/artak/security-protection", icon: Shield, label: "[UC.03]", title: "Security & Protection Services", desc: "Fused operational picture combining radar, drone, and sensor data." },
  { to: "/artak/police-law-enforcement", icon: Crosshair, label: "[UC.04]", title: "Police & Law Enforcement", desc: "Shared operational view for urban operations, crowd control, and tactical response." },
  { to: "/artak/fire-emergency", icon: Radio, label: "[UC.05]", title: "Fire & Emergency Services", desc: "Complete situational awareness — tracking crews and modeling wildfire spread in 3D." },
  { to: "/artak/space-aerospace", icon: Globe, label: "[UC.06]", title: "Space & Aerospace Operations", desc: "Visualize orbital assets, trajectories, and contingencies in immersive 3D." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function ArtakContent() {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <div data-testid="artak-landing-page">
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-4">
            <img src="/artak-logo-white.webp" alt="ARTAK" width="200" height="74" className="h-12 w-auto opacity-90" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Platform // Overview</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-5xl">
            Augmented Reality
            <br />
            <span className="text-zinc-500">Team Awareness Kit</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            ARTAK is a multi-domain joint planning and command & control platform. It synchronizes planning and C2 activities across echelons, domains, and warfighting functions by bringing command and staff together into a single digital decision environment.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => setCatalogOpen(true)} data-testid="artak-landing-catalog-btn" className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors">
              <Download size={16} /> Download Product Catalog
            </button>
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-transparent border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Product overview */}
      <ProductSection />

      {/* Platform Features */}
      <ArtakFeaturesSection />

      {/* Block 2 Release / Features */}
      <FeaturesSection />

      {/* Deployable Everywhere / Platforms */}
      <PlatformSection />

      {/* Use Cases */}
      <UseCasesSection />

      {/* Kits & Software */}
      <KitsSoftwareSection />

      {/* Case Studies */}
      <CaseStudiesSection />

      {/* Solutions sub-pages grid */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase block mb-4">Explore // Solutions</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">ARTAK Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {subPages.map((page, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link href={page.to} data-testid={`artak-nav-card-${i}`} className="block bg-[#0A0A0A] p-6 md:p-8 group hover:bg-[#0D0D0D] transition-colors relative h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <page.icon size={14} className="text-[#FF0B1B]" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">{page.label}</span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-white uppercase tracking-wide mb-3 group-hover:text-[#FF0B1B] transition-colors">{page.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{page.desc}</p>
                  <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-zinc-600 group-hover:text-[#FF0B1B] transition-colors uppercase">Explore <ArrowRight size={12} /></span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
