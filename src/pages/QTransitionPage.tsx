import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, Play, ShoppingCart, ChevronDown,
  Zap, Activity, Music, Sliders, Cpu, Layers,
  BarChart2, CheckCircle, Monitor, Package,
  Users, Volume2, GitMerge, Repeat, SkipForward,
  Disc, Radio, Headphones, Star,
} from "lucide-react";
import { Reveal } from "../components/Reveal";

/*
 * PayPal Configuration
 * Set VITE_PAYPAL_CLIENT_ID and VITE_QT_PRICE in .env to activate.
 * Never hardcode PayPal credentials in source code.
 */
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID ?? "";
const QT_PRICE_DISPLAY = (import.meta.env.VITE_QT_PRICE as string | undefined) ?? "[Q_TRANSITION_PRICE]";
const QT_PRICE_IS_SET = Boolean(import.meta.env.VITE_QT_PRICE);

export type QTransitionPageProps = Readonly<{
  onNavigateProducts: () => void;
}>;

function WaveformSVG({ className = "" }: { className?: string }) {
  const bars = [40, 60, 80, 100, 72, 55, 90, 65, 45, 78, 95, 58, 42, 70, 88, 50, 65, 82, 48, 75];
  return (
    <svg viewBox="0 0 200 60" className={className} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((h, i) => (
        <rect key={i} x={i * 10 + 1} y={(60 - h) / 2} width={8} height={h} rx={1} className="fill-purple-500/40" />
      ))}
    </svg>
  );
}

function BeatGridSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 20" className={className} preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={i * 18 + 2} y={i % 4 === 0 ? 0 : 5}
          width={i % 4 === 0 ? 3 : 1.5} height={i % 4 === 0 ? 20 : 10}
          className={i % 4 === 0 ? "fill-purple-400/80" : "fill-zinc-600/60"} />
      ))}
    </svg>
  );
}

function PurchaseModal({ onClose }: { onClose: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isReady = QT_PRICE_IS_SET && Boolean(PAYPAL_CLIENT_ID);

  const handlePayPal = async () => {
    if (!isReady) return;
    setIsProcessing(true);
    try {
      /*
       * PAYPAL INTEGRATION POINT
       * Replace with your server-side checkout:
       *   const res = await fetch("/api/create-paypal-order", { method: "POST" });
       *   const { approvalUrl } = await res.json();
       *   window.location.href = approvalUrl;
       */
      await new Promise((r) => setTimeout(r, 800));
      alert("PayPal checkout is structurally ready. Connect /api/create-paypal-order to activate.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-zinc-950 border border-white/10 w-full max-w-md shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600" />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer">CLOSE X</button>
          <div className="mb-8">
            <div className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-2">QUANTUM CLIMB AUDIO</div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-1">Q TRANSITION</h2>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">SMART MUSIC PLAYER - VERSION 0.1</div>
          </div>
          <div className="mb-8 p-5 border border-white/10 bg-black/40">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">PRICE</div>
            <div className="text-4xl font-black text-white tracking-tight">
              {QT_PRICE_IS_SET ? QT_PRICE_DISPLAY : <span className="text-zinc-500 text-2xl">[Price to be confirmed]</span>}
            </div>
          </div>
          <ul className="space-y-2.5 mb-8">
            {["Digital download", "Windows standalone application", "Q Transition version 0.1", "Secure PayPal checkout"].map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />{b}
              </li>
            ))}
          </ul>
          <button id="qt-paypal-buy-btn" onClick={handlePayPal} disabled={isProcessing}
            className="w-full py-4 bg-[#0070ba] hover:bg-[#005ea6] disabled:opacity-60 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer">
            {isProcessing ? <span className="animate-pulse">PROCESSING...</span> : <><ShoppingCart className="w-4 h-4" /> BUY NOW WITH PAYPAL</>}
          </button>
          {!isReady && (
            <p className="mt-4 text-[11px] font-mono text-amber-400/80 text-center leading-relaxed">
              PayPal integration ready. Set VITE_PAYPAL_CLIENT_ID + VITE_QT_PRICE in .env to activate.
            </p>
          )}
          <p className="mt-4 text-[10px] font-mono text-zinc-600 text-center">Secured by PayPal - Digital download - No subscription</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function QTransitionPage({ onNavigateProducts }: QTransitionPageProps) {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroImgRef.current;
    if (!el) return;
    const onScroll = () => { el.style.transform = `translateY(${window.scrollY * 0.22}px)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPurchase = () => setIsPurchaseOpen(true);
  const closePurchase = () => setIsPurchaseOpen(false);

  return (
    <>
      <div className="bg-black text-zinc-300 min-h-screen overflow-x-hidden">

        {/* S1: HERO */}
        <section id="qt-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" aria-label="Q Transition hero">
          <div ref={heroImgRef} className="absolute inset-0 scale-110 will-change-transform">
            <img src="/images/q-transition/qt-hero-windowed.png" alt="Q Transition application interface" className="w-full h-full object-cover object-center" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/25 to-black/90" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none">
            <WaveformSVG className="w-full h-full opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </div>
          <div className="relative z-10 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto w-full text-center pt-32 pb-24">
            <Reveal type="fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/70 border border-purple-500/30 backdrop-blur-md text-purple-400 text-xs font-mono tracking-widest uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                QUANTUM CLIMB AUDIO
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.08}>
              <h1 className="text-[clamp(3.5rem,13vw,10rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.88] mb-6">Q TRANSITION</h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.16}>
              <div className="text-[clamp(0.85rem,2.5vw,1.5rem)] font-bold text-zinc-200 uppercase tracking-[0.15em] mb-8 leading-tight">THE SMARTER WAY TO KEEP MUSIC MOVING.</div>
            </Reveal>
            <Reveal type="fade-up" delay={0.22}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                A smart desktop music player built for seamless playback, intelligent track analysis and assisted transitions.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.28}>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {["VERSION 0.1", "WINDOWS", "STANDALONE APPLICATION"].map((b) => (
                  <span key={b} className="px-3 py-1 border border-white/20 bg-white/5 text-xs font-mono text-zinc-300 tracking-widest uppercase backdrop-blur-sm">{b}</span>
                ))}
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.34}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button id="qt-hero-buy-btn" onClick={openPurchase} className="px-10 py-4 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer">
                  <ShoppingCart className="w-4 h-4" /> BUY Q TRANSITION
                </button>
                <a href="#qt-video" id="qt-hero-watch-btn" className="px-10 py-4 border border-white/25 bg-white/5 text-white hover:bg-white/10 font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-3">
                  <Play className="w-4 h-4" /> WATCH IT IN ACTION
                </a>
              </div>
            </Reveal>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 animate-bounce"><ChevronDown className="w-5 h-5" /></div>
        </section>

        {/* S2: CORE IDEA */}
        <section id="qt-core-idea" className="relative py-28 sm:py-40 border-b border-white/5 overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
            <Reveal type="fade-up">
              <div className="text-center mb-20">
                <h2 className="text-[clamp(2.5rem,8vw,6.5rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9] mb-8">
                  TWO TRACKS.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">ONE CONTINUOUS FLOW.</span>
                </h2>
                <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light mb-6">Traditional music players simply finish one track and start another.</p>
                <p className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">Q Transition is built around a different idea:</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-400 uppercase tracking-wide mt-2">UNDERSTAND THE MUSIC BEFORE MAKING THE TRANSITION.</p>
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <div className="flex-1 max-w-xs border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-black p-6 text-center relative">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                  <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">DECK A</div>
                  <Disc className="w-10 h-10 mx-auto text-purple-400/60 mb-3 animate-spin" style={{ animationDuration: "8s" }} />
                  <WaveformSVG className="w-full h-8 mb-3" />
                  <div className="text-xs font-mono text-zinc-500">PLAYING</div>
                </div>
                <div className="flex flex-col items-center gap-2 px-4 sm:px-6 py-4">
                  <div className="border border-purple-500/40 bg-purple-950/20 px-4 py-3 text-center backdrop-blur-sm">
                    <div className="text-[10px] font-mono text-purple-300 uppercase tracking-widest mb-1">Q TRANSITION</div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">INTELLIGENCE</div>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "0.6s" }} />
                    </div>
                  </div>
                  <ArrowRight className="text-purple-500 w-5 h-5 rotate-90 sm:rotate-0" />
                </div>
                <div className="flex-1 max-w-xs border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-black p-6 text-center relative">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">DECK B</div>
                  <Disc className="w-10 h-10 mx-auto text-cyan-400/60 mb-3 animate-spin" style={{ animationDuration: "7s" }} />
                  <WaveformSVG className="w-full h-8 mb-3" />
                  <div className="text-xs font-mono text-zinc-500">READY</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* S3: SMART AUTO CRUISE */}
        <section id="qt-auto-cruise" className="relative py-28 sm:py-40 overflow-hidden bg-zinc-950 border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-600/[0.05] blur-[120px]" /></div>
          <div className="px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
            <Reveal type="fade-up"><div className="text-center mb-6"><span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase">THE FEATURE THAT CHANGES THE EXPERIENCE</span></div></Reveal>
            <Reveal type="fade-up" delay={0.08}>
              <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9] text-center mb-10">SMART AUTO CRUISE</h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.12}>
              <p className="text-center text-lg text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                Put the music in motion and let Q Transition assist the journey. Smart Auto Cruise uses track analysis,
                timing information and Q Transition's playback engine to help coordinate how one track moves into the next.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.16}>
              <div className="relative mb-16 max-w-2xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/25 via-indigo-500/10 to-purple-600/25 blur-xl" />
                <div className="relative border border-white/10 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600" />
                  <img src="/images/q-transition/Auto cruise.png" alt="Q Transition Smart Auto Cruise panel" className="w-full h-auto" loading="lazy" />
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "01", title: "ANALYZE", icon: <Activity className="w-6 h-6 text-purple-400" />, copy: "Q Transition examines track information before playback and prepares the music for intelligent control." },
                { step: "02", title: "SYNC", icon: <GitMerge className="w-6 h-6 text-indigo-400" />, copy: "Timing and playback systems work together to help tracks stay aligned during the session." },
                { step: "03", title: "TRANSITION", icon: <SkipForward className="w-6 h-6 text-purple-400" />, copy: "Q Transition coordinates the movement between decks to create a smoother listening experience." },
                { step: "04", title: "KEEP MOVING", icon: <Repeat className="w-6 h-6 text-cyan-400" />, copy: "Auto Cruise keeps the session progressing while leaving manual control available when required." },
              ].map((s) => (
                <Reveal key={s.step} type="fade-up" delay={0.05}>
                  <div className="relative border border-white/8 bg-gradient-to-b from-black/60 to-black p-6 group hover:border-purple-500/30 transition-all duration-300 h-full">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-[10px] font-mono text-zinc-600 tracking-widest mb-4">{s.step}</div>
                    <div className="mb-3">{s.icon}</div>
                    <div className="text-xs font-bold text-white uppercase tracking-wide mb-3">{s.title}</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{s.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* S4: SMART MUSIC PLAYER */}
        <section id="qt-music-player" className="relative py-28 sm:py-40 border-t border-white/5 bg-black">
          <div className="px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Reveal type="fade-up">
                  <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9] mb-8">
                    NOT JUST A DJ DECK.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">A SMART MUSIC PLAYER.</span>
                  </h2>
                </Reveal>
                <Reveal type="fade-up" delay={0.1}>
                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10 font-light">
                    Q Transition combines the familiarity of a dual-deck music player with intelligent analysis tools normally associated with professional DJ workflows.
                    Browse your music, load tracks, analyse BPM and musical information, view waveforms and control playback from one focused interface.
                  </p>
                </Reveal>
                <Reveal type="fade-up" delay={0.15}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: <Layers className="w-4 h-4 text-purple-400" />, label: "DUAL DECK PLAYBACK" },
                      { icon: <Activity className="w-4 h-4 text-purple-400" />, label: "WAVEFORM DISPLAY" },
                      { icon: <Cpu className="w-4 h-4 text-purple-400" />, label: "BPM ANALYSIS" },
                      { icon: <BarChart2 className="w-4 h-4 text-purple-400" />, label: "BEAT GRID INTELLIGENCE" },
                      { icon: <Music className="w-4 h-4 text-purple-400" />, label: "TRACK KEY INFORMATION" },
                      { icon: <Radio className="w-4 h-4 text-purple-400" />, label: "PLAYLIST & BROWSER" },
                      { icon: <Sliders className="w-4 h-4 text-purple-400" />, label: "MANUAL SYNC CONTROL" },
                      { icon: <Zap className="w-4 h-4 text-purple-400" />, label: "SMART AUTO CRUISE" },
                    ].map((f) => (
                      <div key={f.label} className="flex items-center gap-2.5 p-3 border border-white/5 bg-zinc-950/50">
                        {f.icon}<span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <Reveal type="fade-up" delay={0.1}>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 blur-2xl" />
                  <div className="relative border border-white/10 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                    <img src="/images/q-transition/2.png" alt="Q Transition - dual deck layout, waveforms and playlist" className="w-full h-auto" loading="lazy" />
                  </div>
                  <BeatGridSVG className="w-full h-5 mt-2 opacity-30" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* S5: INTERFACE SHOWCASE */}
        <section id="qt-interface" className="relative bg-zinc-950 border-t border-white/5 py-28 sm:py-40 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="px-6 sm:px-10 lg:px-12 max-w-[1600px] mx-auto">
            <Reveal type="fade-up">
              <div className="text-center mb-16">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">INTERFACE SHOWCASE</div>
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9]">THE COMPLETE PICTURE.</h2>
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.08}>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/8 via-transparent to-cyan-600/8 blur-2xl" />
                <div className="relative border border-white/10 overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-400 to-cyan-500 opacity-80" />
                  <img src="/images/q-transition/qt-v01-interface.png" alt="Q Transition V0.1 live application interface" className="w-full h-auto" loading="lazy" />
                  <div className="absolute top-[8%] left-[2%] hidden xl:block"><div className="px-2.5 py-1 bg-black/80 border border-purple-500/40 backdrop-blur-sm text-[10px] font-mono text-purple-300 uppercase tracking-widest whitespace-nowrap">DECK A</div></div>
                  <div className="absolute top-[8%] right-[2%] hidden xl:block"><div className="px-2.5 py-1 bg-black/80 border border-cyan-500/40 backdrop-blur-sm text-[10px] font-mono text-cyan-300 uppercase tracking-widest whitespace-nowrap">DECK B</div></div>
                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 hidden xl:block"><div className="px-2.5 py-1 bg-black/80 border border-purple-500/40 backdrop-blur-sm text-[10px] font-mono text-purple-300 uppercase tracking-widest whitespace-nowrap">SMART AUTO CRUISE</div></div>
                  <div className="absolute top-[30%] left-[8%] hidden xl:block"><div className="px-2.5 py-1 bg-black/80 border border-white/20 backdrop-blur-sm text-[10px] font-mono text-zinc-300 uppercase tracking-widest whitespace-nowrap">WAVEFORMS</div></div>
                  <div className="absolute bottom-[42%] left-1/2 -translate-x-1/2 hidden xl:block"><div className="px-2.5 py-1 bg-black/80 border border-purple-500/30 backdrop-blur-sm text-[10px] font-mono text-purple-300 uppercase tracking-widest whitespace-nowrap">TRACK ANALYSIS</div></div>
                  <div className="absolute bottom-[22%] left-[3%] hidden xl:block"><div className="px-2.5 py-1 bg-black/80 border border-white/20 backdrop-blur-sm text-[10px] font-mono text-zinc-300 uppercase tracking-widest whitespace-nowrap">BROWSER</div></div>
                  <div className="absolute bottom-[22%] right-[3%] hidden xl:block"><div className="px-2.5 py-1 bg-black/80 border border-white/20 backdrop-blur-sm text-[10px] font-mono text-zinc-300 uppercase tracking-widest whitespace-nowrap">PLAYLIST</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.12}>
              <div className="text-center mt-16">
                <p className="text-[clamp(1.2rem,3vw,2rem)] font-bold text-white uppercase tracking-tight">EVERYTHING YOU NEED.<br /><span className="text-zinc-500">NOTHING FIGHTING FOR YOUR ATTENTION.</span></p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* S6: PHILOSOPHY */}
        <section id="qt-philosophy" className="relative py-40 sm:py-56 overflow-hidden bg-black border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[100px]" /></div>
          <div className="px-6 sm:px-10 lg:px-12 max-w-5xl mx-auto text-center">
            <Reveal type="fade-up">
              <h2 className="text-[clamp(2rem,6vw,5rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9] mb-12">
                LET THE SOFTWARE HANDLE THE NUMBERS.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">YOU LISTEN TO THE MUSIC.</span>
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="space-y-6 text-lg text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed">
                <p>BPM, beat position, timing and track information matter.</p>
                <p>But Q Transition is designed so that the technology stays behind the experience.</p>
                <p className="text-white font-medium">The goal is not to turn every listener into a technical DJ.<br />It is to make continuous music playback smarter.</p>
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.18}>
              <div className="mt-16 relative max-w-xl mx-auto">
                <WaveformSVG className="w-full h-16 opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
                <BeatGridSVG className="w-full h-4 mt-2 opacity-15" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* S7: WHO IT'S FOR */}
        <section id="qt-who" className="relative py-28 sm:py-40 bg-zinc-950 border-t border-white/5">
          <div className="px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
            <Reveal type="fade-up">
              <div className="text-center mb-16">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">USE CASES</div>
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9]">BUILT FOR EVERY LISTENER.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <Headphones className="w-7 h-7 text-purple-400" />, title: "DJs", copy: "Prepare tracks, experiment with transitions and combine intelligent assistance with manual control." },
                { icon: <Volume2 className="w-7 h-7 text-purple-400" />, title: "EVENTS & VENUES", copy: "Keep event music moving with less interruption between tracks." },
                { icon: <Radio className="w-7 h-7 text-purple-400" />, title: "BARS & RESTAURANTS", copy: "Create longer continuous music sessions instead of relying only on basic playlist playback." },
                { icon: <Zap className="w-7 h-7 text-purple-400" />, title: "FITNESS & STUDIOS", copy: "Maintain musical energy across playlists and sessions without constant manual curation." },
                { icon: <Music className="w-7 h-7 text-purple-400" />, title: "MUSIC LOVERS", copy: "Experience playlists with a more connected, mix-like flow without the complexity." },
                { icon: <Users className="w-7 h-7 text-purple-400" />, title: "CURATORS", copy: "Build sessions around mood, key and energy. Let Q Transition handle the technical side." },
              ].map((c) => (
                <Reveal key={c.title} type="fade-up" delay={0.05}>
                  <div className="border border-white/8 bg-gradient-to-b from-zinc-900/40 to-black p-7 group hover:border-purple-500/30 transition-all duration-300 relative h-full">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="mb-5">{c.icon}</div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">{c.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-light">{c.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* S8: AUTO + MANUAL */}
        <section id="qt-control" className="relative py-28 sm:py-40 border-t border-white/5 overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-900/[0.07] blur-[100px]" /></div>
          <div className="px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal type="fade-up">
                <div className="relative order-2 lg:order-1">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 blur-2xl" />
                  <div className="relative border border-white/10 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    <img src="/images/q-transition/4.png" alt="Q Transition controls showing deck interface and Auto Cruise" className="w-full h-auto" loading="lazy" />
                  </div>
                </div>
              </Reveal>
              <div className="order-1 lg:order-2">
                <Reveal type="fade-up">
                  <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9] mb-8">
                    AUTO WHEN YOU WANT IT.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">CONTROL WHEN YOU NEED IT.</span>
                  </h2>
                </Reveal>
                <Reveal type="fade-up" delay={0.1}>
                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10 font-light">
                    Smart does not mean taking control away. Q Transition combines automation with direct deck controls
                    so users can let the system assist the session or take over manually whenever they choose.
                  </p>
                </Reveal>
                <Reveal type="fade-up" delay={0.15}>
                  <div className="grid grid-cols-3 gap-2">
                    {["PLAYBACK", "CUE", "SYNC", "LOOPING", "CROSSFADER", "BPM CONTROL", "HOT CUES", "BEAT GRID", "AUTO CRUISE"].map((ctrl) => (
                      <div key={ctrl} className="px-2 py-2 border border-white/8 bg-zinc-950/40 text-[9px] font-mono text-zinc-400 uppercase tracking-widest text-center">{ctrl}</div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* S9: VERSION 0.1 */}
        <section id="qt-version" className="relative py-28 sm:py-40 bg-zinc-950 border-t border-white/5">
          <div className="px-6 sm:px-10 lg:px-12 max-w-5xl mx-auto">
            <Reveal type="fade-up">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />NOW AVAILABLE
                </div>
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9]">Q TRANSITION 0.1</h2>
                <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto font-light leading-relaxed">
                  The first public generation of Q Transition - built around the core playback, analysis and intelligent transition architecture that will form the foundation of the Q Transition platform.
                </p>
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="border border-white/10 overflow-hidden">
                <div className="bg-zinc-900/60 px-6 py-4 border-b border-white/10 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">Q TRANSITION 0.1 - FEATURE MATRIX</span>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    { f: "DUAL DECK PLAYBACK ENGINE", s: "INCLUDED", n: "" },
                    { f: "WAVEFORM DISPLAY", s: "INCLUDED", n: "" },
                    { f: "BPM ANALYSIS", s: "INCLUDED", n: "" },
                    { f: "BEAT GRID INTELLIGENCE", s: "INCLUDED", n: "" },
                    { f: "TRACK KEY INFORMATION", s: "INCLUDED", n: "" },
                    { f: "SMART AUTO CRUISE", s: "INCLUDED", n: "Core differentiating feature" },
                    { f: "TRANSITION STATUS INDICATORS", s: "INCLUDED", n: "Bass Safe - Vocal Safe - Energy Match - Peak Guard - Drop Protect - Smart Transition" },
                    { f: "PLAYLIST & BROWSER", s: "INCLUDED", n: "" },
                    { f: "MANUAL SYNC CONTROL", s: "INCLUDED", n: "" },
                    { f: "HOT CUES", s: "INCLUDED", n: "" },
                    { f: "MASTER SPECTRUM ANALYSER", s: "INCLUDED", n: "" },
                    { f: "CROSSFADER", s: "INCLUDED", n: "" },
                    { f: "HEADPHONES MIX CONTROL", s: "INCLUDED", n: "" },
                    { f: "TRANSITION QUALITY CONTROL", s: "INCLUDED", n: "CLEAN to CLUB range" },
                  ].map((row) => (
                    <div key={row.f} className="grid grid-cols-12 gap-2 px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                      <div className="col-span-5 text-[11px] font-mono text-zinc-300 uppercase tracking-wide">{row.f}</div>
                      <div className="col-span-2 flex items-center"><span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400"><CheckCircle className="w-3 h-3" /> {row.s}</span></div>
                      <div className="col-span-5 text-[10px] font-mono text-zinc-600 leading-relaxed">{row.n}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* S10: VIDEO */}
        <section id="qt-video" className="relative py-28 sm:py-40 bg-black border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-800/[0.06] blur-[100px]" /></div>
          <div className="px-6 sm:px-10 lg:px-12 max-w-5xl mx-auto text-center">
            <Reveal type="fade-up">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">PRODUCT DEMO</div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9] mb-12">SEE Q TRANSITION MOVE.</h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="relative border border-white/10 bg-zinc-950 overflow-hidden mb-12">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500" />
                <div className="p-8 sm:p-14">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-10">
                    {["TRACK A PLAYING", "TRACK B LOADED", "ANALYSIS", "AUTO CRUISE ON", "TRANSITION", "DECK B TAKES OVER"].map((s, i, arr) => (
                      <div key={s} className="flex items-center gap-2">
                        <span className={`px-2 py-1 border ${i === 4 ? "border-purple-500/40 text-purple-400 bg-purple-500/10" : "border-white/10 text-zinc-500"}`}>{s}</span>
                        {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-zinc-700 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className="relative aspect-video bg-black border border-white/8 overflow-hidden group cursor-pointer">
                    <img src="/images/q-transition/qt-hero-windowed.png" alt="Q Transition demo preview" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" loading="lazy" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="w-20 h-20 border-2 border-white/40 bg-black/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">PRODUCT DEMO VIDEO - COMING SOON</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.12}>
              <button id="qt-video-buy-btn" onClick={openPurchase} className="px-10 py-4 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer">
                <ShoppingCart className="w-4 h-4" /> BUY Q TRANSITION
              </button>
            </Reveal>
          </div>
        </section>

        {/* S11: SPECS */}
        <section id="qt-specs" className="relative py-28 sm:py-40 bg-zinc-950 border-t border-white/5">
          <div className="px-6 sm:px-10 lg:px-12 max-w-4xl mx-auto">
            <Reveal type="fade-up"><div className="text-center mb-16"><h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9]">Q TRANSITION AT A GLANCE</h2></div></Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="border border-white/10 overflow-hidden">
                <div className="bg-zinc-900/60 px-6 py-4 border-b border-white/10"><span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">PRODUCT SPECIFICATION</span></div>
                <div className="divide-y divide-white/5">
                  {[
                    { label: "PRODUCT", value: "Q Transition", ok: true },
                    { label: "VERSION", value: "0.1", ok: true },
                    { label: "TYPE", value: "Standalone desktop music application", ok: true },
                    { label: "PLATFORM", value: "Windows", ok: true },
                    { label: "CATEGORY", value: "Smart Music Player / DJ Technology", ok: true },
                    { label: "DEVELOPER", value: "Quantum Climb", ok: true },
                    { label: "DELIVERY", value: "Digital download", ok: true },
                    { label: "LICENSE", value: "To be confirmed", ok: false },
                    { label: "UPDATE POLICY", value: "To be confirmed", ok: false },
                    { label: "DOWNLOAD SIZE", value: "To be confirmed", ok: false },
                    { label: "MINIMUM RAM", value: "To be confirmed", ok: false },
                    { label: "CPU REQUIREMENT", value: "To be confirmed", ok: false },
                    { label: "SUPPORTED WINDOWS", value: "To be confirmed", ok: false },
                    { label: "AUDIO DEVICE", value: "To be confirmed", ok: false },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-2 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{row.label}</div>
                      <div className={`text-xs font-mono uppercase tracking-wide ${row.ok ? "text-zinc-200" : "text-zinc-700"}`}>{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* S12: PURCHASE */}
        <section id="qt-purchase" className="relative py-28 sm:py-40 border-t border-white/5 overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-800/[0.06] blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>
          <div className="px-6 sm:px-10 lg:px-12 max-w-4xl mx-auto">
            <Reveal type="fade-up"><div className="text-center mb-16"><div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">AVAILABLE NOW</div><h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.9]">GET Q TRANSITION</h2></div></Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="border border-white/10 bg-zinc-950/60 overflow-hidden relative backdrop-blur-sm">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600" />
                <div className="p-8 sm:p-12">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
                    <div>
                      <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">QUANTUM CLIMB AUDIO</div>
                      <h3 className="text-3xl font-black text-white uppercase">Q TRANSITION 0.1</h3>
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">SMART MUSIC PLAYER</div>
                    </div>
                    <div className="sm:text-right">
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">PRICE</div>
                      <div className="text-3xl font-black text-white">{QT_PRICE_IS_SET ? QT_PRICE_DISPLAY : <span className="text-zinc-600 text-xl">[Q_TRANSITION_PRICE]</span>}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                    {[
                      { icon: <Package className="w-5 h-5 text-purple-400" />, label: "DIGITAL DOWNLOAD" },
                      { icon: <Monitor className="w-5 h-5 text-purple-400" />, label: "WINDOWS STANDALONE" },
                      { icon: <Star className="w-5 h-5 text-purple-400" />, label: "VERSION 0.1" },
                      { icon: <CheckCircle className="w-5 h-5 text-purple-400" />, label: "SECURE CHECKOUT" },
                    ].map((b) => (
                      <div key={b.label} className="flex flex-col items-center gap-2 p-4 border border-white/8 bg-black/40 text-center">
                        {b.icon}<span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest leading-relaxed">{b.label}</span>
                      </div>
                    ))}
                  </div>
                  <button id="qt-purchase-main-btn" onClick={openPurchase} className="w-full py-5 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group">
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" /> BUY NOW WITH PAYPAL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] font-mono text-zinc-600 mt-4 uppercase tracking-widest">Secured by PayPal - Digital download - Windows standalone - No subscription</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* S13: FINAL CTA */}
        <section id="qt-final-cta" className="relative min-h-[85vh] flex flex-col items-center justify-center text-center py-40 border-t border-white/5 overflow-hidden bg-black">
          <div className="absolute inset-0 scale-110">
            <img src="/images/q-transition/qt-hero-windowed.png" alt="" aria-hidden="true" className="w-full h-full object-cover object-center opacity-[0.12]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-10">
            <WaveformSVG className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </div>
          <div className="relative z-10 px-6 sm:px-10 lg:px-12 max-w-5xl mx-auto">
            <Reveal type="fade-up">
              <h2 className="text-[clamp(2.5rem,10vw,9rem)] font-black text-white uppercase tracking-[-0.04em] leading-[0.88] mb-10">
                DON&apos;T JUST PLAY<br />THE NEXT TRACK.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400">TRANSITION INTO IT.</span>
              </h2>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button id="qt-final-buy-btn" onClick={openPurchase} className="px-12 py-5 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer">
                  <ShoppingCart className="w-5 h-5" /> BUY Q TRANSITION
                </button>
                <button onClick={onNavigateProducts} className="px-8 py-5 border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer">
                  ALL PRODUCTS
                </button>
              </div>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="border-t border-white/10 pt-10 space-y-1">
                <div className="text-xs font-mono text-zinc-600 uppercase tracking-[0.3em]">Q TRANSITION 0.1</div>
                <div className="text-xs font-mono text-zinc-700 uppercase tracking-[0.2em]">BUILT BY QUANTUM CLIMB</div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>

      <AnimatePresence>
        {isPurchaseOpen && <PurchaseModal onClose={closePurchase} />}
      </AnimatePresence>
    </>
  );
}

