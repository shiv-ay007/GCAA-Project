import axios from 'axios';
import { API_BASE_URL } from './config';

/**
 * Centralized Axios client for GCAA Frontend
 * Base URL: https://api.gcaalumniassociation.com/api (or local dev server)
 */
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request Interceptor: Attach auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standardize error messages
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected network error occurred';
    
    // Attach user-friendly message to error object
    error.friendlyMessage = errorMsg;
    return Promise.reject(error);
  }
);

// Alias for backwards compatibility
export const apiClient = axiosInstance;
export default axiosInstance;
