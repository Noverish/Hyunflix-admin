export const PAGE_SIZE = 15;
export const USER_INPUT_DEBOUNCE = 500;
export const LONG_CLICK_TIME = 0.5;
export const COLORS = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
export const ACCESS_TOKEN_HEADER = 'x-hyunsub-access-token';
export const REFRESH_TOKEN_HEADER = 'x-hyunsub-refresh-token';

const { protocol, hostname } = window.location;

export const API_SERVER = (process.env.NODE_ENV === 'development')
  ? `${protocol}//${hostname}:8080/api`
  : 'https://api.hyunsub.kim';

export const AUTH_SERVER = (process.env.NODE_ENV === 'development')
  ? `${protocol}//${hostname}:8080/auth`
  : 'https://auth.hyunsub.kim';

export const ENCODE_SERVER_SSE_PATH = 'http://home.hyunsub.kim:8600/ffmpeg';
