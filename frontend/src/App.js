import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ArtakUseCases from "@/pages/ArtakUseCases";
import ArtakLanding from "@/pages/ArtakLanding";
import MapMaker from "@/pages/MapMaker";
import Lab from "@/pages/Lab";
import Support from "@/pages/Support";

import AboutPastPerformance from "@/pages/AboutPastPerformance";
import AboutAwards from "@/pages/AboutAwards";
import AboutIP from "@/pages/AboutIP";
import ArtakSubPage from "@/pages/ArtakSubPage";
import Team from "@/pages/Team";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

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

function App() {
  return (
    <div className="noise-overlay min-h-screen bg-[#050505]">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
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
          <Route path="/team" element={<Team />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
