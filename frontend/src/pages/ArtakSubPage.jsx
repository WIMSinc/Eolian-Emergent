import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle, Search, Shield, Siren, Flame, Rocket, ArrowLeft, ArrowRight,
} from "lucide-react";
import ArtakFeaturesSection from "@/components/ArtakFeaturesSection";
import UseCasesSection from "@/components/UseCasesSection";
import KitsSoftwareSection from "@/components/KitsSoftwareSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";

const useCaseData = {
  "disaster-response": {
    icon: AlertTriangle,
    sysLabel: "[UC.01]",
    title: "Disaster Response",
    titleAccent: "& Emergency Management",
    subtitle: "Empower Your Emergency Management",
    heroDesc: "Discover how ARTAK revolutionizes disaster response and emergency management with cutting-edge AR/VR technology, providing real-time insights and strategic advantages.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    body: "When crisis strikes, chaos often follows. Traditional tools and dashboards can't keep up with the speed or complexity of natural disasters — but ARTAK can. Through real-time geospatial visualization and immersive 3D command environments, ARTAK helps emergency management teams coordinate across agencies, track assets live, and visualize unfolding events with precision.",
    capabilities: [
      "Live drone and satellite feeds",
      "Weather, sensor, and communication data integration",
      "Real-time incident overlays and resource locations",
      "Multi-agency coordination in shared virtual space",
      "Predictive analytics for resource allocation",
      "Post-incident replay for training and debrief",
    ],
    ctaText: "Whether managing floods, hurricanes, wildfires, or earthquakes, ARTAK's immersive operational picture allows leaders to act faster, allocate resources intelligently, and ensure life-saving coordination under pressure.",
  },
  "search-rescue": {
    icon: Search,
    sysLabel: "[UC.02]",
    title: "Search & Rescue",
    titleAccent: "& First Responders",
    subtitle: "Empower Your First Responders",
    heroDesc: "Every second matters. ARTAK integrates UAV data, terrain models, and team tracking into a shared 3D environment — enabling crews to visualize hazards, optimize routes, and train in realistic VR scenarios before entering the field.",
    image: "https://images.unsplash.com/photo-1773839420967-b50018fc0505?w=1200&q=80",
    body: "In Search and Rescue, every second counts. ARTAK gives SAR teams total operational awareness, fusing terrain data, GPS tracking, and drone intelligence into a single shared mission view. Commanders can see the terrain in full 3D, simulate rescue routes in VR before deployment, and direct field teams in real-time with AR overlays that highlight hazards, routes, and last-known locations.",
    capabilities: [
      "Integrated UAV and ground team tracking",
      "Immersive pre-mission rehearsal in virtual environments",
      "Real-time updates of search zones and probability grids",
      "Post-mission replay for training and debrief",
      "AR overlays highlighting hazards and routes",
      "Cross-agency coordination in shared 3D space",
    ],
    ctaText: "From mountain rescues to disaster recovery operations, ARTAK helps teams find the missing faster and operate safer.",
  },
  "security-protection": {
    icon: Shield,
    sysLabel: "[UC.03]",
    title: "Security Operations",
    titleAccent: "& Protective Command",
    subtitle: "Immersive Command for Modern Security Operations",
    heroDesc: "In an age of increasing complexity, the security landscape demands precision, coordination, and adaptability. ARTAK gives protective teams complete operational awareness in one immersive, real-time environment.",
    image: "https://images.unsplash.com/photo-1737502483541-92e91801cfaf?w=1200&q=80",
    body: "Protect what matters most — people, assets, and critical infrastructure — with ARTAK's immersive command platform. From dignitary protection and large-scale event security to infrastructure surveillance and tactical coordination, ARTAK empowers security teams to operate with unmatched situational awareness, real-time intelligence, and coordinated response.",
    capabilities: [
      "High-value individual protection (executives, politicians, diplomats)",
      "Event security (Super Bowl, World Cup, summits)",
      "Critical infrastructure and facility security",
      "Counter-surveillance and threat monitoring",
      "Visualize protective routes and escape paths in 3D/AR",
      "Real-time crowd movement heatmaps",
      "Drone and CCTV integration for aerial and ground coverage",
      "Multi-agency coordination for police, EMS, and private security",
    ],
    ctaText: "Whether defending a diplomatic convoy or securing the perimeter of a high-value facility, ARTAK's immersive spatial visualization empowers decision-makers to stay ahead of emerging threats.",
  },
  "police-law-enforcement": {
    icon: Siren,
    sysLabel: "[UC.04]",
    title: "Police",
    titleAccent: "& Law Enforcement",
    subtitle: "Empower Your Law Enforcement Officers",
    heroDesc: "For urban operations, crowd control, or tactical response, ARTAK provides a shared operational view that improves decision-making and reduces risk. Officers can rehearse complex scenarios in XR and access real-time overlays during live incidents.",
    image: "https://images.unsplash.com/photo-1700774607019-dfa5907a26fd?w=1200&q=80",
    body: "Modern policing demands more than dispatch and radio coordination — it requires total situational awareness. ARTAK brings this to life with 3D operational maps, immersive training, and field AR guidance for officers on the move. Whether managing a large-scale public event, coordinating a tactical response, or training for active shooter situations, ARTAK gives law enforcement leaders the tools to visualize, plan, and execute with confidence.",
    capabilities: [
      "3D incident management for crowd control or emergency events",
      "VR training environments for tactical and crisis response",
      "Live tracking of units, vehicles, and drones",
      "Shared virtual operations centers for multi-agency collaboration",
      "Real-time field AR overlays for officers",
      "Post-incident review and training replay",
    ],
    ctaText: "With ARTAK, command decisions are made faster, safer, and based on a complete spatial picture of the situation.",
  },
  "fire-emergency": {
    icon: Flame,
    sysLabel: "[UC.05]",
    title: "Fire",
    titleAccent: "& Emergency Services",
    subtitle: "Empower Your Fire Fighters",
    heroDesc: "ARTAK gives fire commanders complete situational awareness — tracking crews, visualizing structure layouts, and modeling wildfire spread in 3D. Through AR and VR, teams can prepare, respond, and review every mission with confidence.",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&q=80",
    body: "Wildfires and structural fires demand real-time coordination across multiple teams and jurisdictions. ARTAK brings clarity to the fireground with immersive 3D fire command visualization, integrated data feeds, and AR crew tracking. Incident commanders can view structure layouts, track crews inside buildings, or monitor wildfire spread using live drone imagery and predictive overlays.",
    capabilities: [
      "Pre-plan high-risk sites using 3D building models",
      "Visualize fireline progression and weather shifts in real time",
      "Coordinate across mutual aid agencies in shared virtual command",
      "VR simulations for training and post-incident review",
      "Track crews inside structures with AR overlays",
      "Integrated drone imagery and predictive overlays",
    ],
    ctaText: "ARTAK helps fire agencies respond faster, make safer tactical calls, and prepare crews through realistic mission rehearsal environments.",
  },
  "space-aerospace": {
    icon: Rocket,
    sysLabel: "[UC.06]",
    title: "Space Operations",
    titleAccent: "& Aerospace Coordination",
    subtitle: "Empower Your Space Domain Operations",
    heroDesc: "From orbital mission planning to ground-station coordination, ARTAK enables teams to visualize assets, trajectories, and contingencies in immersive 3D. It brings real-time command awareness to an increasingly complex operational domain.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80",
    body: "As space operations become increasingly crowded and complex, ARTAK offers a new frontier in orbital visualization and mission command. Space operations teams can use ARTAK to visualize trajectories, monitor orbital assets, and simulate mission scenarios in VR. Whether managing satellites, coordinating ground communications, or responding to anomalies, ARTAK provides a unified, immersive command environment that enhances safety and decision speed.",
    capabilities: [
      "3D orbital visualization and trajectory mapping",
      "Mission rehearsal and anomaly simulation",
      "Ground station coordination via shared dashboards",
      "Integration with telemetry and tracking data",
      "Real-time monitoring of orbital assets",
      "Launch-to-orbit mission planning in immersive 3D",
    ],
    ctaText: "From launch to orbit, ARTAK helps teams operate with total confidence and spatial clarity.",
  },
};

const slugs = Object.keys(useCaseData);

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function ArtakSubPage() {
  const { slug } = useParams();
  const data = useCaseData[slug];

  if (!data) return <Navigate to="/artak" replace />;

  const currentIdx = slugs.indexOf(slug);
  const prevSlug = currentIdx > 0 ? slugs[currentIdx - 1] : null;
  const nextSlug = currentIdx < slugs.length - 1 ? slugs[currentIdx + 1] : null;

  const Icon = data.icon;

  return (
    <div data-testid={`artak-subpage-${slug}`}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute inset-0 z-0">
          <img src={data.image} alt="" className="w-full h-full object-cover opacity-10 grayscale" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/90 to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/artak" className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 hover:text-white transition-colors uppercase">ARTAK</Link>
            <span className="text-zinc-700">/</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">{data.title}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Icon size={16} className="text-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase">{data.sysLabel}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            {data.title} <span className="text-zinc-500">{data.titleAccent}</span>
          </h1>
          <p className="mt-4 font-mono text-xs tracking-[0.15em] text-zinc-500 uppercase">{data.subtitle}</p>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">{data.heroDesc}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">Overview // Mission Context</span>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8">{data.body}</p>
              <p className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-[#FF0B1B] pl-4">{data.ctaText}</p>
            </div>

            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">Key Capabilities</span>
              <div className="space-y-3">
                {data.capabilities.map((cap, i) => (
                  <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FF0B1B] transition-colors">
                      <span className="font-mono text-[9px] text-zinc-600 group-hover:text-[#FF0B1B] transition-colors">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="text-sm text-zinc-400">{cap}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <ArtakFeaturesSection />

      {/* Use Cases */}
      <UseCasesSection />

      {/* Kits & Software */}
      <KitsSoftwareSection />

      {/* Case Studies */}
      <CaseStudiesSection />

      {/* CTA + Navigation */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">
              Experience ARTAK in Action
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
              Contact us today to learn more or to schedule a personalized demo.
            </p>
            <Link
              to="/#contact"
              data-testid="subpage-demo-cta"
              className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors"
            >
              Request a Demo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800 pt-8">
            {prevSlug ? (
              <Link to={`/artak/${prevSlug}`} data-testid="subpage-nav-prev" className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">
                <ArrowLeft size={14} /> {useCaseData[prevSlug].title}
              </Link>
            ) : <div />}
            <Link to="/artak" data-testid="subpage-nav-all" className="font-mono text-xs text-zinc-600 hover:text-white transition-colors uppercase tracking-wider">
              All Use Cases
            </Link>
            {nextSlug ? (
              <Link to={`/artak/${nextSlug}`} data-testid="subpage-nav-next" className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">
                {useCaseData[nextSlug].title} <ArrowRight size={14} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </div>
  );
}
