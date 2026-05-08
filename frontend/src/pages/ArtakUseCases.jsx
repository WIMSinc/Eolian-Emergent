import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Search, Shield, Siren, Flame, Rocket, ArrowRight, Box, Download, MapPin, Target, Radio } from "lucide-react";
import SEO from "@/components/SEO";
import CatalogModal from "@/components/CatalogModal";

const useCases = [
  {
    icon: AlertTriangle,
    sysLabel: "[UC.01]",
    title: "Disaster Response & Emergency Management",
    desc: "In times of chaos, ARTAK transforms fragmented operations into a unified mission picture. Real-time drone feeds, IoT data, and geospatial overlays help command centers coordinate faster, deploy smarter, and save more lives.",
    image: "/artak-in-action.png",
    slug: "disaster-response",
  },
  {
    icon: Search,
    sysLabel: "[UC.02]",
    title: "Search & Rescue / First Responders",
    desc: "Every second matters. ARTAK integrates UAV data, terrain models, and team tracking into a shared 3D environment — enabling crews to visualize hazards, optimize routes, and train in realistic VR scenarios before entering the field.",
    image: "/artak-in-action.png",
    slug: "search-rescue",
  },
  {
    icon: Shield,
    sysLabel: "[UC.03]",
    title: "Security & Protection Services",
    desc: "Whether providing security for individuals, events, or facilities, ARTAK delivers a fused operational picture — combining radar, drone, and sensor data in a single spatial interface. Agencies gain 360-degree visibility over wide or remote regions.",
    image: "/artak-dhs-ov1.png",
    slug: "security-protection",
  },
  {
    icon: Siren,
    sysLabel: "[UC.04]",
    title: "Police & Law Enforcement",
    desc: "For urban operations, crowd control, or tactical response, ARTAK provides a shared operational view that improves decision-making and reduces risk. Officers can rehearse complex scenarios in VR and access real-time overlays during live incidents.",
    image: "/artak-in-action.png",
    slug: "police-law-enforcement",
  },
  {
    icon: Flame,
    sysLabel: "[UC.05]",
    title: "Fire & Emergency Services",
    desc: "ARTAK gives fire commanders complete situational awareness — tracking crews, visualizing structure layouts, and modeling wildfire spread in 3D. Through AR and VR, teams can prepare, respond, and review every mission with confidence.",
    image: "/artak-in-action.png",
    slug: "fire-emergency",
  },
  {
    icon: Rocket,
    sysLabel: "[UC.06]",
    title: "Space & Aerospace Operations",
    desc: "From orbital mission planning to ground-station coordination, ARTAK enables teams to visualize assets, trajectories, and contingencies in immersive 3D. It brings real-time command awareness to an increasingly complex operational domain.",
    image: "/artak-xr-sdve.jpg",
    slug: "space-aerospace",
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
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <div data-testid="artak-usecases-page">
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <SEO
        title="ARTAK - National Security & Public Safety"
        description="ARTAK is a next-generation immersive C2 platform for disaster response, search & rescue, security, law enforcement, fire services, and space operations."
        path="/artak"
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-4">
            <img src="/artak-logo-white.png" alt="ARTAK" className="h-10 w-auto opacity-90" />
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
            <img src="/artak-logo-white.png" alt="ARTAK" className="h-7 w-auto opacity-70" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 uppercase">DHS Operational View (OV-1) // January 2026</span>
          </div>
          <div className="border border-zinc-800 overflow-hidden group">
            <img
              src="/artak-dhs-ov1.png"
              alt="DHS ARTAK Operational View - Secret Service, FIFA World Cup Security, CBP, Coast Guard, Critical Infrastructure Protection"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <p className="mt-4 font-mono text-[10px] text-zinc-600 tracking-wider text-center">
            ARTAK Platform: Multi-Domain C2 // Real-Time 3D Visualization // Secure Tactical Mesh Networking
          </p>
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
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{uc.desc}</p>
                  <Link to={`/artak/${uc.slug}`} data-testid={`usecase-link-${i}`} className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#FF0B1B] hover:text-white transition-colors uppercase">
                    Learn More <ArrowRight size={12} />
                  </Link>
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
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#contact" data-testid="artak-contact-cta" className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors">
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
            {/* Sage Eagle 25-2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} data-testid="case-study-sage-eagle" className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={14} className="text-[#FF0B1B]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.01]</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">Sage Eagle 25-2</h3>
              <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">3rd Special Forces Group (Airborne) // ODA 3121</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                3121 used ARTAK during Sage Eagle 25-2 to visualize their targets and plan various aspects of their mission. As part of the exercise, the team sourced an asset to fly a small UAS around three areas of interest.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Recon:</span> Imagery collected autonomously using Skydio X2+ at 200 acres/hr
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Process:</span> 3D maps generated from UAS images using Map Maker (~5.5 sq KM)
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Track:</span> Position of force tracked via ATAK with GoTENNA + Starlink
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Visualize:</span> Real-time position of force visible on 3D map via Meta Quest 3
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Skydio X2+", "Map Maker", "Meta Quest 3", "GoTENNA", "Starlink", "ATAK"].map((t) => (
                  <span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>

            {/* NSWG-8 TRADET */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} data-testid="case-study-nswg8" className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative">
              <div className="flex items-center gap-2 mb-4">
                <Target size={14} className="text-[#FF0B1B]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.02]</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">NSWG-8 TRADET</h3>
              <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">Naval Special Warfare Group 8 // Training Detachment</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                NSWG-8 TRADET integrated ARTAK with new COTS devices (GoTENNA, Starlink) to track, monitor and replay trainees' positions during live-fire assault and react-to-contact drills.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Monitor:</span> Dislocated OTCs monitored exercise in ARTAK — watching real-time movements on a 3D replica of the range
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Replay:</span> OTCs and trainees replayed the exercise in ARTAK afterwards for AAR
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Result:</span> Enhanced training feedback loop with spatial context and position history
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["GoTENNA", "Starlink", "Live-Fire Tracking", "3D Replay", "AAR"].map((t) => (
                  <span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>

            {/* 160th SOAR ROC Drill */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} data-testid="case-study-160soar" className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Radio size={14} className="text-[#FF0B1B]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.03]</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">2nd Battalion, 160th SOAR — Joint ROC Drill</h3>
              <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">10–14 September 2024 // Cannon AFB, New Mexico</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    2/160 SOAR used ARTAK to conduct a 90-minute rehearsal of concepts (ROC) drill during a joint exercise with US ARMY 5th SFG(A), USAF 23rd STS, and other stakeholders — the largest and longest brief ever conducted by a customer in ARTAK.
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Prior to the ROC drill, key leaders collaborated in ARTAK using a realistic 3D map of the area of interest to develop the mission plan. During the drill, briefers used ARTAK to rehearse and brief the plan while enablers and personnel viewed on AR headsets and TV screens.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300 font-medium">Recon:</span> Exterior imaged autonomously using Skydio X2+ at 200 acres/hr
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300 font-medium">Process:</span> 3D maps generated using Map Maker on laptop
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300 font-medium">Plan:</span> Leaders visualized landing zones, avenues of approach, and scheme of maneuver
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300 font-medium">Brief:</span> 90-min ROC drill — largest/longest ever conducted by customer in ARTAK
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300 font-medium">View:</span> AR HMDs + TV monitors for distributed viewing
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300 font-medium">Units:</span> 160th SOAR, 5th SFG(A), USAF 23rd STS
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Skydio X2+", "Map Maker", "AR HMDs", "ROC Drill", "Joint Exercise", "5th SFG(A)", "23rd STS"].map((t) => (
                  <span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
