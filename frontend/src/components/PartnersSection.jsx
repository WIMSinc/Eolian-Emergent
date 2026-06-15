import { motion } from "framer-motion";

const partners = [
  { name: "Microsoft", sub: "HoloLens 2" },
  { name: "Meta", sub: "Quest Platform" },
  { name: "Magic Leap", sub: "ML2" },
  { name: "Unity", sub: "3D Engine" },
  { name: "TAK", sub: "ATAK / WinTAK" },
  { name: "PIX4D", sub: "Photogrammetry" },
  { name: "Nvidia", sub: "Inception Program" },
  { name: "SAM.GOV", sub: "Federal Procurement" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
};

export default function PartnersSection() {
  return (
    <section data-testid="partners-section" className="py-20 md:py-28 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">
            Ecosystem // Technology Partners
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Our <span className="text-[#FF0B1B]">Partners</span>
          </h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-xl mx-auto">
            ARTAK integrates with leading hardware platforms, government systems, and technology partners.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              data-testid={`partner-card-${i}`}
              className="bg-[#0A0A0A] p-8 flex flex-col items-center text-center group hover:bg-[#0D0D0D] transition-all relative"
            >
              <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#FF0B1B] transition-colors">
                <span className="font-heading text-xs font-bold text-zinc-500 group-hover:text-[#FF0B1B] transition-colors uppercase tracking-tight">
                  {p.name.substring(0, 3)}
                </span>
              </div>
              <h3 className="font-heading text-sm font-bold text-white tracking-wider uppercase">{p.name}</h3>
              <span className="font-mono text-[10px] text-zinc-600 tracking-wider mt-1">{p.sub}</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
