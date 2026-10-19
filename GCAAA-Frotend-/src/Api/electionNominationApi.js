import axios from 'axios';
import { isLocal, LOCAL_URL, REMOTE_URL } from './config';

// Prioritize local server when running locally so newly added features work immediately
const PRIMARY_BASE_URL = isLocal ? LOCAL_URL : REMOTE_URL;
const FALLBACK_BASE_URL = isLocal ? REMOTE_URL : LOCAL_URL;

export const apiClient = axios.create({
  baseURL: PRIMARY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const fallbackClient = axios.create({
  baseURL: FALLBACK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

/**
 * Submit election nomination form to backend
 */
export const submitElectionNomination = async (nominationData) => {
  try {
    const response = await apiClient.post('/election-nominations', nominationData);
    return response.data;
  } catch (err) {
    console.warn(`Primary API (${PRIMARY_BASE_URL}) submission failed:`, err.message);
    // If primary returns 404 or network error, attempt fallback client
    if (err.response?.status === 404 || !err.response) {
      try {
        const fallbackRes = await fallbackClient.post('/election-nominations', nominationData);
        return fallbackRes.data;
      } catch (fallbackErr) {
        console.error('Fallback API submission also failed:', fallbackErr);
        // Throw the most informative error
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
 * Queries registered-members search which is 100% active on both live Render & local servers
 */
export const verifyMembershipNumber = async (membershipNo) => {
  if (!membershipNo || !membershipNo.trim()) {
    throw new Error('Membership number is required');
  }
  const cleanNo = membershipNo.trim().toUpperCase();

  // Try searching via standard search endpoint first (always exists on live server)
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
