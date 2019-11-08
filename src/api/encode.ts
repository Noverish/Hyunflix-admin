import axios, { AxiosRequestConfig } from 'axios';

import { FS_SERVER, API_SERVER } from 'config';
import { Encode } from 'models';

export async function ffmpegPause(): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${FS_SERVER}/ffmpeg/pause`,
    method: 'post',
  };

  await axios(config);
}

export async function ffmpegResume(): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${FS_SERVER}/ffmpeg/resume`,
    method: 'post',
  };

  await axios(config);
}

export async function encodeList(): Promise<Encode[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/encodes`,
    method: 'get',
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
