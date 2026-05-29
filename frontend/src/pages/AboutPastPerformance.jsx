import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Star, Users } from "lucide-react";

const contracts = [
  {
    tag: "USSOCOM",
    label: "APFIT Production OTA",
    period: "Nov. 2022 — Present",
    amount: "$10M (3-Year)",
    items: [
      "1 of 10 companies selected for the Congressionally Funded APFIT program, nominated by USSOCOM",
      "Procurement of 39 ARTAK kits and ~500 software licenses for USSOCOM units",
      "Transitioned directly from a 2020 Prototype OTA to Production — a rare and significant distinction",
      "ARTAK actively deployed on 6 continents",
    ],
  },
  {
    tag: "DIU",
    label: "5G EABO Prototype OTA",
    period: "May 2023 — Jan. 2025",
    amount: "$1.7M",
    items: [
      "Award #HQ0845-23-9-0046 from the Defense Innovation Unit in collaboration with the U.S. Marine Corps, NWIC, Lockheed Martin, and others",
      "Use Case: 5G Expeditionary Advanced Base Operations (EABO) aligned to C2/SA use cases",
      "Demonstrated ARTAK on DoD 5G infrastructure at Marine Corps Base Camp Pendleton during two Mission Scenario Sprints with NIWC Pacific and MCTSSA",
      "Demonstrated 3D mapping from UAS, multi-domain situational awareness in AR/VR, data transmission over 5G at high bandwidth and low latency",
      'DIU transition memo confirms: "By all accounts the prototype has demonstrated the goals of providing an integrated C2 tool for decision makers."',
      "Technology proved applicable to various wireless networks beyond 5G, including 4G and WiFi",
    ],
  },
  {
    tag: "USSOCOM",
    label: "Original Prototype OTA",
    period: "April 2020",
    amount: "$2.4M",
    items: [
      "Foundation OTA from USSOCOM to develop ARTAK and DAVID (Data Aggregation for Intelligent Decisioning)",
      "Foundation contract from which ARTAK was built and proven",
    ],
  },
  {
    tag: "ASD(MC) / USD(R&E)",
    label: "Information Exchange Agreement",
    period: "June 2025",
    amount: "IEA HQ003425IEA16",
    items: [
      "Memorandum of Agreement with Washington Headquarters Services Acquisition Directorate on behalf of the Assistant Secretary of Defense for Mission Capabilities",
      "Scope: Multi-Domain Operations and Space Domain Operations use cases",
      "Precursor to a proposed OTA contract estimated at ~$6M",
      "Demonstrates top-level DoD engagement at the USD(R&E) level",
    ],
  },
];

const operations = [
  {
    title: "NATO SOF 2025",
    location: "Fort Carson, CO",
    period: "Dec. 2024 — June 2025",
    desc: "B/2/10 SFG(A) employed ARTAK in preparation for and during NATO SOF 2025. A 39-operator assault force from U.S., UK, and Polish SOF used ARTAK for planning, briefing, and rehearsal. A high-value target defended by ~40 fighters in a 300-acre, 400,000+ SF compound was located, contained, and neutralized in under 4 hours with minimal friendly casualties.",
  },
  {
    title: "2nd Battalion, 160th SOAR Joint ROC Drill",
    location: "Cannon AFB, NM",
    period: "Sept. 2024",
    desc: "90-minute joint Rehearsal of Concepts (ROC) Drill with 5th SFG(A), 23rd STS, and other stakeholders — the largest and longest brief ever conducted by a customer in ARTAK.",
  },
  {
    title: "NSWG-8 TRADET Live-Fire Exercise",
    location: "Fort Hunter Liggett, CA",
    period: "July 2025",
    desc: "Integrated ARTAK with GoTenna and Starlink to track, monitor, and replay trainee positions in real-time during live-fire assault and react-to-contact drills.",
  },
];

const additionalCustomers = [
  "USASOC — United States Army Special Operations Command (Airborne)",
  "U.S. Army Engineer Research and Development Center (ERDC) / ERDCWERX",
  "U.S. Military Academy (USMA) — West Point",
  "UK Ministry of Defence",
  "Pacific Northwest National Laboratory (PNNL)",
  "American Rheinmetall",
  "Montana State University",
  "Mayo Clinic",
  "Atrium Health",
  "Insight Partners",
  "EdgyBees",
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function AboutPastPerformance() {
  return (
    <div data-testid="past-performance-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <Link to="/about" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-wider uppercase hover:text-white transition-colors mb-8">
            <ArrowLeft size={12} /> Back to About
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Company // Track Record</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            Proven in the Field<span className="text-[#FF0B1B]">.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            ARTAK has been tested, validated, and operationally deployed by the most elite military units in the world. The following represents Eolian's documented operational record.
          </p>
        </div>
      </section>

      {/* OTA Contracts */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Contracts // Awards</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Government Contracts
            </h2>
          </div>
          <div className="space-y-px bg-zinc-800">
            {contracts.map((c, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                className="bg-[#0A0A0A] p-8 md:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase border border-[#FF0B1B]/30 px-2 py-0.5">{c.tag}</span>
                      <span className="font-mono text-xs text-zinc-500 tracking-wider">{c.period}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight">{c.label}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-heading text-2xl font-bold text-white">{c.amount}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {c.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Operations */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Operations // 2024–2025</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Notable Operations & Exercises
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
            {operations.map((op, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative"
              >
                <div className="font-mono text-xs text-zinc-500 tracking-wider mb-1">{op.location}</div>
                <div className="font-mono text-xs text-[#FF0B1B] tracking-wider mb-3">{op.period}</div>
                <h3 className="font-heading text-base font-bold text-white uppercase tracking-tight mb-4">{op.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{op.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Customers */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#FF0B1B]" />
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Customers // Historical</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                Additional Customers
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Beyond our core USSOCOM and DIU partnerships, Eolian has worked with a broad range of military, government, academic, and commercial organizations.
              </p>
            </div>
            <div className="bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8">
              <div className="space-y-0">
                {additionalCustomers.map((customer, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-center gap-3 py-2.5 border-b border-zinc-800/50 last:border-0"
                  >
                    <div className="w-1 h-1 bg-[#FF0B1B] flex-shrink-0" />
                    <span className="font-mono text-xs text-zinc-400 tracking-wide">{customer}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
