import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
 
const axiosNoAuth = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

export {
  axiosNoAuth,
};
