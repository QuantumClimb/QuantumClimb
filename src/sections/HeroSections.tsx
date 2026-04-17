import { Play } from "lucide-react";
import { Reveal } from "../components/Reveal";

type ContactActionProps = Readonly<{
  onContactClick: () => void;
  onPortfolioClick?: () => void;
}>;

export function Hero({ onContactClick, onPortfolioClick }: ContactActionProps) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal type="mask" className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              Enterprise AI Dubbing v4.2
            </span>
          </Reveal>

          <Reveal type="mask" className="mb-8">
            <h1 className="text-6xl md:text-[120px] font-medium tracking-tighter text-white leading-[0.82] uppercase">
              The Peak of <br />
              <span className="text-zinc-500 italic font-serif">Localization</span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.2} className="mb-12">
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Ascend beyond language barriers. Quantum Climb delivers studio-grade AI dubbing,
              perfect lip-sync, and cultural adaptation for global media leaders.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-sm"
            >
              Request Demo
            </button>
            <button
              onClick={onPortfolioClick}
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-purple-500/40 text-purple-300 font-bold tracking-tight hover:bg-purple-500/10 transition-colors duration-300 uppercase text-sm"
            >
              View Portfolio
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold tracking-tight hover:bg-white/5 transition-colors duration-300 flex items-center justify-center gap-2 uppercase text-sm">
              <Play size={16} fill="currentColor" />
              Watch Demo
            </button>
          </Reveal>

          <Reveal type="fold" delay={0.4} className="relative group max-w-6xl mx-auto">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600/20 to-blue-500/20 blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-zinc-900 border border-white/10 aspect-video flex items-center justify-center overflow-hidden">
              <img
                src="https://picsum.photos/seed/quantum_hero/1920/1080"
                alt="Quantum Climb Platform"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onContactClick}
                  aria-label="Request a demo"
                  className="w-24 h-24 bg-purple-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <Play size={32} fill="white" className="ml-1" />
                </button>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="flex gap-12">
                  <div className="text-left">
                    <div className="text-purple-600 font-mono text-[10px] mb-1 tracking-[0.3em] font-bold">ACCURACY</div>
                    <div className="text-3xl font-medium text-white">99.8%</div>
                  </div>
                  <div className="text-left">
                    <div className="text-purple-600 font-mono text-[10px] mb-1 tracking-[0.3em] font-bold">LATENCY</div>
                    <div className="text-3xl font-medium text-white">&lt;2.4s</div>
                  </div>
                </div>
                <div className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-3 text-[10px] font-mono text-zinc-400 tracking-[0.3em] font-bold uppercase">
                  LIVE STREAMING ENABLED
                </div>
              </div>
            </div>
          </Reveal>
        </div>
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
  buttonText = "Request Demo",
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