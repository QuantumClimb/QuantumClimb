import { Reveal } from "../../components/Reveal";
import { SOCIAL_SERVICES } from "./socialMediaContent";

export function SocialServices() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <Reveal type="fade-up" className="mb-12">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
          WHAT WE DO
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Strategy, content & campaigns
        </h2>
      </Reveal>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
        {SOCIAL_SERVICES.map((service, index) => (
          <li
            key={service}
            className="flex items-start gap-4 p-5 sm:p-6 border-r border-b border-white/10 bg-zinc-950/40 hover:bg-purple-500/5 transition-colors duration-300"
          >
            <span className="text-[11px] font-mono text-purple-400 pt-0.5">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-sm sm:text-[15px] text-zinc-200 leading-snug">{service}.</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
