import { CTASection, Hero } from "../sections/HeroSections";
import { BenefitsGrid, FeaturesGrid, HowItWorks, TechnicalEdge } from "../sections/PlatformSections";
import { IndustryUseCases } from "../sections/MarketingSections";
import { FinalCTA } from "../sections/ClosureSections";
import type { SiteVideo } from "../lib/supabase";

type AIDubbingPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigatePortfolio: () => void;
  siteVideos: SiteVideo[];
}>;

export function AIDubbingPage({ onOpenContactModal, onNavigatePortfolio, siteVideos }: AIDubbingPageProps) {
  return (
    <>
      <Hero onContactClick={onOpenContactModal} onPortfolioClick={onNavigatePortfolio} siteVideos={siteVideos} />
      <BenefitsGrid />
      <FeaturesGrid />
      <TechnicalEdge />
      <CTASection
        title="Unlock your global reach"
        subtitle="Our enterprise-grade platform is designed for high-throughput media pipelines and studio-quality output."
        onContactClick={onOpenContactModal}
      />
      <HowItWorks />
      <IndustryUseCases />
      <FinalCTA onContactClick={onOpenContactModal} />
    </>
  );
}
