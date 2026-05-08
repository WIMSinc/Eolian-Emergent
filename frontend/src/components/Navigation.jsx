import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "ARTAK", to: "/artak" },
  { label: "MAP MAKER", to: "/mapmaker" },
  { label: "THE LAB", to: "/lab" },
  { label: "TEAM", to: "/team" },
  { label: "NEWS", to: "/news" },
  { label: "SUPPORT", to: "/support" },
  { label: "CONTACT", to: "/#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleClick = (e, link) => {
    if (link.to === "/#contact") {
      if (location.pathname === "/") {
        e.preventDefault();
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    if (to === "/#contact") return false;
    return location.pathname.startsWith(to);
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-2 group"
        >
          <img
            src="/eolian-logo-white.png"
            alt="Eolian"
            className="h-9 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={(e) => handleClick(e, link)}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`font-mono text-[11px] tracking-[0.15em] transition-colors duration-300 relative group ${
                isActive(link.to) ? "text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-[#FF0B1B] transition-all duration-300 ${
                isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          data-testid="mobile-menu-toggle"
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
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => handleClick(e, link)}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={`font-mono text-sm tracking-[0.15em] transition-colors ${
                    isActive(link.to) ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
