-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  date timestamp with time zone NOT NULL DEFAULT now(),
  read_time text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  tags text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create or replace the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at (drop if exists first)
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add some sample data (optional)
INSERT INTO blogs (title, excerpt, content, read_time, category, author, tags) VALUES
(
  'Welcome to Pharbit Blog',
  'An introduction to our pharmaceutical supply chain management platform',
  'Pharbit is a comprehensive pharmaceutical supply chain management platform designed to ensure the integrity and traceability of pharmaceutical products throughout their journey from manufacturer to end consumer. Our platform leverages cutting-edge technology including IoT sensors, blockchain, and advanced analytics to provide real-time monitoring and compliance reporting.',
  '5 min read',
  'Platform',
  'Pharbit Team',
  ARRAY['pharmaceutical', 'supply-chain', 'technology']
),
(
  'Understanding Pharmaceutical Supply Chain Security',
  'Key insights into securing pharmaceutical supply chains',
  'Pharmaceutical supply chain security is critical in today''s global market. With increasing incidents of counterfeit drugs and supply chain disruptions, it''s more important than ever to implement robust tracking and monitoring systems. This article explores the key challenges and solutions in pharmaceutical supply chain security.',
  '8 min read',
  'Security',
  'Dr. Sarah Johnson',
  ARRAY['security', 'compliance', 'counterfeit']
);