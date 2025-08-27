-- =====================================================
-- FIX DELETE POLICIES FOR ADMIN FUNCTIONALITY
-- =====================================================

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Allow authenticated delete blogs" ON blogs;
DROP POLICY IF EXISTS "Allow authenticated delete company" ON company;

-- Create new policies that allow service role to perform all operations
-- This will work with your admin authentication system

-- =====================================================
-- BLOGS POLICIES (UPDATED)
-- =====================================================

-- Allow public read access to blogs
DROP POLICY IF EXISTS "Allow public read access to blogs" ON blogs;
CREATE POLICY "Allow public read access to blogs" ON blogs
    FOR SELECT USING (true);

-- Allow service role to perform all operations (for admin API)
CREATE POLICY "Allow service role all operations on blogs" ON blogs
    FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to create blogs (for admin)
DROP POLICY IF EXISTS "Allow authenticated insert blogs" ON blogs;
CREATE POLICY "Allow authenticated insert blogs" ON blogs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Allow authenticated users to update blogs (for admin)
DROP POLICY IF EXISTS "Allow authenticated update blogs" ON blogs;
CREATE POLICY "Allow authenticated update blogs" ON blogs
    FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Allow authenticated users to delete blogs (for admin)
CREATE POLICY "Allow authenticated delete blogs" ON blogs
    FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- =====================================================
-- COMPANY POLICIES (UPDATED)
-- =====================================================

-- Allow public read access to company info
DROP POLICY IF EXISTS "Allow public read access to company" ON company;
CREATE POLICY "Allow public read access to company" ON company
    FOR SELECT USING (true);

-- Allow service role to perform all operations (for admin API)
CREATE POLICY "Allow service role all operations on company" ON company
    FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to update company info (for admin)
DROP POLICY IF EXISTS "Allow authenticated update company" ON company;
CREATE POLICY "Allow authenticated update company" ON company
    FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Allow authenticated users to insert company info (for admin)
DROP POLICY IF EXISTS "Allow authenticated insert company" ON company;
CREATE POLICY "Allow authenticated insert company" ON company
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Allow authenticated users to delete company info (for admin)
CREATE POLICY "Allow authenticated delete company" ON company
    FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- =====================================================
-- ALTERNATIVE: DISABLE RLS FOR ADMIN OPERATIONS
-- =====================================================

-- If the above policies don't work, you can temporarily disable RLS
-- Uncomment the lines below if you want to disable RLS for testing:

-- ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE company DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check current policies
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename IN ('blogs', 'company')
ORDER BY tablename, policyname;

-- Test if we can delete (this should work now)
-- SELECT 'Policies updated successfully!' as status;