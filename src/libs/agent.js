import axios from 'axios'
// import store from 'store'

const instance = axios.create({
  baseURL: process.env.PHP_SERVER || 'http://localhost:8008'
});

instance.interceptors.request.use(function (config) {
//   config.headers['Authorization'] = store.get('token', '');
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default instance;
