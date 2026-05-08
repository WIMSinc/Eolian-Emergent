export default function Footer() {
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
              <img src="/eolian-logo-white.png" alt="Eolian" className="h-8 w-auto opacity-80" />
            </div>
            <p className="font-mono text-xs text-zinc-600 tracking-wider">
              AR & VR Solutions for Defense & Enterprise
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {["Home", "ARTAK", "Capabilities", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-testid={`footer-link-${link.toLowerCase()}`}
                className="font-mono text-xs text-zinc-600 hover:text-white transition-colors tracking-wider uppercase"
                onClick={(e) => {
                  e.preventDefault();
                  const target = link === "Home" ? "hero" : link.toLowerCase();
                  const el = document.querySelector(`#${target}`);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-[10px] text-zinc-700 tracking-wider">
            &copy; {new Date().getFullYear()} EolianVR, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
