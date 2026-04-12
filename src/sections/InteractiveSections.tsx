import { Shield } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

type ContactActionProps = Readonly<{
  onContactClick: () => void;
}>;

export function InteractiveAIHuman({ onContactClick }: Readonly<ContactActionProps>) {
  return (
    <section className="py-32 bg-black overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Innovate. Transform. Thrive."
          title="Quantum Humans: The Future of Interaction"
          subtitle="Beyond video: create real-time conversational avatars that guide, support, and sell in any language, 24/7."
        />

        <div className="relative aspect-video bg-zinc-900 border border-white/10 overflow-hidden group">
          <img
            src="https://picsum.photos/seed/interactive_ai/1920/1080"
            alt="Interactive AI Human"
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Reveal type="mask" className="mb-6">
              <h3 className="text-4xl md:text-7xl font-medium text-white tracking-tighter text-center">More human and better understanding.</h3>
            </Reveal>
            <Reveal type="fade-up" delay={0.2}>
              <button
                onClick={onContactClick}
                className="px-10 py-5 bg-purple-600 text-white font-medium tracking-tight hover:bg-white hover:text-black transition-colors"
              >
                Contact Sales
              </button>
            </Reveal>
          </div>

          <div className="absolute top-12 left-12 space-y-6">
            <div className="p-6 bg-black/60 backdrop-blur-md border border-white/10 w-72">
              <div className="text-[10px] font-mono text-purple-600 mb-3 tracking-widest">NEURAL STATUS</div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-mono">ONLINE & LISTENING</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-16 text-center">
          {[
            { stat: "52.0%", label: "Engagement Increase", desc: "Users stay longer with interactive human avatars." },
            { stat: "98.4%", label: "Accuracy Rate", desc: "Near-perfect comprehension of complex queries." },
            { stat: "0.5sec", label: "Response Latency", desc: "Instantaneous real-time conversational feedback." },
          ].map((item, index) => (
            <Reveal key={item.label} type="fade-up" delay={0.1 * index}>
              <div className="text-6xl font-medium text-white mb-3 tracking-tighter">{item.stat}</div>
              <div className="text-purple-600 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">{item.label}</div>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InteractiveFeatures() {
  const features = [
    { title: "Accessibility", desc: "Break down barriers for users with visual or hearing impairments through natural interaction." },
    { title: "Ubiquity", desc: "Deploy your Quantum Human across web, mobile, and physical kiosks with a single API." },
    { title: "Trustworthiness", desc: "Build deeper connections with customers through empathetic, human-like responses." },
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="The Core of Interaction" title="Features of Quantum Interactive" />
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <Reveal key={feature.title} type="fade-up" delay={0.1 * index} className="p-10 border border-white/5 bg-zinc-900/50">
              <h4 className="text-2xl font-medium text-white mb-6">{feature.title}</h4>
              <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SecuritySection() {
  const certifications = [
    { name: "SOC2 Type II", desc: "Independently audited security controls." },
    { name: "GDPR Compliant", desc: "Strict data privacy and protection standards." },
    { name: "ISO 27001", desc: "International standard for information security." },
    { name: "HIPAA Ready", desc: "Secure handling of sensitive medical content." },
  ];

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Enterprise Grade"
          title="Security & Compliance"
          subtitle="Your intellectual property is protected by the highest industry standards. We process your media in a secure, isolated environment."
        />
        <div className="grid md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <Reveal key={cert.name} type="fade-up" delay={0.1 * index} className="p-8 border border-white/5 bg-zinc-900/30 text-center group hover:border-purple-600/30 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 border border-white/10 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Shield size={24} />
              </div>
              <h4 className="text-white font-medium mb-2">{cert.name}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">{cert.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}