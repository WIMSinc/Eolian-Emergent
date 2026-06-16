import { motion } from "framer-motion";
import { MapPin, Target, Radio, Globe } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function CaseStudiesSection() {
  return (
    <section className="py-20 md:py-28 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <img src="/artak-logo-white.webp" alt="ARTAK" className="h-7 w-auto opacity-70" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Storyboards // Field Deployments</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Case Studies</h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-2xl">Real-world deployments across USSOCOM and partner forces demonstrating ARTAK's operational impact.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800">

          {/* CASE.01 — 10th SFG / NATO SOF 2025 (full width, featured) */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            data-testid="case-study-10sfg-nato"
            className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Globe size={14} className="text-[#FF0B1B]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.01]</span>
              <span className="font-mono text-[9px] text-zinc-600 border border-zinc-800 px-2 py-0.5 uppercase tracking-wider ml-2">Featured</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">10th SFG(A) — NATO SOF 2025</h3>
            <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">10th Special Forces Group (Airborne) // NATO Special Operations Forces 2025</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">ARTAK was deployed in preparation for and during NATO SOF 2025 to increase the efficiency and precision of planning, briefing, and rehearsal activities across both US and Partner Forces. The shared understanding and enhanced situational awareness provided by ARTAK helped enable successful execution of multinational training missions.</p>
                <p className="text-sm text-zinc-400 leading-relaxed">US and coalition partner forces co-planned complex joint missions inside a shared ARTAK environment, enabling simultaneous visualization of terrain, forces, and scheme of maneuver regardless of language or national system.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Plan:</span> US and NATO partner forces co-planned missions in shared ARTAK sessions</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Rehearse:</span> Joint rehearsals enabled cross-coalition coordination and shared understanding</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Brief:</span> Multi-echelon briefings delivered through ARTAK 3D visualization across US and partner SOF</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Visualize:</span> Real-time 3D terrain and force position visible across distributed coalition teams</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Result:</span> Increased efficiency and precision of planning across multinational coalition partners</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["NATO SOF 2025", "10th SFG(A)", "Coalition Forces", "Map Maker", "Partner Forces", "Mission Planning", "Joint Rehearsal"].map((t) => (
                <span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
          </motion.div>

          {/* CASE.02 — Sage Eagle */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            data-testid="case-study-sage-eagle"
            className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-[#FF0B1B]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.02]</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">Sage Eagle 25-2</h3>
            <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">3rd Special Forces Group (Airborne) // ODA 3121</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">3121 used ARTAK during Sage Eagle 25-2 to visualize their targets and plan various aspects of their mission. The team sourced an asset to fly a small UAS around three areas of interest.</p>
            <div className="space-y-2 mb-6">
              <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Recon:</span> Imagery collected autonomously using Skydio X2+ at 200 acres/hr</p>
              <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Process:</span> 3D maps generated from UAS images using Map Maker (~5.5 sq KM)</p>
              <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Track:</span> Position of force tracked via ATAK with GoTENNA + Starlink</p>
              <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Visualize:</span> Real-time position of force visible on 3D map via Meta Quest 3</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Skydio X2+", "Map Maker", "Meta Quest 3", "GoTENNA", "Starlink", "ATAK"].map((t) => (
                <span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
          </motion.div>

          {/* CASE.03 — NSWG-8 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
            data-testid="case-study-nswg8"
            className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target size={14} className="text-[#FF0B1B]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.03]</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">NSWG-8 TRADET</h3>
            <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">Naval Special Warfare Group 8 // Training Detachment</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">NSWG-8 TRADET integrated ARTAK with new COTS devices (GoTENNA, Starlink) to track, monitor and replay trainees' positions during live-fire assault and react-to-contact drills.</p>
            <div className="space-y-2 mb-6">
              <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Monitor:</span> Dislocated OTCs monitored exercise in ARTAK — watching real-time movements on a 3D replica of the range</p>
              <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Replay:</span> OTCs and trainees replayed the exercise in ARTAK afterwards for AAR</p>
              <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Result:</span> Enhanced training feedback loop with spatial context and position history</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["GoTENNA", "Starlink", "Live-Fire Tracking", "3D Replay", "AAR"].map((t) => (
                <span key={t} className="font-mono text-[9px] tracking-wider text-zinc-600 border border-zinc-800 px-2 py-1 uppercase">{t}</span>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
          </motion.div>

          {/* CASE.04 — 160th SOAR (full width) */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            data-testid="case-study-160soar"
            className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Radio size={14} className="text-[#FF0B1B]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">[CASE.04]</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-2">2nd Battalion, 160th SOAR — Joint ROC Drill</h3>
            <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-4">10–14 September 2024 // Cannon AFB, New Mexico</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">2/160 SOAR used ARTAK to conduct a 90-minute ROC drill during a joint exercise with US ARMY 5th SFG(A), USAF 23rd STS — the largest and longest brief ever conducted by a customer in ARTAK.</p>
                <p className="text-sm text-zinc-400 leading-relaxed">Prior to the drill, key leaders collaborated in ARTAK using a realistic 3D map to develop the mission plan. During the drill, briefers used ARTAK to rehearse while enablers viewed on AR headsets and TV screens.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Recon:</span> Exterior imaged autonomously using Skydio X2+ at 200 acres/hr</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Process:</span> 3D maps generated using Map Maker on laptop</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Plan:</span> Leaders visualized landing zones, avenues of approach, and scheme of maneuver</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Brief:</span> 90-min ROC drill — largest/longest ever in ARTAK</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">View:</span> AR HMDs + TV monitors for distributed viewing</p>
                <p className="text-xs text-zinc-500"><span className="text-zinc-300 font-medium">Units:</span> 160th SOAR, 5th SFG(A), USAF 23rd STS</p>
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
  );
}
