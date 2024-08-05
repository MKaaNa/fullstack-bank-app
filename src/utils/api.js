// src/utils/api.js

import axios from 'axios';

export const get = (url) => axios.get(url);
export const post = (url, data) => axios.post(url, data);
