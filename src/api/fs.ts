import axios, { AxiosRequestConfig } from 'axios';

import { File } from 'models';
import { API_SERVER } from 'config';

export async function readdir(path: string): Promise<File[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/fs/readdir?path=${path}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function rename(from: string, to: string): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/fs/rename`,
    method: 'post',
    data: { from , to },
  };

  await axios(config);
}
