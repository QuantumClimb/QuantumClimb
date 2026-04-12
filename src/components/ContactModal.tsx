import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type ContactModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
                Let&apos;s scale your <br />
                <span className="text-zinc-500 italic font-serif">global presence</span>
              </h2>
              <p className="text-zinc-400">
                Our team of experts will help you design a custom localization pipeline tailored to your studio&apos;s needs.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
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
                <textarea id="contact-message" rows={4} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-purple-600 outline-none transition-colors resize-none" placeholder="Tell us about your project..." />
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
}