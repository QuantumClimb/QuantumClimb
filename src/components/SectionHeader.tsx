import { Reveal } from "./Reveal";

type SectionHeaderProps = Readonly<{
  title: string;
  subtitle?: string;
  centered?: boolean;
  eyebrow?: string;
}>;

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  eyebrow,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <Reveal type="mask" className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-600 font-semibold">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal type="mask" className="mb-6">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-none">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal type="fade-up" delay={0.2}>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}