import { Reveal } from "../components/Reveal";
import { 
  ArrowRight, 
  Cpu, 
  Video, 
  Code, 
  Mic, 
  Gamepad2, 
  Sparkles, 
  Workflow, 
  BrainCircuit, 
  Globe, 
  Terminal,
  ArrowUpRight
} from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { FinalCTA } from "../sections/ClosureSections";

type HomePageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateAIDubbing: () => void;
  onNavigateAIVideo: () => void;
  onNavigateWebDev: () => void;
}>;

export function HomePage({ 
  onOpenContactModal, 
  onNavigateAIDubbing, 
  onNavigateAIVideo, 
  onNavigateWebDev 
}: HomePageProps) {
  
  // What Can We Build projects
  const projects = [
    {
      id: "website",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      title: "BUILD A WEBSITE",
      desc: "Build a high-performance website, web app or digital experience.",
      image: "/images/Build%20a%20Website%20CTA..png",
      action: onNavigateWebDev,
    },
    {
      id: "agent",
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
      title: "BUILD AN AI AGENT",
      desc: "Design an AI agent that performs real work instead of simply answering questions.",
      image: "/images/AI%20AGENT.png",
      action: onOpenContactModal,
    },
    {
      id: "video",
      icon: <Video className="w-5 h-5 text-purple-400" />,
      title: "CREATE AI VIDEO",
      desc: "Generate cinematic video, product films, advertising and digital content.",
      image: "/images/AI%20VIDEO1.png",
      action: onNavigateAIVideo,
    },
    {
      id: "dubbing",
      icon: <Mic className="w-5 h-5 text-purple-400" />,
      title: "LOCALIZE YOUR CONTENT",
      desc: "AI dubbing, voice cloning, lip-sync and multilingual adaptation.",
      image: "/images/AI%20Dubbing%20-Voice.png",
      action: onNavigateAIDubbing,
    },
    {
      id: "automation",
      icon: <Workflow className="w-5 h-5 text-purple-400" />,
      title: "AUTOMATE YOUR WORKFLOW",
      desc: "Connect systems, automate repetitive production and build intelligent pipelines.",
      image: "/images/Automation.png",
      action: onOpenContactModal,
    },
    {
      id: "else",
      icon: <Terminal className="w-5 h-5 text-purple-400" />,
      title: "BUILD SOMETHING ELSE",
      desc: "If you have an unusual idea, talk to us. We build unconventional solutions.",
      image: "/images/Quantum%20Climb%20%20-Hero%20Visual.png",
      action: onOpenContactModal,
    }
  ];

  // Compact capabilities for "The Quantum Ecosystem"
  const capabilities = [
    { 
      id: "automation", 
      icon: <Cpu className="w-5 h-5 text-purple-400" />, 
      title: "Automation for Creative Media", 
      desc: "Streamline your creative workflows with AI-driven automation. From asset management to automated editing pipelines." 
    },
    { 
      id: "video", 
      icon: <Video className="w-5 h-5 text-purple-400" />, 
      title: "AI Generated Video", 
      desc: "High-quality, realistic or stylized video content generated entirely by AI models. Perfect for marketing, social media, and internal comms."
    },
    { 
      id: "software", 
      icon: <Code className="w-5 h-5 text-purple-400" />, 
      title: "AI-Created Software & Apps", 
      desc: "Custom web applications and software solutions designed, coded, and managed by advanced AI systems."
    },
    { 
      id: "dubbing", 
      icon: <Mic className="w-5 h-5 text-purple-400" />, 
      title: "AI Dubbing & Voice Cloning", 
      desc: "Enterprise-grade AI dubbing, perfect lip-sync, and cultural adaptation for global media leaders."
    },
    { 
      id: "gamification", 
      icon: <Gamepad2 className="w-5 h-5 text-purple-400" />, 
      title: "Gamification", 
      desc: "Transform standard interactions into engaging digital experiences with AI-driven gamification strategies." 
    },
    { 
      id: "studiofication", 
      icon: <Sparkles className="w-5 h-5 text-purple-400" />, 
      title: "Studiofication", 
      desc: "Elevate your brand with studio-quality assets, branding, and content powered by intelligent generative models." 
    }
  ];

  const scrollToSection = (id: string) => {
    const el = globalThis.document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-black">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <img 
            src="/images/Quantum%20Climb%20%20-Hero%20Visual.png" 
            alt="Quantum Climb Hero Visual Background" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          {/* Subtle technical background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] z-10 opacity-40"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="max-w-5xl mx-auto">
            <Reveal type="mask" className="mb-6">
              <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                AI Studio & Lab
              </span>
            </Reveal>

            <Reveal type="fade-up" className="mb-8 flex justify-center">
              <img 
                src="/images/qclogo.png" 
                alt="Quantum Climb Logo" 
                className="max-w-[320px] md:max-w-[480px] w-full h-auto object-contain mx-auto" 
                referrerPolicy="no-referrer"
              />
            </Reveal>

            <Reveal type="fade-up" delay={0.2} className="mb-12">
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
                We build AI-powered digital products, media, and experiences. Evolving workflows, synthesizing voices, and programming systems for global leaders.
              </p>
            </Reveal>
            
            <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onOpenContactModal}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 border border-white cursor-pointer"
              >
                BUILD SOMETHING WITH US <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToSection("what-can-we-build")}
                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-semibold tracking-tight hover:border-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                EXPLORE WHAT WE BUILD ↓
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. WHAT CAN WE BUILD SECTION */}
      <section id="what-can-we-build" className="py-32 bg-zinc-950 border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader
            eyebrow="WHAT CAN WE BUILD?"
            title="Tell us what you want to build."
            subtitle="Select a project category below to explore our work, configure your requirements, or start a collaboration."
            centered={false}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {projects.map((project, index) => (
              <Reveal key={project.id} type="fade-up" delay={0.05 * index} className="group h-full">
                <div 
                  onClick={project.action}
                  className="cursor-pointer h-full bg-black border border-white/10 hover:border-purple-600/50 transition-all duration-500 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Image Container */}
                  <div className="aspect-video w-full overflow-hidden bg-zinc-900 border-b border-white/5 relative">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
                          {project.icon}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                          {project.id === "else" ? "Custom" : "Actionable"}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-medium text-white group-hover:text-purple-400 transition-colors tracking-tight mb-2 uppercase flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                        {project.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono tracking-wider text-purple-400 uppercase">
                      <span>Initiate Project</span>
                      <span className="w-2 h-2 bg-purple-500 rounded-full group-hover:animate-ping"></span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BUILT WITH INTELLIGENCE SECTION */}
      <section className="py-32 bg-black border-b border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="BUILT WITH INTELLIGENCE"
            title="Selected Showcase & Creative Work"
            subtitle="A curated look at actual media, products, and systems created by Quantum Climb. Built entirely using advanced AI pipeline technologies."
          />

          <div className="grid md:grid-cols-12 gap-8 mt-16">
            {/* Project 1 - Huge left card */}
            <div className="md:col-span-8 group relative border border-white/10 bg-zinc-950/40 p-4 flex flex-col justify-between">
              <div className="aspect-[16/9] w-full overflow-hidden relative border border-white/5">
                <img 
                  src="/images/AI%20VIDEO1.png" 
                  alt="Generative Film Teaser" 
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 font-mono text-[9px] text-purple-300 uppercase tracking-widest">
                  Cinematic AI Video
                </div>
              </div>
              <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">FlameBorne Fantasy Teaser</h3>
                  <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
                    A cinematic promotional campaign combining multi-agent storyboards, high-fidelity physical water/fire dynamics, and consistent dark fantasy character models.
                  </p>
                </div>
                <button 
                  onClick={onNavigateAIVideo}
                  className="px-6 py-3 border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors uppercase text-[10px] tracking-widest whitespace-nowrap self-start md:self-auto cursor-pointer"
                >
                  View Case Study
                </button>
              </div>
            </div>

            {/* Project 2 - Top Right Small card */}
            <div className="md:col-span-4 group relative border border-white/10 bg-zinc-950/40 p-4 flex flex-col justify-between">
              <div className="aspect-square w-full overflow-hidden relative border border-white/5">
                <img 
                  src="/images/Build%20a%20Website%20CTA..png" 
                  alt="Custom E-Learning Portal" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 font-mono text-[9px] text-purple-300 uppercase tracking-widest">
                  Next-Gen Web Apps
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Studification Portal</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  A high-speed modular platform designed to automate course layouts, integrate real-time voice synthesis and deliver customized learning nodes.
                </p>
                <button 
                  onClick={onNavigateWebDev}
                  className="text-xs font-mono text-purple-400 hover:text-purple-300 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Project 3 - Bottom Left Small card */}
            <div className="md:col-span-4 group relative border border-white/10 bg-zinc-950/40 p-4 flex flex-col justify-between">
              <div className="aspect-square w-full overflow-hidden relative border border-white/5">
                <img 
                  src="/images/AI%20AGENT.png" 
                  alt="Autonomous Media Pipeline" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 font-mono text-[9px] text-purple-300 uppercase tracking-widest">
                  AI Agent Workflows
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Autonomous Agent Lab</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  Multi-agent software networks programmed to perform recursive analysis, coordinate complex assets, and run QA validations automatically.
                </p>
                <button 
                  onClick={onOpenContactModal}
                  className="text-xs font-mono text-purple-400 hover:text-purple-300 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  Request Demo <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Project 4 - Bottom Right Large Card */}
            <div className="md:col-span-8 group relative border border-white/10 bg-zinc-950/40 p-4 flex flex-col justify-between">
              <div className="aspect-[16/9] w-full overflow-hidden relative border border-white/5">
                <img 
                  src="/images/AI%20Dubbing%20-Voice.png" 
                  alt="Voice Cloning Demo" 
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 font-mono text-[9px] text-purple-300 uppercase tracking-widest">
                  Localization
                </div>
              </div>
              <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Global Dubbing Node</h3>
                  <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
                    Voice adaptation and precise lip-sync synchronization deployed for cinematic distributors, matching physical speech dynamics perfectly across 48+ target dialects.
                  </p>
                </div>
                <button 
                  onClick={onNavigateAIDubbing}
                  className="px-6 py-3 border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors uppercase text-[10px] tracking-widest whitespace-nowrap self-start md:self-auto cursor-pointer"
                >
                  View Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE QUANTUM ECOSYSTEM */}
      <section className="py-32 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="THE QUANTUM ECOSYSTEM"
            title="Core Technical Capabilities"
            subtitle="The underlying AI-native pipeline mechanics powering all of our custom software, agent networks, and digital assets."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {capabilities.map((service, index) => (
              <Reveal key={service.id} type="fade-up" delay={0.05 * index} className="group relative">
                <div className="bg-black border border-white/10 p-8 hover:border-purple-600/30 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
                        {service.icon}
                      </span>
                      <h4 className="text-lg font-medium text-white tracking-tight">{service.title}</h4>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-zinc-600 uppercase border-t border-white/5 pt-4 mt-auto">
                    <span className="w-1 h-1 bg-purple-500/60 rounded-full"></span>
                    Integrated Module // ECO-SYS.LNK
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. START A PROJECT CTA */}
      <section className="relative py-32 bg-black overflow-hidden">
        {/* Generative technical grid overlay behind section */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)" }}></div>
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal type="mask" className="mb-4">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              HAVE A PROJECT IN MIND?
            </span>
          </Reveal>
          
          <Reveal type="mask" className="mb-6">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white leading-tight uppercase">
              Let's <span className="text-zinc-500 italic font-serif">build it.</span>
            </h2>
          </Reveal>
          
          <Reveal type="fade-up" delay={0.2} className="mb-10">
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Tell us what you're trying to create. We'll figure out the technology, workflow, and production system required to make it real.
            </p>
          </Reveal>
          
          <Reveal type="fade-up" delay={0.3}>
            <button
              onClick={onOpenContactModal}
              className="px-12 py-5 bg-white text-black font-bold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 border border-white mx-auto cursor-pointer"
            >
              START A PROJECT <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* 6. FINAL CLOSURE FOOTER SECTION OVERVIEW */}
      <FinalCTA onContactClick={onOpenContactModal} />
    </div>
  );
}
