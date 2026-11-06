import { ArrowRight, ArrowUpRight, ChevronRight, Facebook, HeartPulse, Instagram, Linkedin, Music2 } from "lucide-react";
import { BannerImage } from "../components/BannerImage";
import { CatalogueDownloadLink } from "../components/CatalogueDownloadLink";
import { Reveal } from "../components/Reveal";
import { SOCIAL_APPROACH, SOCIAL_CATALOGUE } from "./social-media/socialMediaContent";

const PLATFORMS = [
  { label: "LinkedIn", Icon: Linkedin },
  { label: "Instagram", Icon: Instagram },
  { label: "TikTok", Icon: Music2 },
  { label: "Facebook", Icon: Facebook },
];

/** Agency-page imagery (public/images/agency). */
const HERO_IMAGE = {
  src: "/images/agency/social-media-ecosystem.jpg",
  alt: "Laptop with campaign analytics surrounded by floating social media platform icons",
  position: "center",
};
type HomeMarketingSectionProps = Readonly<{
  onNavigateSocialMedia: () => void;
  onNavigateHealthcare: () => void;
}>;

/** Agency page: Social Media & Digital Marketing feature, plus the Healthcare industry link. */
export function HomeMarketingSection({ onNavigateSocialMedia, onNavigateHealthcare }: HomeMarketingSectionProps) {
  return (
    <section id="social-digital-marketing" className="py-16 md:py-32 bg-black border-b border-white/5 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-600 font-semibold">
                SOCIAL MEDIA & DIGITAL MARKETING
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white leading-[1.05] uppercase">
                Build your brand. Reach your audience. <span className="text-purple-400">Grow your business.</span>
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-lg text-zinc-400 leading-relaxed font-light mb-8">
                Strategy, creative content, social media management and targeted campaigns under one partner — so your brand shows up consistently on the platforms that matter and turns attention into real enquiries.
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={0.15}>
              <ul className="flex flex-wrap gap-2 mb-8" aria-label="Platforms we manage">
                {PLATFORMS.map(({ label, Icon }) => (
                  <li key={label} className="flex items-center gap-2 px-3 py-2 border border-white/10 bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-white">
                    <Icon className="w-4 h-4 text-purple-400" strokeWidth={1.75} />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal type="fade-up" delay={0.2}>
              <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mb-10 font-mono text-[11px] uppercase tracking-wider" aria-label="Our approach">
                {SOCIAL_APPROACH.map((step, index) => (
                  <li key={step} className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1.5 border border-purple-500/30 bg-purple-500/10 text-white">
                      <span className="text-purple-400 mr-1.5">{String(index + 1).padStart(2, "0")}</span>
                      {step}
                    </span>
                    {index < SOCIAL_APPROACH.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal type="fade-up" delay={0.25}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center">
                <button
                  onClick={onNavigateSocialMedia}
                  className="sm:whitespace-nowrap px-6 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-white hover:border-purple-600"
                >
                  <span>EXPLORE SOCIAL & DIGITAL MARKETING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <CatalogueDownloadLink catalogue={SOCIAL_CATALOGUE} className="sm:whitespace-nowrap" />
              </div>
            </Reveal>
          </div>

          <Reveal type="fade-up" delay={0.1} className="lg:col-span-6">
            <BannerImage {...HERO_IMAGE} imgClassName="aspect-[16/10] h-auto" />
          </Reveal>
        </div>

        {/* Industry programme link */}
        <Reveal type="fade-up" delay={0.1}>
          <button
            type="button"
            onClick={onNavigateHealthcare}
            className="group mt-12 md:mt-16 w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border border-white/10 bg-zinc-950/60 hover:border-purple-500/40 transition-colors duration-300 p-5 sm:p-6 text-left cursor-pointer"
          >
            <span className="w-11 h-11 shrink-0 flex items-center justify-center border border-purple-500/30 bg-purple-500/10">
              <HeartPulse className="w-5 h-5 text-purple-400" />
            </span>
            <span className="flex-1">
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-1">Industry programme</span>
              <span className="block text-lg font-medium text-white tracking-tight uppercase">Healthcare Digital Growth</span>
              <span className="block text-sm text-zinc-500 leading-relaxed">
                Doctor branding, clinic websites, patient enquiries, medical education and international patient engagement.
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-400 group-hover:text-purple-300">
              Explore healthcare <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
