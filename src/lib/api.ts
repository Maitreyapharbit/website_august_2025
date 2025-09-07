export class PharbitAPI {
  baseURL: string

  constructor(baseURL?: string) {
    this.baseURL = baseURL || (process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://16.171.16.174:4000/api')
  }

  private async request<T>(path: string): Promise<T> {
    const url = `${this.baseURL}${path}`
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } })
    if (!response.ok) {
      const text = await response.text().catch(() => '')
      throw new Error(`Request failed ${response.status} ${response.statusText}: ${text}`)
    }
    return response.json() as Promise<T>
  }

  async getHealth() {
    return this.request<{ status?: string; message?: string }>('/health')
  }

  async getContracts() {
    return this.request<{ contracts: Array<{ name: string; address: string }>; message?: string }>('/contracts')
  }

  async getNetwork() {
    return this.request<{ network: string; chainId?: string | number; message?: string }>('/network')
  }

  async getBatches() {
    return this.request<{ message?: string; batches: Array<{ id: string; productName?: string; manufacturer?: string; status?: string }> }>('/batches')
  }

  async getStakeholders() {
    return this.request<{ stakeholders: Array<{ id: string; name: string; type: string; address: string }> }>('/stakeholders')
  }

  async getSensorData() {
    return this.request<{ readings?: unknown[]; sensors?: unknown[] } | { data?: unknown[] }>('/sensor-data')
  }

  async trackSupplyChain(batchId: string) {
    return this.request<{ batchId: string; supplyChainStatus: { currentLocation?: string; status?: string } }>(`/supply-chain/${encodeURIComponent(batchId)}`)
  }
}

export const pharbitApi = new PharbitAPI()

