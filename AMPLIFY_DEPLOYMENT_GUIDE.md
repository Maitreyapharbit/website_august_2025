# AWS Amplify Deployment Guide for Pharbit

## ✅ API Routes Configured for AWS Amplify

Your API routes have been converted to Pages Router format for AWS Amplify serverless functions.

## 🔧 Environment Variables Setup

In your AWS Amplify Console, add these environment variables:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 API Structure (Pages Router)

```
pages/
├── api/
│   ├── blogs/
│   │   ├── index.js          # GET /api/blogs
│   │   └── [id].js           # GET /api/blogs/[id]
│   ├── contact/
│   │   └── index.js          # POST /api/contact
│   ├── company/
│   │   └── index.js          # GET /api/company
│   ├── timeline/
│   │   └── index.js          # GET /api/timeline
│   ├── test.js               # GET /api/test
│   └── health.js             # GET /api/health
```

## 🚀 Testing Your API Routes

After deployment, test these endpoints:

### 1. Health Check
```bash
curl https://main.d22x4oiromio4y.amplifyapp.com/api/health
```

### 2. Get Blogs (Public)
```bash
curl https://main.d22x4oiromio4y.amplifyapp.com/api/blogs
```

### 3. Get Company Info (Public)
```bash
curl https://main.d22x4oiromio4y.amplifyapp.com/api/company
```

### 4. Submit Contact Form (Public)
```bash
curl -X POST https://main.d22x4oiromio4y.amplifyapp.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

### 5. Get Timeline (Public)
```bash
curl https://main.d22x4oiromio4y.amplifyapp.com/api/timeline
```

## 🛠️ Key Features

### 1. **Public API Only**
- All endpoints are public and do not require authentication
- Simplified architecture focused on content delivery
- Optimized for static content and contact forms

### 2. **CORS Headers**
- All routes include CORS headers for cross-origin requests
- Handles preflight OPTIONS requests
- Compatible with Amplify's domain

### 3. **Serverless Function Compatibility**
- Each route exports a default async function
- Proper error handling for Lambda environment
- Optimized for cold starts

### 4. **Supabase Integration**
- Uses environment variables for configuration
- Public client for read operations
- Proper error handling for database operations

## 🔍 Troubleshooting

### If API routes don't work:

1. **Check Environment Variables**
   - Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in Amplify Console
   - Verify Supabase credentials are correct

2. **Check Build Logs**
   - Look for any build errors in Amplify Console
   - Ensure all dependencies are installed

3. **Test Database Connection**
   - Verify Supabase tables exist
   - Check RLS policies allow public access where needed

4. **Check CORS Issues**
   - Verify frontend domain is allowed
   - Check browser network tab for CORS errors

## 📋 Next Steps

1. **Deploy to Amplify** - Push your changes to trigger a new build
2. **Set Environment Variables** - Add required variables in Amplify Console
3. **Test All Endpoints** - Verify each API route works correctly
4. **Test Frontend Integration** - Ensure the frontend can communicate with the API

## 🎯 Expected Results

After deployment, you should be able to:
- ✅ View blogs through the public API
- ✅ Submit contact forms from the frontend
- ✅ Access company information
- ✅ View timeline data
- ✅ Access all public API endpoints

Your API routes are now fully compatible with AWS Amplify's serverless function deployment!