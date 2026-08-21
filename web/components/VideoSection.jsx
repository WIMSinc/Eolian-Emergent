"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="py-20 md:py-28 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
              ARTAK // Platform Demo
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            See ARTAK in Action
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-2xl">
            Watch a live walkthrough of ARTAK's immersive command and control capabilities — from real-time geospatial visualization to multi-domain mission planning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative border border-zinc-800 overflow-hidden"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            src="https://www.youtube.com/embed/-vi6PNkhEHA?start=2"
            title="ARTAK Platform Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
