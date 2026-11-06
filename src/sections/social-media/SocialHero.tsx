import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { TechCanvas } from "../../components/TechCanvas";
import { CatalogueDownloadLink } from "../../components/CatalogueDownloadLink";
import { SocialSignalVisual } from "./SocialSignalVisual";
import { SOCIAL_CATALOGUE } from "./socialMediaContent";

export function SocialHero({ onStartProject }: Readonly<{ onStartProject: () => void }>) {
  return (
    <section data-theme="dark" className="relative border-b border-white/10 overflow-hidden bg-black z-10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/70 to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/30 via-transparent to-indigo-950/20 pointer-events-none z-10" />
        <TechCanvas />
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-20 sm:py-28 lg:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <Reveal type="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-purple-500/30 backdrop-blur-md text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              SERVICES / SOCIAL MEDIA & DIGITAL MARKETING
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-8">
              BUILD YOUR BRAND. <br />
              REACH YOUR AUDIENCE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-purple-400">
                GROW YOUR BUSINESS.
              </span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.2}>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-5 font-light">
              Your audience is already online. We help your business connect with them through strategic social media marketing, compelling content and targeted digital campaigns.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed mb-10 font-light">
              Quantum Climb develops and manages digital marketing strategies that strengthen your brand presence, increase engagement and create meaningful opportunities for business growth.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={0.3}>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center">
              <button
                onClick={onStartProject}
                className="sm:whitespace-nowrap px-6 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-white hover:border-purple-600"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById("social-platforms")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="sm:whitespace-nowrap px-6 py-4 bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>EXPLORE THE PLATFORMS</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <CatalogueDownloadLink catalogue={SOCIAL_CATALOGUE} className="sm:whitespace-nowrap" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal type="fade-up" delay={0.25} className="h-full">
            <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
              <SocialSignalVisual />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
