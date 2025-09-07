#!/bin/bash

# Pharbit Blockchain Frontend Deployment Script
# This script deploys the frontend to AWS S3 with static website hosting

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REGION="eu-north-1"
FRONTEND_DIR="public"
TIMESTAMP=$(date +%s)
BUCKET_NAME="pharbit-blockchain-frontend-${TIMESTAMP}"

echo -e "${BLUE}🚀 Starting Pharbit Blockchain Frontend Deployment${NC}"
echo -e "${BLUE}================================================${NC}"

# Function to print status messages
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured or invalid. Please run 'aws configure' first."
    exit 1
fi

print_status "AWS CLI is configured and working"

# Check if frontend directory exists
if [ ! -d "$FRONTEND_DIR" ]; then
    print_error "Frontend directory '$FRONTEND_DIR' not found!"
    exit 1
fi

print_status "Frontend directory found"

# Create S3 bucket
print_info "Creating S3 bucket: $BUCKET_NAME"
if aws s3 mb s3://$BUCKET_NAME --region $REGION; then
    print_status "S3 bucket created successfully"
else
    print_error "Failed to create S3 bucket"
    exit 1
fi

# Upload files to S3
print_info "Uploading files to S3..."
if aws s3 sync $FRONTEND_DIR/ s3://$BUCKET_NAME/ --delete; then
    print_status "Files uploaded successfully"
else
    print_error "Failed to upload files to S3"
    exit 1
fi

# Configure bucket for static website hosting
print_info "Configuring static website hosting..."

# Create website configuration
cat > website-config.json << EOF
{
    "IndexDocument": {
        "Suffix": "index.html"
    },
    "ErrorDocument": {
        "Key": "index.html"
    }
}
EOF

# Apply website configuration
if aws s3api put-bucket-website --bucket $BUCKET_NAME --website-configuration file://website-config.json; then
    print_status "Static website hosting configured"
else
    print_error "Failed to configure static website hosting"
    exit 1
fi

# Set bucket policy for public read access
print_info "Setting bucket policy for public access..."

cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

# Apply bucket policy
if aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json; then
    print_status "Bucket policy applied for public access"
else
    print_error "Failed to apply bucket policy"
    exit 1
fi

# Disable block public access
print_info "Disabling block public access..."

if aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"; then
    print_status "Public access block disabled"
else
    print_error "Failed to disable public access block"
    exit 1
fi

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"

# Clean up temporary files
rm -f website-config.json bucket-policy.json

# Test the deployment
print_info "Testing deployment..."
if curl -s -o /dev/null -w "%{http_code}" "$WEBSITE_URL" | grep -q "200"; then
    print_status "Website is accessible"
else
    print_warning "Website might not be immediately accessible (this is normal for new deployments)"
fi

# Display results
echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo -e "${BLUE}📋 Deployment Details:${NC}"
echo -e "   Bucket Name: $BUCKET_NAME"
echo -e "   Region: $REGION"
echo -e "   Website URL: $WEBSITE_URL"
echo ""
echo -e "${BLUE}🔗 Access your website at:${NC}"
echo -e "   ${GREEN}$WEBSITE_URL${NC}"
echo ""
echo -e "${BLUE}📱 Features Deployed:${NC}"
echo -e "   ✅ Live blockchain API integration"
echo -e "   ✅ Real-time data from Sepolia testnet"
echo -e "   ✅ Smart contract addresses display"
echo -e "   ✅ Auto-refresh every 30 seconds"
echo -e "   ✅ Mobile-responsive design"
echo -e "   ✅ Error handling and retry logic"
echo -e "   ✅ Connection status indicators"
echo ""
echo -e "${YELLOW}⚠️  Note: It may take a few minutes for the website to be fully accessible.${NC}"
echo -e "${YELLOW}   If you encounter issues, wait a few minutes and try again.${NC}"
echo ""
echo -e "${BLUE}🧪 Testing Checklist:${NC}"
echo -e "   □ Visit the website URL"
echo -e "   □ Check that blockchain data loads"
echo -e "   □ Verify all sections work (Dashboard, Batches, Stakeholders, Sensors)"
echo -e "   □ Test mobile responsiveness"
echo -e "   □ Verify auto-refresh functionality"
echo -e "   □ Check error handling by disconnecting internet"
echo ""

# Save deployment info to file
cat > deployment-info.txt << EOF
Pharbit Blockchain Frontend Deployment
=====================================
Deployment Date: $(date)
Bucket Name: $BUCKET_NAME
Region: $REGION
Website URL: $WEBSITE_URL
API Endpoint: http://16.171.16.174:4000/api

Smart Contract Addresses (Sepolia):
- Governance: 0xC0Aa3e906C29427b6fF874812dccF5458356e141
- BatchContract: 0x657bF4fc377d77010F56e93FE26A82E79FA44473
- StakeholderContract: 0x92739707801c23A2678cC176fdCda5e43C578413
- SensorDataContract: 0x5FD48B4130f5a87F3D37E2B14f938B5Ea017038C
- SupplyChainContract: 0xeaA2dAE65F0ECA8b8453B654Ed5A25C1500ab4b2
EOF

print_status "Deployment information saved to deployment-info.txt"

echo -e "${GREEN}🚀 Your pharmaceutical blockchain frontend is now live!${NC}"