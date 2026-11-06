import { Reveal } from "../../components/Reveal";
import { HEALTHCARE_CATEGORIES, type HealthcareCategory } from "./healthcareContent";
import { HealthcareEducationSpotlight } from "./HealthcareEducationSpotlight";
import { HealthcareFeatureList } from "./HealthcareFeatureList";
import { HealthcareJourney } from "./HealthcareJourney";

function CategoryPanel({ category }: Readonly<{ category: HealthcareCategory }>) {
  return (
    <div
      id={category.id}
      className="relative border border-white/10 bg-gradient-to-b from-zinc-950/80 to-black p-6 sm:p-10 hover:border-purple-500/30 transition-colors duration-500 scroll-mt-32"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-transparent opacity-70" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 font-mono text-xs font-semibold tracking-wider uppercase border border-purple-500/30">
                {category.number}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">{category.tag}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase mb-4">{category.title}</h3>
            <p className="text-zinc-400 text-base leading-relaxed font-light">{category.summary}</p>
          </div>
          {category.journey && <HealthcareJourney label={category.journey.label} steps={category.journey.steps} />}
        </div>
        <div className="lg:col-span-7">
          <HealthcareFeatureList features={category.features} />
        </div>
      </div>
    </div>
  );
}

export function HealthcareCapabilities() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <Reveal type="fade-up" className="mb-12 sm:mb-14">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold block mb-3">
          SEVEN CAPABILITY AREAS
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-6">
          What we build for healthcare
        </h2>
        {/* Quick index */}
        <nav aria-label="Healthcare capability areas" className="flex flex-wrap gap-2">
          {HEALTHCARE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="px-3 py-1.5 border border-white/10 bg-zinc-950/60 text-[11px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white hover:border-purple-500/40 transition-colors cursor-pointer text-left"
            >
              <span className="text-purple-400 mr-1.5">{category.number}</span>
              {category.title}
            </button>
          ))}
        </nav>
      </Reveal>

      <div className="flex flex-col gap-8 sm:gap-10">
        {HEALTHCARE_CATEGORIES.map((category) => (
          <Reveal key={category.id} type="fade-up">
            {category.spotlight ? (
              <HealthcareEducationSpotlight category={category} />
            ) : (
              <CategoryPanel category={category} />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
