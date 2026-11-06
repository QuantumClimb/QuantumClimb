import { Radio } from "lucide-react";
import { SOCIAL_PLATFORMS } from "./socialMediaContent";

const FORMATS: Record<string, string> = {
  linkedin: "Thought leadership · Company page",
  instagram: "Posts · Reels · Stories",
  tiktok: "Short-form video · Trends",
  facebook: "Community · Campaigns",
};

/**
 * Decorative "one brand, four platforms" interface panel in the QC signal/grid
 * language. Shows no metrics — it is illustrative only. `compact` is used in
 * the Services overview card.
 */
export function SocialSignalVisual({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <div
      className={`relative border border-white/10 bg-zinc-950/90 font-mono overflow-hidden h-full flex flex-col ${
        compact ? "p-5 text-[10px]" : "p-6 sm:p-7 text-xs"
      }`}
      aria-hidden="true"
    >
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
          <span className="text-zinc-200 font-bold uppercase tracking-wider">QC // One Brand · Four Platforms</span>
        </div>
        {!compact && <Radio className="w-4 h-4 text-purple-400" />}
      </div>

      <div className={`relative flex-1 flex flex-col ${compact ? "" : "justify-center"}`}>
      {/* brand core, linked to the four platform channels */}
      <div className={`relative flex flex-col items-center ${compact ? "my-3" : "mb-2"}`}>
        <span className="px-3 py-1.5 border border-purple-500/50 bg-purple-500/15 text-white uppercase tracking-widest">
          Your Brand
        </span>
        {!compact && <span className="w-px h-6 bg-gradient-to-b from-purple-500/70 to-white/10" aria-hidden="true" />}
      </div>

      <ol className={`relative flex flex-col gap-2 ${compact ? "flex-1 justify-between" : "gap-4"}`}>
        {SOCIAL_PLATFORMS.map((platform, index) => (
          <li key={platform.id} className="relative flex items-center gap-3">
            <span className="relative z-10 w-7 h-7 shrink-0 border border-purple-500/40 bg-black flex items-center justify-center text-purple-300 text-[9px] font-bold">
              {platform.code}
            </span>
            <span className="flex-1 min-w-0 border border-white/5 bg-black/60 px-3 py-1.5 flex items-center justify-between gap-3">
              <span className="text-zinc-200 uppercase tracking-wider truncate">{platform.name.replace(" Marketing", "")}</span>
              {!compact && <span className="hidden sm:inline text-[10px] text-zinc-500 truncate">{FORMATS[platform.id]}</span>}
            </span>
            {/* signal pulse */}
            <span className="hidden sm:flex items-end gap-[2px] h-4 w-8 shrink-0">
              {[40, 70, 55, 90].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 bg-gradient-to-t from-purple-600 to-indigo-400 opacity-70"
                  style={{ height: `${((h + index * 13) % 70) + 30}%` }}
                />
              ))}
            </span>
          </li>
        ))}
      </ol>
      </div>

      {!compact && (
        <div className="relative flex items-center justify-between text-[10px] text-zinc-500 pt-4 mt-5 border-t border-white/10 uppercase tracking-wider">
          <span>Strategy · Content · Campaigns</span>
          <span className="text-purple-400">Connected growth</span>
        </div>
      )}
    </div>
  );
}
