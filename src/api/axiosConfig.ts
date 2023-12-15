import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://rz2ypu9b3m.execute-api.ap-northeast-2.amazonaws.com',
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default axiosConfig;
