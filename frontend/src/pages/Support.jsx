import { motion } from "framer-motion";
import { Phone, Ticket, BookOpen, ArrowRight, FileText, Headset } from "lucide-react";
import SEO from "@/components/SEO";

const manuals = [
  { device: "HoloLens 2", icon: Headset },
  { device: "Oculus Quest 2", icon: Headset },
  { device: "Windows Desktop", icon: FileText },
  { device: "Samsung Mobile", icon: FileText },
  { device: "Magic Leap 2", icon: Headset },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function Support() {
  return (
    <div data-testid="support-page">
      <SEO
        title="ARTAK Support Hub"
        description="Get ARTAK support: call (888) 811-5339, create a ticket, or access device user manuals for HoloLens 2, Quest, Magic Leap 2, Desktop, and Mobile."
        path="/support"
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Help // Support</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            ARTAK <span className="text-[#FF0B1B]">Support</span> Hub
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Contact, user manuals, setup guide, & FAQs. Everything you need to get the most out of your ARTAK deployment.
          </p>
        </div>
      </section>

      {/* Immediate Support */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="bg-[#0A0A0A] p-8 md:p-12 group hover:bg-[#0D0D0D] transition-colors relative">
              <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-[#FF0B1B] transition-colors">
                <Phone size={20} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase block mb-3">Immediate Support</span>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-4">Call or Text</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                If you need immediate support, someone will be with you ASAP.
              </p>
              <a href="tel:8888115339" data-testid="support-phone-link" className="font-mono text-2xl text-white hover:text-[#FF0B1B] transition-colors tracking-wider">
                (888) 811-5339
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-[#0A0A0A] p-8 md:p-12 group hover:bg-[#0D0D0D] transition-colors relative">
              <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-[#FF0B1B] transition-colors">
                <Ticket size={20} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase block mb-3">Support Ticket</span>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-4">Create a Ticket</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Prefer to create a customer support ticket? Click below and our team will respond promptly.
              </p>
              <a href="https://share.hsforms.com/124KXMQCwQIaK-u7eKbL0_Abmwk1" target="_blank" rel="noopener noreferrer" data-testid="support-ticket-link" className="inline-flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-6 py-3 hover:bg-[#D90412] transition-colors">
                Open Ticket <ArrowRight size={14} />
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Manuals */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Documentation // Manuals</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">User Manuals</h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-xl">
              Access device-specific user manuals for your ARTAK deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {manuals.map((manual, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} data-testid={`manual-card-${i}`} className="bg-[#0A0A0A] p-6 md:p-8 group hover:bg-[#0D0D0D] transition-colors relative">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF0B1B] transition-colors shrink-0">
                    <manual.icon size={16} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-600 tracking-wider block">[DOC.0{i + 1}]</span>
                    <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wide">
                      ARTAK {manual.device}
                    </h3>
                    <span className="font-mono text-[10px] text-zinc-500">User Manual</span>
                  </div>
                  <BookOpen size={14} className="text-zinc-700 group-hover:text-[#FF0B1B] transition-colors ml-auto" />
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
