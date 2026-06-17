import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Code2, Cpu, Network, GraduationCap, FileText,
  ArrowRight, CheckSquare, Layers, RefreshCw, Lock, Globe, Zap, Users,
} from "lucide-react";

const services = [
  { icon: Shield, label: "ARTAK Platform Licensing", anchor: "#artak-licensing", num: "01" },
  { icon: Code2, label: "Custom AR/VR/MR Development", anchor: "#custom-dev", num: "02" },
  { icon: Network, label: "Systems Integration & TAK Ecosystem", anchor: "#integration", num: "03" },
  { icon: GraduationCap, label: "Immersive Training & Simulation", anchor: "#training", num: "04" },
  { icon: FileText, label: "Professional Services & Gov. Contracting", anchor: "#professional", num: "05" },
];

const whyEolian = [
  { icon: Lock, title: "Patented Technology", desc: "ARTAK is protected by U.S. Patent 11,297,164 B2 and International Patent WO 2019/217437 A2 — enforceable through ~2040. You're licensing a defensible, proprietary platform, not a commodity tool." },
  { icon: Globe, title: "Device Agnostic", desc: "ARTAK runs on AR, VR, tablet, phone, laptop, and PC. Deploy it on hardware you already have — or let us spec the right kit for your mission." },
  { icon: Shield, title: "Combat Proven", desc: "Deployed with USSOCOM, U.S. Army, NATO SOF, and partner forces across six continents. ARTAK isn't theoretical — it's operational." },
  { icon: Zap, title: "Capital Efficient", desc: "Eolian has achieved significant operational milestones with lean resources. We build and deliver efficiently — and we expect the same from our partners." },
  { icon: RefreshCw, title: "Agile Development", desc: "Short sprints, continuous demos, and operator-in-the-loop feedback cycles aligned with the DoD Software Acquisition Pathway. You always have working software — never just a promise of it." },
  { icon: Layers, title: "MOSA-Compliant Architecture", desc: "All platforms and custom solutions are designed to Modular Open System Architecture principles per 10 U.S.C. § 4401 — modular, open-standards-based, and built to integrate, extend, and compete for sustainment." },
  { icon: Users, title: "Trusted Relationships", desc: "Teaming partnerships with Booz Allen Hamilton and MITRE. Congressional support for FY27 appropriations. A track record that speaks for itself." },
];

const naicsRows = [
  ["SAM.gov", "Registered"],
  ["Primary NAICS", "541511 — Custom Computer Programming Services"],
  ["Additional NAICS", "541512, 511210, 512110, 423420, 423430, 423490, 541613"],
  ["Teaming Partners", "Booz Allen Hamilton, MITRE, and others"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-[#FF0B1B]" />
      <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">{label}</span>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 mt-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
          <div className="w-1.5 h-1.5 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  return (
    <div data-testid="services-page">
      <SEO title="Services" description="EolianVR offers ARTAK platform licensing, custom AR/VR/MR development, systems integration, immersive training, and professional government contracting services." path="/services" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel label="Capabilities // Services" />
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-5xl">
            From Concept to<br />
            <span className="text-[#FF0B1B]">Operational Capability</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Eolian is a software development firm and systems integrator specializing in Augmented Reality, Virtual Reality, Mixed Reality, and AI/ML solutions that solve mission-critical problems. We design, build, integrate, and support — so your team stays focused on the mission.
          </p>
          <div className="mt-8">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors"
            >
              Get In Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + Services Overview */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <SectionLabel label="Overview // Full Lifecycle" />
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                End-to-End XR Solutions
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Eolian's services span the full lifecycle of enterprise AR/VR deployment — from initial concept and custom development to platform licensing, systems integration, and long-term support. Our team brings 100+ years of combined software engineering experience and a proven track record of delivering fielded capabilities to U.S. Special Operations Command and beyond.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Whether you need a turnkey software platform, a custom immersive application, or an experienced integration partner to connect your existing systems, Eolian has the expertise and the clearances to get it done.
              </p>
            </div>
            <div className="space-y-px bg-zinc-800">
              {services.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.anchor}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-[#0A0A0A] p-5 flex items-center gap-4 group hover:bg-[#0D0D0D] transition-colors relative block"
                >
                  <span className="font-mono text-xs text-zinc-700 w-6 flex-shrink-0">{s.num}</span>
                  <div className="w-8 h-8 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF0B1B] transition-colors flex-shrink-0">
                    <s.icon size={13} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                  </div>
                  <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase group-hover:text-white transition-colors">{s.label}</span>
                  <ArrowRight size={12} className="text-zinc-700 group-hover:text-[#FF0B1B] transition-colors ml-auto" />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 1: ARTAK Licensing */}
      <section id="artak-licensing" className="py-20 md:py-28 border-t border-zinc-800 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionLabel label="Service 01 // Platform Licensing" />
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                ARTAK — The Gold Standard in 3D Command &amp; Control
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                The Augmented Reality Team Awareness Kit (ARTAK) is Eolian's flagship, patented platform for multi-domain command & control, 3D mission planning, and real-time situational awareness. ARTAK is device-agnostic — running seamlessly across AR/VR headsets, tablets, phones, laptops, and PCs — and has been deployed on six continents in support of USSOCOM, NATO SOF, and partner forces.
              </p>
              <div className="border-l-2 border-[#FF0B1B] pl-4 mb-6">
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  ARTAK Block 2 is now available — featuring "World in a Box" global 3D mapping, JADC2 live data overlays, enhanced underground/interior mapping, and advanced edge capabilities.
                </p>
              </div>
              <Link to="/artak" className="inline-flex items-center gap-2 font-mono text-xs text-[#FF0B1B] tracking-wider uppercase hover:gap-3 transition-all">
                Learn More About ARTAK <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-px bg-zinc-800">
              {[
                { label: "Software License (Perpetual or Annual)", desc: "Deploy ARTAK across your organization's existing hardware ecosystem." },
                { label: "Enterprise SaaS Subscription", desc: "Cloud-hosted or on-prem instance with managed updates, security patches, and uptime SLAs." },
                { label: "ARTAK Kit", desc: "Pre-configured hardware and software bundles ready for immediate deployment in the field." },
                { label: "OTA / Government Contract Vehicle", desc: "Available through SAM.gov; experienced with SBIR, OTA, and direct contract award structures." },
              ].map((item, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-xs text-white tracking-wider uppercase mb-1">{item.label}</div>
                      <div className="text-xs text-zinc-500 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Custom Dev */}
      <section id="custom-dev" className="py-20 md:py-28 border-t border-zinc-800 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel label="Service 02 // Custom Development" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6 max-w-3xl">
            Bespoke Immersive Applications Built for Your Mission
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-zinc-800 mb-px">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="bg-[#0A0A0A] p-8 lg:col-span-2">
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Not every problem fits an off-the-shelf product. Eolian's engineering team designs and develops custom AR, VR, and Mixed Reality applications from the ground up — purpose-built for your specific use case, security requirements, and hardware environment.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">Every engagement follows a structured process:</p>
              <div className="flex flex-wrap gap-2">
                {["Requirements Definition", "Rapid Prototyping", "Iterative Development", "Operational Testing", "Deployment & Support"].map((step, i) => (
                  <span key={i} className="font-mono text-[10px] text-zinc-400 tracking-wider border border-zinc-800 px-3 py-1">
                    {String(i + 1).padStart(2, "0")} {step}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-[#0A0A0A] p-8">
              <div className="font-mono text-xs text-zinc-500 tracking-wider uppercase mb-4">Platform Expertise</div>
              <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
                <div><span className="text-zinc-300">Headsets:</span> HoloLens 2, Magic Leap 2, Meta Quest 2/Pro, enterprise HMDs</div>
                <div><span className="text-zinc-300">Engines:</span> Unity, Unreal Engine, WebXR</div>
                <div><span className="text-zinc-300">Environments:</span> Air-gapped / classified, cloud, hybrid edge</div>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-zinc-800">
            {[
              "Immersive training and simulation environments",
              "Mission rehearsal and ROC drill tools",
              "Interactive 3D data visualization and digital twin applications",
              "Remote collaboration and telepresence platforms",
              "AR-assisted maintenance, inspection, and operations tools",
            ].map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative">
                <CheckSquare size={14} className="text-[#FF0B1B] mb-3" />
                <p className="text-xs text-zinc-400 leading-relaxed">{item}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Agile + MOSA sub-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 mt-px">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="bg-[#0A0A0A] p-8">
              <div className="font-mono text-xs text-[#FF0B1B] tracking-wider uppercase mb-3">Methodology // Agile</div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight mb-4">Built Fast. Built Right. Built to Evolve.</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Eolian develops all software using Agile methodology. In defense contexts, where requirements shift with mission priorities, Agile is an operational necessity — not just a preference.
              </p>
              <BulletList items={[
                "<strong class='text-zinc-300'>Iterative Delivery</strong> — Working, testable software at every sprint",
                "<strong class='text-zinc-300'>Transparency</strong> — Sprint reviews and demos keep stakeholders informed at every milestone",
                "<strong class='text-zinc-300'>Adaptability</strong> — New requirements incorporated without costly re-architecture",
                "<strong class='text-zinc-300'>DoD Alignment</strong> — Aligned with the DoD Software Acquisition Pathway (DODI 5000.87)",
              ]} />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-[#0A0A0A] p-8">
              <div className="font-mono text-xs text-[#FF0B1B] tracking-wider uppercase mb-3">Architecture // MOSA</div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight mb-4">Open Architecture, Built for Longevity</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                All platforms are designed per Modular Open System Architecture (MOSA) principles — mandated across major DoD acquisition programs (10 U.S.C. § 4401) and a strategic advantage for clients seeking long-term flexibility.
              </p>
              <BulletList items={[
                "<strong class='text-zinc-300'>Modular Design</strong> — Components upgraded or replaced without disrupting the broader architecture",
                "<strong class='text-zinc-300'>Open Standards</strong> — REST APIs, TAK protocols, OGC standards — no vendor lock-in",
                "<strong class='text-zinc-300'>Competitive Sustainment</strong> — Open interfaces mean future support can be competed openly",
                "<strong class='text-zinc-300'>Technology Insertion</strong> — Designed to accommodate AI/ML, new sensors, and next-gen HMDs",
              ]} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service 3: Systems Integration */}
      <section id="integration" className="py-20 md:py-28 border-t border-zinc-800 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionLabel label="Service 03 // Systems Integration" />
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                Connecting the Tools Your Team Already Uses
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Eolian is an experienced systems integrator within the TAK ecosystem and broader DoD/enterprise sensor and data environments. We connect ARTAK and custom AR/VR applications to your existing data infrastructure, ensuring operators see a unified, real-time operating picture.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We work closely with your mission systems team to scope, architect, and deploy integrations that meet your security and interoperability requirements — without disrupting your existing workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-zinc-800">
              {[
                "TAK Server / ATAK / WinTAK / iTAK connectivity",
                "JADC2 live data stream ingestion (100+ supported sources)",
                "Friendly/Enemy PLI and Combat Power overlays",
                "Sensor fusion and ISR data integration",
                "Anduril Lattice SDK and third-party API integrations",
                "Custom data layer and node development",
              ].map((cap, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-5 flex items-center gap-3">
                  <div className="w-1 h-1 bg-[#FF0B1B] flex-shrink-0" />
                  <span className="text-sm text-zinc-400">{cap}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: Training & Simulation */}
      <section id="training" className="py-20 md:py-28 border-t border-zinc-800 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel label="Service 04 // Training & Simulation" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6 max-w-3xl">
            Train in the Virtual. Win in the Real.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-12 max-w-3xl">
            Eolian's immersive training solutions allow organizations to rehearse complex, high-stakes scenarios in a safe, repeatable, and cost-effective virtual environment — helping teams reduce risk, improve decision speed, and achieve better outcomes in the field.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            {[
              { title: "Virtual ROC Drills & Sand Tables", desc: "Conduct multi-participant mission rehearsals in a shared 3D environment — no physical space or printed maps required." },
              { title: "Assault Force Rehearsal", desc: "Walk through target facility layouts, including interior structures, subterranean networks, and exterior approaches, in full VR before going kinetic." },
              { title: "Multi-Site Intelligence Briefings", desc: "Deliver and receive remote mission briefs with joint forces, key leaders, and partner nations in a synchronized 3D common operating picture." },
              { title: "Scenario-Based Training", desc: "Build and run custom training scenarios across any domain: land, air, maritime, and space." },
            ].map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative">
                <h3 className="font-heading text-base font-bold text-white uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="mt-px bg-[#0A0A0A] border-t border-zinc-800 p-8">
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                Proven in action: ARTAK was used to support a NATO SOF 2025 exercise in which assault forces successfully located, contained, and neutralized a high-value target — defended by ~40 fighters in a 300-acre compound — in under four hours with minimal friendly casualties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service 5: Professional Services */}
      <section id="professional" className="py-20 md:py-28 border-t border-zinc-800 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionLabel label="Service 05 // Professional Services" />
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                A Proven Government Partner — From Contract Award to Fielded Capability
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Eolian is registered with SAM.gov and experienced working within the full spectrum of government procurement vehicles, including SBIR Phase I/II/III, Other Transaction Authority (OTA), and direct contract awards. We understand the compliance, reporting, and operational requirements of government programs — and we deliver on them.
              </p>
              <BulletList items={[
                "Program management and milestone reporting",
                "Technology transition support (from R&D to Program of Record)",
                "SBIR/STTR proposal development and commercialization planning",
                "On-site and remote operator training and onboarding",
                "Technical documentation, SOPs, and training materials",
                "Ongoing maintenance, software updates, and Tier 1–3 support",
              ]} />
            </div>
            <div>
              <div className="font-mono text-xs text-zinc-500 tracking-wider uppercase mb-4">Procurement Information</div>
              <div className="border border-zinc-800">
                {naicsRows.map(([key, val], i) => (
                  <div key={i} className={`flex gap-4 p-4 ${i < naicsRows.length - 1 ? "border-b border-zinc-800" : ""}`}>
                    <span className="font-mono text-xs text-zinc-500 w-36 flex-shrink-0">{key}</span>
                    <span className="font-mono text-xs text-zinc-300">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Eolian */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <SectionLabel label="Why Eolian // Differentiators" />
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              The Capability You Need.<br />The Partner You Can Trust.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {whyEolian.map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }} variants={fadeUp} className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative">
                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-5 group-hover:border-[#FF0B1B] transition-colors">
                  <item.icon size={16} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wide mb-3">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
            Ready to Explore What's Possible?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-10">
            Whether you're evaluating ARTAK for your command, building a custom immersive solution, or looking for an experienced integration partner — we'd like to hear from you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
            <Link
              to="/artak"
              className="inline-flex items-center gap-2 border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors"
            >
              Learn More About ARTAK <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
