# Blog API Setup Guide (Next.js)

## Overview
This implementation provides a public blog API for the Next.js application with Supabase integration. The API includes read-only operations for blog posts with public access using Next.js API routes.

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

## File Structure

```
pages/api/
├── blogs/
│   ├── index.js              # GET /api/blogs
│   └── [id]/
│       └── index.js          # GET /api/blogs/[id]
├── company/
│   └── index.js              # GET /api/company
├── contact/
│   └── index.js              # POST /api/contact
├── timeline/
│   └── index.js              # GET /api/timeline
├── test.js                   # GET /api/test
└── health.js                 # GET /api/health
```

## Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
   - Run the SQL script in Supabase

3. Start the development server:
```bash
npm run dev
```

## Testing

### Manual API Testing
1. Start the development server: `npm run dev`
2. Test endpoints with curl or Postman

### Example Test Flow
```bash
# 1. Get all blogs
curl http://localhost:3000/api/blogs

# 2. Get specific blog
curl http://localhost:3000/api/blogs/BLOG_ID_HERE

# 3. Get company info
curl http://localhost:3000/api/company

# 4. Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

## Features

- ✅ Public read access to blog posts
- ✅ Pagination and filtering for blogs
- ✅ Search functionality
- ✅ Contact form submission
- ✅ Company information retrieval
- ✅ Timeline data access
- ✅ Input validation
- ✅ TypeScript support
- ✅ Error handling
- ✅ Database triggers for updated_at
- ✅ Next.js API routes
- ✅ Supabase integration

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