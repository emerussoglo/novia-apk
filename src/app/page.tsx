import Hero from "@/components/Hero";
import FeaturesBar from "@/components/FeaturesBar";
import ProductsSection from "@/components/ProductsSection";
import BonusBanner from "@/components/BonusBanner";
import WorkflowSection from "@/components/WorkflowSection";
import ComparisonSection from "@/components/ComparisonSection";
import HowAndWhySection from "@/components/HowAndWhySection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBar />
      <ProductsSection />
      <BonusBanner /> 
      <WorkflowSection />
      <ComparisonSection />
      <HowAndWhySection />
      <FaqSection />
      <CtaSection />
    </>
  );
}