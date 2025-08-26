# Admin System Documentation

## Overview

This project includes a comprehensive admin system with role-based access control (RBAC) built on top of Supabase authentication.

## Features

- **Role-based Access Control**: Users can have `user`, `moderator`, or `admin` roles
- **Protected Admin Routes**: Admin-only pages and API endpoints
- **User Management**: Invite new users and manage roles
- **Secure Authentication**: JWT-based authentication with Supabase
- **Database Security**: Row Level Security (RLS) policies

## Setup

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_INVITE_SECRET=your_secret_key_for_admin_invites
```

### 2. Database Migration

Run the database migration to create the admin system:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL in supabase/migrations/20250826000000_create_admin_system.sql
```

### 3. Create First Admin User

Run the setup script to create your first admin user:

```bash
node scripts/setup-admin.js
```

This will create an admin user with:
- Email: `admin@pharbit.com` (or `ADMIN_EMAIL` env var)
- Password: `Admin123!` (or `ADMIN_PASSWORD` env var)

## Usage

### Admin Routes

- `/admin/login` - Admin login page
- `/admin` - Admin dashboard (protected)
- `/admin/users` - User management (coming soon)
- `/admin/content` - Content management (coming soon)
- `/admin/settings` - System settings (coming soon)

### API Endpoints

- Removed: `POST /api/admin/invite` (feature deprecated)

### Authentication Hook

The `useAuth` hook provides:

```typescript
const { user, loading, signIn, signOut, signUp } = useAuth()
```

- `user`: Current user object with role information
- `loading`: Authentication state loading
- `signIn(email, password)`: Sign in method
- `signOut()`: Sign out method
- `signUp(email, password)`: Sign up method

## Security Features

### Row Level Security (RLS)

- Users can only view their own profiles
- Admins can view all profiles
- Admin table is protected and only accessible by service role
- Profile updates are restricted to own profile

### Role Verification

- Admin layout automatically checks user role
- Unauthorized users are redirected to login
- API endpoints verify admin privileges

### Environment Variables

- Service role key is only used server-side
- Admin invite secret protects user invitation endpoint
- Sensitive keys are not exposed to client

## Database Schema

### Profiles Table

```sql
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

### Admins Table

```sql
admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  permissions JSONB DEFAULT '{}',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

## Development

### Adding New Admin Features

1. Create new admin pages in `src/app/admin/`
2. Use the `useAuth` hook for authentication
3. Add new API endpoints in `src/app/api/admin/`
4. Update database schema if needed
5. Add appropriate RLS policies

### Testing Admin Features

1. Start the development server: `npm run dev`
2. Navigate to `/admin/login`
3. Sign in with admin credentials
4. Test admin functionality

## Troubleshooting

### Common Issues

1. **"Admin user not found"**: Run the setup script again
2. **"Unauthorized"**: Check environment variables and database policies
3. **"Role not found"**: Verify the profiles table exists and has correct data

### Debug Mode

Enable debug logging by setting:

```bash
NODE_ENV=development
```

## Contributing

When adding new admin features:

1. Follow the existing code structure
2. Add appropriate TypeScript types
3. Include error handling
4. Add RLS policies for new tables
5. Update this documentation

## License

This admin system is part of the main project and follows the same license terms.
