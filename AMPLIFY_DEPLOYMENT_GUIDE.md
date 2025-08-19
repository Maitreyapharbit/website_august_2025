# AWS Amplify Deployment Guide for Pharbit

## ✅ API Routes Fixed for AWS Amplify

Your API routes have been converted from App Router format to Pages Router format, which is required for AWS Amplify serverless functions.

## 🔧 Environment Variables Setup

In your AWS Amplify Console, add these environment variables:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
JWT_SECRET=your_super_secret_jwt_key_here
```

## 📁 New API Structure (Pages Router)

```
pages/
├── api/
│   ├── auth/
│   │   ├── login.js          # POST /api/auth/login
│   │   ├── logout.js         # POST /api/auth/logout
│   │   ├── verify.js         # GET /api/auth/verify
│   │   └── profile.js        # GET /api/auth/profile
│   ├── blogs/
│   │   ├── index.js          # GET/POST /api/blogs
│   │   └── [id].js           # GET/PUT/DELETE /api/blogs/[id]
│   ├── contact/
│   │   ├── index.js          # GET/POST /api/contact
│   │   └── [id].js           # DELETE /api/contact/[id]
│   ├── analytics/
│   │   └── dashboard/
│   │       └── stats.js      # GET /api/analytics/dashboard/stats
│   ├── timeline/
│   │   └── index.js          # GET /api/timeline
│   ├── company.js            # GET/PUT /api/company
│   └── health.js             # GET /api/health
```

## 🚀 Testing Your API Routes

After deployment, test these endpoints:

### 1. Health Check
```bash
curl https://main.d22x4oiromio4y.amplifyapp.com/api/health
```

### 2. Admin Login
```bash
curl -X POST https://main.d22x4oiromio4y.amplifyapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pharbit.com","password":"F#0341804279321"}'
```

### 3. Get Blogs (Public)
```bash
curl https://main.d22x4oiromio4y.amplifyapp.com/api/blogs
```

### 4. Get Company Info (Public)
```bash
curl https://main.d22x4oiromio4y.amplifyapp.com/api/company
```

### 5. Submit Contact Form (Public)
```bash
curl -X POST https://main.d22x4oiromio4y.amplifyapp.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

## 🔐 Admin Setup

Run this command to create the admin user in your Supabase database:

```bash
npm run setup:admin:amplify
```

This creates:
- Email: `admin@pharbit.com`
- Password: `F#0341804279321`

## 🛠️ Key Changes Made

### 1. **Moved from App Router to Pages Router**
- Converted `src/app/api/` routes to `pages/api/`
- Changed from named exports to default function exports
- Updated to work with AWS Lambda serverless functions

### 2. **Added Proper CORS Headers**
- All routes now include CORS headers for cross-origin requests
- Handles preflight OPTIONS requests
- Compatible with Amplify's domain

### 3. **Serverless Function Compatibility**
- Each route exports a default async function
- Proper error handling for Lambda environment
- Optimized for cold starts

### 4. **Authentication Integration**
- JWT token verification in protected routes
- Proper error responses for unauthorized access
- Admin-only endpoints secured

### 5. **Supabase Integration**
- Uses environment variables for configuration
- Separate admin client for write operations
- Proper error handling for database operations

## 🔍 Troubleshooting

### If API routes still don't work:

1. **Check Environment Variables**
   - Ensure all variables are set in Amplify Console
   - Verify Supabase credentials are correct

2. **Check Build Logs**
   - Look for any build errors in Amplify Console
   - Ensure all dependencies are installed

3. **Test Database Connection**
   - Verify Supabase tables exist
   - Run the admin setup script

4. **Check CORS Issues**
   - Verify frontend domain is allowed
   - Check browser network tab for CORS errors

## 📋 Next Steps

1. **Deploy to Amplify** - Push your changes to trigger a new build
2. **Set Environment Variables** - Add all required variables in Amplify Console
3. **Run Admin Setup** - Create the admin user using the script
4. **Test All Endpoints** - Verify each API route works correctly
5. **Test Frontend Integration** - Ensure the frontend can communicate with the API

## 🎯 Expected Results

After deployment, you should be able to:
- ✅ Login to admin panel at `/admin/login`
- ✅ View and manage blogs through the admin interface
- ✅ Submit contact forms from the frontend
- ✅ Access all public API endpoints
- ✅ Perform all CRUD operations with proper authentication

Your API routes are now fully compatible with AWS Amplify's serverless function deployment!