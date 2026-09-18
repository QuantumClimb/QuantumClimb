import { Reveal } from "../components/Reveal";
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Grid, 
  Users, 
  TrendingUp, 
  Utensils, 
  Info,
  CheckCircle2
} from "lucide-react";
import { FinalCTA } from "../sections/ClosureSections";

type QFnBPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateProducts: () => void;
  onNavigateQFnBDemo: () => void;
}>;

export function QFnBPage({
  onOpenContactModal,
  onNavigateProducts,
  onNavigateQFnBDemo,
}: QFnBPageProps) {
  return (
    <div className="pt-28 sm:pt-36 bg-black min-h-screen">
      {/* Background Ambience Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }} 
        />
      </div>

      {/* Hero Header Section */}
      <section className="relative px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={onNavigateProducts}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors cursor-pointer"
            >
              QUANTUM CLIMB PRODUCTS
            </button>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase font-semibold">
              HOSPITALITY TECHNOLOGY
            </span>
          </div>
        </Reveal>

        <Reveal type="fade-up" delay={0.1}>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase">
              Q F&B
            </h1>
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono tracking-widest uppercase">
              PLATFORM
            </span>
          </div>
        </Reveal>

        <Reveal type="fade-up" delay={0.15}>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase max-w-4xl leading-tight mb-6">
            THE OPERATING LAYER <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-400">
              BEHIND BETTER HOSPITALITY.
            </span>
          </h2>
        </Reveal>

        <Reveal type="fade-up" delay={0.2}>
          <p className="text-xl sm:text-2xl font-bold text-zinc-300 uppercase tracking-tight mb-6">
            Manage the floor. Know the guest. Grow the business.
          </p>
        </Reveal>

        <Reveal type="fade-up" delay={0.25}>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed mb-10 font-light">
            Q F&B is a restaurant operations and guest growth platform designed to connect reservations, tables, guest relationships, offers and business insights in one focused environment.
          </p>
        </Reveal>

        {/* Primary Action Buttons */}
        <Reveal type="fade-up" delay={0.3}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onNavigateQFnBDemo}
              className="px-8 py-4 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
            >
              REQUEST A PRIVATE DEMO
            </button>

            <a
              href="https://qrestobar.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2 text-center"
            >
              <span>VIEW Q RESTOBAR</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* System Architecture & Relationship Section */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-20 max-w-7xl mx-auto z-10 relative">
        <Reveal type="fade-up">
          {/* Reference Notice Box */}
          <div className="p-6 sm:p-8 bg-zinc-950 border border-white/10 relative overflow-hidden mb-16">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 flex-shrink-0 mt-1">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  SYSTEM ECOSYSTEM & REFERENCE APPLICATION
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  <strong className="text-white font-semibold">Q RESTOBAR</strong> is a live customer-facing reference experience.
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  <strong className="text-white font-semibold">Q F&B</strong> is the private operational platform designed for restaurant owners and staff to manage reservations, guest intelligence, and digital growth.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "MANAGE THE FLOOR",
              desc: "Centralized table management, seating flow, and live reservation oversight.",
              icon: <Grid className="w-5 h-5 text-purple-400" />
            },
            {
              title: "KNOW THE GUEST",
              desc: "Unified guest history, preferences, dining habits, and VIP recognition.",
              icon: <Users className="w-5 h-5 text-purple-400" />
            },
            {
              title: "GROW THE BUSINESS",
              desc: "Automated direct guest offers, retention campaigns, and loyalty insights.",
              icon: <TrendingUp className="w-5 h-5 text-purple-400" />
            },
            {
              title: "SELL DIRECT",
              desc: "Integrated digital order handling connected straight to restaurant operations.",
              icon: <Utensils className="w-5 h-5 text-purple-400" />
            }
          ].map((pillar, idx) => (
            <Reveal key={pillar.title} type="fade-up" delay={0.1 * idx}>
              <div className="p-6 bg-zinc-950/60 border border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {pillar.icon}
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{pillar.title}</h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{pillar.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Q F&B CORE</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 
          ========================================================================
          PHASE 2 CONTENT EXPANSION PLACEHOLDER
          ========================================================================
          The full Manage, Know, Grow and Sell detailed sections, interactive 
          previews, and deep-dive operational specs will be introduced in Phase 2.
          ========================================================================
        */}
      </section>

      {/* Closure CTA */}
      <FinalCTA onContactClick={onOpenContactModal} />
    </div>
  );
}
