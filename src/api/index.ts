import axios from 'axios';

export * from './auth';
export * from './encode';
export * from './fs';

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
