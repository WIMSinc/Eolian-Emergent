import HeroSection from "@/components/HeroSection";
import OfferBanner from "@/components/OfferBanner";
import ProductSection from "@/components/ProductSection";
import ArtakFeaturesSection from "@/components/ArtakFeaturesSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import UseCasesSection from "@/components/UseCasesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import VideoSection from "@/components/VideoSection";
import ContactSection from "@/components/ContactSection";

// Organization + WebSite JSON-LD are emitted once in the root layout.

// OfferBanner expires itself on a date, and a fully static page would evaluate
// that date once at build time and freeze the answer. Regenerating hourly means
// the promotion disappears within an hour of ending rather than whenever
// somebody remembers to delete it. Costs nothing — Vercel serves the cached
// render either way.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OfferBanner />
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
