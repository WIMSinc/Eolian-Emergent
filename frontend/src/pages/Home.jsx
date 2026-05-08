import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import ContactSection from "@/components/ContactSection";
import SEO, { websiteSchema } from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO path="/" jsonLd={websiteSchema} />
      <HeroSection />
      <ProductSection />
      <FeaturesSection />
      <PlatformSection />
      <ContactSection />
    </>
  );
}
