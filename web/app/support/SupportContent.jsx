"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Ticket, FileText, Download, ChevronDown, ArrowRight, Shield, Headset, Wifi, RefreshCw, Lock } from "lucide-react";

const manuals = [
  { label: "[DOC.01]", device: "Quick Start Guide", version: "2026 Edition", href: "https://hubs.ly/Q04hld9V0" },
  { label: "[DOC.02]", device: "Block 2 — Full User Manual", version: "v2.4.1", href: "https://hubs.ly/Q04hl7tM0" },
  { label: "[DOC.03]", device: "Microsoft HoloLens 2", version: "v2.4.1", href: "https://hubs.ly/Q04hl8l20" },
  { label: "[DOC.04]", device: "Magic Leap 2", version: "v2.4.1", href: "https://hubs.ly/Q04hl88b0" },
  { label: "[DOC.05]", device: "Oculus Meta Quest 2", version: "v2.4.1", href: "https://hubs.ly/Q04hl9Kk0" },
  { label: "[DOC.06]", device: "Samsung Mobile & Tablet", version: "v2.3.8", href: "https://hubs.ly/Q04hl8K70" },
  { label: "[DOC.07]", device: "Windows PC", version: "v2.4.1", href: "https://hubs.ly/Q04hlcVJ0" },
];

import { faqs } from "@/data/supportFaqs";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function SupportContent() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div data-testid="support-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">ARTAK // Tactical Support Hub</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] max-w-4xl">
            Support <span className="text-[#FF0B1B]">Hub</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Mission-critical support for your ARTAK deployment. Submit a ticket, call our hotline, access operational manuals, or search the knowledge base.
          </p>
          <a
            href="tel:3055629639"
            data-testid="support-hero-cta"
            className="mt-8 inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors"
          >
            <Phone size={16} /> Immediate Assistance
          </a>
        </div>
      </section>

      {/* Ticket + Hotline Cards */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">

            {/* Create Ticket */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="bg-[#0A0A0A] p-8 md:p-12 group hover:bg-[#0D0D0D] transition-colors relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF0B1B] transition-colors">
                  <Ticket size={20} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase">[SUP.01]</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-3">
                Create Support Ticket
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-sm">
                Submit a detailed support request and our technical team will respond within 24 hours. Attach logs, screenshots, or error codes to expedite resolution.
              </p>
              <a
                href="https://share.hsforms.com/124KXMQCwQIaK-u7eKbL0_Abmwk1"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="support-ticket-link"
                className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-6 py-3 hover:bg-[#FF0B1B] transition-colors"
              >
                Open Ticket <ArrowRight size={14} />
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>

            {/* Emergency Hotline */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="bg-[#0A0A0A] p-8 md:p-12 group hover:bg-[#0D0D0D] transition-colors relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF0B1B] transition-colors">
                  <Headset size={20} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase">[SUP.02]</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-3">
                Emergency Hotline
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-sm">
                For mission-critical issues requiring immediate assistance, reach our on-call support team directly. Available 24/7 for active deployments.
              </p>
              <a
                href="tel:3055629639"
                data-testid="support-phone-link"
                className="font-mono text-3xl text-white hover:text-[#FF0B1B] transition-colors tracking-wider block"
              >
                (305) 562-9639
              </a>
              <span className="font-mono text-[10px] text-zinc-600 tracking-wider mt-2 block">CALL OR TEXT // 24/7</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Operational Manuals */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Documentation // Operational Manuals</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Operational Manuals
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-xl leading-relaxed">
              Device-specific operational manuals for all ARTAK-supported platforms. Download the PDF for your device to access setup, operation, and troubleshooting guidance.
            </p>
          </div>

          <div className="space-y-px">
            {manuals.map((manual, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-testid={`manual-card-${i}`}
                className="bg-[#0A0A0A] group hover:bg-[#0D0D0D] transition-colors relative"
              >
                <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-zinc-800/50">
                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-[#FF0B1B] transition-colors">
                      <FileText size={14} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-600 tracking-wider block">{manual.label}</span>
                      <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wide">
                        ARTAK {manual.device} — User Manual
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-600 tracking-wider">{manual.version}</span>
                    </div>
                  </div>
                  <a
                    href={manual.href}
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-zinc-400 hover:text-[#FF0B1B] border border-zinc-800 hover:border-[#FF0B1B] px-4 py-2 transition-colors uppercase shrink-0"
                  >
                    <Download size={11} /> Download PDF
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base & FAQ */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Reference // Knowledge Base & FAQ</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Knowledge Base
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-xl leading-relaxed">
              Common questions and field-tested solutions for ARTAK operators and commanders.
            </p>
          </div>

          <div className="space-y-px">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === faq.id;
              const FaqIcon = faq.icon;
              return (
                <motion.div
                  key={faq.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-[#0A0A0A] border-b border-zinc-800/50 relative overflow-hidden group"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    data-testid={`faq-btn-${faq.id}`}
                    className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left hover:bg-[#0D0D0D] transition-colors"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className={`w-10 h-10 border flex items-center justify-center shrink-0 transition-colors ${isOpen ? "border-[#FF0B1B]" : "border-zinc-800"}`}>
                        <FaqIcon size={14} className={`transition-colors ${isOpen ? "text-[#FF0B1B]" : "text-zinc-600"}`} />
                      </div>
                      <div className="text-left">
                        <span className="font-mono text-[10px] text-zinc-600 tracking-wider block">{faq.label}</span>
                        <span className={`font-heading text-sm font-semibold uppercase tracking-wide transition-colors ${isOpen ? "text-[#FF0B1B]" : "text-white"}`}>
                          {faq.title}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-zinc-600 transition-all duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180 text-[#FF0B1B]" : ""}`}
                    />
                  </button>

                  {/* The answer is always mounted and collapsed with height,
                      rather than conditionally rendered. Mounting on click kept
                      the text out of the server-rendered HTML entirely, so the
                      answers existed only inside the FAQPage JSON-LD — invisible
                      to answer engines reading raw HTML, and to Google's check
                      that FAQ content is actually present on the page. */}
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 pl-[4.5rem] md:pl-[5.5rem]">
                      <p className="text-sm text-zinc-400 leading-relaxed border-l-2 border-[#FF0B1B]/30 pl-4">
                        {faq.content}
                      </p>
                    </div>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 border border-zinc-800 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase block mb-2">Still need help?</span>
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white">Contact Our Support Team</h3>
              <p className="text-sm text-zinc-500 mt-1">Our technical specialists are ready to assist with any ARTAK deployment challenge.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://share.hsforms.com/124KXMQCwQIaK-u7eKbL0_Abmwk1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-6 py-3 hover:bg-[#FF0B1B] transition-colors"
              >
                Open Ticket <ArrowRight size={14} />
              </a>
              <a
                href="tel:3055629639"
                className="inline-flex items-center gap-2 border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-6 py-3 hover:border-white transition-colors"
              >
                <Phone size={14} /> (305) 562-9639
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
