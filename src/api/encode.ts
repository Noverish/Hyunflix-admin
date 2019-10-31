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

export async function encodeFile(inpath: string, options: string, outpath: string) {
  const config: AxiosRequestConfig = {
    url: `${FS_SERVER}/encode`,
    method: 'post',
    data: { inpath, options, outpath },
  };

  await axios(config);
}

export async function encodePresets() {
  const config: AxiosRequestConfig = {
    url: `${FS_SERVER}/encode/presets`,
    method: 'get',
  };

  await axios(config);
}
