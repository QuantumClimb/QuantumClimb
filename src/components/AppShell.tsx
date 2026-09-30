import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { WhatsAppWidget } from "./WhatsAppWidget";
import { Footer } from "../sections/ClosureSections";
import { HomePage } from "../pages/HomePage";
import { ServicesPage } from "../pages/ServicesPage";
import { AudioSoftwarePage } from "../pages/AudioSoftwarePage";
import { AIDubbingPage } from "../pages/AIDubbingPage";
import { AIVideoPage } from "../pages/AIVideoPage";
import { WebDevPage } from "../pages/WebDevPage";
import { AudioPluginsPage } from "../pages/AudioPluginsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { QFnBPage } from "../pages/QFnBPage";
import { QFnBDemoPage, type QFnBDemoSubmissionData } from "../pages/QFnBDemoPage";
import { QTransitionPage } from "../pages/QTransitionPage";
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
  currentPage: "home" | "services" | "ai-dubbing" | "ai-video" | "web-dev" | "audio-software" | "audio-plugins" | "products" | "q-fnb" | "q-fnb-demo" | "q-transition" | "portfolio" | "admin" | "privacy" | "terms" | "cookies" | "contact";
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
  onNavigateServices?: () => void;
  onNavigateAIDubbing: () => void;
  onNavigateAIVideo: () => void;
  onNavigateWebDev: () => void;
  onNavigateAudioSoftware?: () => void;
  onNavigateAudioPlugins?: () => void;
  onNavigateProducts?: () => void;
  onNavigateQFnB?: () => void;
  onNavigateQFnBDemo?: () => void;
  onNavigateQTransition?: () => void;
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
  onSubmitQFnBDemoRequest?: (data: QFnBDemoSubmissionData) => Promise<void>;
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
  onNavigateServices,
  onNavigateAIDubbing,
  onNavigateAIVideo,
  onNavigateWebDev,
  onNavigateAudioSoftware,
  onNavigateAudioPlugins,
  onNavigateProducts,
  onNavigateQFnB,
  onNavigateQFnBDemo,
  onNavigateQTransition,
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
  onSubmitQFnBDemoRequest,
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

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
  const isServicesPage = currentPage === "services";
  const isAudioSoftwarePage = currentPage === "audio-software";
  const isAIDubbingPage = currentPage === "ai-dubbing";
  const isAIVideoPage = currentPage === "ai-video";
  const isWebDevPage = currentPage === "web-dev";
  const isAudioPluginsPage = currentPage === "audio-plugins";
  const isProductsPage = currentPage === "products" || currentPage === "q-fnb" || currentPage === "q-fnb-demo" || currentPage === "q-transition";
  const isQFnBPage = currentPage === "q-fnb";
  const isQFnBDemoPage = currentPage === "q-fnb-demo";
  const isQTransitionPage = currentPage === "q-transition";
  const isContactPage = currentPage === "contact";
  const isLegalPage = ["privacy", "terms", "cookies"].includes(currentPage);
  const isAnyServiceActive = isServicesPage || isAIDubbingPage || isAIVideoPage || isWebDevPage || isAudioSoftwarePage;

  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-purple-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${isScrolled ? "bg-black/90 backdrop-blur-md border-white/10" : "bg-black/40 backdrop-blur-sm border-white/5"} h-[84px] sm:h-[96px] flex items-center`}>
        <div className="w-full px-6 sm:px-10 lg:px-12 relative flex items-center justify-between h-full">
          {/* Left Brand / Logo: Visible on all pages with explicit stable dimensions */}
          <div className="flex items-center z-10 flex-shrink-0">
            <button 
              onClick={onNavigateHome} 
              className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90 flex-shrink-0"
              aria-label="Quantum Climb Home"
            >
              <img 
                src="/images/qclogo.png" 
                alt="Quantum Climb Logo" 
                width={88}
                height={88}
                className="w-full h-full object-contain brightness-110 select-none pointer-events-none" 
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          {/* Center Navigation Links: Pure Text Color Transition, No Borders/Boxes */}
          <div className="hidden md:flex items-center gap-1 sm:gap-1.5 lg:gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
            <button 
              onClick={onNavigateHome} 
              className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wide uppercase cursor-pointer select-none inline-flex items-center justify-center transition-colors duration-200 whitespace-nowrap ${
                currentPage === "home" 
                  ? "text-white" 
                  : "text-white/55 hover:text-white"
              }`}
            >
              Agency
            </button>

            {/* SERVICES Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button 
                onClick={() => {
                  onNavigateServices?.();
                  setIsServicesDropdownOpen(false);
                }} 
                onFocus={() => setIsServicesDropdownOpen(true)}
                className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wide uppercase cursor-pointer select-none inline-flex items-center gap-1.5 justify-center transition-colors duration-200 whitespace-nowrap ${
                  isAnyServiceActive
                    ? "text-white" 
                    : "text-white/55 hover:text-white"
                }`}
                aria-expanded={isServicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180 text-purple-400" : "opacity-60"}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 sm:w-80 z-50 pointer-events-auto"
                  >
                    <div className="bg-zinc-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 relative backdrop-blur-xl">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80" />

                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onNavigateAIDubbing();
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between group/link transition-all border border-transparent hover:border-purple-500/30 hover:bg-white/5 cursor-pointer ${
                            isAIDubbingPage ? "bg-purple-500/10 border-purple-500/30 text-white" : "text-zinc-300"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold tracking-wide uppercase group-hover/link:text-white">
                              AI Dubbing & Localization
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 group-hover/link:text-purple-400 mt-0.5">
                              Voice synthesis & translation
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover/link:text-purple-400 group-hover/link:translate-x-0.5 transition-all" />
                        </button>

                        <button
                          onClick={() => {
                            onNavigateAIVideo();
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between group/link transition-all border border-transparent hover:border-purple-500/30 hover:bg-white/5 cursor-pointer ${
                            isAIVideoPage ? "bg-purple-500/10 border-purple-500/30 text-white" : "text-zinc-300"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold tracking-wide uppercase group-hover/link:text-white">
                              AI Video
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 group-hover/link:text-purple-400 mt-0.5">
                              Cinematic & branded media
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover/link:text-purple-400 group-hover/link:translate-x-0.5 transition-all" />
                        </button>

                        <button
                          onClick={() => {
                            onNavigateWebDev();
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between group/link transition-all border border-transparent hover:border-purple-500/30 hover:bg-white/5 cursor-pointer ${
                            isWebDevPage ? "bg-purple-500/10 border-purple-500/30 text-white" : "text-zinc-300"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold tracking-wide uppercase group-hover/link:text-white">
                              Web Development
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 group-hover/link:text-purple-400 mt-0.5">
                              Platforms, apps & digital solutions
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover/link:text-purple-400 group-hover/link:translate-x-0.5 transition-all" />
                        </button>

                        <button
                          onClick={() => {
                            onNavigateAudioSoftware?.();
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between group/link transition-all border border-transparent hover:border-purple-500/30 hover:bg-white/5 cursor-pointer ${
                            isAudioSoftwarePage ? "bg-purple-500/10 border-purple-500/30 text-white" : "text-zinc-300"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold tracking-wide uppercase group-hover/link:text-white">
                              Audio Software & Plugin Dev
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 group-hover/link:text-purple-400 mt-0.5">
                              VST3 plugins, DSP & music tech
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover/link:text-purple-400 group-hover/link:translate-x-0.5 transition-all" />
                        </button>
                      </div>

                      <div className="border-t border-white/10 mt-2 pt-2">
                        <button
                          onClick={() => {
                            onNavigateServices?.();
                            setIsServicesDropdownOpen(false);
                          }}
                          className="w-full px-3.5 py-2 text-left text-[11px] font-mono uppercase tracking-wider text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span>Services Overview</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={onNavigateProducts} 
              className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wide uppercase cursor-pointer select-none inline-flex items-center justify-center transition-colors duration-200 whitespace-nowrap ${
                isProductsPage 
                  ? "text-white" 
                  : "text-white/55 hover:text-white"
              }`}
            >
              Products
            </button>
          </div>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 z-10 flex-shrink-0">
            <button 
              onClick={onNavigateContact} 
              className="hidden md:block px-4 py-2 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-600 hover:border-purple-600 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer flex-shrink-0"
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
        ) : isServicesPage ? (
          <ServicesPage
            onOpenContactModal={onNavigateContact}
            onNavigateAIDubbing={onNavigateAIDubbing}
            onNavigateAIVideo={onNavigateAIVideo}
            onNavigateWebDev={onNavigateWebDev}
            onNavigateAudioSoftware={() => onNavigateAudioSoftware?.()}
          />
        ) : isAudioSoftwarePage ? (
          <AudioSoftwarePage
            onOpenContactModal={onNavigateContact}
            onNavigateProducts={() => onNavigateProducts?.()}
            onNavigateAudioPlugins={() => onNavigateAudioPlugins?.()}
          />
        ) : isAudioPluginsPage ? (
          <AudioPluginsPage onOpenContactModal={onNavigateContact} />
        ) : isQFnBDemoPage ? (
          <QFnBDemoPage
            onNavigateQFnB={() => onNavigateQFnB?.()}
            onSubmitDemoRequest={onSubmitQFnBDemoRequest ?? (async () => {})}
          />
        ) : isQFnBPage ? (
          <QFnBPage 
            onOpenContactModal={onNavigateContact}
            onNavigateProducts={() => onNavigateProducts?.()}
            onNavigateQFnBDemo={() => onNavigateQFnBDemo?.()}
          />
        ) : isQTransitionPage ? (
          <QTransitionPage
            onNavigateProducts={() => onNavigateProducts?.()}
          />
        ) : currentPage === "products" ? (
          <ProductsPage 
            onOpenContactModal={onNavigateContact}
            onNavigateQFnB={() => onNavigateQFnB?.()}
            onNavigateAudioPlugins={() => onNavigateAudioPlugins?.()}
            onNavigateQTransition={() => onNavigateQTransition?.()}
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

            <div className="flex flex-col gap-5 text-xl sm:text-2xl font-bold tracking-tight text-white uppercase mt-6 overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
              <button
                onClick={() => {
                  onNavigateHome();
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-white/5 hover:text-purple-400 transition-colors ${currentPage === "home" ? "text-purple-400 border-purple-500/20" : ""}`}
              >
                Agency
              </button>

              {/* Mobile Services Accordion */}
              <div className="border-b border-white/5 pb-2">
                <button
                  onClick={() => setIsMobileServicesOpen(prev => !prev)}
                  className={`w-full text-left py-2 flex items-center justify-between hover:text-purple-400 transition-colors ${
                    isAnyServiceActive ? "text-purple-400" : ""
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180 text-purple-400" : "text-zinc-500"}`} />
                </button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden flex flex-col gap-2 pt-2 pb-2 pl-3 border-l-2 border-purple-500/40 ml-1 text-sm font-medium"
                    >
                      <button
                        onClick={() => {
                          onNavigateServices?.();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left py-1.5 transition-colors uppercase text-xs tracking-wider font-mono ${
                          isServicesPage ? "text-purple-400 font-bold" : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Services Overview →
                      </button>
                      <button
                        onClick={() => {
                          onNavigateAIDubbing();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left py-1.5 transition-colors uppercase text-xs tracking-wide ${
                          isAIDubbingPage ? "text-purple-400 font-bold" : "text-zinc-300 hover:text-white"
                        }`}
                      >
                        AI Dubbing & Localization
                      </button>
                      <button
                        onClick={() => {
                          onNavigateAIVideo();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left py-1.5 transition-colors uppercase text-xs tracking-wide ${
                          isAIVideoPage ? "text-purple-400 font-bold" : "text-zinc-300 hover:text-white"
                        }`}
                      >
                        AI Video
                      </button>
                      <button
                        onClick={() => {
                          onNavigateWebDev();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left py-1.5 transition-colors uppercase text-xs tracking-wide ${
                          isWebDevPage ? "text-purple-400 font-bold" : "text-zinc-300 hover:text-white"
                        }`}
                      >
                        Web Development
                      </button>
                      <button
                        onClick={() => {
                          onNavigateAudioSoftware?.();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left py-1.5 transition-colors uppercase text-xs tracking-wide ${
                          isAudioSoftwarePage ? "text-purple-400 font-bold" : "text-zinc-300 hover:text-white"
                        }`}
                      >
                        Audio Software & Plugin Dev
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => {
                  onNavigateProducts?.();
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-white/5 hover:text-purple-400 transition-colors ${isProductsPage ? "text-purple-400 border-purple-500/20" : ""}`}
              >
                Products
              </button>
              
              <button
                onClick={() => {
                  onNavigateContact();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-4 w-full py-4 text-center border border-purple-500/30 bg-purple-500/10 hover:bg-purple-600 hover:border-purple-600 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer animate-fade-in"
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