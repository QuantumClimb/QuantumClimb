import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { FinalCTA } from "../sections/ClosureSections";

type WebDevPageProps = Readonly<{
  onOpenContactModal: () => void;
}>;

export function WebDevPage({ onOpenContactModal }: WebDevPageProps) {
  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal type="mask" className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              AI-Created Software & Apps
            </span>
          </Reveal>
          <Reveal type="mask" className="mb-8">
            <h1 className="text-6xl md:text-[100px] font-medium tracking-tighter text-white leading-[0.85] uppercase">
              Digital <br />
              <span className="text-zinc-500 italic font-serif">Architecture</span>
            </h1>
          </Reveal>
          <Reveal type="fade-up" delay={0.2} className="mb-12">
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
              Custom web applications and software solutions designed, coded, and managed by advanced AI systems for unparalleled speed and precision.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="Our Work"
            title="Web Portfolio"
            subtitle="Explore the digital platforms we've architected."
          />
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 bg-black/50">
            <p className="text-zinc-500 font-medium">Web Showcase Coming Soon</p>
            <p className="text-zinc-600 text-sm mt-2">We are currently curating links to our latest web projects.</p>
          </div>
        </div>
      </section>

      <FinalCTA onContactClick={onOpenContactModal} />
    </>
  );
}
