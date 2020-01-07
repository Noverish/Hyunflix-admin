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
function getSessionId() {
  return require('states').store.getState().auth.sessionId;
}

axios.interceptors.request.use((config) => {
  const sessionId = getSessionId();

  if (sessionId) {
    config.headers = { 'x-hyunsub-session-id': sessionId };
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
