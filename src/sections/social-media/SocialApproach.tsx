import { ChevronRight } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { SOCIAL_APPROACH } from "./socialMediaContent";

export function SocialApproach() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <Reveal type="fade-up" className="mb-12 max-w-3xl">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
          OUR DIGITAL MARKETING APPROACH
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-5">
          One consistent presence
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed font-light">
          We bring strategy, creative production, technology and marketing together to build a consistent digital presence across the platforms that matter to your business.
        </p>
      </Reveal>

      <Reveal type="fade-up" delay={0.1}>
        <ol className="grid grid-cols-1 sm:grid-cols-5 border border-white/10">
          {SOCIAL_APPROACH.map((step, index) => (
            <li
              key={step}
              className={`relative flex sm:flex-col items-center sm:items-start gap-4 p-5 sm:p-6 bg-zinc-950/60 ${
                index > 0 ? "border-t sm:border-t-0 sm:border-l border-white/10" : ""
              }`}
            >
              <span className="font-mono text-xs text-purple-400">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight">{step}</span>
              {index < SOCIAL_APPROACH.length - 1 && (
                <ChevronRight className="hidden sm:block absolute -right-[9px] top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 bg-black z-10" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
