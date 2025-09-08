# Pharbit Blockchain - Architecture and Runbook

## Overview
Pharbit is a pharmaceutical supply chain platform built on Ethereum (Sepolia testnet) with an API layer that exposes blockchain data to the frontend. It tracks batches, stakeholders, and IoT sensor data, providing an auditable chain of custody.

- Network: Sepolia Testnet (Chain ID: 11155111)
- Backend API: `http://16.171.16.174:4000/api`
- Frontend (static): S3-hosted or local static server

## Smart Contracts (Sepolia)
The system uses five contracts deployed on Sepolia. These addresses are already live:

- Governance: `0xC0Aa3e906C29427b6fF874812dccF5458356e141`
- BatchContract: `0x657bF4fc377d77010F56e93FE26A82E79FA44473`
- StakeholderContract: `0x92739707801c23A2678cC176fdCda5e43C578413`
- SensorDataContract: `0x5FD48B4130f5a87F3D37E2B14f938B5Ea017038C`
- SupplyChainContract: `0xeaA2dAE65F0ECA8b8453B654Ed5A25C1500ab4b2`

### Contract Responsibilities
- Governance: Administrative controls, upgrade paths, roles.
- BatchContract: Registers pharmaceutical batches (id, productName, manufacturer, status).
- StakeholderContract: Manages manufacturers, distributors, and other actors.
- SensorDataContract: Stores/links off-chain IoT sensor readings (temperature, humidity, etc.).
- SupplyChainContract: Tracks supply chain state transitions for a batch (e.g., Manufactured → In Transit → Delivered).

## High-Level Architecture

- Frontend (static):
  - Fetches data from Backend API.
  - Shows live batches, stakeholders, sensor readings, and network status.

- Backend API (Node/Express):
  - Connects to Sepolia via a provider (e.g., Infura/Alchemy/RPC node).
  - Reads data from deployed contracts and normalizes responses.
  - Endpoints:
    - `GET /health` (non-API root)
    - `GET /api/network`
    - `GET /api/contracts`
    - `GET /api/batches`
    - `GET /api/stakeholders`
    - `GET /api/sensor-data`
    - `GET /api/supply-chain/:batchId`

- Ethereum (Sepolia):
  - Contracts persist data and events.

## Data Flow
1. User opens frontend → frontend calls Backend API.
2. Backend API queries Sepolia contracts via an RPC provider.
3. Backend responds with JSON tailored for the UI.

## Running the System

### Prerequisites
- Node.js 18+
- npm or yarn
- (For local chain) Foundry (anvil) or Hardhat
- AWS CLI (for S3 deployment), if deploying static site

### A) Run Against LIVE Sepolia Backend (Recommended)
The backend API is already live. You can run only the frontend locally:

1) Start local static server for the standalone frontend:
```bash
cd frontend
./test-local.sh
# Open http://localhost:8000
```
The frontend will call `http://16.171.16.174:4000/api` by default.

2) Verify API:
```bash
curl http://16.171.16.174:4000/health
curl http://16.171.16.174:4000/api/network
```

### B) Deploy Frontend to S3 (Static Hosting)
1) Ensure AWS credentials are valid (Region: eu-north-1):
```bash
aws configure
```
2) Deploy:
```bash
cd frontend
./deploy.sh
```
3) Open the S3 website URL printed at the end of the script.

### C) Full Local Development (Local Chain + Local Backend + Frontend)
This option is for developers who want to simulate Sepolia locally.

1) Start a local Ethereum node (choose one):
- Foundry (recommended):
```bash
anvil --block-time 2
```
- Hardhat:
```bash
npx hardhat node
```

2) Deploy contracts locally (pseudocode, adjust to your contracts repo):
```bash
# Example using Hardhat
npx hardhat run scripts/deploy.ts --network localhost
# Capture deployed addresses and export them as env vars for the backend
```

3) Start Backend API pointing to local chain:
Set environment variables (example):
```bash
export RPC_URL=http://127.0.0.1:8545
export CHAIN_ID=31337
export GOVERNANCE_CONTRACT=0x... # from local deploy
export BATCH_CONTRACT=0x...
export STAKEHOLDER_CONTRACT=0x...
export SENSOR_DATA_CONTRACT=0x...
export SUPPLY_CHAIN_CONTRACT=0x...

# Then start the backend service (example)
# node server.js or npm run dev (depending on backend codebase)
```
The backend should expose the same endpoints locally (e.g., `http://localhost:4000/api`).

4) Point the frontend to local API (optional):
- Edit `frontend/public/app.js` to set `apiBaseUrl` to your local API, or
- Use a simple reverse proxy (e.g., `http-server` proxy) to avoid editing code.

5) Start the static frontend locally:
```bash
cd frontend
./test-local.sh
```

## Environment Variables
Typical backend variables (actual file names may differ):
- `RPC_URL` – Ethereum RPC endpoint (Sepolia or local anvil/hardhat)
- `CHAIN_ID` – Network chain id
- `{CONTRACT}_CONTRACT` – Deployed addresses for each contract

Frontend (static) uses a fixed API base URL in `app.js`. For custom deployments, adjust `apiBaseUrl` or serve via a reverse proxy.

## Operational Runbook

### Health Checks
- API: `GET http://<api-host>:4000/health`
- Network: `GET /api/network`

### Common Issues
- CORS: Ensure S3/static hosting allows requests to the API domain.
- Wrong addresses: Verify contract addresses match the target network.
- RPC issues: Check provider availability and rate limits.

### Logs & Monitoring
- Backend should log RPC errors and contract call failures.
- Frontend shows connection status and error modals to end users.

## Security Notes
- Use HTTPS for production endpoints when possible.
- Restrict API keys (if using third-party RPC providers).
- Validate and sanitize any user-supplied data before writing on-chain.

## Verification Checklist
- API `/health` returns OK.
- `/api/network` shows `name: sepolia`, `chainId: 11155111` (for live).
- Frontend shows batches, stakeholders, and sensors without errors.
- Contract addresses on UI match the intended environment.

---

For questions or maintenance, start with:
- API connectivity (health endpoint)
- RPC provider status
- Contract addresses and ABI alignment
- Frontend console/network logs