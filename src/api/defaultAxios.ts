import axios from 'axios';

const defaultAxios = axios.create({
  baseURL: 'https://gateway.hong-sam.online',
  withCredentials: true,
});

defaultAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default defaultAxios;
