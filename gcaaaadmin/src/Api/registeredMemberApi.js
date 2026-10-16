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

// Registered Members API endpoints
export const fetchRegisteredMembers = async (params = {}) => {
  const response = await api.get('/registered-members', { params })
  return response.data
}

export const fetchMemberStats = async () => {
  const response = await api.get('/registered-members/stats')
  return response.data
}

export const createRegisteredMember = async (memberData) => {
  const response = await api.post('/registered-members', memberData)
  return response.data
}

export const updateRegisteredMember = async (id, memberData) => {
  const response = await api.put(`/registered-members/${id}`, memberData)
  return response.data
}

export const deleteRegisteredMember = async (id) => {
  const response = await api.delete(`/registered-members/${id}`)
  return response.data
}

export const fetchMemberById = async (id) => {
  const response = await api.get(`/registered-members/${id}`)
  return response.data
}
