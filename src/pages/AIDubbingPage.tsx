import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { 
  ArrowRight, 
  ArrowDown,
  Check, 
  Globe, 
  Video, 
  Smartphone, 
  Workflow, 
  Sparkles,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  X,
  Play
} from "lucide-react";
import type { SiteVideo } from "../lib/supabase";

const FALLBACK_DUBBING_VIDEOS: SiteVideo[] = [
  {
    id: "fallback-dubbing-1",
    section: "media_player",
    video_url: "https://youtu.be/Muvmwr1xq7g",
    thumbnail_url: null,
    title: "Breaking Bad",
    description: "Walter White’s iconic transformation—now in Tamil. Experience intensity, rhythm, and lip sync aligned to perfection.",
    sort_order: 10,
    created_at: "2026-04-30T06:38:33.920Z",
    updated_at: "2026-04-30T06:38:33.920Z"
  },
  {
    id: "fallback-dubbing-2",
    section: "media_player",
    video_url: "https://youtu.be/tzcutphf9gM",
    thumbnail_url: null,
    title: "Avengers: Infinity War",
    description: "Earth’s mightiest heroes—now speaking Hindi. This scene showcases seamless AI dubbing with natural lip sync, preserving tone, timing, and character dynamics across languages.",
    sort_order: 20,
    created_at: "2026-04-30T06:41:47.914Z",
    updated_at: "2026-04-30T06:41:47.914Z"
  },
  {
    id: "fallback-dubbing-3",
    section: "media_player",
    video_url: "https://youtu.be/iiiE8yREdgs",
    thumbnail_url: null,
    title: "The Matrix",
    description: "One of cinema’s most iconic choices—reborn in Japanese. Watch how tone, tension, and philosophical weight are preserved through AI-driven dubbing and lip sync.",
    sort_order: 30,
    created_at: "2026-04-30T06:42:22.766Z",
    updated_at: "2026-04-30T06:42:22.766Z"
  },
  {
    id: "fallback-dubbing-4",
    section: "media_player",
    video_url: "https://youtu.be/aaTPdqDnKIc",
    thumbnail_url: null,
    title: "Pixar Compilation",
    description: "A montage of beloved animated moments—reimagined in Hindi. Demonstrates scalability across multiple clips, voices, and tones with consistent quality.",
    sort_order: 40,
    created_at: "2026-04-30T06:42:47.273Z",
    updated_at: "2026-04-30T06:42:47.273Z"
  },
  {
    id: "fallback-dubbing-5",
    section: "media_player",
    video_url: "https://youtu.be/u0ecqxZ5o_k",
    thumbnail_url: null,
    title: "Scent of a Woman",
    description: "A legendary monologue delivered in Russian—capturing every beat of conviction and emotion. AI dubbing that respects performance integrity.",
    sort_order: 50,
    created_at: "2026-04-30T06:43:12.129Z",
    updated_at: "2026-04-30T06:43:12.129Z"
  },
  {
    id: "fallback-dubbing-6",
    section: "media_player",
    video_url: "https://youtu.be/EzI5SJxsSng",
    thumbnail_url: null,
    title: "Mad Men",
    description: "A defining moment of Don Draper—recreated in Spanish with precise emotional carryover and lip-synced delivery. Subtlety, cadence, and performance remain intact.",
    sort_order: 60,
    created_at: "2026-04-30T06:43:35.673Z",
    updated_at: "2026-04-30T06:43:35.673Z"
  },
  {
    id: "fallback-dubbing-7",
    section: "media_player",
    video_url: "https://youtu.be/w2TQbqzIo5c",
    thumbnail_url: null,
    title: "Transformers One",
    description: "Optimus Prime’s judgment, Megatron’s fall—now in Hindi. This sample demonstrates high-intensity dubbing with synchronized facial animation and emotional continuity.",
    sort_order: 70,
    created_at: "2026-04-30T06:44:11.007Z",
    updated_at: "2026-04-30T06:44:11.007Z"
  },
  {
    id: "fallback-dubbing-8",
    section: "media_player",
    video_url: "https://youtu.be/ROcAiBo4fb4",
    thumbnail_url: null,
    title: "Invincible",
    description: "A commanding Viltrumite Council sequence—now in Hindi. This sample highlights authoritative dialogue delivery, tonal precision, and clean lip sync across a stylized animated scene.",
    sort_order: 80,
    created_at: "2026-04-30T06:46:01.751Z",
    updated_at: "2026-04-30T06:46:01.751Z"
  }
];

// Editorial Achievements text mapping to create immersive case studies
const CASE_STUDY_METADATA: Record<string, { lang: string; format: string; achievement: string }> = {
  "fallback-dubbing-1": {
    lang: "Tamil Localization",
    format: "AI Dubbing + Lip Sync",
    achievement: "Quantum Climb achieved perfect voice matching of Bryan Cranston's gritty timbre while synchronizing local Tamil dialect delivery with the character's facial performance."
  },
  "fallback-dubbing-2": {
    lang: "Hindi Localization",
    format: "AI Dubbing + Lip Sync",
    achievement: "Preserved the multi-character voice profiles (Iron Man, Thor, Thanos) with native-level Hindi voice matching, maintaining high-fidelity audio finishing over background scoring."
  },
  "fallback-dubbing-3": {
    lang: "Japanese Localization",
    format: "AI Dubbing + Lip Sync",
    achievement: "Retained the philosophical gravitas and whispered tones of Morpheus, matching the precise cadence of Japanese dialogue with zero dialogue overlap issues."
  },
  "fallback-dubbing-4": {
    lang: "Hindi Localization",
    format: "AI Dubbing + Voice Matching",
    achievement: "Successfully batch-localised character voices ranging from high-pitched animated creatures to deep voices, delivering natural local phrasing."
  },
  "fallback-dubbing-5": {
    lang: "Russian Localization",
    format: "Voice Localization",
    achievement: "Preserved Al Pacino's legendary theatrical conviction, raspy vocal dynamic, and rapid speech pacing, translating high-intensity legal monologues cleanly."
  },
  "fallback-dubbing-6": {
    lang: "Spanish Localization",
    format: "AI Dubbing + Lip Sync",
    achievement: "Captured Don Draper's smooth, advertising executive voice identity in Spanish, retaining the low-key dramatic tension of the boardroom monologue."
  },
  "fallback-dubbing-7": {
    lang: "Hindi Localization",
    format: "AI Dubbing + Lip Sync",
    achievement: "Localised cinematic sci-fi dialogues for mechanical characters, aligning bass output and vocal synthetic effects with native language voice profiles."
  },
  "fallback-dubbing-8": {
    lang: "Hindi Localization",
    format: "AI Dubbing + Lip Sync",
    achievement: "Mapped authoritative animated vocal performances to Hindi voice match vectors, sustaining rapid animation facial synchronization and zero dialogue clipping."
  }
};

type AIDubbingPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigatePortfolio: () => void;
  siteVideos: SiteVideo[];
}>;

export function AIDubbingPage({ onOpenContactModal, onNavigatePortfolio, siteVideos }: AIDubbingPageProps) {
  const dubbingVideos = siteVideos.filter((v) => v.section === "media_player");
  const displayVideos = dubbingVideos.length > 0 ? dubbingVideos : FALLBACK_DUBBING_VIDEOS;
  
  // Track active featured POC video
  const [activeVideo, setActiveVideo] = useState<SiteVideo>(displayVideos[0]);

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

  // Get active case study details
  const activeMeta = CASE_STUDY_METADATA[activeVideo.id] || {
    lang: "Multilingual adaptation",
    format: "AI Dubbing + Lip Sync",
    achievement: "Delivered natural delivery, clean speech synchronization, and consistent vocal characteristics matching original recordings."
  };

  const scrollToSection = (id: string) => {
    const el = globalThis.document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-x-hidden bg-[#050307] text-zinc-300">
      
      {/* 01 — HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-black">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/30 to-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <img 
            src="/images/Quantum%20Climb%20%20-Hero%20Visual.png" 
            alt="Cinematic Dubbing Background" 
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          {/* Technical grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] z-10 opacity-30"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Reveal type="mask">
              <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                AI DUBBING / VOICE / LOCALIZATION
              </span>
            </Reveal>

            <Reveal type="mask">
              <h1 className="text-7xl md:text-[110px] font-medium tracking-tighter text-white leading-[0.85] uppercase">
                UNLOCK <br />
                <span className="text-zinc-500 italic font-serif">THE WORLD.</span>
              </h1>
            </Reveal>

            <Reveal type="fade-up" delay={0.2}>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                High-quality AI dubbing, voice cloning, lip-sync and multilingual adaptation for global media.
              </p>
            </Reveal>
            
            <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onOpenContactModal}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 border border-white cursor-pointer"
              >
                LOCALIZE YOUR CONTENT <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToSection("featured-poc")}
                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-semibold tracking-tight hover:border-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                WATCH THE WORK <ArrowDown className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — FEATURED POC & CASE STUDY */}
      <section id="featured-poc" className="py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="mb-10 space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">FEATURED CASE STUDY</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">The proof is in the work</h2>
            </div>

            {/* Layout: Left/Large Video, Right/Metadata Details */}
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
              
              {/* Left Column: Media Player */}
              <div className="relative border border-white/10 bg-black aspect-[16/9] overflow-hidden">
                <iframe
                  src={getEmbedUrl(activeVideo.video_url)}
                  title={activeVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Right Column: Case Study Metadata */}
              <div className="flex flex-col justify-between border border-white/10 bg-zinc-950/60 p-8 space-y-6">
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">FEATURED POC</span>
                    <h3 className="text-2xl font-semibold text-white uppercase tracking-tight">{activeVideo.title}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 text-xs font-mono">
                    <div>
                      <span className="text-zinc-600 block mb-0.5 uppercase text-[9px]">LANGUAGE</span>
                      <span className="text-purple-300 font-medium">{activeMeta.lang}</span>
                    </div>
                    <div>
                      <span className="text-zinc-600 block mb-0.5 uppercase text-[9px]">FORMAT</span>
                      <span className="text-purple-300 font-medium">{activeMeta.format}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">DESCRIPTION</span>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">{activeVideo.description}</p>
                  </div>
                </div>

                {/* Performance / Result Statement */}
                <div className="border-t border-white/5 pt-6 space-y-2">
                  <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block">QUANTUM CLIMB DELIVERABLE</span>
                  <p className="text-xs text-white leading-relaxed font-light whitespace-pre-wrap">{activeMeta.achievement}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 03 — POC COLLECTION */}
      <section className="py-24 border-b border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">THE WORK</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">Selected demonstrations</h2>
              <p className="text-xs text-zinc-500 max-w-md">Selected demonstrations of AI-powered localization across film, television and digital content.</p>
            </div>

            {/* Grid of POC Items */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayVideos.map(video => {
                const isActive = activeVideo.id === video.id;
                const meta = CASE_STUDY_METADATA[video.id] || { lang: "Adaptation", format: "Localization" };
                
                return (
                  <button
                    key={video.id}
                    onClick={() => {
                      setActiveVideo(video);
                      scrollToSection("featured-poc");
                    }}
                    className={`text-left border transition-all duration-300 group cursor-pointer relative flex flex-col justify-between ${
                      isActive 
                        ? "border-purple-600 bg-purple-600/5 shadow-[0_0_15px_rgba(124,43,255,0.08)]" 
                        : "border-white/5 bg-zinc-950/40 hover:border-white/20"
                    }`}
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="aspect-[16/9] w-full bg-zinc-900 overflow-hidden relative border-b border-white/5">
                        <img 
                          src={getYoutubeThumbnail(video.video_url)} 
                          alt={video.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 border border-white/20 bg-black/60 rounded-full flex items-center justify-center text-white group-hover:bg-purple-600 group-hover:border-purple-600 transition-all">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{meta.lang} // {meta.format}</span>
                          <h3 className="text-lg font-semibold text-white tracking-tight">{video.title}</h3>
                        </div>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{video.description}</p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="px-6 pb-6 pt-2">
                      <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase flex items-center gap-1.5 font-bold">
                        WATCH DEMONSTRATION <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 04 — PERFORMANCE (Built for Scale) */}
      <section className="py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">PERFORMANCE</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">Built for scale</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "120+", desc: "Languages supported" },
                { label: "90%", desc: "Efficiency gain vs traditional dubbing" },
                { label: "10x", desc: "Faster content turnaround" },
                { label: "99%", desc: "Voice match profile accuracy" },
                { label: "5x", desc: "Average content volume output" },
                { label: "100%", desc: "Secure studio pipeline guarantee" }
              ].map((stat, i) => (
                <div key={i} className="border border-white/10 bg-zinc-950/40 p-8 space-y-2">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight text-white block">{stat.label}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">{stat.desc}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 05 — CAPABILITIES ("Everything You Need for Global Content") */}
      <section className="py-24 border-b border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">CAPABILITIES</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">Everything you need for global content</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Voice Cloning", desc: "Preserve the unique vocal characteristics, timbre, and subtle performance nuances of the original actor's delivery." },
                { title: "Perfect Lip Sync", desc: "AI-powered visual adaptation that matches actor lip movements naturally to the localized target dialect dialogue." },
                { title: "30+ Target Languages", desc: "Expand catalog distribution instantly to major European, Asian, and Latin American regional target markets." },
                { title: "Automated Pipelines", desc: "Continuous processing systems engineered to localized thousands of video segments or full series catalogs efficiently." },
                { title: "Collaborative Review", desc: "Allows production supervisors to review speech, translation nuances, and finalize audio outputs prior to compile." },
                { title: "Multi-Format Export", desc: "Ready-to-deliver files compiled under studio specifications for broadcast, theater, streaming, or social networks." }
              ].map((cap, i) => (
                <div key={i} className="border border-white/10 bg-zinc-900/20 p-8 space-y-3">
                  <h3 className="text-lg font-medium text-white uppercase tracking-tight">{cap.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">{cap.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 06 — THE TECHNICAL EDGE */}
      <section className="py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">THE TECHNICAL EDGE</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">The business advantage</h2>
              <p className="text-xs text-zinc-500 max-w-md">The quality of the final production matters more than the technology behind it.</p>
            </div>

            {/* Comparison Matrix Table */}
            <div className="border border-white/10 bg-zinc-950/40 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                <thead>
                  <tr className="border-b border-white/10 uppercase font-mono tracking-widest text-zinc-500 text-[10px]">
                    <th className="p-5 font-medium">Metric</th>
                    <th className="p-5 font-medium bg-zinc-900/20">Traditional Localization</th>
                    <th className="p-5 font-medium text-purple-400">Quantum Climb</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { metric: "Voice Consistency", trad: "Varies significantly by hired local voice actors.", qc: "Perfect match retaining original actor vocal timbre." },
                    { metric: "Language Coverage", trad: "Limited strictly to regional voice talent pools.", qc: "120+ languages supported instantly via AI profiles." },
                    { metric: "Turnaround Time", trad: "Weeks or months of booking, recording, and editing.", qc: "Fast delivery (hours/days), automated lip-sync render." },
                    { metric: "Production Scale", trad: "High overhead costs prevent multi-market adaptations.", qc: "Batch processing translates catalog libraries seamlessly." },
                    { metric: "Lip Synchronization", trad: "Manual scripting adaptations, visually loose matches.", qc: "AI-driven visual lip-sync aligned to target phonemes." },
                    { metric: "Review & Adjustments", trad: "Extremely costly studio re-recordings.", qc: "Real-time speech edits, translations, and fast output render." },
                    { metric: "Output Quality", trad: "Subjective variations in vocal performances.", qc: "Studio-grade mixes validated via automatic algorithms." }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-5 font-medium text-white">{row.metric}</td>
                      <td className="p-5 text-zinc-500 bg-zinc-900/10">{row.trad}</td>
                      <td className="p-5 text-white font-medium">{row.qc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* 07 — INDUSTRIES ("Built for Every Industry") */}
      <section className="py-24 border-b border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">INDUSTRIES</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">Built for every industry</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Film & Television", img: "/images/AI%20VIDEO1.png" },
                { title: "E-Learning", img: "/images/Studification.png" },
                { title: "Content Creators", img: "/images/Quantum%20Climb%20%20-Hero%20Visual.png" },
                { title: "Advertising", img: "/images/Build%20a%20Website%20CTA..png" },
                { title: "Corporate Communications", img: "/images/Automation.png" },
                { title: "Media & Entertainment", img: "/images/AI%20Dubbing%20-Voice.png" }
              ].map((ind, i) => (
                <div key={i} className="border border-white/10 bg-zinc-950/40 overflow-hidden relative group">
                  <div className="aspect-[16/10] w-full bg-zinc-900 overflow-hidden relative">
                    <img 
                      src={ind.img} 
                      alt={ind.title} 
                      className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-6 absolute bottom-0 left-0 right-0">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{ind.title}</h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 08 — LARGE CINEMATIC IMAGE */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-10"></div>
          <img 
            src="/images/Quantum%20Climb%20%20-Hero%20Visual.png" 
            alt="Cinematic screening room" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] z-10 opacity-20"></div>
        </div>
        <div className="relative z-20 text-center max-w-2xl px-6 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">STUDIO PIPELINE</span>
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-white uppercase leading-snug">
            Enterprise scale. Studio quality. <br />
            <span className="text-zinc-500 italic font-serif">Made for global screens.</span>
          </p>
        </div>
      </section>

      {/* 09 — CTA (Ready to Go Global?) */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute inset-0 animate-pulse" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase block">READY TO GO GLOBAL?</span>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white uppercase leading-[0.9]">
                Your content <br />
                deserves a <br />
                <span className="text-zinc-500 italic font-serif">bigger audience.</span>
              </h2>
              <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed pt-2">
                Bring us your content and we'll help you take it to new markets.
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
