export const isLocal =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname.endsWith('.local'));
  //  console.log(isLocal)

export const LOCAL_URL = 'http://localhost:5000/api';
export const REMOTE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'https://api.gcaalumniassociation.com/api';

// On localhost / 127.0.0.1, always connect to local backend (port 5000).
// On production domains (gcaalumniassociation.com), connect to remote API.
export const API_BASE_URL = isLocal ? LOCAL_URL : REMOTE_URL;
