import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Shield, ExternalLink, Lock } from "lucide-react";

const patents = [
  {
    id: "U.S. Patent No. 11,297,164 B2",
    type: "United States Patent",
    href: "https://patents.google.com/patent/US11297164B2",
    enforceable: "Enforceable through ~2040",
    desc: "Core patent covering the framework for standing up, sustaining, and ingesting data into a 3D mixed reality environment — the foundation on which all ARTAK capabilities are built.",
  },
  {
    id: "International Patent WO 2019/217437 A2",
    type: "PCT International Patent",
    href: "https://patents.google.com/patent/WO2019217437A2",
    enforceable: "Enforceable through ~2040",
    desc: "International (PCT) patent extending protection globally for the Eolian Mixed Reality Platform architecture.",
  },
];

const implications = [
  {
    title: "Durable Technology Moat",
    desc: "Patents enforceable through approximately 2040 create a long-term barrier to entry for any competing product attempting to replicate ARTAK's core architecture.",
  },
  {
    title: "Full Platform Coverage",
    desc: "The patents cover the framework for standing up, sustaining, and ingesting data into a 3D mixed reality environment — the foundation of all ARTAK capabilities.",
  },
  {
    title: "ARTAK Is a Direct Implementation",
    desc: "ARTAK is a direct implementation of the patented Eolian Mixed Reality Platform. This means any competing product attempting to replicate ARTAK's core architecture faces significant patent-based constraints.",
  },
  {
    title: "Capital Efficient Defense",
    desc: "With over $15M in cumulative revenue from just $1.96M in total capital raised, Eolian's IP portfolio supports its position as one of the most capital-efficient defense technology companies of its generation.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function AboutIP() {
  return (
    <div data-testid="ip-page">
      <SEO title="Intellectual Property" description="EolianVR's intellectual property portfolio including patents, trademarks, and proprietary technology across AR/VR and defense platforms." path="/about/intellectual-property" />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <Link to="/about" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-wider uppercase hover:text-white transition-colors mb-8">
            <ArrowLeft size={12} /> Back to About
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Company // IP</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            Intellectual <span className="text-[#FF0B1B]">Property</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Eolian's core technology is protected by a robust patent portfolio that underpins the entire ARTAK platform and creates a significant barrier to entry for potential competitors.
          </p>
        </div>
      </section>

      {/* Patents */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Portfolio // Patents</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Patent Portfolio
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            {patents.map((patent, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#0A0A0A] p-8 md:p-10 group hover:bg-[#0D0D0D] transition-colors relative"
              >
                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-[#FF0B1B] transition-colors">
                  <FileText size={16} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">{patent.type}</span>
                <h3 className="font-heading text-xl font-bold text-white tracking-tight mb-2">{patent.id}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Lock size={10} className="text-[#FF0B1B]" />
                  <span className="font-mono text-xs text-[#FF0B1B] tracking-wider">{patent.enforceable}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">{patent.desc}</p>
                <a
                  href={patent.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#FF0B1B] tracking-wider uppercase hover:gap-3 transition-all"
                >
                  View Patent <ExternalLink size={12} />
                </a>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Implications */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Strategy // Competitive Moat</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Strategic Implications
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            {implications.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative"
              >
                <div className="flex items-start gap-3">
                  <Shield size={14} className="text-[#FF0B1B] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wide mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
