import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FlaskConical, Download, ArrowRight } from "lucide-react";

const experiments = [
  { title: "Mission Planning", desc: "Testing our hypothesis that the use of ARTAK during mission planning enhances situational awareness and helps to mitigate risk." },
  { title: "Multi-Site Remote Brief", desc: "Testing our hypothesis that ARTAK improves the comms flow when used as a mission briefing tool by remote (dislocated) sites." },
  { title: "Intelligence Brief", desc: "Testing our hypothesis that the use of ARTAK during an Intelligence Brief enhances situational awareness." },
  { title: "Intercontinental Mission Brief", desc: "Testing that ARTAK can support an intercontinental mission brief between three sites with sub-second latency on VoIP and content synchronization." },
  { title: "Mid-Flight International SITREP", desc: "Testing that ARTAK can support an intercontinental sit-rep given by a forward, OCONUS team to a CONUS team in-transit on an airplane at cruising altitude." },
  { title: "Time-Sensitive Target", desc: "Testing that ARTAK is a valuable tool for a team tasked with actioning on a time-sensitive target (while en route and within 20 minutes from arriving to the site)." },
  { title: "Fuze Terrain, Building, & Sub-T", desc: "Testing that we could fuze together a set of four 3D maps and visualize them in ARTAK (including terrain, building, and subterranean)." },
  { title: "Near Real-Time Position of UAS", desc: "Testing that the use of ARTAK to visualize the position of UAS assets enhances situational awareness and helps to mitigate risk." },
  { title: "Ingest Data from U-28A Plane", desc: "Testing that ARTAK can display data output from a scan captured by the U-28A aircraft in the form of a 3D hologram and map for mission planning." },
  { title: "Integrate MPU5 into ARTAK", desc: "Testing that ARTAK could utilize an MPU5 Radio to connect a remote user wearing a HoloLens 2 to a multi-site brief." },
  { title: "Ingest Live Data from ATAK", desc: "Testing that ARTAK can display near-real-time data from an ATAK device located on the opposite coast of the US." },
  { title: "Ingest 3D Map Data — Farsight", desc: "Testing that ARTAK was able to ingest 3D maps from Farsight, a photogrammetry app that creates 3D maps using only a cell phone." },
  { title: "Ingest 3D Map from PIX4D", desc: "Testing that ARTAK is able to ingest 3D maps from PIX4D, a photogrammetry app that creates 3D maps using a PC." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } }),
};

export default function Lab() {
  return (
    <div data-testid="lab-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">R&D // Experiments</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            The Eolian <span className="text-[#FF0B1B]">Lab</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Here at The Eolian Lab we continually conduct objective experiments to test and measure the impact of our ARTAK Platform. Rather than assume our platform works great and is useful, we rigorously test our claims in order to prove their value.
          </p>
          <Link to="/artak" data-testid="lab-artak-link" className="inline-flex items-center gap-2 mt-6 font-mono text-xs tracking-[0.2em] text-zinc-500 hover:text-white transition-colors uppercase">
            More on ARTAK <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">White Papers // Results</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Experiments & Findings</h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl">
              We've included the highlights and white paper overviews of these experiments below for you to download and review at your leisure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {experiments.map((exp, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                data-testid={`experiment-card-${i}`}
                className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FlaskConical size={14} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                    <span className="font-mono text-[10px] text-zinc-600 tracking-wider">[EXP.{String(i + 1).padStart(2, "0")}]</span>
                  </div>
                  <Download size={14} className="text-zinc-700 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wide mb-2">{exp.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{exp.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
