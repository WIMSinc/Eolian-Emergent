import SEO, { organizationSchema, websiteSchema } from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import ArtakFeaturesSection from "@/components/ArtakFeaturesSection";
import FeaturesSection from "@/components/FeaturesSection";
import ArtakFeaturesSection from "@/components/ArtakFeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import UseCasesSection from "@/components/UseCasesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import VideoSection from "@/components/VideoSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <SEO jsonLd={[organizationSchema, websiteSchema]} />
      <HeroSection />
      <ProductSection />
      <ArtakFeaturesSection />
      <FeaturesSection />
      <PlatformSection />
      <UseCasesSection />
      <CaseStudiesSection />
      <VideoSection />
      <ContactSection />
    </>
  );
}
