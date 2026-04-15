import { motion } from "framer-motion";
import { Crosshair, Radio, Globe, Shield } from "lucide-react";

const panels = [
  {
    sysLabel: "[SYS.01]",
    title: "Command & Control",
    subtitle: "NextGen C2 / JADC2 Across Echelons",
    description:
      "ARTAK is built to serve as command's heads-up display and allow for more informed decision making. Users create a session, observe the location of concern, engage with data layers, and watch their lanes. As intel becomes available it populates in real-time on the session map, alerting all users to the changing environment and enabling instantaneous understanding of the operational state.",
    image:
      "https://images.unsplash.com/photo-1737502483541-92e91801cfaf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHRhY3RpY2FsJTIwY29tbWFuZCUyMGNlbnRlciUyMGRhcmt8ZW58MHx8fHwxNzc2MjY3OTc5fDA&ixlib=rb-4.1.0&q=85",
    icon: Crosshair,
    span: "md:col-span-7",
  },
  {
    sysLabel: "[SYS.02]",
    title: "Pre-Mission Planning",
    subtitle: "Enhancing Collaboration Across Partner Forces",
    description:
      "ARTAK deployed in preparation for and during NATO SOF 2025 to increase the efficiency and precision of planning, briefing, and rehearsal activities across both US and Partner Forces. The shared understanding and enhanced situational awareness provided by ARTAK helped enable successful execution of training missions.",
    image:
      "https://images.unsplash.com/photo-1759167625071-069dc252702f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwVlIlMjBoZWFkc2V0JTIwbWlsaXRhcnklMjBkYXJrfGVufDB8fHx8MTc3NjI2Nzk4NXww&ixlib=rb-4.1.0&q=85",
    icon: Globe,
    span: "md:col-span-5",
  },
  {
    sysLabel: "[SYS.03]",
    title: "Virtual ROC Drill / Sand Table",
    subtitle: "90 Min Joint ROC Drill Conducted in ARTAK",
    description:
      "ARTAK used to conduct a 90 minute rehearsal of concepts (ROC) drill during a joint exercise — the largest and longest brief ever conducted by a customer in ARTAK. Prior to the ROC Drill, key leaders collaborated using a realistic 3D map of the area of interest to develop the mission plan.",
    image:
      "https://images.unsplash.com/photo-1773839420967-b50018fc0505?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwVlIlMjBoZWFkc2V0JTIwbWlsaXRhcnklMjBkYXJrfGVufDB8fHx8MTc3NjI2Nzk4NXww&ixlib=rb-4.1.0&q=85",
    icon: Radio,
    span: "md:col-span-6",
  },
  {
    sysLabel: "[SYS.04]",
    title: "The Augmented Reality Team Awareness Kit",
    subtitle: "ARTAK Block 2 Out Now",
    description:
      "ARTAK is a multi-domain joint planning and command & control platform. It synchronizes planning and C2 activities across echelons, domains, and warfighting functions by bringing command and staff together into a single digital decision environment. ARTAK software is device agnostic, running across AR, VR, Tablet, Phone, Laptop, and PC.",
    image:
      "https://images.unsplash.com/photo-1588336443962-49d88df004a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w7NTY2ODh8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwaGVhZHNldCUyMGRhcmt8ZW58MHx8fHwxNzc2MjY3NjkwfDA&ixlib=rb-4.1.0&q=85",
    icon: Shield,
    span: "md:col-span-6",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function ProductSection() {
  return (
    <section
      id="artak"
      data-testid="product-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
              Product // ARTAK
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Augmented Reality
            <br />
            <span className="text-zinc-500">Team Awareness Kit</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-800">
          {panels.map((panel, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className={`${panel.span} bg-[#0A0A0A] group relative overflow-hidden`}
              data-testid={`bento-panel-${i}`}
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

                {/* System label */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <panel.icon
                    size={14}
                    className="text-[#FF0B1B]"
                  />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B]">
                    {panel.sysLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-2 tracking-normal">
                  {panel.title}
                </h3>
                <p className="font-mono text-xs tracking-wider text-zinc-500 uppercase mb-4">
                  {panel.subtitle}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {panel.description}
                </p>
              </div>

              {/* Hover border accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
