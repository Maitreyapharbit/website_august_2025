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

-- Create company table
CREATE TABLE IF NOT EXISTS company (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  website text,
  founded text,
  employees text,
  industry text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create contacts table (for contact form submissions)
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create or replace the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_company_updated_at ON company;
CREATE TRIGGER update_company_updated_at 
    BEFORE UPDATE ON company 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE company ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to blogs" ON blogs
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to company" ON company
    FOR SELECT USING (true);

-- Create policies for admin access (you'll need to adjust these based on your auth setup)
CREATE POLICY "Allow service role full access to blogs" ON blogs
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to company" ON company
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to contacts" ON contacts
    FOR ALL USING (auth.role() = 'service_role');

-- Insert sample blog data
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
),
(
  'The Future of Blockchain in Healthcare',
  'How blockchain technology is transforming pharmaceutical industry',
  'Blockchain technology is revolutionizing the pharmaceutical industry by providing immutable records, enhanced traceability, and improved security. This comprehensive guide explores the current applications and future potential of blockchain in healthcare and pharmaceutical supply chains.',
  '12 min read',
  'Technology',
  'Tech Team',
  ARRAY['blockchain', 'healthcare', 'innovation']
);

-- Insert default company information
INSERT INTO company (name, description, email, phone, address, website, founded, employees, industry) VALUES
(
  'Pharbit',
  'Global pharmaceutical technology company combining blockchain and IoT sensors to create unbreakable chains of custody for medicines worldwide, ensuring transparency and patient safety.',
  'info@pharbit.com',
  '+4917697711873',
  'An Europakanal 6, 91056 Erlangen, Germany',
  'www.pharbit.com',
  '2025',
  '10-50',
  'Pharmaceutical Technology'
) ON CONFLICT DO NOTHING;