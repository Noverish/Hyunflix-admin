export * from './auth';
export * from './encode';

export interface File {
  path: string;
  name: string;
  isdir: boolean;
  size: string;
  url: string;
}

export const isEqualFile = (v1: File, v2: File) => v1.path === v2.path;

export interface Music {
  youtube: string | null;
  duration: number;
  id: number;
  path: string;
  tags: string[];
  title: string;
  url: string;
}

export interface Video {
  id: number;
  title: string;
  url: string;
  path: string;
  tags: string[];
  date: string;

  duration: number;
  width: number;
  height: number;
  bitrate: number;
  size: number;

  durationString: string;
  bitrateString: string;
  sizeString: string;
  resolution: string;
}

export const isEqualVideo = (v1: Video, v2: Video) => v1.id === v2.id;

export interface VideoSeries {
  id: number;
  videos: Video[];
  title: string;
  category: string;
}

export interface EncodeStatus {
  encodeId: number;
  eta: number;
  progress: number;
  speed: number;
}

export interface YoutubeStatus {
  stage: YoutubeStage;
  progress: number;
  eta: number;
  error: string | null;
}

export enum YoutubeStage {
  download = 0,
  encode = 1,
  finish = 2,
}
