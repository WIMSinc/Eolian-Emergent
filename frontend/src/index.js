import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@/index.css";
import App from "@/App";

Sentry.init({
  dsn: "https://47f383bbce50edad6a194e8612c3d5e0@o4511477096316928.ingest.us.sentry.io/4511477103656960",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.2,
  environment: process.env.NODE_ENV,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6LcdWQYtAAAAAPjj1T6Peg9r65VoByp4wjyVP0fj">
      <HelmetProvider>
        <App />
        <Analytics />
        <SpeedInsights />
      </HelmetProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
);
