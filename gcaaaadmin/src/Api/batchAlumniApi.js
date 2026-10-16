import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Batch Alumni (All Batches of GCAAA) API endpoints
export const fetchBatchAlumni = async (params = {}) => {
  const response = await api.get('/batch-alumni', { params })
  return response.data
}

export const fetchBatchAlumniStats = async () => {
  const response = await api.get('/batch-alumni/stats')
  return response.data
}

export const fetchBatchAlumnusById = async (id) => {
  const response = await api.get(`/batch-alumni/${id}`)
  return response.data
}

export const createBatchAlumnus = async (data) => {
  const response = await api.post('/batch-alumni', data)
  return response.data
}

export const updateBatchAlumnus = async (id, data) => {
  const response = await api.put(`/batch-alumni/${id}`, data)
  return response.data
}

export const deleteBatchAlumnus = async (id) => {
  const response = await api.delete(`/batch-alumni/${id}`)
  return response.data
}
