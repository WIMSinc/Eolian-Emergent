import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const handleClick = (e, target) => {
    if (target === "contact") {
      if (location.pathname === "/") {
        e.preventDefault();
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      data-testid="footer"
      className="border-t border-zinc-800 py-12"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/eolian-logo-white.png" alt="Eolian" className="h-10 w-auto opacity-80" />
            </div>
            <p className="font-mono text-xs text-zinc-600 tracking-wider">
              AR & VR Solutions for Defense & Enterprise
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Home", to: "/" },
              { label: "ARTAK", to: "/artak" },
              { label: "Capabilities", to: "/#capabilities" },
              { label: "Contact", to: "/#contact" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                data-testid={`footer-link-${link.label.toLowerCase()}`}
                onClick={(e) => handleClick(e, link.label.toLowerCase())}
                className="font-mono text-sm text-zinc-600 hover:text-white transition-colors tracking-wider uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-zinc-700 tracking-wider">
            &copy; {new Date().getFullYear()} EolianVR, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
