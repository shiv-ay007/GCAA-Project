import axios from 'axios'
import { API_BASE_URL } from './config'

const TOKEN_KEY = 'gcaaa_admin_token'
const ADMIN_KEY = 'gcaaa_admin_user'

export const authApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Attach JWT token automatically to every request if present
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Intercept 401 unauthorized errors to clear token and redirect if needed
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't auto-redirect on failed login attempts
      if (!error.config.url.includes('/login')) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(ADMIN_KEY)
      }
    }
    return Promise.reject(error)
  }
)

export const adminAuth = {
  // Login
  login: async (email, password) => {
    const response = await authApi.post('/login', { email, password })
    if (response.data?.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token)
      localStorage.setItem(
        ADMIN_KEY,
        JSON.stringify(response.data.admin || {})
      )
    }
    return response.data
  },

  // Register a new admin
  register: async (adminData) => {
    const response = await authApi.post('/register', adminData)
    return response.data
  },

  // Fetch current admin profile from DB using JWT
  getMe: async () => {
    const response = await authApi.get('/me')
    if (response.data?.admin) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(response.data.admin))
    }
    return response.data
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await authApi.put('/profile', data)
    if (response.data?.admin) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(response.data.admin))
    }
    return response.data
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await authApi.put('/change-password', {
      currentPassword,
      newPassword,
    })
    return response.data
  },

  // Logout
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ADMIN_KEY)
  },

  // Helper getters
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getStoredAdmin: () => {
    try {
      const data = localStorage.getItem(ADMIN_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },
  isAuthenticated: () => Boolean(localStorage.getItem(TOKEN_KEY)),
}

export default adminAuth
