# Admin Authentication System Setup Instructions

This guide will help you set up the complete Supabase Admin Authentication System for your Next.js application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Make sure your `.env.local` file contains the correct Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://aowimurfdqzwqifhcuuk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2ltdXJmZHF6d3FpZmhjdXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNDE2MTksImV4cCI6MjA3MDgxNzYxOX0.3wpCViQnItTeveumSylPqFtPJKso9QfPDxsX-44Icm0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2ltdXJmZHF6d3FpZmhjdXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImiYXQiOjE3NTUyNDE2MTksImV4cCI6MjA3MDgxNzYxOX0.udpmLjnuAuEPnM5kyPR1lPur7nZhx4NRe_svz4eoZdc
ADMIN_INVITE_SECRET=your_super_secret_admin_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Database Setup

#### Option A: Using Supabase CLI (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref aowimurfdqzwqifhcuuk

# Run the migration
supabase db push
```

#### Option B: Manual Setup
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/20250826000000_create_admin_system.sql`
4. Execute the SQL

### 4. Create First Admin User
```bash
npm run setup-admin
```

This will create a super admin user with:
- Email: `admin@pharbit.com`
- Password: `Admin123!`

### 5. Start Development Server
```bash
npm run dev
```

### 6. Access Admin Panel
- Visit: `http://localhost:3000/admin/login`
- Sign in with the credentials from step 4
- Access the dashboard at: `http://localhost:3000/admin`

## 📁 File Structure

```
├── components/
│   ├── AdminLayout.js      # Admin layout with sidebar
│   └── LoginForm.js        # Admin login form
├── lib/
│   ├── auth.js            # Authentication service
│   └── supabase.js        # Supabase client configuration
├── pages/
│   ├── admin/
│   │   ├── index.js       # Admin dashboard
│   │   └── login.js       # Admin login page
│   └── api/
│       └── admin/
│           ├── auth.js    # Auth validation endpoint
│           └── invite.js  # Admin invite endpoint
├── scripts/
│   └── setup-admin.js     # Admin user creation script
├── supabase/
│   └── migrations/
│       └── 20250826000000_create_admin_system.sql
├── middleware.js          # Route protection
├── .env.local            # Environment variables
└── package.json
```

## 🔐 Authentication Flow

1. **Admin Login**: User visits `/admin/login`
2. **Credentials**: Enters email/password
3. **Validation**: Supabase validates credentials
4. **Role Check**: System checks if user has admin role
5. **Session**: Creates authenticated session
6. **Redirect**: Redirects to `/admin` dashboard
7. **Protection**: All admin routes protected by middleware

## 🛡️ Security Features

- **Route Protection**: Middleware protects all `/admin/*` routes
- **Role-Based Access**: Only users with `admin` or `super_admin` roles can access
- **JWT Tokens**: Secure token-based authentication
- **Row Level Security**: Database-level security policies
- **Environment Variables**: Secure credential management

## 📊 Admin Dashboard Features

- **Dashboard Tab**: Overview with statistics and recent activity
- **Users Tab**: User management (placeholder)
- **Content Tab**: Content management (placeholder)
- **Settings Tab**: System settings (placeholder)
- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Professional dark UI

## 🔧 API Endpoints

### `/api/admin/auth`
- **Method**: GET
- **Purpose**: Validate admin JWT token
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User info and permissions

### Admin invite (removed)

## 🚨 Troubleshooting

### Common Issues

1. **"Access denied" error**
   - Ensure user has admin role in database
   - Check if profile exists in `profiles` table

2. **"Invalid token" error**
   - Clear browser cookies/localStorage
   - Check if session is expired

3. **Database connection errors**
   - Verify Supabase credentials in `.env.local`
   - Check if database migration was applied

4. **Setup script fails**
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is correct
   - Check if admin user already exists

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

## 🔄 Customization

### Adding New Admin Features
1. Create new components in `components/`
2. Add new pages in `pages/admin/`
3. Update navigation in `AdminLayout.js`
4. Add new API endpoints in `pages/api/admin/`

### Styling
- Uses Tailwind CSS for styling
- Dark theme with professional look
- Responsive design
- Customizable via Tailwind classes

### Database Schema
- `profiles` table: User roles and basic info
- `admins` table: Admin-specific data
- `admin_audit_log` table: Action tracking

## 📝 Next Steps

1. **Customize Dashboard**: Add your specific admin features
2. **User Management**: Implement user CRUD operations
3. **Content Management**: Add content editing capabilities
4. **Audit Logging**: Implement action tracking
5. **Email Notifications**: Add email alerts for admin actions
6. **Two-Factor Auth**: Enhance security with 2FA

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure database migration was applied successfully
4. Check browser console for JavaScript errors
5. Review server logs for API errors

## 📄 License

This admin system is part of your Next.js application and follows the same license terms.
