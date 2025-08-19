# Pharbit API Documentation

## Base URL
```
Production: https://main.d22x4oiromio4y.amplifyapp.com
Development: http://localhost:3000
```

## Authentication

### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@pharbit.com",
  "password": "F#0341804279321"
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

### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "valid": true,
    "user": {
      "userId": "uuid",
      "email": "admin@pharbit.com",
      "role": "ADMIN"
    }
  }
}
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

### Create Blog (Admin Only)
```http
POST /api/blogs
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "New Blog Post",
  "excerpt": "Blog excerpt",
  "content": "Full blog content",
  "image_url": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": "uuid",
    "title": "New Blog Post",
    "excerpt": "Blog excerpt",
    "content": "Full blog content",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Update Blog (Admin Only)
```http
PUT /api/blogs/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Blog Title",
  "excerpt": "Updated excerpt"
}
```

### Delete Blog (Admin Only)
```http
DELETE /api/blogs/{id}
Authorization: Bearer <access_token>
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

### Update Company Info (Admin Only)
```http
PUT /api/company
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Pharbit GmbH",
  "description": "Updated description",
  "email": "contact@pharbit.com",
  "phone": "+4917697711873",
  "address": "New address"
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

### Get All Contacts (Admin Only)
```http
GET /api/contact?page=1&limit=10
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "data": {
    "contacts": [
      {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "message": "Contact message",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### Delete Contact (Admin Only)
```http
DELETE /api/contact/{id}
Authorization: Bearer <access_token>
```

## Health Check

### System Health
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Pharbit API is running",
  "timestamp": "2024-01-01T00:00:00Z",
  "uptime": 12345,
  "environment": "production",
  "version": "1.0.0",
  "services": {
    "database": "configured",
    "api": "healthy"
  },
  "config": {
    "supabaseConfigured": true,
    "jwtConfigured": true,
    "missingEnvVars": []
  }
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
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Environment Variables

Required environment variables for deployment:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT Configuration
JWT_ACCESS_SECRET=your_super_secret_jwt_key

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

# Admin login
curl -X POST https://main.d22x4oiromio4y.amplifyapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pharbit.com","password":"F#0341804279321"}'

# Submit contact form
curl -X POST https://main.d22x4oiromio4y.amplifyapp.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

### Automated Testing
```bash
# Run the API test script
node scripts/test-api.js
```

## Security Features

- **JWT Authentication**: Secure token-based authentication for admin operations
- **CORS Protection**: Proper CORS headers for cross-origin requests
- **Input Validation**: All inputs are validated and sanitized
- **SQL Injection Prevention**: Using Supabase's built-in protection
- **Rate Limiting**: Built-in protection against abuse
- **Environment Variable Validation**: Proper configuration checking

## AWS Amplify Deployment

This API is optimized for AWS Amplify serverless deployment:

- ✅ Pages Router format for serverless functions
- ✅ Proper CORS headers for cross-origin requests
- ✅ Environment variable handling
- ✅ Cold start optimization
- ✅ Error handling for Lambda environment
- ✅ Default function exports for Amplify compatibility

## Database Setup

1. **Run the SQL script** in your Supabase SQL Editor:
   ```sql
   -- Copy and paste the contents of scripts/setup-database.sql
   ```

2. **Create admin user**:
   ```bash
   node scripts/setup-admin-production.js
   ```

3. **Test the API**:
   ```bash
   node scripts/test-api.js
   ```

Your API is now ready for production use!