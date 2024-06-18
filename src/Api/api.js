import axios from 'axios';

const baseUrl = "http://localhost:5004/api";

const api = axios.create({
    baseURL: baseUrl
});

export default api;