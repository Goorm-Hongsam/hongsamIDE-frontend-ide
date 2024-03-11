import axios from 'axios';

const defaultAxios = axios.create({
  baseURL: 'https://gateway.hong-sam.online',
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default defaultAxios;
