import Script from "next/script";
import { Inter, IBM_Plex_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LazyRecaptchaProvider from "@/components/LazyRecaptchaProvider";
import RouteAnalytics from "@/components/RouteAnalytics";
import { SITE_URL, DEFAULT_DESC, organizationSchema, websiteSchema } from "@/lib/seo";

// Replaces the hand-rolled tags in the CRA public/index.html. Next renders
// these into every route's <head>, server-side, so crawlers that do not run
// JavaScript still receive them.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EolianVR | AR & VR Solutions for Defense & Enterprise",
    template: "%s | EolianVR",
  },
  description: DEFAULT_DESC,
  applicationName: "EolianVR",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "EolianVR",
    url: SITE_URL,
    title: "EolianVR | AR & VR Solutions for Defense & Enterprise",
    description: DEFAULT_DESC,
    images: [`${SITE_URL}/artak-overview.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "EolianVR | AR & VR Solutions for Defense & Enterprise",
    description: DEFAULT_DESC,
    images: [`${SITE_URL}/artak-overview.jpg`],
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// Self-hosted via next/font: the CRA build pulled a render-blocking stylesheet
// from fonts.googleapis.com on every page load. These are emitted as CSS
// variables and consumed by the font-family rules in globals.css.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });
const unbounded = Unbounded({ subsets: ["latin"], display: "swap", variable: "--font-unbounded" });

const fontVars = `${inter.variable} ${plex.variable} ${jetbrains.variable} ${unbounded.variable}`;

const GA4_ID = "G-MSVBTTWTEH";
const HUBSPOT_PORTAL = "19544401";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVars}>
      <head>
        {/* Site-wide structured data, server-rendered so AI and search crawlers
            that do not execute JavaScript still see it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="noise-overlay min-h-screen bg-[#050505]">
        <LazyRecaptchaProvider>
          <Navigation />
          {children}
          <Footer />
        </LazyRecaptchaProvider>
        <RouteAnalytics />
        <Analytics />

        {/* The gtag.js bundle is ~159 KiB and cost ~87 ms of main-thread time
            when loaded afterInteractive, landing squarely inside the TBT
            window. It is deferred to lazyOnload instead; the tiny inline
            config below still runs early and queues onto dataLayer, which
            gtag.js replays once it arrives — so no pageview is lost. */}
        <Script
          id="ga4-src"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
        </Script>

        {/* Marketing/product analytics are not needed for first paint. */}
        <Script
          id="hs-script-loader"
          strategy="lazyOnload"
          src={`//js.hs-scripts.com/${HUBSPOT_PORTAL}.js`}
        />
        <Script id="posthog-init" strategy="lazyOnload">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture identify setPersonProperties register register_once unregister opt_in_capturing opt_out_capturing reset get_distinct_id onFeatureFlags getFeatureFlag isFeatureEnabled reloadFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init("phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs",{api_host:"https://us.i.posthog.com",person_profiles:"identified_only",disable_session_recording:!0,disable_surveys:!0,autocapture:!1,capture_dead_clicks:!1,capture_pageleave:!1,capture_performance:!1});`}
        </Script>
      </body>
    </html>
  );
}
