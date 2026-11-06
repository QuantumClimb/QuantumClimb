import { Reveal } from "../../components/Reveal";
import { HEALTHCARE_SYSTEM_LAYERS } from "./healthcareContent";

/** How the capabilities connect — content, platforms, enquiries, CRM & automation, insight. */
export function HealthcareSystem() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <Reveal type="fade-up" className="mb-12 max-w-3xl">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
          ONE CONNECTED SYSTEM
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-5">
          From expertise to enquiry to follow-up
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed font-light">
          Each layer can be delivered on its own or combined. Integrations such as CRM, booking, messaging and payment gateways are scoped and configured for each project around the tools your organisation already uses.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-5 border border-white/10">
        {HEALTHCARE_SYSTEM_LAYERS.map((layer, index) => (
          <Reveal
            key={layer.code}
            type="fade-up"
            delay={index * 0.08}
            className={`relative p-6 bg-zinc-950/60 ${index > 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""}`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-purple-400">{layer.code}</span>
              <span className="h-px flex-1 ml-3 bg-gradient-to-r from-purple-500/60 to-transparent" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-tight mb-3">{layer.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">{layer.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
