import axios from 'axios'
import CONSTANTS from '../constants'
// import store from 'store'

const instance = axios.create({
  baseURL: CONSTANTS.CORE.PHP_SERVER
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
