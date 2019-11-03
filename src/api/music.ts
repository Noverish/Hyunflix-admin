import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';

import { Music } from 'models';
import { API_SERVER } from 'config';

export interface MusicListResult {
  total: number;
  results: Music[];
}

export async function musicList(query: string, page: number, pageSize: number): Promise<MusicListResult> {
  const querystring = stringify({ q: query, p: page, ps: pageSize });
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics?${querystring}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function musicDelete(ids: number[], deleteFile: boolean): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics`,
    method: 'delete',
    data: { ids, deleteFile },
  };

  await axios(config);
}

export async function musicExamine(): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics/examine`,
    method: 'post',
  };

  await axios(config);
}