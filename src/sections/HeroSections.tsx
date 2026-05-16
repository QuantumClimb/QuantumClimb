import { Reveal } from "../components/Reveal";
import { MediaPlayer } from "../components/MediaPlayer";
import type { SiteVideo } from "../lib/supabase";

type ContactActionProps = Readonly<{
  onContactClick: () => void;
  onPortfolioClick?: () => void;
}>;

export function Hero({ onContactClick, onPortfolioClick, siteVideos }: ContactActionProps & { siteVideos: SiteVideo[] }) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <Reveal type="mask" className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              Enterprise AI Dubbing v4.2
            </span>
          </Reveal>

          <Reveal type="mask" className="mb-8">
            <h1 className="text-6xl md:text-[120px] font-medium tracking-tighter text-white leading-[0.82] uppercase">
              Unlock <br />
              <span className="text-zinc-500 italic font-serif">the world</span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.2} className="mb-12">
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Ascend beyond language barriers. Quantum Climb delivers studio-grade AI dubbing,
              perfect lip-sync, and cultural adaptation for global media leaders.
            </p>
          </Reveal>

        </div>

        {/* Media Player */}
        <Reveal type="fold" delay={0.4} className="relative max-w-6xl mx-auto">
          <MediaPlayer videos={siteVideos} />
        </Reveal>
      </div>
    </section>
  );
}

type CTASectionProps = Readonly<ContactActionProps & {
  title: string;
  subtitle: string;
  buttonText?: string;
}>;

export function CTASection({
  title,
  subtitle,
  buttonText = "Contact Quantum",
  onContactClick,
}: CTASectionProps) {
  return (
    <section className="py-24 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6 text-center">
        <Reveal type="mask" className="mb-6">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white leading-tight">
            {title}
          </h2>
        </Reveal>
        <Reveal type="fade-up" delay={0.2} className="mb-10">
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{subtitle}</p>
        </Reveal>
        <Reveal type="fade-up" delay={0.3}>
          <button
            onClick={onContactClick}
            className="px-12 py-5 bg-white text-black font-bold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-sm"
          >
            {buttonText}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
