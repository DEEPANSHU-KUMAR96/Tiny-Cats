import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// Automatically inject JWT token from localStorage into headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('tiny_cats_auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
