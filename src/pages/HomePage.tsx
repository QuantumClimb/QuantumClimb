import { Reveal } from "../components/Reveal";
import { ArrowRight, Cpu, Video, Code, Mic, Gamepad2, Sparkles } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { FinalCTA } from "../sections/ClosureSections";

type HomePageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateAIDubbing: () => void;
  onNavigateAIVideo: () => void;
  onNavigateWebDev: () => void;
}>;

export function HomePage({ onOpenContactModal, onNavigateAIDubbing, onNavigateAIVideo, onNavigateWebDev }: HomePageProps) {
  const services = [
    { 
      id: "automation", 
      icon: <Cpu className="w-8 h-8 text-purple-600" />, 
      title: "Automation for Creative Media", 
      desc: "Streamline your creative workflows with AI-driven automation. From asset management to automated editing pipelines." 
    },
    { 
      id: "video", 
      icon: <Video className="w-8 h-8 text-purple-600" />, 
      title: "AI Generated Video", 
      desc: "High-quality, realistic or stylized video content generated entirely by AI models. Perfect for marketing, social media, and internal comms.",
      action: onNavigateAIVideo,
      actionText: "Explore AI Video"
    },
    { 
      id: "software", 
      icon: <Code className="w-8 h-8 text-purple-600" />, 
      title: "AI-Created Software & Apps", 
      desc: "Custom web applications and software solutions designed, coded, and managed by advanced AI systems.",
      action: onNavigateWebDev,
      actionText: "Explore Web Dev"
    },
    { 
      id: "dubbing", 
      icon: <Mic className="w-8 h-8 text-purple-600" />, 
      title: "AI Dubbing & Voice Cloning", 
      desc: "Enterprise-grade AI dubbing, perfect lip-sync, and cultural adaptation for global media leaders.",
      action: onNavigateAIDubbing,
      actionText: "Explore AI Dubbing"
    },
    { 
      id: "gamification", 
      icon: <Gamepad2 className="w-8 h-8 text-purple-600" />, 
      title: "Gamification", 
      desc: "Transform standard interactions into engaging digital experiences with AI-driven gamification strategies." 
    },
    { 
      id: "studiofication", 
      icon: <Sparkles className="w-8 h-8 text-purple-600" />, 
      title: "Studiofication", 
      desc: "Elevate your brand with studio-quality assets, branding, and content powered by intelligent generative models." 
    }
  ];

  return (
    <>
      <section className="relative pt-40 pb-32 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal type="mask" className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              AI First Agency
            </span>
          </Reveal>

          <Reveal type="mask" className="mb-8">
            <h1 className="text-6xl md:text-[120px] font-medium tracking-tighter text-white leading-[0.82] uppercase">
              Quantum <br />
              <span className="text-zinc-500 italic font-serif">Intelligence</span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.2} className="mb-12">
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
              The future of digital creation is here. We are an AI-first agency building the next generation of creative tools, media, and digital experiences.
            </p>
          </Reveal>
          
          <Reveal type="fade-up" delay={0.3}>
            <button
              onClick={onOpenContactModal}
              className="px-12 py-5 bg-white text-black font-bold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-sm"
            >
              Partner with Quantum
            </button>
          </Reveal>
        </div>
      </section>

      <section className="py-32 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="Our Capabilities"
            title="The Quantum Ecosystem"
            subtitle="Explore our comprehensive suite of AI-native services designed to scale your digital presence."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Reveal key={service.id} type="fade-up" delay={0.05 * index} className="group relative">
                <div className="h-full bg-black border border-white/10 p-10 hover:border-purple-600/50 transition-all duration-500 flex flex-col">
                  <div className="mb-8 w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-zinc-500 leading-relaxed mb-8 flex-1">{service.desc}</p>
                  
                  {service.action ? (
                    <button 
                      onClick={service.action}
                      className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-colors font-medium text-sm tracking-wide uppercase mt-auto"
                    >
                      {service.actionText} <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={onOpenContactModal}
                      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium text-sm tracking-wide uppercase mt-auto opacity-0 group-hover:opacity-100"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
