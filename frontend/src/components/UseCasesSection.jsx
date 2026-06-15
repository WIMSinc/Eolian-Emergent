import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Search, Shield, Siren, Flame, Rocket, ArrowRight } from "lucide-react";

const useCases = [
  {
    icon: AlertTriangle,
    sysLabel: "[UC.01]",
    title: "Disaster Response & Emergency Management",
    desc: "In times of chaos, ARTAK transforms fragmented operations into a unified mission picture. Real-time drone feeds, IoT data, and geospatial overlays help command centers coordinate faster, deploy smarter, and save more lives.",
    image: "/artak-in-action.png",
    slug: "disaster-response",
  },
  {
    icon: Search,
    sysLabel: "[UC.02]",
    title: "Search & Rescue / First Responders",
    desc: "Every second matters. ARTAK integrates UAV data, terrain models, and team tracking into a shared 3D environment — enabling crews to visualize hazards, optimize routes, and train in realistic VR scenarios before entering the field.",
    image: "/artak-overview.jpg",
    slug: "search-rescue",
  },
  {
    icon: Shield,
    sysLabel: "[UC.03]",
    title: "Security & Protection Services",
    desc: "Whether providing security for individuals, events, or facilities, ARTAK delivers a fused operational picture — combining radar, drone, and sensor data in a single spatial interface. Agencies gain 360-degree visibility over wide or remote regions.",
    image: "/artak-c2.png",
    slug: "security-protection",
  },
  {
    icon: Siren,
    sysLabel: "[UC.04]",
    title: "Police & Law Enforcement",
    desc: "For urban operations, crowd control, or tactical response, ARTAK provides a shared operational view that improves decision-making and reduces risk. Officers can rehearse complex scenarios in VR and access real-time overlays during live incidents.",
    image: "/artak-roc-drill.jpg",
    slug: "police-law-enforcement",
  },
  {
    icon: Flame,
    sysLabel: "[UC.05]",
    title: "Fire & Emergency Services",
    desc: "ARTAK gives fire commanders complete situational awareness — tracking crews, visualizing structure layouts, and modeling wildfire spread in 3D. Through AR and VR, teams can prepare, respond, and review every mission with confidence.",
    image: "/artak-mission-planning.jpg",
    slug: "fire-emergency",
  },
  {
    icon: Rocket,
    sysLabel: "[UC.06]",
    title: "Space & Aerospace Operations",
    desc: "From orbital mission planning to ground-station coordination, ARTAK enables teams to visualize assets, trajectories, and contingencies in immersive 3D. It brings real-time command awareness to an increasingly complex operational domain.",
    image: "/artak-xr-sdve.jpg",
    slug: "space-aerospace",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function UseCasesSection() {
  return (
    <section className="py-20 md:py-28 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">One Platform // Infinite Missions</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Use Cases</h2>
          <p className="mt-4 text-base text-zinc-400 max-w-2xl">
            ARTAK's immersive C2 platform is deployed across defense, public safety, and enterprise sectors worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              data-testid={`usecase-card-${i}`}
              className="bg-[#0A0A0A] group relative overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={uc.image}
                  alt={uc.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <uc.icon size={14} className="text-[#FF0B1B]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">{uc.sysLabel}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-base font-semibold text-white tracking-wide uppercase mb-3">{uc.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{uc.desc}</p>
                <Link
                  to={`/artak/${uc.slug}`}
                  data-testid={`usecase-link-${i}`}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#FF0B1B] hover:text-white transition-colors uppercase"
                >
                  Learn More <ArrowRight size={12} />
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
