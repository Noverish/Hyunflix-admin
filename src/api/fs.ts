import axios, { AxiosRequestConfig } from 'axios';

import { File } from 'models';
import { FS_SERVER } from 'config';

export async function readdir(path): Promise<File[]> {
  const config: AxiosRequestConfig = {
    url: `${FS_SERVER}/fs/readdir?path=${path}`,
    method: 'get',
  };

  return (await axios(config)).data;
}
