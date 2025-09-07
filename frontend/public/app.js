// Pharbit Blockchain Frontend Application
class PharbitApp {
    constructor() {
        this.apiBaseUrl = 'http://16.171.16.174:4000/api';
        this.refreshInterval = null;
        this.isConnected = false;
        this.retryCount = 0;
        this.maxRetries = 3;
        
        // Smart contract addresses (Sepolia testnet)
        this.contracts = {
            governance: '0xC0Aa3e906C29427b6fF874812dccF5458356e141',
            batchContract: '0x657bF4fc377d77010F56e93FE26A82E79FA44473',
            stakeholderContract: '0x92739707801c23A2678cC176fdCda5e43C578413',
            sensorDataContract: '0x5FD48B4130f5a87F3D37E2B14f938B5Ea017038C',
            supplyChainContract: '0xeaA2dAE65F0ECA8b8453B654Ed5A25C1500ab4b2'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.startAutoRefresh();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.getAttribute('href').substring(1));
            });
        });
        
        // Refresh button
        document.getElementById('refreshBatches').addEventListener('click', () => {
            this.loadBatches();
        });
        
        // Auto-refresh toggle
        document.getElementById('autoRefresh').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startAutoRefresh();
            } else {
                this.stopAutoRefresh();
            }
        });
        
        // Retry button
        document.getElementById('retryButton').addEventListener('click', () => {
            this.hideErrorModal();
            this.retryConnection();
        });
    }
    
    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        // Load section-specific data
        switch(sectionId) {
            case 'batches':
                this.loadBatches();
                break;
            case 'stakeholders':
                this.loadStakeholders();
                break;
            case 'sensors':
                this.loadSensorData();
                break;
        }
    }
    
    async loadInitialData() {
        this.showLoadingOverlay();
        
        try {
            await Promise.all([
                this.loadNetworkInfo(),
                this.loadContracts(),
                this.loadBatches(),
                this.loadStakeholders(),
                this.loadSensorData()
            ]);
            
            this.updateConnectionStatus(true);
            this.retryCount = 0;
        } catch (error) {
            console.error('Failed to load initial data:', error);
            this.updateConnectionStatus(false);
            this.showErrorModal('Failed to connect to blockchain API. Please check your connection and try again.');
        } finally {
            this.hideLoadingOverlay();
        }
    }
    
    async makeApiRequest(endpoint) {
        const url = `${this.apiBaseUrl}${endpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    }
    
    async loadNetworkInfo() {
        try {
            const data = await this.makeApiRequest('/network');
            document.getElementById('networkName').textContent = data.network || 'Sepolia Testnet';
            document.getElementById('chainId').textContent = data.chainId || '11155111';
            document.getElementById('networkStatus').textContent = 'Connected';
            document.getElementById('networkStatus').className = 'info-value status-connected';
        } catch (error) {
            console.error('Failed to load network info:', error);
            document.getElementById('networkName').textContent = 'Unknown';
            document.getElementById('chainId').textContent = 'Unknown';
            document.getElementById('networkStatus').textContent = 'Disconnected';
            document.getElementById('networkStatus').className = 'info-value';
        }
    }
    
    async loadContracts() {
        try {
            const data = await this.makeApiRequest('/contracts');
            const contractsGrid = document.getElementById('contractsGrid');
            
            if (data.contracts && data.contracts.length > 0) {
                contractsGrid.innerHTML = data.contracts.map(contract => `
                    <div class="contract-item">
                        <div class="contract-name">${contract.name}</div>
                        <div class="contract-address">${contract.address}</div>
                    </div>
                `).join('');
            } else {
                // Fallback to hardcoded contracts
                contractsGrid.innerHTML = Object.entries(this.contracts).map(([name, address]) => `
                    <div class="contract-item">
                        <div class="contract-name">${name.charAt(0).toUpperCase() + name.slice(1)}</div>
                        <div class="contract-address">${address}</div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Failed to load contracts:', error);
            // Show hardcoded contracts as fallback
            const contractsGrid = document.getElementById('contractsGrid');
            contractsGrid.innerHTML = Object.entries(this.contracts).map(([name, address]) => `
                <div class="contract-item">
                    <div class="contract-name">${name.charAt(0).toUpperCase() + name.slice(1)}</div>
                    <div class="contract-address">${address}</div>
                </div>
            `).join('');
        }
    }
    
    async loadBatches() {
        try {
            const data = await this.makeApiRequest('/batches');
            const batchesGrid = document.getElementById('batchesGrid');
            
            if (data.batches && data.batches.length > 0) {
                batchesGrid.innerHTML = data.batches.map(batch => `
                    <div class="batch-card">
                        <div class="batch-header">
                            <div class="batch-id">${batch.id}</div>
                            <div class="batch-status ${this.getStatusClass(batch.status)}">${batch.status || 'Unknown'}</div>
                        </div>
                        <div class="batch-details">
                            <div class="batch-detail">
                                <span class="batch-detail-label">Product:</span>
                                <span class="batch-detail-value">${batch.productName || 'N/A'}</span>
                            </div>
                            <div class="batch-detail">
                                <span class="batch-detail-label">Manufacturer:</span>
                                <span class="batch-detail-value">${batch.manufacturer || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                document.getElementById('totalBatches').textContent = data.batches.length;
            } else {
                batchesGrid.innerHTML = '<div class="loading">No batches found</div>';
                document.getElementById('totalBatches').textContent = '0';
            }
        } catch (error) {
            console.error('Failed to load batches:', error);
            document.getElementById('batchesGrid').innerHTML = '<div class="loading">Failed to load batches</div>';
        }
    }
    
    async loadStakeholders() {
        try {
            const data = await this.makeApiRequest('/stakeholders');
            const stakeholdersGrid = document.getElementById('stakeholdersGrid');
            
            if (data.stakeholders && data.stakeholders.length > 0) {
                stakeholdersGrid.innerHTML = data.stakeholders.map(stakeholder => `
                    <div class="stakeholder-card">
                        <div class="stakeholder-name">${stakeholder.name}</div>
                        <div class="stakeholder-type">${stakeholder.type}</div>
                        <div class="stakeholder-address">${stakeholder.address}</div>
                    </div>
                `).join('');
                
                document.getElementById('totalStakeholders').textContent = data.stakeholders.length;
            } else {
                stakeholdersGrid.innerHTML = '<div class="loading">No stakeholders found</div>';
                document.getElementById('totalStakeholders').textContent = '0';
            }
        } catch (error) {
            console.error('Failed to load stakeholders:', error);
            document.getElementById('stakeholdersGrid').innerHTML = '<div class="loading">Failed to load stakeholders</div>';
        }
    }
    
    async loadSensorData() {
        try {
            const data = await this.makeApiRequest('/sensor-data');
            const sensorsGrid = document.getElementById('sensorsGrid');
            
            // Handle different response formats
            let sensorData = [];
            if (data.readings) {
                sensorData = data.readings;
            } else if (data.sensors) {
                sensorData = data.sensors;
            } else if (data.data) {
                sensorData = data.data;
            }
            
            if (sensorData && sensorData.length > 0) {
                sensorsGrid.innerHTML = sensorData.map((sensor, index) => `
                    <div class="sensor-card">
                        <div class="sensor-id">Sensor ${index + 1}</div>
                        <div class="sensor-data">
                            <div class="sensor-reading">
                                <span class="sensor-label">Temperature:</span>
                                <span class="sensor-value">${sensor.temperature || 'N/A'}°C</span>
                            </div>
                            <div class="sensor-reading">
                                <span class="sensor-label">Humidity:</span>
                                <span class="sensor-value">${sensor.humidity || 'N/A'}%</span>
                            </div>
                            <div class="sensor-reading">
                                <span class="sensor-label">Last Update:</span>
                                <span class="sensor-value">${new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                document.getElementById('activeSensors').textContent = sensorData.length;
            } else {
                sensorsGrid.innerHTML = '<div class="loading">No sensor data available</div>';
                document.getElementById('activeSensors').textContent = '0';
            }
        } catch (error) {
            console.error('Failed to load sensor data:', error);
            document.getElementById('sensorsGrid').innerHTML = '<div class="loading">Failed to load sensor data</div>';
        }
    }
    
    getStatusClass(status) {
        if (!status) return '';
        
        const statusLower = status.toLowerCase();
        if (statusLower.includes('transit')) return 'in-transit';
        if (statusLower.includes('manufactured') || statusLower.includes('produced')) return 'manufactured';
        if (statusLower.includes('delivered') || statusLower.includes('completed')) return 'delivered';
        return '';
    }
    
    updateConnectionStatus(connected) {
        this.isConnected = connected;
        const statusIndicator = document.getElementById('connectionStatus');
        const statusText = document.getElementById('connectionText');
        
        if (connected) {
            statusIndicator.className = 'status-indicator connected';
            statusText.textContent = 'Connected';
        } else {
            statusIndicator.className = 'status-indicator';
            statusText.textContent = 'Disconnected';
        }
    }
    
    startAutoRefresh() {
        this.stopAutoRefresh();
        this.refreshInterval = setInterval(() => {
            if (this.isConnected) {
                this.loadBatches();
            }
        }, 30000); // 30 seconds
    }
    
    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }
    
    showLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.add('active');
    }
    
    hideLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.remove('active');
    }
    
    showErrorModal(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorModal').classList.add('active');
    }
    
    hideErrorModal() {
        document.getElementById('errorModal').classList.remove('active');
    }
    
    async retryConnection() {
        this.retryCount++;
        
        if (this.retryCount <= this.maxRetries) {
            this.updateConnectionStatus(false);
            document.getElementById('connectionText').textContent = `Retrying... (${this.retryCount}/${this.maxRetries})`;
            
            try {
                await this.loadInitialData();
            } catch (error) {
                if (this.retryCount >= this.maxRetries) {
                    this.showErrorModal('Maximum retry attempts reached. Please check your connection and try again later.');
                } else {
                    setTimeout(() => this.retryConnection(), 2000);
                }
            }
        }
    }
    
    // Health check method
    async checkHealth() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/health`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pharbitApp = new PharbitApp();
});

// Handle offline/online events
window.addEventListener('online', () => {
    if (window.pharbitApp) {
        window.pharbitApp.retryConnection();
    }
});

window.addEventListener('offline', () => {
    if (window.pharbitApp) {
        window.pharbitApp.updateConnectionStatus(false);
        window.pharbitApp.showErrorModal('You are currently offline. Please check your internet connection.');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (window.pharbitApp) {
        if (document.hidden) {
            window.pharbitApp.stopAutoRefresh();
        } else {
            if (document.getElementById('autoRefresh').checked) {
                window.pharbitApp.startAutoRefresh();
            }
        }
    }
});