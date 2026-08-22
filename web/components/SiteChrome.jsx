"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LazyRecaptchaProvider from "@/components/LazyRecaptchaProvider";

/**
 * Wraps the marketing chrome around page content, and steps out of the way for
 * /studio.
 *
 * The Studio renders its own full-screen application shell; the site nav and
 * footer would sit on top of it and break the layout. The reCAPTCHA provider is
 * skipped there too — nothing inside the Studio submits a site form, so there
 * is no reason to load it.
 */
export default function SiteChrome({ children }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return children;
  }

  return (
    <LazyRecaptchaProvider>
      <Navigation />
      {children}
      <Footer />
    </LazyRecaptchaProvider>
  );
}
