import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});
const userData = JSON.parse(localStorage.getItem("userData"));
const authToken = userData.auth_token;
axiosClient.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
