import { BookOpen, CreditCard, Layers, Repeat, Users } from "lucide-react";
import type { HealthcareCategory } from "./healthcareContent";
import { HealthcareFeatureList } from "./HealthcareFeatureList";
import { HealthcareJourney } from "./HealthcareJourney";

const MODULES = [
  { title: "Module 01 · Foundations", progress: 100 },
  { title: "Module 02 · Clinical case reviews", progress: 64 },
  { title: "Module 03 · Live webinar series", progress: 20 },
];

const PLATFORM_PILLARS = [
  { icon: BookOpen, label: "Dedicated LMS" },
  { icon: Layers, label: "Subscription CMS" },
  { icon: CreditCard, label: "Payment gateways" },
  { icon: Repeat, label: "Automated funnels" },
];

/** Illustrative learning-platform interface (no live data). */
function LearningPlatformPanel() {
  return (
    <div className="relative border border-white/10 bg-black/80 font-mono text-xs h-full flex flex-col" aria-hidden="true">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <span className="flex items-center gap-2 text-zinc-200 font-bold uppercase tracking-wider text-[11px]">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          Learning Platform
        </span>
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Illustrative interface</span>
      </div>

      <div className="p-5 space-y-4 flex-1">
        <div className="border border-white/5 bg-zinc-950/80 p-3.5">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Course catalogue</div>
          <div className="text-sm font-bold text-white">Advanced Clinical Practice Programme</div>
          <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1.5">
            <Users className="w-3 h-3" /> Instructor profiles · Member-only content
          </div>
        </div>

        <div className="space-y-2.5">
          {MODULES.map((module) => (
            <div key={module.title}>
              <div className="flex justify-between text-[10px] text-zinc-400 mb-1 uppercase tracking-wider">
                <span>{module.title}</span>
                <span className="text-purple-300">{module.progress}%</span>
              </div>
              <div className="h-1 bg-white/10">
                <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400" style={{ width: `${module.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border border-white/5 bg-zinc-950/80 p-3">
            <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Access plan</div>
            <div className="text-[11px] text-white font-bold mt-1 uppercase">Recurring · Annual</div>
          </div>
          <div className="border border-white/5 bg-zinc-950/80 p-3">
            <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Checkout</div>
            <div className="text-[11px] text-white font-bold mt-1 uppercase">Gateway of choice</div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-[10px] text-zinc-500 uppercase tracking-wider flex justify-between">
        <span>Admin dashboard</span>
        <span className="text-purple-400">Progress tracking</span>
      </div>
    </div>
  );
}

/** Featured layout for category 04 — Medical Education & Knowledge Platforms. */
export function HealthcareEducationSpotlight({ category }: Readonly<{ category: HealthcareCategory }>) {
  return (
    <div
      id={category.id}
      className="relative border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-zinc-950/90 to-black p-6 sm:p-10 lg:p-12 scroll-mt-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-purple-600 text-white font-mono text-xs font-semibold tracking-wider uppercase">
                {category.number}
              </span>
              <span className="text-[11px] font-mono text-purple-300 uppercase tracking-widest">
                Key capability · {category.tag}
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-4">{category.title}</h3>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">{category.summary}</p>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PLATFORM_PILLARS.map(({ icon: Icon, label }) => (
              <li key={label} className="border border-purple-500/30 bg-black/40 p-3 flex flex-col gap-2">
                <Icon className="w-4 h-4 text-purple-400" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-white">{label}</span>
              </li>
            ))}
          </ul>

          {category.journey && <HealthcareJourney label={category.journey.label} steps={category.journey.steps} />}
        </div>

        <div className="lg:col-span-5 min-h-[340px]">
          <LearningPlatformPanel />
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/10">
        <HealthcareFeatureList features={category.features} />
      </div>
    </div>
  );
}
