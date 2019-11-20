import axios from 'axios';

export * from './auth';
export * from './encode';
export * from './fs';
export * from './video';
export * from './music';

export interface SearchResult<T> {
  total: number;
  results: T[];
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});
