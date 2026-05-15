import { createClient } from "@supabase/supabase-js";

export type PortfolioContentType = "video" | "image" | "music" | "website";

export type PortfolioItem = {
  id: string;
  content_type: PortfolioContentType;
  title: string;
  slug: string | null;
  description: string | null;
  media_url: string | null;
  thumbnail_url: string | null;
  external_url: string | null;
  tags: string[];
  sort_order: number;
  is_featured: boolean;
  is_published: boolean;
  metadata: Record<string, unknown> | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteVideo = {
  id: string;
  section: string;
  video_url: string | null;
  thumbnail_url: string | null;
  title: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabaseEnv = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = hasSupabaseEnv
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export function getBucketForContentType(contentType: PortfolioContentType) {
  if (contentType === "image") {
    return "portfolio-images";
  }

  if (contentType === "music") {
    return "portfolio-audio";
  }

  return "portfolio-videos";
}

export function sanitizeFileName(name: string) {
  return name.toLowerCase().replaceAll(/[^a-z0-9.\-_]+/g, "-").replaceAll(/-+/g, "-");
}

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Match youtu.be short URL: https://youtu.be/E8hBNvyR8p0
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  
  // Match youtube.com watch URL: https://www.youtube.com/watch?v=E8hBNvyR8p0
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  
  // Match youtube.com embed URL: https://www.youtube.com/embed/E8hBNvyR8p0
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  
  // If it's already just a video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  
  return null;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&playsinline=1&disablekb=1&cc_load_policy=0`;
}
