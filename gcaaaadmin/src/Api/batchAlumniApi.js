import axios from 'axios';
import { API_BASE_URL } from './config';

const TOKEN_KEY = 'gcaaa_admin_token';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Attach JWT token automatically to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Batch Alumni (All Batches of GCAAA) API endpoints
export const fetchBatchAlumni = async (params = {}) => {
  const response = await api.get('/batch-alumni', { params });
  return response.data;
};

export const fetchBatchAlumniStats = async () => {
  const response = await api.get('/batch-alumni/stats');
  return response.data;
};

export const fetchBatchAlumnusById = async (id) => {
  const response = await api.get(`/batch-alumni/${id}`);
  return response.data;
};

export const createBatchAlumnus = async (data) => {
  const response = await api.post('/batch-alumni', data);
  return response.data;
};

export const updateBatchAlumnus = async (id, data) => {
  const response = await api.put(`/batch-alumni/${id}`, data);
  return response.data;
};

export const deleteBatchAlumnus = async (id) => {
  const response = await api.delete(`/batch-alumni/${id}`);
  return response.data;
};
