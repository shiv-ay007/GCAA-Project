import axios from 'axios';
import { API_BASE_URL } from './config';

export const blogApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Fetch all published blogs from backend API
 * @param {object} params - { category, search, tag, page, limit }
 */
export const fetchBlogsFromApi = async (params = {}) => {
  const response = await blogApiClient.get('/blogs', { params });
  return response.data;
};

/**
 * Fetch a single blog by ID or slug
 * @param {string} idOrSlug
 */
export const fetchBlogByIdOrSlug = async (idOrSlug) => {
  const response = await blogApiClient.get(`/blogs/${idOrSlug}`);
  return response.data;
};
