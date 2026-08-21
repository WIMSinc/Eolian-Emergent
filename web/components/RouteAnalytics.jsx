"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Reports client-side route changes to GA4 and HubSpot.
 *
 * Both trackers record the entry pageview themselves, so the first render is
 * skipped to avoid double-counting — same contract as the CRA build.
 *
 * Deliberately reads window.location.search rather than useSearchParams():
 * useSearchParams() opts the whole subtree into client rendering unless it is
 * wrapped in Suspense, and this component only needs the value inside an
 * effect, where window is already available.
 */
export default function RouteAnalytics() {
  const pathname = usePathname();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    const path = pathname + (window.location.search || "");

    const _hsq = (window._hsq = window._hsq || []);
    _hsq.push(["setPath", path]);
    _hsq.push(["trackPageView"]);

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
      });
    }
  }, [pathname]);

  return null;
}
