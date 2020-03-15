import axios from 'axios';
import { REFRESH_TOKEN_HEADER, ACCESS_TOKEN_HEADER, AUTH_SERVER, API_SERVER } from 'src/config';

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

axios.interceptors.request.use(async (config) => {
  const { store } = await import('src/states');

  if (config.url?.startsWith(AUTH_SERVER)) {
    config.headers[REFRESH_TOKEN_HEADER] = store.getState().auth.refreshToken;
  } else if (config.url?.startsWith(API_SERVER)) {
    config.headers[ACCESS_TOKEN_HEADER] = store.getState().auth.accessToken;
  }

  return config;
}, error => Promise.reject(error));
