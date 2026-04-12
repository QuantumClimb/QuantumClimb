import { useState } from "react";
import { Check, Cpu, Play, Shield, Volume2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

export function AIFirstSection() {
  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeader
              eyebrow="AI-First Architecture"
              title="Built from the ground up for the AI Era"
              subtitle="Quantum Climb isn't just adding AI features; we are built on a foundation of neural networks and deep learning. Our entire pipeline is optimized for the next generation of media production."
              centered={false}
            />
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Neural Core", desc: "Proprietary models trained on millions of hours of studio-quality media." },
                { title: "Autonomous Workflows", desc: "Intelligent systems that handle complex localization tasks without manual intervention." },
                { title: "Generative Precision", desc: "Beyond simple processing: we generate new, culturally relevant content dynamically." },
                { title: "Infinite Scalability", desc: "Our AI-native infrastructure scales instantly to meet the demands of global releases." },
              ].map((item, index) => (
                <Reveal key={item.title} type="fade-up" delay={0.1 * index}>
                  <h4 className="text-white font-medium mb-2">{item.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal type="fold" className="relative">
            <div className="absolute -inset-4 bg-purple-600/20 blur-3xl rounded-full opacity-20"></div>
            <div className="relative bg-zinc-900 border border-white/10 p-12 aspect-square flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 border border-purple-600/30 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <Cpu size={64} className="text-purple-600" />
              </div>
              <h3 className="text-3xl font-medium text-white mb-4 tracking-tighter">Quantum Neural Engine</h3>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-[0.3em]">Version 4.2.0-Alpha</p>
              <div className="mt-12 w-full space-y-4">
                {[80, 95, 70].map((width, index) => (
                  <div key={width} className="h-1 w-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CoreValueProp() {
  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <SectionHeader
              eyebrow="The Quantum Shift"
              title="The Peak of Natural AI Voice Synthesis"
              subtitle="Quantum Climb's neural architecture captures the soul of the original performance, preserving emotion, cadence, and intent across 120+ languages."
              centered={false}
            />
            <div className="space-y-8">
              {[
                { title: "Neural Voice Cloning", desc: "Zero-shot cloning that maintains the speaker's unique vocal signature with 99.9% fidelity." },
                { title: "Dynamic Lip-Sync", desc: "Frame-accurate visual alignment for a truly native viewing experience in any aspect ratio." },
                { title: "Cultural Adaptation", desc: "Beyond translation: we adapt idioms, slang, and cultural nuances automatically." },
              ].map((item, index) => (
                <Reveal key={item.title} type="fade-up" delay={0.1 * index} className="flex gap-6 group">
                  <div className="mt-1 w-6 h-6 border border-purple-600/30 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                    <Check size={14} className="text-purple-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white mb-2">{item.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal type="fold" className="bg-zinc-900 border border-white/10 p-3">
            <div className="aspect-square bg-black relative overflow-hidden">
              <img
                src="https://picsum.photos/seed/neural_voice/1000/1000"
                alt="Neural Processing"
                className="w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
                <div className="w-full h-1 bg-white/10 mb-10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-purple-600"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <h3 className="text-4xl font-medium text-white mb-6 tracking-tight">Processing Emotion...</h3>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">Neural Engine v4.2 Active</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function InteractiveDemo() {
  const [activeLang, setActiveLang] = useState("Original");
  const languages = [
    { name: "Original", flag: "USA" },
    { name: "Spanish", flag: "ESP" },
    { name: "French", flag: "FRA" },
    { name: "German", flag: "DEU" },
    { name: "Japanese", flag: "JPN" },
    { name: "Mandarin", flag: "CHN" },
    { name: "Arabic", flag: "SAU" },
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Experience the magic"
          title="Experience the Quantum Shift"
          subtitle="Watch how our AI transforms content in real-time. Select a language to see the transformation."
        />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => setActiveLang(lang.name)}
                className={`px-8 py-4 border transition-all duration-300 flex items-center gap-3 text-sm font-medium ${
                  activeLang === lang.name
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-transparent border-white/10 text-zinc-400 hover:border-white/30"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>

          <Reveal type="fold" className="bg-zinc-900 border border-white/10 p-4 aspect-video relative group">
            <img
              src={`https://picsum.photos/seed/demo_${activeLang}/1920/1080`}
              alt="Demo Video"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-20 h-20 bg-white flex items-center justify-center">
                <Play size={28} fill="black" />
              </div>
            </div>
            <div className="absolute top-10 left-10 bg-purple-600 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
              {activeLang} DUB ACTIVE
            </div>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-12">
            {[
              { icon: <Zap size={24} />, title: "Real-time Lip Sync", desc: "AI-driven visual alignment that matches the speaker's mouth movements with sub-frame precision." },
              { icon: <Volume2 size={24} />, title: "Emotion Preservation", desc: "Maintains the original tone, pitch, and emotional weight of the performance across every language." },
              { icon: <Shield size={24} />, title: "Enterprise Security", desc: "SOC2 Type II compliant processing with end-to-end encryption for your high-value media assets." },
            ].map((item, index) => (
              <Reveal key={item.title} type="fade-up" delay={0.1 * index} className="p-8 border border-white/5 bg-zinc-900/50">
                <div className="text-purple-600 mb-6">{item.icon}</div>
                <h4 className="text-xl font-medium text-white mb-3">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}