import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

export function IndustryUseCases() {
  const industries = [
    { title: "Content Creators", desc: "Scale your YouTube or TikTok channel to every language instantly.", img: "https://picsum.photos/seed/creator/800/600" },
    { title: "E-Learning", desc: "Localize educational courses with perfect technical terminology.", img: "https://picsum.photos/seed/learning/800/600" },
    { title: "Enterprise", desc: "Internal communications and training for global workforces.", img: "https://picsum.photos/seed/corp/800/600" },
    { title: "E-Commerce", desc: "Product demos that speak the customer's language natively.", img: "https://picsum.photos/seed/shop/800/600" },
    { title: "Marketing Agencies", desc: "Global ad campaigns with localized voiceovers in record time.", img: "https://picsum.photos/seed/agency/800/600" },
    { title: "Media & Entertainment", desc: "Film and TV localization that preserves the actor's performance.", img: "https://picsum.photos/seed/media/800/600" },
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Solutions for Every Sector"
          title="Built for Every Industry"
          subtitle="From independent creators to Fortune 500 companies, Quantum Climb powers global communication."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <Reveal key={industry.title} type="fold" delay={0.1 * index} className="group cursor-pointer">
              <div className="relative aspect-4/3 overflow-hidden border border-white/10 mb-6">
                <img
                  src={industry.img}
                  alt={industry.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h4 className="text-2xl font-medium text-white mb-2 group-hover:text-purple-600 transition-colors">{industry.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{industry.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImpactCaseStudies() {
  const cases = [
    { title: "Content Creation", result: "+400%", label: "Global Reach Increase", desc: "Localized 500+ videos into 12 languages in 48 hours." },
    { title: "E-Learning", result: "85%", label: "Efficiency Gain", desc: "Replaced human dubbing for 1000+ hours of course material." },
    { title: "E-Commerce", result: "2.5X", label: "Conversion Lift", desc: "Native product demos drove massive sales in new markets." },
  ];

  return (
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Measured Success" title="Real Results, Real Impact" />
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {cases.map((item, index) => (
            <Reveal key={item.title} type="fade-up" delay={0.1 * index} className="bg-zinc-950 p-12 hover:bg-zinc-900 transition-colors duration-500">
              <div className="text-purple-600 font-mono text-[10px] uppercase tracking-widest mb-6">{item.title}</div>
              <div className="text-6xl font-medium text-white mb-2 tracking-tighter">{item.result}</div>
              <div className="text-zinc-400 font-medium mb-6">{item.label}</div>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  const posts = [
    { title: "The Future of AI Dubbing in 2026", date: "Mar 15, 2026", img: "https://picsum.photos/seed/blog1/800/500" },
    { title: "How to Scale Your YouTube Channel Globally", date: "Mar 10, 2026", img: "https://picsum.photos/seed/blog2/800/500" },
    { title: "Neural Voice Cloning: A Technical Deep Dive", date: "Mar 05, 2026", img: "https://picsum.photos/seed/blog3/800/500" },
  ];

  return (
    <section className="py-32 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <SectionHeader eyebrow="Insights from the Peak" title="Latest from Quantum Climb" centered={false} />
          <button className="hidden md:flex items-center gap-2 text-purple-600 font-medium hover:text-white transition-colors mb-16">
            View All Posts <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.title} type="fold" delay={0.1 * index} className="group cursor-pointer">
              <div className="aspect-16/10 overflow-hidden border border-white/10 mb-6">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-3">{post.date}</div>
              <h4 className="text-xl font-medium text-white group-hover:text-purple-600 transition-colors">{post.title}</h4>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}