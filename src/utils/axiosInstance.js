import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_HTTP_IP_ADDRESS_URL}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
