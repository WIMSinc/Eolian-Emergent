import Link from "next/link";

/**
 * 404 page.
 *
 * Exists for two reasons beyond appearance.
 *
 * Without it, Next renders its own unstyled default *inside* this site's nav
 * and footer — a white panel with system fonts in the middle of a dark page.
 *
 * More importantly, the default inherited the root layout's metadata, which
 * includes `alternates.canonical`. Every missing URL therefore announced
 * `<link rel="canonical" href="https://www.eolianvr.com">`, telling Google that
 * /contact, /old-page and every mistyped path were all the homepage under
 * another name. `noindex` covered most of the damage, but declaring a canonical
 * on a page that does not exist is a contradictory signal to send while Search
 * Console is already reporting duplicate-canonical problems.
 *
 * Setting `alternates: { canonical: null }` clears the inherited value rather
 * than pointing it somewhere else — a 404 is not a duplicate of anything.
 */
export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="pt-32 pb-24 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#FF0B1B]" />
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
            Error // 404
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
          Page not found
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl mb-10">
          This page does not exist, or it moved during the site rebuild. The
          links below cover everything the old URLs pointed at.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 max-w-4xl">
          {[
            { href: "/", label: "Home" },
            { href: "/artak", label: "ARTAK" },
            { href: "/products", label: "Products" },
            { href: "/blog", label: "Insights" },
            { href: "/acquire", label: "Acquire" },
            { href: "/services", label: "Services" },
            { href: "/support", label: "Support" },
            { href: "/#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="bg-[#0A0A0A] hover:bg-[#0D0D0D] p-5 font-mono text-xs tracking-[0.15em] text-zinc-400 hover:text-[#FF0B1B] uppercase transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
