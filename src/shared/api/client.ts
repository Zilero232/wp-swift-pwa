import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: '/wp-json/swift-pwa/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add nonce to requests
apiClient.interceptors.request.use((config) => {
  const nonce = (window as any).wpApiSettings?.nonce;

  if (nonce) {
    config.headers['X-WP-Nonce'] = nonce;
  }

  return config;
});

export default apiClient;
