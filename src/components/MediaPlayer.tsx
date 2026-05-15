import { useState, useRef } from "react";
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from "../lib/supabase";
import type { SiteVideo } from "../lib/supabase";

export function MediaPlayer({ videos }: { videos: SiteVideo[] }) {
  const [selectedVideo, setSelectedVideo] = useState<SiteVideo | null>(
    videos.length > 0 ? videos[0] : null
  );
  const playerRef = useRef<HTMLDivElement>(null);

  const handleVideoSelect = (video: SiteVideo) => {
    setSelectedVideo(video);
    // On mobile, the playlist is below the player, so scroll up to show the video
    if (window.innerWidth < 1024) { // 1024 is the 'lg' breakpoint in tailwind/common configs
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const videoId = selectedVideo?.video_url ? extractYouTubeVideoId(selectedVideo.video_url) : null;

  return (
    <div ref={playerRef} className="bg-black border border-white/10 overflow-hidden scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 h-full">
        {/* Main Video Player */}
        <div className="flex flex-col">
          <div className="aspect-video bg-zinc-950 relative overflow-hidden group">
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(videoId)}
                title={selectedVideo?.title || "Video Player"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                <p className="text-zinc-500">No video selected</p>
              </div>
            )}
          </div>

          {/* Video Info */}
          {selectedVideo && (
            <div className="p-6 border-t border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {selectedVideo.title || "Untitled"}
              </h2>
              <p className="text-zinc-400 text-sm">{selectedVideo.description}</p>
            </div>
          )}
        </div>

        {/* Playlist */}
        <div className="border-l border-white/10 flex flex-col bg-zinc-950/50 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-300 font-semibold">
              Select video to begin
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {videos.length === 0 ? (
              <div className="p-4 text-center text-zinc-500 text-sm">No videos available</div>
            ) : (
              <div className="space-y-1 p-2">
                {videos.map((video) => {
                  const thumbVideoId = video.video_url ? extractYouTubeVideoId(video.video_url) : null;
                  const thumbnailUrl = thumbVideoId
                    ? `https://img.youtube.com/vi/${thumbVideoId}/hqdefault.jpg`
                    : "https://picsum.photos/seed/no_thumb/160/90";

                  const isSelected = selectedVideo?.id === video.id;

                  return (
                    <button
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`w-full text-left overflow-hidden transition-colors rounded ${
                        isSelected
                          ? "bg-purple-600/20 border border-purple-600/40"
                          : "bg-zinc-900/50 border border-white/5 hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex gap-2 p-2">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-12 flex-shrink-0 overflow-hidden">
                          <img
                            src={thumbnailUrl}
                            alt={video.title || "Thumbnail"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://picsum.photos/seed/fallback/160/90";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">
                            {video.title || "Untitled"}
                          </p>
                          <p className="text-[11px] text-zinc-500 truncate mt-1">
                            {video.section}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
