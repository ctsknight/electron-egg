import axios from 'axios';
import { ElMessage } from 'element-plus';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VITE_APP_API_URL, // api 的 base_url
  timeout: 1000000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.status !== 200) {
      // 非200的错误属于业务错误，留给具体页面处理
      return Promise.reject(res);
    } else {
      return Promise.resolve(res);
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    ElMessage({
      message: '登录连接超时（后台不能连接，请联系系统管理员）',
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
