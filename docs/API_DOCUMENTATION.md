# Pharbit API Documentation

## Base URL
```
Production: https://main.d22x4oiromio4y.amplifyapp.com
Development: http://localhost:3000
```

## Blog Management

### Get All Blogs (Public)
```http
GET /api/blogs?page=1&limit=10&category=Technology&search=blockchain
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `category` (optional): Filter by category
- `author` (optional): Filter by author
- `search` (optional): Search in title, excerpt, and content

**Response:**
```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": {
    "blogs": [
      {
        "id": "uuid",
        "title": "Blog Title",
        "excerpt": "Blog excerpt",
        "content": "Full blog content",
        "image_url": "https://example.com/image.jpg",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

### Get Single Blog (Public)
```http
GET /api/blogs/{id}
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
    "content": "Full blog content",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

## Company Management

### Get Company Info (Public)
```http
GET /api/company
```

**Response:**
```json
{
  "success": true,
  "message": "Company information retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "Pharbit",
    "description": "Global pharmaceutical technology company...",
    "email": "info@pharbit.com",
    "phone": "+4917697711873",
    "address": "An Europakanal 6, 91056 Erlangen, Germany"
  }
}
```

## Contact Management

### Submit Contact Form (Public)
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your pharmaceutical blockchain solutions."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully. We will get back to you within 24 hours.",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in your pharmaceutical blockchain solutions.",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

## Timeline Data

### Get Timeline (Public)
```http
GET /api/timeline
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "date": "August 2025",
      "title": "Development Begins",
      "description": "Initial blockchain development and smart contract creation",
      "status": "current",
      "progress": 25
    }
  ],
  "total": 4
}
```

## Health Check

### System Health
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Error Responses

All API endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Environment Variables

Required environment variables for deployment:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# Next.js Public Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_BACKEND_API_URL=https://your-amplify-domain.amplifyapp.com
```

## Testing

### Quick Test Commands

```bash
# Health check
curl https://main.d22x4oiromio4y.amplifyapp.com/api/health

# Get blogs
curl https://main.d22x4oiromio4y.amplifyapp.com/api/blogs

# Get company info
curl https://main.d22x4oiromio4y.amplifyapp.com/api/company

# Submit contact form
curl -X POST https://main.d22x4oiromio4y.amplifyapp.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'

# Get timeline
curl https://main.d22x4oiromio4y.amplifyapp.com/api/timeline
```

## AWS Amplify Deployment

This API is optimized for AWS Amplify serverless deployment:

- ✅ Pages Router format for serverless functions
- ✅ Proper CORS headers for cross-origin requests
- ✅ Environment variable handling
- ✅ Cold start optimization
- ✅ Error handling for Lambda environment
- ✅ Default function exports for Amplify compatibility
- ✅ Public-only endpoints for simplified architecture

## Database Setup

1. **Run the SQL script** in your Supabase SQL Editor:
   ```sql
   -- Copy and paste the contents from the migration files
   ```

2. **Test the API**:
   ```bash
   curl http://localhost:3000/api/health
   ```

Your public API is now ready for production use!