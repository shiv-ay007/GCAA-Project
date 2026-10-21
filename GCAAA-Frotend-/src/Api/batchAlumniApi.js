import axiosInstance from './axiosInstance';

/**
 * Fetch batch alumni records for All Batches of GCAAA
 */
export const fetchBatchAlumniFromApi = async (params = {}) => {
  const response = await axiosInstance.get('/batch-alumni', { params });
  return response.data;
};

/**
 * Fetch batch alumni statistics
 */
export const fetchBatchAlumniStatsFromApi = async () => {
  const response = await axiosInstance.get('/batch-alumni/stats');
  return response.data;
};

export const apiClient = axiosInstance;
export default axiosInstance;
