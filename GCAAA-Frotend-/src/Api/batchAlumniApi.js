import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
