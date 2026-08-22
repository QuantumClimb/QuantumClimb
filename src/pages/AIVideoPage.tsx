import { useState } from "react";
import { TechCanvas } from "../components/TechCanvas";
import { Reveal } from "../components/Reveal";
import { 
  ArrowRight, 
  ArrowDown, 
  Check, 
  Video, 
  Code, 
  Smartphone, 
  Workflow, 
  Sparkles,
  Play,
  X
} from "lucide-react";
import type { SiteVideo } from "../lib/supabase";

const FALLBACK_AI_VIDEOS: SiteVideo[] = [
  {
    id: "fallback-ai-1",
    section: "ai_video",
    video_url: "https://youtu.be/Xd6rmbOdbtM",
    thumbnail_url: null,
    title: "The Man They Forgot",
    description: "A compelling generative cinematic narrative exploring memory, isolation, and identity. Demonstrates high-fidelity character consistency and emotive rendering.",
    sort_order: 10,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  },
  {
    id: "fallback-ai-2",
    section: "ai_video",
    video_url: "https://youtu.be/c04guCARiAw",
    thumbnail_url: null,
    title: "Magnificent Trillionaire Trailer",
    description: "High-octane stylized movie trailer showing rich environment design, dynamic lighting, and cinematic camera movements generated entirely by AI.",
    sort_order: 20,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  },
  {
    id: "fallback-ai-3",
    section: "ai_video",
    video_url: "https://youtu.be/HaGDECVjp3Q",
    thumbnail_url: null,
    title: "FlameBorne Trailer",
    description: "Epic dark fantasy teaser trailer showcasing advanced physics simulations, creature generation, and atmospheric VFX rendering.",
    sort_order: 30,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  },
  {
    id: "fallback-ai-4",
    section: "ai_video",
    video_url: "https://youtu.be/NnY0NHpf2tw",
    thumbnail_url: null,
    title: "Chumpa Family Ep1",
    description: "A charming, highly consistent AI-generated animated pilot. Highlights character expression, narrative pacing, and seamless scene transitions.",
    sort_order: 40,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  },
  {
    id: "fallback-ai-5",
    section: "ai_video",
    video_url: "https://youtu.be/NjEWUsSJtoE",
    thumbnail_url: null,
    title: "Pause for Tea TVC",
    description: "A sleek, photorealistic television commercial demonstration showcasing fluid simulations, premium product aesthetics, and high-fidelity food rendering.",
    sort_order: 50,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  },
  {
    id: "fallback-ai-6",
    section: "ai_video",
    video_url: "https://youtu.be/Ny8IhqV5lCk",
    thumbnail_url: null,
    title: "WilQ AI",
    description: "Sci-Fi conceptual showcase displaying abstract architectural generation, hyper-futuristic UI overlays, and complex mechanical animations.",
    sort_order: 60,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  },
  {
    id: "fallback-ai-7",
    section: "ai_video",
    video_url: "https://youtu.be/MY8x6D3vypI",
    thumbnail_url: null,
    title: "River Raft B2B",
    description: "Corporate B2B visualization displaying realistic water dynamics, outdoor lighting adaptation, and human action synthesis.",
    sort_order: 70,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  },
  {
    id: "fallback-ai-8",
    section: "ai_video",
    video_url: "https://youtu.be/VwwqaBtVogc",
    thumbnail_url: null,
    title: "Pet's Day Out",
    description: "A heartwarming, stylized family animation test showcasing fur rendering, complex animal movements, and expressive character acting.",
    sort_order: 80,
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z"
  }
];

// Mapping fallback categories for existing videos
const VIDEO_METADATA: Record<string, { category: string; description: string }> = {
  "fallback-ai-1": {
    category: "Generative Cinema",
    description: "A compelling generative cinematic narrative exploring memory, isolation, and identity. Demonstrates high-fidelity character consistency and emotive rendering."
  },
  "fallback-ai-2": {
    category: "Brand Film",
    description: "High-octane stylized movie trailer showing rich environment design, dynamic lighting, and cinematic camera movements generated entirely by AI."
  },
  "fallback-ai-3": {
    category: "Generative Cinema",
    description: "Epic dark fantasy teaser trailer showcasing advanced physics simulations, creature generation, and atmospheric VFX rendering."
  },
  "fallback-ai-4": {
    category: "AI Film",
    description: "A charming, highly consistent AI-generated animated pilot. Highlights character expression, narrative pacing, and seamless scene transitions."
  },
  "fallback-ai-5": {
    category: "Product Film",
    description: "A sleek, photorealistic television commercial demonstration showcasing fluid simulations, premium product aesthetics, and high-fidelity food rendering."
  },
  "fallback-ai-6": {
    category: "Visual Study",
    description: "Sci-Fi conceptual showcase displaying abstract architectural generation, hyper-futuristic UI overlays, and complex mechanical animations."
  },
  "fallback-ai-7": {
    category: "Product Film",
    description: "Corporate B2B visualization displaying realistic water dynamics, outdoor lighting adaptation, and human action synthesis."
  },
  "fallback-ai-8": {
    category: "AI Film",
    description: "A heartwarming, stylized family animation test showcasing fur rendering, complex animal movements, and expressive character acting."
  }
};

type AIVideoPageProps = Readonly<{
  onOpenContactModal: () => void;
  siteVideos: SiteVideo[];
}>;

export function AIVideoPage({ onOpenContactModal, siteVideos }: AIVideoPageProps) {
  const aiVideos = siteVideos.filter((v) => v.section === "ai_video");
  const displayVideos = aiVideos.length > 0 ? aiVideos : FALLBACK_AI_VIDEOS;
  
  // Track active featured video (Default: first video)
  const [featuredVideo, setFeaturedVideo] = useState<SiteVideo>(displayVideos[0]);

  const getEmbedUrl = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const getYoutubeThumbnail = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
      }
      return "";
    } catch {
      return "";
    }
  };

  const getVideoCategory = (video: SiteVideo) => {
    return VIDEO_METADATA[video.id]?.category || "Generative Cinema";
  };

  const scrollToSection = (id: string) => {
    const el = globalThis.document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-x-hidden bg-[#050307] text-zinc-300">
      
      {/* 01 — HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-black pt-28 md:pt-0">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <img 
            src="/images/aivideo/create%20the%20impossible.png" 
            alt="Cinematic generative visual creation" 
            className="w-full h-full object-cover opacity-35 brightness-125 animate-ken-burns"
            referrerPolicy="no-referrer"
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] z-10 opacity-30"></div>
          <TechCanvas />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Reveal type="mask" className="flex justify-center">
              <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                AI VIDEO / FILM / GENERATIVE PRODUCTION
              </span>
            </Reveal>

            <Reveal type="mask">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[110px] font-medium tracking-tighter text-white leading-[0.85] uppercase">
                WHAT DO YOU <br />
                WANT TO <span className="text-zinc-500 italic font-serif">CREATE?</span>
              </h1>
            </Reveal>

            <Reveal type="fade-up" delay={0.2} className="space-y-4">
              <p className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
                Bring us an idea, campaign, product, song or story. Quantum Climb transforms it into cinematic visual content through creative direction, generative production and professional post-production.
              </p>
              <p className="text-xs text-zinc-500 font-mono tracking-wider">
                You don't need to know which AI tool to use. Tell us what you want to make.
              </p>
            </Reveal>
            
            <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onOpenContactModal}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 border border-white cursor-pointer"
              >
                START A PROJECT →
              </button>
              
              <button
                onClick={() => scrollToSection("featured-video")}
                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-semibold tracking-tight hover:border-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                WATCH OUR WORK ↓
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — FEATURED VIDEO */}
      <section id="featured-video" className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="mb-10 space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">FEATURED WORK</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">SEE WHAT'S POSSIBLE.</h2>
            </div>

            {/* Layout: Left/Large Video, Right/Metadata */}
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
              
              {/* Left Column: Video Player */}
              <div className="relative border border-white/10 bg-black aspect-[16/9] overflow-hidden w-full">
                <iframe
                  src={getEmbedUrl(featuredVideo.video_url)}
                  title={featuredVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Right Column: Case study info */}
              <div className="border border-white/10 bg-zinc-950/60 p-8 space-y-8 flex flex-col justify-between h-full min-h-[300px]">
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">FEATURED FILM</span>
                    <h3 className="text-2xl font-semibold text-white uppercase tracking-tight">{featuredVideo.title}</h3>
                  </div>

                  <div className="border-t border-b border-white/5 py-4">
                    <span className="text-zinc-600 block mb-0.5 uppercase text-[9px] font-mono">CATEGORY</span>
                    <span className="text-purple-300 font-mono text-xs font-medium">{getVideoCategory(featuredVideo)}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">DESCRIPTION</span>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">{featuredVideo.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection("featured-video")}
                  className="w-full py-4 border border-white/25 text-white font-semibold text-xs tracking-wider uppercase hover:border-white transition-all cursor-pointer text-center bg-transparent mt-4"
                >
                  WATCH FILM →
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 03 — SELECTED WORK */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">SELECTED WORK</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">THE WORK.</h2>
              <p className="text-xs text-zinc-500 max-w-md">Selected AI-powered films, visual experiments and creative productions from Quantum Climb.</p>
            </div>

            {/* Asymmetric layout gallery grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayVideos.map((video, idx) => {
                const category = getVideoCategory(video);
                
                return (
                  <button
                    key={video.id}
                    onClick={() => {
                      setFeaturedVideo(video);
                      scrollToSection("featured-video");
                    }}
                    className="text-left border border-white/5 bg-zinc-950/40 hover:border-white/20 transition-all duration-300 group cursor-pointer relative flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail Container */}
                      <div className="aspect-[16/9] w-full bg-zinc-900 overflow-hidden relative border-b border-white/5">
                        <img 
                          src={getYoutubeThumbnail(video.video_url)} 
                          alt={video.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 border border-white/20 bg-black/60 rounded-full flex items-center justify-center text-white group-hover:bg-purple-600 group-hover:border-purple-600 transition-all">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-zinc-500 tracking-wider block">0{idx + 1} // {category.toUpperCase()}</span>
                          <h3 className="text-lg font-semibold text-white tracking-tight">{video.title}</h3>
                        </div>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{video.description}</p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase flex items-center gap-1.5 font-bold">
                        WATCH <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 04 — WHAT CAN WE BUILD FOR YOU? */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">WHAT CAN WE BUILD FOR YOU?</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">YOU BRING THE IDEA.</h2>
              <p className="text-xs text-zinc-500 max-w-lg">
                You don't need an AI strategy. You need something created. Tell us what you want to make and we'll build the right production around it.
              </p>
            </div>

            {/* Visual project pathways grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { 
                  title: "I NEED A COMMERCIAL", 
                  img: "/images/aivideo/product%20commercial.png", 
                  desc: "Launch a product, tell a brand story or build a campaign film without the limitations of a conventional production.", 
                  cta: "CREATE A COMMERCIAL →" 
                },
                { 
                  title: "I NEED A BRAND FILM", 
                  img: "/images/aivideo/brand%20film.png", 
                  desc: "Turn your company, product or idea into a cinematic story built around identity, emotion and impact.", 
                  cta: "CREATE A BRAND FILM →" 
                },
                { 
                  title: "I NEED A MUSIC VIDEO", 
                  img: "/images/aivideo/music%20video.png", 
                  desc: "Build an entire visual world around a song, from live performance concepts to cinematic and surreal storytelling.", 
                  cta: "CREATE A MUSIC VIDEO →" 
                },
                { 
                  title: "I NEED A PRODUCT FILM", 
                  img: "/images/aivideo/cinematoc%20product.png", 
                  desc: "Transform a product into a cinematic visual experience for launches, advertising, websites and presentations.", 
                  cta: "SHOWCASE MY PRODUCT →" 
                },
                { 
                  title: "I NEED FASHION / LIFESTYLE CONTENT", 
                  img: "/images/aivideo/fashion%20show_lifestyle.png", 
                  desc: "Create fashion films, runway concepts and lifestyle campaigns inside visual worlds unrestricted by conventional locations.", 
                  cta: "CREATE MY CAMPAIGN →" 
                },
                { 
                  title: "I NEED CAMPAIGN CONTENT", 
                  img: "/images/aivideo/global%20campaign.png", 
                  desc: "Turn one creative direction into films, social content, vertical edits and campaign variations.", 
                  cta: "BUILD MY CAMPAIGN →" 
                },
                { 
                  title: "I NEED A CONCEPT FILM", 
                  img: "/images/aivideo/generative%20cinema.png", 
                  desc: "Visualize an environment, story, campaign or world before it exists in reality.", 
                  cta: "VISUALIZE MY IDEA →" 
                },
                { 
                  title: "I HAVE AN IDEA", 
                  img: "/images/aivideo/create%20the%20impossible.png", 
                  desc: "A script. A photograph. A sketch. A storyboard. Or simply something you can already see in your head.", 
                  cta: "TELL US THE IDEA →" 
                }
              ].map((path, idx) => (
                <button
                  key={idx}
                  onClick={onOpenContactModal}
                  className="text-left border border-white/10 bg-zinc-950/40 hover:border-purple-600/50 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  <div>
                    {/* Visual Card Header */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={path.img} 
                        alt={path.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent"></div>
                    </div>
                    {/* Visual details */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-sm font-semibold text-white tracking-wider">{path.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed font-light">{path.desc}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-2">
                    <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                      {path.cta}
                    </span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 05 — CREATE WHAT ONCE FELT IMPOSSIBLE */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            
            {/* Visual panel */}
            <div className="border border-white/10 bg-zinc-950 overflow-hidden relative aspect-[4/3] w-full">
              <img 
                src="/images/aivideo/generative%20cinema.png" 
                alt="Generative cinematic landscape creation" 
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Content Specifications */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">NEW POSSIBILITIES</span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white uppercase">SOME IDEAS SHOULDN'T BE LIMITED BY REALITY.</h2>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  Build worlds, locations, environments and visual concepts that once required enormous sets, travel, crews or complex VFX.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                {[
                  { title: "BUILD A WORLD", desc: "Create locations and environments that do not physically exist." },
                  { title: "VISUALIZE A CONCEPT", desc: "Turn ideas, scripts and storyboards into moving imagery." },
                  { title: "REIMAGINE A PRODUCT", desc: "Place products inside extraordinary visual environments." },
                  { title: "CREATE THE UNEXPECTED", desc: "Develop scenes designed to make audiences stop and watch." }
                ].map((spec, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{spec.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 06 — ONE IDEA. AN ENTIRE CAMPAIGN. (Content at Scale) */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            
            {/* Content Details */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">CONTENT AT SCALE</span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white uppercase">ONE IDEA. AN ENTIRE CAMPAIGN.</h2>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  A strong creative direction shouldn't end with one film. Quantum Climb can expand it across an entire content ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-[10px] font-mono text-zinc-400">
                {[
                  "HERO FILM", "30-SECOND CUT", "15-SECOND CUTDOWNS", "9:16 VERTICAL CONTENT",
                  "SOCIAL FILMS", "PRODUCT VARIATIONS", "MULTILINGUAL VERSIONS", "DIGITAL CAMPAIGN ASSETS"
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-500 rounded-full shrink-0"></span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-xl font-bold tracking-tight text-purple-300 uppercase">CREATE ONCE. EXPAND INTELLIGENTLY.</h3>
              </div>
            </div>

            {/* Visual Panel */}
            <div className="border border-white/10 bg-zinc-950 overflow-hidden relative aspect-[4/3] w-full">
              <img 
                src="/images/aivideo/global%20campaign.png" 
                alt="Multi-channel global campaigns asset visual" 
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 07 — CREATIVE DIFFERENCE */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            
            {/* Visual Panel */}
            <div className="border border-white/10 bg-zinc-950 overflow-hidden relative aspect-[4/3] w-full">
              <img 
                src="/images/aivideo/post%20production.png" 
                alt="Cinematic post-production workflow editing" 
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">THE CREATIVE DIFFERENCE</span>
                <h2 className="text-3xl font-medium tracking-tight text-white uppercase">AI IS THE TOOL. CREATIVITY IS THE DIFFERENCE.</h2>
                <div className="text-lg text-zinc-400 font-light space-y-2 pt-2">
                  <p className="font-semibold text-white">Generating content is easy.</p>
                  <p className="italic">Creating something worth watching is harder.</p>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-light pt-2">
                  Quantum Climb combines creative direction, storytelling, generative production, editing, sound and professional post-production to transform AI-generated material into finished creative work.
                </p>
              </div>

              {/* Compact capabilities list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/5 pt-6 text-[10px] font-mono text-zinc-400">
                {["CREATIVE DIRECTION", "STORYTELLING", "EDITING", "SOUND", "VISUAL CONSISTENCY", "HUMAN REVIEW"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 border border-white/10 bg-zinc-950/40 px-3 py-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 08 — WHO WE CREATE FOR */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">WHO WE CREATE FOR</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">IDEAS FROM EVERY INDUSTRY.</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "BRANDS & ADVERTISING", img: "/images/aivideo/product%20commercial.png", desc: "Commercials, product films and campaigns." },
                { title: "AUTOMOTIVE", img: "/images/aivideo/automative%20%20film.png", desc: "Vehicle campaigns, launches and cinematic product storytelling." }, // double space!
                { title: "MUSIC & ENTERTAINMENT", img: "/images/aivideo/music%20video.png", desc: "Music videos, artist films and visualizers." },
                { title: "FASHION & LIFESTYLE", img: "/images/aivideo/fashion%20show_lifestyle.png", desc: "Fashion films, runway experiences and lifestyle content." },
                { title: "FILM & MEDIA", img: "/images/aivideo/generative%20cinema.png", desc: "Concept films, visual development and cinematic experimentation." },
                { title: "BRAND / CORPORATE", img: "/images/aivideo/brand%20film.png", desc: "Brand stories, company films and visual communications." },
                { title: "GLOBAL CAMPAIGNS", img: "/images/aivideo/global%20campaign.png", desc: "Connected campaigns designed across multiple screens." }
              ].map((ind, i) => (
                <div key={i} className="border border-white/10 bg-zinc-950/40 overflow-hidden relative group flex flex-col justify-between">
                  <div className="aspect-[16/9] w-full bg-zinc-900 overflow-hidden relative">
                    <img 
                      src={ind.img} 
                      alt={ind.title} 
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">{ind.title}</h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{ind.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 09 — POST-PRODUCTION (Sound / Audio finishing) */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            
            {/* Details */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">BEYOND THE IMAGE</span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white uppercase">FILMS SHOULD SOUND AS GOOD AS THEY LOOK.</h2>
                <p className="text-xs text-zinc-500 leading-relaxed font-light pt-2">
                  Visuals are only half the experience. Quantum Climb combines image, voice, music, sound design, editing and professional post-production to create finished films.
                </p>
              </div>

              {/* Compact Labels */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/5 pt-6 text-[10px] font-mono text-zinc-400 text-center">
                {["VOICE", "MUSIC", "SOUND DESIGN", "EDITING", "MIXING", "LOCALIZATION"].map((label, idx) => (
                  <span key={idx} className="border border-white/10 bg-zinc-950/40 px-2 py-3 font-semibold tracking-wider">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Panel */}
            <div className="border border-white/10 bg-zinc-950 overflow-hidden relative aspect-[4/3] w-full">
              <img 
                src="/images/aivideo/post%20production.png" 
                alt="Sound engineering post-production finish" 
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 10 — CONNECT TO AI DUBBING */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">TAKE IT FURTHER</span>
            <h2 className="text-3xl font-medium tracking-tight text-white uppercase">CREATE IT ONCE. TAKE IT GLOBAL.</h2>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
              Once your film is created, Quantum Climb can take it into new markets through multilingual dubbing, voice localization and lip synchronization.
            </p>
            <div className="pt-4">
              <a
                href="/?page=ai-dubbing"
                className="inline-block px-8 py-4 bg-transparent border border-purple-500/30 text-purple-300 font-semibold text-xs tracking-wider uppercase hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
              >
                EXPLORE AI DUBBING →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — FINAL CTA */}
      <section className="py-16 md:py-32 bg-black relative overflow-hidden border-t border-white/5">
        {/* Full-bleed background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black z-10"></div>
          <img 
            src="/images/aivideo/final%20cta.png" 
            alt="Final visual production cta backdrop" 
            className="w-full h-full object-cover opacity-35 brightness-125 animate-ken-burns"
            referrerPolicy="no-referrer"
          />
          <TechCanvas />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase block">WHAT DO YOU WANT TO CREATE?</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tighter text-white uppercase leading-[0.9]">
                BRING US <br />
                THE IDEA. <br />
                <span className="text-zinc-500 italic font-serif">We'll make it move.</span>
              </h2>
              <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed pt-2">
                A commercial. A music video. A product launch. A campaign. A story. A world that doesn't exist yet. Tell us what you're imagining.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
              <button
                onClick={onOpenContactModal}
                className="w-full px-8 py-5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-colors cursor-pointer border border-white"
              >
                START A PROJECT →
              </button>
              <button
                onClick={onOpenContactModal}
                className="w-full px-8 py-5 bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-white transition-colors cursor-pointer"
              >
                TALK TO QUANTUM →
              </button>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}
