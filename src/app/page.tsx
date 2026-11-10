import HeroSlider from "@/components/HeroSlider";
import TrustBar from "@/components/TrustBar";
import ProductsSection from "@/components/ProductsSection";
import SplitBanners from "@/components/SplitBanners";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <ProductsSection />
      <SplitBanners />
      <FaqSection />
      <CtaSection />
    </>
  );
}
