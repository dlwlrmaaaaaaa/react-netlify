import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use(
  (config) => {
    const auth_token = localStorage.getItem("ACCESS_TOKEN"); 
    if (auth_token) {
      config.headers.Authorization = `Bearer ${auth_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {response} = error;
    if(response.status === 401){
      localStorage.removeItem("ACCESS_TOKEN");
    }
    throw error;
  }
)

export default axiosClient;

