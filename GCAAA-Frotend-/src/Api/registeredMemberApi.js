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
 * Fetch registered members from backend database with search, pagination & cohort filters
 */
export const fetchRegisteredMembersFromApi = async (params = {}) => {
  const response = await apiClient.get('/registered-members', { params });
  return response.data;
};

/**
 * Fetch member summary counts and cohort stats
 */
export const fetchMemberStatsFromApi = async () => {
  const response = await apiClient.get('/registered-members/stats');
  return response.data;
};

/**
 * Submit alumni registration to backend database
 */
export const submitAlumniRegistration = async (formData) => {
  const response = await apiClient.post('/registered-members/register', formData);
  return response.data;
};
