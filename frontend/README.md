# Pharbit Blockchain Frontend

A modern, responsive frontend application for monitoring pharmaceutical supply chain data using blockchain technology.

## Features

- 🔗 **Live Blockchain Integration**: Real-time data from Ethereum Sepolia testnet
- 📊 **Interactive Dashboard**: Comprehensive overview of pharmaceutical batches, stakeholders, and sensor data
- 🌡️ **IoT Sensor Monitoring**: Real-time temperature and humidity tracking
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🔄 **Auto-refresh**: Automatic data updates every 30 seconds
- ⚡ **Error Handling**: Robust retry logic and connection status indicators
- 🎨 **Modern UI**: Professional pharmaceutical industry design

## Smart Contracts (Sepolia Testnet)

- **Governance**: `0xC0Aa3e906C29427b6fF874812dccF5458356e141`
- **BatchContract**: `0x657bF4fc377d77010F56e93FE26A82E79FA44473`
- **StakeholderContract**: `0x92739707801c23A2678cC176fdCda5e43C578413`
- **SensorDataContract**: `0x5FD48B4130f5a87F3D37E2B14f938B5Ea017038C`
- **SupplyChainContract**: `0xeaA2dAE65F0ECA8b8453B654Ed5A25C1500ab4b2`

## API Endpoints

The frontend connects to the live blockchain API at `http://16.171.16.174:4000/api`:

- `GET /health` - API health check
- `GET /network` - Network information
- `GET /contracts` - Smart contract addresses
- `GET /batches` - Pharmaceutical batches data
- `GET /stakeholders` - Registered stakeholders
- `GET /sensor-data` - IoT sensor readings

## Quick Start

### Local Development

1. **Clone and navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Start a local server** (using Python, Node.js, or any static server):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server public -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open your browser** and navigate to `http://localhost:8000`

### Production Deployment

1. **Configure AWS CLI** (if not already done):
   ```bash
   aws configure
   # Enter your AWS Access Key ID, Secret Access Key, and Region (eu-north-1)
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

3. **Access your deployed website** at the URL provided by the script

## File Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   ├── app.js             # JavaScript application logic
│   └── style.css          # CSS styles
├── .env.local             # Local development environment variables
├── .env.production        # Production environment variables
├── deploy.sh              # AWS S3 deployment script
└── README.md              # This file
```

## Environment Configuration

### Local Development (.env.local)
- Debug mode enabled
- Console logging enabled
- Shorter timeouts for faster development

### Production (.env.production)
- Debug mode disabled
- Optimized performance settings
- Enhanced security configurations
- Error reporting enabled

## Features Overview

### Dashboard
- Network status and connection indicators
- Smart contract addresses display
- Quick statistics overview
- Real-time blockchain data

### Batches
- Live pharmaceutical batch tracking
- Status indicators (Manufactured, In Transit, Delivered)
- Product and manufacturer information
- Auto-refresh functionality

### Stakeholders
- Registered manufacturer and distributor information
- Blockchain addresses
- Stakeholder type classification

### Sensors
- Real-time IoT sensor data
- Temperature and humidity monitoring
- Last update timestamps
- Sensor status indicators

## Error Handling

The application includes comprehensive error handling:

- **Connection Status**: Visual indicators for API connectivity
- **Retry Logic**: Automatic retry with exponential backoff
- **Offline Detection**: Handles network disconnections gracefully
- **User Feedback**: Clear error messages and retry options
- **Fallback Data**: Shows hardcoded contract addresses when API is unavailable

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Features

- **Lazy Loading**: Data loaded only when sections are viewed
- **Caching**: API responses cached for improved performance
- **Debouncing**: Prevents excessive API calls
- **Auto-refresh**: Configurable refresh intervals
- **Responsive Design**: Optimized for all screen sizes

## Security

- **CORS Handling**: Proper cross-origin request configuration
- **Content Security Policy**: Prevents XSS attacks
- **HTTPS Ready**: Secure communication in production
- **Input Validation**: Client-side data validation

## Monitoring

- **Connection Status**: Real-time API connectivity monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Load time and response monitoring
- **User Analytics**: Usage tracking (when enabled)

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if the backend API is running at `http://16.171.16.174:4000`
   - Verify network connectivity
   - Check browser console for CORS errors

2. **Deployment Issues**
   - Ensure AWS CLI is properly configured
   - Check AWS credentials and permissions
   - Verify S3 bucket creation permissions

3. **Data Not Loading**
   - Check browser network tab for failed requests
   - Verify API endpoints are accessible
   - Check for JavaScript errors in console

### Support

For technical support or issues:
1. Check the browser console for error messages
2. Verify API connectivity
3. Review the deployment logs
4. Check AWS S3 bucket permissions

## License

© 2025 Pharbit. All rights reserved.

---

**Built with ❤️ for pharmaceutical supply chain transparency and patient safety.**