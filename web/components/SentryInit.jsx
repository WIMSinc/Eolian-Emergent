"use client";

import { useEffect } from "react";

/**
 * Browser error reporting, ported from the CRA entry point (src/index.js).
 *
 * Same DSN, sample rate and lazy-on-idle initialisation as before, so error
 * volume and grouping stay comparable across the migration rather than the
 * project appearing to go quiet.
 *
 * `@sentry/nextjs` would be the better long-term fit — it also captures errors
 * thrown inside the API routes, which the CRA build never reported — but it
 * needs its own build wiring. This keeps parity for the cutover; upgrading is
 * a separate, deliberate change.
 */
const DSN =
  "https://47f383bbce50edad6a194e8612c3d5e0@o4511477096316928.ingest.us.sentry.io/4511477103656960";

export default function SentryInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      import("@sentry/react")
        .then((Sentry) => {
          Sentry.init({
            dsn: DSN,
            tracesSampleRate: 0.2,
            environment: process.env.NODE_ENV,
          });
        })
        .catch(() => {
          /* monitoring must never break the page */
        });
    };

    const id =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(init, { timeout: 4000 })
        : setTimeout(init, 3000);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window && typeof id === "number") {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

  return null;
}
