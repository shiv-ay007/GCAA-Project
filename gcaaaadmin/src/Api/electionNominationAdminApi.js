import axios from 'axios';

const isLocal =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const LOCAL_URL = 'http://localhost:5000/api';
const REMOTE_URL = import.meta.env.VITE_API_URL || 'https://gcaa-project.onrender.com/api';

const PRIMARY_BASE_URL = isLocal ? LOCAL_URL : REMOTE_URL;
const FALLBACK_BASE_URL = isLocal ? REMOTE_URL : LOCAL_URL;

export const adminApi = axios.create({
  baseURL: PRIMARY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Fallback client
export const localAdminApi = axios.create({
  baseURL: FALLBACK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Attach JWT token to both clients
const attachToken = (config) => {
  const token = localStorage.getItem('gcaaa_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

adminApi.interceptors.request.use(attachToken);
localAdminApi.interceptors.request.use(attachToken);

export const fetchElectionNominations = async (params = {}) => {
  try {
    const response = await adminApi.get('/election-nominations', { params });
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      const localRes = await localAdminApi.get('/election-nominations', { params });
      return localRes.data;
    }
    throw err;
  }
};

export const fetchNominationById = async (id) => {
  try {
    const response = await adminApi.get(`/election-nominations/${id}`);
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      const localRes = await localAdminApi.get(`/election-nominations/${id}`);
      return localRes.data;
    }
    throw err;
  }
};

export const updateNominationStatus = async (id, payload) => {
  try {
    const response = await adminApi.put(`/election-nominations/${id}`, payload);
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      const localRes = await localAdminApi.put(`/election-nominations/${id}`, payload);
      return localRes.data;
    }
    throw err;
  }
};

export const deleteNomination = async (id) => {
  try {
    const response = await adminApi.delete(`/election-nominations/${id}`);
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      const localRes = await localAdminApi.delete(`/election-nominations/${id}`);
      return localRes.data;
    }
    throw err;
  }
};
