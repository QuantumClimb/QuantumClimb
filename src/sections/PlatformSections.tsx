import { Check, Languages, Layers, Smartphone, Video, Volume2, X, Zap } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

export function BenefitsGrid() {
  const benefits = [
    { stat: "120+", label: "Languages Supported", desc: "Reach global audiences with native-level fluency and regional dialect support." },
    { stat: "90%", label: "Efficiency Gain", desc: "Drastically reduce production timelines and resource overhead." },
    { stat: "10x", label: "Faster Turnaround", desc: "Go from raw footage to localized content in minutes, not weeks." },
    { stat: "99%", label: "Voice Match Accuracy", desc: "Maintain brand consistency and vocal identity across every global market." },
    { stat: "5x", label: "Engagement Boost", desc: "Native content drives significantly higher retention and conversion rates." },
    { stat: "100%", label: "Secure Pipeline", desc: "Your intellectual property never leaves our encrypted enterprise cloud." },
  ];

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Why Quantum Climb?"
          title="The Peak of Performance"
          subtitle="Our platform outperforms traditional dubbing and other AI solutions in every key metric."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.label} type="fade-up" delay={0.05 * index} className="bg-zinc-950 p-12 hover:bg-zinc-900 transition-colors duration-500">
              <div className="text-6xl font-medium text-purple-600 mb-6 tracking-tighter">{benefit.stat}</div>
              <h4 className="text-xl font-medium text-white mb-3">{benefit.label}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{benefit.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesGrid() {
  const features = [
    { icon: <Volume2 />, title: "Voice Cloning", desc: "Maintain the original actor's voice, emotion, and cadence across 120+ languages." },
    { icon: <Video />, title: "Perfect Lip Sync", desc: "AI-driven visual alignment that matches mouth movements to the new audio track." },
    { icon: <Languages />, title: "30+ Languages", desc: "Native-level translation and cultural adaptation for global reach." },
    { icon: <Zap />, title: "Automated Pipeline", desc: "Streamline your media workflow with our high-throughput processing engine." },
    { icon: <Layers />, title: "Collaborative Review", desc: "Refine translations and timing with our professional browser-based editor." },
    { icon: <Smartphone />, title: "Multi-Format Export", desc: "Export for YouTube, TikTok, Cinema, or TV with custom metadata." },
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="The Complete Localization Pipeline"
          title="Everything You Need for Global Content"
          subtitle="A comprehensive suite of tools designed to streamline your international media workflow."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <Reveal key={feature.title} type="fade-up" delay={0.1 * index} className="group">
              <div className="w-12 h-12 border border-purple-600/30 flex items-center justify-center text-purple-600 mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-medium text-white mb-4">{feature.title}</h4>
              <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnicalEdge() {
  const rows = [
    { feature: "Natural Voice Cloning", quantum: true, traditional: false },
    { feature: "Perfect Lip-Sync", quantum: true, traditional: false },
    { feature: "Turnaround Time", quantum: "Minutes", traditional: "Weeks" },
    { feature: "Scalability", quantum: "Unlimited", traditional: "Limited by Talent" },
    { feature: "Revision Process", quantum: "Instant", traditional: "Days/Re-recording" },
    { feature: "Cultural Adaptation", quantum: "AI-Assisted", traditional: "Manual" },
  ];

  const renderComparisonValue = (
    value: boolean | string,
    trueClassName: string,
    falseClassName: string,
    textClassName: string,
  ) => {
    if (typeof value === "boolean") {
      const Icon = value ? Check : X;
      return <Icon className={value ? trueClassName : falseClassName} size={24} />;
    }

    return <span className={textClassName}>{value}</span>;
  };

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="The Quantum Advantage"
          title="The Technical Edge"
          subtitle="Compare Quantum Climb against traditional dubbing and legacy AI providers."
        />
        <div className="max-w-5xl mx-auto overflow-hidden border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 border-b border-white/10">
                <th className="p-8 text-zinc-400 font-mono text-[10px] uppercase tracking-[0.2em]">Feature</th>
                <th className="p-8 text-purple-600 font-mono text-[10px] uppercase tracking-[0.2em]">Quantum Climb</th>
                <th className="p-8 text-zinc-400 font-mono text-[10px] uppercase tracking-[0.2em]">Traditional</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-8 text-white font-medium">{row.feature}</td>
                  <td className="p-8">
                    {renderComparisonValue(row.quantum, "text-purple-600", "text-zinc-600", "text-purple-600 font-medium text-lg")}
                  </td>
                  <td className="p-8">
                    {renderComparisonValue(row.traditional, "text-zinc-400", "text-zinc-700", "text-zinc-500 text-lg")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { title: "Ingest Media", desc: "Securely transfer your master files to our enterprise cloud. We support all professional broadcast formats." },
    { title: "Neural Processing", desc: "Our AI analyzes the script, emotion, and cadence, generating high-fidelity dubs in 120+ languages." },
    { title: "Review & Distribute", desc: "Collaborate with your team in our secure editor and export studio-ready localized content." },
  ];

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Three Steps to Global Scale" title="The Enterprise Workflow" />
        <div className="grid md:grid-cols-3 gap-16">
          {steps.map((step, index) => (
            <Reveal key={step.title} type="fade-up" delay={0.1 * index} className="relative">
              <div className="text-8xl font-medium text-white/5 absolute -top-10 -left-6 z-0">{index + 1}</div>
              <div className="relative z-10">
                <h4 className="text-2xl font-medium text-white mb-4">{step.title}</h4>
                <p className="text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}