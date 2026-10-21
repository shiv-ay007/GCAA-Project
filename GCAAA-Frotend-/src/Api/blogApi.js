import axiosInstance from './axiosInstance';

/**
 * Fetch all published blogs from backend API
 * @param {object} params - { category, search, tag, page, limit }
 */
export const fetchBlogsFromApi = async (params = {}) => {
  const response = await axiosInstance.get('/blogs', { params });
  return response.data;
};

/**
 * Fetch a single blog by ID or slug
 * @param {string} idOrSlug
 */
export const fetchBlogByIdOrSlug = async (idOrSlug) => {
  const response = await axiosInstance.get(`/blogs/${idOrSlug}`);
  return response.data;
};

export const blogApiClient = axiosInstance;
export default axiosInstance;
