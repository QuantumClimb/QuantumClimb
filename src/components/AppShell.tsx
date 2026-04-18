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
  VideoGallerySection,
  WebsiteLinksSection,
} from "../sections/PortfolioSections";
import {
  AdminDashboardSection,
  type EditablePortfolioItem,
} from "../sections/AdminSections";
import type { PortfolioItem } from "../lib/supabase";

type AppShellProps = Readonly<{
  currentPage: "home" | "portfolio" | "admin";
  isScrolled: boolean;
  isContactModalOpen: boolean;
  isAdmin: boolean;
  isSupabaseConfigured: boolean;
  isPortfolioLoading: boolean;
  portfolioItems: PortfolioItem[];
  userEmail?: string;
  onOpenContactModal: () => void;
  onCloseContactModal: () => void;
  onNavigateHome: () => void;
  onNavigatePortfolio: () => void;
  onNavigateAdmin: () => void;
  onSignIn: (email: string, password: string) => Promise<string>;
  onSignOut: () => Promise<void>;
  onClaimAdmin: () => Promise<string>;
  onSaveItem: (item: EditablePortfolioItem) => Promise<string>;
  onDeleteItem: (id: string) => Promise<string>;
  onTogglePublished: (item: PortfolioItem) => Promise<string>;
  onUploadFile: (
    file: File,
    contentType: PortfolioItem["content_type"],
    variant: "media" | "thumbnail",
    onProgress?: (progress: number) => void,
  ) => Promise<string>;
}>;

export function AppShell({
  currentPage,
  isScrolled,
  isContactModalOpen,
  isAdmin,
  isSupabaseConfigured,
  isPortfolioLoading,
  portfolioItems,
  userEmail,
  onOpenContactModal,
  onCloseContactModal,
  onNavigateHome,
  onNavigatePortfolio,
  onNavigateAdmin,
  onSignIn,
  onSignOut,
  onClaimAdmin,
  onSaveItem,
  onDeleteItem,
  onTogglePublished,
  onUploadFile,
}: AppShellProps) {
  const isPortfolioPage = currentPage === "portfolio";
  const isAdminPage = currentPage === "admin";

  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-purple-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? "bg-black/80 backdrop-blur-md py-5 border-white/10" : "bg-transparent py-7 border-transparent"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between gap-4">
          <button onClick={onNavigateHome} className="text-2xl font-bold tracking-tighter text-white">
            QUANTUM CLIMB
          </button>

          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <button onClick={onNavigateHome} className="hover:text-white">Home</button>
            <button onClick={onNavigatePortfolio} className="hover:text-white">Portfolio</button>
            <button onClick={onNavigateAdmin} className="hover:text-white">Admin</button>
            {!isAdminPage ? <button onClick={onOpenContactModal} className="hover:text-white">Contact</button> : null}
          </div>

          <div className="flex items-center gap-3">
            {!isPortfolioPage ? (
              <button
                onClick={onNavigatePortfolio}
                className="border border-white/20 px-5 py-2.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:bg-white/10"
              >
                View Portfolio
              </button>
            ) : (
              <button
                onClick={onNavigateHome}
                className="border border-white/20 px-5 py-2.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:bg-white/10"
              >
                Home
              </button>
            )}
            <button
              onClick={isAdminPage ? onNavigateHome : onNavigateAdmin}
              className="px-5 py-2.5 bg-white text-black text-sm font-medium tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              {isAdminPage ? "Exit Admin" : "Admin"}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {isAdminPage ? (
          <AdminDashboardSection
            isConfigured={isSupabaseConfigured}
            isLoading={isPortfolioLoading}
            isAdmin={isAdmin}
            userEmail={userEmail}
            items={portfolioItems}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            onClaimAdmin={onClaimAdmin}
            onSaveItem={onSaveItem}
            onDeleteItem={onDeleteItem}
            onTogglePublished={onTogglePublished}
            onUploadFile={onUploadFile}
          />
        ) : isPortfolioPage ? (
          <>
            <VideoGallerySection items={portfolioItems} isLoading={isPortfolioLoading} />
            <ImageGallerySection items={portfolioItems} isLoading={isPortfolioLoading} />
            <MusicPlayerSection items={portfolioItems} isLoading={isPortfolioLoading} />
            <WebsiteLinksSection items={portfolioItems} isLoading={isPortfolioLoading} />
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

      {isPortfolioPage ? <PortfolioFooter /> : isAdminPage ? null : <Footer />}

      <ContactModal isOpen={isContactModalOpen} onClose={onCloseContactModal} />
    </div>
  );
}