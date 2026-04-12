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

type AppShellProps = Readonly<{
  isScrolled: boolean;
  isContactModalOpen: boolean;
  onOpenContactModal: () => void;
  onCloseContactModal: () => void;
}>;

export function AppShell({
  isScrolled,
  isContactModalOpen,
  onOpenContactModal,
  onCloseContactModal,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-purple-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? "bg-black/80 backdrop-blur-md py-5 border-white/10" : "bg-transparent py-10 border-transparent"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-white">QUANTUM CLIMB</div>
          <div className="flex items-center gap-8">
            <button
              onClick={onOpenContactModal}
              className="px-8 py-3 bg-white text-black text-sm font-medium tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onContactClick={onOpenContactModal} />
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
      </main>

      <Footer />

      <ContactModal isOpen={isContactModalOpen} onClose={onCloseContactModal} />
    </div>
  );
}