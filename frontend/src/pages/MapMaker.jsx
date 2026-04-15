import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Map, Cpu, Wifi, Zap, Box, ArrowRight } from "lucide-react";

const features = [
  { icon: Zap, title: "Speed & Quality Unmatched", desc: "Makes high-quality 3D maps in minutes using machine learning and next-gen surface reconstruction algorithms." },
  { icon: Wifi, title: "Works Without Internet", desc: "Entirely automated and works offline. Make maps anywhere in the world with one click." },
  { icon: Cpu, title: "Non-Proprietary Formats", desc: "Uses non-proprietary file formats. View maps on any device, including Meshlab and other free 3D viewers." },
  { icon: Map, title: "Interoperable with ARTAK", desc: "Maps are interoperable with ARTAK, ATAK, WinTAK, and other government systems." },
];

const kits = [
  { name: "3D Map Maker Processing Kit", price: "$114,688", desc: "Core processing software and hardware." },
  { name: "Outdoor Collection & Processing Kit", price: "$149,240", desc: "Includes UAV drone for outdoor collection." },
  { name: "Interior/Sub-T Collection & Processing Kit", price: "$171,640", desc: "Includes LiDAR scanner for interiors and subterranean." },
  { name: "Complete Collection & Processing Kit", price: "$207,760", desc: "Full-spectrum indoor + outdoor collection capability." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function MapMaker() {
  return (
    <div data-testid="mapmaker-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Product // Map Maker</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            Map <span className="text-[#FF0B1B]">Maker</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            A software application that uses raw images, videos, or LiDAR to make 3D Maps. Speed and quality unmatched — high-quality maps in minutes.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">Capabilities // Features</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                3D Mapping<br /><span className="text-zinc-500">Redefined</span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                MAP MAKER is different. It is entirely automated, works without the internet and uses non-proprietary file-formats. This means you can make maps anywhere in the world with one click and view them on any device.
              </p>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4 group">
                    <div className="shrink-0 w-10 h-10 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF0B1B] transition-colors">
                      <f.icon size={16} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-white uppercase mb-1">{f.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#0A0A0A] border border-zinc-800 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1608235973986-4492bbe7b035?w=800&q=80"
                  alt="Aerial 3D mapping"
                  className="w-full h-80 object-cover opacity-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[MAP.MAKER]</span>
                  <p className="font-mono text-xs text-zinc-500 mt-1">Images + LiDAR → 3D Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kits */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Hardware // Kits</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Map Maker Kits</h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl">
              Purpose-built, pre-configured load-outs that include the Map Maker software and the hardware it runs on. Turn-key kits are also available with select collection devices such as drones or LiDAR scanners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
            {kits.map((kit, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} data-testid={`mapmaker-kit-${i}`} className="bg-[#0A0A0A] p-6 md:p-8 group hover:bg-[#0D0D0D] transition-colors relative">
                <div className="flex items-center gap-2 mb-3">
                  <Box size={14} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                  <span className="font-mono text-[10px] text-zinc-600 tracking-wider">[KIT.0{i + 1}]</span>
                </div>
                <h3 className="font-heading text-base font-semibold text-white uppercase tracking-wide mb-2">{kit.name}</h3>
                <p className="text-xs text-zinc-500 mb-3">{kit.desc}</p>
                <p className="font-mono text-xl text-[#FF0B1B] font-bold">{kit.price}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/#contact" data-testid="mapmaker-contact-cta" className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors">
              Contact Us to Inquire <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
