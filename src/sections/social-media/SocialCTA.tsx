import { ArrowRight } from "lucide-react";
import { CatalogueDownloadLink } from "../../components/CatalogueDownloadLink";
import { Reveal } from "../../components/Reveal";
import { SOCIAL_CATALOGUE } from "./socialMediaContent";

export function SocialCTA({ onStartProject }: Readonly<{ onStartProject: () => void }>) {
  return (
    <section data-theme="dark" className="relative z-10 border-t border-white/10 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-black to-indigo-950/30 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Reveal type="fade-up" className="relative px-6 sm:px-10 lg:px-12 py-20 sm:py-28 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05] mb-10">
          Let&apos;s grow your <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-purple-400">
            digital presence.
          </span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <button
            onClick={onStartProject}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer border border-white hover:border-purple-600"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <CatalogueDownloadLink catalogue={SOCIAL_CATALOGUE} />
        </div>
        <p className="mt-4 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          Digital Marketing Services Catalogue · {SOCIAL_CATALOGUE.meta}
        </p>
        <p className="mt-12 text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500">
          Quantum Climb · Build once. Access anywhere.
        </p>
      </Reveal>
    </section>
  );
}
