import { ArrowRight, FileText } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { CatalogueDownloadLink } from "./CatalogueDownloadLink";
import { HEALTHCARE_CATALOGUE } from "./healthcareContent";

export function HealthcareCTA({ onStartProject }: Readonly<{ onStartProject: () => void }>) {
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

      <div className="relative px-6 sm:px-10 lg:px-12 py-20 sm:py-28 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <Reveal type="fade-up" className="lg:col-span-7">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-4">
            START WITH A DISCOVERY CONVERSATION
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05] mb-6">
            Let&apos;s map your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-purple-400">
              digital growth.
            </span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl mb-10">
            Tell us about your practice, clinic, product or education programme. We&apos;ll recommend the right combination of branding, platforms, media and automation for where you are today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <button
              onClick={onStartProject}
              className="px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-white hover:border-purple-600"
            >
              <span>START A HEALTHCARE PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>

        <Reveal type="fade-up" delay={0.15} className="lg:col-span-5">
          <div className="border border-white/10 bg-zinc-950/80 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 shrink-0">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">{HEALTHCARE_CATALOGUE.meta}</div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Healthcare Digital Services Catalogue</h3>
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
              The complete Healthcare Digital Growth offering — all seven capability areas in one document to share with your team.
            </p>
            <CatalogueDownloadLink className="w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
