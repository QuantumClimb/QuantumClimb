import { Reveal } from "../components/Reveal";
import { TechCanvas } from "../components/TechCanvas";
import { 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Mic, 
  Zap, 
  Grid,
  Users,
  Utensils,
  TrendingUp,
  BarChart3,
  CalendarCheck,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { FinalCTA } from "../sections/ClosureSections";

type ProductsPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateQFnB: () => void;
  onNavigateAudioPlugins: () => void;
}>;

export function ProductsPage({
  onOpenContactModal,
  onNavigateQFnB,
  onNavigateAudioPlugins,
}: ProductsPageProps) {
  return (
    <div className="pt-28 sm:pt-36 bg-black min-h-screen">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }} 
        />
      </div>

      {/* Hero Section with Futuristic AI Control Room Background */}
      <section className="relative border-b border-white/10 overflow-hidden bg-black group z-10">
        {/* Background Banner Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 group-hover:scale-100"
          style={{ backgroundImage: "url('/images/products/products-futuristic-ai-control-room.png')" }}
        />
        {/* Refined Layered Overlay System for Enhanced Background Visibility */}
        {/* Layer 1: Lighter overall vertical gradient allowing screen details to shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-zinc-950/35 to-black/80" />
        {/* Layer 2: Targeted dark radial backdrop behind text area for maximum headline contrast without darkening the entire image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,_var(--tw-gradient-stops))] from-black/85 via-black/50 to-transparent" />
        {/* Layer 3: Subtle graphite & soft purple visual tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-zinc-950/20 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto">
          <Reveal type="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-purple-500/30 backdrop-blur-md text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              QUANTUM CLIMB / PRODUCTS
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase max-w-4xl leading-[1.05] mb-8">
              WE BUILD THE TOOLS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-purple-400">
                BEHIND THE EXPERIENCE.
              </span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.2}>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-6 font-light drop-shadow-sm">
              Focused digital products created at the intersection of technology, creativity and real-world workflows.
            </p>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Built by Quantum Climb
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col gap-20 sm:gap-32">
          
          {/* FEATURED PRODUCT 01: Q F&B */}
          <Reveal type="fade-up">
            <div className="relative border border-white/10 bg-gradient-to-b from-zinc-950/80 to-black p-6 sm:p-10 lg:p-14 group hover:border-purple-500/40 transition-all duration-500 overflow-hidden">
              {/* Subtle top subtle accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-transparent opacity-80" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* Product Copy Column (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Featured Tag & Category */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 font-mono text-xs font-semibold tracking-wider uppercase border border-purple-500/30">
                        FEATURED PRODUCT
                      </span>
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                        RESTAURANT OPERATIONS & GUEST GROWTH PLATFORM
                      </span>
                    </div>

                    {/* Product Name */}
                    <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase mb-4">
                      Q F&B
                    </h2>

                    {/* Primary Statement */}
                    <div className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight uppercase leading-snug mb-6">
                      MANAGE THE FLOOR. <br className="hidden sm:inline" />
                      KNOW THE GUEST. <br className="hidden sm:inline" />
                      GROW THE BUSINESS.
                    </div>

                    {/* Supporting Copy */}
                    <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 font-light max-w-xl">
                      Reservations, guest relationships, offers and business insights brought together in one connected hospitality platform.
                    </p>

                    {/* Four Core Pillars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                      {[
                        { title: "MANAGE", icon: <Grid className="w-4 h-4 text-purple-400" />, desc: "Tables & Reservations" },
                        { title: "KNOW", icon: <Users className="w-4 h-4 text-purple-400" />, desc: "Guest Relationships" },
                        { title: "GROW", icon: <TrendingUp className="w-4 h-4 text-purple-400" />, desc: "Offers & Retention" },
                        { title: "SELL", icon: <Utensils className="w-4 h-4 text-purple-400" />, desc: "Direct Digital Orders" }
                      ].map((pillar) => (
                        <div key={pillar.title} className="p-3 bg-zinc-900/60 border border-white/5 rounded-none">
                          <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider mb-1">
                            {pillar.icon}
                            <span>{pillar.title}</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 font-mono">{pillar.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div>
                    <button
                      onClick={onNavigateQFnB}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>EXPLORE Q F&B</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Abstract Dashboard Visual Placeholder (5 cols) */}
                <div className="lg:col-span-5 relative">
                  <div className="relative bg-zinc-950 border border-white/10 p-5 font-mono text-xs overflow-hidden rounded-none shadow-2xl">
                    {/* Header bar of visual */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        <span className="text-zinc-300 font-bold tracking-wider uppercase text-[11px]">Q F&B // SYSTEM DASHBOARD</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5">
                        OPERATIONAL
                      </span>
                    </div>

                    {/* Conceptual UI Grid */}
                    <div className="space-y-4">
                      {/* Metric cards row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-black/60 border border-white/5 p-3">
                          <div className="text-[10px] text-zinc-500 uppercase">ACTIVE TABLES</div>
                          <div className="text-xl font-bold text-white mt-1">24 / 28</div>
                          <div className="text-[10px] text-purple-400 mt-1">85% Occupancy</div>
                        </div>
                        <div className="bg-black/60 border border-white/5 p-3">
                          <div className="text-[10px] text-zinc-500 uppercase">GUEST INDEX</div>
                          <div className="text-xl font-bold text-white mt-1">1,420</div>
                          <div className="text-[10px] text-emerald-400 mt-1">+14% Repeat Guests</div>
                        </div>
                      </div>

                      {/* Live Floor Map Placeholder */}
                      <div className="bg-black/80 border border-white/5 p-3 relative h-36 flex flex-col justify-between overflow-hidden">
                        <div className="flex justify-between text-[10px] text-zinc-400 uppercase">
                          <span>LIVE FLOOR MATRIX</span>
                          <span className="text-zinc-600">ZONE A & B</span>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2 my-auto">
                          {[
                            { id: "T1", status: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
                            { id: "T2", status: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
                            { id: "T3", status: "bg-zinc-800/40 text-zinc-500 border-white/5" },
                            { id: "T4", status: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
                          ].map((table) => (
                            <div key={table.id} className={`p-2 border text-center font-bold text-[10px] ${table.status}`}>
                              {table.id}
                            </div>
                          ))}
                        </div>

                        <div className="text-[9px] text-zinc-500 text-right italic">
                          * Conceptual interface preview
                        </div>
                      </div>

                      {/* Analytics snippet */}
                      <div className="bg-black/60 border border-white/5 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-purple-400" />
                          <span className="text-[11px] text-zinc-300">GUEST PREFERENCES ENGINE</span>
                        </div>
                        <span className="text-[10px] text-zinc-500">CONNECTED</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>

          {/* SECONDARY PRODUCT 02: Q HUMAN */}
          <Reveal type="fade-up">
            <div className="relative border border-white/10 bg-gradient-to-b from-zinc-950/40 to-black p-6 sm:p-10 lg:p-12 group hover:border-purple-500/30 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual Column */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative border border-white/10 bg-zinc-950 overflow-hidden aspect-video sm:aspect-square flex items-center justify-center">
                    <img 
                      src="/images/Audio plugins/qhuman_cover4.png" 
                      alt="Q HUMAN Vocal Humanization Technology" 
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-zinc-300">
                      <span className="px-2 py-0.5 bg-black/80 border border-white/10">VST3 AUDIO PLUGIN</span>
                      <span className="text-purple-400">WINDOWS 64-BIT</span>
                    </div>
                  </div>
                </div>

                {/* Copy Column */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 font-mono text-xs uppercase tracking-wider border border-white/10">
                      AUDIO TECHNOLOGY
                    </span>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                      VOCAL HUMANIZATION ENVIRONMENT
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
                    Q HUMAN
                  </h2>

                  <div className="text-lg sm:text-xl font-bold text-purple-300 tracking-tight uppercase mb-4">
                    MAKE THE VOICE FEEL HUMAN.
                  </div>

                  <p className="text-zinc-400 text-base leading-relaxed mb-8 font-light max-w-xl">
                    A Windows VST3 vocal humanization environment designed for AI dubbing, localization, narration and heavily processed vocal production.
                  </p>

                  <button
                    onClick={onNavigateAudioPlugins}
                    className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                  >
                    <span>EXPLORE Q HUMAN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Closure CTA */}
      <FinalCTA onContactClick={onOpenContactModal} />
    </div>
  );
}
