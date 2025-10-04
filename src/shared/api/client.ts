import axios from 'axios';

const {
  swiftPwaSettings: { apiUrl, nonce },
} = window;

// Create axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add nonce to requests
apiClient.interceptors.request.use((config) => {
  if (nonce) {
    config.headers['X-WP-Nonce'] = nonce;
  }

  return config;
});

export default apiClient;
