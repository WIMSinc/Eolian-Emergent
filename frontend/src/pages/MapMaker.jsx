import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const stats = [
  { value: "6", label: "Continents Deployed" },
  { value: "100%", label: "Offline Capable" },
  { value: "<20min", label: "Raw Data to 3D Model" },
  { value: "ALL", label: "Domains Covered" },
];

const inputTypes = [
  { icon: "🛸", name: "Drone / UAS", desc: "Imagery & video from any UAV" },
  { icon: "📡", name: "LiDAR", desc: "Point cloud & mesh data" },
  { icon: "🎥", name: "Video", desc: "EO/IR footage" },
  { icon: "🖼️", name: "Images", desc: "Ground or aerial photos" },
  { icon: "📐", name: "360°", desc: "Panoramic capture" },
  { icon: "🔭", name: "Sonar", desc: "Underwater sensors" },
  { icon: "🏗️", name: "Photogrammetry", desc: "Multi-image surface reconstruction" },
  { icon: "🛰️", name: "Satellite Imagery", desc: "High-resolution satellite data" },
];


const interiorFeatures = [
  { title: "Multi-Level Mapping", body: "Simultaneously models ground, sub-level, and deep infrastructure in a single layered output." },
  { title: "Structural Analysis", body: "Identifies walls, load-bearing elements, access points, and bottlenecks for tactical planning." },
  { title: "Subterranean Nav", body: "Generates navigable path data for tunnels, corridors, and underground networks." },
  { title: "Offline Processing", body: "No connectivity required. Process in the field, export to ARTAK or any compatible platform." },
];

const interiorSensors = [
  { sensor: "Handheld LiDAR", capture: "Walk-through", output: "Full 3D model" },
  { sensor: "Backpack LiDAR", capture: "5–15 min", output: "Point cloud + mesh" },
  { sensor: "360° Camera", capture: "Room-by-room", output: "Photo-textured model" },
];

const interiorUseCases = ["Subway Systems", "Military Bunkers", "Tunnel Networks", "Building Interiors", "Cave Systems", "Utility Infrastructure"];

const underwaterFeatures = [
  { title: "Bathymetric Modeling", body: "Converts sonar sweeps and underwater video into accurate seafloor terrain models with depth contours and obstacle mapping." },
  { title: "Hull & Structure Inspection", body: "Create detailed 3D models of ship hulls, bridge foundations, and submerged infrastructure for inspection and analysis." },
  { title: "Port & Harbor Security", body: "Generate persistent digital twins of ports, piers, and littoral zones to detect changes and support force protection planning." },
  { title: "Wreck & Obstacle Detection", body: "Identify and map submerged wrecks, debris fields, and navigational hazards with precise geo-referenced coordinates." },
];

const underwaterUseCases = ["Port Security", "Maritime ISR", "Wreck Survey", "Hull Inspection", "UUV Operations"];

const comparisonRows = [
  { capability: "Outdoor / Aerial 3D Mapping",       desc: "Full photogrammetric reconstruction from drone, satellite, or ground imagery" },
  { capability: "Interior & Subterranean Mapping",   desc: "Multi-level indoor and below-ground environments including tunnels and bunkers" },
  { capability: "Underwater / Bathymetric Mapping",  desc: "Seafloor terrain, submerged structures, and maritime environments via sonar or EO" },
  { capability: "Fully Offline Processing",          desc: "No internet connection required — process and deploy from any location on earth" },
  { capability: "Entirely Automated Pipeline",       desc: "One-click processing from raw sensor data to explorable 3D model" },
  { capability: "LiDAR + Point Cloud Support",       desc: "Native ingestion of LiDAR scans, dense point clouds, and mesh data" },
  { capability: "Non-Proprietary File Output",       desc: "Open formats (OBJ, GLB, Cesium 3D Tiles) viewable on any device or platform" },
  { capability: "High-Quality 3D Tiles",             desc: "Cesium-compatible tilesets for streaming into GIS, ATAK, and web platforms" },
  { capability: "ARTAK / MR Platform Integration",   desc: "Direct export into ARTAK for immersive AR/VR mission planning and briefing" },
];

const kits = [
  {
    name: "Offline Processing Kit",
    tier: "Software + Laptop",
    price: "Contact for Pricing",
    img: "/mapmaker-kit-processing.webp",
    features: ["High-performance laptop", "Map Maker Core software", "On-site training included", "24/7 tech support"],
  },
  {
    name: "Interior & Sub-T Collection Kit",
    tier: "LiDAR + Processing",
    price: "$114,688",
    img: "/mapmaker-kit-lidar.webp",
    features: ["Laptop + Map Maker software", "Handheld LiDAR sensor", "GPS-denied capable", "On-site training & 24/7 support"],
  },
  {
    name: "Outdoor Collection & Processing Kit",
    tier: "UAS + Processing",
    price: "$149,240",
    img: "/mapmaker-kit-uav.webp",
    featured: true,
    features: ["Laptop + Map Maker software", "2× Blue UAS-approved UAVs", "Photogrammetry + video", "On-site training & 24/7 support"],
  },
  {
    name: "Complete Collection & Processing Kit",
    tier: "Full Spectrum",
    price: "$207,760",
    img: "/mapmaker-kit-complete.webp",
    features: ["Laptop + Map Maker software", "Handheld LiDAR sensor", "2× Blue UAS-approved UAVs", "On-site training & 24/7 support"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};


export default function MapMaker() {
  return (
    <div data-testid="mapmaker-page">
      <SEO title="Map Maker — 3D Digital Twin Creation" description="ARTAK Map Maker transforms raw sensor data — drone imagery, LiDAR, video, sonar, satellite — into photorealistic 3D digital twins in minutes." path="/mapmaker" />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-0">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh] pb-20">
            {/* Copy */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#FF0B1B]" />
                <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Product // Map Maker Platform</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-6">
                The Digital<br /><span className="text-[#FF0B1B]">Twin</span><br />Advantage
              </h1>
              <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed mb-8">
                Map Maker transforms raw sensor data — drone imagery, LiDAR, video, sonar, satellite — into photorealistic 3D digital twins in minutes, not months. Fully offline. Fully automated. Fully yours.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="#kits" className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-xs tracking-widest px-6 py-3 hover:bg-[#FF0B1B] transition-colors">
                  Explore Kits <ArrowRight size={14} />
                </a>
                <a href="#reconstruction" className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-400 font-mono uppercase text-xs tracking-widest px-6 py-3 hover:border-zinc-500 hover:text-white transition-colors">
                  See Capabilities
                </a>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-4 gap-px bg-zinc-800 mt-12">
                {stats.map((s, i) => (
                  <div key={i} className="bg-[#0A0A0A] px-4 py-5 text-center">
                    <div className="font-heading text-xl font-bold text-[#FF0B1B]">{s.value}</div>
                    <div className="font-mono text-[9px] text-zinc-500 tracking-wider mt-1 leading-relaxed uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero visual */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="relative">
              <div className="relative border border-zinc-800 overflow-hidden aspect-[4/3]">
                <img
                  src="/mapmaker-storyboard.webp"
                  alt="Map Maker 3D digital twin — campus aerial"
                  className="w-full h-full object-cover opacity-50"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                {/* HUD corners */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FF0B1B]" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FF0B1B]" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FF0B1B]" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FF0B1B]" />
                {/* Data overlays */}
                <div className="absolute top-4 left-4">
                  <div className="font-mono text-[10px] text-[#FF0B1B] tracking-[0.2em]">◈ DIGITAL TWIN ACTIVE</div>
                  <div className="font-mono text-[9px] text-zinc-600 mt-0.5">27.43.12N / 082.39.45W</div>
                </div>
                <div className="absolute top-4 right-4 bg-[#050505]/80 border border-zinc-800 p-2 backdrop-blur-sm">
                  <div className="font-mono text-[9px] text-zinc-500">STATUS</div>
                  <div className="font-mono text-[10px] text-green-400 font-bold">● LIVE</div>
                </div>
                <div className="absolute bottom-4 left-4 bg-[#050505]/80 border border-zinc-800 px-3 py-2 backdrop-blur-sm">
                  <div className="font-mono text-[9px] text-zinc-500">ACCURACY</div>
                  <div className="font-mono text-sm text-white font-bold">±2.1 cm</div>
                  <div className="font-mono text-[9px] text-zinc-500 mt-1">RESOLUTION</div>
                  <div className="font-mono text-sm text-white font-bold">1 cm/px</div>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#050505]/80 border border-[#FF0B1B]/30 px-3 py-1.5">
                  <div className="font-mono text-[9px] text-[#FF0B1B] tracking-[0.15em]">◈ MAP MAKER 3D</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>


      {/* ── 3D Reconstruction ── */}
      <section id="reconstruction" className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Core Capability</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              3D <span className="text-zinc-500">Reconstruction</span>
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Map Maker ingests raw imagery, LiDAR point clouds, and video — then autonomously produces photorealistic, geo-referenced 3D models. No internet required. No specialist needed. From field collection to explorable digital twin in under 20 minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visual: product image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="relative border border-zinc-800 overflow-hidden">
                <img
                  src="/mapmaker-example.webp"
                  alt="Map Maker 3D reconstruction — building exterior with data panel"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FF0B1B]" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FF0B1B]" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FF0B1B]" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FF0B1B]" />
              </div>

              {/* Pipeline */}
              <div className="flex items-center mt-4 gap-0 bg-[#0A0A0A] border border-zinc-800">
                {["Capture", "Process", "Generate", "Deploy"].map((step, i, arr) => (
                  <>
                    <div key={step} className="flex-1 text-center py-3">
                      <div className="font-mono text-[10px] tracking-[0.15em] text-zinc-500 uppercase">{step}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div key={`arrow-${i}`} className="text-[#FF0B1B] font-mono text-sm px-1">›</div>
                    )}
                  </>
                ))}
              </div>
            </motion.div>

            {/* Inputs + time table */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-4">Supported Inputs</div>
              <div className="grid grid-cols-3 gap-px bg-zinc-800 mb-6">
                {inputTypes.map((t, i) => (
                  <div key={i} className="bg-[#0A0A0A] p-4 text-center hover:bg-[#0D0D0D] transition-colors group">
                    <div className="text-xl mb-1">{t.icon}</div>
                    <div className="font-heading text-xs font-bold text-white uppercase tracking-wide mb-0.5">{t.name}</div>
                    <div className="font-mono text-[9px] text-zinc-600">{t.desc}</div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>


      {/* ── Interior & Subterranean ── */}
      <section className="py-20 md:py-28 border-t border-zinc-800 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Below Ground & Inside Structures</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Interior & <span className="text-zinc-500">Subterranean</span> Mapping
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Where GPS fails and traditional mapping stops, Map Maker excels. Capture multi-level interiors, tunnels, subways, and underground facilities with handheld LiDAR — producing layered 3D models that reveal every room, corridor, and access point.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visual */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="relative border border-zinc-800 overflow-hidden mb-3">
                <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-[#FF0B1B] border border-[#FF0B1B]/30 bg-[#050505]/80 px-2 py-0.5 tracking-[0.15em]">INTERIOR // MULTI-LEVEL</div>
                <img
                  src="/mapmaker-lidar-breakdown.webp"
                  alt="Interior LiDAR scan — layered floor plan breakdown"
                  className="w-full h-auto object-contain bg-white"
                  loading="lazy"
                />
              </div>
              <div className="relative border border-zinc-800 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-[#FF0B1B] border border-[#FF0B1B]/30 bg-[#050505]/80 px-2 py-0.5 tracking-[0.15em]">SUBTERRANEAN // TUNNEL SCAN</div>
                <img
                  src="/mapmaker-lidar-tunnel.webp"
                  alt="LiDAR tunnel scan — subterranean environment"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Use case tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {interiorUseCases.map((tag, i) => (
                  <span key={i} className="font-mono text-[9px] tracking-[0.1em] text-zinc-500 uppercase border border-zinc-800 px-2 py-1 bg-[#050505]">{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* Features + table */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <div className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.15em] text-[#FF0B1B] uppercase border border-[#FF0B1B]/30 px-3 py-1 mb-6">
                ◈ GPS-Denied Environment Ready
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight mb-4">
                Map the <span className="text-zinc-500">unmappable</span>
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Handheld LiDAR sensors capture sub-surface and enclosed environments where drones can't fly. Map Maker automatically stitches scans into a coherent, multi-level 3D model with room classification, corridor navigation paths, and structural analysis.
              </p>

              <div className="grid grid-cols-2 gap-px bg-zinc-800 mb-6">
                {interiorFeatures.map((f, i) => (
                  <div key={i} className="bg-[#050505] p-4 border-l-2 border-[#FF0B1B]/30 hover:border-[#FF0B1B] transition-colors">
                    <div className="font-heading text-xs font-bold text-white uppercase tracking-wide mb-1">{f.title}</div>
                    <div className="font-mono text-[10px] text-zinc-600 leading-relaxed">{f.body}</div>
                  </div>
                ))}
              </div>

              <div className="border border-zinc-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0A0A0A] border-b border-zinc-800">
                      <th className="text-left px-4 py-2.5 font-mono text-[9px] tracking-[0.15em] text-zinc-500 uppercase">Sensor</th>
                      <th className="text-left px-4 py-2.5 font-mono text-[9px] tracking-[0.15em] text-zinc-500 uppercase">Capture</th>
                      <th className="text-left px-4 py-2.5 font-mono text-[9px] tracking-[0.15em] text-[#FF0B1B] uppercase">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interiorSensors.map((row, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/20">
                        <td className="px-4 py-2.5 text-xs text-zinc-400 font-mono">{row.sensor}</td>
                        <td className="px-4 py-2.5 text-xs text-zinc-600">{row.capture}</td>
                        <td className="px-4 py-2.5 text-xs text-[#FF0B1B] font-mono font-bold">{row.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── Underwater Mapping ── */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Maritime & Subsurface</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Underwater <span className="text-zinc-500">Mapping</span>
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Map Maker processes electro-optical underwater footage and sonar data into 3D bathymetric models of seabeds, submerged structures, and maritime environments — enabling port security, salvage operations, and ISR missions below the waterline.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Features */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-px">
              {underwaterFeatures.map((f, i) => (
                <div key={i} className="flex gap-4 bg-[#0A0A0A] border border-zinc-800 hover:border-zinc-700 transition-colors p-5 group">
                  <div className="w-px self-stretch bg-[#FF0B1B]/30 group-hover:bg-[#FF0B1B] transition-colors flex-shrink-0" />
                  <div>
                    <div className="font-heading text-sm font-bold text-white uppercase tracking-wide mb-1">{f.title}</div>
                    <div className="text-xs text-zinc-500 leading-relaxed">{f.body}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Visual */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <div className="relative border border-zinc-800 overflow-hidden aspect-[16/10]">
                <img
                  src="/mapmaker-underwater.webp"
                  alt="Map Maker underwater 3D scan"
                  className="w-full h-full object-cover opacity-50"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[#050505]/85 border border-zinc-800 p-3 font-mono text-[9px] leading-relaxed">
                  <div className="text-zinc-500">MODE</div>
                  <div className="text-white font-bold">BATHYMETRIC SCAN</div>
                  <div className="text-zinc-500 mt-1">DEPTH RANGE</div>
                  <div className="text-white font-bold">0 – 200m</div>
                  <div className="text-zinc-500 mt-1">SENSOR</div>
                  <div className="text-white font-bold">EO / SONAR FUSION</div>
                  <div className="text-zinc-500 mt-1">STATUS</div>
                  <div className="text-green-400 font-bold">● ACTIVE</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {underwaterUseCases.map((tag, i) => (
                  <span key={i} className="font-mono text-[9px] tracking-[0.1em] text-zinc-500 uppercase border border-zinc-800 px-2 py-1">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── Comparison Table ── */}
      <section className="py-20 md:py-28 border-t border-zinc-800 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Competitive Landscape</span>
              <div className="w-8 h-px bg-[#FF0B1B]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Why <span className="text-[#FF0B1B]">Map Maker</span>
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Map Maker is the only platform that covers all three mapping domains — outdoor, interior/subterranean, and underwater — in a single, fully automated, offline-capable solution.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-px bg-zinc-800">
            {comparisonRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-8 bg-[#0A0A0A] px-8 py-5 hover:bg-[#0D0D0D] transition-colors group">
                <div>
                  <div className="font-heading text-sm font-bold text-white uppercase tracking-wide mb-1">{row.capability}</div>
                  <div className="font-mono text-xs text-zinc-500 leading-relaxed">{row.desc}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Check size={16} className="text-[#FF0B1B]" />
                  <span className="font-mono text-[10px] text-[#FF0B1B] tracking-[0.1em] uppercase">Supported</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── Kits ── */}
      <section id="kits" className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Pre-Configured Solutions</span>
              <div className="w-8 h-px bg-[#FF0B1B]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Map Maker <span className="text-[#FF0B1B]">Kits</span>
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Purpose-built, pre-configured load-outs with hardware, software, training, and 24/7 support — ready to deploy from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {kits.map((kit, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className={`relative flex flex-col bg-[#0A0A0A] group hover:bg-[#0D0D0D] transition-colors overflow-hidden ${kit.featured ? "border border-[#FF0B1B]/40" : ""}`}
                data-testid={`mapmaker-kit-${i}`}
              >
                {kit.featured && (
                  <div className="absolute top-3 right-0 bg-[#FF0B1B] font-mono text-[8px] tracking-[0.15em] uppercase text-white px-2 py-0.5 z-10">Most Popular</div>
                )}
                {/* Kit image */}
                <div className="relative bg-[#050505] border-b border-zinc-800 flex items-center justify-center p-6 h-44">
                  <img src={kit.img} alt={kit.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                {/* Kit info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="font-mono text-[9px] tracking-[0.15em] text-[#FF0B1B] uppercase mb-1">{kit.tier}</div>
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-tight mb-4 leading-tight">{kit.name}</h3>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {kit.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed">
                        <div className="w-1 h-1 bg-[#FF0B1B] mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="font-heading text-lg font-bold text-white mb-4">{kit.price}</div>
                  <Link to="/#contact"
                    className={`block text-center font-mono text-[10px] tracking-[0.15em] uppercase py-2.5 transition-colors ${kit.featured ? "bg-[#D90412] text-white hover:bg-[#FF0B1B]" : "border border-zinc-700 text-zinc-400 hover:border-[#FF0B1B] hover:text-white"}`}
                  >
                    {kit.price === "Contact for Pricing" ? "Contact Us" : "Purchase Kit"}
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA Band ── */}
      <section className="py-20 md:py-24 border-t border-zinc-800 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Get Started</span>
              <div className="w-8 h-px bg-[#FF0B1B]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
              Ready to map your <span className="text-[#FF0B1B]">world?</span>
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
              Talk to our team about deploying Map Maker for your mission — from city-scale digital twins to underwater survey operations.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/#contact" className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-xs tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors">
                Request a Demo <ArrowRight size={14} />
              </Link>
              <a href="#kits" className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-400 font-mono uppercase text-xs tracking-widest px-8 py-4 hover:border-zinc-500 hover:text-white transition-colors">
                View All Kits
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
