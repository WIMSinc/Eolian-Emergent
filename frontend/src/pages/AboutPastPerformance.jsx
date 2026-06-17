import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
      "DIU transition memo confirms: \"By all accounts the prototype has demonstrated the goals of providing an integrated C2 tool for decision makers.\"",
      "Technology proved applicable to various wireless networks beyond 5G, including 4G and WiFi",
    ],
  },
  {
    tag: "USSOCOM",
    label: "Original Prototype OTA",
    period: "April 2020",
    amount: "$2.4M",
    problemStatement: "Modern special operations forces operate in information-saturated environments where the critical challenge isn't a lack of data — it's the inability to aggregate it, make sense of it, and act on it faster than the adversary. In 2020, SOF commanders faced a fragmented landscape of siloed C2 tools, incompatible data formats, and systems that couldn't speak to each other — let alone present a coherent, real-time common operating picture to a geographically distributed force. Operators were making high-stakes decisions from 2D maps, disconnected intelligence feeds, and planning processes that hadn't fundamentally changed in decades. USSOCOM tasked EolianVR to solve this. The mandate was ambitious: build a data-agnostic aggregation and visualization engine capable of ingesting intelligence from any source, in any format, and rendering it in a unified, immersive, real-time decision environment accessible from the edge.",
    programs: [
      {
        name: "ARTAK",
        fullName: "Augmented Reality Tactical Awareness Kit",
        desc: "ARTAK was purpose-built to answer USSOCOM's mandate — delivering a unified, immersive C2 platform capable of aggregating multi-domain intelligence and presenting it as a real-time, shared 3D common operating picture across AR, VR, and PC devices simultaneously. From its 2020 prototype foundation, ARTAK has since been deployed on 6 continents, validated across 10+ SOF exercises, and transitioned directly to a $10M production OTA — one of the rarest distinctions in the DoD acquisition process.",
        items: [
          "Data-agnostic ingestion engine — fuses ISR feeds, UAS imagery, ATAK PLI, and sensor data from any source",
          "Immersive 3D common operating picture rendered across AR, VR, and PC simultaneously",
          "Real-time collaborative planning environment accessible from the tactical edge",
          "Foundation for ARTAK Map Maker — 3D digital twin generation from UAS-collected imagery",
        ],
      },
      {
        name: "DaVID",
        fullName: "Data Aggregation and Visualization for Intelligent Decisioning",
        desc: "The increasing technical complexity of future missions has driven a rapid rise in the volume, variety, and veracity of data across the SOCOM enterprise — from the tactical level to the acquisition shops. As a result, there are exponentially more complex and dynamic relationships within data that are difficult to identify, visualize, and communicate using current technology. Eolian was tasked with solving this problem at scale: ingesting 1,200 BAA RFP responses and creating an immersive, interactive 3D hypergraph that made those relationships visible and actionable — transforming an overwhelming acquisition data challenge into a navigable decision environment.",
        items: [
          "Ingested and structured 1,200 BAA RFP responses for SOCOM S&T acquisition analysis",
          "Generated an immersive, interactive 3D hypergraph surfacing complex relationships within the data",
          "Demonstrated that exponentially complex data sets can be rendered navigable through immersive visualization",
          "Validated EolianVR's data aggregation architecture as applicable across tactical and enterprise acquisition contexts",
        ],
      },
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

const exercises = [
  {
    category: "SOF Field Exercise",
    title: "Sage Eagle 25-2",
    unit: "3rd SFG(A) — ODA 3121",
    location: "Fort AP Hill, VA",
    period: "August 2025",
    desc: "ODA 3121 employed an ARTAK Starter Kit throughout Sage Eagle 25-2, using the platform to visualize targets and plan multiple aspects of their mission. The team used UAS-collected imagery to generate a 3D digital twin of their objective area through ARTAK Map Maker — processing data on a laptop and viewing the terrain model across AR, VR, and PC simultaneously. Operators analyzed target buildings, planned infil routes, and emplaced pre-staged UAS assets on the 3D map before mission execution.",
    outcome: "Full ISR-to-digital-twin-to-plan cycle completed from a barracks environment, demonstrating ARTAK's ability to compress the PDSS-to-brief timeline.",
  },
  {
    category: "SOF Field Exercise",
    title: "NSWG-8 TRADET Live-Fire Exercise",
    unit: "Naval Special Warfare Group 8 TRADET",
    location: "Fort Hunter Liggett, CA",
    period: "July 2025",
    desc: "Integrated ARTAK with GoTenna and Starlink to track, monitor, and replay trainee positions in real-time during live-fire assault and react-to-contact drills. Demonstrated ARTAK's ability to serve as both a live C2 tool and a post-action debrief platform within the same exercise.",
    outcome: "Real-time position tracking and replay validated across live-fire conditions using ARTAK + GoTenna + Starlink integration.",
  },
  {
    category: "SOF Field Exercise",
    title: "Red Devil Validation / NATO SOF 2025",
    unit: "2nd Bn, 10th SFG(A) — Bravo Company",
    location: "Fort Carson, CO",
    period: "Nov. 2024 — June 2025",
    desc: "Bravo Company 2/10 SFG(A) integrated ARTAK throughout the planning, briefing, and rehearsal cycle for NATO SOF 2025. A combined assault force of 39 operators from US, UK, and Polish SOF used ARTAK to visualize interior, subterranean, and exterior structures of a high-value target compound. The HVT was located, contained, and neutralized in under four hours with minimal friendly casualties, against approximately 40 enemy fighters within a 300-acre compound featuring 400,000+ sq ft of interconnected structures and tunnel networks.",
    outcome: "39 multi-national SOF operators navigated a 300-acre, 400,000+ sq ft compound; HVT neutralized in under 4 hours.",
  },
  {
    category: "SOF Field Exercise",
    title: "2nd Battalion, 160th SOAR Joint ROC Drill",
    unit: "2nd Bn, 160th SOAR / 5th SFG(A) / 23rd STS",
    location: "Cannon AFB, NM",
    period: "Sept. 2024",
    desc: "90-minute joint Rehearsal of Concepts (ROC) Drill with 5th SFG(A), 23rd STS, and other stakeholders — the largest and longest brief ever conducted by a customer in ARTAK. Prior to the drill, key leaders collaborated using a realistic 3D map of the area of interest to develop the mission plan.",
    outcome: "Largest and longest brief ever conducted in ARTAK; validated platform at task force scale across multiple SOF components.",
  },
  {
    category: "SOF Field Exercise",
    title: "Fused Response",
    unit: "7th SFG(A) — C/3/7",
    location: "Fort AP Hill, VA",
    period: "2024",
    desc: "During Fused Response, Charlie Company 3/7 executed a Hard Target Defeat scenario using ARTAK to create and plan against a realistic digital twin of the objective within 10 minutes of recon completion. Both partner force and ODA commanders used the 3D map to brief the TSOC and State Department from distributed forward operating bases — enabling remote mission approval without requiring physical co-location.",
    outcome: "Mission planning digital twin ready within 10 minutes of UAS recon; remote brief to TSOC and State Dept. successfully executed.",
  },
  {
    category: "SOF Field Exercise",
    title: "Eglin Strike",
    unit: "7th SFG(A)",
    location: "Eglin Air Force Base, FL",
    period: "2024",
    desc: "The Eglin Strike exercise tasked a 7th SFG(A) ODA with remotely advising and assisting a partner force Quick Reaction Force during a simulated night-time incident. ARTAK generated a digital twin of the objective using both electro-optical and thermal infrared imagery collected by a FLIR SkyRaider UAS — the first documented fusion of thermal data into a 3D rendered environment during a live exercise.",
    outcome: "First documented nighttime thermal-fused 3D digital twin generated in a live exercise environment; materially enhanced ODA situational awareness in low-visibility conditions.",
  },
];

const assessments = [
  {
    featured: true,
    category: "Formal Tech Assessment",
    assessor: "U.S. Army Maneuver Battle Lab (MBL)",
    title: "Army Expeditionary Warrior Experiment (AEWE) 2024",
    participants: "U.S. Army (Alpha Co., 1-29 Infantry), British Army (Alma Co., 2nd Btn, Royal Yorkshire Regiment), German Versuchskraefte Heer",
    location: "Fort Moore, GA",
    period: "2024",
    desc: "AEWE 2024 assessed ARTAK in a force-on-force exercise series spanning urban and woodland terrain, day and night operations, against a peer threat equipped with experimental capabilities. Results were compelling across every dimension — soldiers specifically cited ARTAK's ability to allow commanders and staff to \"step into the battlefield before the operation starts.\"",
    quote: "\"ARTAK is effective and suitable for use in an operational environment. It increases the Soldier's capability in the function of command and control. It should reside at platoon level and above but particularly at battalion and brigade levels for the conduct of the military decision-making process.\"",
    quoteSource: "— U.S. Army MBL AEWE 2024 Official Report",
    stats: [
      { value: "93%", label: "rated effective/very effective for mission planning" },
      { value: "100%", label: "agreed ARTAK increases C2 capability" },
      { value: "93%", label: "rated multi-user interaction adequate/very adequate" },
      { value: "93%", label: "rated overall use intuitive to the Soldier" },
    ],
  },
  {
    featured: true,
    category: "Formal Tech Assessment",
    assessor: "QinetiQ on behalf of the British Army",
    title: "Army Warfighting Experiment (AWE) 2024",
    participants: "2RYORKS Alma Company and international allies — Dutch, US, German, Italian, French, and Spanish forces",
    location: "MOD Copehill Down Village (CDV), UK",
    period: "Nov. — Dec. 2023",
    desc: "The British Army's AWE assessed ARTAK against the hypothesis that urban force elements with dynamic 3D models of their environment can better design layered combined arms plans. The assessment spanned paper review, virtual demonstration, and a full force-on-force exercise. ARTAK was integrated with the AWE MANNA network, enabling real-time ATAK PLI data to flow directly into the 3D environment.",
    quote: "\"ARTAK provides a capability enhancement over baseline planning and briefing methods and could be invaluable to Aviation Commanders, aviation assets, and Fire Support Teams, given they require 3D battlespace awareness for coordination and delivery of kinetic effects.\"",
    quoteSource: "— QinetiQ Equipment Assessment Report (QINETIQ/24/00539)",
    stats: [
      { value: "6", label: "nations represented in the force-on-force assessment" },
      { value: "3", label: "assessment levels: paper, virtual demo, live exercise" },
    ],
  },
  {
    featured: false,
    category: "OUSW(R&E) / OASW-MC / ODASW",
    title: "T-REX (Tactical Response Exercise)",
    unit: "RAPTR Task Force — Rapid Assessment of Prototype Technology Readiness",
    location: "XX",
    period: "August 2025",
    desc: "ARTAK participated in T-REX under the RAPTR Task Force (Rapid Assessment of Prototype Technology Readiness), organized by OUSW(R&E), OASW-MC, and ODASW Prototyping & Experimentation, Experiments. The exercise validated ARTAK's performance across tactical response operations in a prototyping and experimentation context.",
    outcome: "Validated by OUSW(R&E) prototyping and experimentation framework under the RAPTR Task Force.",
  },
  {
    featured: false,
    category: "Army Futures Command",
    title: "Project Convergence — Australia",
    unit: "U.S. Army Futures Command",
    location: "Australia",
    period: "April 2025",
    desc: "EolianVR was selected as a nominee for Project Convergence — the U.S. Army's premier campaign of learning focused on multi-domain operations and integration of emerging technologies. Selection reflects ARTAK's recognition as a technology with potential application across the joint force's modernization agenda in mission command, distributed C2, and 3D battlespace awareness.",
    outcome: "Army Futures Command recognition of ARTAK as an emerging joint C2 technology for convergence experimentation.",
  },
  {
    featured: false,
    category: "USSOCOM",
    title: "SOCOM Technical Exchange (TE) Exercises",
    unit: "U.S. Special Operations Command",
    location: "Various",
    period: "5 Selections",
    desc: "EolianVR has been selected as a participant in the USSOCOM Technical Exchange program five times — a competitive process through which SOCOM evaluates emerging technologies across priority capability areas. These exchanges directly informed ARTAK's SOF-specific feature roadmap and supported growth of Eolian's USSOCOM contracting relationship, including 30+ successful task orders under a prime OTA contract since 2020.",
    outcome: "5x selection by USSOCOM TE; direct contributor to prime OTA contract growth and SOF capability requirements development.",
  },
  {
    featured: false,
    category: "USSOCOM",
    title: "Trident Specter",
    unit: "U.S. Special Operations Command",
    location: "Various",
    period: "2 Selections",
    desc: "ARTAK was selected to participate in Trident Specter — SOCOM's premier joint SOF exercise involving U.S. and partner nation SOF conducting full-spectrum operations — on two separate occasions. Participation enabled direct operator feedback under high-tempo exercise conditions and demonstrated platform suitability for joint SOF mission planning and C2 at the task force level.",
    outcome: "2x selection for USSOCOM's premier joint SOF exercise; operator-validated in a high-complexity, multi-domain environment.",
  },
  {
    featured: false,
    category: "Accel Innovation Corporation",
    title: "AIC Tech ID",
    unit: "Accel Innovation Corporation",
    location: "XX",
    period: "May 2024",
    desc: "EolianVR participated in the AIC Tech ID (AI/Autonomy Integration Capability — Technology Identification) process, organized by Accel Innovation Corporation, as part of an effort to identify emerging mixed reality and C2 technologies for potential integration. ARTAK was evaluated for its AI and autonomy-relevant capabilities within the mixed reality C2 domain.",
    outcome: "Selected by Accel Innovation Corporation for AIC Tech ID evaluation; validated ARTAK's relevance to AI/autonomy integration capability requirements.",
  },
  {
    featured: false,
    category: "U.S. Army DEVCOM — CRADA",
    title: "Urban Environment Research — New York City",
    unit: "U.S. Army Combat Capabilities Development Command (DEVCOM)",
    location: "New York City, NY",
    period: "September 2022",
    desc: "EolianVR entered into a Cooperative Research and Development Agreement (CRADA) with U.S. Army DEVCOM to explore ARTAK's application in dense urban environments, using New York City as the test context. Research leveraged NYC's complex urban terrain — high-rise density, layered infrastructure, and subterranean networks — as a demanding operational analog.",
    outcome: "Formal government-industry CRADA; established ARTAK's urban C2 and 3D mapping capabilities against one of the world's most complex urban environments.",
  },
  {
    featured: false,
    category: "USSOCOM",
    title: "TALOS Program",
    unit: "U.S. Special Operations Command",
    location: "XX",
    period: "2020",
    desc: "EolianVR engaged with the TALOS (Tactical Assault Light Operator Suit) program under USSOCOM, developing and demonstrating a heads-up display as part of the broader integrated operator capability suite. ARTAK served as the C2 and situational awareness HUD layer within the TALOS system architecture.",
    outcome: "Delivered heads-up display capability for USSOCOM's TALOS integrated operator suit program.",
  },
];

const stats = [
  { value: "10+", label: "SOF Exercises Participated" },
  { value: "3+", label: "Independent Assessments" },
  { value: "6+", label: "Nations Represented" },
  { value: "5×", label: "USSOCOM TE Selections" },
  { value: "2×", label: "Trident Specter Selections" },
  { value: "100%", label: "Soldiers: ARTAK Increases C2 (AEWE)" },
  { value: "93%", label: "Soldiers: Effective for Mission Planning (AEWE)" },
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
      <SEO title="Past Performance" description="EolianVR's past performance across USSOCOM, DoD, and public safety — government contracts, SOF exercises, and formal technology assessments." path="/about/past-performance" />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <Link to="/about" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-wider uppercase hover:text-white transition-colors mb-8">
            <ArrowLeft size={12} /> Back to About
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Company // Track Record</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            Forged by Elite Operators<span className="text-[#FF0B1B]">.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            ARTAK has been assessed, stress-tested, and operationally employed across more than a decade of SOF exercises, Army experimentation campaigns, and multi-national technology assessments — on 6 continents, under real-world mission conditions.
          </p>
        </div>
      </section>

      {/* Government Contracts */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Contracts // Awards</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Government Contracts</h2>
          </div>
          <div className="space-y-px bg-zinc-800">
            {contracts.map((c, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }} variants={fadeUp} className="bg-[#0A0A0A] p-8 md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase border border-[#FF0B1B]/30 px-2 py-0.5">{c.tag}</span>
                      <span className="font-mono text-xs text-zinc-500 tracking-wider">{c.period}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight">{c.label}</h3>
                  </div>
                  <div className="font-heading text-2xl font-bold text-white">{c.amount}</div>
                </div>

                {c.problemStatement && (
                  <div className="mb-8 border-l-2 border-zinc-700 pl-5">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-2">The Problem USSOCOM Needed Solved</div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{c.problemStatement}</p>
                  </div>
                )}

                {c.programs ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800">
                    {c.programs.map((prog, j) => (
                      <div key={j} className="bg-[#0D0D0D] p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-heading text-base font-bold text-white uppercase tracking-tight">{prog.name}</span>
                          <span className="w-px h-3 bg-zinc-700" />
                          <span className="font-mono text-[10px] text-zinc-500 tracking-wide">{prog.fullName}</span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">{prog.desc}</p>
                        <ul className="space-y-2">
                          {prog.items.map((item, k) => (
                            <li key={k} className="flex items-start gap-3 text-xs text-zinc-500 leading-relaxed">
                              <div className="w-1 h-1 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {c.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOF Field Exercises */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Operations // Field Exercises</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              SOF Field Exercises & Demonstrations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {exercises.map((ex, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }} variants={fadeUp} className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase border border-[#FF0B1B]/30 px-2 py-0.5 self-start mb-3">{ex.category}</span>
                <div className="font-mono text-xs text-zinc-500 tracking-wider mb-0.5">{ex.unit}</div>
                <div className="font-mono text-xs text-zinc-600 tracking-wider mb-1">{ex.location}</div>
                <div className="font-mono text-xs text-[#FF0B1B] tracking-wider mb-4">{ex.period}</div>
                <h3 className="font-heading text-base font-bold text-white uppercase tracking-tight mb-3">{ex.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed flex-1">{ex.desc}</p>
                {ex.outcome && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-start gap-2">
                    <div className="w-1 h-1 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-zinc-400 leading-relaxed italic">{ex.outcome}</p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formal Technology Assessments */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Assessments // Independent Validation</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Formal Technology Assessments
            </h2>
          </div>

          {/* Featured cards — AEWE and AWE */}
          <div className="space-y-px bg-zinc-800 mb-px">
            {assessments.filter(a => a.featured).map((a, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }} variants={fadeUp} className="bg-[#0A0A0A] p-8 md:p-10">
                <div className="flex flex-wrap items-start gap-3 mb-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase border border-[#FF0B1B]/30 px-2 py-0.5">{a.category}</span>
                  <span className="font-mono text-xs text-zinc-500 tracking-wider">{a.period}</span>
                </div>
                <div className="font-mono text-xs text-zinc-500 tracking-wider mb-1">{a.assessor}</div>
                <div className="font-mono text-xs text-zinc-600 tracking-wider mb-4">{a.location}</div>
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight mb-2">{a.title}</h3>
                <p className="font-mono text-xs text-zinc-600 tracking-wider mb-6">{a.participants}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">{a.desc}</p>
                    <blockquote className="border-l-2 border-[#FF0B1B] pl-4">
                      <p className="text-sm text-zinc-300 leading-relaxed italic mb-2">{a.quote}</p>
                      <cite className="font-mono text-xs text-zinc-500 not-italic">{a.quoteSource}</cite>
                    </blockquote>
                  </div>
                  {a.stats && (
                    <div className="grid grid-cols-2 gap-px bg-zinc-800 self-start">
                      {a.stats.map((s, j) => (
                        <div key={j} className="bg-[#0A0A0A] p-5">
                          <div className="font-heading text-2xl font-bold text-[#FF0B1B] mb-1">{s.value}</div>
                          <div className="font-mono text-[10px] text-zinc-500 tracking-wider leading-relaxed">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Standard cards — remaining assessments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {assessments.filter(a => !a.featured).map((a, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }} variants={fadeUp} className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase border border-[#FF0B1B]/30 px-2 py-0.5 self-start mb-3">{a.category}</span>
                <div className="font-mono text-xs text-zinc-600 tracking-wider mb-1">{a.location}</div>
                <div className="font-mono text-xs text-[#FF0B1B] tracking-wider mb-4">{a.period}</div>
                <h3 className="font-heading text-base font-bold text-white uppercase tracking-tight mb-3">{a.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed flex-1">{a.desc}</p>
                {a.outcome && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-start gap-2">
                    <div className="w-1 h-1 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-zinc-400 leading-relaxed italic">{a.outcome}</p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">By the Numbers</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-px bg-zinc-800">
            {stats.map((s, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-6 text-center">
                <div className="font-heading text-2xl font-bold text-[#FF0B1B] mb-2">{s.value}</div>
                <div className="font-mono text-[10px] text-zinc-500 tracking-wider leading-relaxed">{s.label}</div>
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
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Customers // Historical</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">Additional Customers</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Beyond our core USSOCOM and DIU partnerships, Eolian has worked with a broad range of military, government, academic, and commercial organizations.
              </p>
            </div>
            <div className="bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8">
              {additionalCustomers.map((customer, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-center gap-3 py-2.5 border-b border-zinc-800/50 last:border-0">
                  <div className="w-1 h-1 bg-[#FF0B1B] flex-shrink-0" />
                  <span className="font-mono text-xs text-zinc-400 tracking-wide">{customer}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
