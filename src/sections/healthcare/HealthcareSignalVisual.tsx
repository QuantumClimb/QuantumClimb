import { Activity } from "lucide-react";

const NODES = [
  { code: "01", label: "Doctor & clinic brand" },
  { code: "02", label: "Website · CMS · LMS" },
  { code: "03", label: "Enquiry & booking pathway" },
  { code: "04", label: "CRM & automation" },
  { code: "05", label: "Analytics & growth" },
];

/**
 * Decorative technical interface panel — QC signal/grid language instead of
 * stock imagery. `compact` is used inside the Services overview card.
 */
export function HealthcareSignalVisual({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <div
      className={`relative border border-white/10 bg-zinc-950/90 font-mono overflow-hidden h-full flex flex-col ${
        compact ? "p-5 text-[10px]" : "p-6 sm:p-7 text-xs"
      }`}
      aria-hidden="true"
    >
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-transparent" />

      <div className="relative flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-zinc-200 font-bold uppercase tracking-wider">QC // Healthcare Growth System</span>
        </div>
        {!compact && <Activity className="w-4 h-4 text-purple-400" />}
      </div>

      {/* signal line */}
      <svg viewBox="0 0 300 40" preserveAspectRatio="none" className={`relative w-full ${compact ? "h-7 my-3" : "h-10 my-5"}`}>
        <defs>
          <linearGradient id="qc-hc-signal" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#qc-hc-signal)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          points="0,24 60,24 78,24 88,8 98,36 108,18 116,24 180,24 196,24 204,12 212,30 220,24 300,24"
        />
      </svg>

      <ol className="relative flex-1 flex flex-col justify-between gap-2">
        {NODES.map((node, index) => (
          <li key={node.code} className="relative flex items-center gap-3">
            {index < NODES.length - 1 && (
              <span className="absolute left-[11px] top-6 h-[calc(100%-4px)] w-px bg-gradient-to-b from-purple-500/60 to-white/10" />
            )}
            <span className="relative z-10 w-6 h-6 shrink-0 border border-purple-500/40 bg-black flex items-center justify-center text-purple-300 text-[9px]">
              {node.code}
            </span>
            <span className="flex-1 border border-white/5 bg-black/60 px-3 py-1.5 text-zinc-300 uppercase tracking-wider truncate">
              {node.label}
            </span>
          </li>
        ))}
      </ol>

      {!compact && (
        <div className="relative flex items-center justify-between text-[10px] text-zinc-500 pt-4 mt-4 border-t border-white/10 uppercase tracking-wider">
          <span>Strategy · Media · Technology</span>
          <span className="text-purple-400">Connected</span>
        </div>
      )}
    </div>
  );
}
