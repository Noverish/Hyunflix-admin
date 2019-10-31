export * from './video';

export interface Encode {
  id: number;
  inpath: string;
  outpath: string;
  options: string;
  progress: number;
  date: string;
}

export interface File {
  path: string;
  name: string;
  isdir: boolean;
  size: string;
  url: string;
}
