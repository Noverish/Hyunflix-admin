import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';

import { VideoArticle } from 'models';
import { API_SERVER } from 'config';

export interface VideoArticleListResult {
  total: number;
  results: VideoArticle[];
}

export async function videoArticleList(query: string, page: number, pageSize: number): Promise<VideoArticleListResult> {
  const querystring = stringify({ q: query, p: page, ps: pageSize });
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/articles/videos?${querystring}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export interface VideoArticleUpdateParams {
  videoArticleId: number;
  params: Partial<VideoArticle>;
}

export async function videoArticleUpdate(params: VideoArticleUpdateParams): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/articles/videos/${params.videoArticleId}`,
    method: 'put',
  };

  await axios(config);
}

export async function videoExamine(): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/examine`,
    method: 'post',
  };

  await axios(config);
}
