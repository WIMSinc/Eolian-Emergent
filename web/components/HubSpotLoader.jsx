"use client";

import { useEffect } from "react";

/**
 * Loads the HubSpot tracking script on first interaction, or after a delay,
 * whichever happens first.
 *
 * `strategy="lazyOnload"` was already in place and was not enough. hs-scripts
 * is only a loader: once it runs it chain-pulls hs-analytics, collectedforms
 * and the cookie banner — about 100 KiB that cost 1,438 ms of CPU and 1,130 ms
 * of long tasks on a throttled phone, which was essentially the whole 1,070 ms
 * of Total Blocking Time in the September mobile PageSpeed run. Idle-time on a
 * Moto G Power still lands inside the measurement window, and more to the
 * point, inside the window where a real visitor is trying to scroll.
 *
 * The delay is a floor, not a replacement for the interaction trigger. Any
 * scroll, tap, key or pointer press loads HubSpot immediately, which on mobile
 * is nearly everyone; the timer exists for the visitor who reads without
 * touching anything — precisely the blog traffic the AEO work is aimed at.
 *
 * What this costs: HubSpot's time-on-page starts when the script loads, so
 * sessions read a few seconds shorter, and a visitor who leaves within the
 * delay without interacting is not recorded. GA4 still counts those, and its
 * inline config runs early and queues onto dataLayer regardless.
 *
 * Route changes are unaffected. RouteAnalytics pushes onto `window._hsq`,
 * which is a queue HubSpot replays on arrival, so navigations that happen
 * before the script loads are still reported.
 */

const SCRIPT_ID = "hs-script-loader";
const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"];

export default function HubSpotLoader({ portalId, delayMs = 5000 }) {
  useEffect(() => {
    if (!portalId) return;
    // Guard against a second mount (React strict mode double-invokes effects)
    // appending the script twice.
    if (document.getElementById(SCRIPT_ID)) return;

    let timer;

    const stopWaiting = () => {
      clearTimeout(timer);
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, load);
      }
    };

    function load() {
      stopWaiting();
      if (document.getElementById(SCRIPT_ID)) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://js.hs-scripts.com/${portalId}.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, load, { once: true, passive: true });
    }
    timer = setTimeout(load, delayMs);

    return stopWaiting;
  }, [portalId, delayMs]);

  return null;
}
