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
