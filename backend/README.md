# Pharbit Backend API

A production-ready Node.js Express API for the Pharbit pharmaceutical supply chain management platform.

## Features

- **Authentication**: JWT-based admin authentication
- **Blog Management**: Full CRUD operations for blog posts
- **Company Management**: Company information management
- **Contact Management**: Contact form submissions
- **Security**: Rate limiting, input validation, CORS protection
- **Database**: Supabase PostgreSQL integration
- **Logging**: Winston-based logging system
- **Validation**: Express-validator for input validation
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

### 3. Database Setup

Run the database schema script in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of scripts/setup-database.sql
```

### 4. Create Admin User

```bash
npm run setup:admin
```

This creates an admin user with:
- Email: `admin@pharbit.com`
- Password: `F#0341804279321`

### 5. Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout  
- `GET /api/auth/verify` - Verify JWT token

### Blogs (Public read, Admin write)

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get single blog post
- `POST /api/blogs` - Create blog post (admin only)
- `PUT /api/blogs/:id` - Update blog post (admin only)
- `DELETE /api/blogs/:id` - Delete blog post (admin only)

### Company Information

- `GET /api/company` - Get company details
- `PUT /api/company` - Update company details (admin only)

### Contact Management

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (admin only)
- `DELETE /api/contact/:id` - Delete contact (admin only)

### Health Check

- `GET /health` - Server health status

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Render

1. Connect your GitHub repository to Render
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Configure environment variables

### Heroku

1. Create Heroku app: `heroku create your-app-name`
2. Set environment variables: `heroku config:set SUPABASE_URL=...`
3. Deploy: `git push heroku main`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_KEY` | Supabase service role key | Yes |
| `JWT_SECRET` | Secret for JWT token signing | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | No |

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All inputs validated and sanitized
- **XSS Protection**: Content sanitization with xss library
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for Express
- **JWT Authentication**: Secure token-based authentication

## Testing

```bash
# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pharbit.com","password":"F#0341804279321"}'

# Test blog creation (with token)
curl -X POST http://localhost:3001/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Blog","content":"Test content","excerpt":"Test excerpt"}'

# Test public endpoints
curl http://localhost:3001/api/blogs
curl http://localhost:3001/api/company
curl http://localhost:3001/health
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   └── server.ts        # Main server file
├── scripts/             # Setup scripts
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT License - see LICENSE file for details.