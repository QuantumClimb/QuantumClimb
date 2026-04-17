import { ArrowUpRight, ExternalLink, Film, Globe, Headphones, ImageIcon, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { PortfolioItem } from "../lib/supabase";

type ContactClickProps = Readonly<{
  onContactClick: () => void;
  itemCount?: number;
}>;

type PortfolioListProps = Readonly<{
  items: PortfolioItem[];
  isLoading?: boolean;
}>;

const featuredVideos = [
  {
    title: "Brand Story Reel",
    type: "Launch campaign",
    description: "Hero video slot for cinematic promos, product reveals, or founder stories.",
  },
  {
    title: "Behind-the-Scenes",
    type: "Studio diary",
    description: "Use this panel for process clips, interviews, and production breakdowns.",
  },
  {
    title: "Client Case Study",
    type: "Results showcase",
    description: "Highlight project wins with testimonial-led edits and outcome snapshots.",
  },
];

const featuredImages = [
  { title: "Campaign Stills", tag: "Photography" },
  { title: "Poster Concepts", tag: "Artwork" },
  { title: "Product Visuals", tag: "Commercial" },
  { title: "Event Highlights", tag: "Editorial" },
  { title: "Social Assets", tag: "Digital" },
  { title: "Team Moments", tag: "Culture" },
];

const placeholderTracks = [
  {
    title: "Signal Rise",
    genre: "Ambient score",
    duration: "Preview ready",
  },
  {
    title: "Momentum Loop",
    genre: "Electronic bed",
    duration: "Preview ready",
  },
  {
    title: "Afterglow Theme",
    genre: "Piano motif",
    duration: "Preview ready",
  },
];

const websiteProjects = [
  {
    name: "Launch Microsite",
    type: "Marketing site",
    url: "https://example.com",
    summary: "A fast promotional experience for campaign launches and product announcements.",
  },
  {
    name: "Creator Portfolio",
    type: "Personal brand",
    url: "https://example.com",
    summary: "A rich storytelling site with media embeds, testimonials, and service showcases.",
  },
  {
    name: "Studio Commerce",
    type: "E-commerce",
    url: "https://example.com",
    summary: "A storefront scaffold for digital drops, booking, and branded merchandise.",
  },
];

function sortItems(items: PortfolioItem[]) {
  return [...items].sort((left, right) => {
    if (left.sort_order !== right.sort_order) {
      return left.sort_order - right.sort_order;
    }

    return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
  });
}

function isDirectVideoUrl(url?: string | null) {
  return Boolean(url && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url));
}

function SectionIntro({
  eyebrow,
  title,
  body,
}: Readonly<{ eyebrow: string; title: string; body: string }>) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="text-base text-zinc-400 md:text-lg">{body}</p>
    </div>
  );
}

export function PortfolioHero({ onContactClick, itemCount = 0 }: ContactClickProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div className="space-y-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-400">Portfolio Showcase</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
            A polished home for video, imagery, music, and web work.
          </h1>
          <p className="max-w-2xl text-lg text-zinc-400 md:text-xl">
            Your portfolio now supports live content from Supabase, so new projects can be added dynamically from the admin area.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#video-gallery" className="bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-purple-500 hover:text-white">
              Explore Portfolio
            </a>
            <button onClick={onContactClick} className="border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-purple-500 hover:text-purple-300">
              Contact Team
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Video Gallery", icon: Film },
            { label: "Image Gallery", icon: ImageIcon },
            { label: "Music Player", icon: Headphones },
            { label: `${itemCount} Live Items`, icon: Globe },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <Icon className="mb-4 h-6 w-6 text-purple-400" />
              <p className="text-lg font-medium text-white">{label}</p>
              <p className="mt-2 text-sm text-zinc-400">Ready for live assets and project details.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoGallerySection({ items, isLoading }: PortfolioListProps) {
  const videos = useMemo(() => sortItems(items.filter((item) => item.content_type === "video")), [items]);

  return (
    <section id="video-gallery" className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionIntro
          eyebrow="Featured motion"
          title="Video gallery"
          body="Trailers, testimonials, behind-the-scenes edits, and product explainers can now be managed from the admin dashboard."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full border border-white/10 bg-black/30 p-6 text-zinc-400">Loading portfolio videos...</div>
          ) : videos.length > 0 ? (
            videos.map((video) => (
              <article key={video.id} className="overflow-hidden border border-white/10 bg-zinc-950/70">
                <div className="aspect-video border-b border-white/10 bg-black">
                  {isDirectVideoUrl(video.media_url) ? (
                    <video controls poster={video.thumbnail_url ?? undefined} className="h-full w-full object-cover" src={video.media_url ?? undefined} />
                  ) : video.thumbnail_url ? (
                    <img src={video.thumbnail_url} alt={video.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950">
                      <PlayCircle className="h-12 w-12 text-purple-400" />
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white">{video.title}</h3>
                    <span className="border border-purple-500/40 px-2 py-1 text-xs text-purple-300">Live</span>
                  </div>
                  <p className="text-sm text-zinc-400">{video.description}</p>
                  {video.external_url || video.media_url ? (
                    <a href={video.external_url ?? video.media_url ?? "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-300">
                      Open video
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            featuredVideos.map((video) => (
              <article key={video.title} className="overflow-hidden border border-white/10 bg-zinc-950/70">
                <div className="flex aspect-video items-center justify-center border-b border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950">
                  <div className="text-center">
                    <PlayCircle className="mx-auto h-12 w-12 text-purple-400" />
                    <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-zinc-300">Video Placeholder</p>
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white">{video.title}</h3>
                    <span className="border border-purple-500/40 px-2 py-1 text-xs text-purple-300">{video.type}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{video.description}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export function ImageGallerySection({ items, isLoading }: PortfolioListProps) {
  const images = useMemo(() => sortItems(items.filter((item) => item.content_type === "image")), [items]);

  return (
    <section id="image-gallery" className="border-b border-white/10 bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionIntro
          eyebrow="Visual work"
          title="Image gallery"
          body="A modular image wall for stills, campaign artwork, product renders, and social creatives."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full border border-white/10 bg-black/30 p-6 text-zinc-400">Loading image gallery...</div>
          ) : images.length > 0 ? (
            images.map((image, index) => (
              <div key={image.id} className="group overflow-hidden border border-white/10 bg-black/40">
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800">
                  {image.media_url || image.thumbnail_url ? (
                    <img
                      src={image.thumbnail_url ?? image.media_url ?? undefined}
                      alt={image.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-500">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-medium text-white">{image.title}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">0{index + 1}</span>
                  </div>
                  <p className="text-sm text-purple-300">{image.tags[0] ?? "Image"}</p>
                </div>
              </div>
            ))
          ) : (
            featuredImages.map((image, index) => (
              <div key={image.title} className="group overflow-hidden border border-white/10 bg-black/40">
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-500 transition duration-300 group-hover:from-purple-950 group-hover:to-zinc-900">
                  <ImageIcon className="h-10 w-10" />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-medium text-white">{image.title}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">0{index + 1}</span>
                  </div>
                  <p className="text-sm text-purple-300">{image.tag}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export function MusicPlayerSection({ items, isLoading }: PortfolioListProps) {
  const musicItems = useMemo(() => sortItems(items.filter((item) => item.content_type === "music")), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [musicItems.length]);

  const activeTrack = musicItems[activeIndex] ?? null;

  return (
    <section id="music-player" className="border-b border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <div>
          <SectionIntro
            eyebrow="Audio corner"
            title="Music player"
            body="Feature original scores, sound design previews, podcast cuts, or voice samples."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border border-white/10 bg-zinc-950/70 p-6">
            {isLoading ? (
              <p className="text-zinc-400">Loading music previews...</p>
            ) : activeTrack ? (
              <>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Now selected</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{activeTrack.title}</h3>
                <p className="mt-1 text-sm text-purple-300">{activeTrack.tags[0] ?? "Audio track"}</p>
                <p className="mt-4 text-sm text-zinc-400">{activeTrack.description}</p>
                {activeTrack.media_url ? <audio controls className="mt-6 w-full" src={activeTrack.media_url} /> : null}
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Now selected</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Signal Rise</h3>
                <p className="mt-1 text-sm text-purple-300">Ambient score</p>
                <div className="mt-8 flex items-center gap-4">
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white">
                    <PlayCircle className="h-6 w-6" />
                  </button>
                  <div className="w-full">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-purple-400"></div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-zinc-500">
                      <span>Preview</span>
                      <span>Ready</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="border border-white/10 bg-black/30 p-3">
            {(musicItems.length > 0 ? musicItems : placeholderTracks).map((track, index) => (
              <button
                key={"id" in track ? track.id : track.title}
                onClick={() => setActiveIndex(index)}
                className={`flex w-full items-center justify-between border px-4 py-4 text-left transition ${activeIndex === index ? "border-purple-500 bg-purple-500/10" : "border-transparent hover:border-white/10 hover:bg-white/5"}`}
              >
                <div>
                  <p className="font-medium text-white">{track.title}</p>
                  <p className="text-sm text-zinc-400">{"tags" in track ? track.tags[0] ?? "Music" : track.genre}</p>
                </div>
                <span className="text-sm text-zinc-500">{"duration" in track ? track.duration : "Live"}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WebsiteLinksSection({ items, isLoading }: PortfolioListProps) {
  const websites = useMemo(() => sortItems(items.filter((item) => item.content_type === "website")), [items]);

  return (
    <section id="websites" className="bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionIntro
          eyebrow="Digital launches"
          title="Website links"
          body="Showcase websites you have designed or developed with live URLs, stack notes, and project summaries."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full border border-white/10 bg-black/30 p-6 text-zinc-400">Loading website projects...</div>
          ) : websites.length > 0 ? (
            websites.map((project) => (
              <article key={project.id} className="flex h-full flex-col justify-between border border-white/10 bg-black/30 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-purple-300">{project.tags[0] ?? "Website"}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm text-zinc-400">{project.description}</p>
                </div>

                <a
                  href={project.external_url ?? project.media_url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-purple-300"
                >
                  Visit project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))
          ) : (
            websiteProjects.map((project) => (
              <article key={project.name} className="flex h-full flex-col justify-between border border-white/10 bg-black/30 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-purple-300">{project.type}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-3 text-sm text-zinc-400">{project.summary}</p>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-purple-300"
                >
                  Visit project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>Quantum Climb Portfolio</p>
        <div className="flex flex-wrap gap-4">
          <a href="#video-gallery" className="hover:text-white">Video</a>
          <a href="#image-gallery" className="hover:text-white">Images</a>
          <a href="#music-player" className="hover:text-white">Music</a>
          <a href="#websites" className="hover:text-white">Websites</a>
        </div>
      </div>
    </footer>
  );
}
