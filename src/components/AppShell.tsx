import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { WhatsAppWidget } from "./WhatsAppWidget";
import { Footer } from "../sections/ClosureSections";
import { HomePage } from "../pages/HomePage";
import { AIDubbingPage } from "../pages/AIDubbingPage";
import { AIVideoPage } from "../pages/AIVideoPage";
import { WebDevPage } from "../pages/WebDevPage";
import { ContactPage } from "../pages/ContactPage";
import {
  PrivacyPolicy,
  TermsOfService,
  CookiePolicy,
} from "../sections/LegalSections";
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
  currentPage: "home" | "ai-dubbing" | "ai-video" | "web-dev" | "portfolio" | "admin" | "privacy" | "terms" | "cookies" | "contact";
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
  onNavigateAIDubbing: () => void;
  onNavigateAIVideo: () => void;
  onNavigateWebDev: () => void;
  onNavigatePortfolio: () => void;
  onNavigateAdmin: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onNavigateCookies: () => void;
  onNavigateContact: () => void;
  onSignIn: (email: string, password: string) => Promise<string>;
  onSignOut: () => Promise<void>;
  onClaimAdmin: () => Promise<string>;
  onSaveItem: (item: EditablePortfolioItem) => Promise<string>;
  onDeleteItem: (id: string) => Promise<string>;
  onTogglePublished: (item: PortfolioItem) => Promise<string>;
  onUploadFile: (
    file: File,
    contentType: PortfolioItem["content_type"],
    variant: "media" | "thumbnail" | "logo",
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
  onSubmitInquiry: (data: any) => Promise<void>;
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
  onNavigateAIDubbing,
  onNavigateAIVideo,
  onNavigateWebDev,
  onNavigatePortfolio,
  onNavigateAdmin,
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateCookies,
  onNavigateContact,
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
  onSubmitInquiry,
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isPortfolioPage = currentPage === "portfolio";
  const isAdminPage = currentPage === "admin";
  const isAIDubbingPage = currentPage === "ai-dubbing";
  const isAIVideoPage = currentPage === "ai-video";
  const isWebDevPage = currentPage === "web-dev";
  const isContactPage = currentPage === "contact";
  const isLegalPage = ["privacy", "terms", "cookies"].includes(currentPage);
  const isSpecialPage = isAIDubbingPage || isAIVideoPage || isWebDevPage;

  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-purple-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? "bg-black/80 backdrop-blur-md py-5 border-white/10" : "bg-transparent py-7 border-transparent"}`}>
        <div className="container mx-auto px-6">
          {isSpecialPage ? (
            <div className="grid grid-cols-3 items-center w-full">
              {/* Left Column: Navigation links on desktop, empty on mobile */}
              <div className="flex items-center justify-start">
                <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
                  <button onClick={onNavigateHome} className={`hover:text-white ${currentPage === "home" ? "text-white font-medium" : ""}`}>Agency</button>
                  <button onClick={onNavigateAIDubbing} className={`hover:text-white ${isAIDubbingPage ? "text-white font-medium" : ""}`}>AI Dubbing</button>
                  <button onClick={onNavigateAIVideo} className={`hover:text-white ${isAIVideoPage ? "text-white font-medium" : ""}`}>AI Video</button>
                  <button onClick={onNavigateWebDev} className={`hover:text-white ${isWebDevPage ? "text-white font-medium" : ""}`}>Web Dev</button>
                </div>
              </div>

              {/* Center Column: Logo */}
              <div className="flex items-center justify-center">
                <button onClick={onNavigateHome} className="flex items-center cursor-pointer h-16 sm:h-22">
                  <img 
                    src="/images/qclogo.png" 
                    alt="Quantum Climb Logo" 
                    className="h-14 sm:h-20 w-auto object-contain brightness-110" 
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>

              {/* Right Column: CTA on desktop, Hamburger on mobile */}
              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={onNavigateContact} 
                  className="hidden md:block px-4 py-2 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-600 hover:border-purple-600 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  Start a Project
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden p-2 -mr-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Open Menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 w-full">
              {currentPage !== "home" ? (
                <button onClick={onNavigateHome} className="flex items-center cursor-pointer h-16 sm:h-22">
                  <img 
                    src="/images/qclogo.png" 
                    alt="Quantum Climb Logo" 
                    className="h-14 sm:h-20 w-auto object-contain brightness-110" 
                    referrerPolicy="no-referrer"
                  />
                </button>
              ) : (
                <div className="h-16 sm:h-22" />
              )}

              <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
                <button onClick={onNavigateHome} className={`hover:text-white ${currentPage === "home" ? "text-white font-medium" : ""}`}>Agency</button>
                <button onClick={onNavigateAIDubbing} className={`hover:text-white ${isAIDubbingPage ? "text-white font-medium" : ""}`}>AI Dubbing</button>
                <button onClick={onNavigateAIVideo} className={`hover:text-white ${isAIVideoPage ? "text-white font-medium" : ""}`}>AI Video</button>
                <button onClick={onNavigateWebDev} className={`hover:text-white ${isWebDevPage ? "text-white font-medium" : ""}`}>Web Dev</button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={onNavigateContact} 
                  className="hidden md:block px-4 py-2 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-600 hover:border-purple-600 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  Start a Project
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden p-2 -mr-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Open Menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
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
        ) : isContactPage ? (
          <ContactPage
            onOpenContactModal={onNavigateContact}
            onNavigateHome={onNavigateHome}
            onNavigatePortfolio={onNavigatePortfolio}
            onSubmitInquiry={onSubmitInquiry}
          />
        ) : isAIDubbingPage ? (
          <AIDubbingPage 
            onOpenContactModal={onNavigateContact} 
            onNavigatePortfolio={onNavigatePortfolio} 
            siteVideos={siteVideos} 
          />
        ) : isAIVideoPage ? (
          <AIVideoPage onOpenContactModal={onNavigateContact} siteVideos={siteVideos} />
        ) : isWebDevPage ? (
          <WebDevPage 
            onOpenContactModal={onNavigateContact} 
            items={portfolioItems}
            isLoading={isPortfolioLoading}
          />
        ) : (
          <HomePage 
            onOpenContactModal={onNavigateContact} 
            onNavigateAIDubbing={onNavigateAIDubbing} 
            onNavigateAIVideo={onNavigateAIVideo}
            onNavigateWebDev={onNavigateWebDev}
          />
        )}
      </main>

      {isPortfolioPage ? <PortfolioFooter /> : isAdminPage || isLegalPage ? null : <Footer onAdminClick={onNavigateAdmin} onPrivacyClick={onNavigatePrivacy} onTermsClick={onNavigateTerms} onCookiesClick={onNavigateCookies} />}

      <ContactModal isOpen={isContactModalOpen} onClose={onCloseContactModal} />
      {!isAdminPage && <WhatsAppWidget />}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/98 z-[999] backdrop-blur-lg flex flex-col justify-between p-6 pt-24"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 text-zinc-400 hover:text-white rounded-full bg-white/5 border border-white/5 shadow-lg cursor-pointer animate-fade-in"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col gap-6 text-2xl font-bold tracking-tight text-white uppercase mt-8">
              <button
                onClick={() => {
                  onNavigateHome();
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-white/5 hover:text-purple-400 transition-colors ${currentPage === "home" ? "text-purple-400 border-purple-500/20" : ""}`}
              >
                Agency
              </button>
              <button
                onClick={() => {
                  onNavigateAIDubbing();
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-white/5 hover:text-purple-400 transition-colors ${isAIDubbingPage ? "text-purple-400 border-purple-500/20" : ""}`}
              >
                AI Dubbing
              </button>
              <button
                onClick={() => {
                  onNavigateAIVideo();
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-white/5 hover:text-purple-400 transition-colors ${isAIVideoPage ? "text-purple-400 border-purple-500/20" : ""}`}
              >
                AI Video
              </button>
              <button
                onClick={() => {
                  onNavigateWebDev();
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-white/5 hover:text-purple-400 transition-colors ${isWebDevPage ? "text-purple-400 border-purple-500/20" : ""}`}
              >
                Web Dev
              </button>
              
              <button
                onClick={() => {
                  onNavigateContact();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-6 w-full py-4 text-center border border-purple-500/30 bg-purple-500/10 hover:bg-purple-600 hover:border-purple-600 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer animate-fade-in"
              >
                Start a Project
              </button>
            </div>

            <div className="border-t border-white/5 pt-6 text-center text-xs font-mono text-zinc-500">
              <p className="uppercase tracking-widest mb-1">QUANTUM CLIMB</p>
              <p>AI-Powered Digital Products, Media & Experiences</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}