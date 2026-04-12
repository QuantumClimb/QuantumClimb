import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

type ContactActionProps = Readonly<{
  onContactClick: () => void;
}>;

export function Faq() {
  const faqs = [
    { q: "What languages does Quantum Climb support?", a: "We currently support over 120 languages and dialects, with new ones added monthly. Our neural engine handles regional accents and technical terminology with native-level precision." },
    { q: "How secure is my content?", a: "Security is our priority. We are SOC2 Type II compliant. All data is encrypted at rest and in transit, and we offer private cloud deployments for enterprise clients with strict data sovereignty requirements." },
    { q: "Can I edit the AI-generated scripts?", a: "Yes. Our platform includes a full-featured collaborative editor where you can refine translations, adjust timing, and manage cultural nuances before final rendering." },
    { q: "Does it work with existing video platforms?", a: "Absolutely. We offer direct integrations with YouTube, Vimeo, and major CMS platforms, as well as a robust API for custom workflows." },
  ];
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0]?.q ?? null);

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about the Quantum Climb platform." />
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
                      <div className="p-6 pt-0 text-zinc-400 leading-relaxed">{faq.a}</div>
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
}

export function FinalCTA({ onContactClick }: Readonly<ContactActionProps>) {
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
            Join the world&apos;s leading media companies and creators who are scaling
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
}

export function Footer() {
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
}