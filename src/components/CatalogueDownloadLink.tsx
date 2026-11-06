import { Download } from "lucide-react";

export type Catalogue = Readonly<{
  href: string;
  downloadName: string;
  label: string;
  meta: string;
}>;

/** Download link for a service catalogue PDF served from public/docs. */
export function CatalogueDownloadLink({ catalogue, className = "" }: Readonly<{ catalogue: Catalogue; className?: string }>) {
  return (
    <a
      href={catalogue.href}
      download={catalogue.downloadName}
      className={`px-6 py-4 bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-center ${className}`}
    >
      <Download className="w-4 h-4 shrink-0" />
      <span>{catalogue.label}</span>
    </a>
  );
}
