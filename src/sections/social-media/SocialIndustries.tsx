import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { BannerImage } from "../../components/BannerImage";
import { SOCIAL_IMAGES, SOCIAL_INDUSTRIES } from "./socialMediaContent";

export function SocialIndustries({ onNavigateHealthcare }: Readonly<{ onNavigateHealthcare: () => void }>) {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <Reveal type="fade-up" className="lg:col-span-5">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
            INDUSTRIES WE SERVE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-5">
            One brand. Four platforms. Connected growth.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-light">
            Whether you&apos;re building a professional identity, launching a product, promoting a service or expanding into new markets, Quantum Climb helps you turn your digital presence into a powerful business asset.
          </p>
          <BannerImage {...SOCIAL_IMAGES.industries} className="mt-8" imgClassName="aspect-[2/1] h-auto" />
        </Reveal>

        <Reveal type="fade-up" delay={0.1} className="lg:col-span-7">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOCIAL_INDUSTRIES.map((industry, index) => {
              const content = (
                <>
                  <span className="text-[10px] font-mono text-purple-400">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-sm font-semibold text-white uppercase tracking-wide">{industry.label}</span>
                  {industry.link && <ArrowUpRight className="w-4 h-4 text-purple-400" aria-hidden="true" />}
                </>
              );
              const base = "w-full flex items-center gap-4 border border-white/10 bg-zinc-950/60 px-4 py-3.5 text-left";
              return (
                <li key={industry.label}>
                  {industry.link === "healthcare" ? (
                    <button
                      type="button"
                      onClick={onNavigateHealthcare}
                      className={`${base} hover:border-purple-500/40 transition-colors duration-300 cursor-pointer`}
                      aria-label="Healthcare & clinics — view Healthcare Digital Growth"
                    >
                      {content}
                    </button>
                  ) : (
                    <div className={base}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
