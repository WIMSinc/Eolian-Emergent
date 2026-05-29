import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target, Lightbulb, HelpCircle, Microscope, HeartHandshake, TrendingUp,
  Shield, Map, AlertTriangle, Trophy, FileText, ChevronRight,
} from "lucide-react";
import PartnersSection from "@/components/PartnersSection";

const values = [
  { icon: Lightbulb, title: "Passion for Innovation", desc: "We are deeply committed to investing in R&D focused on Mixed Reality and Artificial Intelligence for Defense, Healthcare, and various other use-cases." },
  { icon: Target, title: "Solve the Really Hard Problems", desc: "We don't shy away from the big scary challenges that inherently come with taking on big, bold tasks. They are the ones truly worth attacking." },
  { icon: HelpCircle, title: 'Relentless Pursuit of "The Why"', desc: "We love to hear people say things can't be done, or that something is impossible. Why can't they? We simply don't accept the status quo." },
  { icon: Microscope, title: "Insatiable Curiosity", desc: "This is essentially a required trait regardless of what role you play with us. You must love learning, exploring, demoing, and creating new things." },
  { icon: TrendingUp, title: "Willingness to Fail", desc: "When you take on the hard problems in life, failure is inevitable and an essential part of the journey when you perceive setbacks appropriately and learn from them." },
  { icon: HeartHandshake, title: "Generosity", desc: "We couldn't do what we do without our invaluable network of clients, advisors, mentors, former clients, freelancers, friends, and family." },
];

const naics = [
  "541511 — Custom Computer Programming Services",
  "541512 — Computer Systems Design Services",
  "541613 — Marketing Consulting Services",
  "423420 — Office Equipment Merchant Wholesalers",
  "423430 — Computer & Peripheral Equipment Wholesalers",
  "511210 — Software Publishers",
  "512110 — Motion Picture and Video Production",
];

const artakCapabilities = [
  { label: "Device Agnostic", desc: "Runs on AR/VR headsets, tablets, smartphones, laptops, and PCs — full spectrum of virtualization hardware." },
  { label: "3D Mission Planning", desc: "Collaborative, immersive pre-mission planning using photorealistic 3D maps from drone imagery and LiDAR scans." },
  { label: "Command & Control (C2)", desc: "Real-time Common Operating Picture with live TAK, PLI, drone video, sensor data, and 100+ JADC2 data streams." },
  { label: "ROC Drills", desc: "Full virtual sand table replacement — distributed rehearsals with participants across multiple locations simultaneously." },
  { label: "Edge-Deployable", desc: "Self-contained in ruggedized pelican cases with integrated edge server, networking, and battery — no internet required." },
  { label: "Interoperability", desc: "Compatible with ATAK, WinTAK, TAK Server, Anduril Lattice, Starlink, and a wide range of DoD and commercial systems." },
  { label: "AI Integration", desc: "Real-time language translation, AI-embedded mission planning, and automated scenario generation (roadmap active)." },
  { label: "Space Domain Awareness", desc: "STAK extends ARTAK's architecture to 3D visualization of satellite constellations and orbital dynamics." },
  { label: "Drone Swarm Control", desc: "Tasking, supervision, and dynamic re-tasking of multi-platform autonomous drone swarms directly inside ARTAK." },
];

const subpageLinks = [
  {
    icon: Shield,
    label: "Past Performance",
    desc: "Proven in the Field",
    detail: "Operational deployments, OTA contracts, and field-validated results across USSOCOM, DIU, and partner forces on 6 continents.",
    to: "/about/past-performance",
  },
  {
    icon: Trophy,
    label: "Awards & Recognition",
    desc: "Honors and Industry Recognition",
    detail: "HIRE Vets Gold Medallion, APFIT Program Award, Unity Creator Award, XR Today recognition, and Congressional appropriations.",
    to: "/about/awards",
  },
  {
    icon: FileText,
    label: "Intellectual Property",
    desc: "Patents & Technology Moat",
    detail: "Patented Mixed Reality Platform (U.S. 11,297,164 B2) enforceable through ~2040 — the foundation of all ARTAK capabilities.",
    to: "/about/intellectual-property",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function About() {
  return (
    <div data-testid="about-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Company // About</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            About <span className="text-[#FF0B1B]">Eolian</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            EolianVR, Inc. is a defense-technology company and systems integrator specializing in mixed reality (XR) solutions purpose-built for Multi-Domain Operations. Founded in 2016 and headquartered in Largo, Florida, Eolian is a trusted technology partner to USSOCOM, the Defense Innovation Unit, and a growing ecosystem of allied and partner forces.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="border-l-2 border-[#FF0B1B] pl-4">
              <div className="font-heading text-2xl font-bold text-white">$15M+</div>
              <div className="font-mono text-xs text-zinc-500 tracking-wider uppercase mt-1">Cumulative Revenue Since 2020</div>
            </div>
            <div className="border-l-2 border-[#FF0B1B] pl-4">
              <div className="font-heading text-2xl font-bold text-white">6 Continents</div>
              <div className="font-mono text-xs text-zinc-500 tracking-wider uppercase mt-1">ARTAK Deployed</div>
            </div>
            <div className="border-l-2 border-[#FF0B1B] pl-4">
              <div className="font-heading text-2xl font-bold text-white">$1.96M</div>
              <div className="font-mono text-xs text-zinc-500 tracking-wider uppercase mt-1">Total Capital Raised</div>
            </div>
            <div className="border-l-2 border-[#FF0B1B] pl-4">
              <div className="font-heading text-2xl font-bold text-white">Founded 2016</div>
              <div className="font-mono text-xs text-zinc-500 tracking-wider uppercase mt-1">Largo, Florida</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Problem */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="bg-[#0A0A0A] p-8 md:p-12">
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase block mb-4">[01] Our Mission</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">Accelerate the Kill Chain</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Eolian's mission is to accelerate the kill chain for the world's most capable military and security forces — providing the command-and-control and situational awareness tools that turn information advantage into decisive action. We build technology that bridges the gap between the digital and physical worlds, enabling commanders and operators to see more, understand faster, and act decisively in complex, rapidly evolving environments.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-[#0A0A0A] p-8 md:p-12">
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase block mb-4">[02] The Problem We Solve</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">Beyond Legacy 2D Systems</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The era of the Global War on Terror has ended. The United States and its allies now face relentless Great Power Competition. Tomorrow's conflicts demand tools that deliver instant situational awareness and seamless, adaptive communication — yet today's solutions fall critically short. Modern operations span mega-cities, subterranean tunnels, underwater environments, cyber space, and orbital space. Traditional 2D maps, flat screens, and disconnected systems cannot keep pace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Solution: ARTAK */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Solution // Platform</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Our Solution: <span className="text-[#FF0B1B]">ARTAK</span>
            </h2>
            <p className="mt-4 text-base text-zinc-400 max-w-3xl leading-relaxed">
              ARTAK is a Multi-Domain Operations joint planning and command and control platform — a live Digital Twin of the battlespace that unifies mission planning, a real-time Common Operating Picture, and an extensible Tactical Operations Center inside a single shared decision environment. It synchronizes planning and C2 activities across echelons, domains, and warfighting functions by bringing commanders, staff, and operators together to plan, rehearse, and execute inside the same immersive 3D environment.
            </p>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed max-w-3xl">
              ARTAK is an implementation of Eolian's patented Eolian Mixed Reality Platform (U.S. Patent No. 11,297,164 B2; International Patent WO 2019/217437 A2) — a framework that allows customers to stand up, sustain, and ingest data into a 3D mixed reality environment that is secure and massively scalable. The patent is enforceable through approximately 2040, providing Eolian with a durable, defensible technology moat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {artakCapabilities.map((cap, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeUp}
                className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF0B1B] mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-white tracking-wide uppercase mb-1">{cap.label}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Maker */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#FF0B1B]" />
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Companion Software // Map Maker</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                Map <span className="text-[#FF0B1B]">Maker</span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Map Maker is Eolian's companion software application that generates high-quality 3D maps in minutes from raw drone imagery or LiDAR scans. Powered by machine learning and next-generation surface reconstruction algorithms, Map Maker is fully automated, works without internet connectivity, and outputs non-proprietary file formats compatible with ARTAK, ATAK, WinTAK, Meshlab, and other government systems.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Maps can be generated at 8.8 cm GSD at a rate of 200+ acres per hour using platforms such as Skydio, Anafi Parrot, and many more.
              </p>
              <Link to="/mapmaker" className="inline-flex items-center gap-2 mt-6 font-mono text-xs text-[#FF0B1B] tracking-wider uppercase hover:gap-3 transition-all">
                Learn More About Map Maker <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-px bg-zinc-800">
              {[
                { label: "Fully Automated", desc: "No manual intervention — point at drone footage and get a 3D map." },
                { label: "Offline Capable", desc: "Works entirely without internet connectivity for edge deployments." },
                { label: "200+ Acres/Hour", desc: "8.8 cm GSD resolution at high throughput using commercial UAS platforms." },
                { label: "Open Formats", desc: "Non-proprietary output compatible with ARTAK, ATAK, WinTAK, Meshlab, and more." },
              ].map((item, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-5 flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-xs text-white tracking-wider uppercase mb-1">{item.label}</div>
                    <div className="text-xs text-zinc-500 leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subpage Links */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Company // Track Record</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Explore Our Record
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
            {subpageLinks.map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link
                  to={item.to}
                  className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative flex flex-col h-full block"
                >
                  <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-5 group-hover:border-[#FF0B1B] transition-colors">
                    <item.icon size={16} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.15em] text-zinc-500 uppercase mb-2">{item.desc}</span>
                  <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight mb-3">{item.label}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed flex-1">{item.detail}</p>
                  <div className="flex items-center gap-2 mt-5 font-mono text-xs text-[#FF0B1B] tracking-wider uppercase group-hover:gap-3 transition-all">
                    View Details <ChevronRight size={12} />
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Principles // Values</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {values.map((v, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-6 md:p-8 group hover:bg-[#0D0D0D] transition-colors relative">
                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#FF0B1B] transition-colors">
                  <v.icon size={18} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white tracking-wide uppercase mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / SAM.GOV */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">Federal // Procurement</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">Available on SAM.GOV</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Eolian's services are available to Federal Agencies through SAM.GOV. We develop and sell a variety of products and services that utilize AR, VR, & AI to solve critical problems for government and enterprise customers.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Drawing from a combined 100+ years in software development and engineering, our team develops and deploys applications across Microsoft HoloLens 2, Magic Leap 2, Meta Quest, and many more platforms.
              </p>
            </div>
            <div className="bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#FF0B1B]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">NAICS Codes</span>
              </div>
              <div className="space-y-3">
                {naics.map((code, i) => (
                  <div key={i} className="font-mono text-xs text-zinc-500 py-2 border-b border-zinc-800/50 last:border-0">
                    {code}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersSection />
    </div>
  );
}
