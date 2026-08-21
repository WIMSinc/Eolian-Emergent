"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Youtube, Linkedin, Instagram, Facebook } from "lucide-react";

const socials = [
  { icon: Youtube, href: "https://www.youtube.com/c/EolianVR", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/eolianvr", label: "LinkedIn" },
  { icon: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: "https://x.com/EolianVR", label: "X" },
  { icon: Instagram, href: "https://www.instagram.com/eolian.vr/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/eolianvr", label: "Facebook" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleClick = (e, target) => {
    if (target === "contact") {
      if (pathname === "/") {
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
              <img src="/eolian-logo-white.webp" alt="Eolian" width="124" height="160" className="h-10 w-auto opacity-80" />
            </div>
            <p className="font-mono text-sm text-zinc-300 tracking-wider">
              AR & VR Solutions for Defense & Enterprise
            </p>
            <div className="flex gap-3 mt-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-testid={`social-${s.label.toLowerCase()}`} className="w-8 h-8 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-[#FF0B1B] hover:border-[#FF0B1B] transition-colors" aria-label={s.label}>
                  <s.icon size={14} />
                </a>
              ))}
            </div>
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
                href={link.to}
                data-testid={`footer-link-${link.label.toLowerCase()}`}
                onClick={(e) => handleClick(e, link.label.toLowerCase())}
                className="font-mono text-sm text-white hover:text-[#FF0B1B] transition-colors tracking-wider uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright + Legal */}
          <div className="text-right">
            <div className="font-mono text-sm text-zinc-300 tracking-wider mb-2">
              &copy; {new Date().getFullYear()} EolianVR, Inc. All rights reserved.
            </div>
            <div className="flex gap-4 justify-end">
              <Link href="/terms" data-testid="footer-link-terms" className="font-mono text-xs text-zinc-300 hover:text-white transition-colors tracking-wider uppercase">
                Terms & Conditions
              </Link>
              <Link href="/privacy" data-testid="footer-link-privacy" className="font-mono text-xs text-zinc-300 hover:text-white transition-colors tracking-wider uppercase">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
