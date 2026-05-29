import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Star, DollarSign, Award } from "lucide-react";

const awards = [
  {
    icon: Award,
    category: "Department of Labor",
    title: "HIRE Vets Gold Medallion Award",
    years: "2022 – 2024",
    desc: "Awarded by the U.S. Department of Labor in recognition of Eolian's commitment to recruiting, employing, and retaining veterans.",
  },
  {
    icon: DollarSign,
    category: "Congressional Appropriation",
    title: "FY26 Congressional Appropriation",
    years: "$5M Committed",
    desc: "Approved in both Senate and House committee markups — demonstrating bipartisan recognition of ARTAK's operational value at the federal legislative level.",
  },
  {
    icon: Trophy,
    category: "Defense Innovation Unit",
    title: "DIU 5G Expeditionary Applications Selection",
    years: "2023",
    desc: "Selected for DIU's competitive 5G Expeditionary Applications program from 76 solution briefs submitted nationally.",
  },
  {
    icon: Star,
    category: "USSOCOM / APFIT",
    title: "APFIT Program Award Winner",
    years: "1st Cohort",
    desc: "1 of 10 companies selected for the USSOCOM Production OTA through the Congressionally funded APFIT program. Transitioned directly from prototype to production — a rare achievement.",
  },
  {
    icon: Trophy,
    category: "XR Today Awards",
    title: "XR Today Awards — Runner Up",
    years: "2022",
    desc: "Runner Up for Best XR Experience at the XR Today Awards, recognizing ARTAK as one of the most impactful extended reality platforms in the market.",
  },
  {
    icon: Star,
    category: "Unity",
    title: "Unity 2022 Creator Award",
    years: "Government & Aerospace",
    desc: 'Awarded "Best XR Mission Planning Platform" at the Unity 2022 Creator Awards in the Government & Aerospace category.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function AboutAwards() {
  return (
    <div data-testid="awards-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <Link to="/about" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-wider uppercase hover:text-white transition-colors mb-8">
            <ArrowLeft size={12} /> Back to About
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Company // Recognition</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl">
            Awards &amp; <span className="text-[#FF0B1B]">Recognition</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Industry, government, and legislative recognition of Eolian's technology, operational impact, and commitment to those who serve.
          </p>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeUp}
                className="bg-[#0A0A0A] p-8 group hover:bg-[#0D0D0D] transition-colors relative flex flex-col"
              >
                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-5 group-hover:border-[#FF0B1B] transition-colors">
                  <award.icon size={16} className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-2">{award.category}</span>
                <h3 className="font-heading text-base font-bold text-white uppercase tracking-tight mb-1">{award.title}</h3>
                <div className="font-mono text-xs text-[#FF0B1B] tracking-wider mb-4">{award.years}</div>
                <p className="text-xs text-zinc-500 leading-relaxed flex-1">{award.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
