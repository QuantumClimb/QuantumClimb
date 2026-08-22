import { useMemo, useState, useEffect } from "react";
import { TechCanvas } from "../components/TechCanvas";
import { ArrowRight, ArrowDown, Check, Globe, X, ExternalLink } from "lucide-react";
import { Reveal } from "../components/Reveal";
import type { PortfolioItem } from "../lib/supabase";
import { createPortal } from "react-dom";

// High-fidelity fallback websites matching editorial standards
const FALLBACK_WEBSITES: PortfolioItem[] = [
  {
    id: "fallback-web-1",
    content_type: "website",
    is_published: true,
    is_featured: true,
    sort_order: 10,
    title: "The Listening Room",
    description: "An immersive digital experience built around music, discovery and visual storytelling.",
    thumbnail_url: "/images/webdev/editorial%20image%20placement.png",
    external_url: "https://www.quantum-climb.com",
    tags: ["Digital Experiences"],
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z",
    slug: null,
    media_url: null,
    created_by: null,
    metadata: {
      client: "Aura Sound Labs",
      year: "2026",
      features: [
        "Immersive Web Audio spatial positioning",
        "Generative SVG physics-based visualizers",
        "Curated interactive listener playlists"
      ],
      technology: ["React", "Three.js", "Web Audio API", "Tailwind CSS"],
      case_study: "The Listening Room reimagines digital music curation. We designed a physical spatial interface where audio wavelengths influence graphic elements dynamically, creating a customized visual soundscape for every album."
    }
  },
  {
    id: "fallback-web-2",
    content_type: "website",
    is_published: true,
    is_featured: false,
    sort_order: 20,
    title: "Kinetix Studio",
    description: "A motion design and physical interaction playground built for creative choreographers.",
    thumbnail_url: "/images/webdev/what%20we%20build.png",
    external_url: "https://www.quantum-climb.com",
    tags: ["Creative Technology"],
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z",
    slug: null,
    media_url: null,
    created_by: null,
    metadata: {
      client: "Kinetix Collective",
      year: "2026",
      features: [
        "GPU-driven particle system simulation",
        "Low-latency recording capture dashboard",
        "Interactive gesture velocity tracking"
      ],
      technology: ["Next.js", "WebGL", "Rust", "WebSockets"],
      case_study: "Built to translate physical human motion into digital visual assets. Kinetix Studio integrates high-frequency sensor streams with local browser shaders to record choreographer movements in real time."
    }
  },
  {
    id: "fallback-web-3",
    content_type: "website",
    is_published: true,
    is_featured: false,
    sort_order: 30,
    title: "Vektor Storefront",
    description: "A custom high-performance headless 3D storefront built for high-end furniture designers.",
    thumbnail_url: "/images/webdev/not%20just%20a%20website.png",
    external_url: "https://www.quantum-climb.com",
    tags: ["E-Commerce"],
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z",
    slug: null,
    media_url: null,
    created_by: null,
    metadata: {
      client: "Vektor Design Group",
      year: "2026",
      features: [
        "Headless Shopify storefront engine",
        "Fast incremental static builds",
        "3D interactive configuration models"
      ],
      technology: ["React", "Shopify API", "Three.js", "Vite"],
      case_study: "E-Commerce is no longer restricted to static cards. Vektor Storefront allows clients to manipulate wood textures, leather stitching, and dimensions in 3D prior to checkout, boosting purchase confidence."
    }
  },
  {
    id: "fallback-web-4",
    content_type: "website",
    is_published: true,
    is_featured: false,
    sort_order: 40,
    title: "Apex Analytics",
    description: "Custom internal management interface built around high-throughput analytics and data.",
    thumbnail_url: "/images/webdev/portfolio%20empty_transition%20image.png",
    external_url: "https://www.quantum-climb.com",
    tags: ["Platforms"],
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z",
    slug: null,
    media_url: null,
    created_by: null,
    metadata: {
      client: "Apex Systems",
      year: "2025",
      features: [
        "Real-time database analytics charts",
        "Automated spreadsheet synchronization",
        "Secure role-based dashboard control"
      ],
      technology: ["React", "Supabase", "Chart.js", "TypeScript"],
      case_study: "Designed to replace slow legacy systems, Apex aggregates multi-channel metrics into one unified interface, scaling data handling to millions of monthly records without performance drops."
    }
  },
  {
    id: "fallback-web-5",
    content_type: "website",
    is_published: true,
    is_featured: false,
    sort_order: 50,
    title: "Solas Portal",
    description: "A localized learning platform designed to stream educational workshops to remote schools.",
    thumbnail_url: "/images/webdev/digital%20architecure%20placement.png",
    external_url: "https://www.quantum-climb.com",
    tags: ["Web Apps"],
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z",
    slug: null,
    media_url: null,
    created_by: null,
    metadata: {
      client: "Solas Foundation",
      year: "2025",
      features: [
        "Dynamic low-bandwidth video transcoding",
        "Indexed offline database capabilities",
        "Real-time student progress tracking"
      ],
      technology: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
      case_study: "Education must reach everyone. The Solas Portal is optimized for low-speed network grids, ensuring video modules stream smoothly without interruption using smart compression pipelines."
    }
  },
  {
    id: "fallback-web-6",
    content_type: "website",
    is_published: true,
    is_featured: false,
    sort_order: 60,
    title: "Zenith Marketing",
    description: "An automated product placement platform leveraging generative model pipelines.",
    thumbnail_url: "/images/webdev/lets%20build%20it.png",
    external_url: "https://www.quantum-climb.com",
    tags: ["Websites"],
    created_at: "2026-08-21T06:30:00Z",
    updated_at: "2026-08-21T06:30:00Z",
    slug: null,
    media_url: null,
    created_by: null,
    metadata: {
      client: "Zenith Advertising",
      year: "2026",
      features: [
        "Stable Diffusion image generation pipeline",
        "Automated placement mapping API",
        "Dynamic email campaign integrations"
      ],
      technology: ["React", "Python API", "Stable Diffusion", "Vite"],
      case_study: "A landing page that adapts to the visitor. Zenith dynamically renders campaign images tailored to demographic inputs, drastically scaling click-through rates."
    }
  }
];

type WebDevPageProps = Readonly<{
  onOpenContactModal: () => void;
  items?: PortfolioItem[];
  isLoading?: boolean;
}>;

export function WebDevPage({ onOpenContactModal, items = [], isLoading = false }: WebDevPageProps) {
  // Extract and sort database items
  const websites = useMemo(() => {
    return items
      .filter((item) => item.content_type === "website" && item.is_published)
      .sort((left, right) => {
        if (left.is_featured !== right.is_featured) return left.is_featured ? -1 : 1;
        if (left.sort_order !== right.sort_order) return left.sort_order - right.sort_order;
        return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
      });
  }, [items]);

  const displayWebsites = websites.length > 0 ? websites : FALLBACK_WEBSITES;

  // Track active project categories filter
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  // Track active selected project detail
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, [selectedProject]);

  // Filter project grid
  const filteredWebsites = useMemo(() => {
    if (activeCategory === "ALL") return displayWebsites;
    return displayWebsites.filter((item) => {
      // Map category tab string to tags
      const currentTag = activeCategory.toLowerCase();
      return item.tags.some(tag => tag.toLowerCase().includes(currentTag) || currentTag.includes(tag.toLowerCase()));
    });
  }, [displayWebsites, activeCategory]);

  // Dynamic layout grid spacing classes generator (SMALL | SMALL | LARGE pattern)
  const getGridSpanClass = (index: number) => {
    const pattern = index % 9;
    if (pattern === 2) {
      // LARGE card
      return "lg:col-span-6 md:col-span-12 col-span-12";
    }
    if (pattern === 3) {
      // LARGE card (Row 2 first item)
      return "lg:col-span-6 md:col-span-12 col-span-12";
    }
    if (pattern === 7) {
      // LARGE card (Row 3 second item)
      return "lg:col-span-6 md:col-span-12 col-span-12";
    }
    // SMALL card
    return "lg:col-span-3 md:col-span-6 col-span-12";
  };

  const getAspectClass = (index: number) => {
    const pattern = index % 9;
    if (pattern === 2 || pattern === 3 || pattern === 7) {
      return "aspect-[21/10]";
    }
    return "aspect-[16/10]";
  };

  const getProjectTag = (project: PortfolioItem) => {
    return project.tags[0] ?? "Digital Platform";
  };

  const getClientName = (project: PortfolioItem) => {
    return (project.metadata?.client as string) || "Quantum Climb Client";
  };

  const getYear = (project: PortfolioItem) => {
    return (project.metadata?.year as string) || "2026";
  };

  const getFeatures = (project: PortfolioItem) => {
    return (project.metadata?.features as string[]) || ["High performance architecture", "Clean user interface design"];
  };

  const getTechnology = (project: PortfolioItem) => {
    return (project.metadata?.technology as string[]) || ["React", "TypeScript", "Tailwind CSS"];
  };

  const getCaseStudy = (project: PortfolioItem) => {
    return (project.metadata?.case_study as string) || project.description || "A custom web application built with cutting-edge technologies.";
  };

  const scrollToSection = (id: string) => {
    const el = globalThis.document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-x-hidden bg-[#050307] text-zinc-300">
      
      {/* 01 — HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-black">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <img 
            src="/images/Build%20a%20Website%20CTA..png" 
            alt="Web development hero background" 
            className="w-full h-full object-cover opacity-35 brightness-125 animate-ken-burns"
            referrerPolicy="no-referrer"
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] z-10 opacity-30"></div>
          <TechCanvas />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Reveal type="mask">
              <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                WEB / DIGITAL PRODUCTS
              </span>
            </Reveal>

            <Reveal type="mask">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[110px] font-medium tracking-tighter text-white leading-[0.85] uppercase">
                WE BUILD <br />
                <span className="text-zinc-500 italic font-serif">DIGITAL WORLDS.</span>
              </h1>
            </Reveal>

            <Reveal type="fade-up" delay={0.2}>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                Websites, applications and interactive digital experiences designed, built and managed by Quantum Climb.
              </p>
            </Reveal>
            
            <Reveal type="fade-up" delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onOpenContactModal}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold tracking-tight hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 border border-white cursor-pointer"
              >
                BUILD A WEBSITE →
              </button>
              
              <button
                onClick={() => scrollToSection("featured-project")}
                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-semibold tracking-tight hover:border-white transition-all duration-300 uppercase text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                VIEW OUR WORK ↓
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — FEATURED PROJECT */}
      <section id="featured-project" className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/20 relative">
        {/* Supporting backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <img src="/images/webdev/editorial%20image%20placement.png" alt="Featured workspace preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="mb-10 space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">SELECTED WORK</span>
              <h2 className="text-3xl font-medium tracking-tight text-white uppercase">FEATURED</h2>
            </div>

            {/* Layout: Large horizontal project */}
            {displayWebsites.slice(0, 1).map(project => (
              <div key={project.id} className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
                {/* Left image area */}
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="relative border border-white/10 bg-zinc-900 aspect-[16/9] overflow-hidden group cursor-pointer"
                >
                  <img 
                    src={project.thumbnail_url || "/images/webdev/editorial%20image%20placement.png"} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
                </div>

                {/* Right project info */}
                <div className="border border-white/10 bg-zinc-950/60 p-8 space-y-8 flex flex-col justify-between h-full min-h-[300px]">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">PROJECT NAME</span>
                      <h3 className="text-3xl font-semibold text-white uppercase tracking-tight leading-none">{project.title}</h3>
                    </div>

                    <div className="border-t border-b border-white/5 py-4">
                      <span className="text-zinc-600 block mb-0.5 uppercase text-[9px] font-mono">CATEGORY</span>
                      <span className="text-purple-300 font-mono text-xs font-medium">{getProjectTag(project)}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">ONE-SENTENCE DESCRIPTION</span>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">{project.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-4 border border-white/25 text-white font-semibold text-xs tracking-wider uppercase hover:border-white transition-all cursor-pointer text-center bg-transparent mt-4"
                  >
                    VIEW PROJECT →
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 03 & 04 & 05 & 06 — PROJECT PORTFOLIO GRID */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block">THE WORK</span>
                <h2 className="text-3xl font-medium tracking-tight text-white uppercase">A selection of digital experiences</h2>
                <p className="text-xs text-zinc-500 max-w-md font-light">A selection of digital experiences, platforms and products built for ambitious brands, creators and organisations.</p>
              </div>

              {/* Filtering tabs */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                {["ALL", "WEBSITES", "WEB APPS", "E-COMMERCE", "DIGITAL EXPERIENCES", "PLATFORMS", "CREATIVE TECHNOLOGY"].map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`pb-1 transition-all hover:text-white cursor-pointer ${
                        isActive 
                          ? "text-purple-400 border-b border-purple-500" 
                          : "border-b border-transparent"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Asymmetric 12-column grid layout */}
            {isLoading ? (
              <div className="border border-white/10 bg-black/30 p-12 text-center text-zinc-400 font-mono text-xs">Loading web projects...</div>
            ) : filteredWebsites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {filteredWebsites.map((project, idx) => (
                  <div
                    key={project.id}
                    className={`${getGridSpanClass(idx)} flex flex-col justify-between`}
                  >
                    <article
                      onClick={() => setSelectedProject(project)}
                      className="group border border-white/5 bg-zinc-950/40 hover:border-white/20 transition-all duration-300 flex flex-col flex-1 justify-between overflow-hidden cursor-pointer"
                    >
                      <div>
                        {/* Aspect Image Container */}
                        <div className={`${getAspectClass(idx)} overflow-hidden relative border-b border-white/5 bg-zinc-900`}>
                          <img 
                            src={project.thumbnail_url || "/images/webdev/editorial%20image%20placement.png"} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent"></div>
                        </div>

                        {/* Card metadata */}
                        <div className="p-6 space-y-3">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                            {getProjectTag(project).toUpperCase()}
                          </span>
                          <h4 className="text-xl font-semibold text-white tracking-tight leading-tight uppercase group-hover:text-purple-300 transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-xs text-zinc-400 font-light leading-relaxed">{project.description}</p>
                        </div>
                      </div>

                      <div className="p-6 pt-2">
                        <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                          VIEW PROJECT <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 bg-black/50">
                <Globe className="h-8 w-8 text-zinc-600 mb-4" />
                <p className="text-zinc-500 font-medium font-mono text-xs uppercase">Web Showcase Coming Soon</p>
                <p className="text-zinc-600 text-[11px] mt-2 font-light">We are currently curating links to our latest web projects under this filter.</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 07 — WHAT WE BUILD */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            
            {/* Visual Panel */}
            <div className="border border-white/10 bg-zinc-950 overflow-hidden relative aspect-[4/3] w-full">
              <img 
                src="/images/webdev/what%20we%20build.png" 
                alt="Capabilities visual artwork" 
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Details details */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">CAPABILITIES</span>
                <h2 className="text-3xl font-medium tracking-tight text-white uppercase">WHAT WE BUILD</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                {[
                  { title: "WEBSITES", desc: "High-performance websites designed around brand, content and conversion." },
                  { title: "WEB APPS", desc: "Interactive applications and customer-facing digital products." },
                  { title: "E-COMMERCE", desc: "Commerce experiences, product systems and custom storefronts." },
                  { title: "DIGITAL EXPERIENCES", desc: "Interactive experiences that combine design, technology and storytelling." },
                  { title: "AI-POWERED PRODUCTS", desc: "Web products incorporating AI agents, automation and generative systems." },
                  { title: "INTERNAL PLATFORMS", desc: "Custom tools and business systems designed around specific workflows." }
                ].map((spec, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{spec.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 08 — ADD A STRONG VISUAL PROJECT MOMENT */}
      {displayWebsites.length > 1 && (
        <section className="py-16 md:py-24 border-b border-white/5 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto space-y-8">
              <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">PROJECT / DIGITAL EXPERIENCE</span>
              
              {/* Large project image box */}
              <div 
                onClick={() => setSelectedProject(displayWebsites[1])}
                className="border border-white/10 bg-zinc-950 overflow-hidden relative h-[50vh] w-full group cursor-pointer"
              >
                <img 
                  src={displayWebsites[1].thumbnail_url || "/images/webdev/portfolio%20empty_transition%20image.png"} 
                  alt={displayWebsites[1].title} 
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-101 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white uppercase tracking-tight">{displayWebsites[1].title}</h3>
                  <p className="text-xs text-zinc-500 max-w-xl font-light">{getCaseStudy(displayWebsites[1])}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(displayWebsites[1])}
                  className="px-8 py-4 border border-white/25 text-white font-semibold text-xs tracking-wider uppercase hover:border-white transition-all cursor-pointer text-center bg-transparent shrink-0"
                >
                  VIEW PROJECT →
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 10 — NOT JUST A WEBSITE */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            
            {/* Details details */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase block font-bold">PHILOSOPHY</span>
                <h2 className="text-4xl font-medium tracking-tight text-white uppercase">NOT JUST A WEBSITE.</h2>
                <p className="text-xs text-zinc-500 leading-relaxed font-light pt-2">
                  We build digital products around the way your business actually works — from the first interface to the systems behind it.
                </p>
              </div>

              {/* Three compact principles */}
              <div className="grid sm:grid-cols-3 gap-6 border-t border-white/5 pt-6">
                {[
                  { title: "DESIGNED", desc: "Every interface begins with a clear visual and interaction system." },
                  { title: "ENGINEERED", desc: "The experience is built for performance, scale and maintainability." },
                  { title: "EVOLVING", desc: "We can continue building, managing and improving the product after launch." }
                ].map((spec, i) => (
                  <div key={i} className="space-y-2 border-l border-white/10 pl-4">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{spec.title}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Panel */}
            <div className="border border-white/10 bg-zinc-950 overflow-hidden relative aspect-[4/3] w-full">
              <img 
                src="/images/webdev/not%20just%20a%20website.png" 
                alt="Designed engineered evolving physical system" 
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* MORE WORK SHOWCASE ROW */}
      {displayWebsites.length > 2 && (
        <section className="py-16 md:py-24 border-b border-white/5 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">ADDITIONAL PRODUCTIONS</span>
                <h2 className="text-3xl font-medium tracking-tight text-white uppercase">MORE WORK</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayWebsites.slice(2).map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="text-left border border-white/5 bg-zinc-950/40 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden relative border-b border-white/5 bg-zinc-990">
                        <img 
                          src={project.thumbnail_url || "/images/webdev/editorial%20image%20placement.png"} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent"></div>
                      </div>
                      <div className="p-6 space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{getProjectTag(project).toUpperCase()}</span>
                        <h4 className="text-lg font-semibold text-white tracking-tight uppercase leading-tight">{project.title}</h4>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{project.description}</p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                        VIEW PROJECT <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 12 — LET'S BUILD IT (CTA) */}
      <section className="py-16 md:py-32 bg-black relative overflow-hidden border-t border-white/5">
        {/* Full-bleed background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black z-10"></div>
          <img 
            src="/images/webdev/lets%20build%20it.png" 
            alt="Generative modular construction CTA backdrop" 
            className="w-full h-full object-cover opacity-35 brightness-125 animate-ken-burns"
            referrerPolicy="no-referrer"
          />
          <TechCanvas />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase block">HAVE SOMETHING TO BUILD?</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tighter text-white uppercase leading-[0.9]">
                LET'S <br />
                <span className="text-zinc-500 italic font-serif">BUILD IT.</span>
              </h2>
              <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed pt-2 font-light">
                Tell us what you're trying to create. We'll help turn the idea into a digital product.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
              <button
                onClick={onOpenContactModal}
                className="w-full px-8 py-5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-colors cursor-pointer border border-white"
              >
                BUILD A WEBSITE →
              </button>
              <button
                onClick={onOpenContactModal}
                className="w-full px-8 py-5 bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-white transition-colors cursor-pointer"
              >
                START A PROJECT →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — DYNAMIC FULL-SCREEN/CINEMATIC DESIGN CASE STUDY OVERLAY */}
      {selectedProject && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-stretch justify-center bg-black/95 transition-opacity duration-300 overflow-hidden">
          {/* Backdrop closer click target */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProject(null)}></div>
          
          {/* Close Button */}
          <button 
            onClick={() => setSelectedProject(null)} 
            className="fixed top-6 right-12 text-zinc-500 hover:text-white p-3 transition-colors cursor-pointer z-50 bg-black/80 rounded-full border border-white/5 shadow-lg animate-fade-in"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Modal Container: Viewport-constrained, overflow-hidden */}
          <div className="relative bg-zinc-950 w-full h-full flex flex-col md:flex-row z-10 shadow-2xl overflow-y-auto md:overflow-hidden max-h-screen">
            
            {/* Left Side: Browser Mockup Preview */}
            <div className="w-full md:w-[60%] lg:w-[65%] h-auto md:h-full flex flex-col justify-center p-4 sm:p-8 md:p-16 lg:p-20 bg-zinc-950 border-b md:border-b-0 md:border-r border-white/5 shrink-0">
              <div className="w-full flex-1 flex flex-col justify-center max-h-full overflow-hidden">
                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-full">
                  {/* Browser Header Bar */}
                  <div className="bg-zinc-950 px-4 py-3 flex items-center border-b border-white/5 gap-2 select-none shrink-0">
                    <div className="flex gap-1.5 shrink-0">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    </div>
                    <div className="bg-zinc-900/60 text-zinc-500 text-[10px] font-mono py-1 px-4 rounded-md mx-auto max-w-md w-full truncate text-center flex items-center justify-center gap-1.5 border border-white/5">
                      <Globe className="w-3 h-3 text-purple-500/70" />
                      <span>{selectedProject.external_url || "https://www.quantum-climb.com"}</span>
                    </div>
                    {/* Placeholder space on right to balance dots */}
                    <div className="w-[38px] shrink-0" />
                  </div>
                  
                  {/* Browser Screen: Contains the image */}
                  <div className="bg-zinc-950 relative aspect-video md:flex-1 overflow-hidden">
                    <img 
                      src={selectedProject.thumbnail_url || "/images/webdev/editorial%20image%20placement.png"} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover object-top block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Details panel */}
            <div className="w-full md:w-[40%] lg:w-[35%] h-auto md:h-full flex flex-col bg-zinc-950 md:overflow-hidden relative">
              {/* Scrollable Content wrapper */}
              <div className="flex-1 overflow-visible md:overflow-y-auto p-6 sm:p-10 space-y-8">
                {/* Title info */}
                <div className="space-y-2 pt-4">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.3em] font-bold">
                    {getProjectTag(selectedProject).toUpperCase()}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight uppercase leading-none">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Metadata fields */}
                <div className="grid grid-cols-2 gap-6 border-t border-b border-white/5 py-6 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block mb-0.5 uppercase text-[9px]">CLIENT / ORG</span>
                    <span className="text-white font-medium">{getClientName(selectedProject)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5 uppercase text-[9px]">YEAR</span>
                    <span className="text-white font-medium">{getYear(selectedProject)}</span>
                  </div>
                </div>

                {/* Case Study / Description */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-semibold">CASE STUDY</span>
                  <p className="text-zinc-300 text-sm leading-relaxed font-light whitespace-pre-wrap">
                    {getCaseStudy(selectedProject)}
                  </p>
                </div>

                {/* Key Features list */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">KEY FEATURES</span>
                  <ul className="space-y-2 text-xs font-light text-zinc-400">
                    {getFeatures(selectedProject).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology tokens */}
                <div className="space-y-3 pb-6">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">TECHNOLOGY</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {getTechnology(selectedProject).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View live site action (sticky at bottom of sidebar) */}
              <div className="p-6 sm:p-10 pt-4 border-t border-white/5 bg-zinc-900/50 backdrop-blur-md shrink-0">
                <a
                  href={selectedProject.external_url || "https://www.quantum-climb.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 border border-white cursor-pointer"
                >
                  VIEW LIVE PROJECT <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
