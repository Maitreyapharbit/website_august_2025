#!/bin/bash

# Pharbit Backend Deployment Script
# This script helps deploy the backend to various cloud platforms

set -e

echo "🚀 Pharbit Backend Deployment Script"
echo "======================================"

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm run build

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Platform-specific deployment instructions
echo ""
echo "🌐 Deployment Options:"
echo ""
echo "1. Railway:"
echo "   - Connect your GitHub repo to Railway"
echo "   - Set environment variables in Railway dashboard"
echo "   - Deploy automatically on push"
echo ""
echo "2. Render:"
echo "   - Connect your GitHub repo to Render"
echo "   - Build command: npm run build"
echo "   - Start command: npm start"
echo "   - Set environment variables in Render dashboard"
echo ""
echo "3. Heroku:"
echo "   - heroku create your-app-name"
echo "   - heroku config:set SUPABASE_URL=your_url"
echo "   - heroku config:set SUPABASE_ANON_KEY=your_key"
echo "   - heroku config:set SUPABASE_SERVICE_KEY=your_service_key"
echo "   - heroku config:set JWT_SECRET=your_secret"
echo "   - git push heroku main"
echo ""
echo "4. Docker:"
echo "   - docker build -t pharbit-backend ."
echo "   - docker run -p 3001:3001 --env-file .env pharbit-backend"
echo ""

echo "✅ Deployment preparation complete!"
echo "📝 Don't forget to set your environment variables on your chosen platform"