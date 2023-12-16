import axios from 'axios';

const questionAxios = axios.create({
  baseURL: 'https://hongsam-ide.s3.ap-northeast-2.amazonaws.com/admin/q2/Question.md',
  method: 'get',
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default questionAxios;
