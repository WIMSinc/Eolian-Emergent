"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Crosshair,
  Eye,
  Footprints,
  Gauge,
  Globe,
  Hexagon,
  Layers,
  Map,
  Monitor,
  Palette,
  Radar,
  Radio,
  Search,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";

/**
 * Each Block is additive, so this section is too.
 *
 * Block 3 leads because it is the current release, but the Block 2 grid stays
 * below it in full rather than being replaced. Those capabilities did not go
 * anywhere — "World in a Box", JADC2 overlays and edge operation are still what
 * most of the platform copy elsewhere on the site refers to, and deleting them
 * here would make the release read as a swap instead of an addition.
 *
 * Copy is kept in step with /blog/artak-block-3-whats-new, which is the long
 * form of this same list. "Built to MIL-STD-2525E" is deliberate and must stay:
 * a blanket conformance claim is testable by a customer, and 2525E has been
 * superseded by 2525E w/ Change 1, so "complete adherence to 2525E" invites the
 * question of which version. No specific weapon system is named anywhere in
 * this section.
 */
const block3 = [
  {
    icon: Radar,
    title: "Weapon Inventory",
    desc: "200+ U.S. weapon systems, each carrying its real range, engagement envelope, and blast radius — and a weapon cannot be placed beyond the range it actually has.",
  },
  {
    icon: Hexagon,
    title: "Doctrinal Symbology",
    desc: "Thousands of new icons, nodes, symbols, maneuvers, and control measures built to MIL-STD-2525E, weighted toward higher-echelon graphics.",
  },
  {
    icon: Eye,
    title: "Render-Through Graphics",
    desc: "Symbols and control measures draw through buildings and terrain, so a boundary or phase line never disappears behind a ridgeline or a rooftop.",
  },
  {
    icon: Footprints,
    title: "Enhanced Immersion Mode",
    desc: "Higher-fidelity eye-level walkthroughs of building interiors, multi-floor structures, and subterranean spaces — rehearse in the actual terrain.",
  },
  {
    icon: Map,
    title: "Six New Base Maps",
    desc: "Aerial and Aerial with Labels, Bing and Google Road, Earth at Night, Google Satellite and Satellite with Labels, Google Shaded Topographic, and Cesium.",
  },
  {
    icon: Users,
    title: "Multi-User HMD Syncing",
    desc: "Improved headset synchronization across sessions, so every headset in the room holds the same picture at the same moment.",
  },
  {
    icon: Search,
    title: "Search by Warfighting Function",
    desc: "Filter points by category and by warfighting function — what makes a dense higher-echelon plan usable.",
  },
  {
    icon: Palette,
    title: "Refined Interaction Model",
    desc: "Improved hand tracking, menu manipulation, and laser pointing, plus color swatches for faster, more legible node coding.",
  },
];

const block2 = [
  {
    icon: Map,
    title: "Bigger & Better High-Quality 3D Maps",
    desc: "Massive terrain rendering with unprecedented fidelity and detail.",
  },
  {
    icon: Monitor,
    title: 'Streamlined & Improved UI/UX',
    desc: "Easy to use whether you're 7 years old or 70.",
  },
  {
    icon: Globe,
    title: '"World in a Box"',
    desc: "A 3D tiled map base layer of the entire planet.",
  },
  {
    icon: Radio,
    title: "JADC2 Live Data Stream Overlays",
    desc: "Real-time data from hundreds of sources at your fingertips.",
  },
  {
    icon: Layers,
    title: 'Enriched Full Immersion Mode / "Room-Scale"',
    desc: "Complete VR immersion for total situational awareness.",
  },
  {
    icon: Shield,
    title: "Enhanced Maps for Interiors & Subterranean",
    desc: "Building interiors, underwater, and sub-terranean mapping.",
  },
  {
    icon: Zap,
    title: "Advanced Capabilities at the Edge",
    desc: "Full operational capability in disconnected, austere environments.",
  },
  {
    icon: Target,
    title: "True MDO Across All Domains",
    desc: "Multi-Domain Operations across Land, Air, Sea, and Space.",
  },
  {
    icon: Gauge,
    title: "Boosted Speed, Stability & Fidelity",
    desc: "Decreased latency for a vastly superior user experience.",
  },
  {
    icon: Crosshair,
    title: "Thousands of Additional Capabilities",
    desc: "Expanded nodes, maneuvers, actions, settings, and customizations.",
  },
];

function FeatureGrid({ items, testIdPrefix }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800/50">
      {items.map((feat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          data-testid={`${testIdPrefix}-${i}`}
          className="bg-[#0A0A0A] p-6 md:p-8 group relative overflow-hidden hover:bg-[#0D0D0D] transition-colors duration-500"
        >
          <div className="flex gap-5">
            <div className="shrink-0">
              <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF0B1B] transition-colors duration-300">
                <feat.icon
                  size={18}
                  className="text-zinc-600 group-hover:text-[#FF0B1B] transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold text-white tracking-wide uppercase mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>

          {/* Hover accent */}
          <div className="absolute left-0 top-0 w-px h-0 bg-[#FF0B1B] group-hover:h-full transition-all duration-500" />
        </motion.div>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="capabilities"
      data-testid="features-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background image (blurred) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(/artak-c2.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
              Capabilities // Block 3
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Block 3 Release
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-3xl leading-relaxed">
            Block 1 put a high-quality 3D map in an operator&apos;s hands at the
            edge. Block 2 let units build those maps themselves, without a
            network. Block 3 turns the map into a staff planning environment —
            one where you cannot drag a weapon farther than it can actually
            shoot.
          </p>
          <Link
            href="/blog/artak-block-3-whats-new"
            data-testid="block3-blog-link"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#FF0B1B] uppercase hover:gap-3 transition-all"
          >
            Read the Block 3 breakdown <ArrowRight size={12} />
          </Link>
        </div>

        <FeatureGrid items={block3} testIdPrefix="block3-feature-card" />

        {/* Block 2 — retained, not superseded */}
        <div className="mt-20 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-zinc-700" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
              Also Current // Block 2
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Everything Block 2 Delivered
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-3xl leading-relaxed">
            Each Block is additive. Block 2&apos;s leap in mapping, performance
            and reach ships with Block 3 — nothing below was replaced.
          </p>
        </div>

        <FeatureGrid items={block2} testIdPrefix="feature-card" />
      </div>
    </section>
  );
}
