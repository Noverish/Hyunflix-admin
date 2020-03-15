import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'src/config';
import { Video } from 'src/models';

export interface VideoListResult {
  total: number;
  results: Video[];
}

export async function videoList(page: number, pageSize: number): Promise<VideoListResult> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos`,
    method: 'get',
    params: { q: '', p: page, ps: pageSize },
  };

  return (await axios(config)).data;
}

export async function videoAdd(path: string): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos`,
    method: 'post',
    data: { path },
  };

  await axios(config);
}

export async function videoUpdate(videoId: number, data: Partial<Video>): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/${videoId}`,
    method: 'put',
    data,
  };

  await axios(config);
}

export async function videoExamine(): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/examine`,
    method: 'post',
  };

  await axios(config);
}
