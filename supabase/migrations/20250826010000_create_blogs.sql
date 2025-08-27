-- Blogs table and RLS policies
-- Safe to run multiple times

-- Enable pgcrypto for gen_random_uuid if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  read_time text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'blogs' AND policyname = 'blogs_public_read'
  ) THEN
    CREATE POLICY blogs_public_read
      ON public.blogs FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

-- Allow authenticated read (optional)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'blogs' AND policyname = 'blogs_auth_read'
  ) THEN
    CREATE POLICY blogs_auth_read
      ON public.blogs FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;
