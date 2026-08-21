import { useEffect, useRef, Suspense, lazy } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const ArtakUseCases = lazy(() => import("@/pages/ArtakUseCases"));
const ArtakLanding = lazy(() => import("@/pages/ArtakLanding"));
const MapMaker = lazy(() => import("@/pages/MapMaker"));
const Lab = lazy(() => import("@/pages/Lab"));
const Support = lazy(() => import("@/pages/Support"));

const AboutPastPerformance = lazy(() => import("@/pages/AboutPastPerformance"));
const AboutAwards = lazy(() => import("@/pages/AboutAwards"));
const AboutIP = lazy(() => import("@/pages/AboutIP"));
const ArtakSubPage = lazy(() => import("@/pages/ArtakSubPage"));
const Team = lazy(() => import("@/pages/Team"));
const Services = lazy(() => import("@/pages/Services"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const CheckoutResult = lazy(() => import("@/pages/CheckoutResult"));
const AcquireGuide = lazy(() => import("@/pages/AcquireGuide"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

// The HubSpot loader records the entry pageview on its own, but this is a SPA —
// every later navigation happens client-side and would otherwise go unreported.
// Push those route changes onto the _hsq queue; skip the first render so the
// entry pageview isn't counted twice.
function HubSpotPageViews() {
  const { pathname, search } = useLocation();
  const initialLoad = useRef(true);
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    const _hsq = (window._hsq = window._hsq || []);
    _hsq.push(["setPath", pathname + search]);
    _hsq.push(["trackPageView"]);
  }, [pathname, search]);
  return null;
}

function App() {
  return (
    <div className="noise-overlay min-h-screen bg-[#050505]">
      <BrowserRouter>
        <ScrollToTop />
        <HubSpotPageViews />
        <Navigation />
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/past-performance" element={<AboutPastPerformance />} />
            <Route path="/about/awards" element={<AboutAwards />} />
            <Route path="/about/intellectual-property" element={<AboutIP />} />
            <Route path="/artak" element={<ArtakLanding />} />
            <Route path="/artak/national-security" element={<ArtakUseCases />} />
            <Route path="/artak/:slug" element={<ArtakSubPage />} />
            <Route path="/mapmaker" element={<MapMaker />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/support" element={<Support />} />
            <Route path="/acquire" element={<AcquireGuide />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/checkout/success" element={<CheckoutResult />} />
            <Route path="/checkout/cancelled" element={<CheckoutResult />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
