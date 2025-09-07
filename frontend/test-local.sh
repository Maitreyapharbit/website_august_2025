#!/bin/bash

# Local Test Server for Pharbit Frontend
# This script starts a local server to test the frontend

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Starting Local Test Server for Pharbit Frontend${NC}"
echo -e "${BLUE}================================================${NC}"

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo -e "${RED}❌ Python is not installed. Please install Python to run the local server.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Python found: $PYTHON_CMD${NC}"

# Check if frontend files exist
if [ ! -f "public/index.html" ]; then
    echo -e "${RED}❌ Frontend files not found in public/ directory${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend files found${NC}"

# Test API connectivity
echo -e "${BLUE}🔗 Testing API connectivity...${NC}"
if curl -s http://16.171.16.174:4000/health > /dev/null; then
    echo -e "${GREEN}✅ API is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  API might not be accessible (this is normal for testing)${NC}"
fi

# Start local server
echo -e "${BLUE}🚀 Starting local server on port 8000...${NC}"
echo -e "${GREEN}📱 Open your browser and navigate to: http://localhost:8000${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

cd public
$PYTHON_CMD -m http.server 8000