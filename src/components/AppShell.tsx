import { ContactModal } from "./ContactModal";
import {
  CTASection,
  Hero,
} from "../sections/HeroSections";
import {
  PrivacyPolicy,
  TermsOfService,
  CookiePolicy,
} from "../sections/LegalSections";
import {
  BenefitsGrid,
  FeaturesGrid,
  HowItWorks,
  TechnicalEdge,
} from "../sections/PlatformSections";
import {
  IndustryUseCases,
} from "../sections/MarketingSections";
import {
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
  type EditableSiteVideo,
} from "../sections/AdminSections";
import type { PortfolioItem, SiteVideo } from "../lib/supabase";

type AppShellProps = Readonly<{
  currentPage: "home" | "portfolio" | "admin" | "privacy" | "terms" | "cookies";
  isScrolled: boolean;
  isContactModalOpen: boolean;
  isAdmin: boolean;
  isSupabaseConfigured: boolean;
  isPortfolioLoading: boolean;
  portfolioItems: PortfolioItem[];
  siteVideos: SiteVideo[];
  userEmail?: string;
  onOpenContactModal: () => void;
  onCloseContactModal: () => void;
  onNavigateHome: () => void;
  onNavigatePortfolio: () => void;
  onNavigateAdmin: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onNavigateCookies: () => void;
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
  onSaveSiteVideo: (video: EditableSiteVideo) => Promise<string>;
  onDeleteSiteVideo: (id: string) => Promise<string>;
  onUploadSiteVideo: (
    file: File,
    section: string,
    variant: "video" | "thumbnail",
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
  siteVideos,
  userEmail,
  onOpenContactModal,
  onCloseContactModal,
  onNavigateHome,
  onNavigatePortfolio,
  onNavigateAdmin,
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateCookies,
  onSignIn,
  onSignOut,
  onClaimAdmin,
  onSaveItem,
  onDeleteItem,
  onTogglePublished,
  onUploadFile,
  onSaveSiteVideo,
  onDeleteSiteVideo,
  onUploadSiteVideo,
}: AppShellProps) {
  const isPortfolioPage = currentPage === "portfolio";
  const isAdminPage = currentPage === "admin";
  const isLegalPage = ["privacy", "terms", "cookies"].includes(currentPage);

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
          </div>

          <div className="flex items-center gap-3">
            {/* no top nav admin/contact buttons */}
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
            siteVideos={siteVideos}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            onClaimAdmin={onClaimAdmin}
            onSaveItem={onSaveItem}
            onDeleteItem={onDeleteItem}
            onTogglePublished={onTogglePublished}
            onUploadFile={onUploadFile}
            onSaveSiteVideo={onSaveSiteVideo}
            onDeleteSiteVideo={onDeleteSiteVideo}
            onUploadSiteVideo={onUploadSiteVideo}
          />
        ) : isPortfolioPage ? (
          <>
            <VideoGallerySection items={portfolioItems} isLoading={isPortfolioLoading} />
            <ImageGallerySection items={portfolioItems} isLoading={isPortfolioLoading} />
            <MusicPlayerSection items={portfolioItems} isLoading={isPortfolioLoading} />
            <WebsiteLinksSection items={portfolioItems} isLoading={isPortfolioLoading} />
          </>
        ) : currentPage === "privacy" ? (
          <PrivacyPolicy onClose={onNavigateHome} />
        ) : currentPage === "terms" ? (
          <TermsOfService onClose={onNavigateHome} />
        ) : currentPage === "cookies" ? (
          <CookiePolicy onClose={onNavigateHome} />
        ) : (
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
        )}
      </main>

      {isPortfolioPage ? <PortfolioFooter /> : isAdminPage || isLegalPage ? null : <Footer onAdminClick={onNavigateAdmin} onPrivacyClick={onNavigatePrivacy} onTermsClick={onNavigateTerms} onCookiesClick={onNavigateCookies} />}

      <ContactModal isOpen={isContactModalOpen} onClose={onCloseContactModal} />
    </div>
  );
}