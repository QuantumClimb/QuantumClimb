import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Languages, Video, Code, Smartphone, Cpu, Sparkles, Check } from "lucide-react";

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.94 9.94 0 0 0 4.805 1.232h.005c5.506 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.923-7.062A9.923 9.923 0 0 0 12.012 2zm5.78 14.152c-.244.685-1.431 1.309-1.968 1.385-.497.07-1.147.126-3.298-.762-2.753-1.134-4.524-3.924-4.66-4.108-.137-.184-1.12-1.488-1.12-2.839 0-1.35.704-2.014.954-2.28.25-.266.543-.332.724-.332.18 0 .36.001.518.008.165.007.387-.063.606.463.226.541.777 1.895.845 2.03.067.137.112.296.021.478-.09.182-.136.295-.272.453-.136.159-.286.355-.408.476-.136.136-.279.285-.12.556.16.27.708 1.164 1.517 1.884.64.57 1.178.9 1.485 1.042.308.143.488.118.67-.09.18-.21.782-.91.99-1.22.208-.31.417-.26.702-.155.286.106 1.815.856 2.128 1.012.311.157.519.234.595.364.077.13.077.752-.167 1.437z" />
  </svg>
);

const SERVICES = [
  { id: "01", name: "AI Dubbing & Localization", icon: Languages },
  { id: "02", name: "AI Video Production", icon: Video },
  { id: "03", name: "Web Development", icon: Code },
  { id: "04", name: "Mobile App Development", icon: Smartphone },
  { id: "05", name: "AI Automation & Agents", icon: Cpu },
  { id: "06", name: "Creative & Custom Projects", icon: Sparkles },
] as const;

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Auto-show tooltip or badge alert after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 4000);

    const hideTooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTooltipTimer);
    };
  }, [isOpen]);

  // Close widget when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenWidget = () => {
    setIsOpen(!isOpen);
    setHasNotification(false);
    setShowTooltip(false);
  };

  const handleToggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleStartChat = () => {
    const phoneNumber = "601164242145";
    let message = "Hi Quantum Climb, I'd like to inquire about your services!";
    
    if (selectedServices.length > 0) {
      const servicesList = selectedServices.join(", ");
      message = `Hi Quantum Climb, I would like to inquire about: ${servicesList}. Let's discuss a project!`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat window popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-80 md:w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header section */}
            <div className="relative bg-gradient-to-r from-primary/30 to-purple-600/10 p-5 pb-6 border-b border-white/5">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 rounded-full p-1 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                aria-label="Close widget"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white font-bold text-lg shadow-lg">
                  QC
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-zinc-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-white tracking-tight text-sm md:text-base">
                    Quantum Climb
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-purple-400 font-medium tracking-wide uppercase">
                      Client Support
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <span className="text-[11px] text-zinc-400">Replies instantly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-5 max-h-[380px] overflow-y-auto bg-zinc-950/30 space-y-4">
              <div className="rounded-2xl rounded-tl-sm bg-white/5 p-3.5 border border-white/5 text-zinc-300 text-xs md:text-sm leading-relaxed max-w-[90%]">
                <p className="font-medium text-white mb-1">Hey there! 👋</p>
                How can we help you scale your business today? Select the services you are interested in below to start our chat.
              </div>

              {/* Service Selection Form */}
              <div className="space-y-2">
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block font-semibold mb-2">
                  Select Project Services:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {SERVICES.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedServices.includes(service.name);
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleToggleService(service.name)}
                        className={`flex items-center justify-between gap-2 p-3 border rounded-xl text-left cursor-pointer transition-all duration-300 text-xs group relative ${
                          isSelected
                            ? "border-primary/50 bg-primary/10 text-white font-medium shadow-lg shadow-primary/5"
                            : "border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 transition-colors ${
                            isSelected ? "text-purple-400" : "text-zinc-500 group-hover:text-zinc-400"
                          }`} />
                          <span className="leading-tight">{service.name}</span>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white shrink-0"
                          >
                            <Check className="w-2.5 h-2.5" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with CTA */}
            <div className="p-5 border-t border-white/5 bg-zinc-950">
              <button
                onClick={handleStartChat}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary/80 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {selectedServices.length > 0
                  ? `Inquire About ${selectedServices.length} Service${selectedServices.length > 1 ? "s" : ""}`
                  : "Start WhatsApp Chat"}
              </button>
              <div className="text-[10px] text-zinc-500 text-center mt-3">
                Powered by Quantum Climb & WhatsApp
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="relative flex items-center">
        {/* Tooltip hint */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              className="mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-zinc-900/90 py-1.5 px-3 text-[11px] font-medium tracking-wide uppercase text-white shadow-xl backdrop-blur-md"
            >
              Need help? Chat with QC
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger button */}
        <button
          onClick={handleOpenWidget}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer z-50 ${
            isOpen
              ? "bg-zinc-800 hover:bg-zinc-700 ring-2 ring-white/10"
              : "bg-primary hover:bg-primary/85 shadow-primary/20"
          }`}
          aria-label="Contact via WhatsApp"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <WhatsAppIcon className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse notification badge */}
          {hasNotification && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md ring-2 ring-zinc-950">
              1
              <span className="absolute inset-0 block rounded-full bg-red-500 ring-2 ring-red-500 animate-ping opacity-75" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
