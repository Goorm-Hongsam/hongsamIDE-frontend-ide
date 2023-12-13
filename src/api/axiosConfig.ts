import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default instance;
