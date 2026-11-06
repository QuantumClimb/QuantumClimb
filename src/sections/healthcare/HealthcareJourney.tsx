import { ChevronRight } from "lucide-react";

type HealthcareJourneyProps = Readonly<{
  label: string;
  steps: string[];
}>;

/** Step-by-step journey strip, e.g. DISCOVER → EXPLORE → ENQUIRE → FOLLOW UP. */
export function HealthcareJourney({ label, steps }: HealthcareJourneyProps) {
  return (
    <div className="border border-white/10 bg-black/40 p-4 sm:p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3">{label}</div>
      <ol className="flex flex-wrap items-center gap-y-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center">
            <span className="flex items-center gap-2 px-2.5 py-1.5 border border-purple-500/30 bg-purple-500/10 text-white">
              <span className="text-purple-400">{String(index + 1).padStart(2, "0")}</span>
              {step}
            </span>
            {index < steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 mx-1 text-purple-400 shrink-0" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
