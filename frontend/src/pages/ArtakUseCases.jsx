import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Search, Shield, Siren, Flame, Rocket, ArrowRight, Box } from "lucide-react";

const useCases = [
  {
    icon: AlertTriangle,
    sysLabel: "[UC.01]",
    title: "Disaster Response & Emergency Management",
    desc: "In times of chaos, ARTAK transforms fragmented operations into a unified mission picture. Real-time drone feeds, IoT data, and geospatial overlays help command centers coordinate faster, deploy smarter, and save more lives.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
  },
  {
    icon: Search,
    sysLabel: "[UC.02]",
    title: "Search & Rescue / First Responders",
    desc: "Every second matters. ARTAK integrates UAV data, terrain models, and team tracking into a shared 3D environment — enabling crews to visualize hazards, optimize routes, and train in realistic VR scenarios before entering the field.",
    image: "https://images.unsplash.com/photo-1773839420967-b50018fc0505?w=800&q=80",
  },
  {
    icon: Shield,
    sysLabel: "[UC.03]",
    title: "Security & Protection Services",
    desc: "Whether providing security for individuals, events, or facilities, ARTAK delivers a fused operational picture — combining radar, drone, and sensor data in a single spatial interface. Agencies gain 360-degree visibility over wide or remote regions.",
    image: "https://images.unsplash.com/photo-1737502483541-92e91801cfaf?w=800&q=80",
  },
  {
    icon: Siren,
    sysLabel: "[UC.04]",
    title: "Police & Law Enforcement",
    desc: "For urban operations, crowd control, or tactical response, ARTAK provides a shared operational view that improves decision-making and reduces risk. Officers can rehearse complex scenarios in VR and access real-time overlays during live incidents.",
    image: "https://images.unsplash.com/photo-1700774607019-dfa5907a26fd?w=800&q=80",
  },
  {
    icon: Flame,
    sysLabel: "[UC.05]",
    title: "Fire & Emergency Services",
    desc: "ARTAK gives fire commanders complete situational awareness — tracking crews, visualizing structure layouts, and modeling wildfire spread in 3D. Through AR and VR, teams can prepare, respond, and review every mission with confidence.",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80",
  },
  {
    icon: Rocket,
    sysLabel: "[UC.06]",
    title: "Space & Aerospace Operations",
    desc: "From orbital mission planning to ground-station coordination, ARTAK enables teams to visualize assets, trajectories, and contingencies in immersive 3D. It brings real-time command awareness to an increasingly complex operational domain.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
  },
];

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

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function ArtakUseCases() {
  return (
    <div data-testid="artak-usecases-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">ARTAK // Use Cases</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-5xl">
            National Security <span className="text-[#FF0B1B]">&</span>
            <br />
            <span className="text-zinc-500">Public Safety</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            ARTAK is a next-generation immersive Command and Control (C2) platform that empowers organizations to plan, coordinate, and execute missions with unmatched spatial awareness. From disaster response to border protection, ARTAK turns complex operations into clear, connected, and commendable missions.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-500">Total Clarity.</span>
            <span className="text-[#FF0B1B]">/</span>
            <span className="font-mono text-xs text-zinc-500">Unified Command.</span>
            <span className="text-[#FF0B1B]">/</span>
            <span className="font-mono text-xs text-zinc-500">Smarter Response.</span>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">One Platform // Infinite Missions</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Use Cases</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                data-testid={`usecase-card-${i}`}
                className="bg-[#0A0A0A] group relative overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={uc.image} alt={uc.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <uc.icon size={14} className="text-[#FF0B1B]" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">{uc.sysLabel}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-base font-semibold text-white tracking-wide uppercase mb-3">{uc.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{uc.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTAK Kits */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Hardware // Kits</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">ARTAK Kits</h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Deployed in ruggedized cases sealed against moisture and shock. ARTAK kits contain all necessary software, a built-in networking device, an edge-server, a charging-harness, and a rechargeable battery system that enables ARTAK to operate at full capacity without external power.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {kits.map((kit, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} data-testid={`artak-kit-${i}`} className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative">
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

          {/* Software Packages */}
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
            <p className="text-sm text-zinc-500 mb-4">Customized kit configurations available</p>
            <Link to="/#contact" data-testid="artak-contact-cta" className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors">
              Contact Us to Inquire <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
