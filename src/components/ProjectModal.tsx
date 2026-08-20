import { X, ExternalLink, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import type { PortfolioItem } from "../lib/supabase";

type ProjectModalProps = Readonly<{
  project: PortfolioItem | null;
  onClose: () => void;
}>;

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  const logoUrl = project.metadata?.logo_url as string | undefined;
  const caseStudy = project.metadata?.case_study as string | undefined;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-500 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-4xl bg-zinc-950 border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-500 delay-100 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 bg-zinc-900 border-b border-white/5 overflow-hidden group">
          {project.thumbnail_url ? (
            <img 
              src={project.thumbnail_url} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-30">
              <Globe className="w-24 h-24" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          
          {/* Logo overlay */}
          {logoUrl && (
            <div className="absolute bottom-0 left-6 sm:left-10 translate-y-1/3">
              <div className="bg-zinc-900 border border-white/10 p-2 sm:p-4 rounded-xl shadow-2xl w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                <img 
                  src={logoUrl} 
                  alt={`${project.title} logo`} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 pb-24">
          <div className={`${logoUrl ? 'mt-8 sm:mt-12' : ''}`}>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              {project.title}
            </h2>
            
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-invert prose-zinc max-w-none">
              {caseStudy ? (
                caseStudy.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index} className="text-zinc-300 text-lg leading-relaxed font-light mb-6">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-zinc-300 text-lg leading-relaxed font-light">
                  {project.description || "A modern web application built with cutting-edge technologies."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pointer-events-none flex justify-end">
          <div className="pointer-events-auto">
            <a
              href={project.external_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-medium hover:bg-purple-100 transition-colors"
            >
              Visit Live Site
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
