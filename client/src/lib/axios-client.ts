// lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Add a request interceptor to attach the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token"); // Or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  async (error) => {
    const { data, status } = error.response;

    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }
    Promise.reject({
      ...data,
    });
  }
);

export default axiosInstance;
