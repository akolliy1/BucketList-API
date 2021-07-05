import axios from 'axios';

const { NODE_ENV } = process.env;
const PORT = process.env.PORT || '5900';
const baseURL = NODE_ENV === 'production' ? 'https://bucketlist-ap.herokuapp.com/api/v1/' : `http://localhost:${PORT}/api/v1/`; // eslint-disable-line

const instance = axios.create({
  baseURL,
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  console.log('config', config);
  return config;
}, (error) => {
  console.log('config error', error);
  // Do something with request error
  return Promise.reject(error);
});
export default instance;
