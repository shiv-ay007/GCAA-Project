import axios from 'axios';
import axiosInstance from './axiosInstance';
import { isLocal, LOCAL_URL, REMOTE_URL } from './config';

export const apiClient = axiosInstance;

// Optional fallback client for high-availability
export const fallbackClient = axios.create({
  baseURL: isLocal ? REMOTE_URL : LOCAL_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * Submit election nomination form to backend
 */
export const submitElectionNomination = async (nominationData) => {
  try {
    const response = await apiClient.post('/election-nominations', nominationData);
    return response.data;
  } catch (err) {
    console.warn(`Primary API submission failed:`, err.message);
    // If primary returns 404 or network error, attempt fallback client
    if (err.response?.status === 404 || !err.response) {
      try {
        const fallbackRes = await fallbackClient.post('/election-nominations', nominationData);
        return fallbackRes.data;
      } catch (fallbackErr) {
        console.error('Fallback API submission also failed:', fallbackErr);
        throw fallbackErr.response?.data?.message ? fallbackErr : err;
      }
    }
    throw err;
  }
};

/**
 * Fetch all election nominations
 */
export const fetchElectionNominations = async (params = {}) => {
  const response = await apiClient.get('/election-nominations', { params });
  return response.data;
};

/**
 * Fetch nomination by reference id
 */
export const fetchNominationById = async (id) => {
  const response = await apiClient.get(`/election-nominations/${id}`);
  return response.data;
};

/**
 * Verify if membership number exists in database
 */
export const verifyMembershipNumber = async (membershipNo) => {
  if (!membershipNo || !membershipNo.trim()) {
    throw new Error('Membership number is required');
  }
  const cleanNo = membershipNo.trim().toUpperCase();

  // Try searching via standard search endpoint first
  try {
    const response = await apiClient.get(
      `/registered-members?search=${encodeURIComponent(cleanNo)}&limit=15`
    );
    const members = response.data?.data || [];
    const matched = members.find(
      (m) => String(m.membershipNo || '').trim().toUpperCase() === cleanNo
    );

    if (matched) {
      return {
        success: true,
        exists: true,
        data: matched,
      };
    }
  } catch {
    // continue to fallback
  }

  // Fallback 1: Try dedicated verify endpoint on active client
  try {
    const response2 = await apiClient.get(
      `/registered-members/verify/${encodeURIComponent(cleanNo)}`
    );
    if (response2.data?.exists && response2.data?.data) {
      return response2.data;
    }
  } catch {
    // continue
  }

  // Fallback 2: Try fallback client search if primary client didn't match
  try {
    const response3 = await fallbackClient.get(
      `/registered-members?search=${encodeURIComponent(cleanNo)}&limit=15`
    );
    const members = response3.data?.data || [];
    const matched = members.find(
      (m) => String(m.membershipNo || '').trim().toUpperCase() === cleanNo
    );

    if (matched) {
      return {
        success: true,
        exists: true,
        data: matched,
      };
    }
  } catch {
    // continue
  }

  throw new Error(`Membership No. '${cleanNo}' was not found in registered members database.`);
};
