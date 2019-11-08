import axios, { AxiosRequestConfig } from 'axios';

import { File } from 'models';
import { API_SERVER } from 'config';

export async function readdir(path): Promise<File[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/fs/readdir?path=${path}`,
    method: 'get',
  };

  return (await axios(config)).data;
}
