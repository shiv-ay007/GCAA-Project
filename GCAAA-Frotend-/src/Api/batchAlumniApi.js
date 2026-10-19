import axios from 'axios';
import { API_BASE_URL } from './config';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Fetch batch alumni records for All Batches of GCAAA
 */
export const fetchBatchAlumniFromApi = async (params = {}) => {
  const response = await apiClient.get('/batch-alumni', { params });
  return response.data;
};

/**
 * Fetch batch alumni statistics
 */
export const fetchBatchAlumniStatsFromApi = async () => {
  const response = await apiClient.get('/batch-alumni/stats');
  return response.data;
};
