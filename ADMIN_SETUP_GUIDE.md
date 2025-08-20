# Pharbit Admin Setup Guide

## 🎯 Overview
This guide will help you set up the admin login system for Pharbit, allowing you to manage blogs and company information through authenticated API endpoints.

## 🔧 Prerequisites

### 1. Supabase Database Setup
Make sure your Supabase database has the required tables. Run this SQL in your Supabase SQL Editor:

```sql
-- Create admins table if it doesn't exist
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access
CREATE POLICY "Service role can access admins" ON admins
  FOR ALL USING (auth.role() = 'service_role');
```

### 2. Environment Variables
Ensure these environment variables are set in your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_ACCESS_SECRET=your_super_secret_jwt_key_here

# Backend API URL (for production)
NEXT_PUBLIC_BACKEND_API_URL=https://main.d22x4oiromio4y.amplifyapp.com
```

## 🚀 Setup Steps

### Step 1: Create Admin User
Run the admin setup script to create your admin user:

```bash
npm run setup:admin
```

This will create an admin user with:
- **Email**: admin@pharbit.com
- **Password**: F#034180427932al
- **Role**: ADMIN

### Step 2: Test the API
Run the test script to verify everything is working:

```bash
npm run test:admin
```

This will test:
- ✅ Admin login
- ✅ Profile retrieval
- ✅ Blog CRUD operations
- ✅ Company info management
- ✅ Public endpoints

### Step 3: Start Development Server
```bash
npm run dev
```

## 🔐 API Endpoints

### Authentication

#### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@pharbit.com",
  "password": "F#034180427932al"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@pharbit.com",
      "role": "ADMIN"
    },
    "tokens": {
      "access": "jwt_token_here",
      "refresh": "refresh_token_here"
    }
  }
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <access_token>
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <access_token>
```

### Blog Management

#### Get All Blogs (Public)
```http
GET /api/blogs?page=1&limit=10&search=blockchain
```

#### Get Single Blog (Public)
```http
GET /api/blogs/{id}
```

#### Create Blog (Admin Only)
```http
POST /api/blogs
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "New Blog Post",
  "excerpt": "Blog excerpt",
  "content": "Full blog content",
  "image_url": "https://example.com/image.jpg",
  "status": "published"
}
```

#### Update Blog (Admin Only)
```http
PUT /api/blogs/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "excerpt": "Updated excerpt"
}
```

#### Delete Blog (Admin Only)
```http
DELETE /api/blogs/{id}
Authorization: Bearer <access_token>
```

### Company Management

#### Get Company Info (Public)
```http
GET /api/company
```

#### Update Company Info (Admin Only)
```http
PUT /api/company
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Pharbit GmbH",
  "description": "Updated description",
  "email": "info@pharbit.com",
  "phone": "+4917697711873",
  "address": "An Europakanal 6, 91056 Erlangen, Germany"
}
```

## 🛡️ Security Features

### Authentication
- ✅ JWT token-based authentication
- ✅ Secure password hashing with bcrypt
- ✅ Token expiration (24h access, 7d refresh)
- ✅ Role-based authorization

### Authorization
- ✅ Admin-only write operations
- ✅ Public read access for blogs and company info
- ✅ Protected profile and management endpoints

### Data Protection
- ✅ Input validation
- ✅ SQL injection prevention (Supabase built-in)
- ✅ CORS headers for cross-origin requests
- ✅ Environment variable validation

## 🧪 Testing

### Manual Testing with curl

1. **Login to get token:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pharbit.com","password":"F#034180427932al"}'
```

2. **Create a blog post:**
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Blog",
    "excerpt": "Test excerpt",
    "content": "Test content",
    "status": "published"
  }'
```

3. **Update company info:**
```bash
curl -X PUT http://localhost:3000/api/company \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "phone": "+4917697711873",
    "email": "info@pharbit.com"
  }'
```

### Automated Testing
```bash
# Run the comprehensive test suite
npm run test:admin
```

## 🚨 Troubleshooting

### Common Issues

1. **"Admin user not found" during login**
   - Run: `npm run setup:admin`
   - Check your Supabase database has the `admins` table

2. **"Authorization required" errors**
   - Ensure you're sending the JWT token in the Authorization header
   - Check that the token hasn't expired (24h lifetime)

3. **"Failed to fetch" errors**
   - Verify your environment variables are set correctly
   - Check that your Supabase project is accessible

4. **Database connection errors**
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
   - Check your Supabase project URL and keys

### Environment Variable Check
```bash
# Check if environment variables are loaded
node -e "
require('dotenv').config();
console.log('SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log('SUPABASE_SERVICE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log('JWT_SECRET:', !!process.env.JWT_ACCESS_SECRET);
"
```

## 🎉 Next Steps

Once the admin system is working:

1. **Frontend Admin Panel**: Create React components for:
   - Admin login form
   - Blog management dashboard
   - Company info editor
   - Content management interface

2. **Enhanced Features**:
   - Rich text editor for blog content
   - Image upload functionality
   - Blog categories and tags management
   - User management system

3. **Production Deployment**:
   - Set environment variables in your hosting platform
   - Run the admin setup script in production
   - Test all endpoints in production environment

## 📋 Admin Credentials

**Email**: admin@pharbit.com  
**Password**: F#034180427932al  
**Role**: ADMIN

Keep these credentials secure and consider changing the password after initial setup!

---

Your admin login and content management system is now ready! 🚀