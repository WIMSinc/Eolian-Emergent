import { motion } from "framer-motion";
import {
  Eye, Radio, BarChart3, Users, GraduationCap, BrainCircuit, Settings, Scaling,
} from "lucide-react";

const features = [
  { icon: Eye, title: "Real-Time Situational Awareness", desc: "Gain immediate insights into evolving situations with live data overlays and 3D mapping, enhancing decision-making and response times." },
  { icon: Radio, title: "Enhanced Communication Channels", desc: "Facilitate seamless communication among teams with integrated voice and data sharing, ensuring everyone stays informed and coordinated." },
  { icon: BarChart3, title: "Resource Allocation Optimization", desc: "Utilize predictive analytics to efficiently allocate resources where they are needed most, minimizing waste and maximizing impact." },
  { icon: Users, title: "Remote Collaboration Tools", desc: "Enable remote teams to collaborate effectively through virtual environments, reducing the need for physical presence and accelerating response." },
  { icon: GraduationCap, title: "Training & Simulation Modules", desc: "Prepare teams with immersive training scenarios that simulate real-world emergencies, enhancing readiness and response capabilities." },
  { icon: BrainCircuit, title: "Data-Driven Decision Support", desc: "Leverage comprehensive data analysis to support strategic decisions, improving outcomes and reducing risks during crises." },
  { icon: Settings, title: "Customizable User Interfaces", desc: "Adapt the ARTAK platform to meet specific operational needs with customizable dashboards and interfaces." },
  { icon: Scaling, title: "Scalable Deployment Options", desc: "Deploy ARTAK across various scales, from local incidents to large-scale operations, with flexible and scalable solutions." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function ArtakFeaturesSection() {
  return (
    <section
      id="artak-features"
      data-testid="artak-features-section"
      className="relative py-24 md:py-32 border-t border-zinc-800"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
              Platform // Features
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            ARTAK Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              data-testid={`artak-feature-card-${i}`}
              className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative"
            >
              <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#FF0B1B] transition-colors">
                <feat.icon size={16} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
              </div>
              <h3 className="font-heading text-xs font-semibold text-white tracking-wide uppercase mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{feat.desc}</p>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
