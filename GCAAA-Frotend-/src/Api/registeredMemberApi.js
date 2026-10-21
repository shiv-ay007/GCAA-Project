import axiosInstance from './axiosInstance';

/**
 * Fetch registered members from backend database with search, pagination & cohort filters
 */
export const fetchRegisteredMembersFromApi = async (params = {}) => {
  const response = await axiosInstance.get('/registered-members', { params });
  return response.data;
};

/**
 * Fetch member summary counts and cohort stats
 */
export const fetchMemberStatsFromApi = async () => {
  const response = await axiosInstance.get('/registered-members/stats');
  return response.data;
};

/**
 * Submit alumni registration to backend database
 */
export const submitAlumniRegistration = async (formData) => {
  const response = await axiosInstance.post('/registered-members/register', formData);
  return response.data;
};

export const apiClient = axiosInstance;
export default axiosInstance;
