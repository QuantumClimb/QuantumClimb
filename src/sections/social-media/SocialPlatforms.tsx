import { Facebook, Instagram, Linkedin, Music2, type LucideIcon } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { SOCIAL_PLATFORMS } from "./socialMediaContent";

const ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: Music2,
  facebook: Facebook,
};

export function SocialPlatforms() {
  return (
    <section id="social-platforms" className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative scroll-mt-28">
      <Reveal type="fade-up" className="mb-12 max-w-3xl">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
          SOCIAL MEDIA MARKETING
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          The platforms that matter to your business
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {SOCIAL_PLATFORMS.map((platform, index) => {
          const Icon = ICONS[platform.id];
          return (
            <Reveal key={platform.id} type="fade-up" delay={index * 0.08} className="h-full">
              {/* Brand-tinted card. Uses fixed hex ink (not the themed white/black
                  palette, and no data-theme zone, which forces a black background
                  in light mode) so it reads identically in both themes. */}
              <article
                className="relative h-full p-6 sm:p-8 border border-[#ffffff]/10 overflow-hidden group transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: platform.color, backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 45%, rgba(0,0,0,0.3))" }}
              >
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <Icon className="w-8 h-8 text-[#ffffff]" strokeWidth={1.75} />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffffff]/60">{platform.focus}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#ffffff] tracking-tight mb-1">{platform.name.replace(" Marketing", "")}</h3>
                  <p className="text-base text-[#ffffff]/90 font-medium mb-4">{platform.tagline}</p>
                  <p className="text-sm text-[#ffffff]/75 leading-relaxed font-light">{platform.description}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
