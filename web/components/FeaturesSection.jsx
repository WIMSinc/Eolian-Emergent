"use client";

import { motion } from "framer-motion";
import {
  Map,
  Shield,
  Radio,
  Crosshair,
  Globe,
  Layers,
  Zap,
  Monitor,
  Gauge,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Bigger & Better High-Quality 3D Maps",
    desc: "Massive terrain rendering with unprecedented fidelity and detail.",
  },
  {
    icon: Monitor,
    title: 'Streamlined & Improved UI/UX',
    desc: "Easy to use whether you're 7 years old or 70.",
  },
  {
    icon: Globe,
    title: '"World in a Box"',
    desc: "A 3D tiled map base layer of the entire planet.",
  },
  {
    icon: Radio,
    title: "JADC2 Live Data Stream Overlays",
    desc: "Real-time data from hundreds of sources at your fingertips.",
  },
  {
    icon: Layers,
    title: 'Enriched Full Immersion Mode / "Room-Scale"',
    desc: "Complete VR immersion for total situational awareness.",
  },
  {
    icon: Shield,
    title: "Enhanced Maps for Interiors & Subterranean",
    desc: "Building interiors, underwater, and sub-terranean mapping.",
  },
  {
    icon: Zap,
    title: "Advanced Capabilities at the Edge",
    desc: "Full operational capability in disconnected, austere environments.",
  },
  {
    icon: Target,
    title: "True MDO Across All Domains",
    desc: "Multi-Domain Operations across Land, Air, Sea, and Space.",
  },
  {
    icon: Gauge,
    title: "Boosted Speed, Stability & Fidelity",
    desc: "Decreased latency for a vastly superior user experience.",
  },
  {
    icon: Crosshair,
    title: "Thousands of Additional Capabilities",
    desc: "Expanded nodes, maneuvers, actions, settings, and customizations.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="capabilities"
      data-testid="features-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background image (blurred) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(/artak-c2.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
              Capabilities // Block 2
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Block 2 Release
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-2xl">
            The recently released Block 2 delivers a quantum leap in capability,
            performance, and user experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800/50">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              data-testid={`feature-card-${i}`}
              className="bg-[#0A0A0A] p-6 md:p-8 group relative overflow-hidden hover:bg-[#0D0D0D] transition-colors duration-500"
            >
              <div className="flex gap-5">
                <div className="shrink-0">
                  <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF0B1B] transition-colors duration-300">
                    <feat.icon
                      size={18}
                      className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors duration-300"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-white tracking-wide uppercase mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute left-0 top-0 w-px h-0 bg-[#FF0B1B] group-hover:h-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
