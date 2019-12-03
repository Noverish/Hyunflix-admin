import axios from 'axios';

export * from './auth';
export * from './encode';
export * from './fs';
export * from './video';
export * from './music';
export * from './youtube';

export interface SearchResult<T> {
  total: number;
  results: T[];
}

// TODO dependency 해결
function getToken() {
  return require('states').store.getState().auth.token;
}

axios.interceptors.request.use((config) => {
  const token = getToken();

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
