-- Create project_inquiries table to store Start a Project submissions
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  country TEXT,
  selected_services TEXT[] NOT NULL DEFAULT '{}',
  requirements JSONB NOT NULL DEFAULT '{}'::jsonb,
  description TEXT NOT NULL,
  timeline TEXT,
  budget TEXT,
  referral_source TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous guests) to insert inquiries
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON public.project_inquiries;
CREATE POLICY "Anyone can insert inquiries"
  ON public.project_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admin users can view inquiries
DROP POLICY IF EXISTS "Admins can view inquiries" ON public.project_inquiries;
CREATE POLICY "Admins can view inquiries"
  ON public.project_inquiries
  FOR SELECT
  TO authenticated
  USING (private.is_admin((select auth.uid())));

-- Only authenticated admin users can delete inquiries
DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.project_inquiries;
CREATE POLICY "Admins can delete inquiries"
  ON public.project_inquiries
  FOR DELETE
  TO authenticated
  USING (private.is_admin((select auth.uid())));
