# Blog Management API Setup Guide (Next.js)

## Overview
This implementation adds a complete blog management system to the Next.js application with Supabase integration. The API includes CRUD operations for blog posts with admin-only write access and public read access using Next.js API routes.

## Database Setup

### 1. Create Blogs Table
Run the following SQL in your Supabase SQL editor:

```sql
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

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

Alternatively, you can run the SQL script:
```bash
# Copy the SQL from scripts/create-blogs-table.sql and run it in Supabase
```

### 2. Set Up Admin User
Run the admin setup script:

```bash
node scripts/setup-admin.js
```

This creates an admin user with:
- Email: admin@pharbit.com
- Password: F#034180427932al
- Role: ADMIN

## API Endpoints

### Public Endpoints (No Authentication Required)

#### GET /api/blogs
List all blog posts with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `category` (optional): Filter by category
- `author` (optional): Filter by author
- `search` (optional): Search in title, excerpt, and content

**Example:**
```bash
curl "http://localhost:3000/api/blogs?page=1&limit=10&category=Technology"
```

**Response:**
```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": {
    "blogs": [...],
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### GET /api/blogs/[id]
Get a single blog post by ID.

**Example:**
```bash
curl "http://localhost:3000/api/blogs/123e4567-e89b-12d3-a456-426614174000"
```

**Response:**
```json
{
  "success": true,
  "message": "Blog retrieved successfully",
  "data": {
    "id": "uuid",
    "title": "Blog Title",
    "excerpt": "Blog excerpt",
    "content": "Blog content",
    "date": "2024-01-01T00:00:00Z",
    "read_time": "5 min read",
    "category": "Technology",
    "author": "Author Name",
    "tags": ["tag1", "tag2"],
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Protected Endpoints (Admin Authentication Required)

#### POST /api/blogs
Create a new blog post.

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "title": "Blog Title",
  "excerpt": "Blog excerpt",
  "content": "Blog content",
  "read_time": "5 min read",
  "category": "Technology",
  "author": "Author Name",
  "tags": ["tag1", "tag2"]
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "New Blog Post",
    "excerpt": "This is a new blog post",
    "content": "Full content here...",
    "read_time": "5 min read",
    "category": "Technology",
    "author": "Admin User",
    "tags": ["tech", "blog"]
  }'
```

#### PUT /api/blogs/[id]
Update an existing blog post.

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "excerpt": "Updated excerpt"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/blogs/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated Blog Title",
    "excerpt": "Updated excerpt"
  }'
```

#### DELETE /api/blogs/[id]
Delete a blog post.

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/blogs/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Authentication

### Getting Admin Token
1. Login with admin credentials:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@pharbit.com",
    "password": "F#034180427932al"
  }'
```

2. Use the returned access token in the Authorization header for protected endpoints.

## File Structure

```
src/
├── app/api/
│   └── blogs/
│       ├── route.ts              # GET /api/blogs, POST /api/blogs
│       └── [id]/
│           └── route.ts          # GET /api/blogs/[id], PUT /api/blogs/[id], DELETE /api/blogs/[id]
├── services/
│   └── blog.service.ts           # Business logic for blog operations
├── utils/
│   └── auth.ts                   # Next.js authentication utilities
├── types/
│   ├── blog.types.ts             # TypeScript interfaces
│   └── database.types.ts         # Updated with blogs table
└── config/
    └── database.ts               # Supabase configuration

scripts/
├── setup-admin.js                # Admin user setup script
└── create-blogs-table.sql        # Database schema script
```

## Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
   - Run the SQL script in Supabase
   - Run the admin setup script: `node scripts/setup-admin.js`

3. Start the development server:
```bash
npm run dev
```

## Testing

### Manual API Testing
1. Start the development server: `npm run dev`
2. Use the admin setup script to create admin user
3. Login to get admin token
4. Test endpoints with curl or Postman

### Example Test Flow
```bash
# 1. Create admin user
node scripts/setup-admin.js

# 2. Login to get token (you'll need to implement this endpoint)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@pharbit.com",
    "password": "F#034180427932al"
  }'

# 3. Create a blog post
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Blog",
    "excerpt": "Test excerpt",
    "content": "Test content",
    "read_time": "5 min read",
    "category": "Test",
    "author": "Test Author",
    "tags": ["test"]
  }'

# 4. Get all blogs
curl http://localhost:3000/api/blogs

# 5. Get specific blog
curl http://localhost:3000/api/blogs/BLOG_ID_HERE
```

## Features

- ✅ Full CRUD operations for blog posts
- ✅ Admin-only write access with JWT authentication
- ✅ Public read access
- ✅ Pagination and filtering
- ✅ Search functionality
- ✅ Input validation
- ✅ TypeScript support
- ✅ Error handling
- ✅ Database triggers for updated_at
- ✅ Next.js API routes
- ✅ Supabase integration

## Security

- All write operations require admin authentication
- Input validation prevents malicious data
- JWT tokens for secure authentication
- Role-based authorization (ADMIN role required for write operations)

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## Response Format

All API responses follow this format:
```json
{
  "success": boolean,
  "message": "string (optional)",
  "data": "any (optional)",
  "error": "string (optional)"
}
```