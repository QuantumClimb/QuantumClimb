import { Reveal } from "../components/Reveal";
import { TechCanvas } from "../components/TechCanvas";
import { FinalCTA } from "../sections/ClosureSections";
import { 
  ArrowRight, 
  Mic, 
  Video, 
  Code, 
  Sliders, 
  Sparkles,
  ChevronRight
} from "lucide-react";

type ServicesPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateAIDubbing: () => void;
  onNavigateAIVideo: () => void;
  onNavigateWebDev: () => void;
  onNavigateAudioSoftware: () => void;
}>;

export function ServicesPage({
  onOpenContactModal,
  onNavigateAIDubbing,
  onNavigateAIVideo,
  onNavigateWebDev,
  onNavigateAudioSoftware,
}: ServicesPageProps) {
  const services = [
    {
      id: "ai-dubbing",
      number: "01",
      title: "AI DUBBING & LOCALIZATION",
      category: "VOICE SYNTHESIS & LOCALIZATION",
      description: "Multilingual dubbing, voice localization and audio post-production for global content.",
      icon: <Mic className="w-5 h-5 text-purple-400" />,
      action: onNavigateAIDubbing,
      buttonText: "EXPLORE AI DUBBING",
      image: "/images/AI Dubbing -Voice.png",
      tags: ["Voice Cloning", "Lip-Sync Alignment", "Studio Post-Production", "Multilingual Delivery"]
    },
    {
      id: "ai-video",
      number: "02",
      title: "AI VIDEO",
      category: "GENERATIVE VIDEO & VISUAL MEDIA",
      description: "AI-powered video production, branded content, campaigns and visual experiences.",
      icon: <Video className="w-5 h-5 text-purple-400" />,
      action: onNavigateAIVideo,
      buttonText: "EXPLORE AI VIDEO",
      image: "/images/AI VIDEO1.png",
      tags: ["Cinematic Generation", "Branded Campaigns", "Concept Films", "Visual Synthesis"]
    },
    {
      id: "web-dev",
      number: "03",
      title: "WEB DEVELOPMENT",
      category: "DIGITAL ARCHITECTURE & SYSTEMS",
      description: "Modern websites, web applications, CMS platforms and custom digital solutions.",
      icon: <Code className="w-5 h-5 text-purple-400" />,
      action: onNavigateWebDev,
      buttonText: "EXPLORE WEB DEVELOPMENT",
      image: "/images/Build a Website CTA..png",
      tags: ["Custom Web Apps", "Performance Architecture", "CMS Platforms", "Interactive 3D/UI"]
    },
    {
      id: "audio-software",
      number: "04",
      title: "AUDIO SOFTWARE & PLUGIN DEVELOPMENT",
      category: "DSP & INTELLIGENT AUDIO SYSTEMS",
      description: "Custom audio software, VST3 plugins, DSP systems and intelligent music technology.",
      icon: <Sliders className="w-5 h-5 text-purple-400" />,
      action: onNavigateAudioSoftware,
      buttonText: "EXPLORE AUDIO SOFTWARE",
      image: "/images/Audio plugins/qhuman_cover4.png",
      tags: ["VST3 Architecture", "DSP Algorithms", "Vocal Humanization", "Music Intelligence"]
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
        {/* Background Visual and Overlays */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-zinc-950/60 to-black z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,_var(--tw-gradient-stops))] from-black/90 via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-zinc-950/20 pointer-events-none z-10" />
          <img 
            src="/images/Quantum Climb  -Hero Visual.png" 
            alt="Quantum Climb Services" 
            className="w-full h-full object-cover opacity-25 brightness-110"
            referrerPolicy="no-referrer"
          />
          <TechCanvas />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto">
          <Reveal type="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-purple-500/30 backdrop-blur-md text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              QUANTUM CLIMB / SERVICES
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase max-w-4xl leading-[1.05] mb-8">
              WHAT WE DO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-purple-400">
                FOR CLIENTS.
              </span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.2}>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-6 font-light drop-shadow-sm">
              Specialized services delivering AI dubbing and voice localization, AI video production, modern web architecture, and custom audio software engineering.
            </p>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              End-to-End Creative Technology & Engineering
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services List / Gateway Cards */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col gap-12 sm:gap-16">
          {services.map((service, index) => (
            <Reveal key={service.id} type="fade-up" delay={index * 0.1}>
              <div className="relative border border-white/10 bg-gradient-to-b from-zinc-950/80 to-black p-6 sm:p-10 lg:p-12 group hover:border-purple-500/40 transition-all duration-500 overflow-hidden">
                {/* Subtle top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-transparent opacity-80" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Details & Action */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 font-mono text-xs font-semibold tracking-wider uppercase border border-purple-500/30">
                          SERVICE {service.number}
                        </span>
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                          {service.category}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-4">
                        {service.title}
                      </h2>

                      <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 font-light max-w-xl">
                        {service.description}
                      </p>

                      {/* Capabilities pill tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-zinc-900/80 border border-white/5 text-[11px] font-mono text-zinc-400 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={service.action}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-purple-600 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer border border-white hover:border-purple-600"
                      >
                        <span>{service.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview */}
                  <div className="lg:col-span-5">
                    <div 
                      onClick={service.action}
                      className="relative border border-white/10 bg-zinc-950 overflow-hidden aspect-video sm:aspect-[4/3] flex items-center justify-center cursor-pointer group/img"
                    >
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover brightness-90 group-hover/img:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-zinc-300">
                        <span className="px-2 py-0.5 bg-black/80 border border-white/10 flex items-center gap-1.5">
                          {service.icon}
                          <span>QUANTUM CLIMB</span>
                        </span>
                        <span className="text-purple-400 group-hover/img:translate-x-1 transition-transform flex items-center gap-1">
                          VIEW SERVICE <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closure CTA */}
      <FinalCTA onContactClick={onOpenContactModal} />
    </div>
  );
}
