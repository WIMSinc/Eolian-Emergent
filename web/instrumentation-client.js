import * as Sentry from "@sentry/nextjs";

// Browser-side reporting. Replaces the hand-rolled lazy @sentry/react init the
// CRA build used; Next loads this automatically on the client.
Sentry.init({
  dsn: "https://47f383bbce50edad6a194e8612c3d5e0@o4511477096316928.ingest.us.sentry.io/4511477103656960",
  tracesSampleRate: 0.2,
  // Session replay is deliberately off — it is heavy, and this is a marketing
  // site where we have spent real effort on the performance budget.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});

// Required for Next to report client-side navigation spans.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
