import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';


// Axios instance
const api = axios.create({
  baseURL: BASE_API_URL, // Temel URL
  headers: {
    'Content-Type': 'application/json',
    // Diğer gerekli başlıklar buraya eklenebilir
  }
});

// GET isteği
export const get = (url) => api.get(url);

// POST isteği
export const post = (url, data) => api.post(url, data);

// PATCH isteği
export const patch = (url, data) => api.patch(url, data);
