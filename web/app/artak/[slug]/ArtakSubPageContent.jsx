"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import ArtakFeaturesSection from "@/components/ArtakFeaturesSection";
import UseCasesSection from "@/components/UseCasesSection";
import KitsSoftwareSection from "@/components/KitsSoftwareSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";

import { useCaseData, slugs } from "@/data/artakUseCases";
import { ArrowLeft, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function ArtakSubPageContent({ slug }) {
  const data = useCaseData[slug];

  // Unknown slugs are redirected by the server component before render.
  if (!data) return null;

  const currentIdx = slugs.indexOf(slug);
  const prevSlug = currentIdx > 0 ? slugs[currentIdx - 1] : null;
  const nextSlug = currentIdx < slugs.length - 1 ? slugs[currentIdx + 1] : null;

  const Icon = data.icon;

  return (
    <div data-testid={`artak-subpage-${slug}`}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute inset-0 z-0">
          <img src={data.image} alt="" className="w-full h-full object-cover opacity-10 grayscale" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/90 to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/artak" className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 hover:text-white transition-colors uppercase">ARTAK</Link>
            <span className="text-zinc-700">/</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">{data.title}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Icon size={16} className="text-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase">{data.sysLabel}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            {data.title} <span className="text-zinc-500">{data.titleAccent}</span>
          </h1>
          <p className="mt-4 font-mono text-xs tracking-[0.15em] text-zinc-400 uppercase">{data.subtitle}</p>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">{data.heroDesc}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase block mb-4">Overview // Mission Context</span>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8">{data.body}</p>
              <p className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-[#FF0B1B] pl-4">{data.ctaText}</p>
            </div>

            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase block mb-4">Key Capabilities</span>
              <div className="space-y-3">
                {data.capabilities.map((cap, i) => (
                  <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FF0B1B] transition-colors">
                      <span className="font-mono text-[9px] text-zinc-600 group-hover:text-[#FF0B1B] transition-colors">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="text-sm text-zinc-400">{cap}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Image (optional — e.g. CHORD anomaly tiers diagram) */}
      {data.featureImage && (
        <section className="py-20 md:py-28 border-t border-zinc-800">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#FF0B1B]" />
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">System // Anomaly Classification</span>
              </div>
            </div>
            <div className="border border-zinc-800 overflow-hidden">
              <img
                src={data.featureImage}
                alt="CHORD Anomaly Tier Classification"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Interactive Embed (optional — e.g. CHORD Insight Hub) */}
      {data.embedUrl && (
        <section className="py-20 md:py-28 border-t border-zinc-800">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#FF0B1B]" />
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Live Demo // CHORD Insight Hub</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                Interactive Demo
              </h2>
              <p className="mt-3 text-sm text-zinc-400 max-w-2xl">
                Explore the CHORD Insight Hub — an interactive prototype demonstrating the decision graph, anomaly timeline, and XAI analytics interface.
              </p>
            </div>
            <div className="border border-zinc-800 overflow-hidden" style={{ height: "780px" }}>
              <iframe
                src={data.embedUrl}
                title="CHORD Insight Hub"
                className="w-full h-full"
                style={{ border: "none" }}
                allow="fullscreen"
                loading="lazy"
              />
            </div>
            <p className="mt-3 font-mono text-xs text-zinc-600 tracking-wider">
              Having trouble viewing?{" "}
              <a href={data.embedUrl} target="_blank" rel="noopener noreferrer" className="text-[#FF0B1B] hover:underline">
                Open in a new tab →
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Platform Features */}
      <ArtakFeaturesSection />

      {/* Use Cases */}
      <UseCasesSection />

      {/* Kits & Software */}
      <KitsSoftwareSection />

      {/* Case Studies */}
      <CaseStudiesSection />

      {/* CTA + Navigation */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">
              Experience ARTAK in Action
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
              Contact us today to learn more or to schedule a personalized demo.
            </p>
            <Link
              href="/#contact"
              data-testid="subpage-demo-cta"
              className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors"
            >
              Request a Demo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800 pt-8">
            {prevSlug ? (
              <Link href={`/artak/${prevSlug}`} data-testid="subpage-nav-prev" className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">
                <ArrowLeft size={14} /> {useCaseData[prevSlug].title}
              </Link>
            ) : <div />}
            <Link href="/artak" data-testid="subpage-nav-all" className="font-mono text-xs text-zinc-600 hover:text-white transition-colors uppercase tracking-wider">
              All Use Cases
            </Link>
            {nextSlug ? (
              <Link href={`/artak/${nextSlug}`} data-testid="subpage-nav-next" className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">
                {useCaseData[nextSlug].title} <ArrowRight size={14} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </div>
  );
}
