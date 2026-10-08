const BASE_URL = typeof DELCOM_BASEURL !== 'undefined' && DELCOM_BASEURL
  ? DELCOM_BASEURL
  : (import.meta.env.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1');

export function getAccessToken() {
  return localStorage.getItem('accessToken') || '';
}

export function putAccessToken(token) {
  if (token) localStorage.setItem('accessToken', token);
  else localStorage.removeItem('accessToken');
}

export async function apiFetch(endpoint, options = {}) {
  const token = getAccessToken();
  const headers = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    const text = await response.text();
    const result = text ? JSON.parse(text) : { status: response.ok ? 'success' : 'fail' };
    return result;
  } catch (error) {
    return { status: 'fail', error: true, message: error.message || 'Gagal terhubung ke server.' };
  }
}

export { BASE_URL };
