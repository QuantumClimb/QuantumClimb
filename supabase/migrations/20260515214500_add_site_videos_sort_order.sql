-- Add sort_order column to site_videos table
ALTER TABLE public.site_videos ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Update existing records if any
UPDATE public.site_videos SET sort_order = 0 WHERE sort_order IS NULL;
