import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ArtakUseCases from "@/pages/ArtakUseCases";
import MapMaker from "@/pages/MapMaker";
import Lab from "@/pages/Lab";
import Support from "@/pages/Support";

import ArtakSubPage from "@/pages/ArtakSubPage";

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
          <Route path="/artak" element={<ArtakUseCases />} />
          <Route path="/artak/:slug" element={<ArtakSubPage />} />
          <Route path="/mapmaker" element={<MapMaker />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
