import { Reveal } from "../../components/Reveal";
import { HEALTHCARE_AUDIENCES } from "./healthcareContent";

export function HealthcareAudience() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-20 max-w-7xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <Reveal type="fade-up" className="lg:col-span-5">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
            WHO WE WORK WITH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-5">
            Built for healthcare professionals & businesses
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-light">
            One partner for strategy, creative production, technology and digital marketing — so your website, content, enquiries and follow-up work as one connected system.
          </p>
        </Reveal>

        <Reveal type="fade-up" delay={0.1} className="lg:col-span-7">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HEALTHCARE_AUDIENCES.map((audience, index) => (
              <li
                key={audience}
                className="flex items-center gap-4 border border-white/10 bg-zinc-950/60 px-4 py-3.5 hover:border-purple-500/40 transition-colors duration-300"
              >
                <span className="text-[10px] font-mono text-purple-400">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold text-white uppercase tracking-wide">{audience}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
