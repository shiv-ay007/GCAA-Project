// Base API client configuration utilizing centralized Axios instance
import axiosInstance, { apiClient } from './axiosInstance';
import { API_BASE_URL } from './config';

export { axiosInstance, apiClient, API_BASE_URL };
export default axiosInstance;
