export interface NetworkConfig {
  baseURL?: string
  timeout?: number
  headers?: {}
}

const networkConfig: NetworkConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_BASE_API,
  timeout: 1000000,
  headers: {
    'source-type': 'local',
    'Content-Type': 'application/json'
  }
}

export default networkConfig
