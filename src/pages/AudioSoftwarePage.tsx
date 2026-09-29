import { Reveal } from "../components/Reveal";
import { TechCanvas } from "../components/TechCanvas";
import { FinalCTA } from "../sections/ClosureSections";
import { 
  ArrowRight, 
  Sliders, 
  Cpu, 
  Activity, 
  Layers, 
  Music, 
  Disc, 
  Sparkles, 
  ArrowUpRight,
  ExternalLink,
  Zap,
  Mic,
  Volume2
} from "lucide-react";

type AudioSoftwarePageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateProducts: () => void;
  onNavigateAudioPlugins?: () => void;
}>;

export function AudioSoftwarePage({
  onOpenContactModal,
  onNavigateProducts,
  onNavigateAudioPlugins,
}: AudioSoftwarePageProps) {
  const capabilities = [
    {
      title: "VST3 & AU PLUGIN ARCHITECTURE",
      category: "CREATIVE & STUDIO DSP",
      description: "Low-latency, high-performance audio plugins for digital audio workstations, built around clean C++ DSP algorithms and modern responsive interfaces.",
      icon: <Sliders className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "DIGITAL SIGNAL PROCESSING (DSP)",
      category: "ACOUSTIC & SPECTRAL ALGORITHMS",
      description: "Tailored DSP systems including harmonic saturation, micro-timing humanization, spectral smoothing, dynamic resonance control and acoustic restoration.",
      icon: <Activity className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "STANDALONE AUDIO APPLICATIONS",
      category: "WORKFLOW & BATCH PROCESSING",
      description: "Dedicated desktop applications and CLI tools for automated dialogue cleaning, audio batch conversion, and studio pipeline processing.",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "INTELLIGENT MUSIC TECHNOLOGY",
      category: "ANALYSIS & ADAPTIVE AUDIO",
      description: "Smart track analysis, harmonic key alignment, BPM detection, and algorithmic transition systems for DJing, mixing, and generative audio.",
      icon: <Disc className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 bg-black min-h-screen text-zinc-300">
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

      {/* Hero Section */}
      <section className="relative border-b border-white/10 overflow-hidden bg-black group z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-zinc-950/60 to-black z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,_var(--tw-gradient-stops))] from-black/90 via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-zinc-950/20 pointer-events-none z-10" />
          <img 
            src="/images/Audio plugins/qhuman_cover1.png" 
            alt="Audio Software & Plugin Development" 
            className="w-full h-full object-cover opacity-20 brightness-110"
            referrerPolicy="no-referrer"
          />
          <TechCanvas />
        </div>

        <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto">
          <Reveal type="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-purple-500/30 backdrop-blur-md text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              SERVICES / AUDIO ENGINEERING
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase max-w-4xl leading-[1.05] mb-8">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-purple-400">
                INTELLIGENT AUDIO TOOLS.
              </span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.2}>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl leading-relaxed mb-10 font-light drop-shadow-sm">
              Quantum Climb develops professional audio software, VST3 plugins, DSP tools and standalone applications designed for creators, studios, media workflows and emerging audio technologies.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={onOpenContactModal}
                className="px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-white hover:border-purple-600"
              >
                <span>START AN AUDIO PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateProducts}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Engineering Capabilities Grid */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative">
        <div className="mb-14">
          <Reveal type="fade-up">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
              WHAT WE DEVELOP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              AUDIO SOFTWARE CAPABILITIES
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => (
            <Reveal key={cap.title} type="fade-up" delay={idx * 0.1}>
              <div className="p-6 sm:p-8 bg-zinc-950/80 border border-white/10 group hover:border-purple-500/40 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      {cap.icon}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      {cap.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    {cap.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Current Development Projects Section (Examples of Capability) */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative border-t border-white/10">
        <div className="mb-14">
          <Reveal type="fade-up">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 font-mono text-xs font-semibold tracking-wider uppercase border border-purple-500/30">
                CAPABILITY IN ACTION
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                INTERNAL DEVELOPMENT EXAMPLES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
              CURRENT DEVELOPMENT PROJECTS
            </h2>
            <p className="text-zinc-400 text-base max-w-3xl leading-relaxed font-light">
              We design and engineer our own proprietary audio technology alongside client work. The projects below showcase Quantum Climb&apos;s audio software development capabilities.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12">
          {/* EXAMPLE 01: Q HUMAN */}
          <Reveal type="fade-up">
            <div className="relative border border-white/10 bg-gradient-to-b from-zinc-950/80 to-black p-6 sm:p-10 lg:p-12 group hover:border-purple-500/30 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative border border-white/10 bg-zinc-950 overflow-hidden aspect-video sm:aspect-[4/3] flex items-center justify-center">
                    <img 
                      src="/images/Audio plugins/qhuman_cover4.png" 
                      alt="Q HUMAN Vocal Humanization Environment" 
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-zinc-300">
                      <span className="px-2 py-0.5 bg-black/80 border border-white/10">PROPRIETARY PRODUCT</span>
                      <span className="text-purple-400">VST3 ARCHITECTURE</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 font-mono text-xs uppercase tracking-wider border border-white/10">
                      DEVELOPMENT EXAMPLE
                    </span>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                      VOCAL PROCESSING ENVIRONMENT
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-3">
                    Q HUMAN
                  </h3>

                  <div className="text-base sm:text-lg font-semibold text-purple-300 tracking-tight uppercase mb-4">
                    VOCAL HUMANIZATION FOR AI & MEDIA WORKFLOWS
                  </div>

                  <p className="text-zinc-300 text-base leading-relaxed mb-6 font-light">
                    A vocal humanization environment designed for AI dubbing, localization, narration and heavily processed voice production.
                  </p>

                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-8">
                    Note: Q HUMAN is a proprietary Quantum Climb product featured under our Products portfolio.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {onNavigateAudioPlugins ? (
                      <button
                        onClick={onNavigateAudioPlugins}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black hover:bg-purple-600 hover:text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer border border-white hover:border-purple-600"
                      >
                        <span>VIEW Q HUMAN PRODUCT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : null}

                    <button
                      onClick={onNavigateProducts}
                      className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>EXPLORE OUR PRODUCTS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* EXAMPLE 02: Q TRANSITION */}
          <Reveal type="fade-up">
            <div className="relative border border-white/10 bg-gradient-to-b from-zinc-950/80 to-black p-6 sm:p-10 lg:p-12 group hover:border-purple-500/30 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual / Conceptual interface */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative border border-white/10 bg-zinc-950 p-6 font-mono text-xs overflow-hidden aspect-video sm:aspect-[4/3] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-zinc-200 font-bold uppercase text-[11px]">Q TRANSITION // ENGINE</span>
                      </div>
                      <span className="text-[10px] text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5">
                        IN ACTIVE DEV
                      </span>
                    </div>

                    <div className="space-y-3 my-auto">
                      <div className="bg-black/60 border border-white/5 p-3">
                        <div className="text-[10px] text-zinc-500 uppercase">SPECTRAL HARMONIC COMPATIBILITY</div>
                        <div className="text-sm font-bold text-white mt-1 flex items-center justify-between">
                          <span>TRACK A → TRACK B</span>
                          <span className="text-emerald-400 font-mono">98.4% MATCH</span>
                        </div>
                      </div>

                      <div className="bg-black/60 border border-white/5 p-3">
                        <div className="text-[10px] text-zinc-500 uppercase">SMART TRANSITION MATRIX</div>
                        <div className="h-6 flex items-center gap-1 mt-2">
                          {[40, 65, 80, 100, 75, 90, 85, 95, 60, 70, 85, 95, 80, 60].map((h, i) => (
                            <span 
                              key={i} 
                              className="flex-1 bg-gradient-to-t from-purple-600 to-indigo-400"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-3 border-t border-white/10">
                      <span>INTELLIGENT DJ PLATFORM</span>
                      <span className="text-purple-400">DSP CORE</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 font-mono text-xs uppercase tracking-wider border border-white/10">
                      DEVELOPMENT EXAMPLE
                    </span>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                      SMART DJ & TRANSITION PLATFORM
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-3">
                    Q TRANSITION
                  </h3>

                  <div className="text-base sm:text-lg font-semibold text-purple-300 tracking-tight uppercase mb-4">
                    INTELLIGENT TRACK ANALYSIS & SEAMLESS TRANSITIONS
                  </div>

                  <p className="text-zinc-300 text-base leading-relaxed mb-6 font-light">
                    A smart DJ music and transition platform being developed to analyse tracks, improve compatibility and help create smoother, more intelligent transitions.
                  </p>

                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-8">
                    Note: Q TRANSITION is in active development as a proprietary Quantum Climb music technology platform.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={onNavigateProducts}
                      className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>EXPLORE OUR PRODUCTS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={onOpenContactModal}
                      className="inline-flex items-center gap-2 px-6 py-3.5 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-600 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>START AN AUDIO PROJECT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
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
