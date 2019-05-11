import axios from 'axios';

const { NODE_ENV } = process.env;
const baseURL = NODE_ENV === 'production' ? 'https://BucketList-API.herokuapp.com/api/v1/' : 'http://localhost:3900/api/v1/'; // eslint-disable-line

const instance = axios.create({
  baseURL,
});

export default instance;
