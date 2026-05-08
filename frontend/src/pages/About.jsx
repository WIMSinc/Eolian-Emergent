import { motion } from "framer-motion";
import { Target, Lightbulb, HelpCircle, Microscope, HeartHandshake, TrendingUp } from "lucide-react";
import PartnersSection from "@/components/PartnersSection";
import SEO, { organizationSchema } from "@/components/SEO";

const values = [
  { icon: Lightbulb, title: "Passion for Innovation", desc: "We are deeply committed to investing in R&D focused on Mixed Reality and Artificial Intelligence for Defense, Healthcare, and various other use-cases." },
  { icon: Target, title: "Solve the Really Hard Problems", desc: "We don't shy away from the big scary challenges that inherently come with taking on big, bold tasks. They are the ones truly worth attacking." },
  { icon: HelpCircle, title: 'Relentless Pursuit of "The Why"', desc: "We love to hear people say things can't be done, or that something is impossible. Why can't they? We simply don't accept the status quo." },
  { icon: Microscope, title: "Insatiable Curiosity", desc: "This is essentially a required trait regardless of what role you play with us. You must love learning, exploring, demoing, and creating new things." },
  { icon: TrendingUp, title: "Willingness to Fail", desc: "When you take on the hard problems in life, failure is inevitable and an essential part of the journey when you perceive setbacks appropriately and learn from them." },
  { icon: HeartHandshake, title: "Generosity", desc: "We couldn't do what we do without our invaluable network of clients, advisors, mentors, former clients, freelancers, friends, and family." },
];

const naics = [
  "541511 — Custom Computer Programming Services",
  "541512 — Computer Systems Design Services",
  "541613 — Marketing Consulting Services",
  "423420 — Office Equipment Merchant Wholesalers",
  "423430 — Computer & Peripheral Equipment Wholesalers",
  "511210 — Software Publishers",
  "512110 — Motion Picture and Video Production",
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function About() {
  return (
    <div data-testid="about-page">
      <SEO
        title="About Eolian"
        description="Eolian develops AR, VR, Mixed Reality, AI/ML, and 3D Animation solutions for enterprise and government. Our mission: save lives using technology."
        path="/about"
        jsonLd={organizationSchema}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Company // About</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            About <span className="text-[#FF0B1B]">Eolian</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Eolian develops Augmented Reality (AR), Virtual Reality (VR), Mixed Reality (MR), AI/Machine Learning, & 3D Animation solutions for enterprise & government/public sector entities.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="bg-[#0A0A0A] p-8 md:p-12">
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase block mb-4">[01] Our Mission</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">Save Lives Using Technology</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Our mission is to virtually save lives by creating and deploying a variety of products and services that utilize Augmented Reality (AR), Virtual Reality (VR), Artificial Intelligence (AI), and Machine Learning technology to solve critical problems.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-[#0A0A0A] p-8 md:p-12">
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase block mb-4">[02] Our Vision</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">Build Better Worlds</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We build new worlds that enable people to cultivate a better real one. We make it so you can train, learn, fail, communicate, and collaborate virtually where the stakes are lower, so when you come back to the real world your chances of successful outcomes are dramatically increased.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-6">Our Story</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white max-w-3xl mx-auto">
            We got started because we wanted to do our part to help save lives using technology<span className="text-[#FF0B1B]">.</span>
          </h2>
          <p className="mt-6 text-base text-zinc-500 font-mono tracking-wider">
            It's our mission to help save lives using VR and AR technologies.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Principles // Values</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {values.map((v, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A0A0A] p-6 md:p-8 group hover:bg-[#0D0D0D] transition-colors relative">
                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#FF0B1B] transition-colors">
                  <v.icon size={18} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white tracking-wide uppercase mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / SAM.GOV */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4">Federal // Procurement</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">Available on SAM.GOV</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Eolian's services are available to Federal Agencies through SAM.GOV. We develop and sell a variety of products and services that utilize AR, VR, & AI to solve critical problems for government and enterprise customers.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Drawing from a combined 100+ years in software development and engineering, our team develops and deploys applications across Microsoft HoloLens 2, Magic Leap 2, Meta Quest, and many more platforms.
              </p>
            </div>
            <div className="bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#FF0B1B]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">NAICS Codes</span>
              </div>
              <div className="space-y-3">
                {naics.map((code, i) => (
                  <div key={i} className="font-mono text-xs text-zinc-500 py-2 border-b border-zinc-800/50 last:border-0">
                    {code}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersSection />
    </div>
  );
}
