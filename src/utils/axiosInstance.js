import axios from 'axios';
import { store } from '../Redux/store';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_HTTP_IP_ADDRESS_URL}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // const token = useSelector((state) => state.auth.token); // Redux cannot used outside react component.
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
