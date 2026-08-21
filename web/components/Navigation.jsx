"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const aboutSubLinks = [
  { label: "About Eolian", to: "/about" },
  { label: "Past Performance", to: "/about/past-performance" },
  { label: "Awards & Recognition", to: "/about/awards" },
  { label: "Intellectual Property", to: "/about/intellectual-property" },
];

const artakSubLinks = [
  { label: "ARTAK Overview", to: "/artak" },
  { label: "National Security & Public Safety", to: "/artak/national-security" },
  { label: "Disaster Response & Emergency Mgmt", to: "/artak/disaster-response" },
  { label: "Search & Rescue / First Responders", to: "/artak/search-rescue" },
  { label: "Security & Protection Services", to: "/artak/security-protection" },
  { label: "Police & Law Enforcement", to: "/artak/police-law-enforcement" },
  { label: "Fire & Emergency Services", to: "/artak/fire-emergency" },
  { label: "Space & Aerospace Operations", to: "/artak/space-aerospace" },
  { label: "CHORD — Human-Autonomy Debrief", to: "/artak/chord" },
  { label: "CB-SIGHT — Chem-Bio Operations", to: "/artak/chem-bio" },
];

const navLinks = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about", hasDropdown: true },
  { label: "ARTAK", to: "/artak", hasDropdown: true },
  { label: "MAP MAKER", to: "/mapmaker" },
  { label: "ACQUIRE", to: "/acquire" },
  { label: "SERVICES", to: "/services" },
  { label: "THE LAB", to: "/lab" },
  { label: "TEAM", to: "/team" },
  { label: "SUPPORT", to: "/support" },
  { label: "CONTACT", to: "/#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [artakOpen, setArtakOpen] = useState(false);
  const [mobileArtakOpen, setMobileArtakOpen] = useState(false);
  const aboutDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    setMobileAboutOpen(false);
    setArtakOpen(false);
    setMobileArtakOpen(false);
  }, [pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setArtakOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleClick = (e, link) => {
    if (link.to === "/#contact") {
      if (pathname === "/") {
        e.preventDefault();
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    if (to === "/#contact") return false;
    return pathname.startsWith(to);
  };

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/95 backdrop-blur-md border-b border-zinc-800"
          : "bg-[#050505]/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <Link href="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <img src="/eolian-logo-white.webp" alt="Eolian" width="124" height="160" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="relative"
                ref={link.label === "ABOUT" ? aboutDropdownRef : dropdownRef}
              >
                <button
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  aria-haspopup="true"
                  aria-expanded={link.label === "ABOUT" ? aboutOpen : artakOpen}
                  onClick={() =>
                    link.label === "ABOUT"
                      ? setAboutOpen(!aboutOpen)
                      : setArtakOpen(!artakOpen)
                  }
                  className={`font-mono text-xs tracking-[0.15em] transition-colors duration-300 relative group flex items-center gap-1 ${
                    isActive(link.to) ? "text-white" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      link.label === "ABOUT" ? (aboutOpen ? "rotate-180" : "") : (artakOpen ? "rotate-180" : "")
                    }`}
                  />
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#FF0B1B] transition-all duration-300 ${
                    isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>

                <AnimatePresence>
                  {(link.label === "ABOUT" ? aboutOpen : artakOpen) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      data-testid={`${link.label.toLowerCase()}-dropdown`}
                      className="absolute top-full left-0 mt-3 w-72 bg-[#0A0A0A] border border-zinc-800 shadow-xl shadow-black/40"
                    >
                      {(link.label === "ABOUT" ? aboutSubLinks : artakSubLinks).map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.to}
                          data-testid={`${link.label.toLowerCase()}-dropdown-${i}`}
                          className={`block px-5 py-3 font-mono text-[11px] tracking-[0.1em] transition-colors border-b border-zinc-800/50 last:border-0 ${
                            pathname === sub.to
                              ? "text-[#FF0B1B] bg-[#FF0B1B]/5"
                              : "text-zinc-500 hover:text-white hover:bg-zinc-800/30"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.to}
                onClick={(e) => handleClick(e, link)}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`font-mono text-xs tracking-[0.15em] transition-colors duration-300 relative group ${
                  isActive(link.to) ? "text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#FF0B1B] transition-all duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          data-testid="mobile-menu-toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            data-testid="mobile-menu"
            className="lg:hidden bg-[#050505] border-b border-zinc-800"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() =>
                        link.label === "ABOUT"
                          ? setMobileAboutOpen(!mobileAboutOpen)
                          : setMobileArtakOpen(!mobileArtakOpen)
                      }
                      className={`font-mono text-sm tracking-[0.15em] transition-colors flex items-center gap-2 w-full ${
                        isActive(link.to) ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          link.label === "ABOUT" ? (mobileAboutOpen ? "rotate-180" : "") : (mobileArtakOpen ? "rotate-180" : "")
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {(link.label === "ABOUT" ? mobileAboutOpen : mobileArtakOpen) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-2 flex flex-col gap-2 border-l border-zinc-800 pl-4"
                        >
                          {(link.label === "ABOUT" ? aboutSubLinks : artakSubLinks).map((sub, i) => (
                            <Link
                              key={i}
                              href={sub.to}
                              className={`font-mono text-xs tracking-[0.1em] transition-colors ${
                                pathname === sub.to ? "text-[#FF0B1B]" : "text-zinc-500 hover:text-white"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.to}
                    onClick={(e) => handleClick(e, link)}
                    data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    className={`font-mono text-sm tracking-[0.15em] transition-colors ${
                      isActive(link.to) ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
