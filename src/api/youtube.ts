import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'src/config';

export async function youtubeDownload(url: string, tags: string[]): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/youtube`,
    method: 'post',
    data: { url, tags },
  };

  await axios(config);
}
