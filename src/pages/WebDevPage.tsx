import { useMemo, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { FinalCTA } from "../sections/ClosureSections";
import { ProjectModal } from "../components/ProjectModal";
import type { PortfolioItem } from "../lib/supabase";

type WebDevPageProps = Readonly<{
  onOpenContactModal: () => void;
  items?: PortfolioItem[];
  isLoading?: boolean;
}>;

export function WebDevPage({ onOpenContactModal, items = [], isLoading = false }: WebDevPageProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const websites = useMemo(() => {
    return items
      .filter((item) => item.content_type === "website" && item.is_published)
      .sort((left, right) => {
        if (left.is_featured !== right.is_featured) return left.is_featured ? -1 : 1;
        if (left.sort_order !== right.sort_order) return left.sort_order - right.sort_order;
        return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
      });
  }, [items]);

  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal type="mask" className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              AI-Created Software & Apps
            </span>
          </Reveal>
          <Reveal type="mask" className="mb-8">
            <h1 className="text-6xl md:text-[100px] font-medium tracking-tighter text-white leading-[0.85] uppercase">
              Digital <br />
              <span className="text-zinc-500 italic font-serif">Architecture</span>
            </h1>
          </Reveal>
          <Reveal type="fade-up" delay={0.2} className="mb-12">
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
              Custom web applications and software solutions designed, coded, and managed by advanced AI systems for unparalleled speed and precision.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="Our Work"
            title="Web Portfolio"
            subtitle="Explore the digital platforms we've architected."
          />
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full border border-white/10 bg-black/30 p-12 text-center text-zinc-400">Loading web projects...</div>
            ) : websites.length > 0 ? (
              websites.map((project) => (
                <article 
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  className="group flex h-full flex-col overflow-hidden border border-white/10 bg-black/40 transition-colors hover:border-white/20 cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900 relative">
                    {project.thumbnail_url ? (
                      <img 
                        src={project.thumbnail_url} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-700">
                        <Globe className="h-12 w-12" />
                      </div>
                    )}
                    {project.is_featured && (
                      <div className="absolute top-4 left-4 bg-purple-600/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-white z-10">
                        Featured
                      </div>
                    )}
                    {project.metadata?.logo_url && (
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-zinc-950/80 backdrop-blur-sm p-2 rounded border border-white/10 flex items-center justify-center z-10">
                        <img src={project.metadata.logo_url as string} alt="Logo" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-purple-400">{project.tags[0] ?? "Website"}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                    
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-purple-400">
                      View details
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-white/10 bg-black/50">
                <Globe className="h-8 w-8 text-zinc-600 mb-4" />
                <p className="text-zinc-500 font-medium">Web Showcase Coming Soon</p>
                <p className="text-zinc-600 text-sm mt-2">We are currently curating links to our latest web projects.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <FinalCTA onContactClick={onOpenContactModal} />
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
