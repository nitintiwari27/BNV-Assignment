import axios from "axios";

// import base url from .enve file 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Central Axios instance - all API calls use this
 * baseURL is proxied through Vite to avoid CORS during development
 */
const apiClient = axios.create({
  baseURL:  API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
