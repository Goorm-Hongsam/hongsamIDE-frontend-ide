import axios from 'axios';

const defaultAxios = axios.create({
  baseURL: 'https://gateway.hong-sam.online',
});

defaultAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    console.log('axios token : ', token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default defaultAxios;
