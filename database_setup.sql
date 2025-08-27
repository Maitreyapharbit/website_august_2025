-- =====================================================
-- PHARBIT WEBSITE DATABASE SETUP
-- Supabase Database Schema for Blogs and Company Management
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- BLOGS TABLE
-- =====================================================

-- Drop existing blogs table if it exists
DROP TABLE IF EXISTS blogs CASCADE;

-- Create blogs table with complete structure
CREATE TABLE blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    read_time TEXT NOT NULL,
    tags TEXT[],
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_author ON blogs(author);
CREATE INDEX idx_blogs_date ON blogs(date);
CREATE INDEX idx_blogs_created_at ON blogs(created_at);

-- =====================================================
-- COMPANY TABLE
-- =====================================================

-- Drop existing company table if it exists
DROP TABLE IF EXISTS company CASCADE;

-- Create company table
CREATE TABLE company (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    website TEXT,
    founded TEXT,
    employees TEXT,
    industry TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PROFILES TABLE (for user management)
-- =====================================================

-- Drop existing profiles table if it exists
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_updated_at 
    BEFORE UPDATE ON company 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE company ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- BLOGS POLICIES
-- =====================================================

-- Allow public read access to blogs
CREATE POLICY "Allow public read access to blogs" ON blogs
    FOR SELECT USING (true);

-- Allow authenticated users to create blogs (for admin)
CREATE POLICY "Allow authenticated insert blogs" ON blogs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blogs (for admin)
CREATE POLICY "Allow authenticated update blogs" ON blogs
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blogs (for admin)
CREATE POLICY "Allow authenticated delete blogs" ON blogs
    FOR DELETE USING (auth.role() = 'authenticated');

-- =====================================================
-- COMPANY POLICIES
-- =====================================================

-- Allow public read access to company info
CREATE POLICY "Allow public read access to company" ON company
    FOR SELECT USING (true);

-- Allow authenticated users to update company info (for admin)
CREATE POLICY "Allow authenticated update company" ON company
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert company info (for admin)
CREATE POLICY "Allow authenticated insert company" ON company
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

-- Allow users to read their own profile
CREATE POLICY "Allow users to read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow users to update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow authenticated users to insert profiles
CREATE POLICY "Allow authenticated insert profiles" ON profiles
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default company information
INSERT INTO company (name, description, email, phone, address, website, founded, employees, industry) 
VALUES (
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

-- Insert sample blog posts
INSERT INTO blogs (title, excerpt, content, category, author, read_time, tags, date) VALUES
(
    'Welcome to Pharbit',
    'Introducing our innovative approach to pharmaceutical supply chain security using blockchain technology.',
    'Pharbit is revolutionizing the pharmaceutical industry by combining cutting-edge blockchain technology with IoT sensors to create unbreakable chains of custody for medicines worldwide. Our mission is to ensure transparency and patient safety through innovative solutions that track every step of the pharmaceutical supply chain.

## Our Vision

We envision a world where every medicine can be traced from manufacturer to patient, ensuring authenticity and safety at every step.

## Key Features

- **Blockchain Security**: Immutable record-keeping
- **IoT Integration**: Real-time monitoring
- **Global Compliance**: Meets international standards
- **Patient Safety**: Ensures medicine authenticity

Join us in building a safer pharmaceutical future.',
    'Company',
    'Pharbit Team',
    '3 min read',
    ARRAY['blockchain', 'pharmaceutical', 'innovation', 'safety'],
    NOW()
),
(
    'The Future of Pharmaceutical Supply Chains',
    'How blockchain technology is transforming medicine tracking and patient safety.',
    'The pharmaceutical industry faces unprecedented challenges in ensuring the authenticity and safety of medicines as they travel through complex global supply chains. Traditional tracking methods are often fragmented and vulnerable to tampering, putting patients at risk.

## The Problem

Counterfeit medicines cost the global economy billions annually and pose serious health risks to patients worldwide. Current supply chain tracking systems lack transparency and are easily compromised.

## Our Solution

Pharbit''s blockchain-based platform provides:
- **End-to-end tracking**: From manufacturer to patient
- **Real-time monitoring**: IoT sensors provide live updates
- **Immutable records**: Blockchain ensures data integrity
- **Global accessibility**: Cloud-based platform works worldwide

## Benefits

1. **Enhanced Security**: Tamper-proof tracking system
2. **Improved Transparency**: Real-time visibility into supply chain
3. **Better Compliance**: Automated regulatory reporting
4. **Patient Safety**: Verified medicine authenticity

The future of pharmaceutical supply chains is here, and it''s built on blockchain technology.',
    'Technology',
    'Pharbit Team',
    '5 min read',
    ARRAY['supply-chain', 'blockchain', 'security', 'compliance'],
    NOW() - INTERVAL '1 day'
),
(
    'IoT Sensors in Pharmaceutical Monitoring',
    'Exploring how IoT technology enhances medicine tracking and quality assurance.',
    'Internet of Things (IoT) technology is revolutionizing how we monitor pharmaceutical products throughout their journey from production to consumption. At Pharbit, we''ve developed advanced IoT sensors that provide real-time data on medicine conditions and location.

## IoT Sensor Capabilities

Our IoT sensors monitor:
- **Temperature**: Critical for medicine stability
- **Humidity**: Prevents degradation
- **Location**: GPS tracking for security
- **Movement**: Detects unauthorized handling
- **Light exposure**: Protects light-sensitive medicines

## Real-World Applications

### Temperature Monitoring
Many medicines require specific temperature ranges. Our sensors provide continuous monitoring and alert systems when temperatures deviate from safe ranges.

### Security Tracking
GPS-enabled sensors help prevent theft and diversion of pharmaceutical products, ensuring they reach their intended destination.

### Quality Assurance
Real-time data collection helps maintain medicine quality and provides documentation for regulatory compliance.

## Integration with Blockchain

IoT sensor data is automatically recorded on our blockchain platform, creating an immutable audit trail that can be accessed by authorized parties throughout the supply chain.

This combination of IoT and blockchain technology creates a comprehensive monitoring system that ensures medicine safety and authenticity.',
    'Technology',
    'Pharbit Team',
    '4 min read',
    ARRAY['iot', 'sensors', 'monitoring', 'quality-assurance'],
    NOW() - INTERVAL '2 days'
);

-- =====================================================
-- CREATE FUNCTIONS FOR COMMON OPERATIONS
-- =====================================================

-- Function to get all blogs with pagination
CREATE OR REPLACE FUNCTION get_blogs_paginated(
    page_num INTEGER DEFAULT 1,
    page_size INTEGER DEFAULT 10,
    search_term TEXT DEFAULT NULL,
    category_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
    blogs JSON,
    total_count BIGINT,
    total_pages INTEGER
) AS $$
DECLARE
    offset_val INTEGER;
    total_blogs BIGINT;
    total_pages_val INTEGER;
BEGIN
    offset_val := (page_num - 1) * page_size;
    
    -- Get total count
    SELECT COUNT(*) INTO total_blogs
    FROM blogs
    WHERE (search_term IS NULL OR 
           title ILIKE '%' || search_term || '%' OR 
           excerpt ILIKE '%' || search_term || '%' OR 
           content ILIKE '%' || search_term || '%')
    AND (category_filter IS NULL OR category = category_filter);
    
    total_pages_val := CEIL(total_blogs::DECIMAL / page_size);
    
    -- Return blogs with metadata
    RETURN QUERY
    SELECT 
        COALESCE(
            (SELECT json_agg(
                json_build_object(
                    'id', b.id,
                    'title', b.title,
                    'excerpt', b.excerpt,
                    'content', b.content,
                    'category', b.category,
                    'author', b.author,
                    'read_time', b.read_time,
                    'tags', b.tags,
                    'date', b.date,
                    'created_at', b.created_at,
                    'updated_at', b.updated_at
                )
            )
            FROM (
                SELECT *
                FROM blogs
                WHERE (search_term IS NULL OR 
                       title ILIKE '%' || search_term || '%' OR 
                       excerpt ILIKE '%' || search_term || '%' OR 
                       content ILIKE '%' || search_term || '%')
                AND (category_filter IS NULL OR category = category_filter)
                ORDER BY created_at DESC
                LIMIT page_size OFFSET offset_val
            ) b), '[]'::json
        ) as blogs,
        total_blogs as total_count,
        total_pages_val as total_pages;
END;
$$ LANGUAGE plpgsql;

-- Function to get company information
CREATE OR REPLACE FUNCTION get_company_info()
RETURNS TABLE (
    company_data JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(
            (SELECT json_agg(
                json_build_object(
                    'id', c.id,
                    'name', c.name,
                    'description', c.description,
                    'email', c.email,
                    'phone', c.phone,
                    'address', c.address,
                    'website', c.website,
                    'founded', c.founded,
                    'employees', c.employees,
                    'industry', c.industry,
                    'logo_url', c.logo_url,
                    'created_at', c.created_at,
                    'updated_at', c.updated_at
                )
            )
            FROM company c), '[]'::json
        ) as company_data;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions to anon users (for public read access)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON blogs TO anon;
GRANT SELECT ON company TO anon;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify tables were created
SELECT 'blogs' as table_name, COUNT(*) as row_count FROM blogs
UNION ALL
SELECT 'company' as table_name, COUNT(*) as row_count FROM company
UNION ALL
SELECT 'profiles' as table_name, COUNT(*) as row_count FROM profiles;

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('blogs', 'company', 'profiles');

-- =====================================================
-- END OF SETUP
-- =====================================================

-- Success message
SELECT 'Database setup completed successfully!' as status;