import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, ShoppingCart } from "lucide-react";
import CatalogModal from "@/components/CatalogModal";

const kits = [
  {
    name: "ARTAK UPT Kit",
    label: "[KIT.01]",
    price: "$21,989",
    image: "/artak-kit-upt.webp",
    desc: "High-speed computing, long-range comms, lightweight design.",
    specs: ["1 AR Headset", "GoTENNA Mesh", "Edge Server", "Rechargeable Battery"],
  },
  {
    name: "ARTAK Command Team Kit",
    label: "[KIT.02]",
    price: "$37,499",
    image: "/artak-kit-command.webp",
    desc: "Dual-user capability, enhanced processing, expanded network.",
    specs: ["2 AR Headsets", "Dual GoTENNA", "High-Performance Edge Server", "Charging Harness"],
  },
  {
    name: "ARTAK Squad Kit",
    label: "[KIT.03]",
    price: "$234,683",
    image: "/artak-kit-squad.webp",
    desc: "Team-level C2, real-time mesh networking, integrated power.",
    specs: ["Multi-Device Setup", "Mesh Network Node", "Rugged Case", "Full Power System"],
  },
  {
    name: "ARTAK Platoon Kit",
    label: "[KIT.04]",
    price: "$333,827",
    image: "/artak-kit-platoon.webp",
    desc: "Broad area coverage, advanced sensors, multi-echelon support.",
    specs: ["Platoon-Scale C2", "Advanced Sensors", "Starlink Integration", "Multi-Case System"],
  },
  {
    name: "ARTAK Battalion HQ Kit",
    label: "[KIT.05]",
    price: "$582,030",
    image: "/artak-kit-battalion.webp",
    desc: "Theater-level operations, secure data storage, modular expansion.",
    specs: ["Battalion-Level C2", "Secure Data Storage", "Modular Expansion Slots", "Redundant Power"],
  },
  {
    name: "ARTAK Brigade HQ Kit",
    label: "[KIT.06]",
    price: "$842,708",
    image: "/artak-kit-brigade.webp",
    desc: "Strategic command center, resilient comms, comprehensive analysis.",
    specs: ["Brigade-Level C2", "Strategic Command Suite", "Resilient Comms Stack", "Full Analysis Package"],
  },
];

const softwarePackages = [
  {
    name: "Backend Software Subscription",
    label: "[SW.01]",
    duration: "1 Year",
    price: "$15,000",
    image: "/artak-software-backend-1yr.png",
    desc: "Full backend infrastructure for ARTAK server-side operations.",
  },
  {
    name: "Backend Software Subscription",
    label: "[SW.02]",
    duration: "3 Years",
    price: "$45,000",
    image: "/artak-software-backend-3yr.png",
    desc: "Full backend infrastructure — multi-year deployment savings.",
  },
  {
    name: "ARTAK Software Subscription",
    label: "[SW.03]",
    duration: "1 Year",
    price: "$3,400",
    image: "/artak-software-1yr.png",
    desc: "End-user ARTAK software license for all supported devices.",
  },
  {
    name: "ARTAK Software Subscription",
    label: "[SW.04]",
    duration: "3 Years",
    price: "$10,200",
    image: "/artak-software-3yr.png",
    desc: "End-user license — multi-year deployment at a reduced rate.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
};

export default function KitsSoftwareSection() {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <section className="py-20 md:py-28 border-t border-zinc-800">
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Kits header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Acquire Online // Hardware Kits</span>
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
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              data-testid={`kit-card-${i}`}
              className="bg-[#0A0A0A] group relative overflow-hidden hover:bg-[#0D0D0D] transition-colors"
            >
              {/* Kit image */}
              <div className="relative h-52 overflow-hidden bg-zinc-900">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="w-full h-full object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#FF0B1B] border border-[#FF0B1B]/30 px-2 py-0.5">{kit.label}</span>
                </div>
              </div>

              {/* Kit details */}
              <div className="p-6">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wide mb-1">{kit.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{kit.desc}</p>
                <div className="space-y-1 mb-4">
                  {kit.specs.map((spec, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#FF0B1B] shrink-0" />
                      <span className="font-mono text-[10px] text-zinc-600 tracking-wider">{spec}</span>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-xl text-[#FF0B1B] font-bold mb-4">{kit.price}</p>
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-zinc-400 hover:text-[#FF0B1B] border border-zinc-800 hover:border-[#FF0B1B] px-3 py-2 transition-colors uppercase"
                >
                  <ShoppingCart size={11} /> Acquire Kit
                </Link>
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
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Acquire Online // Software Packages</span>
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">Software Packages</h3>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl">
              Device-agnostic subscriptions enabling ARTAK across AR, VR, tablet, phone, laptop, and PC.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {softwarePackages.map((pkg, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-testid={`software-card-${i}`}
                className="bg-[#0A0A0A] group relative overflow-hidden hover:bg-[#0D0D0D] transition-colors"
              >
                {/* Software image */}
                <div className="relative h-36 overflow-hidden bg-zinc-900">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-contain p-3 grayscale group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#FF0B1B] border border-[#FF0B1B]/30 px-1.5 py-0.5">{pkg.label}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wide mb-1">{pkg.name}</h4>
                  <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-2">{pkg.duration}</p>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-3">{pkg.desc}</p>
                  <p className="font-mono text-lg text-[#FF0B1B] font-bold mb-3">{pkg.price}</p>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-zinc-400 hover:text-[#FF0B1B] border border-zinc-800 hover:border-[#FF0B1B] px-3 py-1.5 transition-colors uppercase"
                  >
                    <ShoppingCart size={10} /> Acquire
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-800 pt-10">
          <p className="text-sm text-zinc-500 max-w-sm">Customized kit configurations available. Contact us for volume pricing and government procurement options.</p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors"
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
