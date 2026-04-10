import React, { useState, useEffect } from "react";
import { 
  Play, 
  Zap, 
  Shield, 
  ArrowRight, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  Volume2,
  Video,
  Languages,
  Cpu,
  Layers,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Components ---

const Reveal = ({ 
  children, 
  className = "", 
  type = "fade-up",
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string; 
  type?: "fade-up" | "mask" | "fold";
  delay?: number;
}) => {
  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    "mask": {
      hidden: { y: "100%" },
      visible: { y: 0 }
    },
    "fold": {
      hidden: { opacity: 0, rotateX: -20, y: 40, scale: 0.95 },
      visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 }
    }
  };

  if (type === "mask") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
          variants={variants.mask}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      variants={variants[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 p-12 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mb-12">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-600 font-bold mb-4 block">
                Enterprise Inquiry
              </span>
              <h2 className="text-4xl font-medium text-white tracking-tighter mb-4">
                Let's scale your <br />
                <span className="text-zinc-500 italic font-serif">global presence</span>
              </h2>
              <p className="text-zinc-400">
                Our team of experts will help you design a custom localization pipeline tailored to your studio's needs.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input id="contact-name" type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-purple-600 outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Work Email</label>
                  <input id="contact-email" type="email" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-purple-600 outline-none transition-colors" placeholder="john@studio.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-company" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Company / Studio</label>
                <input id="contact-company" type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-purple-600 outline-none transition-colors" placeholder="Quantum Media" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Message</label>
                <textarea id="contact-message" rows={4} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-purple-600 outline-none transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <button className="w-full py-5 bg-purple-600 text-white font-bold tracking-tight hover:bg-white hover:text-black transition-all duration-300 uppercase text-sm">
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = true,
  eyebrow
}: { 
  title: string; 
  subtitle?: string; 
  centered?: boolean;
  eyebrow?: string;
}) => (
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

// --- Sections ---

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal type="mask" className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              Enterprise AI Dubbing v4.2
            </span>
          </Reveal>
          
          <Reveal type="mask" className="mb-8">
            <h1 className="text-6xl md:text-[120px] font-medium tracking-tighter text-white leading-[0.82] uppercase">
              The Peak of <br />
              <span className="text-zinc-500 italic font-serif">Localization</span>
            </h1>
          </Reveal>
          
          <Reveal type="fade-up" delay={0.2} className="mb-12">
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Ascend beyond language barriers. Quantum Climb delivers studio-grade AI dubbing, 
              perfect lip-sync, and cultural adaptation for global media leaders.
            </p>
          </Reveal>
          
          <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <button 
              onClick={onContactClick}
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-sm"
            >
              Request Demo
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold tracking-tight hover:bg-white/5 transition-colors duration-300 flex items-center justify-center gap-2 uppercase text-sm">
              <Play size={16} fill="currentColor" />
              Watch Demo
            </button>
          </Reveal>

          <Reveal type="fold" delay={0.4} className="relative group max-w-6xl mx-auto">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600/20 to-blue-500/20 blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-zinc-900 border border-white/10 aspect-video flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/quantum_hero/1920/1080" 
                alt="Quantum Climb Platform" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  type="button"
                  onClick={onContactClick}
                  aria-label="Request a demo"
                  className="w-24 h-24 bg-purple-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <Play size={32} fill="white" className="ml-1" />
                </button>
              </div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="flex gap-12">
                  <div className="text-left">
                    <div className="text-purple-600 font-mono text-[10px] mb-1 tracking-[0.3em] font-bold">ACCURACY</div>
                    <div className="text-3xl font-medium text-white">99.8%</div>
                  </div>
                  <div className="text-left">
                    <div className="text-purple-600 font-mono text-[10px] mb-1 tracking-[0.3em] font-bold">LATENCY</div>
                    <div className="text-3xl font-medium text-white">&lt;2.4s</div>
                  </div>
                </div>
                <div className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-3 text-[10px] font-mono text-zinc-400 tracking-[0.3em] font-bold uppercase">
                  LIVE STREAMING ENABLED
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ 
  title, 
  subtitle, 
  buttonText = "Request Demo", 
  onContactClick 
}: { 
  title: string; 
  subtitle: string; 
  buttonText?: string;
  onContactClick: () => void;
}) => (
  <section className="py-24 bg-zinc-950 border-b border-white/5">
    <div className="container mx-auto px-6 text-center">
      <Reveal type="mask" className="mb-6">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white leading-tight">
          {title}
        </h2>
      </Reveal>
      <Reveal type="fade-up" delay={0.2} className="mb-10">
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </Reveal>
      <Reveal type="fade-up" delay={0.3}>
        <button 
          onClick={onContactClick}
          className="px-12 py-5 bg-white text-black font-bold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-sm"
        >
          {buttonText}
        </button>
      </Reveal>
    </div>
  </section>
);

const AIFirstSection = () => {
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
                { title: "Infinite Scalability", desc: "Our AI-native infrastructure scales instantly to meet the demands of global releases." }
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
                      transition={{ duration: 1.5, delay: 0.5 + (index * 0.2) }}
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
};

const CoreValueProp = () => {
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
                { title: "Cultural Adaptation", desc: "Beyond translation: we adapt idioms, slang, and cultural nuances automatically." }
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
};

const InteractiveDemo = () => {
  const [activeLang, setActiveLang] = useState("Original");
  const languages = [
    { name: "Original", flag: "🇺🇸" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Mandarin", flag: "🇨🇳" },
    { name: "Arabic", flag: "🇸🇦" }
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
              { icon: <Shield size={24} />, title: "Enterprise Security", desc: "SOC2 Type II compliant processing with end-to-end encryption for your high-value media assets." }
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
};

const BenefitsGrid = () => {
  const benefits = [
    { stat: "120+", label: "Languages Supported", desc: "Reach global audiences with native-level fluency and regional dialect support." },
    { stat: "90%", label: "Efficiency Gain", desc: "Drastically reduce production timelines and resource overhead." },
    { stat: "10x", label: "Faster Turnaround", desc: "Go from raw footage to localized content in minutes, not weeks." },
    { stat: "99%", label: "Voice Match Accuracy", desc: "Maintain brand consistency and vocal identity across every global market." },
    { stat: "5x", label: "Engagement Boost", desc: "Native content drives significantly higher retention and conversion rates." },
    { stat: "100%", label: "Secure Pipeline", desc: "Your intellectual property never leaves our encrypted enterprise cloud." }
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
};

const FeaturesGrid = () => {
  const features = [
    { icon: <Volume2 />, title: "Voice Cloning", desc: "Maintain the original actor's voice, emotion, and cadence across 120+ languages." },
    { icon: <Video />, title: "Perfect Lip Sync", desc: "AI-driven visual alignment that matches mouth movements to the new audio track." },
    { icon: <Languages />, title: "30+ Languages", desc: "Native-level translation and cultural adaptation for global reach." },
    { icon: <Zap />, title: "Automated Pipeline", desc: "Streamline your media workflow with our high-throughput processing engine." },
    { icon: <Layers />, title: "Collaborative Review", desc: "Refine translations and timing with our professional browser-based editor." },
    { icon: <Smartphone />, title: "Multi-Format Export", desc: "Export for YouTube, TikTok, Cinema, or TV with custom metadata." }
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
};

const TechnicalEdge = () => {
  const rows = [
    { feature: "Natural Voice Cloning", quantum: true, traditional: false },
    { feature: "Perfect Lip-Sync", quantum: true, traditional: false },
    { feature: "Turnaround Time", quantum: "Minutes", traditional: "Weeks" },
    { feature: "Scalability", quantum: "Unlimited", traditional: "Limited by Talent" },
    { feature: "Revision Process", quantum: "Instant", traditional: "Days/Re-recording" },
    { feature: "Cultural Adaptation", quantum: "AI-Assisted", traditional: "Manual" }
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
};


const HowItWorks = () => {
  const steps = [
    { title: "Ingest Media", desc: "Securely transfer your master files to our enterprise cloud. We support all professional broadcast formats." },
    { title: "Neural Processing", desc: "Our AI analyzes the script, emotion, and cadence, generating high-fidelity dubs in 120+ languages." },
    { title: "Review & Distribute", desc: "Collaborate with your team in our secure editor and export studio-ready localized content." }
  ];

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader 
          eyebrow="Three Steps to Global Scale"
          title="The Enterprise Workflow"
        />
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
};

const IndustryUseCases = () => {
  const industries = [
    { title: "Content Creators", desc: "Scale your YouTube or TikTok channel to every language instantly.", img: "https://picsum.photos/seed/creator/800/600" },
    { title: "E-Learning", desc: "Localize educational courses with perfect technical terminology.", img: "https://picsum.photos/seed/learning/800/600" },
    { title: "Enterprise", desc: "Internal communications and training for global workforces.", img: "https://picsum.photos/seed/corp/800/600" },
    { title: "E-Commerce", desc: "Product demos that speak the customer's language natively.", img: "https://picsum.photos/seed/shop/800/600" },
    { title: "Marketing Agencies", desc: "Global ad campaigns with localized voiceovers in record time.", img: "https://picsum.photos/seed/agency/800/600" },
    { title: "Media & Entertainment", desc: "Film and TV localization that preserves the actor's performance.", img: "https://picsum.photos/seed/media/800/600" }
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader 
          eyebrow="Solutions for Every Sector"
          title="Built for Every Industry"
          subtitle="From independent creators to Fortune 500 companies, Quantum Climb powers global communication."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <Reveal key={industry.title} type="fold" delay={0.1 * index} className="group cursor-pointer">
              <div className="relative aspect-4/3 overflow-hidden border border-white/10 mb-6">
                <img 
                  src={industry.img} 
                  alt={industry.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h4 className="text-2xl font-medium text-white mb-2 group-hover:text-purple-600 transition-colors">{industry.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{industry.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactCaseStudies = () => {
  const cases = [
    { title: "Content Creation", result: "+400%", label: "Global Reach Increase", desc: "Localized 500+ videos into 12 languages in 48 hours." },
    { title: "E-Learning", result: "85%", label: "Efficiency Gain", desc: "Replaced human dubbing for 1000+ hours of course material." },
    { title: "E-Commerce", result: "2.5X", label: "Conversion Lift", desc: "Native product demos drove massive sales in new markets." }
  ];

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader 
          eyebrow="Measured Success"
          title="Real Results, Real Impact"
        />
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {cases.map((c, index) => (
            <Reveal key={c.title} type="fade-up" delay={0.1 * index} className="bg-zinc-950 p-12 hover:bg-zinc-900 transition-colors duration-500">
              <div className="text-purple-600 font-mono text-[10px] uppercase tracking-widest mb-6">{c.title}</div>
              <div className="text-6xl font-medium text-white mb-2 tracking-tighter">{c.result}</div>
              <div className="text-zinc-400 font-medium mb-6">{c.label}</div>
              <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  const posts = [
    { title: "The Future of AI Dubbing in 2026", date: "Mar 15, 2026", img: "https://picsum.photos/seed/blog1/800/500" },
    { title: "How to Scale Your YouTube Channel Globally", date: "Mar 10, 2026", img: "https://picsum.photos/seed/blog2/800/500" },
    { title: "Neural Voice Cloning: A Technical Deep Dive", date: "Mar 05, 2026", img: "https://picsum.photos/seed/blog3/800/500" }
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <SectionHeader 
            eyebrow="Insights from the Peak"
            title="Latest from Quantum Climb"
            centered={false}
          />
          <button className="hidden md:flex items-center gap-2 text-purple-600 font-medium hover:text-white transition-colors mb-16">
            View All Posts <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.title} type="fold" delay={0.1 * index} className="group cursor-pointer">
              <div className="aspect-16/10 overflow-hidden border border-white/10 mb-6">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-3">{post.date}</div>
              <h4 className="text-xl font-medium text-white group-hover:text-purple-600 transition-colors">{post.title}</h4>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveAIHuman = ({ onContactClick }: { onContactClick: () => void }) => {
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
            { stat: "0.5sec", label: "Response Latency", desc: "Instantaneous real-time conversational feedback." }
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
};

const InteractiveFeatures = () => {
  const features = [
    { title: "Accessibility", desc: "Break down barriers for users with visual or hearing impairments through natural interaction." },
    { title: "Ubiquity", desc: "Deploy your Quantum Human across web, mobile, and physical kiosks with a single API." },
    { title: "Trustworthiness", desc: "Build deeper connections with customers through empathetic, human-like responses." }
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader 
          eyebrow="The Core of Interaction"
          title="Features of Quantum Interactive"
        />
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, index) => (
            <Reveal key={f.title} type="fade-up" delay={0.1 * index} className="p-10 border border-white/5 bg-zinc-900/50">
              <h4 className="text-2xl font-medium text-white mb-6">{f.title}</h4>
              <p className="text-zinc-500 leading-relaxed">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};


const SecuritySection = ({ onContactClick }: { onContactClick: () => void }) => {
  const certifications = [
    { name: "SOC2 Type II", desc: "Independently audited security controls." },
    { name: "GDPR Compliant", desc: "Strict data privacy and protection standards." },
    { name: "ISO 27001", desc: "International standard for information security." },
    { name: "HIPAA Ready", desc: "Secure handling of sensitive medical content." }
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
};

const GlobalPartners = () => {
  const partners = ["Google", "Microsoft", "Intel", "NTT", "Samsung", "LG", "Naver", "Sony"];
  return (
    <section className="py-24 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Global Partners</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-20 grayscale">
          {partners.map((p) => (
            <span key={p} className="text-2xl font-bold tracking-tighter text-white font-mono">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const Faq = () => {
  const faqs = [
    { q: "What languages does Quantum Climb support?", a: "We currently support over 120 languages and dialects, with new ones added monthly. Our neural engine handles regional accents and technical terminology with native-level precision." },
    { q: "How secure is my content?", a: "Security is our priority. We are SOC2 Type II compliant. All data is encrypted at rest and in transit, and we offer private cloud deployments for enterprise clients with strict data sovereignty requirements." },
    { q: "Can I edit the AI-generated scripts?", a: "Yes. Our platform includes a full-featured collaborative editor where you can refine translations, adjust timing, and manage cultural nuances before final rendering." },
    { q: "Does it work with existing video platforms?", a: "Absolutely. We offer direct integrations with YouTube, Vimeo, and major CMS platforms, as well as a robust API for custom workflows." }
  ];
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0]?.q ?? null);

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader 
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about the Quantum Climb platform."
          />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-white/10 bg-zinc-900/30">
                <button 
                  onClick={() => setOpenQuestion(openQuestion === faq.q ? null : faq.q)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.q}</span>
                  {openQuestion === faq.q ? <ChevronUp size={20} className="text-purple-600" /> : <ChevronDown size={20} className="text-zinc-500" />}
                </button>
                <AnimatePresence>
                  {openQuestion === faq.q && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-zinc-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section className="py-40 bg-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <Reveal type="mask" className="mb-10">
          <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white leading-[0.85]">
            Ascend to the <br />Global Stage.
          </h2>
        </Reveal>
        <Reveal type="fade-up" delay={0.2} className="mb-16">
          <p className="text-2xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Join the world's leading media companies and creators who are scaling 
            their reach with Quantum Climb.
          </p>
        </Reveal>
        <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onContactClick}
            className="w-full sm:w-auto px-12 py-6 bg-white text-black font-medium tracking-tight hover:bg-black hover:text-white transition-colors text-lg"
          >
            Request Demo
          </button>
          <button 
            onClick={onContactClick}
            className="w-full sm:w-auto px-12 py-6 bg-transparent border border-white/20 text-white font-medium tracking-tight hover:bg-white hover:text-black transition-colors text-lg"
          >
            Contact Sales
          </button>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div>
            <div className="text-2xl font-bold tracking-tighter text-white mb-8">QUANTUM CLIMB</div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-10">
              The enterprise standard for AI video localization and interactive conversational humans. Built for scale.
            </p>
            <div className="flex gap-6">
              <span className="text-zinc-500 transition-colors">X</span>
              <span className="text-zinc-500 transition-colors">LinkedIn</span>
              <span className="text-zinc-500 transition-colors">GitHub</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-8">Product</h4>
            <ul className="space-y-5 text-sm text-zinc-500">
              <li className="hover:text-purple-600 cursor-pointer transition-colors">AI Dubbing</li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">Lip Sync</li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">Voice Cloning</li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">Interactive Humans</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-8">India Office</h4>
            <ul className="space-y-4 text-xs text-zinc-500 leading-relaxed">
              <li>Quantum Climb India Pvt Ltd</li>
              <li>Level 5, Prestige Blue Chip,</li>
              <li>Hosur Road, Bangalore, 560029</li>
              <li className="text-purple-600 font-medium">WhatsApp: +91 98765 43210</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-8">Malaysia Office</h4>
            <ul className="space-y-4 text-xs text-zinc-500 leading-relaxed">
              <li>Quantum Climb Malaysia Sdn Bhd</li>
              <li>Level 28, Menara Maxis,</li>
              <li>KLCC, 50088 Kuala Lumpur</li>
              <li className="text-purple-600 font-medium">WhatsApp: +60 12-345 6789</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
          <div>© 2026 QUANTUM CLIMB INC. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-10 mt-6 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">PRIVACY POLICY</span>
            <span className="hover:text-white cursor-pointer transition-colors">TERMS OF SERVICE</span>
            <span className="hover:text-white cursor-pointer transition-colors">COOKIE SETTINGS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-purple-600 selection:text-white">
      {/* Technical Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? "bg-black/80 backdrop-blur-md py-5 border-white/10" : "bg-transparent py-10 border-transparent"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-white">QUANTUM CLIMB</div>
          <div className="flex items-center gap-8">
            <button 
              onClick={openContactModal}
              className="px-8 py-3 bg-white text-black text-sm font-medium tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onContactClick={openContactModal} />
        <CTASection 
          title="Ready to scale your global reach?" 
          subtitle="Join the world's leading media companies and creators who are scaling their reach with Quantum Climb."
          onContactClick={openContactModal}
        />
        <CoreValueProp />
        <InteractiveDemo />
        <BenefitsGrid />
        <FeaturesGrid />
        <TechnicalEdge />
        <CTASection 
          title="Experience the peak of AI localization" 
          subtitle="Our enterprise-grade platform is designed for high-throughput media pipelines and studio-quality output."
          onContactClick={openContactModal}
        />
        <HowItWorks />
        <IndustryUseCases />
        <AIFirstSection />
        <ImpactCaseStudies />
        <SecuritySection onContactClick={openContactModal} />
        <CTASection 
          title="Advanced AI Solutions" 
          subtitle="Explore our specialized services: 3D Applications, AI Filmmaking, and AI Automation."
          buttonText="Explore Services"
          onContactClick={openContactModal}
        />
        <BlogSection />
        <InteractiveAIHuman onContactClick={openContactModal} />
        <InteractiveFeatures />
        <CTASection 
          title="Ready to go global?" 
          subtitle="Join the world's most innovative companies using Quantum Climb to break language barriers."
          onContactClick={openContactModal}
        />
        <Faq />
        <FinalCTA onContactClick={openContactModal} />
      </main>

      <Footer />

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
}
