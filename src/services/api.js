import axios from 'axios'
import { getToken } from '../storage/utils'


const api = axios.create({
    baseURL: 'http://localhost:3333/inn'
});

api.interceptors.request.use(async config => {
    const token =  getToken();
    if(token) config.headers.token = token;

    return config;
});

export default api;