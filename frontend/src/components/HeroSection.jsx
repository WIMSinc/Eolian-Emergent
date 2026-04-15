import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TacticalCanvas from "./TacticalCanvas";

const VIDEO_SRC = "/hero-bg.mp4";
const POSTER_IMG = "https://images.pexels.com/videos/34189669/pexels-photo-34189669.jpeg?auto=compress&cs=tinysrgb&w=1920";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const scrollToArtak = () => {
    const el = document.querySelector("#artak");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Video background */}
      <div className="absolute inset-0 z-[1]">
        <video
          ref={videoRef}
          data-testid="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER_IMG}
          onCanPlay={() => {
            setVideoLoaded(true);
            videoRef.current?.play().catch(() => {});
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-30" : "opacity-0"
          }`}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Poster fallback while video loads */}
        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${POSTER_IMG})` }}
          />
        )}
        {/* Red tint overlay - blends with video to stay on-brand */}
        <div className="absolute inset-0 bg-[#FF0B1B]/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[#FF0B1B]/5 mix-blend-color" />
      </div>

      {/* Tactical canvas overlay on top of video */}
      <div className="absolute inset-0 z-[2]">
        <TacticalCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]/90" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-[#050505] to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 z-[3] bg-gradient-to-b from-[#050505]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-20">
        <div className="max-w-4xl">
          {/* System label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 bg-[#FF0B1B] animate-pulse" />
            <span className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
              EolianVR, Inc. // Defense & Enterprise AR/VR
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95]"
          >
            Enhanced Command
            <br />
            & Control<span className="text-[#FF0B1B]">,</span>
            <br />
            <span className="text-zinc-500">3D Mission Planning</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed"
          >
            Situational awareness at the edge. Multi-domain joint planning and
            C2 platform powered by augmented and virtual reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              data-testid="hero-cta-contact"
              onClick={scrollToContact}
              className="bg-[#FF0B1B] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#D90412] transition-colors duration-300"
            >
              Contact Us
            </button>
            <button
              data-testid="hero-cta-learn"
              onClick={scrollToArtak}
              className="bg-transparent text-white border border-zinc-700 font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors duration-300"
            >
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex gap-12 border-t border-zinc-800 pt-8"
          >
            {[
              { value: "ARTAK", label: "Block 2 Released" },
              { value: "MDO", label: "Multi-Domain Ops" },
              { value: "JADC2", label: "Joint All-Domain" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-heading text-lg font-bold text-[#FF0B1B]">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-zinc-600 tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} className="text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
