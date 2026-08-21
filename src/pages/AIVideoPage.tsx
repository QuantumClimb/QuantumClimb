import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { FinalCTA } from "../sections/ClosureSections";
import { MediaPlayer } from "../components/MediaPlayer";
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

type AIVideoPageProps = Readonly<{
  onOpenContactModal: () => void;
  siteVideos: SiteVideo[];
}>;

export function AIVideoPage({ onOpenContactModal, siteVideos }: AIVideoPageProps) {
  const aiVideos = siteVideos.filter((v) => v.section === "ai_video");
  const displayVideos = aiVideos.length > 0 ? aiVideos : FALLBACK_AI_VIDEOS;

  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal type="mask" className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              AI Video Generation
            </span>
          </Reveal>
          <Reveal type="mask" className="mb-8">
            <h1 className="text-6xl md:text-[100px] font-medium tracking-tighter text-white leading-[0.85] uppercase">
              Visual <br />
              <span className="text-zinc-500 italic font-serif">Mastery</span>
            </h1>
          </Reveal>
          <Reveal type="fade-up" delay={0.2} className="mb-12">
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
              High-quality, realistic or stylized video content generated entirely by AI models. Perfect for marketing, social media, and internal communications.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="Our Work"
            title="Video Portfolio"
            subtitle="Explore our recent AI-generated video campaigns and content."
          />
          <Reveal type="fold" delay={0.2} className="relative max-w-6xl mx-auto">
            <MediaPlayer videos={displayVideos} />
          </Reveal>
        </div>
      </section>

      <FinalCTA onContactClick={onOpenContactModal} />
    </>
  );
}
