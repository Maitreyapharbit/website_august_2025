-- Pharbit Backend Database Schema
-- Run this script in your Supabase SQL Editor

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create company table
CREATE TABLE IF NOT EXISTS company (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  email text,
  phone text,
  address text,
  updated_at timestamp with time zone DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
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

-- Insert default company information
INSERT INTO company (name, description, email, phone, address) VALUES 
('Pharbit', 'Global pharmaceutical technology company combining blockchain and IoT sensors to create unbreakable chains of custody for medicines worldwide.', 'info@pharbit.com', '+4917697711873', 'An Europakanal 6, 91056 Erlangen, Germany')
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blogs (title, content, excerpt, image_url) VALUES 
(
  'Welcome to Pharbit Blog',
  'Pharbit is revolutionizing the pharmaceutical industry with blockchain technology and IoT sensors. Our platform ensures complete traceability and authenticity of pharmaceutical products from manufacturing to patient delivery. By combining cutting-edge blockchain technology with IoT sensors, we create an unbreakable chain of custody that protects patients and empowers pharmaceutical companies worldwide.',
  'An introduction to Pharbit''s blockchain-based pharmaceutical supply chain management platform.',
  'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'The Future of Pharmaceutical Security',
  'Counterfeit drugs pose a significant threat to global health, causing over 1 million deaths annually and costing the pharmaceutical industry over $200 billion per year. Pharbit''s blockchain technology provides an immutable record of every pharmaceutical product''s journey, ensuring authenticity and patient safety. Our IoT sensors monitor temperature, humidity, and location in real-time, providing complete visibility into the supply chain.',
  'How blockchain technology is transforming pharmaceutical security and patient safety.',
  'https://images.pexels.com/photos/3786127/pexels-photo-3786127.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'IoT Sensors in Cold Chain Management',
  'Temperature-sensitive medications require precise cold chain management to maintain their efficacy. Our IoT sensors provide real-time monitoring and automated alerts to ensure medication quality throughout the supply chain. With 24/7 monitoring and instant notifications, pharmaceutical companies can prevent spoilage and ensure patient safety.',
  'Real-time temperature monitoring for pharmaceutical cold chain compliance.',
  'https://images.pexels.com/photos/3786128/pexels-photo-3786128.jpeg?auto=compress&cs=tinysrgb&w=800'
)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- Enable Row Level Security (RLS) for security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE company ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Admins table: Only accessible by service role
CREATE POLICY "Service role can access admins" ON admins
  FOR ALL USING (auth.role() = 'service_role');

-- Blogs table: Public read, service role write
CREATE POLICY "Anyone can read blogs" ON blogs
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage blogs" ON blogs
  FOR ALL USING (auth.role() = 'service_role');

-- Company table: Public read, service role write
CREATE POLICY "Anyone can read company" ON company
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage company" ON company
  FOR ALL USING (auth.role() = 'service_role');

-- Contacts table: Anyone can insert, service role can read/delete
CREATE POLICY "Anyone can submit contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage contacts" ON contacts
  FOR ALL USING (auth.role() = 'service_role');