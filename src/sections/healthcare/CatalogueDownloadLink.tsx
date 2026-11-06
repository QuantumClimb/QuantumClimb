import { Download } from "lucide-react";
import { HEALTHCARE_CATALOGUE } from "./healthcareContent";

/** Download link for the Healthcare Services Catalogue PDF (public/docs). */
export function CatalogueDownloadLink({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <a
      href={HEALTHCARE_CATALOGUE.href}
      download={HEALTHCARE_CATALOGUE.downloadName}
      className={`px-6 py-4 bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-center ${className}`}
    >
      <Download className="w-4 h-4 shrink-0" />
      <span>{HEALTHCARE_CATALOGUE.label}</span>
    </a>
  );
}
