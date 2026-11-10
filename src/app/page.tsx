import HeroSlider from "@/components/HeroSlider";
import TrustBar from "@/components/TrustBar";
import ProductsSection from "@/components/ProductsSection";
import SplitBanners from "@/components/SplitBanners";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import TestimonialsScreenshots from "@/components/TestimonialsScreenshots";
import TestimonialsCards from "@/components/TestimonialsCards";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <ProductsSection />
      <SplitBanners />
      <FaqSection />
      <CtaSection />
      {/* <TestimonialsScreenshots />  */}
      <TestimonialsCards /> 
    </>
  );
}
