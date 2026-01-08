import axios from "axios";
import i18n from "../i18n/index";
// Create Axios instance
const api = axios.create({
  baseURL: "https://furniture-e-commerce-pddm.onrender.com", // change this to your backend base URL
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const lang = i18n.language || "ar";
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    config.params = {
      ...(config.params || {}),
      lang: lang, // e.g., "en" or "ar"
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response Interceptor for handling 401 or refresh token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized — maybe token expired");
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
