import * as Sentry from "@sentry/nextjs";

// Browser-side reporting. Replaces the hand-rolled lazy @sentry/react init the
// CRA build used; Next loads this automatically on the client.
Sentry.init({
  dsn: "https://47f383bbce50edad6a194e8612c3d5e0@o4511477096316928.ingest.us.sentry.io/4511477103656960",
  // Browser performance tracing is deliberately absent. Omitting
  // tracesSampleRate entirely — rather than setting it to 0 — is what actually
  // turns tracing off: Sentry only enables the browser tracing integration when
  // a sample rate is configured, so a 0 would still instrument every page load
  // and route change and then discard the result. Errors are what this SDK is
  // here for, and mobile main-thread time is the budget it competes against;
  // Lighthouse already measures the performance side better than a 20% sample
  // of real sessions would.
  //
  // Session replay is off for the same reason — it is heavy, and this is a
  // marketing site where we have spent real effort on the performance budget.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});

// Required for Next to report client-side navigation spans.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
