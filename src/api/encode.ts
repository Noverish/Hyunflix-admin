import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'src/config';
import { Encode } from 'src/models';
import { SearchResult } from '.';

export async function ffmpegExist(): Promise<boolean> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/ffmpeg/exist`,
    method: 'get',
  };

  return (await axios(config)).data.isExist;
}

export async function ffmpegState(): Promise<number> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/ffmpeg/state`,
    method: 'get',
  };

  return (await axios(config)).data.state;
}

export async function ffmpegPause(): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/ffmpeg/pause`,
    method: 'post',
  };

  await axios(config);
}

export async function ffmpegResume(): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/ffmpeg/resume`,
    method: 'post',
  };

  await axios(config);
}

export async function encodeList(page: number, pageSize: number): Promise<SearchResult<Encode>> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/encodes`,
    method: 'get',
    params: { q: '', p: page, ps: pageSize },
  };

  return (await axios(config)).data;
}

export async function encodeAdd(inpath: string, options: string, outpath: string) {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/encodes`,
    method: 'post',
    data: { inpath, options, outpath },
  };

  await axios(config);
}

export async function encodePresets(): Promise<object> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/encodes/presets`,
    method: 'get',
  };

  return (await await axios(config)).data;
}
