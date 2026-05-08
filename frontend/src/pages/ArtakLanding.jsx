import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Crosshair, Globe, Radio, ArrowRight, Box, Download, MapPin, Target } from "lucide-react";
import SEO from "@/components/SEO";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import CatalogModal from "@/components/CatalogModal";

const kits = [
  { name: "ARTAK UPT Kit", price: "$21,989" },
  { name: "ARTAK Command Team Kit", price: "$37,499" },
  { name: "ARTAK Squad Kit", price: "$234,683" },
  { name: "ARTAK Platoon Kit", price: "$333,827" },
  { name: "ARTAK Battalion HQ Kit", price: "$582,030" },
  { name: "ARTAK Brigade HQ Kit", price: "$842,708" },
];

const softwarePackages = [
  { name: "Backend Software Subscription (1 year)", price: "$15,000" },
  { name: "Backend Software Subscription (3 years)", price: "$45,000" },
  { name: "Software Subscription (1 year)", price: "$3,400" },
  { name: "Software Subscription (3 years)", price: "$10,200" },
];

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

export default function ArtakLanding() {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <div data-testid="artak-landing-page">
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <SEO
        title="ARTAK - Augmented Reality Team Awareness Kit"
        description="ARTAK is a multi-domain joint planning and command & control platform. Synchronizing planning and C2 activities across echelons, domains, and warfighting functions."
        path="/artak"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-4">
            <img src="/artak-logo-white.png" alt="ARTAK" className="h-12 w-auto opacity-90" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Platform // Overview</span>
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
            <button onClick={() => setCatalogOpen(true)} data-testid="artak-landing-catalog-btn" className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors">
              <Download size={16} /> Download Product Catalog
            </button>
            <Link to="/#contact" className="inline-flex items-center gap-2 bg-transparent border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Section (from Home page) */}
      <ProductSection />

      {/* Block 2 Release / Features */}
      <FeaturesSection />

      {/* Deployable Everywhere / Platforms */}
      <PlatformSection />

      {/* Kits & Software Packages */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Hardware // Kits</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">ARTAK Kits</h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Deployed in ruggedized cases sealed against moisture and shock. ARTAK kits contain all necessary software, a built-in networking device, an edge-server, a charging-harness, and a rechargeable battery system.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {kits.map((kit, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} data-testid={`landing-kit-${i}`} className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative">
                <div className="flex items-center gap-2 mb-3">
                  <Box size={14} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                  <span className="font-mono text-[10px] text-zinc-600 tracking-wider">[KIT.0{i + 1}]</span>
                </div>
                <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wide mb-2">{kit.name}</h3>
                <p className="font-mono text-lg text-[#FF0B1B] font-bold">{kit.price}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="mt-16">
            <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-6">Software Packages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
              {softwarePackages.map((pkg, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative">
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">{pkg.name}</h4>
                  <p className="font-mono text-lg text-[#FF0B1B] font-bold">{pkg.price}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#contact" className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors">
                Contact Us to Inquire <ArrowRight size={16} />
              </Link>
              <button onClick={() => setCatalogOpen(true)} className="inline-flex items-center gap-2 bg-transparent border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors">
                <Download size={16} /> Product Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <img src="/artak-logo-white.png" alt="ARTAK" className="h-7 w-auto opacity-70" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Storyboards // Field Deployments</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Case Studies</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} data-testid="landing-case-sage-eagle" className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative">
              <div className="flex items-center gap-2 mb-4"><MapPin size={14} className="text-[#FF0B1B]" /><span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.01]</span></div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">Sage Eagle 25-2</h3>
              <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">3rd Special Forces Group (Airborne) // ODA 3121</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">3121 used ARTAK during Sage Eagle 25-2 to visualize targets and plan their mission. UAS imagery collected autonomously, 3D maps generated via Map Maker, and real-time position of force tracked via Meta Quest 3.</p>
              <div className="flex flex-wrap gap-2">
                {["Skydio X2+", "Map Maker", "Meta Quest 3", "GoTENNA", "Starlink", "ATAK"].map((t) => (<span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>))}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} data-testid="landing-case-nswg8" className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative">
              <div className="flex items-center gap-2 mb-4"><Target size={14} className="text-[#FF0B1B]" /><span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.02]</span></div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">NSWG-8 TRADET</h3>
              <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">Naval Special Warfare Group 8 // Training Detachment</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">NSWG-8 TRADET integrated ARTAK with GoTENNA and Starlink to track, monitor and replay trainees' positions during live-fire assault and react-to-contact drills for enhanced AAR.</p>
              <div className="flex flex-wrap gap-2">
                {["GoTENNA", "Starlink", "Live-Fire Tracking", "3D Replay", "AAR"].map((t) => (<span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>))}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} data-testid="landing-case-160soar" className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative lg:col-span-2">
              <div className="flex items-center gap-2 mb-4"><Radio size={14} className="text-[#FF0B1B]" /><span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.03]</span></div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">2nd Battalion, 160th SOAR — Joint ROC Drill</h3>
              <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">10–14 September 2024 // Cannon AFB, New Mexico</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p className="text-sm text-zinc-400 leading-relaxed">2/160 SOAR used ARTAK to conduct a 90-minute ROC drill during a joint exercise with 5th SFG(A) and USAF 23rd STS — the largest and longest brief ever conducted by a customer in ARTAK. Key leaders collaborated using 3D maps, while enablers viewed on AR headsets and TV screens.</p>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Recon:</span> Exterior imaged using Skydio X2+ at 200 acres/hr</p>
                  <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Process:</span> 3D maps generated via Map Maker</p>
                  <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Brief:</span> 90-min ROC drill — largest ever in ARTAK</p>
                  <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Units:</span> 160th SOAR, 5th SFG(A), USAF 23rd STS</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Skydio X2+", "Map Maker", "AR HMDs", "ROC Drill", "Joint Exercise", "5th SFG(A)", "23rd STS"].map((t) => (<span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>))}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions sub-pages grid */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">Explore // Solutions</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">ARTAK Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {subPages.map((page, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={page.to} data-testid={`artak-nav-card-${i}`} className="block bg-[#0A0A0A] p-6 md:p-8 group hover:bg-[#0D0D0D] transition-colors relative h-full">
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
