import { ContactModal } from "./ContactModal";
import {
  CTASection,
  Hero,
} from "../sections/HeroSections";
import {
  AIFirstSection,
  CoreValueProp,
  InteractiveDemo,
} from "../sections/CapabilitySections";
import {
  BenefitsGrid,
  FeaturesGrid,
  HowItWorks,
  TechnicalEdge,
} from "../sections/PlatformSections";
import {
  IndustryUseCases,
  ImpactCaseStudies,
  BlogSection,
} from "../sections/MarketingSections";
import {
  InteractiveAIHuman,
  InteractiveFeatures,
  SecuritySection,
} from "../sections/InteractiveSections";
import {
  Faq,
  FinalCTA,
  Footer,
} from "../sections/ClosureSections";
import {
  ImageGallerySection,
  MusicPlayerSection,
  PortfolioFooter,
  PortfolioHero,
  VideoGallerySection,
  WebsiteLinksSection,
} from "../sections/PortfolioSections";

type AppShellProps = Readonly<{
  currentPage: "home" | "portfolio";
  isScrolled: boolean;
  isContactModalOpen: boolean;
  onOpenContactModal: () => void;
  onCloseContactModal: () => void;
  onNavigateHome: () => void;
  onNavigatePortfolio: () => void;
}>;

export function AppShell({
  currentPage,
  isScrolled,
  isContactModalOpen,
  onOpenContactModal,
  onCloseContactModal,
  onNavigateHome,
  onNavigatePortfolio,
}: AppShellProps) {
  const isPortfolioPage = currentPage === "portfolio";

  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-purple-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? "bg-black/80 backdrop-blur-md py-5 border-white/10" : "bg-transparent py-7 border-transparent"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={onNavigateHome} className="text-2xl font-bold tracking-tighter text-white">
            QUANTUM CLIMB
          </button>

          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            {isPortfolioPage ? (
              <>
                <a href="#video-gallery" className="hover:text-white">Video</a>
                <a href="#image-gallery" className="hover:text-white">Images</a>
                <a href="#music-player" className="hover:text-white">Music</a>
                <a href="#websites" className="hover:text-white">Websites</a>
              </>
            ) : (
              <>
                <button onClick={onNavigatePortfolio} className="hover:text-white">Portfolio</button>
                <button onClick={onOpenContactModal} className="hover:text-white">Contact</button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isPortfolioPage ? (
              <button
                onClick={onNavigateHome}
                className="border border-white/20 px-5 py-2.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:bg-white/10"
              >
                Home
              </button>
            ) : (
              <button
                onClick={onNavigatePortfolio}
                className="border border-white/20 px-5 py-2.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:bg-white/10"
              >
                View Portfolio
              </button>
            )}
            <button
              onClick={onOpenContactModal}
              className="px-5 py-2.5 bg-white text-black text-sm font-medium tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {isPortfolioPage ? (
          <>
            <PortfolioHero onContactClick={onOpenContactModal} />
            <VideoGallerySection />
            <ImageGallerySection />
            <MusicPlayerSection />
            <WebsiteLinksSection />
          </>
        ) : (
          <>
            <Hero onContactClick={onOpenContactModal} onPortfolioClick={onNavigatePortfolio} />
            <CTASection
              title="Ready to scale your global reach?"
              subtitle="Join the world's leading media companies and creators who are scaling their reach with Quantum Climb."
              onContactClick={onOpenContactModal}
            />
            <CoreValueProp />
            <InteractiveDemo />
            <BenefitsGrid />
            <FeaturesGrid />
            <TechnicalEdge />
            <CTASection
              title="Experience the peak of AI localization"
              subtitle="Our enterprise-grade platform is designed for high-throughput media pipelines and studio-quality output."
              onContactClick={onOpenContactModal}
            />
            <HowItWorks />
            <IndustryUseCases />
            <AIFirstSection />
            <ImpactCaseStudies />
            <SecuritySection />
            <CTASection
              title="Advanced AI Solutions"
              subtitle="Explore our specialized services: 3D Applications, AI Filmmaking, and AI Automation."
              buttonText="Explore Services"
              onContactClick={onOpenContactModal}
            />
            <BlogSection />
            <InteractiveAIHuman onContactClick={onOpenContactModal} />
            <InteractiveFeatures />
            <CTASection
              title="Ready to go global?"
              subtitle="Join the world's most innovative companies using Quantum Climb to break language barriers."
              onContactClick={onOpenContactModal}
            />
            <Faq />
            <FinalCTA onContactClick={onOpenContactModal} />
          </>
        )}
      </main>

      {isPortfolioPage ? <PortfolioFooter /> : <Footer />}

      <ContactModal isOpen={isContactModalOpen} onClose={onCloseContactModal} />
    </div>
  );
}