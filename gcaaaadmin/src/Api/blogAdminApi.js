import axios from 'axios';
import { API_BASE_URL } from './config';

const TOKEN_KEY = 'gcaaa_admin_token';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

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

export const fetchAdminBlogs = async () => {
  const response = await api.get('/blogs/admin/all');
  return response.data;
};

export const fetchBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await api.post('/blogs', blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blogs/${id}`, blogData);
  return response.data;
};

export const toggleBlogStatus = async (id) => {
  const response = await api.patch(`/blogs/${id}/status`);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};
