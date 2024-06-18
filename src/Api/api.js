import axios from 'axios';

const baseUrl = "http://localhost:5004/api";

const api = axios.create({
    baseURL: baseUrl
});

api.interceptors.request.use(request => {
    console.log('Starting Request');
  console.log(`URL: ${request.url}`);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);
  console.log('Data:', request.data);
    return request;
  });

export default api;