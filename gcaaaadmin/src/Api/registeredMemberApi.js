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

// Registered Members API endpoints
export const fetchRegisteredMembers = async (params = {}) => {
  const response = await api.get('/registered-members', { params });
  return response.data;
};

export const fetchMemberStats = async () => {
  const response = await api.get('/registered-members/stats');
  return response.data;
};

export const createRegisteredMember = async (memberData) => {
  const response = await api.post('/registered-members', memberData);
  return response.data;
};

export const updateRegisteredMember = async (id, memberData) => {
  const response = await api.put(`/registered-members/${id}`, memberData);
  return response.data;
};

export const deleteRegisteredMember = async (id) => {
  const response = await api.delete(`/registered-members/${id}`);
  return response.data;
};

export const fetchMemberById = async (id) => {
  const response = await api.get(`/registered-members/${id}`);
  return response.data;
};
