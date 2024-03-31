import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer 40|SprYHJhJIYSidPZEuK0lbPLmDljbbphJJEGKQmat144618f7`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
