# 🚀 Supabase Admin Authentication System Setup

## Overview

This guide will walk you through setting up a complete admin authentication system for your Next.js application using Supabase.

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Supabase project created
- Your Supabase credentials ready

## 🛠️ Step-by-Step Setup

### 1. Environment Configuration

Your `.env.local` file is already configured with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://aowimurfdqzwqifhcuuk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_INVITE_SECRET=your_super_secret_admin_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

**Important:** Change the `ADMIN_INVITE_SECRET` to a secure random string!

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `@supabase/supabase-js` - Supabase client
- `@supabase/auth-helpers-nextjs` - Next.js auth helpers
- `dotenv` - Environment variable management

### 3. Database Setup

#### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (replace with your project ref)
supabase link --project-ref aowimurfdqzwqifhcuuk

# Push the database migration
supabase db push
```

#### Option B: Manual SQL Execution

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor**
4. Copy the contents of `supabase/migrations/20250826000000_create_admin_system.sql`
5. Paste and execute the SQL

### 4. Create First Admin User

Run the setup script to create your first admin user:

```bash
npm run setup-admin
```

This will:
- Create a super admin user
- Set up the database profile
- Create admin records
- Display login credentials

**Default credentials:**
- Email: `admin@pharbit.com`
- Password: `Admin123!`

### 5. Start Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`

### 6. Test the Admin System

1. Visit `http://localhost:3000/admin/login`
2. Sign in with the admin credentials
3. You'll be redirected to the admin dashboard at `/admin`
4. Test the navigation and different tabs

## 🔐 Authentication Flow

1. **Login Page** (`/admin/login`)
   - User enters email/password
   - Credentials validated against Supabase
   - Role checked in profiles table
   - JWT token created and stored

2. **Route Protection**
   - Middleware checks authentication on all `/admin/*` routes
   - Redirects to login if not authenticated
   - Verifies admin role before allowing access

3. **Admin Dashboard** (`/admin`)
   - Protected by AdminLayout component
   - Shows user info and navigation
   - Tabbed interface for different admin functions

## 🏗️ System Architecture

### File Structure
```
├── components/
│   ├── AdminLayout.js      # Admin layout wrapper
│   └── LoginForm.js        # Login form component
├── lib/
│   ├── supabase.js         # Supabase client config
│   └── auth.js             # Authentication utilities
├── pages/
│   ├── admin/
│   │   ├── login.js        # Admin login page
│   │   └── index.js        # Admin dashboard
│   └── api/admin/
│       ├── invite.js        # User invitation API
│       └── auth.js          # Auth validation API
├── middleware.js            # Route protection
└── supabase/
    └── migrations/          # Database schema
```

### Database Schema
- **profiles** - User roles and information
- **admins** - Admin-specific data and permissions
- **admin_audit_log** - Admin action tracking

### Security Features
- Row Level Security (RLS) policies
- JWT token authentication
- Role-based access control
- Protected API endpoints
- Middleware route protection

## 🎯 API Endpoints

### Admin Invite API
```bash
POST /api/admin/invite
Headers: x-admin-invite-secret: YOUR_SECRET
Body: { "email": "user@example.com", "role": "admin" }
```

### Auth Validation API
```bash
GET /api/admin/auth
Headers: Authorization: Bearer JWT_TOKEN
```

## 🚨 Troubleshooting

### Common Issues

1. **"Missing script: dev"**
   - Ensure you're in the correct directory
   - Check that package.json exists and has scripts

2. **"Supabase connection failed"**
   - Verify environment variables are correct
   - Check Supabase project status
   - Ensure service role key has correct permissions

3. **"Admin user not found"**
   - Run `npm run setup-admin` again
   - Check database migration was successful
   - Verify profiles table exists

4. **"Unauthorized access"**
   - Check middleware configuration
   - Verify user has admin role in database
   - Check JWT token expiration

### Debug Mode

Enable detailed logging by setting:
```bash
NODE_ENV=development
```

### Database Verification

Check if tables exist:
```sql
-- In Supabase SQL Editor
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'admins', 'admin_audit_log');
```

## 🔧 Customization

### Adding New Admin Features

1. **Create new admin pages** in `pages/admin/`
2. **Use AdminLayout** for consistent styling
3. **Add new API endpoints** in `pages/api/admin/`
4. **Update database schema** if needed
5. **Add RLS policies** for new tables

### Styling Changes

- All styling uses Tailwind CSS
- Dark theme colors defined in components
- Responsive design built-in
- Easy to customize with Tailwind classes

### Role Management

- **user** - Basic access
- **admin** - Full admin privileges
- **super_admin** - All permissions + user management

## 📚 Next Steps

After successful setup:

1. **Customize the admin dashboard** for your needs
2. **Add user management features**
3. **Implement content management**
4. **Add audit logging** for admin actions
5. **Set up email notifications**
6. **Add two-factor authentication**

## 🆘 Support

If you encounter issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure database migration completed successfully
4. Check Supabase project logs
5. Verify network connectivity

## 🎉 Success Criteria

You'll know the system is working when:

✅ `npm run dev` starts without errors  
✅ You can visit `/admin/login`  
✅ Admin login works with created credentials  
✅ You're redirected to `/admin` dashboard  
✅ All admin routes are protected  
✅ Clean, professional admin interface displays  

---

**Happy Admin-ing! 🚀**
