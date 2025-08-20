-- Update Database Schema for Admin Dashboard
-- This migration updates the existing tables to match the admin dashboard requirements

-- Update blogs table to match requirements
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500);

-- Update existing blogs to have published status
UPDATE blogs SET status = 'published' WHERE status IS NULL;

-- Create company_info table to match requirements
CREATE TABLE IF NOT EXISTS company_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migrate data from company table to company_info table
INSERT INTO company_info (company_name, address, phone, email, website, updated_at)
SELECT 
  name as company_name,
  address,
  'Erlangen' as city,
  'Bavaria' as state,
  '91056' as zip_code,
  phone,
  email,
  'https://pharbit.com' as website,
  updated_at
FROM company
WHERE NOT EXISTS (SELECT 1 FROM company_info LIMIT 1);

-- Create trigger for company_info table
DROP TRIGGER IF EXISTS update_company_info_updated_at ON company_info;
CREATE TRIGGER update_company_info_updated_at
    BEFORE UPDATE ON company_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for company_info table
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for company_info table
CREATE POLICY "Anyone can read company_info" ON company_info
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage company_info" ON company_info
  FOR ALL USING (auth.role() = 'service_role');

-- Create index for company_info
CREATE INDEX IF NOT EXISTS idx_company_info_updated_at ON company_info(updated_at DESC);

-- Update blogs table RLS policies to include status field
DROP POLICY IF EXISTS "Anyone can read blogs" ON blogs;
CREATE POLICY "Anyone can read blogs" ON blogs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can manage blogs" ON blogs;
CREATE POLICY "Service role can manage blogs" ON blogs
  FOR ALL USING (auth.role() = 'service_role');