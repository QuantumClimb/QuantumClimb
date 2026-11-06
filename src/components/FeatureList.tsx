export type Feature = Readonly<{ label: string; key?: boolean }>;

/** Capability list; `key` features are highlighted with the QC accent. */
export function FeatureList({ features }: Readonly<{ features: Feature[] }>) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {features.map((feature) => (
        <li
          key={feature.label}
          className={`flex items-start gap-3 px-3.5 py-2.5 border text-[13px] leading-snug ${
            feature.key
              ? "border-purple-500/30 bg-purple-500/10 text-white font-medium"
              : "border-white/5 bg-zinc-900/40 text-zinc-400"
          }`}
        >
          <span
            className={`mt-[6px] w-1.5 h-1.5 shrink-0 ${feature.key ? "bg-purple-400" : "bg-zinc-600"}`}
            aria-hidden="true"
          />
          {feature.label}
        </li>
      ))}
    </ul>
  );
}
