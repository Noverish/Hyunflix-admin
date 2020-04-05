export interface EncodeResult {
  id: number;
  duration: number;
  width: number;
  height: number;
  bitrate: number;
  size: number;
  date: string;
}

export interface Encode {
  id: number;
  inpath: string;
  outpath: string;
  options: string;
  progress: number;
  before: EncodeResult | null;
  after: EncodeResult | null;
  date: string;
}
