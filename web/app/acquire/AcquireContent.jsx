"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Download, Mail, Phone, ChevronRight } from "lucide-react";
import CatalogModal from "@/components/CatalogModal";
import { SECTIONS, DISCLAIMERS, CONTACT, GUIDE_UPDATED } from "@/data/acquireGuide";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* ---------- block renderers ---------- */

function Paragraph({ text }) {
  return <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">{text}</p>;
}

function Heading({ text }) {
  return (
    <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wide mt-10 mb-4 flex items-center gap-3">
      <span className="w-5 h-px bg-[#FF0B1B] shrink-0" />
      {text}
    </h3>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5 max-w-3xl">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-1 h-1 bg-[#FF0B1B] shrink-0 mt-2" />
          <span className="text-sm text-zinc-400 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }) {
  return (
    <ol className="space-y-px bg-zinc-800 border border-zinc-800">
      {items.map((step, i) => (
        <li key={i} className="bg-[#0A0A0A] p-5 md:p-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wide">{step.title}</h4>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed pl-8">{step.body}</p>
          {step.quote && (
            <p className="mt-3 ml-8 border-l-2 border-[#FF0B1B]/40 pl-4 text-sm text-zinc-300 italic">
              &ldquo;{step.quote}&rdquo;
            </p>
          )}
          {step.template && (
            <div className="ml-8 mt-4 border border-zinc-800 bg-[#050505] p-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-2">Template</p>
              <p className="font-mono text-xs text-zinc-300 mb-2">
                <span className="text-zinc-500">Subject: </span>
                {step.template.subject}
              </p>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">{step.template.body}</p>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto border border-zinc-800">
      <table className="w-full min-w-[520px] border-collapse">
        <thead>
          <tr className="bg-[#0D0D0D]">
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="text-left font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase px-4 py-3 border-b border-zinc-800"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="bg-[#0A0A0A] border-b border-zinc-800/60 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 text-sm leading-relaxed align-top ${
                    j === 0 ? "text-white font-mono text-xs" : "text-zinc-400"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ variant, title, items }) {
  const accent = variant === "accent";
  return (
    <div
      className={`border p-5 md:p-6 ${
        accent ? "border-[#FF0B1B]/30 bg-[#FF0B1B]/[0.04]" : "border-zinc-800 bg-[#0A0A0A]"
      }`}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase mb-3">{title}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <ChevronRight size={13} className="text-[#FF0B1B] shrink-0 mt-1" />
            <span className="text-sm text-zinc-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Note({ text }) {
  return (
    <div className="border-l-2 border-zinc-700 pl-4 py-1 max-w-3xl">
      <p className="text-xs text-zinc-400 leading-relaxed">{text}</p>
    </div>
  );
}

function Faq({ items }) {
  return (
    <div className="space-y-px bg-zinc-800 border border-zinc-800">
      {items.map((item, i) => (
        <div key={i} className="bg-[#0A0A0A] p-5">
          <p className="font-heading text-sm font-bold text-white mb-2">{item.q}</p>
          <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case "p":
      return <Paragraph text={block.text} />;
    case "h3":
      return <Heading text={block.text} />;
    case "list":
      return <BulletList items={block.items} />;
    case "steps":
      return <Steps items={block.items} />;
    case "table":
      return <DataTable headers={block.headers} rows={block.rows} />;
    case "callout":
      return <Callout variant={block.variant} title={block.title} items={block.items} />;
    case "note":
      return <Note text={block.text} />;
    case "faq":
      return <Faq items={block.items} />;
    default:
      return null;
  }
}

/* ---------- page ---------- */

export default function AcquireContent() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [catalogOpen, setCatalogOpen] = useState(false);

  // Highlight the section currently in view in the jump nav.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jumpTo = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Offset for the fixed nav bar.
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <main className="pt-28 md:pt-36 pb-24">
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
              Acquisition // Procurement Guide
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white max-w-4xl">
            How to Acquire ARTAK
          </h1>
          <p className="mt-5 text-base text-zinc-400 max-w-3xl leading-relaxed">
            A practical walkthrough for DoD units and contracting officers purchasing the ARTAK Squad Kit under
            Simplified Acquisition Procedures — FAR Part 13 and DFARS Part 213, at or below the $350,000
            Simplified Acquisition Threshold.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.15em] text-zinc-500 uppercase">
            Current as of {GUIDE_UPDATED}
          </p>
        </motion.div>

        {/* Legal notice — deliberately above the content, not buried at the foot */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          aria-labelledby="legal-notice-heading"
          className="mt-10 border border-[#FF0B1B]/30 bg-[#FF0B1B]/[0.04] p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle size={16} className="text-[#FF0B1B] shrink-0" />
            <h2
              id="legal-notice-heading"
              className="font-heading text-sm font-bold text-white uppercase tracking-wide"
            >
              Important notice — read before acting
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DISCLAIMERS.map((d, i) => (
              <div key={i}>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase mb-2">{d.label}</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-14">
          {/* Jump nav */}
          <nav aria-label="Guide sections" className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-4">Contents</p>
            <ul className="space-y-px bg-zinc-800 border border-zinc-800 lg:bg-transparent lg:border-0 lg:space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id} className="bg-[#0A0A0A] lg:bg-transparent">
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => jumpTo(e, s.id)}
                    aria-current={activeId === s.id ? "true" : undefined}
                    data-testid={`guide-nav-${s.id}`}
                    className={`block px-4 py-3 lg:px-0 lg:py-1.5 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors border-l-2 lg:pl-3 ${
                      activeId === s.id
                        ? "text-[#FF0B1B] border-[#FF0B1B]"
                        : "text-zinc-400 hover:text-white border-transparent lg:border-zinc-800"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 hidden lg:block">
              <button
                onClick={() => setCatalogOpen(true)}
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-zinc-400 hover:text-[#FF0B1B] border border-zinc-800 hover:border-[#FF0B1B] px-3 py-2 transition-colors uppercase"
              >
                <Download size={11} /> Product Catalog
              </button>
            </div>
          </nav>

          {/* Sections */}
          <div className="min-w-0 space-y-20">
            {SECTIONS.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-28"
              >
                <div className="border-t border-zinc-800 pt-8 mb-8">
                  <h2
                    id={`${section.id}-heading`}
                    className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white"
                  >
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="mt-3 font-mono text-xs tracking-[0.1em] text-zinc-400 uppercase">
                      {section.subtitle}
                    </p>
                  )}
                </div>
                <div className="space-y-5">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </motion.section>
            ))}

            {/* Contact */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              aria-labelledby="guide-contact-heading"
              className="border-t border-zinc-800 pt-10"
            >
              <h2
                id="guide-contact-heading"
                className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2"
              >
                Contact EolianVR
              </h2>
              <p className="text-sm text-zinc-400 mb-6 max-w-2xl leading-relaxed">
                We provide a full Procurement Kit — quote, spec sheet, SAM and exclusions screenshots, reps and
                certs, WAWF instructions, and price justification — to reduce the contracting officer&rsquo;s
                workload. Route your PR, copy us, and we&rsquo;ll support the file.
              </p>

              <div className="border border-zinc-800 bg-[#0A0A0A] p-6 max-w-2xl">
                <p className="font-heading text-sm font-bold text-white uppercase tracking-wide">{CONTACT.name}</p>
                <p className="font-mono text-[11px] tracking-[0.1em] text-zinc-400 uppercase mt-1">{CONTACT.role}</p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-300 hover:text-[#FF0B1B] transition-colors"
                  >
                    <Phone size={12} /> {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-300 hover:text-[#FF0B1B] transition-colors"
                  >
                    <Mail size={12} /> {CONTACT.email}
                  </a>
                </div>
                <div className="mt-5 pt-5 border-t border-zinc-800 flex flex-wrap gap-x-8 gap-y-2">
                  <p className="font-mono text-[11px] text-zinc-400">
                    <span className="text-zinc-500">UEI </span>
                    {CONTACT.uei}
                  </p>
                  <p className="font-mono text-[11px] text-zinc-400">
                    <span className="text-zinc-500">CAGE </span>
                    {CONTACT.cage}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors"
                >
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => setCatalogOpen(true)}
                  className="inline-flex items-center gap-2 bg-transparent border border-zinc-700 text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:border-white transition-colors"
                >
                  <Download size={16} /> Product Catalog
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
