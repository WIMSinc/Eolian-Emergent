import "@/App.css";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="noise-overlay min-h-screen bg-[#050505]">
      <Navigation />
      <HeroSection />
      <ProductSection />
      <FeaturesSection />
      <PlatformSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
