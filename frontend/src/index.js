import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import "@/index.css";
import App from "@/App";
import LazyRecaptchaProvider from "@/components/LazyRecaptchaProvider";

const initSentry = () =>
  import("@sentry/react").then((Sentry) => {
    Sentry.init({
      dsn: "https://47f383bbce50edad6a194e8612c3d5e0@o4511477096316928.ingest.us.sentry.io/4511477103656960",
      tracesSampleRate: 0.2,
      environment: process.env.NODE_ENV,
    });
  });
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(initSentry, { timeout: 4000 });
  } else {
    setTimeout(initSentry, 3000);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LazyRecaptchaProvider>
      <HelmetProvider>
        <App />
        <Analytics />
      </HelmetProvider>
    </LazyRecaptchaProvider>
  </React.StrictMode>,
);
