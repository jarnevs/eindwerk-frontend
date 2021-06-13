import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://eindwerk-backend.herokuapp.com/';
 
const axiosNoAuth = axios.create({
  baseURL,
});

const axiosAuth = () => {
  const jwtToken = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })

  // axiosInstance.interceptors.request.use(
  //   (request) => {
  //     console.log(request);
  //     return Promise.resolve(request);
  //   },
  //   (error) => {
  //     if (error.statusCode === 401) {
  //       location.replace('#/');  
  //       return error;    
  //     };
  //   }
  // )

  // axiosInstance.interceptors.response.use(
  //   (request) => {
  //     console.log(request);
  //     return Promise.resolve(request);
  //   },
  //   (error) => {
  //     console.log(error);
  //     if (error.statusCode === 401) {
  //       Promise.resolve(error);
  //       location.replace('#/');
  //     };
  //   }
  // )

  return axiosInstance;
} 


export {
  axiosNoAuth,
  axiosAuth,
};