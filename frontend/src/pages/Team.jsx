import { motion } from "framer-motion";
import { User } from "lucide-react";
import SEO from "@/components/SEO";

const leadership = [
  { name: "Michael McCormack", title: "Co-Founder & CEO" },
  { name: "Mike Simmons", title: "Co-Founder & CMO" },
  { name: "John Cannizzaro", title: "Co-Founder & CBDO" },
  { name: "Michael Havenick", title: "Co-Founder" },
  { name: "Cameron Davis", title: "Chief Technology Officer" },
  { name: "Pablo Lopez", title: "Chief Financial Officer" },
  { name: "Ismael Rivera", title: "Chief Liaison Officer" },
];

const team = [
  { name: "Garrett Krick", title: "VP of Simulations" },
  { name: "Henry Halse", title: "Full Stack Engineer" },
  { name: "Ruben Varela", title: "Liaison Officer" },
  { name: "Lauren Bowler", title: "QA Engineer" },
  { name: "Reynel Rodriguez", title: "Innovation Lead / LiDAR" },
  { name: "Arturo Eusebio", title: "S3 - Operations Lead" },
  { name: "Shaun Kelley", title: "Information Security Officer" },
  { name: "Mac Murphy", title: "Software Engineer" },
  { name: "Emily Beck", title: "Senior Systems Architect" },
  { name: "Rock Jackson", title: "Creative Director" },
  { name: "Luis Lopez", title: "Relationship Manager" },
  { name: "Matthew Hayes", title: "Unity Developer" },
  { name: "Tiffany Stelzer", title: "Production Manager" },
  { name: "Brendan McCaffrey", title: "Project Manager / Operations" },
];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.05 } }),
};

function MemberCard({ member, index }) {
  const initials = getInitials(member.name);
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={fadeUp}
      data-testid={`team-member-${index}`}
      className="bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D] transition-colors relative"
    >
      <div className="w-14 h-14 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#FF0B1B] transition-colors">
        <span className="font-heading text-sm font-bold text-zinc-600 group-hover:text-[#FF0B1B] transition-colors">
          {initials}
        </span>
      </div>
      <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wide mb-1">{member.name}</h3>
      <p className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase">{member.title}</p>
      <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

export default function Team() {
  return (
    <div data-testid="team-page">
      <SEO
        title="The Team"
        description="Meet the EolianVR team — 21 professionals with 100+ combined years in software development, engineering, defense operations, and immersive technology."
        path="/team"
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">People // Team</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]">
            The <span className="text-[#FF0B1B]">Team</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            A combined 100+ years in software development, engineering, defense operations, and immersive technology.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Executive // Leadership</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Company Leadership</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-800">
            {leadership.map((m, i) => (
              <MemberCard key={i} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF0B1B]" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Operations // Engineering</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Team Members</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-800">
            {team.map((m, i) => (
              <MemberCard key={i} member={m} index={leadership.length + i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stat */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <User size={16} className="text-[#FF0B1B]" />
            <span className="font-mono text-xs text-zinc-500 tracking-wider">
              {leadership.length + team.length} TEAM MEMBERS // UNITED BY MISSION
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
