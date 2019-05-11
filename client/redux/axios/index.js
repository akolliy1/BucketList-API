import axios from 'axios';

const { NODE_ENV } = process.env;
const baseURL = NODE_ENV === 'production' ? 'https://bucketlist-ap.herokuapp.com/api/v1/' : 'http://localhost:5900/api/v1/'; // eslint-disable-line

const instance = axios.create({
  baseURL,
});

export default instance;
