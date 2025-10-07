/**
 * API Configuration and Utilities
 * Centralized API configuration for the frontend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
  
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
  ME: `${API_BASE_URL}/api/auth/me`,
  REFRESH: `${API_BASE_URL}/api/auth/refresh`,
  
  // Admin endpoints (protected)
  CONTACTS: `${API_BASE_URL}/api/contacts`,
  CONTACT_BY_ID: (id: string | number) => `${API_BASE_URL}/api/contacts/${id}`,
  CONTACT_STATUS: (id: string | number) => `${API_BASE_URL}/api/contacts/${id}/status`,
};
export const defaultFetchOptions: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * API helper for making authenticated requests
 */
export const apiClient = {
  /**
   * GET request
   */
  get: async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...defaultFetchOptions,
      ...options,
      method: 'GET',
    });
    return handleResponse(response);
  },

  /**
   * POST request
   */
  post: async (url: string, data?: any, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...defaultFetchOptions,
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse(response);
  },

  /**
   * PATCH request
   */
  patch: async (url: string, data?: any, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...defaultFetchOptions,
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse(response);
  },

  /**
   * DELETE request
   */
  delete: async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...defaultFetchOptions,
      ...options,
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

/**
 * Handle API response
 */
async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }

  return data;
}

export const getAuthToken = (): string | null => {
  // Token is in HTTP-only cookie, but also check localStorage as fallback
  return localStorage.getItem('adminToken');
};

/**
 * Set auth token in localStorage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

/**
 * Remove auth token
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('adminToken');
};

export default API_ENDPOINTS;
