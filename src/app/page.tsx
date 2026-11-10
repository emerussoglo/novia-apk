import HeroSlider from "@/components/HeroSlider";
import TrustBar from "@/components/TrustBar";
import ProductsSection from "@/components/ProductsSection";
import SplitBanners from "@/components/SplitBanners";
import CommunitySubscriptions from "@/components/CommunitySubscriptions";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <ProductsSection />
      <SplitBanners />
      <CommunitySubscriptions />
      <FaqSection />
      <CtaSection />
    </>
  );
}
