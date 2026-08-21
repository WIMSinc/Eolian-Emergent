import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://47f383bbce50edad6a194e8612c3d5e0@o4511477096316928.ingest.us.sentry.io/4511477103656960",
  tracesSampleRate: 0.2,
});
