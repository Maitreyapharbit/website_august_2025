#!/bin/bash

# Pharbit Blockchain Frontend - Demo Deployment Script
# This script demonstrates what the deployment would look like

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Pharbit Blockchain Frontend - Demo Deployment${NC}"
echo -e "${BLUE}===============================================${NC}"

# Configuration
REGION="eu-north-1"
FRONTEND_DIR="public"
TIMESTAMP=$(date +%s)
BUCKET_NAME="pharbit-blockchain-frontend-${TIMESTAMP}"

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo -e "   Region: $REGION"
echo -e "   Bucket Name: $BUCKET_NAME"
echo -e "   Frontend Directory: $FRONTEND_DIR"
echo ""

# Check if frontend directory exists
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}❌ Frontend directory '$FRONTEND_DIR' not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend directory found${NC}"

# List files that would be uploaded
echo -e "${BLUE}📁 Files to be uploaded:${NC}"
find $FRONTEND_DIR -type f | while read file; do
    echo -e "   📄 $file"
done
echo ""

# Test API connectivity
echo -e "${BLUE}🔗 Testing API connectivity...${NC}"
if curl -s http://16.171.16.174:4000/health > /dev/null; then
    echo -e "${GREEN}✅ API is accessible${NC}"
    API_STATUS="✅ Connected"
else
    echo -e "${YELLOW}⚠️  API not accessible (this is normal for demo)${NC}"
    API_STATUS="⚠️  Not accessible"
fi

# Simulate deployment steps
echo -e "${BLUE}🔄 Simulating deployment steps...${NC}"
echo -e "${GREEN}✅ S3 bucket would be created: $BUCKET_NAME${NC}"
echo -e "${GREEN}✅ Files would be uploaded to S3${NC}"
echo -e "${GREEN}✅ Static website hosting would be configured${NC}"
echo -e "${GREEN}✅ Public access policy would be applied${NC}"
echo -e "${GREEN}✅ CORS would be configured${NC}"
echo ""

# Display what the final result would look like
WEBSITE_URL="http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"

echo -e "${GREEN}🎉 Demo Deployment Complete!${NC}"
echo -e "${GREEN}============================${NC}"
echo ""
echo -e "${BLUE}📋 What would be deployed:${NC}"
echo -e "   Bucket Name: $BUCKET_NAME"
echo -e "   Region: $REGION"
echo -e "   Website URL: $WEBSITE_URL"
echo -e "   API Status: $API_STATUS"
echo ""
echo -e "${BLUE}🔗 Features that would be live:${NC}"
echo -e "   ✅ Live blockchain API integration"
echo -e "   ✅ Real-time data from Sepolia testnet"
echo -e "   ✅ Smart contract addresses display"
echo -e "   ✅ Auto-refresh every 30 seconds"
echo -e "   ✅ Mobile-responsive design"
echo -e "   ✅ Error handling and retry logic"
echo -e "   ✅ Connection status indicators"
echo ""
echo -e "${BLUE}📱 Smart Contract Addresses (Sepolia):${NC}"
echo -e "   Governance: 0xC0Aa3e906C29427b6fF874812dccF5458356e141"
echo -e "   BatchContract: 0x657bF4fc377d77010F56e93FE26A82E79FA44473"
echo -e "   StakeholderContract: 0x92739707801c23A2678cC176fdCda5e43C578413"
echo -e "   SensorDataContract: 0x5FD48B4130f5a87F3D37E2B14f938B5Ea017038C"
echo -e "   SupplyChainContract: 0xeaA2dAE65F0ECA8b8453B654Ed5A25C1500ab4b2"
echo ""
echo -e "${BLUE}🧪 To test locally, run:${NC}"
echo -e "   ${GREEN}./test-local.sh${NC}"
echo ""
echo -e "${BLUE}🚀 To deploy to AWS S3 (when credentials are fixed):${NC}"
echo -e "   ${GREEN}./deploy.sh${NC}"
echo ""
echo -e "${YELLOW}⚠️  Note: AWS credentials need to be fixed for actual deployment${NC}"
echo -e "${YELLOW}   The provided credentials are returning SignatureDoesNotMatch errors${NC}"
echo ""

# Save demo info
cat > demo-deployment-info.txt << EOF
Pharbit Blockchain Frontend - Demo Deployment
============================================
Demo Date: $(date)
Bucket Name: $BUCKET_NAME
Region: $REGION
Website URL: $WEBSITE_URL
API Status: $API_STATUS

Smart Contract Addresses (Sepolia):
- Governance: 0xC0Aa3e906C29427b6fF874812dccF5458356e141
- BatchContract: 0x657bF4fc377d77010F56e93FE26A82E79FA44473
- StakeholderContract: 0x92739707801c23A2678cC176fdCda5e43C578413
- SensorDataContract: 0x5FD48B4130f5a87F3D37E2B14f938B5Ea017038C
- SupplyChainContract: 0xeaA2dAE65F0ECA8b8453B654Ed5A25C1500ab4b2

API Endpoints:
- Health: http://16.171.16.174:4000/health
- Network: http://16.171.16.174:4000/api/network
- Contracts: http://16.171.16.174:4000/api/contracts
- Batches: http://16.171.16.174:4000/api/batches
- Stakeholders: http://16.171.16.174:4000/api/stakeholders
- Sensor Data: http://16.171.16.174:4000/api/sensor-data
EOF

echo -e "${GREEN}📄 Demo information saved to demo-deployment-info.txt${NC}"
echo -e "${GREEN}🚀 Frontend is ready for deployment!${NC}"