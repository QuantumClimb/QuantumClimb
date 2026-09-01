import { useState, useEffect } from "react";
import { TechCanvas } from "../components/TechCanvas";
import { Reveal } from "../components/Reveal";
import { 
  ArrowRight, 
  ArrowDown, 
  Check, 
  Sparkles, 
  Sliders, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Music, 
  Mic, 
  FileText, 
  Radio, 
  Headphones, 
  Volume2, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Zap,
  Info
} from "lucide-react";

type AudioPluginsPageProps = Readonly<{
  onOpenContactModal: () => void;
}>;

// Documented 8 Voice Profiles
const VOICE_PROFILES = [
  {
    id: "neutral-dialogue",
    name: "Neutral Dialogue",
    category: "General Spoken Word",
    description: "Balanced, transparent baseline response for mixed dialogue formats with neutral spectral weight.",
    eqTarget: "Linear baseline / dynamic smoothing",
    icon: Mic,
  },
  {
    id: "male-dialogue",
    name: "Male Dialogue",
    category: "Chest Resonance Tuning",
    description: "Calibrated fundamental frequency weighting with targeted lower-mid resonance damping.",
    eqTarget: "100 Hz - 250 Hz fundamental alignment",
    icon: Volume2,
  },
  {
    id: "female-dialogue",
    name: "Female Dialogue",
    category: "Air & Presence Shaping",
    description: "Dynamic high-mid management with sibilance mitigation and high-frequency presence enhancement.",
    eqTarget: "3.5 kHz - 8 kHz smooth contouring",
    icon: Sparkles,
  },
  {
    id: "warm-narration",
    name: "Warm Narration",
    category: "Intimate Spoken Word",
    description: "Rich low-frequency harmonic body tuned for intimate storytelling and long-form voiceover.",
    eqTarget: "Subtle low-shelf warmth + proximity preservation",
    icon: Headphones,
  },
  {
    id: "commercial-voice",
    name: "Commercial Voice",
    category: "High-Impact Broadcast",
    description: "Forward, punchy vocal delivery designed to cut through background scoring and sound design.",
    eqTarget: "1.5 kHz - 4 kHz presence boost",
    icon: Radio,
  },
  {
    id: "character-voice",
    name: "Character Voice",
    category: "Stylized Dialogue",
    description: "Dynamic flexibility for stylized animation, video game dialogue, and dramatic accentuation.",
    eqTarget: "Broad-band non-linear response",
    icon: Compass,
  },
  {
    id: "audiobook",
    name: "Audiobook",
    category: "Long-Form Listening",
    description: "Fatigue-reducing clarity and smooth dynamic contouring for uninterrupted sustained listening.",
    eqTarget: "Gentle high-frequency softening / steady level",
    icon: FileText,
  },
  {
    id: "podcast",
    name: "Podcast",
    category: "Conversational Media",
    description: "Upfront intelligibility and acoustic proximity compensation for varied recording conditions.",
    eqTarget: "Damped room reflection / conversational punch",
    icon: Activity,
  },
] as const;

// Documented 15 Factory Presets
const FACTORY_PRESETS = [
  {
    num: "01",
    name: "Natural Conversation",
    category: "Everyday Spoken Word",
    humanize: "45%",
    profile: "Neutral Dialogue",
    description: "Subtle cadence relaxation and transparent dynamic smoothing for realistic conversational stems.",
    featured: false,
  },
  {
    num: "02",
    name: "Cinematic Dialogue",
    category: "Film & High-End Drama",
    humanize: "83%",
    profile: "Female Dialogue",
    description: "Dramatic weight, spacious acoustic presence, and rich dialogue body tailored for film scoring.",
    featured: false,
  },
  {
    num: "03",
    name: "Warm Narration",
    category: "Voiceover & Documentary",
    humanize: "60%",
    profile: "Warm Narration",
    description: "Intimate, fatigue-free warmth and subtle low-frequency harmonic saturation for storytelling.",
    featured: false,
  },
  {
    num: "04",
    name: "Commercial Voice",
    category: "Advertising & Promo",
    humanize: "70%",
    profile: "Commercial Voice",
    description: "Polished, upfront vocal delivery designed to stand out against energetic music tracks.",
    featured: false,
  },
  {
    num: "05",
    name: "Documentary",
    category: "Factual & Educational",
    humanize: "50%",
    profile: "Neutral Dialogue",
    description: "Objective, natural acoustic perspective preserving authentic vocal characteristics.",
    featured: false,
  },
  {
    num: "06",
    name: "Audiobook",
    category: "Long-Form Narrative",
    humanize: "55%",
    profile: "Audiobook",
    description: "Smooth, articulate clarity and balanced spatial treatment optimized for sustained headphone listening.",
    featured: false,
  },
  {
    num: "07",
    name: "Energetic Presenter",
    category: "Keynote & Corporate",
    humanize: "65%",
    profile: "Commercial Voice",
    description: "Controlled punch, fast transient response, and focused vocal forwardness for presenters.",
    featured: false,
  },
  {
    num: "08",
    name: "Soft Emotional",
    category: "Intimate Vocal Performance",
    humanize: "75%",
    profile: "Character Voice",
    description: "Delicate harmonic enhancement and gentle spatial dispersion for quiet, nuanced deliveries.",
    featured: false,
  },
  {
    num: "09",
    name: "Broadcast Clean",
    category: "Studio Radio & Stream",
    humanize: "40%",
    profile: "Podcast",
    description: "Transparent resonance damping and controlled modern broadcast presence with tight imaging.",
    featured: false,
  },
  {
    num: "10",
    name: "Close Microphone",
    category: "Proximity & ASMR",
    humanize: "50%",
    profile: "Male Dialogue",
    description: "Proximity compensation, rich low-mid intimacy, and controlled breath dynamics.",
    featured: false,
  },
  {
    num: "11",
    name: "Metallic AI Repair",
    category: "AI Dubbing & Synthetic Stems",
    humanize: "88%",
    profile: "Neutral Dialogue",
    description: "Specialized DSP targeting the harsh, rigid, comb-filtered artifacts common in AI synthesis and neural voice cloning.",
    featured: true,
    highlightBadge: "FLAGSHIP AI WORKFLOW",
  },
  {
    num: "12",
    name: "Harsh Sibilance Repair",
    category: "Vocal Restoration",
    humanize: "62%",
    profile: "Female Dialogue",
    description: "Smooths aggressive high-frequency friction and excessive synthetic sibilance without dulling the top end.",
    featured: false,
  },
  {
    num: "13",
    name: "Thin Voice Recovery",
    category: "Body Restoration",
    humanize: "78%",
    profile: "Male Dialogue",
    description: "Restores missing low-frequency weight and harmonic density in weak or overly filtered recordings.",
    featured: false,
  },
  {
    num: "14",
    name: "Stereo Natural",
    category: "Spatial Widening",
    humanize: "58%",
    profile: "Neutral Dialogue",
    description: "Expands perceived acoustic width and air while strictly maintaining tight mono phantom center.",
    featured: false,
  },
  {
    num: "15",
    name: "Localization Neutral",
    category: "Multilingual Dubbing Pipeline",
    humanize: "80%",
    profile: "Neutral Dialogue",
    description: "Standardized humanization finishing preset for multi-language translation and dubbed audio pipelines.",
    featured: true,
    highlightBadge: "LOCALIZATION ESSENTIAL",
  },
] as const;

// Interface Hotspots
const INTERFACE_ZONES = [
  {
    id: "humanize",
    title: "Humanize Central Macro",
    shortDesc: "0% to 100% macro coordinating all underlying DSP dimensions.",
    details: "Coordinates spectral smoothing, micro-timing modulation, nonlinear saturation, and spatial depth in one unified control.",
    accent: "purple-amber",
  },
  {
    id: "preset",
    title: "Preset Browser",
    shortDesc: "15 documented factory starting points with quick A/B recall.",
    details: "Instant access to specialized treatments ranging from Natural Conversation to Metallic AI Repair.",
    accent: "purple",
  },
  {
    id: "ab-test",
    title: "A / B Comparison",
    shortDesc: "Instant switching between two independent processing ideas.",
    details: "Allows producers to build a conservative treatment and a stronger alternative before committing to a final print.",
    accent: "purple",
  },
  {
    id: "before-after",
    title: "Before / After Visualizer",
    shortDesc: "Real-time dual-waveform spectral comparison display.",
    details: "Purple indicates the raw input condition; warm amber displays the conditioned, humanized output result.",
    accent: "amber",
  },
  {
    id: "profile",
    title: "Voice Profile Selector",
    shortDesc: "8 calibrated vocal acoustic models.",
    details: "Guides internal frequency curves and dynamics behavior to match specific voice genders and production contexts.",
    accent: "purple",
  },
  {
    id: "detail-knobs",
    title: "6 Detail Parameter Knobs",
    shortDesc: "Emotion, Natural Timing, Voice Body, Clarity, Space, Stereo.",
    details: "Fine-tune individual aspects around the central Humanize macro with precision percentage readouts.",
    accent: "amber",
  },
  {
    id: "stereo-hq",
    title: "Stereo HQ Mode",
    shortDesc: "High-resolution spatial imaging algorithm.",
    details: "Provides natural dimensional widening while maintaining 100% mono phase correlation.",
    accent: "amber",
  },
  {
    id: "io-gain",
    title: "Calibrated I/O Metering",
    shortDesc: "Input & Output trim with real-time dB readouts.",
    details: "Precise gain-staging with safety ceiling monitoring to ensure zero distortion and optimal dynamic range.",
    accent: "amber",
  },
] as const;

export function AudioPluginsPage({ onOpenContactModal }: AudioPluginsPageProps) {
  const [selectedProfile, setSelectedProfile] = useState<string>("neutral-dialogue");
  const [selectedPreset, setSelectedPreset] = useState<string>("11");
  const [activeZone, setActiveZone] = useState<string>("humanize");
  const [abState, setAbState] = useState<"A" | "B">("A");

  // Page-specific SEO configuration
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Q HUMAN Audio Plugin | Vocal Humanization by Quantum Climb";

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalMeta = metaDescription?.getAttribute("content") ?? "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Q HUMAN is a Windows VST3 vocal humanization plugin by Quantum Climb, designed for AI dubbing, localization, narration, dialogue and heavily processed vocal production."
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", originalMeta);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeProfileData = VOICE_PROFILES.find((p) => p.id === selectedProfile) ?? VOICE_PROFILES[0];
  const activePresetData = FACTORY_PRESETS.find((p) => p.num === selectedPreset) ?? FACTORY_PRESETS[10];

  return (
    <div className="relative overflow-x-hidden bg-black text-zinc-300">
      {/* 01. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-black pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Environmental Glow & Technical Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] z-10 opacity-60" />
          <TechCanvas />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Eyebrow */}
            <Reveal type="mask" className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono uppercase tracking-[0.3em] font-semibold">
                <Sliders className="w-3 h-3 text-purple-400" />
                QUANTUM CLIMB / AUDIO TECHNOLOGY
              </span>
            </Reveal>

            {/* Product Name & Editorial Statement */}
            <Reveal type="mask" className="mb-4">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
                Q HUMAN
              </h1>
            </Reveal>

            <Reveal type="fade-up" delay={0.1} className="mb-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-200 tracking-tight max-w-3xl mx-auto">
                MAKE THE VOICE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-zinc-100 to-amber-300 font-medium">FEEL HUMAN.</span>
              </p>
            </Reveal>

            {/* Supporting Copy */}
            <Reveal type="fade-up" delay={0.2} className="mb-10">
              <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
                A focused vocal processing environment created to reduce the rigid, metallic and overly perfect qualities often heard in AI generated, dubbed and heavily edited voices.
              </p>
            </Reveal>

            {/* Primary & Secondary CTAs */}
            <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => scrollToSection("interface-section")}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 border border-white cursor-pointer"
              >
                EXPLORE Q HUMAN <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href="/docs/Q_HUMAN_Product_Catalogue_and_User_Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-semibold tracking-tight hover:border-white hover:bg-white/5 transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                VIEW PRODUCT GUIDE <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Reveal>

            {/* Hero Product Visual Display */}
            <Reveal type="fade-up" delay={0.4} className="relative max-w-4xl mx-auto">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-[0_20px_80px_-15px_rgba(147,51,234,0.25)] group bg-zinc-950">
                {/* Purple to Amber Ambient Halo Edge */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-amber-500/10 opacity-70 pointer-events-none" />
                <img
                  src="/images/Audio plugins/qhuman_cover1.png"
                  alt="Q HUMAN Vocal Processing VST3 Plugin by Quantum Climb"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain brightness-105 transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider px-2">
                <span className="flex items-center gap-1.5 text-purple-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  BEFORE: RAW VOCAL SIGNAL
                </span>
                <span className="text-zinc-600 hidden sm:inline">WINDOWS VST3 ARCHITECTURE</span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  AFTER: HUMANISED OUTPUT
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02. PRODUCT INTRODUCTION (THE PROBLEM & THE APPROACH) */}
      <section className="py-24 md:py-36 bg-zinc-950 border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                VOCAL HUMANIZATION
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                FROM SYNTHETIC <br className="hidden sm:inline" />TO EXPRESSIVE.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
                Q HUMAN is designed for dialogue, localization, narration, podcast, commercial and vocal production workflows. It combines profile aware spectral shaping, subtle nonlinear body, controlled timing and spatial treatment inside a fast, preset led interface.
              </p>
            </Reveal>
          </div>

          {/* Two-Part Editorial Composition */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            <Reveal type="fade-up" delay={0.2} className="p-8 sm:p-10 border border-white/10 bg-black/60 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                  THE PROBLEM
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">
                Spectral Rigidity & Synthetic Artifacts
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                AI and highly edited vocals can sound spectrally rigid, mechanically timed, thin, over bright or disconnected from the production around them.
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={0.3} className="p-8 sm:p-10 border border-amber-500/20 bg-black/60 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  THE Q HUMAN APPROACH
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">
                Unified Multi-Dimensional Shaping
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Shape several complementary dimensions together through one central Humanize control or refine individual parameters while maintaining a clear before and after workflow.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03. INTERFACE SECTION */}
      <section id="interface-section" className="py-24 md:py-36 bg-black border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                THE INTERFACE
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                ONE SCREEN. <br className="hidden sm:inline" />ONE CLEAR VOCAL DECISION.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                Input condition, processing intent and output result are presented in one uninterrupted production view.
              </p>
            </Reveal>
          </div>

          {/* Interactive Interface Viewer */}
          <div className="mb-12">
            <div className="relative rounded-sm overflow-hidden border border-white/10 bg-zinc-950 p-2 sm:p-4">
              <img
                src="/images/Audio plugins/qhuman_cover3.png"
                alt="Q HUMAN vocal humanization VST3 interface"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain block mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Interface Breakdown Modules */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTERFACE_ZONES.map((zone) => {
              const isSelected = activeZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  className={`p-5 text-left border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-purple-500/60 bg-purple-950/20 text-white"
                      : "border-white/5 bg-zinc-950/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                      {zone.title}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-purple-400" : "bg-zinc-600"}`} />
                  </div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-2">
                    {zone.shortDesc}
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-normal border-t border-white/5 pt-2">
                    {zone.details}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. THE HUMANIZE ENGINE */}
      <section id="humanize-engine" className="py-24 md:py-36 bg-zinc-950 border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                THE HUMANIZE ENGINE
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                ONE CONTROL. <br className="hidden sm:inline" />MULTIPLE DIMENSIONS.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
                The Humanize macro coordinates the overall depth of the vocal humanization treatment while individual controls allow producers to refine the result around the source performance.
              </p>
            </Reveal>
          </div>

          {/* 6 Core Processing Dimensions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. EMOTION */}
            <div className="p-8 border border-white/10 bg-black/60 relative group hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  01 / EXPRESSION
                </span>
                <span className="text-xs font-mono text-zinc-500">60% NOMINAL</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                Emotion
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Shapes perceived expressiveness and variation, dynamically enhancing subtle inflection and dynamic micro-accentuation.
              </p>
            </div>

            {/* 2. NATURAL TIMING */}
            <div className="p-8 border border-white/10 bg-black/60 relative group hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  02 / CADENCE
                </span>
                <span className="text-xs font-mono text-zinc-500">43% NOMINAL</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                Natural Timing
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Introduces controlled micro timing movement intended to reduce rigid cadence and grid-locked speech pacing.
              </p>
            </div>

            {/* 3. VOICE BODY */}
            <div className="p-8 border border-white/10 bg-black/60 relative group hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  03 / WARMTH & WEIGHT
                </span>
                <span className="text-xs font-mono text-zinc-500">88% NOMINAL</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                Voice Body
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Adds weight and warmth through profile guided low frequency shaping and subtle nonlinear saturation.
              </p>
            </div>

            {/* 4. CLARITY */}
            <div className="p-8 border border-white/10 bg-black/60 relative group hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  04 / RESONANCE & SIBILANCE
                </span>
                <span className="text-xs font-mono text-zinc-500">80% NOMINAL</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                Clarity
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Provides resonance control, dynamic sibilance management and presence shaping without brittle high-frequency harshness.
              </p>
            </div>

            {/* 5. SPACE */}
            <div className="p-8 border border-white/10 bg-black/60 relative group hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  05 / ACOUSTIC DIMENSION
                </span>
                <span className="text-xs font-mono text-zinc-500">35% NOMINAL</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                Space
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Controls spatial depth and short movement around the voice, settling the vocal naturally into real room acoustics.
              </p>
            </div>

            {/* 6. STEREO */}
            <div className="p-8 border border-white/10 bg-black/60 relative group hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  06 / IMAGING
                </span>
                <span className="text-xs font-mono text-zinc-500">75% NOMINAL</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                Stereo
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Adjusts perceived width while retaining strict mono awareness and center phantom channel coherence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. IN THE STUDIO (REAL WORLD PRODUCTION VISUAL) */}
      <section className="py-24 md:py-36 bg-black border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                IN THE STUDIO
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                BUILT FOR <br className="hidden sm:inline" />REAL PRODUCTION.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
                From AI dubbing and localization to narration, commercial voice and creative vocal production, Q HUMAN is designed to sit naturally inside a professional production workflow.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.2} className="mt-3">
              <p className="text-xs sm:text-sm font-mono text-purple-400/80 uppercase tracking-widest">
                Shape the voice. Preserve the performance.
              </p>
            </Reveal>
          </div>

          {/* Large Cinematic Studio Visual */}
          <Reveal type="fade-up" delay={0.3} className="relative max-w-6xl mx-auto">
            <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-[0_20px_80px_-15px_rgba(147,51,234,0.2)] group bg-zinc-950">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
              <img
                src="/images/Audio plugins/qhuman_cover4.png"
                alt="Q HUMAN vocal humanization plugin in a professional music production studio"
                width={2048}
                height={1365}
                className="w-full h-auto object-cover block mx-auto brightness-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider px-2">
              <span className="text-purple-400">PRO TOOLS SESSION / HYBRID STUDIO WORKFLOW</span>
              <span className="hidden sm:inline text-zinc-600">Q HUMAN VST3 VOCAL PROCESSING</span>
              <span className="text-zinc-500">REAL-TIME MONITORING</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06. PRODUCTION WORKFLOWS */}
      <section className="py-24 md:py-36 bg-zinc-950 border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                PRODUCTION WORKFLOWS
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                BUILT FOR THE VOICES <br className="hidden sm:inline" />PRODUCTION ACTUALLY USES.
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {/* 01 AI DUBBING + LOCALIZATION */}
            <div className="p-8 sm:p-10 border border-white/10 bg-zinc-950/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block mb-4">
                  01 / FINISHING & HARMONIC SHAPING
                </span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  AI Dubbing + Localization
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  A finishing and character shaping stage for multilingual and synthetic dialogue workflows. Blends synthesized vocal stems naturally into source audio mixes.
                </p>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider border-t border-white/5 pt-4">
                Primary Presets: Metallic AI Repair, Localization Neutral
              </div>
            </div>

            {/* 02 NARRATION + AUDIOBOOK */}
            <div className="p-8 sm:p-10 border border-white/10 bg-zinc-950/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block mb-4">
                  02 / SUSTAINED LISTENING
                </span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  Narration + Audiobook
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  Controlled warmth, clarity and restrained spatial treatment for sustained listening comfort across hours of voiceover and narrative dialogue.
                </p>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider border-t border-white/5 pt-4">
                Primary Presets: Warm Narration, Audiobook
              </div>
            </div>

            {/* 03 COMMERCIAL + PRESENTER */}
            <div className="p-8 sm:p-10 border border-white/10 bg-zinc-950/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block mb-4">
                  03 / ENGAGEMENT & CLARITY
                </span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  Commercial + Presenter
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  Engaging vocal character for advertising, brand films, presentations, explainers and promotional content designed to cut cleanly over backing music.
                </p>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider border-t border-white/5 pt-4">
                Primary Presets: Commercial Voice, Energetic Presenter
              </div>
            </div>

            {/* 04 SINGING + CREATIVE VOCALS */}
            <div className="p-8 sm:p-10 border border-white/10 bg-zinc-950/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block mb-4">
                  04 / ORGANIC CHARACTER
                </span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  Singing + Creative Vocals
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  Subtle character shaping for selected vocal productions after primary pitch and timing correction, infusing analog warmth and spatial breath.
                </p>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider border-t border-white/5 pt-4">
                Primary Presets: Soft Emotional, Stereo Natural
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. VOICE PROFILES */}
      <section className="py-24 md:py-36 bg-zinc-950 border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                VOICE PROFILES
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                TELL Q HUMAN <br className="hidden sm:inline" />WHAT IT IS HEARING.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                Voice Profiles guide the underlying frequency and dynamics behaviour toward a vocal type or production context.
              </p>
            </Reveal>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-zinc-500 bg-white/5 px-3 py-1 border border-white/5">
              <Info className="w-3.5 h-3.5 text-purple-400" />
              IMPORTANT: Voice Profiles guide the underlying DSP architecture and are distinct from factory presets.
            </div>
          </div>

          {/* 8 Profiles Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VOICE_PROFILES.map((profile) => {
              const isSelected = selectedProfile === profile.id;
              const IconComponent = profile.icon;
              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`p-6 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-purple-500/80 bg-purple-950/30 text-white"
                      : "border-white/5 bg-black/60 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className={`w-5 h-5 ${isSelected ? "text-purple-400" : "text-zinc-500"}`} />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        {profile.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                      {profile.description}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-3">
                    Target: {profile.eqTarget}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Profile Summary Banner */}
          <div className="mt-8 p-6 border border-purple-500/20 bg-purple-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1">
                ACTIVE ACOUSTIC TARGET MODEL
              </span>
              <div className="text-lg font-bold text-white uppercase">
                {activeProfileData.name} — {activeProfileData.category}
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1">
                {activeProfileData.description}
              </p>
            </div>
            <div className="text-xs font-mono text-purple-300 bg-purple-900/40 px-3 py-1.5 border border-purple-500/30 whitespace-nowrap">
              {activeProfileData.eqTarget}
            </div>
          </div>
        </div>
      </section>

      {/* 07. FACTORY PRESETS */}
      <section className="py-24 md:py-36 bg-black border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                FACTORY PRESETS
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                15 STARTING POINTS. <br className="hidden sm:inline" />ONE FASTER WORKFLOW.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                Every factory preset establishes a distinct combination of Humanize, profile, detail controls and stereo behaviour.
              </p>
            </Reveal>
          </div>

          {/* 15 Presets Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACTORY_PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.num;
              const isFeatured = preset.featured;
              return (
                <button
                  key={preset.num}
                  onClick={() => setSelectedPreset(preset.num)}
                  className={`p-6 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                    isFeatured
                      ? isSelected
                        ? "border-amber-500 bg-amber-950/20 text-white shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                        : "border-amber-500/40 bg-zinc-950/80 text-zinc-300 hover:border-amber-400"
                      : isSelected
                      ? "border-purple-500/80 bg-purple-950/20 text-white"
                      : "border-white/5 bg-zinc-950/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                      {preset.highlightBadge}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-zinc-500 font-bold">{preset.num}</span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        {preset.category}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold uppercase tracking-tight mb-2 ${isFeatured ? "text-amber-200" : "text-white"}`}>
                      {preset.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                      {preset.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/5 pt-3 text-zinc-500">
                    <span>Profile: {preset.profile}</span>
                    <span className="text-purple-400">Macro: {preset.humanize}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08. BEFORE / AFTER + A/B */}
      <section className="py-24 md:py-36 bg-zinc-950 border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                A/B COMPARISON
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                HEAR THE DECISION. <br className="hidden sm:inline" />NOT THE PROCESS.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                Q HUMAN provides A/B comparison for two independent processing ideas, allowing producers to build a conservative treatment and a stronger alternative before choosing the final direction.
              </p>
            </Reveal>
          </div>

          {/* Interactive Dual-State Comparator */}
          <div className="p-8 sm:p-12 border border-white/10 bg-black relative">
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setAbState("A")}
                className={`px-6 py-2.5 text-xs font-mono uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  abState === "A"
                    ? "border-purple-500 bg-purple-600/20 text-white"
                    : "border-white/10 text-zinc-500 hover:text-white"
                }`}
              >
                STATE A: CONSERVATIVE DIALOGUE (50%)
              </button>
              <button
                onClick={() => setAbState("B")}
                className={`px-6 py-2.5 text-xs font-mono uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  abState === "B"
                    ? "border-amber-500 bg-amber-600/20 text-white"
                    : "border-white/10 text-zinc-500 hover:text-white"
                }`}
              >
                STATE B: CINEMATIC RE-CHARACTERIZATION (83%)
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
              {/* BEFORE STATE */}
              <div className="p-6 border border-purple-500/20 bg-purple-950/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">
                    INPUT STATE / BEFORE (PURPLE)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">RAW SIGNAL</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Unconditioned Voice Stem</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Rigid synthetic cadence, high-frequency metallic artifacts, comb-filtered sibilance, and zero acoustic room interaction.
                </p>
              </div>

              {/* AFTER STATE */}
              <div className="p-6 border border-amber-500/20 bg-amber-950/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                    OUTPUT RESULT / AFTER (AMBER)
                  </span>
                  <span className="text-[10px] font-mono text-amber-400/80">
                    {abState === "A" ? "50% PROCESSING DEPTH" : "83% FULL TREATMENT"}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white mb-2">
                  {abState === "A" ? "Subtle Organic Timing & Warmth" : "Full Expressive Cinematic Shaping"}
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {abState === "A"
                    ? "Transparently relaxed timing, restored vocal fundamental weight, and natural dynamic presence."
                    : "Rich lower-mid body, dynamic inflection, widened stereo perspective, and complete removal of synthetic buzz."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09. TECHNICAL VALIDATION */}
      <section className="py-24 md:py-36 bg-black border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                VALIDATED ON REAL VOCALS
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                BUILT TO WORK <br className="hidden sm:inline" />BEYOND THE DEMO.
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
                The installed Windows VST3 was exercised through an external host harness across ten real vocal stems and all fifteen factory presets.
              </p>
            </Reveal>
          </div>

          {/* 4 Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="p-6 sm:p-8 border border-white/10 bg-zinc-950/60 text-center">
              <div className="text-4xl sm:text-6xl font-bold text-white tracking-tighter mb-2">
                150
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
                REAL VOCAL PRESET PASSES
              </div>
            </div>

            <div className="p-6 sm:p-8 border border-white/10 bg-zinc-950/60 text-center">
              <div className="text-4xl sm:text-6xl font-bold text-white tracking-tighter mb-2">
                0
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                NAN / INF SAMPLES
              </div>
            </div>

            <div className="p-6 sm:p-8 border border-white/10 bg-zinc-950/60 text-center">
              <div className="text-4xl sm:text-6xl font-bold text-white tracking-tighter mb-2">
                0
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
                SAFETY CEILING CONTACTS
              </div>
            </div>

            <div className="p-6 sm:p-8 border border-white/10 bg-zinc-950/60 text-center">
              <div className="text-4xl sm:text-6xl font-bold text-white tracking-tighter mb-2">
                0
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                REPORTED LATENCY SAMPLES
              </div>
            </div>
          </div>

          {/* Documented Engineering Context */}
          <div className="p-8 border border-white/10 bg-zinc-950/40 text-xs text-zinc-400 space-y-3 font-light leading-relaxed">
            <p>
              • 10 real 24-bit / 48 kHz stereo vocal stems were used in the documented test corpus.
            </p>
            <p>
              • All ten stems completed all fifteen preset passes without a processing crash.
            </p>
            <p>
              • At calibrated nominal input levels, no rendered sample touched the internal emergency ceiling during the documented test.
            </p>
            <p className="text-zinc-500 italic pt-2 border-t border-white/5">
              Note: Technical stability does not by itself prove that every preset is ideal for every voice. Final aesthetic quality remains a listening decision.
            </p>
          </div>
        </div>
      </section>

      {/* 10. PRODUCT SPECIFICATIONS */}
      <section className="py-24 md:py-36 bg-zinc-950 border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                CURRENT RELEASE
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                Q HUMAN <br className="hidden sm:inline" />WINDOWS VST3.
              </h2>
            </Reveal>
          </div>

          <div className="border border-white/10 bg-black divide-y divide-white/5">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">FORMAT</span>
              <span className="text-sm font-semibold text-white sm:col-span-2">VST3 (64-bit Native)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">PLATFORM</span>
              <span className="text-sm font-semibold text-white sm:col-span-2">Windows x86-64 (Windows 10 / 11)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">DOCUMENTED TEST SAMPLE RATE</span>
              <span className="text-sm font-semibold text-white sm:col-span-2">48 kHz</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">REPORTED LATENCY</span>
              <span className="text-sm font-semibold text-white sm:col-span-2">0 samples</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">FACTORY PRESETS</span>
              <span className="text-sm font-semibold text-white sm:col-span-2">15 Production Starting Points</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">VOICE PROFILES</span>
              <span className="text-sm font-semibold text-white sm:col-span-2">8 Calibrated Vocal Target Models</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 items-start">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">INSTALL LOCATION</span>
              <code className="text-xs font-mono text-purple-300 sm:col-span-2 bg-purple-950/30 p-2 border border-purple-500/20 break-all">
                C:\Program Files\Common Files\VST3\Q HUMAN.vst3
              </code>
            </div>
          </div>

          <p className="text-xs text-zinc-500 text-center mt-6 font-light">
            Compatibility with a particular DAW, operating system revision or computer should be confirmed before purchase or deployment.
          </p>
        </div>
      </section>

      {/* 11. WHAT Q HUMAN IS AND IS NOT */}
      <section className="py-24 md:py-36 bg-black border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="text-center mb-16">
            <Reveal type="mask" className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-semibold">
                CLEAR PRODUCT SCOPE
              </span>
            </Reveal>
            <Reveal type="mask" className="mb-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                WHAT Q HUMAN IS <br className="hidden sm:inline" />AND IS NOT.
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* WHAT Q HUMAN IS */}
            <div className="p-8 border border-white/10 bg-zinc-950/60">
              <div className="flex items-center gap-2 mb-6">
                <Check className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  What Q HUMAN Is
                </h3>
              </div>
              <ul className="space-y-3.5 text-xs text-zinc-300 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span>
                  A vocal humanization tool for synthetic and edited vocals
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span>
                  A finishing stage for dialogue, AI dubbing & voiceovers
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span>
                  A character and body shaping audio environment
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span>
                  A production workflow accelerator for fast decisions
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span>
                  A tool to reduce rigid synthetic tone & metallic artifacts
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span>
                  A macro processor introducing controlled organic timing & space
                </li>
              </ul>
            </div>

            {/* WHAT Q HUMAN IS NOT */}
            <div className="p-8 border border-white/10 bg-zinc-950/60">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-zinc-500" />
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  What Q HUMAN Is Not
                </h3>
              </div>
              <ul className="space-y-3.5 text-xs text-zinc-400 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-600 font-bold">✕</span>
                  Not a pitch shifter or auto-tune plugin
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-600 font-bold">✕</span>
                  Not a pitch correction system
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-600 font-bold">✕</span>
                  Not a standard dynamics compressor
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-600 font-bold">✕</span>
                  Not a noise removal or de-noising tool
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-600 font-bold">✕</span>
                  Not a conventional reverb replacement
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-600 font-bold">✕</span>
                  Not a voice generator or voice cloning engine
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BRAND STATEMENT */}
      <section className="py-32 md:py-44 bg-zinc-950 border-b border-white/5 relative text-center">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <Reveal type="mask" className="mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 font-semibold">
              THE VOCAL IS STILL THE PERFORMANCE
            </span>
          </Reveal>
          <Reveal type="mask" className="mb-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]">
              TECHNOLOGY SHOULD <br />SERVE EXPRESSION.
            </h2>
          </Reveal>
          <Reveal type="fade-up" delay={0.2}>
            <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Q HUMAN is designed to give producers, localization teams and creators a controlled way to move synthetic or heavily edited vocal material closer to a believable, emotionally useful production result.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="py-24 md:py-36 bg-black relative text-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[160px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <Reveal type="mask" className="mb-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-none">
              MAKE THE VOICE <br />FEEL HUMAN.
            </h2>
          </Reveal>
          <Reveal type="fade-up" delay={0.1} className="mb-10">
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
              Discover Q HUMAN by Quantum Climb.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/docs/Q_HUMAN_Product_Catalogue_and_User_Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 border border-white cursor-pointer"
            >
              VIEW PRODUCT GUIDE <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenContactModal}
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-semibold tracking-tight hover:border-white hover:bg-white/5 transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              START A PROJECT <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
