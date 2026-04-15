import { motion } from "framer-motion";
import { Monitor, Smartphone, Glasses, Tablet, Laptop } from "lucide-react";

const platforms = [
  { icon: Glasses, label: "VR", sublabel: "Headsets" },
  { icon: Glasses, label: "AR", sublabel: "Devices" },
  { icon: Laptop, label: "DESKTOP", sublabel: "PC / Mac" },
  { icon: Tablet, label: "TABLET", sublabel: "All Form Factors" },
  { icon: Smartphone, label: "MOBILE", sublabel: "iOS / Android" },
  { icon: Monitor, label: "ATAK", sublabel: "Integration" },
];

export default function PlatformSection() {
  return (
    <section
      id="platforms"
      data-testid="platform-section"
      className="relative py-24 md:py-32 border-t border-b border-zinc-800"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">
            Device Agnostic // Cross-Platform
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Deployable <span className="text-[#FF0B1B]">Everywhere</span>
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
            ARTAK software runs across the full spectrum of virtualization
            hardware, from immersive headsets to mobile devices.
          </p>
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-800">
          {platforms.map((plat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#0A0A0A] p-8 flex flex-col items-center text-center group hover:bg-[#0D0D0D] transition-all duration-500"
            >
              <div className="w-14 h-14 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#FF0B1B] transition-colors duration-300">
                <plat.icon
                  size={24}
                  className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors duration-300"
                />
              </div>
              <span className="font-heading text-sm font-bold text-white tracking-wider">
                {plat.label}
              </span>
              <span className="font-mono text-[10px] text-zinc-600 tracking-wider mt-1">
                {plat.sublabel}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-16 overflow-hidden border-t border-zinc-800 pt-8">
          <div className="flex whitespace-nowrap marquee-track">
            {[...Array(3)].map((_, k) => (
              <div key={k} className="flex shrink-0 gap-8 mr-8">
                {[
                  "COMMAND & CONTROL",
                  "3D MISSION PLANNING",
                  "SITUATIONAL AWARENESS",
                  "MULTI-DOMAIN OPS",
                  "JADC2",
                  "EDGE COMPUTING",
                  "REAL-TIME DATA",
                  "AR/VR/MR",
                ].map((text, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs tracking-[0.3em] text-zinc-700"
                  >
                    {text}
                    <span className="text-[#FF0B1B] mx-4">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
