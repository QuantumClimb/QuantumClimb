import { ShieldCheck } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { HEALTHCARE_RESPONSIBILITY } from "./healthcareContent";

export function HealthcareResponsibility() {
  const { weDoNot, clientResponsibilities, frameworks } = HEALTHCARE_RESPONSIBILITY;

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <Reveal type="fade-up">
        <div className="border border-white/10 bg-zinc-950/60 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
              RESPONSIBLE HEALTHCARE MARKETING
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase mb-4 max-w-3xl">
            Credible, accurate and responsible by design
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-light max-w-3xl mb-10">
            Quantum Climb provides digital technology, media and marketing services. We do not provide medical, legal, regulatory or cybersecurity certification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4">We do not</h3>
              <ul className="space-y-2.5">
                {weDoNot.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-400 font-light">
                    <span className="mt-[7px] w-1.5 h-1.5 bg-zinc-600 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4">Healthcare organisations remain responsible for</h3>
              <ul className="space-y-2.5">
                {clientResponsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-400 font-light">
                    <span className="mt-[7px] w-1.5 h-1.5 bg-purple-500 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4">Privacy & professional requirements</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
                Depending on the market and implementation, relevant requirements may include:
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {frameworks.map((framework) => (
                  <span key={framework} className="px-2.5 py-1 border border-white/10 bg-black/40 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                    {framework}
                  </span>
                ))}
              </div>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Actual requirements are reviewed for each operating market and implementation.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
